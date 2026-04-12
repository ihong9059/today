"""
UTTEC Firmware — Arduino Build Server (Windows)
프롬프트 → Claude 코드 생성 → Arduino-CLI 빌드 → .bin 다운로드 + BLE OTA

API: 동일 (build_server_local.py와 호환)
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

app = FastAPI(title="UTTEC Firmware Arduino Build Server", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

# ─── 경로 설정 ───
ACLI = Path.home() / "bin" / "arduino-cli.exe"
FQBN = "esp32:esp32:esp32"
TEMPLATE_DIR = Path(r"C:\todo\today\aiHardStudy\firmware\ble_ota_arduino")
JOBS_DIR = Path(r"C:\todo\today\aiHardStudy\cloud\jobs_arduino")
JOBS_DIR.mkdir(parents=True, exist_ok=True)
SHARED_BUILD_DIR = Path(r"C:\todo\today\aiHardStudy\cloud\ble_ota_arduino")
BLEAK_PYTHON = r"C:\Users\lenovo\AppData\Local\Programs\Python\Python313\python.exe"
OTA_CLIENT = Path(r"C:\todo\today\aiHardStudy\firmware\ble_ota\ota_test_client.py")

# 앱 정적 파일
APP_DIR = Path(r"C:\todo\today\aiHardStudy\smartphone\app")
if APP_DIR.exists():
    app.mount("/app", StaticFiles(directory=str(APP_DIR), html=True), name="app")

_build_lock = False
jobs = {}

# ─── 시스템 프롬프트 (Arduino용) ───
SYSTEM_PROMPT = """You are an ESP32 firmware generator using Arduino framework.
The target board is ESP32-WROOM-32 DevKitC (38-pin) with:
- LED: RED=GPIO25, YELLOW=GPIO26, BLUE=GPIO27 (active HIGH)
- Buzzer (active LOW): GPIO14
- Melody buzzer (PWM): GPIO33
- OLED SSD1306 I2C: SDA=GPIO21, SCL=GPIO22, addr=0x3C
- AHT20 temp/humidity I2C: addr=0x38
- Switch: GPIO32 (INPUT_PULLUP, active LOW)

OLED API (from ssd1306.h — already included in project):
  SSD1306 oled(21, 22);   // constructor with SDA, SCL pins
  oled.init();             // call in setup() after Wire.begin()
  oled.clear();            // clear framebuffer
  oled.drawString(x, y, "text");  // draw at pixel position
  oled.display();          // flush to screen

IMPORTANT RULES:
1. Output ONLY the code — no explanation, no markdown, no code fences
2. Define ONLY setup() and loop() functions, plus any helper functions you need
3. Do NOT include any #include lines — they are already provided by the base firmware
4. In setup(), you MUST call these in order:
   Serial.begin(115200);
   Wire.begin(21, 22);     // I2C for OLED
   oled.init();            // OLED init (oled object already exists)
   initBLE();              // BLE OTA init (function already exists)
5. Use standard Arduino: pinMode, digitalWrite, analogRead, delay, millis
6. For LED tasks use xTaskCreate with separate function
7. Do NOT define or redeclare: initBLE, OTA callbacks, oled, SSD1306, NimBLE code
8. The 'oled' object (SSD1306 class) is already declared globally
9. After initBLE() call, the loop() should just have delay(10000)
10. Pin definitions are already available: LED_RED=25, LED_YELLOW=26, LED_BLUE=27, BUZZER=14
11. VERY IMPORTANT: Add Korean comments explaining every important line for beginners.
    Use this format: // [주제] 쉬운 설명
    Examples:
      // [LED 켜기] GPIO25에 HIGH(3.3V)를 보내면 빨간 LED가 켜집니다
      // [대기] 500밀리초(0.5초) 동안 기다립니다. 이 시간이 깜빡이는 속도를 결정해요
      // [반복 작업] 이 함수는 별도 스레드에서 무한 반복됩니다
      // [핀 설정] LED 핀을 출력(OUTPUT) 모드로 설정합니다. 전압을 내보내려면 출력이어야 해요
      // [OLED 표시] 화면의 (0,0) 위치에 텍스트를 그립니다
      // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
    Every function and every important line MUST have a Korean comment above it.
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


