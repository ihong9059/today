"""
워커 데몬 — 요청 파일을 감시하고 Claude 호출 + 빌드 + 플래싱 수행
Flask와 독립된 프로세스로 실행됩니다.
"""
import os
import sys
import json
import time
import subprocess
import re

WATCH_DIR = os.path.dirname(__file__)
REQUEST_FILE = os.path.join(WATCH_DIR, "_request.json")
STATUS_FILE = os.path.join(WATCH_DIR, "_status.json")
PROJECT_DIR = r"C:\todo\today\aiHardStudy\firmware\led_blink"
MAIN_C = os.path.join(PROJECT_DIR, "main", "main.c")
BUILD_SCRIPT = os.path.join(WATCH_DIR, "build_flash.bat")
CLAUDE_CMD = r"C:\Users\lenovo\AppData\Roaming\npm\claude.cmd"

SYSTEM_PROMPT = """당신은 ESP-IDF v5.5 기반 ESP32-WROOM-32 펌웨어 작성자입니다.

보드 핀 배치 (실측 검증 완료):
  GPIO25 = 빨강 LED (100Ω, Active HIGH: 1=켜짐, 0=꺼짐)
  GPIO26 = 노랑 LED (100Ω, Active HIGH)
  GPIO27 = 파랑 LED (100Ω, Active HIGH)
  GPIO14 = 능동 부저 BEEP (Active LOW: 0=울림, 1=멈춤)
  GPIO33 = 수동 부저 MELODY (BCX56 트랜지스터, PWM으로 음계 재생)
  GPIO32 = 택트 스위치 (Active LOW: 0=눌림, 1=해제, 내부 풀업 사용)
  GPIO21 = I2C SDA, GPIO22 = I2C SCL (10K 풀업)
  I2C 0x3C = SSD1306 OLED 128x64
  I2C 0x38 = AHT20 온습도 센서

규칙:
1. #include <stdio.h>, "freertos/FreeRTOS.h", "freertos/task.h", "driver/gpio.h" 필수
2. app_main(void)에서 시작
3. LED+I2C 동시 사용 시 LED는 별도 xTaskCreate 태스크로 분리
4. GPIO14(BEEP)는 초기에 gpio_set_level(14,1)로 OFF
5. MELODY(GPIO33)는 LEDC PWM 사용 (도=262,레=294,미=330,파=349,솔=392,라=440,시=494)
6. 스위치(GPIO32)는 gpio_set_pull_mode(32, GPIO_PULLUP_ONLY) 설정
7. OLED: ssd1306.h 포함, ssd1306_init/clear/draw_string/flush 사용
8. AHT20: 0xAC,0x33,0x00 명령 후 80ms 대기, 6바이트 읽기
9. 핵심 줄에 짧은 한국어 주석을 넣으세요. 예:
   gpio_set_level(25, 1);  // 빨간 LED 켜기
   vTaskDelay(1000 / portTICK_PERIOD_MS);  // 1초 대기
10. 코드만 출력. 설명 없이. 마크다운 없이.
"""


def write_status(state, message="", code="", error="", elapsed=0):
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump({"state": state, "message": message, "code": code,
                    "error": error, "elapsed": elapsed, "prompt": ""}, f, ensure_ascii=False)


def run_claude(prompt):
    full_prompt = SYSTEM_PROMPT + "\n\n사용자 요구사항:\n" + prompt
    result = subprocess.run(
        [CLAUDE_CMD, "-p", "-",
         "--output-format", "stream-json", "--verbose"],
        input=full_prompt,
        capture_output=True, text=True, timeout=180,
        encoding="utf-8",
    )

    texts = []
    for line in result.stdout.strip().split("\n"):
        if not line:
            continue
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                for block in data["message"]["content"]:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except (json.JSONDecodeError, KeyError):
            continue

    code = "".join(texts).strip()

    # 코드 블록 추출
    if "```" in code:
        blocks = re.findall(r'```(?:c|cpp)?\s*\n(.*?)```', code, re.DOTALL)
        if blocks:
            code = blocks[0].strip()

    # 앞쪽 설명 제거 — #include 시작점 찾기
    if code and not code.startswith("#"):
        for marker in ["#include", "#define"]:
            idx = code.find(marker)
            if idx > 0:
                code = code[idx:]
                break

    # 뒤쪽 설명 제거
    last_brace = code.rfind("}")
    if last_brace > 0:
        code = code[:last_brace + 1]

    # 최종 검증: C 코드인지 확인
    if not code.startswith("#include") and not code.startswith("#define") and "app_main" not in code:
        print(f"[Claude] WARNING: Generated text is not C code, discarding")
        return ""

    return code


def build_and_flash():
    result = subprocess.run(
        ["cmd", "/c", BUILD_SCRIPT],
        capture_output=True, text=True, timeout=300,
    )
    return result.returncode == 0, result.stdout + result.stderr


