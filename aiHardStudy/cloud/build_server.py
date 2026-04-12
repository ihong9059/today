"""
Vibe Firmware — Cloud Build Server
프롬프트 → Claude 코드 생성 → ESP-IDF 빌드 → .bin 다운로드

API:
  POST /api/v1/generate   — 프롬프트 전송 → 빌드 시작 (job_id 반환)
  GET  /api/v1/status/{id} — 빌드 상태 조회
  GET  /api/v1/download/{id} — .bin 다운로드
  GET  /health              — 서버 상태
"""

import asyncio
import hashlib
import json
import os
import shutil
import subprocess
import tempfile
import time
import uuid
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="Vibe Firmware Build Server", version="1.0")

# CORS 허용 (스마트폰 앱에서 접근)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 스마트폰 앱 정적 파일 서빙
APP_DIR = Path.home() / "vibe-firmware" / "app"
if APP_DIR.exists():
    app.mount("/app", StaticFiles(directory=str(APP_DIR), html=True), name="app")

# 경로 설정
IDF_PATH = "/opt/esp-idf-v5.5.1"
TEMPLATE_DIR = Path.home() / "vibe-firmware" / "firmware" / "ble_ota"
JOBS_DIR = Path.home() / "vibe-firmware" / "jobs"
JOBS_DIR.mkdir(parents=True, exist_ok=True)

# 빌드 작업 상태
jobs = {}

# 시스템 프롬프트 (Claude에게 ESP-IDF 코드 생성 지시)
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
  // Note: ssd1306_buf[] is the raw framebuffer (128x8 pages)

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
    status: str  # pending, generating, building, success, failed
    progress: int  # 0-100
    message: str
    firmware_size: int = 0
    firmware_sha256: str = ""
    elapsed: float = 0


def get_idf_env():
    """ESP-IDF 환경변수 생성"""
    env = os.environ.copy()
    env["IDF_PATH"] = IDF_PATH
    # export.sh 대신 직접 PATH 설정
    tools_dir = Path.home() / ".espressif" / "tools"
    python_env = Path.home() / ".espressif" / "python_env" / "idf5.5_py3.12_env"

    extra_paths = []
    # xtensa toolchain
    for p in tools_dir.glob("xtensa-esp-elf/*/xtensa-esp-elf/bin"):
        extra_paths.append(str(p))
    # cmake
    for p in tools_dir.glob("cmake/*/bin"):
        extra_paths.append(str(p))
    # ninja
    for p in tools_dir.glob("ninja/*"):
        if (p / "ninja").exists():
            extra_paths.append(str(p))
    # python venv
    extra_paths.append(str(python_env / "bin"))
    # idf.py
    extra_paths.append(str(Path(IDF_PATH) / "tools"))

    env["PATH"] = ":".join(extra_paths) + ":" + env.get("PATH", "")
    env["IDF_PYTHON_ENV_PATH"] = str(python_env)
    return env


def generate_code_with_claude(prompt: str, work_dir: Path) -> str:
    """Claude CLI로 main.c 코드 생성"""
    full_prompt = f"{SYSTEM_PROMPT}\n\nUser request: {prompt}"

    result = subprocess.run(
        ["claude", "-p", full_prompt, "--output-format", "text"],
        capture_output=True, text=True, timeout=120,
        cwd=str(work_dir)
    )

    if result.returncode != 0:
        raise RuntimeError(f"Claude failed: {result.stderr}")

    code = result.stdout.strip()

    # 마크다운 코드블록 제거
    if code.startswith("```"):
        lines = code.split("\n")
        code = "\n".join(lines[1:])  # 첫 줄 제거
    if code.endswith("```"):
        code = code[:-3].rstrip()

    # 코드 시작점 검증
    if "#include" not in code:
        raise RuntimeError("Claude output doesn't contain valid C code")

    return code


def build_firmware(work_dir: Path) -> Path:
    """ESP-IDF 빌드 실행"""
    env = get_idf_env()

    # idf.py build
    result = subprocess.run(
        ["python3", "-m", "idf_build_apps", "--help"],
        capture_output=True, text=True, env=env, cwd=str(work_dir)
    )

    # idf.py 직접 실행
    idf_py = Path(IDF_PATH) / "tools" / "idf.py"
    result = subprocess.run(
        ["python3", str(idf_py), "build"],
        capture_output=True, text=True, timeout=300,
        env=env, cwd=str(work_dir)
    )

    if result.returncode != 0:
        raise RuntimeError(f"Build failed:\n{result.stderr}\n{result.stdout}")

    bin_path = work_dir / "build" / "ble_ota.bin"
    if not bin_path.exists():
        raise RuntimeError("Build succeeded but .bin not found")

    return bin_path


