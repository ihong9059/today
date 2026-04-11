"""
Claude 코드 생성 워커 — 별도 프로세스로 실행
사용법: python claude_worker.py "프롬프트" output.c
"""
import subprocess
import json
import sys
import os
import re

CLAUDE_CMD = r"C:\Users\lenovo\AppData\Roaming\npm\claude.cmd"

SYSTEM_PROMPT = """당신은 ESP-IDF v5.5 기반 ESP32-WROOM-32 펌웨어 작성자입니다.

보드 핀 배치 (실측 검증 완료):
  GPIO25 = 빨강 LED (100Ω, Active HIGH: 1=켜짐, 0=꺼짐)
  GPIO26 = 노랑 LED (100Ω, Active HIGH)
  GPIO27 = 파랑 LED (100Ω, Active HIGH)
  GPIO14 = 능동 부저 BEEP (Active LOW: 0=울림, 1=멈춤)
  GPIO33 = 수동 부저 MELODY (BCX56 트랜지스터, PWM으로 음계 재생)
  GPIO32 = 택트 스위치 (Active LOW: 0=눌림, 1=해제, 내부 풀업 사용)
  GPIO21 = I2C SDA (10K 외부 풀업)
  GPIO22 = I2C SCL (10K 외부 풀업)
  I2C 0x3C = SSD1306 OLED 128x64
  I2C 0x38 = AHT20 온습도 센서

중요 규칙:
1. #include는 반드시 다음을 포함:
   #include <stdio.h>
   #include "freertos/FreeRTOS.h"
   #include "freertos/task.h"
   #include "driver/gpio.h"
   필요 시: "driver/ledc.h" (PWM), "driver/i2c.h" (I2C)

2. app_main(void) 함수에서 시작합니다.

3. LED 제어와 I2C 통신을 동시에 사용할 때는 LED를 별도 FreeRTOS 태스크(xTaskCreate)로 분리해야 합니다.

4. 부저(BEEP, GPIO14)는 초기에 반드시 gpio_set_level(14, 1)로 OFF 해야 합니다 (Active LOW).

5. MELODY 부저(GPIO33)로 음을 내려면 LEDC PWM을 사용합니다:
   ledc_timer_config + ledc_channel_config
   ledc_set_freq(LEDC_LOW_SPEED_MODE, LEDC_TIMER_0, 주파수Hz)
   ledc_set_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0, 128)
   ledc_update_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0)

6. 스위치(GPIO32)는 gpio_set_pull_mode(32, GPIO_PULLUP_ONLY)로 풀업 설정.

7. OLED 사용 시 ssd1306.h와 korean_bitmaps.h를 #include.
   ssd1306_init(I2C_NUM_0), ssd1306_clear(), ssd1306_draw_string(x,y,"text"), ssd1306_flush(I2C_NUM_0)

8. AHT20: i2c_master_write_to_device(I2C_NUM_0, 0x38, {0xAC,0x33,0x00}, 3, ...)
   80ms 대기 후 6바이트 읽기. 습도/온도 변환 공식 적용.

9. 음계: 도=262, 레=294, 미=330, 파=349, 솔=392, 라=440, 시=494, 높은도=523

10. 코드만 출력합니다. 설명, 마크다운 없이 순수 C 코드만.
"""


def run_claude(prompt):
    full_prompt = SYSTEM_PROMPT + "\n\n사용자 요구사항:\n" + prompt

    # 프롬프트를 임시 파일로 전달 (Windows 커맨드라인 길이/인코딩 제한 회피)
    prompt_file = os.path.join(os.path.dirname(__file__), "_prompt_temp.txt")
    with open(prompt_file, "w", encoding="utf-8") as f:
        f.write(full_prompt)

    # stdin으로 프롬프트 전달
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
                content = data.get("message", {}).get("content", [])
                for block in content:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except json.JSONDecodeError:
            continue

    code = "".join(texts).strip()

    # ```c ... ``` 코드 블록 추출
    if "```" in code:
        blocks = re.findall(r'```(?:c|cpp)?\s*\n(.*?)```', code, re.DOTALL)
        if blocks:
            code = blocks[0].strip()
        else:
            lines = code.split("\n")
            lines = [l for l in lines if not l.strip().startswith("```")]
            code = "\n".join(lines).strip()

    # 앞쪽 설명 제거
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

    return code


if __name__ == "__main__":
    # 인자 파싱: --file prompt_file output_file 또는 "prompt" output_file
    if sys.argv[1] == "--file":
        prompt_file = sys.argv[2]
        output_file = sys.argv[3]
        with open(prompt_file, "r", encoding="utf-8") as f:
            prompt = f.read().strip()
    else:
        prompt = sys.argv[1]
        output_file = sys.argv[2]

    code = run_claude(prompt)
    if code:
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"OK:{len(code)}")
    else:
        print("FAIL:no_code")
        sys.exit(1)