def generate_code_with_claude(prompt: str, work_dir: Path) -> str:
    """Claude CLI로 Arduino 코드 생성"""
    import json as _json
    full_prompt = f"{SYSTEM_PROMPT}\n\nUser request: {prompt}"

    claude_cmd = shutil.which("claude") or "claude.cmd"
    prompt_file = work_dir / "_prompt.txt"
    prompt_file.write_text(full_prompt, encoding="utf-8")

    try:
        cmd_str = f'type "{prompt_file}" | claude -p - --output-format stream-json --verbose'
        result = subprocess.run(
            cmd_str, capture_output=True, text=True, timeout=120,
            cwd=str(work_dir), shell=True,
        )
    except Exception as e:
        raise RuntimeError(f"Claude error: {e}")

    code_parts = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line: continue
        try:
            obj = _json.loads(line)
            if obj.get("type") == "assistant":
                for block in obj.get("message", {}).get("content", []):
                    if block.get("type") == "text":
                        code_parts.append(block["text"])
        except _json.JSONDecodeError:
            continue

    code = "".join(code_parts).strip()
    if "```c" in code: code = code.split("```c", 1)[1]
    elif "```cpp" in code: code = code.split("```cpp", 1)[1]
    elif "```" in code: code = code.split("```", 1)[1]
    if code.endswith("```"): code = code[:-3].rstrip()
    code = code.strip()

    if "setup" not in code and "#include" not in code:
        raise RuntimeError(f"Invalid code: {code[:200]}")

    return code


def _init_shared_build():
    """공유 빌드 디렉토리 초기화"""
    if SHARED_BUILD_DIR.exists() and (SHARED_BUILD_DIR / "ble_ota_arduino.ino").exists():
        return
    SHARED_BUILD_DIR.mkdir(parents=True, exist_ok=True)
    # 템플릿 복사
    for f in TEMPLATE_DIR.iterdir():
        shutil.copy2(f, SHARED_BUILD_DIR / f.name)


def build_firmware(work_dir: Path) -> Path:
    """Arduino-CLI 빌드"""
    out_dir = work_dir / "output"
    out_dir.mkdir(exist_ok=True)
    # 이전 .bin 삭제하여 새 빌드 결과 확인
    for old_bin in out_dir.glob("*.bin"):
        old_bin.unlink()
    build_cache = work_dir / "build"
    # 캐시의 .ino.cpp 삭제하여 재컴파일 강제
    for cached in (work_dir).rglob("*.ino.cpp"):
        cached.unlink(missing_ok=True)
    result = subprocess.run(
        [str(ACLI), "compile", "--fqbn", FQBN,
         "--build-property", "build.partitions=min_spiffs",
         "--output-dir", str(out_dir),
         str(work_dir)],
        capture_output=True, text=True, timeout=300,
    )

    (work_dir / "_build_log.txt").write_text(
        f"rc: {result.returncode}\nSTDERR:\n{result.stderr[-2000:]}\nSTDOUT:\n{result.stdout[-2000:]}",
        encoding="utf-8"
    )

    if result.returncode != 0:
        raise RuntimeError(f"Build failed:\n{result.stderr[-500:]}")

    # output 디렉토리에서 .bin 찾기
    bin_path = out_dir / "ble_ota_arduino.ino.bin"
    if not bin_path.exists():
        for f in out_dir.glob("*.bin"):
            bin_path = f
            break
    if not bin_path.exists():
        raise RuntimeError(f"Build ok but .bin not found in {out_dir}")

    return bin_path


