#!/usr/bin/env python3
"""
UTTEC Pre-built Firmware Generator
catalog_source.json → Claude 코드 생성 → Arduino-CLI 빌드 → firmware_db/{no}/

Usage:
    python3 prebuild.py --all                    # 전체 빌드
    python3 prebuild.py --only A05               # 특정 항목만
    python3 prebuild.py --category A             # 카테고리 단위
    python3 prebuild.py --retry-failed           # 실패 항목 재시도
    python3 prebuild.py --dry-run                # 구조 확인 (빌드 없이)
    python3 prebuild.py --guide-only A05         # guide.json만 재생성
"""

import argparse
import hashlib
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# ─── 경로 설정 ───
SCRIPT_DIR = Path(__file__).parent
CATALOG_FILE = SCRIPT_DIR / "catalog_source.json"
FIRMWARE_DB = SCRIPT_DIR / "firmware_db"
TEMPLATE_DIR = Path(r"C:\todo\today\aiHardStudy\firmware\ble_ota_arduino")
BUILD_DIR = SCRIPT_DIR / "ble_ota_arduino"
LOG_DIR = SCRIPT_DIR / "logs"

ACLI = Path.home() / "bin" / "arduino-cli.exe"
FQBN = "esp32:esp32:esp32"

# ─── 시스템 프롬프트 ───
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

OLED API (from ssd1306.h — already included in project):
  SSD1306 oled(21, 22);   // constructor with SDA, SCL pins
  oled.init();             // call in setup() after Wire.begin()
  oled.clear();            // clear framebuffer
  oled.drawString(x, y, "text");  // draw at pixel position
  oled.display();          // flush to screen

BLE SEND/RECEIVE API (already declared globally — just use them):
  // sensorChar is a global NimBLECharacteristic* for sending data to smartphone
  // To send string data to smartphone via BLE:
  extern NimBLECharacteristic* sensorChar;
  extern bool deviceConnected;
  if (deviceConnected && sensorChar) {
    sensorChar->setValue((uint8_t*)msg, len);  // set byte data
    sensorChar->notify();                       // send notification
  }
  // To send a String:
  if (deviceConnected && sensorChar) {
    std::string s = "Hello";
    sensorChar->setValue(s);
    sensorChar->notify();
  }

  // To receive commands from smartphone:
  // The base firmware has a weak onBleReceive(String cmd) function.
  // To handle BLE commands, just define your own onBleReceive — it overrides the weak default:
  //   void onBleReceive(String cmd) {
  //     if (cmd == "RED") { digitalWrite(LED_RED, LOW); }
  //   }
  // If you don't need BLE receive, do NOT define onBleReceive at all.

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
7. Do NOT define or redeclare: initBLE, initHardware, OTA callbacks, oled, SSD1306, NimBLE code, aht20_read, CmdCallbacks, sensorChar, deviceConnected
8. The 'oled' object (SSD1306 class) is already declared globally
9. After initBLE() call, the loop() should just have delay(10000) unless you need periodic updates
10. Pin definitions are already available: LED_RED=25, LED_YELLOW=26, LED_BLUE=27, BUZZER=14
11. For melody/sound on GPIO33, ONLY use tone(33, freq, duration) and noTone(33). Do NOT use ledcSetup/ledcAttach/ledcWriteTone or any LEDC API. tone() works on ESP32 Arduino.
12. Add brief Korean comments: // [주제] 설명 (keep comments short, 1 line each)
13. For BLE two-way communication: use sensorChar->setValue()/notify() to SEND, and define onBleReceive(String cmd) to RECEIVE
14. Do NOT create your own BLE service, server, characteristics, or callbacks — they already exist
"""

GUIDE_PROMPT_TEMPLATE = """당신은 초등학생을 위한 코딩 교육 콘텐츠 작성자입니다.
아래 프롬프트와 생성된 Arduino 코드를 분석하여 학습 자료를 JSON으로 작성하세요.

프롬프트: {user_prompt}
생성된 코드:
{code}

