"""
UTTEC Shield WS2812 NeoPixel 테스트 — Raspberry Pi 3B+ + UTTEC Shield

회로도 기준 (ai_smart_factory_schematic.pdf V1.0, port_map.py):
  - WS2812 데이터: GPIO12 (Pin 32, PWM0 채널)
  - 개수: 4개 (U4 → U8 → U9 → U10 데이지체인)
  - 구동 전압: +5V

테스트 시나리오 (약 50초):
  1. 개별 점등 — 4개 LED를 한 개씩 흰색 점등 (each 0.5s)
  2. 전체 색상 순환 — R / G / B / Yellow / Cyan / Magenta / White (each 0.8s)
  3. 점진 채우기 — 1→4번 LED를 빨강으로 순차 채움, 그 후 청색으로 비움
  4. 무지개 흐름 — HSV hue 회전 (5초)
  5. 깜빡임 — 전체 흰색 ON/OFF ×5
  6. 모두 OFF (cleanup)

실행: sudo ~/ws281x-env/bin/python ~/ws2812_test.py
       (rpi_ws281x는 /dev/mem 접근 → root 권한 필수)
"""
import time
import colorsys
from rpi_ws281x import PixelStrip, Color

LED_COUNT      = 4         # U4, U8, U9, U10
LED_PIN        = 12        # GPIO12 (Pin 32)
LED_FREQ_HZ    = 800000
LED_DMA        = 10
LED_BRIGHTNESS = 64        # 0..255 — 25%
LED_INVERT     = False
LED_CHANNEL    = 0         # GPIO12 = PWM0


def fill(strip, color, delay=0):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
    strip.show()
    if delay:
        time.sleep(delay)


def clear(strip):
    fill(strip, Color(0, 0, 0))


def step(msg):
    print(f">>> {msg}")


def main():
    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA,
                       LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()
    print(f"WS2812 init OK — {LED_COUNT} LEDs on GPIO{LED_PIN}, "
          f"brightness {LED_BRIGHTNESS}/255")

    try:
        # 1. 개별 점등
        step("1/6  개별 점등 — 4개 LED 차례로 흰색")
        for i in range(LED_COUNT):
            clear(strip)
            strip.setPixelColor(i, Color(255, 255, 255))
            strip.show()
            print(f"     LED {i+1}/{LED_COUNT} ON")
            time.sleep(0.5)

        # 2. 전체 색상 순환
        step("2/6  전체 색상 순환 — R G B Y C M W")
        for name, c in [
            ("RED",     Color(255, 0, 0)),
            ("GREEN",   Color(0, 255, 0)),
            ("BLUE",    Color(0, 0, 255)),
            ("YELLOW",  Color(255, 200, 0)),
            ("CYAN",    Color(0, 255, 255)),
            ("MAGENTA", Color(255, 0, 255)),
            ("WHITE",   Color(255, 255, 255)),
        ]:
            print(f"     all → {name}")
            fill(strip, c)
            time.sleep(0.8)

        # 3. 점진 채우기 (red) → 비우기 (blue)
        step("3/6  점진 채우기 RED → 비우기 BLUE")
        clear(strip); time.sleep(0.3)
        for i in range(LED_COUNT):
            strip.setPixelColor(i, Color(255, 0, 0)); strip.show()
            time.sleep(0.4)
        time.sleep(0.5)
        for i in range(LED_COUNT):
            strip.setPixelColor(i, Color(0, 0, 255)); strip.show()
            time.sleep(0.4)
        time.sleep(0.5)

        # 4. 무지개 흐름 (HSV hue 회전)
        step("4/6  무지개 흐름 (5초)")
        t_end = time.time() + 5.0
        offset = 0.0
        while time.time() < t_end:
            for i in range(LED_COUNT):
                h = (offset + i / LED_COUNT) % 1.0
                r, g, b = colorsys.hsv_to_rgb(h, 1.0, 1.0)
                strip.setPixelColor(i, Color(int(r*255), int(g*255), int(b*255)))
            strip.show()
            offset += 0.02
            time.sleep(0.03)

        # 5. 깜빡임
        step("5/6  전체 흰색 깜빡임 ×5")
        for n in range(5):
            print(f"     ALL WHITE ({n+1}/5)")
            fill(strip, Color(255, 255, 255)); time.sleep(0.3)
            clear(strip);                       time.sleep(0.3)

        # 6. cleanup
        step("6/6  모두 OFF")
        clear(strip)
        print("\n✅ WS2812 test 완료. 4개 LED가 단계별로 정상 점등되었는지 육안 확인.")
    finally:
        clear(strip)


if __name__ == "__main__":
    main()