async def process_job(job_id: str, prompt: str, retry_on_fail: bool, max_retries: int):
    global _build_lock
    job = jobs[job_id]
    job["status"] = "generating"
    job["message"] = "AI가 코드를 생성하고 있어요..."
    job["progress"] = 10
    t_start = time.time()

    job_dir = JOBS_DIR / job_id
    job_dir.mkdir(exist_ok=True)

    try:
        await asyncio.to_thread(_init_shared_build)
        work_dir = SHARED_BUILD_DIR

        attempts = 0
        last_error = None

        while attempts < max_retries:
            attempts += 1
            try:
                job["message"] = f"AI 코드 생성 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 10 + (attempts - 1) * 5

                code = await asyncio.to_thread(generate_code_with_claude, prompt, job_dir)
                (job_dir / "generated_code.ino").write_text(code, encoding="utf-8")
                job["generated_code"] = code

                # 베이스 코드에서 ledTask/setup/loop 부분을 Claude 코드로 교체
                base_ino = TEMPLATE_DIR / "ble_ota_arduino.ino"
                base_code = base_ino.read_text(encoding="utf-8")

                # "// ─── LED Task ───" 이후를 모두 제거 (BLE+OLED 선언까지만 유지)
                marker = "// ─── LED Task ───"
                if marker in base_code:
                    ble_base = base_code.split(marker)[0]
                else:
                    ble_base = base_code.rsplit("void setup()", 1)[0]

                # 사용자 코드 정제
                user_code = code.strip()
                # 코드 시작점(void/static/const/#) 이전의 쓰레기 텍스트 제거
                import re
                match = re.search(r'^(void |static |const |//|#)', user_code, re.MULTILINE)
                if match and match.start() > 0:
                    user_code = user_code[match.start():]
                # include 제거 (베이스에 이미 있음)
                lines = user_code.split("\n")
                clean_lines = [l for l in lines if not l.strip().startswith("#include")]
                user_code = "\n".join(clean_lines)

                # 합침
                merged = ble_base + "\n" + marker + "\n" + user_code + "\n"
                (work_dir / "ble_ota_arduino.ino").write_text(merged, encoding="utf-8")

                # 빌드
                job["status"] = "building"
                job["message"] = f"펌웨어 빌드 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 40 + (attempts - 1) * 10

                while _build_lock:
                    await asyncio.sleep(1)
                _build_lock = True
                try:
                    bin_path = await asyncio.to_thread(build_firmware, work_dir)
                finally:
                    _build_lock = False

                # 성공
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

        job["status"] = "failed"
        job["message"] = f"빌드 실패 ({attempts}회): {last_error[:200]}"
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
        "build_system": "arduino-cli",
        "acli_exists": ACLI.exists(),
        "template_exists": TEMPLATE_DIR.exists(),
        "active_jobs": sum(1 for j in jobs.values() if j["status"] in ("generating", "building")),
    }

@app.post("/api/v1/generate")
async def generate(req: GenerateRequest):
    job_id = str(uuid.uuid4())[:8]
    jobs[job_id] = {
        "job_id": job_id, "status": "pending", "progress": 0,
        "message": "대기 중...", "prompt": req.prompt,
        "firmware_size": 0, "firmware_sha256": "", "elapsed": 0,
    }
    asyncio.create_task(process_job(job_id, req.prompt, req.retry_on_fail, req.max_retries))
    return {"job_id": job_id, "status": "pending"}

@app.get("/api/v1/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs: raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    return JobStatus(
        job_id=job["job_id"], status=job["status"], progress=job["progress"],
        message=job["message"], firmware_size=job.get("firmware_size", 0),
        firmware_sha256=job.get("firmware_sha256", ""), elapsed=job.get("elapsed", 0),
    )

@app.get("/api/v1/download/{job_id}")
async def download(job_id: str):
    if job_id not in jobs: raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "success": raise HTTPException(400, f"Not ready: {job['status']}")
    bin_path = Path(job["bin_path"])
    if not bin_path.exists(): raise HTTPException(500, "Binary not found")
    return FileResponse(path=str(bin_path), filename=f"firmware_{job_id}.bin",
        media_type="application/octet-stream",
        headers={"X-Firmware-Size": str(job["firmware_size"]),
                 "X-Firmware-SHA256": job["firmware_sha256"]})

@app.post("/api/v1/ota/{job_id}")
async def ota_send(job_id: str):
    if job_id not in jobs: raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "success": raise HTTPException(400, f"Not ready: {job['status']}")
    bin_path = Path(job["bin_path"])
    result = await asyncio.to_thread(subprocess.run,
        [BLEAK_PYTHON, str(OTA_CLIENT), str(bin_path)],
        capture_output=True, text=True, timeout=120)
    if "SUCCESS" in result.stdout or "OTA 성공" in result.stdout:
        return {"status": "ota_success", "output": result.stdout[-500:]}
    return {"status": "ota_failed", "output": result.stdout[-500:] + result.stderr[-500:]}

@app.get("/api/v1/code/{job_id}")
async def get_code(job_id: str):
    if job_id not in jobs: raise HTTPException(404, "Job not found")
    return {"code": jobs[job_id].get("generated_code", ""), "status": jobs[job_id]["status"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8092)
