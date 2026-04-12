"""
Vibe Firmware — Local Build Server (Windows)
프롬프트 → Claude 코드 생성 → ESP-IDF 빌드 → .bin 다운로드 + 자동 BLE OTA

API:
  POST /api/v1/generate    — 프롬프트 → 빌드 시작 (job_id 반환)
  GET  /api/v1/status/{id} — 빌드 상태 조회
  GET  /api/v1/download/{id} — .bin 다운로드
  POST /api/v1/ota/{id}    — BLE OTA 자동 전송
  GET  /health             — 서버 상태
"""

import asyncio
import hashlib
import os
import platform
import shutil
import subprocess
import time
import uuid
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="Vibe Firmware Local Build Server", version="1.0")

# CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 스마트폰 앱 정적 파일 서빙
APP_DIR = Path(r"C:\todo\today\aiHardStudy\smartphone\app")
if APP_DIR.exists():
    app.mount("/app", StaticFiles(directory=str(APP_DIR), html=True), name="app")

# Windows 경로 설정
IDF_PATH = r"C:\Espressif\frameworks\esp-idf-v5.5.1"
IDF_PYTHON = r"C:\Espressif\python_env\idf5.5_py3.13_env\Scripts\python.exe"
TEMPLATE_DIR = Path(r"C:\todo\today\aiHardStudy\firmware\ble_ota")
JOBS_DIR = Path(r"C:\todo\today\aiHardStudy\cloud\jobs")
JOBS_DIR.mkdir(parents=True, exist_ok=True)

# 공유 빌드 디렉토리 (빌드 캐시 유지)
SHARED_BUILD_DIR = Path(r"C:\todo\today\aiHardStudy\cloud\shared_build")
_build_lock = False  # 동시 빌드 방지

# Python 경로 (bleak 설치된 Python)
BLEAK_PYTHON = r"C:\Users\lenovo\AppData\Local\Programs\Python\Python313\python.exe"
OTA_CLIENT = TEMPLATE_DIR / "ota_test_client.py"

# 빌드 작업 상태
jobs = {}

# 시스템 프롬프트
SYSTEM_PROMPT = """You are an ESP32 firmware generator using ESP-IDF v5.5.1 framework.
The target board is ESP32-WROOM-32 DevKitC (38-pin) with:
- LED: RED=GPIO25, YELLOW=GPIO26, BLUE=GPIO27 (active HIGH)
- Buzzer (active LOW): GPIO14
- Melody buzzer (PWM): GPIO33
- OLED SSD1306 I2C: SDA=GPIO21, SCL=GPIO22, addr=0x3C
- AHT20 temp/humidity I2C: addr=0x38
- Switch: GPIO32 (INPUT_PULLUP, active LOW)

OLED API (from ssd1306.h — DO NOT use any other SSD1306 library):
  ssd1306_init(I2C_NUM_0);           // init after i2c_driver_install
  ssd1306_clear();                    // clear framebuffer
  ssd1306_draw_string(x, y, "text"); // draw ASCII string at pixel (x,y)
  ssd1306_flush(I2C_NUM_0);          // send framebuffer to display

I2C setup pattern (MUST use this exact pattern):
  i2c_config_t conf = {
      .mode = I2C_MODE_MASTER,
      .sda_io_num = 21,
      .scl_io_num = 22,
      .sda_pullup_en = GPIO_PULLUP_DISABLE,
      .scl_pullup_en = GPIO_PULLUP_DISABLE,
      .master.clk_speed = 100000,
  };
  i2c_param_config(I2C_NUM_0, &conf);
  i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);

IMPORTANT RULES:
1. Output ONLY the C code for main.c — no explanation, no markdown, no code fences
2. Always include BLE OTA service by calling ble_ota_init() at the end of app_main()
3. Include these headers: stdio.h, string.h, freertos/FreeRTOS.h, freertos/task.h, driver/gpio.h, driver/i2c.h, esp_log.h, nvs_flash.h, ssd1306.h, ble_ota.h
4. Initialize NVS at the start of app_main() with nvs_flash_init()
5. Use ESP-IDF APIs only (no Arduino)
6. Start the code with: #include <stdio.h>
7. For LED tasks, use xTaskCreate with separate FreeRTOS task
8. Call ble_ota_init() as the LAST function call in app_main() before the infinite loop
9. After ble_ota_init(), add infinite loop: while(1) { vTaskDelay(10000/portTICK_PERIOD_MS); }
10. CRITICAL: After NVS init, MUST include OTA rollback confirmation code:
    #include "esp_ota_ops.h"
    const esp_partition_t *running = esp_ota_get_running_partition();
    esp_ota_img_states_t ota_state;
    if (esp_ota_get_state_partition(running, &ota_state) == ESP_OK) {
        if (ota_state == ESP_OTA_IMG_PENDING_VERIFY) {
            vTaskDelay(3000 / portTICK_PERIOD_MS);
            esp_ota_mark_app_valid_cancel_rollback();
        }
    }
    Without this, OTA firmware will rollback to previous version!
"""


