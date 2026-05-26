"""
UTTEC Shield OLED 테스트 — Raspberry Pi 3B+ + UTTEC Shield (raspberry_esp32c3 V1.0)

회로도 기준 (ai_smart_factory_schematic.pdf V1.0, port_map.py):
  - OLED 모듈: U3 (I2C, 2542WR-04P 커넥터)
  - I2C 버스: /dev/i2c-1 (SDA=GPIO2 Pin3, SCL=GPIO3 Pin5)
  - 동일 버스 공유: AHT20(U5), AHT20 확장(U2)
  - OLED 주소: SSD1306 기본 0x3C (대안 0x3D — i2cdetect로 사전 확인 권장)

테스트 시나리오 (5단계, 각 2초):
  1. 전체 화면 채우기 (display ON 확인)
  2. 전체 화면 비우기 (display OFF 확인)
  3. 문자열 출력 — 보드명·시간·핀 정보
  4. 도형 출력 — 사각형 테두리·대각선·원
  5. 카운트다운 5→0 (1초 간격)

요구 패키지: python3-luma.oled python3-smbus python3-pil i2c-tools
실행: python3 oled_test.py [--addr 0x3C] [--width 128] [--height 64]
"""

import argparse
import time
from datetime import datetime

from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import ssd1306
from PIL import ImageFont


def parse_args():
    p = argparse.ArgumentParser(description="UTTEC Shield OLED test")
    p.add_argument("--addr", default="0x3C", help="I2C address (default 0x3C)")
    p.add_argument("--port", type=int, default=1, help="I2C bus number (default 1)")
    p.add_argument("--width", type=int, default=128, help="display width px")
    p.add_argument("--height", type=int, default=64, help="display height px")
    return p.parse_args()


def step(title):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {title}")


def main():
    args = parse_args()
    addr = int(args.addr, 16)
    print(f"OLED test → bus=/dev/i2c-{args.port} addr={hex(addr)} "
          f"{args.width}x{args.height}")

    serial = i2c(port=args.port, address=addr)
    device = ssd1306(serial, width=args.width, height=args.height)

    font = ImageFont.load_default()

    # 1. 전체 채우기
    step("1/5 fill — 전체 화면 ON")
    with canvas(device) as draw:
        draw.rectangle(device.bounding_box, fill="white")
    time.sleep(2)

    # 2. 전체 비우기
    step("2/5 clear — 전체 화면 OFF")
    device.clear()
    time.sleep(2)

    # 3. 텍스트 — 보드명 + 시간 + I2C 주소
    step("3/5 text — 보드명·시간·주소")
    with canvas(device) as draw:
        draw.text((2, 0),  "UTTEC Shield V1.0", font=font, fill="white")
        draw.text((2, 12), "RPi 3B+ I2C-1",      font=font, fill="white")
        draw.text((2, 24), f"OLED @ {hex(addr)}", font=font, fill="white")
        draw.text((2, 36), datetime.now().strftime("%Y-%m-%d %H:%M"),
                  font=font, fill="white")
        draw.text((2, 50), "SDA=GPIO2 SCL=GPIO3", font=font, fill="white")
    time.sleep(3)

    # 4. 도형 — 테두리 + 대각선 + 원
    step("4/5 shapes — 테두리·대각선·원")
    with canvas(device) as draw:
        w, h = device.width, device.height
        draw.rectangle((0, 0, w - 1, h - 1), outline="white")
        draw.line((0, 0, w - 1, h - 1), fill="white")
        draw.line((0, h - 1, w - 1, 0), fill="white")
        r = min(w, h) // 4
        cx, cy = w // 2, h // 2
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline="white")
    time.sleep(3)

    # 5. 카운트다운
    step("5/5 countdown — 5→0")
    for n in range(5, -1, -1):
        with canvas(device) as draw:
            draw.text((4, 2), "COUNTDOWN", font=font, fill="white")
            # 큰 숫자는 기본 font가 너무 작음 → 단순 표시
            draw.text((50, 24), str(n), font=font, fill="white")
            draw.rectangle((0, 50, (device.width - 1) * n // 5, device.height - 1),
                           fill="white")
        time.sleep(1)

    device.clear()
    print("\n✅ OLED test 완료. 화면이 1~5 모든 단계에서 정상 출력되었는지 육안 확인.")


if __name__ == "__main__":
    main()
