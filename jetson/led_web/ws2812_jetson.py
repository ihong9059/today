#!/usr/bin/env python3
"""
WS2812 LED 제어 모듈 (Jetson Nano용)
Jetson.GPIO + PWM 방식
"""

import time

class WS2812:
    def __init__(self, pin, num_leds, brightness=1.0):
        self.pin = pin
        self.num_leds = num_leds
        self.brightness = brightness
        self.pixels = [(0, 0, 0)] * num_leds
        self.pwm = None
        self._init_gpio()

    def _init_gpio(self):
        """GPIO 초기화"""
        try:
            import Jetson.GPIO as GPIO
            GPIO.setmode(GPIO.BOARD)
            GPIO.setwarnings(False)
            GPIO.setup(self.pin, GPIO.OUT, initial=GPIO.LOW)
            self.GPIO = GPIO
            print(f"[OK] GPIO {self.pin} 초기화")
            return True
        except Exception as e:
            print(f"[ERROR] GPIO 초기화 실패: {e}")
            return False

    def _send_byte(self, byte):
        """1바이트 전송 (비트뱅잉)"""
        for i in range(8):
            if byte & 0x80:
                # 1 bit: high 0.8us, low 0.45us
                self.GPIO.output(self.pin, self.GPIO.HIGH)
                self.GPIO.output(self.pin, self.GPIO.HIGH)
                self.GPIO.output(self.pin, self.GPIO.LOW)
            else:
                # 0 bit: high 0.4us, low 0.85us
                self.GPIO.output(self.pin, self.GPIO.HIGH)
                self.GPIO.output(self.pin, self.GPIO.LOW)
                self.GPIO.output(self.pin, self.GPIO.LOW)
            byte <<= 1

    def _send_color(self, r, g, b):
        """GRB 순서로 색상 전송"""
        # 밝기 적용
        r = int(r * self.brightness)
        g = int(g * self.brightness)
        b = int(b * self.brightness)

        self._send_byte(g)
        self._send_byte(r)
        self._send_byte(b)

    def set_pixel(self, index, r, g, b):
        """개별 LED 색상 설정"""
        if 0 <= index < self.num_leds:
            self.pixels[index] = (r, g, b)

    def fill(self, r, g, b):
        """전체 LED 색상 설정"""
        self.pixels = [(r, g, b)] * self.num_leds

    def clear(self):
        """전체 LED 끄기"""
        self.fill(0, 0, 0)
        self.show()

    def show(self):
        """LED 업데이트"""
        try:
            for r, g, b in self.pixels:
                self._send_color(r, g, b)
            # Reset signal (low for 50us)
            self.GPIO.output(self.pin, self.GPIO.LOW)
            time.sleep(0.00005)
        except Exception as e:
            print(f"[ERROR] LED show 실패: {e}")

    def cleanup(self):
        """정리"""
        try:
            self.clear()
            self.GPIO.cleanup()
        except:
            pass


# 테스트
if __name__ == "__main__":
    print("WS2812 테스트 (64 LEDs, Pin 12)")

    led = WS2812(pin=12, num_leds=64, brightness=0.33)

    print("순차 점등 테스트...")
    for i in range(64):
        led.set_pixel(i, 0, 255, 0)  # 초록
        led.show()
        time.sleep(0.1)

    print("완료")
    time.sleep(1)
    led.clear()
    led.cleanup()