JSON만 출력하세요 (마크다운 코드블록 없이):
{{
  "result_description": "1줄 동작 설명",
  "what_happens": ["순서 1", "순서 2", "순서 3"],
  "concepts": [{{"term": "개념명", "explanation": "초등학생이 이해할 수 있는 쉬운 설명"}}],
  "code_highlights": [{{"line": "핵심 코드 1줄", "comment": "이 코드가 하는 일"}}],
  "try_next": [{{"reason": "다음에 이것을 도전해보세요"}}],
  "quiz": {{
    "question": "이 코드에 대한 퀴즈 문제",
    "options": ["선택지A", "선택지B", "선택지C", "선택지D"],
    "answer": 0,
    "explanation": "정답 설명"
  }}
}}"""

# ─── 로깅 설정 ───
def setup_logging(log_file: Path = None):
    fmt = "%(asctime)s [%(levelname)s] %(message)s"
    handlers = [logging.StreamHandler(sys.stdout)]
    if log_file:
        log_file.parent.mkdir(parents=True, exist_ok=True)
        handlers.append(logging.FileHandler(log_file, encoding="utf-8"))
    logging.basicConfig(level=logging.INFO, format=fmt, handlers=handlers)


# ─── 카탈로그 로드 ───
def load_catalog() -> list:
    with open(CATALOG_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["items"]


# ─── Claude CLI 호출 ───
def call_claude(prompt: str) -> str:
    import tempfile
    claude_cmd = shutil.which("claude") or "claude"

    # 프롬프트를 임시 파일에 저장 후 bash cat 파이프로 전달
    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as tf:
        tf.write(prompt)
        tf_path = tf.name

    try:
        cmd = f'cat "{tf_path}" | "{claude_cmd}" -p - --output-format stream-json --verbose --model claude-sonnet-4-6'
        result = subprocess.run(
            ["bash", "-c", cmd],
            capture_output=True, text=True, timeout=180,
        )
    finally:
        os.unlink(tf_path)

    stdout = result.stdout.strip()
    if not stdout:
        raise RuntimeError(f"Claude returned empty stdout. stderr: {result.stderr[:300]}")

    # stream-json: 여러 줄의 JSON, assistant 메시지에서 텍스트 추출
    text_parts = []
    for line in stdout.split("\n"):
        line = line.strip()
        if not line:
            continue
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                content = data.get("message", {}).get("content", [])
                for block in content:
                    if block.get("type") == "text":
                        text_parts.append(block["text"])
        except json.JSONDecodeError:
            continue

    text = "\n".join(text_parts).strip()
    if not text:
        raise RuntimeError(f"No text in Claude response. Lines: {len(stdout.split(chr(10)))}")
    return text


def strip_markdown(code: str) -> str:
    """마크다운 코드블록 제거"""
    if "```c" in code:
        code = code.split("```c", 1)[1]
    elif "```cpp" in code:
        code = code.split("```cpp", 1)[1]
    elif "```" in code:
        code = code.split("```", 1)[1]
    if code.endswith("```"):
        code = code[:-3].rstrip()
    return code.strip()


def clean_code(code: str) -> str:
    """#include 제거 + 코드 정리"""
    code = strip_markdown(code)
    # 코드 시작점 찾기
    match = re.search(r'^(void |static |const |//|#)', code, re.MULTILINE)
    if match and match.start() > 0:
        code = code[match.start():]
    # #include 제거
    lines = [l for l in code.split("\n") if not l.strip().startswith("#include")]
    return "\n".join(lines)