class GenerateRequest(BaseModel):
    prompt: str
    retry_on_fail: bool = True
    max_retries: int = 3


class JobStatus(BaseModel):
    job_id: str
    status: str
    progress: int
    message: str
    firmware_size: int = 0
    firmware_sha256: str = ""
    elapsed: float = 0


def get_idf_env():
    """Windows ESP-IDF 환경변수 생성"""
    env = os.environ.copy()
    env["IDF_PATH"] = IDF_PATH
    # MSYS/Mingw 환경변수 완전 삭제 (키 존재만으로 감지됨)
    for key in list(env.keys()):
        if key.startswith("MSYS") or key.startswith("MINGW") or key in ("SHLVL", "SHELL", "MSYSTEM"):
            del env[key]
    env["IDF_PYTHON_ENV_PATH"] = r"C:\Espressif\python_env\idf5.5_py3.13_env"

    espressif_tools = Path(r"C:\Espressif\tools")
    extra_paths = []

    # xtensa toolchain
    for p in espressif_tools.glob("xtensa-esp-elf/*/xtensa-esp-elf/bin"):
        extra_paths.append(str(p))
    # cmake
    for p in espressif_tools.glob("cmake/*/bin"):
        extra_paths.append(str(p))
    # ninja
    for p in espressif_tools.glob("ninja/*"):
        extra_paths.append(str(p))
    # ccache
    for p in espressif_tools.glob("ccache/*/ccache-*"):
        extra_paths.append(str(p))
    # idf-python
    extra_paths.append(r"C:\Espressif\python_env\idf5.5_py3.13_env\Scripts")
    # idf.py
    extra_paths.append(os.path.join(IDF_PATH, "tools"))

    env["PATH"] = ";".join(extra_paths) + ";" + env.get("PATH", "")
    return env


def generate_code_with_claude(prompt: str, work_dir: Path) -> str:
    """Claude CLI로 main.c 코드 생성 (Windows stream-json 파싱)"""
    import json as _json

    # 진입 로그
    (work_dir / "_entry_log.txt").write_text(f"entered generate_code_with_claude\nprompt: {prompt[:100]}\nwork_dir: {work_dir}", encoding="utf-8")

    full_prompt = f"{SYSTEM_PROMPT}\n\nUser request: {prompt}"

    claude_cmd = shutil.which("claude") or "claude.cmd"

    # 프롬프트를 파일로 저장, claude -p @파일 형태로 전달
    prompt_file = work_dir / "_prompt.txt"
    prompt_file.write_text(full_prompt, encoding="utf-8")

    try:
        # 프롬프트를 파일에 저장하고 type으로 파이프 (Windows .CMD 호환)
        prompt_file.write_text(full_prompt, encoding="utf-8")
        cmd_str = f'type "{prompt_file}" | claude -p - --output-format stream-json --verbose'
        result = subprocess.run(
            cmd_str,
            capture_output=True, text=True, timeout=120,
            cwd=str(work_dir),
            shell=True,
        )
        # 디버그 로그
        debug_file = work_dir / "_claude_debug.txt"
        debug_file.write_text(
            f"returncode: {result.returncode}\nstdout_len: {len(result.stdout)}\nstderr_len: {len(result.stderr)}\ncmd: {claude_cmd}\n\nSTDERR:\n{result.stderr[:1000]}\n\nSTDOUT (first 2000):\n{result.stdout[:2000]}",
            encoding="utf-8"
        )
    except Exception as e:
        debug_file = work_dir / "_claude_debug.txt"
        debug_file.write_text(f"EXCEPTION: {type(e).__name__}: {e}\ncmd: {claude_cmd}", encoding="utf-8")
        raise RuntimeError(f"Claude subprocess error: {e}")

    # stream-json에서 assistant 텍스트 추출
    code_parts = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = _json.loads(line)
            if obj.get("type") == "assistant":
                msg = obj.get("message", {})
                for block in msg.get("content", []):
                    if block.get("type") == "text":
                        code_parts.append(block["text"])
        except _json.JSONDecodeError:
            continue

    code = "".join(code_parts).strip()

    # 마크다운 코드블록 제거
    if "```c" in code:
        code = code.split("```c", 1)[1]
    elif "```" in code:
        code = code.split("```", 1)[1]
    if code.endswith("```"):
        code = code[:-3].rstrip()
    code = code.strip()

    if "#include" not in code:
        raise RuntimeError(f"Claude output doesn't contain valid C code: {code[:200]}")

    return code


