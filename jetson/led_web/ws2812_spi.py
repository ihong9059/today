#!/usr/bin/env python3
"""
WS2812 LED 제어 (SPI 방식)
Jetson Nano용 - 안정적인 타이밍
"""

import spidev
import time

class WS2812_SPI:
    """SPI를 이용한 WS2812 제어"""

    # WS2812 타이밍을 SPI 비트로 변환
    # SPI 6.4MHz에서 각 비트는 ~156ns
    # 0 bit: 0b11000000 (high ~312ns, low ~937ns)
    # 1 bit: 0b11111100 (high ~937ns, low ~312ns)

    def __init__(self, num_leds, spi_bus=0, spi_device=0, brightness=1.0):
        self.num_leds = num_leds
        self.brightness = max(0.0, min(1.0, brightness))
        self.pixels = [(0, 0, 0)] * num_leds

        # SPI 초기화
        self.spi = spidev.SpiDev()
        self.spi.open(spi_bus, spi_device)
        self.spi.max_speed_hz = 6400000  # 6.4 MHz
        self.spi.mode = 0b00

        print(f"[OK] WS2812 SPI 초기화 (LED: {num_leds}, 밝기: {int(brightness*100)}%)")

    def _byte_to_spi(self, byte):
        """1바이트를 SPI 데이터로 변환 (8비트 -> 8바이트)"""
        result = []
        for i in range(8):
            if byte & (0x80 >> i):
                result.append(0b11111100)  # 1 bit
            else:
                result.append(0b11000000)  # 0 bit
        return result

    def _color_to_spi(self, r, g, b):
        """RGB를 SPI 데이터로 변환 (GRB 순서)"""
        # 밝기 적용
        r = int(r * self.brightness)
        g = int(g * self.brightness)
        b = int(b * self.brightness)

        # GRB 순서
        data = []
        data.extend(self._byte_to_spi(g))
        data.extend(self._byte_to_spi(r))
        data.extend(self._byte_to_spi(b))
        return data

    def set_pixel(self, index, r, g, b):
        """개별 LED 색상 설정"""
        if 0 <= index < self.num_leds:
            self.pixels[index] = (r, g, b)

    def set_pixel_color(self, index, color):
        """개별 LED 색상 설정 (tuple)"""
        if 0 <= index < self.num_leds:
            self.pixels[index] = color

    def fill(self, r, g, b):
        """전체 LED 동일 색상"""
        self.pixels = [(r, g, b)] * self.num_leds

    def clear(self):
        """전체 LED 끄기"""
        self.fill(0, 0, 0)
        self.show()

    def show(self):
        """LED 업데이트"""
        # 모든 픽셀 데이터 생성
        data = []
        for r, g, b in self.pixels:
            data.extend(self._color_to_spi(r, g, b))

        # Reset 신호 (low 상태 유지)
        data.extend([0x00] * 32)

        # SPI 전송
        self.spi.xfer2(data)

    def close(self):
        """정리"""
        self.clear()
        self.spi.close()


# 테스트
if __name__ == "__main__":
    print("=" * 50)
    print("  WS2812 SPI 테스트")
    print("=" * 50)

    NUM_LEDS = 64
    BRIGHTNESS = 0.33  # 1/3

    led = WS2812_SPI(NUM_LEDS, spi_bus=1, spi_device=0, brightness=BRIGHTNESS)

    print("\n[테스트 1] 순차 점등 (초록)")
    for i in range(NUM_LEDS):
        led.set_pixel(i, 0, 255, 0)
        led.show()
        print(f"\r  LED {i}/63", end="", flush=True)
        time.sleep(0.1)
    print(" - 완료")

    time.sleep(1)

    print("[테스트 2] 전체 빨강")
    led.fill(255, 0, 0)
    led.show()
    time.sleep(1)

    print("[테스트 3] 전체 파랑")
    led.fill(0, 0, 255)
    led.show()
    time.sleep(1)

    print("[테스트 4] 끄기")
    led.clear()

    led.close()
    print("\n테스트 완료!")