# ─── 코드 병합 ───
def merge_code(user_code: str) -> str:
    """base firmware + user code 병합"""
    base_ino = TEMPLATE_DIR / "ble_ota_arduino.ino"
    if not base_ino.exists():
        # BUILD_DIR에 복사된 것 사용
        base_ino = BUILD_DIR / "ble_ota_arduino.ino"
    base = base_ino.read_text(encoding="utf-8")

    marker = "// ─── LED Task ───"
    if marker in base:
        base_part = base.split(marker)[0]
    else:
        base_part = base.rsplit("void setup()", 1)[0]

    # 사용자 코드에 onBleReceive가 있으면 베이스의 weak 선언 제거 (재정의 충돌 방지)
    if "onBleReceive" in user_code:
        base_part = base_part.replace(
            '__attribute__((weak)) void onBleReceive(String cmd) { }',
            '// onBleReceive: user code provides implementation'
        )

    return base_part + "\n" + marker + "\n" + user_code + "\n"


# ─── 빌드 ───
def compile_firmware() -> Path:
    """Arduino-CLI 컴파일"""
    out_dir = BUILD_DIR / "output"
    out_dir.mkdir(exist_ok=True)
    for old in out_dir.glob("*.bin"):
        old.unlink()
    # 캐시 삭제 (강제 재컴파일)
    for cached in BUILD_DIR.rglob("*.ino.cpp"):
        cached.unlink(missing_ok=True)

    result = subprocess.run(
        [str(ACLI), "compile", "--fqbn", FQBN,
         "--build-property", "build.partitions=min_spiffs",
         "--output-dir", str(out_dir),
         str(BUILD_DIR)],
        capture_output=True, text=True, timeout=300,
    )

    (BUILD_DIR / "_build_log.txt").write_text(
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
        raise RuntimeError("Build ok but .bin not found")

    return bin_path


# ─── 빌드 디렉토리 초기화 ───
def init_build_dir():
    """템플릿을 빌드 디렉토리에 복사"""
    BUILD_DIR.mkdir(parents=True, exist_ok=True)
    if not TEMPLATE_DIR.exists():
        logging.error(f"Template not found: {TEMPLATE_DIR}")
        sys.exit(1)
    for f in TEMPLATE_DIR.iterdir():
        shutil.copy2(f, BUILD_DIR / f.name)
    logging.info(f"Build dir initialized: {BUILD_DIR}")


# ─── guide.json 생성 ───
def generate_guide(user_prompt: str, code: str) -> dict:
    prompt = GUIDE_PROMPT_TEMPLATE.format(user_prompt=user_prompt, code=code)
    output = call_claude(prompt)
    output = strip_markdown(output)
    # JSON 추출
    start = output.find("{")
    end = output.rfind("}") + 1
    if start >= 0 and end > start:
        output = output[start:end]
    return json.loads(output)


# ─── catalog.json 생성 ───
def generate_catalog():
    """빌드 완료된 항목으로 catalog.json 생성"""
    items = load_catalog()
    catalog = {"version": "1.0", "board": "ESP32-WROOM-32", "total": 0, "items": []}

    for item in items:
        no = item["no"]
        bin_path = FIRMWARE_DB / no / "firmware.bin"
        if not bin_path.exists():
            continue
        bin_data = bin_path.read_bytes()
        catalog["items"].append({
            "no": no,
            "user_prompt": item["user_prompt"],
            "tags": item["tags"],
            "difficulty": item["difficulty"],
            "components": item["components"],
            "category": item["category"],
            "category_name": item["category_name"],
            "description": item["description"],
            "firmware_size": len(bin_data),
            "firmware_sha256": hashlib.sha256(bin_data).hexdigest(),
        })

    catalog["total"] = len(catalog["items"])
    out = FIRMWARE_DB / "catalog.json"
    out.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    logging.info(f"catalog.json generated: {catalog['total']} items ({out})")
    return catalog


# ─── 1건 빌드 ───
def build_one(item: dict, max_retries: int = 3, skip_guide: bool = False) -> dict:
    """1개 프롬프트 빌드: 코드 생성 → 병합 → 컴파일 → guide 생성 → 저장"""
    no = item["no"]
    user_prompt = item["user_prompt"]
    out_dir = FIRMWARE_DB / no
    out_dir.mkdir(parents=True, exist_ok=True)

    result = {"no": no, "prompt": user_prompt, "success": False, "error": "", "elapsed": 0}
    t0 = time.time()

    for attempt in range(1, max_retries + 1):
        try:
            logging.info(f"  [{no}] 시도 {attempt}/{max_retries}: {user_prompt}")

            # Step 1: 프롬프트 합성 + Claude 코드 생성
            full_prompt = f"{SYSTEM_PROMPT}\n\nUser request: {user_prompt}"
            (out_dir / "system_prompt.txt").write_text(full_prompt, encoding="utf-8")

            raw_code = call_claude(full_prompt)
            code = clean_code(raw_code)
            (out_dir / "code.ino").write_text(code, encoding="utf-8")

            if "setup" not in code:
                raise RuntimeError("Generated code missing setup()")

            # Step 2: 병합
            merged = merge_code(code)
            (BUILD_DIR / "ble_ota_arduino.ino").write_text(merged, encoding="utf-8")
            (out_dir / "merged.ino").write_text(merged, encoding="utf-8")

            # Step 3: 컴파일
            bin_path = compile_firmware()
            bin_data = bin_path.read_bytes()
            shutil.copy2(bin_path, out_dir / "firmware.bin")

            logging.info(f"  [{no}] 빌드 성공 ({len(bin_data)/1024:.0f}KB, {time.time()-t0:.1f}초)")

            # Step 4: guide.json 생성
            if not skip_guide:
                try:
                    guide = generate_guide(user_prompt, code)
                    (out_dir / "guide.json").write_text(
                        json.dumps(guide, ensure_ascii=False, indent=2), encoding="utf-8"
                    )
                    logging.info(f"  [{no}] guide.json 생성 완료")
                except Exception as ge:
                    logging.warning(f"  [{no}] guide.json 실패 (빌드는 성공): {ge}")

            result["success"] = True
            result["elapsed"] = time.time() - t0
            result["firmware_size"] = len(bin_data)
            result["firmware_sha256"] = hashlib.sha256(bin_data).hexdigest()
            return result

        except Exception as e:
            logging.warning(f"  [{no}] 시도 {attempt} 실패: {e}")
            result["error"] = str(e)
            if attempt < max_retries:
                time.sleep(2)

    result["elapsed"] = time.time() - t0
    logging.error(f"  [{no}] 최종 실패: {result['error']}")
    return result


# ─── 메인 실행 ───
def main():
    parser = argparse.ArgumentParser(description="UTTEC Pre-built Firmware Generator")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--all", action="store_true", help="전체 빌드")
    group.add_argument("--only", type=str, help="특정 항목 (예: A05)")
    group.add_argument("--category", type=str, help="카테고리 (예: A)")
    group.add_argument("--retry-failed", action="store_true", help="실패 항목 재시도")
    group.add_argument("--dry-run", action="store_true", help="구조 확인만")
    group.add_argument("--guide-only", type=str, help="guide.json만 재생성 (예: A05)")
    group.add_argument("--catalog", action="store_true", help="catalog.json 재생성")

    parser.add_argument("--max-retries", type=int, default=3, help="최대 재시도 횟수")
    parser.add_argument("--skip-guide", action="store_true", help="guide.json 생성 건너뛰기")
    args = parser.parse_args()

    # 로그 설정
    log_file = LOG_DIR / f"prebuild_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
    setup_logging(log_file)

    logging.info("=" * 60)
    logging.info("UTTEC Pre-built Firmware Generator")
    logging.info("=" * 60)

    items = load_catalog()
    logging.info(f"카탈로그 로드: {len(items)}개 항목")

    # catalog.json 재생성
    if args.catalog:
        generate_catalog()
        return

    # dry-run
    if args.dry_run:
        cats = {}
        for item in items:
            c = item["category"]
            cats[c] = cats.get(c, 0) + 1
        logging.info(f"총 {len(items)}개 항목, {len(cats)}개 카테고리")
        for c in sorted(cats):
            existing = sum(1 for i in items if i["category"] == c
                          and (FIRMWARE_DB / i["no"] / "firmware.bin").exists())
            logging.info(f"  {c}: {cats[c]}개 (빌드 완료: {existing})")
        total_built = sum(1 for i in items if (FIRMWARE_DB / i["no"] / "firmware.bin").exists())
        logging.info(f"전체 빌드 완료: {total_built}/{len(items)}")
        return

    # guide-only
    if args.guide_only:
        no = args.guide_only.upper()
        item = next((i for i in items if i["no"] == no), None)
        if not item:
            logging.error(f"항목 없음: {no}")
            return
        code_path = FIRMWARE_DB / no / "code.ino"
        if not code_path.exists():
            logging.error(f"code.ino 없음: {code_path}")
            return
        code = code_path.read_text(encoding="utf-8")
        guide = generate_guide(item["user_prompt"], code)
        out = FIRMWARE_DB / no / "guide.json"
        out.write_text(json.dumps(guide, ensure_ascii=False, indent=2), encoding="utf-8")
        logging.info(f"guide.json 재생성 완료: {out}")
        return

    # 빌드 대상 필터링
    if args.only:
        no = args.only.upper()
        targets = [i for i in items if i["no"] == no]
        if not targets:
            logging.error(f"항목 없음: {no}")
            return
    elif args.category:
        cat = args.category.upper()
        targets = [i for i in items if i["category"] == cat]
        if not targets:
            logging.error(f"카테고리 없음: {cat}")
            return
    elif args.retry_failed:
        targets = [i for i in items if not (FIRMWARE_DB / i["no"] / "firmware.bin").exists()]
        if not targets:
            logging.info("실패 항목 없음 — 모든 항목 빌드 완료!")
            return
    else:  # --all
        targets = items

    logging.info(f"빌드 대상: {len(targets)}개")
    logging.info(f"FIRMWARE_DB: {FIRMWARE_DB}")
    logging.info(f"TEMPLATE_DIR: {TEMPLATE_DIR}")
    logging.info(f"BUILD_DIR: {BUILD_DIR}")

    # 빌드 디렉토리 초기화
    FIRMWARE_DB.mkdir(parents=True, exist_ok=True)
    init_build_dir()

    # 빌드 실행
    results = []
    success_count = 0
    fail_count = 0
    total = len(targets)
    t_start = time.time()

    for idx, item in enumerate(targets, 1):
        logging.info(f"[{idx}/{total}] {item['no']}: {item['user_prompt']}")
        r = build_one(item, max_retries=args.max_retries, skip_guide=args.skip_guide)
        results.append(r)
        if r["success"]:
            success_count += 1
        else:
            fail_count += 1

        # 진행률
        elapsed = time.time() - t_start
        avg = elapsed / idx
        eta = avg * (total - idx)
        logging.info(f"  진행: {idx}/{total} (성공:{success_count} 실패:{fail_count}) "
                     f"ETA: {eta/60:.1f}분")

    # catalog.json 생성
    generate_catalog()

    # 결과 리포트
    total_elapsed = time.time() - t_start
    logging.info("")
    logging.info("=" * 60)
    logging.info("빌드 완료 리포트")
    logging.info("=" * 60)
    logging.info(f"총 소요: {total_elapsed/60:.1f}분")
    logging.info(f"성공: {success_count}/{total} ({success_count/total*100:.0f}%)")
    logging.info(f"실패: {fail_count}/{total}")

    if fail_count > 0:
        logging.info("")
        logging.info("실패 목록:")
        for r in results:
            if not r["success"]:
                logging.info(f"  {r['no']}: {r['error'][:100]}")

    # 결과 저장
    report = {
        "timestamp": datetime.now().isoformat(),
        "total": total,
        "success": success_count,
        "failed": fail_count,
        "elapsed_minutes": round(total_elapsed / 60, 1),
        "results": results,
    }
    report_path = LOG_DIR / f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    logging.info(f"리포트 저장: {report_path}")


if __name__ == "__main__":
    main()
