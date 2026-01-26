#!/usr/bin/env python3
"""
WS2812 LED 테스트

사용법:
    sudo python3 test_ws2812.py

주의: WS2812는 root 권한 필요
"""

import time
import board
import neopixel

LED_COUNT = 8
LED_PIN = board.D18
LED_BRIGHTNESS = 0.3

def main():
    print("=" * 40)
    print("  WS2812 LED 테스트")
    print("=" * 40)

    try:
        # LED 초기화
        print("\n[1] LED 스트립 초기화...")
        pixels = neopixel.NeoPixel(
            LED_PIN,
            LED_COUNT,
            brightness=LED_BRIGHTNESS,
            auto_write=False
        )
        print(f"    [OK] {LED_COUNT}개 LED 준비됨")

        # 테스트 시작
        print("\n[2] LED 테스트 시작...")
        print("-" * 40)

        # 테스트 1: 빨강
        print("  테스트 1: 전체 빨강")
        pixels.fill((255, 0, 0))
        pixels.show()
        time.sleep(1)

        # 테스트 2: 초록
        print("  테스트 2: 전체 초록")
        pixels.fill((0, 255, 0))
        pixels.show()
        time.sleep(1)

        # 테스트 3: 파랑
        print("  테스트 3: 전체 파랑")
        pixels.fill((0, 0, 255))
        pixels.show()
        time.sleep(1)

        # 테스트 4: 흰색
        print("  테스트 4: 전체 흰색")
        pixels.fill((255, 255, 255))
        pixels.show()
        time.sleep(1)

        # 테스트 5: 순차 점등
        print("  테스트 5: 순차 점등 (레인보우)")
        colors = [
            (255, 0, 0),    # 빨강
            (255, 127, 0),  # 주황
            (255, 255, 0),  # 노랑
            (0, 255, 0),    # 초록
            (0, 255, 255),  # 청록
            (0, 0, 255),    # 파랑
            (127, 0, 255),  # 보라
            (255, 0, 255),  # 자홍
        ]
        for i in range(LED_COUNT):
            pixels[i] = colors[i % len(colors)]
            pixels.show()
            time.sleep(0.2)
        time.sleep(1)

        # 테스트 6: 깜빡임
        print("  테스트 6: 깜빡임")
        for _ in range(3):
            pixels.fill((255, 255, 255))
            pixels.show()
            time.sleep(0.3)
            pixels.fill((0, 0, 0))
            pixels.show()
            time.sleep(0.3)

        print("-" * 40)
        print("\n[OK] 테스트 완료!")

        # LED 끄기
        pixels.fill((0, 0, 0))
        pixels.show()

    except Exception as e:
        print(f"\n[ERROR] 오류 발생: {e}")
        print("\n확인 사항:")
        print("  1. sudo로 실행했는지 확인")
        print("  2. 배선 확인 (DIN: Pin12/GPIO18)")
        print("  3. 전원 확인 (5V 충분한지)")

if __name__ == "__main__":
    main()
