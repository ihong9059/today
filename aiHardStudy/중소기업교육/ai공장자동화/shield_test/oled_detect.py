"""
OLED 컨트롤러·해상도 자동 진단 — 4개 조합 순회

0x3C에 응답하지만 화면 무출력일 때 사용. 가능한 컨트롤러:
  - SSD1306 128x64 (가장 흔함, 0.96 inch)
  - SSD1306 128x32 (0.91 inch)
  - SH1106  128x64 (1.3 inch, 대만 모듈에서 흔함, column offset 2)
  - SH1106  128x32 (드묾)

각 조합으로 인덱스 + 컨트롤러명 + 해상도를 4초간 표시.
어느 단계에서 화면이 나타나는지 육안 확인 → 그게 정답 모듈.
"""
import time
from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import ssd1306, sh1106
from PIL import ImageFont

CANDIDATES = [
    ("SSD1306", 128, 64, ssd1306),
    ("SSD1306", 128, 32, ssd1306),
    ("SH1106",  128, 64, sh1106),
    ("SH1106",  128, 32, sh1106),
]

font = ImageFont.load_default()
serial = i2c(port=1, address=0x3C)

print("OLED 진단 — 4개 조합 순회 (각 4초)")
print("어느 단계에서 화면이 나타나는지 확인하세요.\n")

for idx, (name, w, h, cls) in enumerate(CANDIDATES, 1):
    print(f"[{idx}/4] {name} {w}x{h}  ← 화면 확인")
    try:
        device = cls(serial, width=w, height=h)
        with canvas(device) as draw:
            draw.rectangle(device.bounding_box, outline="white")
            draw.text((4, 2),  f"#{idx} OF 4",     font=font, fill="white")
            draw.text((4, 14), name,               font=font, fill="white")
            draw.text((4, 26), f"{w} x {h}",       font=font, fill="white")
            if h >= 64:
                draw.text((4, 40), "VISIBLE = OK", font=font, fill="white")
                draw.text((4, 52), "remember #",   font=font, fill="white")
        time.sleep(4)
        try:
            device.clear()
        except Exception:
            pass
    except Exception as e:
        print(f"    ERROR: {e}")
        time.sleep(1)

print("\n진단 종료. 화면이 나타난 단계 번호 + 표시된 컨트롤러·해상도를 알려주세요.")
print("4단계 모두 무출력이면 → 컨트롤러가 SSD1306/SH1106이 아닌 다른 chip "
      "(SSD1305/SH1107/ST7567 등) 또는 디스플레이 전원/리본 문제일 가능성.")
