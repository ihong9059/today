#!/usr/bin/env python3
"""
AHT20 온습도 센서 테스트

사용법:
    python3 test_aht20.py
"""

import time
import board
import adafruit_ahtx0

def main():
    print("=" * 40)
    print("  AHT20 센서 테스트")
    print("=" * 40)

    try:
        # I2C 초기화
        print("\n[1] I2C 버스 초기화...")
        i2c = board.I2C()
        print("    [OK] I2C 버스 준비됨")

        # 센서 초기화
        print("\n[2] AHT20 센서 연결...")
        sensor = adafruit_ahtx0.AHTx0(i2c)
        print("    [OK] 센서 연결 성공!")

        # 측정
        print("\n[3] 5초간 측정 시작...")
        print("-" * 40)

        for i in range(5):
            temp = sensor.temperature
            humid = sensor.relative_humidity
            print(f"  [{i+1}] 온도: {temp:6.2f}C | 습도: {humid:6.2f}%")
            time.sleep(1)

        print("-" * 40)
        print("\n[OK] 테스트 완료!")

    except Exception as e:
        print(f"\n[ERROR] 오류 발생: {e}")
        print("\n확인 사항:")
        print("  1. 배선 확인 (SDA: Pin3, SCL: Pin5)")
        print("  2. I2C 활성화 확인: ls /dev/i2c-*")
        print("  3. 장치 스캔: sudo i2cdetect -y -r 1")

if __name__ == "__main__":
    main()