def build_firmware(work_dir: Path) -> Path:
    """ESP-IDF 빌드 (Windows — export.ps1 스킵 + ccache)"""
    env = get_idf_env()
    # ccache 활성화
    env["CCACHE_DIR"] = str(Path.home() / ".ccache")
    env["IDF_CCACHE_ENABLE"] = "1"

    idf_py = os.path.join(IDF_PATH, "tools", "idf.py")
    result = subprocess.run(
        [IDF_PYTHON, idf_py, "build"],
        capture_output=True, text=True, timeout=600,
        env=env, cwd=str(work_dir),
    )

    # 빌드 로그 저장
    (work_dir / "_build_log.txt").write_text(
        f"rc: {result.returncode}\nSTDERR:\n{result.stderr[-2000:]}\nSTDOUT:\n{result.stdout[-2000:]}",
        encoding="utf-8"
    )

    if result.returncode != 0:
        raise RuntimeError(f"Build failed:\n{result.stderr[-500:]}\n{result.stdout[-500:]}")

    bin_path = work_dir / "build" / "ble_ota.bin"
    if not bin_path.exists():
        raise RuntimeError(f"Build succeeded but .bin not found. stdout: {result.stdout[-300:]}")

    return bin_path


def _init_shared_build():
    """공유 빌드 디렉토리 초기화 (최초 1회)"""
    if (SHARED_BUILD_DIR / "build").exists():
        return  # 이미 초기화됨

    SHARED_BUILD_DIR.mkdir(parents=True, exist_ok=True)
    src_main = TEMPLATE_DIR / "main"
    dst_main = SHARED_BUILD_DIR / "main"
    dst_main.mkdir(exist_ok=True)

    for f in ["CMakeLists.txt", "sdkconfig.defaults", "partitions.csv"]:
        shutil.copy2(TEMPLATE_DIR / f, SHARED_BUILD_DIR / f)

    for f in src_main.iterdir():
        shutil.copy2(f, dst_main / f.name)

    sdk_src = TEMPLATE_DIR / "sdkconfig"
    if sdk_src.exists():
        shutil.copy2(sdk_src, SHARED_BUILD_DIR / "sdkconfig")

    # 첫 set-target
    env = get_idf_env()
    idf_py = os.path.join(IDF_PATH, "tools", "idf.py")
    subprocess.run(
        f'cmd /C ""{IDF_PYTHON}" "{idf_py}" set-target esp32"',
        capture_output=True, text=True, timeout=120,
        env=env, cwd=str(SHARED_BUILD_DIR), shell=True
    )