async def process_job(job_id: str, prompt: str, retry_on_fail: bool, max_retries: int):
    """비동기 빌드 작업 처리"""
    job = jobs[job_id]
    job["status"] = "generating"
    job["message"] = "Claude가 코드를 생성하고 있습니다..."
    job["progress"] = 10
    t_start = time.time()

    work_dir = JOBS_DIR / job_id
    work_dir.mkdir(exist_ok=True)

    try:
        # 템플릿 복사 (main.c 제외)
        src_main = TEMPLATE_DIR / "main"
        dst_main = work_dir / "main"
        dst_main.mkdir(exist_ok=True)

        # 프로젝트 파일 복사
        for f in ["CMakeLists.txt", "sdkconfig.defaults", "partitions.csv"]:
            shutil.copy2(TEMPLATE_DIR / f, work_dir / f)

        # main/ 디렉토리 파일 복사 (main.c 제외)
        for f in src_main.iterdir():
            if f.name != "main.c":
                shutil.copy2(f, dst_main / f.name)

        # main/CMakeLists.txt 복사
        shutil.copy2(src_main / "CMakeLists.txt", dst_main / "CMakeLists.txt")

        # sdkconfig 복사 (있으면)
        sdk_src = TEMPLATE_DIR / "sdkconfig"
        if sdk_src.exists():
            shutil.copy2(sdk_src, work_dir / "sdkconfig")

        attempts = 0
        last_error = None

        while attempts < max_retries:
            attempts += 1
            try:
                # 1. Claude 코드 생성
                job["message"] = f"Claude 코드 생성 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 10 + (attempts - 1) * 5

                code = await asyncio.to_thread(generate_code_with_claude, prompt, work_dir)
                (dst_main / "main.c").write_text(code, encoding="utf-8")

                job["generated_code"] = code

                # 2. ESP-IDF 빌드
                job["status"] = "building"
                job["message"] = f"ESP-IDF 빌드 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 40 + (attempts - 1) * 10

                # set-target (첫 빌드 시)
                if not (work_dir / "build").exists():
                    env = get_idf_env()
                    idf_py = Path(IDF_PATH) / "tools" / "idf.py"
                    await asyncio.to_thread(
                        subprocess.run,
                        ["python3", str(idf_py), "set-target", "esp32"],
                        capture_output=True, text=True, timeout=120,
                        env=env, cwd=str(work_dir)
                    )

                bin_path = await asyncio.to_thread(build_firmware, work_dir)

                # 성공
                fw_data = bin_path.read_bytes()
                fw_sha256 = hashlib.sha256(fw_data).hexdigest()

                job["status"] = "success"
                job["message"] = "빌드 성공!"
                job["progress"] = 100
                job["firmware_size"] = len(fw_data)
                job["firmware_sha256"] = fw_sha256
                job["bin_path"] = str(bin_path)
                job["elapsed"] = time.time() - t_start
                return

            except RuntimeError as e:
                last_error = str(e)
                job["message"] = f"시도 {attempts} 실패: {last_error[:100]}"

                if not retry_on_fail or attempts >= max_retries:
                    break

                # 빌드 디렉토리 정리 후 재시도
                build_dir = work_dir / "build"
                if build_dir.exists():
                    shutil.rmtree(build_dir)

        # 모든 시도 실패
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
        "idf_path": IDF_PATH,
        "idf_exists": Path(IDF_PATH).exists(),
        "template_exists": TEMPLATE_DIR.exists(),
        "active_jobs": sum(1 for j in jobs.values() if j["status"] in ("generating", "building")),
    }


@app.post("/api/v1/generate")
async def generate(req: GenerateRequest):
    """프롬프트 → 빌드 시작"""
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

    # 비동기 작업 시작
    asyncio.create_task(process_job(job_id, req.prompt, req.retry_on_fail, req.max_retries))

    return {"job_id": job_id, "status": "pending"}


@app.get("/api/v1/status/{job_id}")
async def get_status(job_id: str):
    """빌드 상태 조회"""
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
    """.bin 다운로드"""
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


@app.get("/api/v1/code/{job_id}")
async def get_code(job_id: str):
    """생성된 코드 조회"""
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")

    job = jobs[job_id]
    return {"code": job.get("generated_code", ""), "status": job["status"]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8090)