def process_request(prompt):
    start = time.time()

    # 1. 코드 생성
    write_status("generating", "AI 코드 생성 중...")
    print(f"[Worker] Generating code for: {prompt[:50]}...")
    code = run_claude(prompt)

    if not code:
        write_status("error", "코드 생성 실패", error="Claude가 코드를 생성하지 못했습니다")
        return

    print(f"[Worker] Code generated: {len(code)} chars")

    # 2. main.c 저장
    write_status("building", "빌드 + 플래싱 중...", code=code)
    with open(MAIN_C, "w", encoding="utf-8") as f:
        f.write(code)

    # 3. 빌드 + 플래싱
    print("[Worker] Building and flashing...")
    ok, log = build_and_flash()
    elapsed = time.time() - start

    if ok:
        print(f"[Worker] SUCCESS in {elapsed:.1f}s")
        write_status("done", f"완료! ({elapsed:.1f}초)", code=code, elapsed=elapsed)
    else:
        # 빌드 에러에서 핵심 부분만 추출
        error_lines = ""
        for line in log.split("\n"):
            if "error:" in line.lower() or "undefined" in line.lower() or "expected" in line.lower():
                error_lines += line + "\n"
        if not error_lines:
            error_lines = log[-800:]

        print(f"[Worker] Build failed, retrying...")
        print(f"[Worker] Error: {error_lines[:200]}")
        write_status("generating", "빌드 실패 → AI 재시도 중...", code=code)

        retry_prompt = prompt + f"\n\n이전 코드가 컴파일 에러입니다. 수정된 전체 C 코드만 출력하세요. 설명 없이.\n에러:\n{error_lines}"
        code2 = run_claude(retry_prompt)
        if code2:
            with open(MAIN_C, "w", encoding="utf-8") as f:
                f.write(code2)
            write_status("building", "재빌드 중...", code=code2)
            ok2, log2 = build_and_flash()
            elapsed = time.time() - start
            if ok2:
                write_status("done", f"재시도 성공! ({elapsed:.1f}초)", code=code2, elapsed=elapsed)
            else:
                write_status("error", "빌드 재시도 실패", code=code2, error=log2[-500:], elapsed=elapsed)
        else:
            write_status("error", "재시도 코드 생성 실패", error=log[-500:])


EXPLAIN_REQUEST = os.path.join(WATCH_DIR, "_explain_request.json")
EXPLAIN_RESULT = os.path.join(WATCH_DIR, "_explain_result.json")

EXPLAIN_PROMPT = """당신은 임베디드 프로그래밍 교육 선생님입니다.
아래 ESP32 C 코드를 프로그래밍을 처음 배우는 초보자에게 설명해주세요.

설명 규칙:
1. 한국어로 친절하게 설명합니다.
2. 코드를 블록별로 나누어 설명합니다.
3. 전문 용어는 쉬운 말로 풀어서 설명합니다.
   예: "GPIO" → "핀 번호", "HIGH" → "전압을 줌(3.3V)"
4. 각 블록이 하드웨어에서 어떤 일을 하는지 연결하여 설명합니다.
   예: "gpio_set_level(25, 1)은 GPIO25번 핀에 3.3V 전압을 주어 빨간 LED를 켭니다"
5. 코드의 전체 흐름을 마지막에 한 문장으로 요약합니다.
6. 마크다운 없이 순수 텍스트로 출력합니다.
7. 500자 이내로 간결하게 작성합니다.
"""


def explain_code(code):
    """코드를 초보자에게 설명"""
    full_prompt = EXPLAIN_PROMPT + "\n\n코드:\n" + code
    result = subprocess.run(
        [CLAUDE_CMD, "-p", "-",
         "--output-format", "stream-json", "--verbose"],
        input=full_prompt,
        capture_output=True, text=True, timeout=120,
        encoding="utf-8",
    )

    texts = []
    for line in result.stdout.strip().split("\n"):
        if not line:
            continue
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                for block in data["message"]["content"]:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except (json.JSONDecodeError, KeyError):
            continue

    return "".join(texts).strip()


if __name__ == "__main__":
    print("[Worker Daemon] Started. Watching for requests...")
    write_status("idle")

    while True:
        # 빌드 요청 처리
        if os.path.exists(REQUEST_FILE):
            try:
                with open(REQUEST_FILE, "r", encoding="utf-8") as f:
                    req = json.load(f)
                os.remove(REQUEST_FILE)
                prompt = req.get("prompt", "")
                if prompt:
                    process_request(prompt)
            except Exception as e:
                print(f"[Worker] Error: {e}")
                write_status("error", "워커 오류", error=str(e))

        # 코드 설명 요청 처리
        if os.path.exists(EXPLAIN_REQUEST):
            try:
                with open(EXPLAIN_REQUEST, "r", encoding="utf-8") as f:
                    req = json.load(f)
                os.remove(EXPLAIN_REQUEST)
                code = req.get("code", "")
                if code:
                    print("[Worker] Explaining code...")
                    explanation = explain_code(code)
                    with open(EXPLAIN_RESULT, "w", encoding="utf-8") as f:
                        json.dump({"explanation": explanation}, f, ensure_ascii=False)
                    print(f"[Worker] Explanation done ({len(explanation)} chars)")
            except Exception as e:
                print(f"[Worker] Explain error: {e}")
                with open(EXPLAIN_RESULT, "w", encoding="utf-8") as f:
                    json.dump({"error": str(e)}, f, ensure_ascii=False)

        time.sleep(1)