async def process_job(job_id: str, prompt: str, retry_on_fail: bool, max_retries: int):
    """비동기 빌드 작업 처리 — 공유 빌드 캐시 사용"""
    global _build_lock
    job = jobs[job_id]
    job["status"] = "generating"
    job["message"] = "Claude가 코드를 생성하고 있습니다..."
    job["progress"] = 10
    t_start = time.time()

    # Job 디렉토리 (프롬프트/코드 저장용)
    job_dir = JOBS_DIR / job_id
    job_dir.mkdir(exist_ok=True)

    try:
        # 공유 빌드 디렉토리 초기화
        await asyncio.to_thread(_init_shared_build)

        work_dir = SHARED_BUILD_DIR

        attempts = 0
        last_error = None

        while attempts < max_retries:
            attempts += 1
            try:
                # 1. Claude 코드 생성
                job["message"] = f"Claude 코드 생성 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 10 + (attempts - 1) * 5

                code = await asyncio.to_thread(generate_code_with_claude, prompt, job_dir)
                # main.c만 교체 (공유 빌드 디렉토리)
                (work_dir / "main" / "main.c").write_text(code, encoding="utf-8")
                # 코드 백업
                (job_dir / "main.c").write_text(code, encoding="utf-8")
                job["generated_code"] = code

                # 2. ESP-IDF 증분 빌드 (main.c만 변경 → 빠름)
                job["status"] = "building"
                job["message"] = f"ESP-IDF 빌드 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 40 + (attempts - 1) * 10

                # 동시 빌드 방지
                while _build_lock:
                    await asyncio.sleep(1)
                _build_lock = True
                try:
                    bin_path = await asyncio.to_thread(build_firmware, work_dir)
                finally:
                    _build_lock = False

                # 성공 — .bin을 job 디렉토리에 복사
                job_bin = job_dir / "firmware.bin"
                shutil.copy2(bin_path, job_bin)
                fw_data = job_bin.read_bytes()
                fw_sha256 = hashlib.sha256(fw_data).hexdigest()

                job["status"] = "success"
                job["message"] = "빌드 성공!"
                job["progress"] = 100
                job["firmware_size"] = len(fw_data)
                job["firmware_sha256"] = fw_sha256
                job["bin_path"] = str(job_bin)
                job["elapsed"] = time.time() - t_start
                return

            except Exception as e:
                last_error = f"{type(e).__name__}: {e}"
                job["message"] = f"시도 {attempts} 실패: {last_error[:100]}"

                if not retry_on_fail or attempts >= max_retries:
                    break

                # 빌드 캐시 유지 — main.c만 재생성하여 재시도

        job["status"] = "failed"
        job["message"] = f"빌드 실패 ({attempts}회 시도): {last_error[:200]}"
        job["elapsed"] = time.time() - t_start

    except Exception as e:
        job["status"] = "failed"
        job["message"] = f"오류: {str(e)[:200]}"
        job["elapsed"] = time.time() - t_start


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "platform": platform.system(),
        "idf_path": IDF_PATH,
        "idf_exists": Path(IDF_PATH).exists(),
        "template_exists": TEMPLATE_DIR.exists(),
        "active_jobs": sum(1 for j in jobs.values() if j["status"] in ("generating", "building")),
    }


@app.post("/api/v1/generate")
async def generate(req: GenerateRequest):
    job_id = str(uuid.uuid4())[:8]
    jobs[job_id] = {
        "job_id": job_id,
        "status": "pending",
        "progress": 0,
        "message": "대기 중...",
        "prompt": req.prompt,
        "firmware_size": 0,
        "firmware_sha256": "",
        "elapsed": 0,
    }
    asyncio.create_task(process_job(job_id, req.prompt, req.retry_on_fail, req.max_retries))
    return {"job_id": job_id, "status": "pending"}


@app.get("/api/v1/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    return JobStatus(
        job_id=job["job_id"],
        status=job["status"],
        progress=job["progress"],
        message=job["message"],
        firmware_size=job.get("firmware_size", 0),
        firmware_sha256=job.get("firmware_sha256", ""),
        elapsed=job.get("elapsed", 0),
    )


@app.get("/api/v1/download/{job_id}")
async def download(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "success":
        raise HTTPException(400, f"Job not ready: {job['status']}")
    bin_path = Path(job["bin_path"])
    if not bin_path.exists():
        raise HTTPException(500, "Binary file not found")
    return FileResponse(
        path=str(bin_path),
        filename=f"firmware_{job_id}.bin",
        media_type="application/octet-stream",
        headers={
            "X-Firmware-Size": str(job["firmware_size"]),
            "X-Firmware-SHA256": job["firmware_sha256"],
        }
    )


@app.post("/api/v1/ota/{job_id}")
async def ota_send(job_id: str):
    """빌드된 펌웨어를 BLE OTA로 ESP32에 자동 전송"""
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "success":
        raise HTTPException(400, f"Job not ready: {job['status']}")

    bin_path = Path(job["bin_path"])
    if not bin_path.exists():
        raise HTTPException(500, "Binary file not found")

    # BLE OTA 클라이언트 실행
    result = await asyncio.to_thread(
        subprocess.run,
        [BLEAK_PYTHON, str(OTA_CLIENT), str(bin_path)],
        capture_output=True, text=True, timeout=120
    )

    if "OTA 성공" in result.stdout or "SUCCESS" in result.stdout:
        return {"status": "ota_success", "output": result.stdout[-500:]}
    else:
        return {"status": "ota_failed", "output": result.stdout[-500:] + result.stderr[-500:]}


@app.get("/api/v1/code/{job_id}")
async def get_code(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    return {"code": job.get("generated_code", ""), "status": job["status"]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8091)
