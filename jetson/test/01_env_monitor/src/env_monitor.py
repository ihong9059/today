#!/usr/bin/env python3
"""
Jetson Nano 환경 모니터
- AHT20: 온습도 센서 (I2C)
- WS2812: LED 시각화 (PWM)

사용법:
    sudo python3 env_monitor.py
"""

import time
import board
import adafruit_ahtx0
import neopixel

# ===== 설정 =====
LED_COUNT = 8           # WS2812 LED 개수
LED_PIN = board.D18     # GPIO18 (Pin 12)
LED_BRIGHTNESS = 0.3    # 밝기 (0.0 ~ 1.0)

# 온도 범위 (°C)
TEMP_MIN = 15.0
TEMP_MAX = 35.0

# 습도 범위 (%)
HUMID_MIN = 30.0
HUMID_MAX = 80.0

# ===== 초기화 =====
def init_sensor():
    """AHT20 센서 초기화"""
    i2c = board.I2C()
    sensor = adafruit_ahtx0.AHTx0(i2c)
    return sensor

def init_led():
    """WS2812 LED 초기화"""
    pixels = neopixel.NeoPixel(
        LED_PIN,
        LED_COUNT,
        brightness=LED_BRIGHTNESS,
        auto_write=False
    )
    return pixels

# ===== 색상 변환 =====
def temp_to_color(temp):
    """
    온도를 색상으로 변환
    - 낮은 온도: 파랑 (0, 0, 255)
    - 높은 온도: 빨강 (255, 0, 0)
    """
    # 온도를 0~1 범위로 정규화
    ratio = (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)
    ratio = max(0, min(1, ratio))  # 0~1 클램핑

    # 파랑 → 초록 → 빨강 그라데이션
    if ratio < 0.5:
        # 파랑 → 초록
        r = 0
        g = int(255 * (ratio * 2))
        b = int(255 * (1 - ratio * 2))
    else:
        # 초록 → 빨강
        r = int(255 * ((ratio - 0.5) * 2))
        g = int(255 * (1 - (ratio - 0.5) * 2))
        b = 0

    return (r, g, b)

def humid_to_color(humid):
    """
    습도를 색상으로 변환
    - 낮은 습도: 노랑 (255, 200, 0)
    - 높은 습도: 청록 (0, 200, 255)
    """
    ratio = (humid - HUMID_MIN) / (HUMID_MAX - HUMID_MIN)
    ratio = max(0, min(1, ratio))

    r = int(255 * (1 - ratio))
    g = 200
    b = int(255 * ratio)

    return (r, g, b)

# ===== LED 업데이트 =====
def update_leds(pixels, temp, humid):
    """
    LED 색상 업데이트
    - LED 0-3: 온도 표시
    - LED 4-7: 습도 표시
    """
    temp_color = temp_to_color(temp)
    humid_color = humid_to_color(humid)

    # 온도 LED (0-3)
    for i in range(4):
        pixels[i] = temp_color

    # 습도 LED (4-7)
    for i in range(4, 8):
        pixels[i] = humid_color

    pixels.show()

# ===== 메인 =====
def main():
    print("=" * 50)
    print("  Jetson Nano 환경 모니터")
    print("  AHT20 + WS2812")
    print("=" * 50)

    # 초기화
    print("\n[초기화]")
    try:
        sensor = init_sensor()
        print("  [OK] AHT20 센서 연결됨")
    except Exception as e:
        print(f"  [ERROR] AHT20 연결 실패: {e}")
        return

    try:
        pixels = init_led()
        print("  [OK] WS2812 LED 연결됨")
    except Exception as e:
        print(f"  [ERROR] WS2812 연결 실패: {e}")
        return

    print("\n[모니터링 시작] (Ctrl+C로 종료)")
    print("-" * 50)

    try:
        while True:
            # 센서 읽기
            temp = sensor.temperature
            humid = sensor.relative_humidity

            # LED 업데이트
            update_leds(pixels, temp, humid)

            # 콘솔 출력
            print(f"\r  온도: {temp:5.1f}C | 습도: {humid:5.1f}%", end="", flush=True)

            time.sleep(1)

    except KeyboardInterrupt:
        print("\n\n[종료]")
        # LED 끄기
        pixels.fill((0, 0, 0))
        pixels.show()
        print("  모니터링 종료됨")

if __name__ == "__main__":
    main()
