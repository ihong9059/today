"""
UTTEC Firmware — Cloud Arduino Build Server (Linux/DO)
프롬프트 → Claude 코드 생성 → Arduino-CLI 빌드 → .bin 다운로드

API: build_server_arduino.py와 호환
"""

import asyncio
import hashlib
import os
import platform
import re
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

app = FastAPI(title="UTTEC Firmware Cloud Arduino Build Server", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

# ─── 경로 설정 (Linux) ───
ACLI = Path("/usr/local/bin/arduino-cli")
FQBN = "esp32:esp32:esp32"
TEMPLATE_DIR = Path.home() / "vibe-firmware" / "arduino" / "ble_ota_arduino"
JOBS_DIR = Path.home() / "vibe-firmware" / "jobs_arduino"
JOBS_DIR.mkdir(parents=True, exist_ok=True)
# 폴더명 = .ino 파일명과 일치해야 함
SHARED_BUILD_DIR = Path.home() / "vibe-firmware" / "ble_ota_arduino"

# 웹 앱 정적 파일
APP_DIR = Path.home() / "vibe-firmware" / "app"
if APP_DIR.exists():
    app.mount("/app", StaticFiles(directory=str(APP_DIR), html=True), name="app")

_build_lock = False
jobs = {}

# ─── 시스템 프롬프트 (Arduino용) ───
SYSTEM_PROMPT = """You are an ESP32 firmware generator using Arduino framework.
The target board is ESP32-WROOM-32 DevKitC (38-pin) with:
- LED: RED=GPIO25, YELLOW=GPIO26, BLUE=GPIO27 (active LOW: LOW=ON, HIGH=OFF)
- Buzzer (active LOW): GPIO14
- Melody buzzer (PWM): GPIO33
- OLED SSD1306 I2C: SDA=GPIO21, SCL=GPIO22, addr=0x3C
- AHT20 temp/humidity I2C: addr=0x38
- Switch: GPIO32 (INPUT_PULLUP, active LOW)

AHT20 API (already included — just call it, do NOT redefine):
  float temp, humi;
  bool ok = aht20_read(temp, humi);  // returns true on success
  // temp = temperature in Celsius, humi = humidity in %

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
   initHardware();          // initializes ALL pins (LED, buzzer, OLED) — already exists, MUST call
   initBLE();              // BLE OTA init (function already exists)
5. Use standard Arduino: pinMode, digitalWrite, analogRead, delay, millis
   DO NOT call pinMode for LED_RED/LED_YELLOW/LED_BLUE/BUZZER — initHardware() already does this.
   DO NOT call Wire.begin or oled.init — initHardware() already does this.
6. For LED tasks use xTaskCreate with separate function
7. Do NOT define or redeclare: initBLE, initHardware, OTA callbacks, oled, SSD1306, NimBLE code, aht20_read
8. The 'oled' object (SSD1306 class) is already declared globally
9. After initBLE() call, the loop() should just have delay(10000)
10. Pin definitions are already available: LED_RED=25, LED_YELLOW=26, LED_BLUE=27, BUZZER=14
11. For melody/sound on GPIO33, ONLY use tone(33, freq, duration) and noTone(33). Do NOT use ledcSetup/ledcAttach/ledcWriteTone or any LEDC API. tone() works on ESP32 Arduino.
12. Add brief Korean comments: // [주제] 설명 (keep comments short, 1 line each)
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
    """Claude CLI로 Arduino 코드 생성 (Linux) — stdin 파이프 방식"""
    full_prompt = f"{SYSTEM_PROMPT}\n\nUser request: {prompt}"

    claude_cmd = shutil.which("claude") or "claude"
    prompt_file = work_dir / "_prompt.txt"
    prompt_file.write_text(full_prompt, encoding="utf-8")

    try:
        result = subprocess.run(
            [claude_cmd, "-p", "-", "--output-format", "text",
             "--model", "claude-sonnet-4-6", "--tools", ""],
            input=full_prompt,
            capture_output=True, text=True, timeout=180,
            cwd=str(work_dir),
        )
    except Exception as e:
        raise RuntimeError(f"Claude error: {e}")

    code = result.stdout.strip()
    if not code:
        raise RuntimeError(f"Claude returned empty. stderr: {result.stderr[:300]}")

    # 마크다운 코드블록 제거
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
    for f in TEMPLATE_DIR.iterdir():
        shutil.copy2(f, SHARED_BUILD_DIR / f.name)


def build_firmware(work_dir: Path) -> Path:
    """Arduino-CLI 빌드 (Linux)"""
    out_dir = work_dir / "output"
    out_dir.mkdir(exist_ok=True)
    for old_bin in out_dir.glob("*.bin"):
        old_bin.unlink()
    # 캐시의 .ino.cpp 삭제하여 재컴파일 강제
    for cached in work_dir.rglob("*.ino.cpp"):
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
    timing = {}
    job["timing"] = timing

    job_dir = JOBS_DIR / job_id
    job_dir.mkdir(exist_ok=True)

    try:
        t0 = time.time()
        await asyncio.to_thread(_init_shared_build)
        work_dir = SHARED_BUILD_DIR
        timing["1_init"] = round(time.time() - t0, 1)

        attempts = 0
        last_error = None

        while attempts < max_retries:
            attempts += 1
            try:
                # ── Step 1: Claude 코드 생성 ──
                job["message"] = f"① AI 코드 생성 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 10 + (attempts - 1) * 5

                t1 = time.time()
                code = await asyncio.to_thread(generate_code_with_claude, prompt, job_dir)
                timing[f"2_claude_gen(try{attempts})"] = round(time.time() - t1, 1)

                (job_dir / "generated_code.ino").write_text(code, encoding="utf-8")
                job["generated_code"] = code

                # ── Step 2: 코드 병합 ──
                t2 = time.time()
                base_ino = TEMPLATE_DIR / "ble_ota_arduino.ino"
                base_code = base_ino.read_text(encoding="utf-8")

                marker = "// ─── LED Task ───"
                if marker in base_code:
                    ble_base = base_code.split(marker)[0]
                else:
                    ble_base = base_code.rsplit("void setup()", 1)[0]

                user_code = code.strip()
                match = re.search(r'^(void |static |const |//|#)', user_code, re.MULTILINE)
                if match and match.start() > 0:
                    user_code = user_code[match.start():]
                lines = user_code.split("\n")
                clean_lines = [l for l in lines if not l.strip().startswith("#include")]
                user_code = "\n".join(clean_lines)

                merged = ble_base + "\n" + marker + "\n" + user_code + "\n"
                (work_dir / "ble_ota_arduino.ino").write_text(merged, encoding="utf-8")
                timing["3_merge"] = round(time.time() - t2, 1)

                # ── Step 3: Arduino 빌드 ──
                job["status"] = "building"
                job["message"] = f"③ 펌웨어 빌드 중 (시도 {attempts}/{max_retries})..."
                job["progress"] = 40 + (attempts - 1) * 10

                t3 = time.time()
                while _build_lock:
                    await asyncio.sleep(1)
                _build_lock = True
                try:
                    bin_path = await asyncio.to_thread(build_firmware, work_dir)
                finally:
                    _build_lock = False
                timing[f"4_build(try{attempts})"] = round(time.time() - t3, 1)

                # ── Step 4: 결과 복사 ──
                t4 = time.time()
                job_bin = job_dir / "firmware.bin"
                shutil.copy2(bin_path, job_bin)
                fw_data = job_bin.read_bytes()
                fw_sha256 = hashlib.sha256(fw_data).hexdigest()
                timing["5_copy_hash"] = round(time.time() - t4, 1)

                total = round(time.time() - t_start, 1)
                timing["total"] = total

                job["status"] = "success"
                job["message"] = f"빌드 성공! (총 {total}초)"
                job["progress"] = 100
                job["firmware_size"] = len(fw_data)
                job["firmware_sha256"] = fw_sha256
                job["bin_path"] = str(job_bin)
                job["elapsed"] = total
                return

            except Exception as e:
                last_error = f"{type(e).__name__}: {e}"
                timing[f"error_try{attempts}"] = last_error[:100]
                job["message"] = f"시도 {attempts} 실패: {last_error[:100]}"
                if not retry_on_fail or attempts >= max_retries:
                    break

        job["status"] = "failed"
        job["message"] = f"빌드 실패 ({attempts}회): {last_error[:200]}"
        job["elapsed"] = round(time.time() - t_start, 1)
    except Exception as e:
        job["status"] = "failed"
        job["message"] = f"오류: {str(e)[:200]}"
        job["elapsed"] = round(time.time() - t_start, 1)


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
    return {
        "job_id": job["job_id"], "status": job["status"], "progress": job["progress"],
        "message": job["message"], "firmware_size": job.get("firmware_size", 0),
        "firmware_sha256": job.get("firmware_sha256", ""), "elapsed": job.get("elapsed", 0),
        "timing": job.get("timing", {}),
    }

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

@app.get("/api/v1/code/{job_id}")
async def get_code(job_id: str):
    if job_id not in jobs: raise HTTPException(404, "Job not found")
    return {"code": jobs[job_id].get("generated_code", ""), "status": jobs[job_id]["status"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8092)
