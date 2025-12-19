# AI Python Education System
## 라즈베리 파이 기반 AI Python 교육용 확장 보드

---

## 1. 제품 개요

### 1.1 제품 소개

라즈베리 파이에 장착하여 **AI 및 Python 프로그래밍 교육**을 위한 올인원 학습 플랫폼입니다.
다양한 센서, LED, 디스플레이, 통신 모듈을 통해 실습 중심의 프로그래밍 교육을 제공합니다.

### 1.2 교육 목표

| 분야 | 학습 내용 |
|------|-----------|
| **Python 기초** | GPIO 제어, 라이브러리 활용, 객체지향 프로그래밍 |
| **IoT** | 센서 데이터 수집, 통신 프로토콜 (I2C, SPI, UART) |
| **AI/ML** | 음성인식, 이미지 처리, 머신러닝 기초 |
| **임베디드** | ESP32 연동, 무선통신, 실시간 제어 |

### 1.3 대상 사용자

- 프로그래밍 입문자 (중/고등학생)
- 대학교 컴퓨터공학/전자공학 실습
- 메이커 및 IoT 개발자
- AI/Python 교육 기관

---

## 2. 하드웨어 구성

### 2.1 보드 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI Python Education Board                            │
│                   (Raspberry Pi HAT Format)                             │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │   ┌─────────────┐      ┌──────────────────────────────────────┐    │
  │   │   SSD1306   │      │      AHT20 + BMP280 Sensor          │    │
  │   │    OLED     │      │      (Temp/Humidity/Pressure)       │    │
  │   │  128x64     │      └──────────────────────────────────────┘    │
  │   └─────────────┘                                                   │
  │                                                                     │
  │   ┌─────────────────────────────────────────────────────────────┐  │
  │   │                      ESP32-C3 Module                        │  │
  │   │                   (WiFi + Bluetooth)                        │  │
  │   └─────────────────────────────────────────────────────────────┘  │
  │                                                                     │
  │   ┌───────┐                    ┌───┐ ┌───┐ ┌───┐ ┌───┐            │
  │   │Buzzer │                    │D4 │ │D3 │ │D2 │ │D1 │  LEDs      │
  │   │ 🔔    │        ┌───┐      │🔴│ │🔴│ │🟡│ │🔵│            │
  │   └───────┘        │SW │      └───┘ └───┘ └───┘ └───┘            │
  │                    └───┘                                           │
  │   ┌────────────────────────────────────────────────────────────┐  │
  │   │  I2C: VCC SDA SCL GND  │  SPI: MISO MOSI SCLK GND VCC     │  │
  │   └────────────────────────────────────────────────────────────┘  │
  │                                                                     │
  │   ┌────────────────────────────────────────────────────────────┐  │
  │   │              40-Pin Raspberry Pi GPIO Header               │  │
  │   │  ○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○                  │  │
  │   └────────────────────────────────────────────────────────────┘  │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘

         │         │
         │         └── Raspberry Pi USB/Ethernet Ports
         └── Connected to Raspberry Pi
```

### 2.2 구성 요소 상세

| 구성요소 | 모델/사양 | 인터페이스 | 교육 활용 |
|----------|-----------|------------|-----------|
| **MCU** | ESP32-C3 | UART/SPI | WiFi/BLE 통신, 보조 프로세서 |
| **디스플레이** | SSD1306 OLED (128x64) | I2C | 그래픽, 텍스트 출력 |
| **환경센서** | AHT20 + BMP280 | I2C | 온도/습도/기압 측정 |
| **LED (대형)** | 5mm LED x 4 (R,R,Y,B) | GPIO | 디지털 출력, PWM |
| **RGB LED** | WS2812 (네오픽셀) | 1-Wire | 어드레서블 LED 제어 |
| **버저** | 피에조 버저 | GPIO/PWM | 사운드 출력, 알림 |
| **스위치** | 택트 스위치 | GPIO | 디지털 입력, 인터럽트 |
| **LoRa** | LoRa 인터페이스 | SPI | 장거리 무선 통신 |
| **스피커** | 오디오 출력 | I2S/PWM | 음성 출력, TTS |

---

## 3. 시스템 아키텍처

### 3.1 전체 구성도

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      System Architecture                                │
└─────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────────┐
                         │    Cloud / AI       │
                         │  (OpenAI, Google)   │
                         └──────────┬──────────┘
                                    │ Internet
                                    │
                         ┌──────────┴──────────┐
                         │    Raspberry Pi     │
                         │   (Main Computer)   │
                         │                     │
                         │  ┌───────────────┐  │
                         │  │  Python       │  │
                         │  │  AI/ML        │  │
                         │  │  Libraries    │  │
                         │  └───────────────┘  │
                         └──────────┬──────────┘
                                    │ GPIO (40-pin)
                                    │
┌───────────────────────────────────┴───────────────────────────────────┐
│                        Education Board (HAT)                          │
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   ESP32-C3  │  │   SSD1306   │  │AHT20+BMP280 │  │   Buzzer    │  │
│  │  WiFi/BLE   │  │    OLED     │  │   Sensor    │  │   Sound     │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │                │         │
│         │ UART           │ I2C            │ I2C            │ GPIO    │
│         │                │                │                │         │
│  ┌──────┴────────────────┴────────────────┴────────────────┴──────┐  │
│  │                      GPIO / I2C / SPI Bus                      │  │
│  └──────┬────────────────┬────────────────┬────────────────┬──────┘  │
│         │                │                │                │         │
│  ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐  │
│  │  4x LEDs    │  │  WS2812     │  │  Switches   │  │    LoRa     │  │
│  │  (D1-D4)    │  │  RGB LED    │  │  (Input)    │  │  Interface  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

### 3.2 통신 인터페이스

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Communication Interfaces                          │
└─────────────────────────────────────────────────────────────────────┘

  Raspberry Pi
       │
       ├──── I2C Bus ─────┬──── SSD1306 OLED (0x3C)
       │                  ├──── AHT20 Sensor (0x38)
       │                  └──── BMP280 Sensor (0x76/0x77)
       │
       ├──── SPI Bus ─────┬──── LoRa Module (CE0)
       │                  └──── (확장용)
       │
       ├──── UART ────────┬──── ESP32-C3
       │                  └──── (디버그/통신)
       │
       ├──── GPIO ────────┬──── LED D1 (Blue)
       │                  ├──── LED D2 (Yellow)
       │                  ├──── LED D3 (Red)
       │                  ├──── LED D4 (Red)
       │                  ├──── Buzzer
       │                  ├──── Switch(es)
       │                  └──── WS2812 Data
       │
       └──── I2S ─────────┴──── Speaker (Audio Output)
```

---

## 4. 교육 커리큘럼

### 4.1 단계별 학습 과정

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Learning Path (학습 경로)                         │
└─────────────────────────────────────────────────────────────────────┘

  Level 1: Python 기초          Level 2: 하드웨어 제어
  ┌─────────────────────┐       ┌─────────────────────┐
  │ • 변수, 자료형       │       │ • GPIO 입출력       │
  │ • 조건문, 반복문     │ ───▶  │ • LED 제어          │
  │ • 함수, 클래스       │       │ • 버튼 입력         │
  │ • 모듈, 패키지       │       │ • PWM (버저, LED)   │
  └─────────────────────┘       └──────────┬──────────┘
                                           │
                                           ▼
  Level 4: AI/ML 응용           Level 3: 센서 & 통신
  ┌─────────────────────┐       ┌─────────────────────┐
  │ • 음성인식 (STT)    │       │ • I2C 통신          │
  │ • 음성합성 (TTS)    │ ◀───  │ • 온습도 센서       │
  │ • ChatGPT 연동      │       │ • OLED 디스플레이   │
  │ • 이미지 인식       │       │ • WiFi/BLE 통신     │
  └─────────────────────┘       └─────────────────────┘
```

### 4.2 실습 프로젝트 목록

| 레벨 | 프로젝트 | 사용 부품 | 학습 목표 |
|------|----------|-----------|-----------|
| **L1** | LED 깜빡이기 | LED | GPIO 출력, 시간 제어 |
| **L1** | 신호등 만들기 | 3색 LED | 순차 제어, 상태 머신 |
| **L1** | 버튼 LED 제어 | LED, 스위치 | GPIO 입력, 이벤트 처리 |
| **L2** | 멜로디 연주 | 버저 | PWM, 주파수 제어 |
| **L2** | RGB LED 무드등 | WS2812 | 라이브러리 활용, 색상 |
| **L2** | 온습도 모니터 | AHT20, OLED | I2C 통신, 데이터 표시 |
| **L3** | 날씨 스테이션 | AHT20, BMP280, OLED | 다중 센서, UI 설계 |
| **L3** | WiFi 데이터 전송 | ESP32-C3 | 무선통신, 네트워크 |
| **L3** | IoT 대시보드 | 센서들, WiFi | 웹서버, 데이터 시각화 |
| **L4** | 음성 비서 | 스피커, 마이크 | STT, TTS, AI API |
| **L4** | ChatGPT 로봇 | 전체 | LLM 연동, 대화 시스템 |
| **L4** | 스마트홈 제어 | LoRa, 센서 | 종합 프로젝트 |

---

## 5. Python 예제 코드

### 5.1 LED 제어 (기초)

```python
#!/usr/bin/env python3
"""
AI Python Education Board - LED Control
LED 기초 제어 예제
"""

import RPi.GPIO as GPIO
import time

# GPIO 핀 정의
LED_PINS = {
    'D1': 17,  # Blue
    'D2': 27,  # Yellow
    'D3': 22,  # Red
    'D4': 23   # Red
}

class LEDController:
    """LED 제어 클래스"""

    def __init__(self):
        """GPIO 초기화"""
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)

        for pin in LED_PINS.values():
            GPIO.setup(pin, GPIO.OUT)
            GPIO.output(pin, GPIO.LOW)

    def on(self, led_name):
        """LED 켜기"""
        if led_name in LED_PINS:
            GPIO.output(LED_PINS[led_name], GPIO.HIGH)
            print(f"💡 {led_name} ON")

    def off(self, led_name):
        """LED 끄기"""
        if led_name in LED_PINS:
            GPIO.output(LED_PINS[led_name], GPIO.LOW)
            print(f"⚫ {led_name} OFF")

    def toggle(self, led_name):
        """LED 토글"""
        if led_name in LED_PINS:
            current = GPIO.input(LED_PINS[led_name])
            GPIO.output(LED_PINS[led_name], not current)

    def all_on(self):
        """모든 LED 켜기"""
        for led in LED_PINS:
            self.on(led)

    def all_off(self):
        """모든 LED 끄기"""
        for led in LED_PINS:
            self.off(led)

    def blink(self, led_name, times=3, interval=0.5):
        """LED 깜빡이기"""
        for _ in range(times):
            self.on(led_name)
            time.sleep(interval)
            self.off(led_name)
            time.sleep(interval)

    def traffic_light(self):
        """신호등 시뮬레이션"""
        print("🚦 신호등 시작!")

        while True:
            # 빨간불
            self.on('D3')
            print("🔴 정지")
            time.sleep(3)
            self.off('D3')

            # 노란불
            self.on('D2')
            print("🟡 주의")
            time.sleep(1)
            self.off('D2')

            # 파란불
            self.on('D1')
            print("🔵 출발")
            time.sleep(3)
            self.off('D1')

    def cleanup(self):
        """GPIO 정리"""
        self.all_off()
        GPIO.cleanup()


# 실행 예제
if __name__ == "__main__":
    led = LEDController()

    try:
        print("=== LED 제어 테스트 ===\n")

        # 순차 점등
        for name in LED_PINS:
            led.on(name)
            time.sleep(0.5)

        time.sleep(1)
        led.all_off()

        # 깜빡이기
        led.blink('D1', times=5, interval=0.2)

        # 신호등 (Ctrl+C로 종료)
        # led.traffic_light()

    except KeyboardInterrupt:
        print("\n종료합니다.")
    finally:
        led.cleanup()
```

### 5.2 SSD1306 OLED 디스플레이

```python
#!/usr/bin/env python3
"""
AI Python Education Board - OLED Display
SSD1306 OLED 디스플레이 제어
"""

from PIL import Image, ImageDraw, ImageFont
import board
import busio
import adafruit_ssd1306
import time

class OLEDDisplay:
    """SSD1306 OLED 디스플레이 클래스"""

    WIDTH = 128
    HEIGHT = 64

    def __init__(self, address=0x3C):
        """OLED 초기화"""
        self.i2c = busio.I2C(board.SCL, board.SDA)
        self.display = adafruit_ssd1306.SSD1306_I2C(
            self.WIDTH, self.HEIGHT, self.i2c, addr=address
        )
        self.clear()

        # 폰트 설정
        try:
            self.font = ImageFont.truetype(
                "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12
            )
            self.font_large = ImageFont.truetype(
                "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18
            )
        except:
            self.font = ImageFont.load_default()
            self.font_large = self.font

    def clear(self):
        """화면 지우기"""
        self.display.fill(0)
        self.display.show()

    def show_text(self, text, x=0, y=0, font_size='normal'):
        """텍스트 표시"""
        image = Image.new('1', (self.WIDTH, self.HEIGHT))
        draw = ImageDraw.Draw(image)

        font = self.font_large if font_size == 'large' else self.font
        draw.text((x, y), text, font=font, fill=255)

        self.display.image(image)
        self.display.show()

    def show_multiline(self, lines):
        """여러 줄 텍스트 표시"""
        image = Image.new('1', (self.WIDTH, self.HEIGHT))
        draw = ImageDraw.Draw(image)

        y = 0
        for line in lines:
            draw.text((0, y), line, font=self.font, fill=255)
            y += 14

        self.display.image(image)
        self.display.show()

    def show_sensor_data(self, temp, humidity, pressure=None):
        """센서 데이터 표시"""
        lines = [
            "=== Sensor Data ===",
            f"Temp: {temp:.1f} C",
            f"Humidity: {humidity:.1f} %"
        ]
        if pressure:
            lines.append(f"Press: {pressure:.1f} hPa")

        self.show_multiline(lines)

    def draw_progress_bar(self, value, max_value=100, y=30):
        """프로그레스 바 그리기"""
        image = Image.new('1', (self.WIDTH, self.HEIGHT))
        draw = ImageDraw.Draw(image)

        # 텍스트
        percent = int((value / max_value) * 100)
        draw.text((0, 0), f"Progress: {percent}%", font=self.font, fill=255)

        # 바 테두리
        draw.rectangle([10, y, 117, y+15], outline=255)

        # 바 채우기
        fill_width = int((value / max_value) * 105)
        draw.rectangle([12, y+2, 12+fill_width, y+13], fill=255)

        self.display.image(image)
        self.display.show()

    def animation_demo(self):
        """간단한 애니메이션"""
        for i in range(101):
            self.draw_progress_bar(i)
            time.sleep(0.02)


# 실행 예제
if __name__ == "__main__":
    oled = OLEDDisplay()

    print("=== OLED 디스플레이 테스트 ===\n")

    # 텍스트 표시
    oled.show_text("Hello!", 30, 20, 'large')
    time.sleep(2)

    # 여러 줄 표시
    oled.show_multiline([
        "AI Python Education",
        "Board Test",
        "",
        "Press Ctrl+C to exit"
    ])
    time.sleep(2)

    # 프로그레스 바 애니메이션
    oled.animation_demo()

    oled.clear()
```

### 5.3 AHT20 + BMP280 센서

```python
#!/usr/bin/env python3
"""
AI Python Education Board - Environment Sensor
AHT20 (온습도) + BMP280 (기압) 센서 읽기
"""

import board
import busio
import time

# Adafruit 라이브러리
import adafruit_ahtx0
import adafruit_bmp280

class EnvironmentSensor:
    """환경 센서 클래스 (AHT20 + BMP280)"""

    def __init__(self):
        """센서 초기화"""
        self.i2c = busio.I2C(board.SCL, board.SDA)

        # AHT20 초기화 (온습도)
        try:
            self.aht20 = adafruit_ahtx0.AHTx0(self.i2c)
            print("✅ AHT20 센서 연결됨")
        except Exception as e:
            self.aht20 = None
            print(f"❌ AHT20 연결 실패: {e}")

        # BMP280 초기화 (기압/온도)
        try:
            self.bmp280 = adafruit_bmp280.Adafruit_BMP280_I2C(self.i2c)
            self.bmp280.sea_level_pressure = 1013.25
            print("✅ BMP280 센서 연결됨")
        except Exception as e:
            self.bmp280 = None
            print(f"❌ BMP280 연결 실패: {e}")

    def read_temperature(self):
        """온도 읽기 (AHT20 우선)"""
        if self.aht20:
            return self.aht20.temperature
        elif self.bmp280:
            return self.bmp280.temperature
        return None

    def read_humidity(self):
        """습도 읽기"""
        if self.aht20:
            return self.aht20.relative_humidity
        return None

    def read_pressure(self):
        """기압 읽기"""
        if self.bmp280:
            return self.bmp280.pressure
        return None

    def read_altitude(self):
        """고도 계산"""
        if self.bmp280:
            return self.bmp280.altitude
        return None

    def read_all(self):
        """모든 센서 데이터 읽기"""
        return {
            'temperature': self.read_temperature(),
            'humidity': self.read_humidity(),
            'pressure': self.read_pressure(),
            'altitude': self.read_altitude()
        }

    def print_data(self):
        """센서 데이터 출력"""
        data = self.read_all()

        print("\n" + "="*40)
        print("       🌡️  환경 센서 데이터")
        print("="*40)

        if data['temperature']:
            print(f"  온도     : {data['temperature']:.2f} °C")
        if data['humidity']:
            print(f"  습도     : {data['humidity']:.2f} %")
        if data['pressure']:
            print(f"  기압     : {data['pressure']:.2f} hPa")
        if data['altitude']:
            print(f"  고도     : {data['altitude']:.2f} m")

        print("="*40)

        return data


# 실행 예제
if __name__ == "__main__":
    sensor = EnvironmentSensor()

    print("\n=== 환경 센서 테스트 ===")
    print("Ctrl+C로 종료\n")

    try:
        while True:
            sensor.print_data()
            time.sleep(2)
    except KeyboardInterrupt:
        print("\n종료합니다.")
```

### 5.4 버저 멜로디 (PWM)

```python
#!/usr/bin/env python3
"""
AI Python Education Board - Buzzer
피에조 버저로 멜로디 연주
"""

import RPi.GPIO as GPIO
import time

# 버저 핀
BUZZER_PIN = 18

# 음계 주파수 정의
NOTES = {
    'C4': 262, 'D4': 294, 'E4': 330, 'F4': 349,
    'G4': 392, 'A4': 440, 'B4': 494,
    'C5': 523, 'D5': 587, 'E5': 659, 'F5': 698,
    'G5': 784, 'A5': 880, 'B5': 988,
    'REST': 0
}

class Buzzer:
    """버저 클래스"""

    def __init__(self, pin=BUZZER_PIN):
        """버저 초기화"""
        self.pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(self.pin, GPIO.OUT)
        self.pwm = GPIO.PWM(self.pin, 440)

    def tone(self, frequency, duration=0.5):
        """특정 주파수 소리 내기"""
        if frequency > 0:
            self.pwm.ChangeFrequency(frequency)
            self.pwm.start(50)
            time.sleep(duration)
            self.pwm.stop()
        else:
            time.sleep(duration)

    def play_note(self, note, duration=0.5):
        """음계 연주"""
        if note in NOTES:
            self.tone(NOTES[note], duration)

    def beep(self, times=1, duration=0.1):
        """비프음"""
        for _ in range(times):
            self.tone(1000, duration)
            time.sleep(duration)

    def play_melody(self, melody, tempo=120):
        """멜로디 연주

        Args:
            melody: [(음이름, 박자), ...] 형식
            tempo: BPM (분당 박자 수)
        """
        beat_duration = 60 / tempo

        for note, beats in melody:
            duration = beat_duration * beats
            self.play_note(note, duration * 0.9)
            time.sleep(duration * 0.1)  # 음 사이 짧은 간격

    def play_scale(self):
        """음계 연주"""
        scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
        print("🎵 음계 연주")
        for note in scale:
            print(f"  {note}")
            self.play_note(note, 0.3)

    def play_twinkle_star(self):
        """반짝반짝 작은별"""
        melody = [
            ('C4', 1), ('C4', 1), ('G4', 1), ('G4', 1),
            ('A4', 1), ('A4', 1), ('G4', 2),
            ('F4', 1), ('F4', 1), ('E4', 1), ('E4', 1),
            ('D4', 1), ('D4', 1), ('C4', 2),
        ]
        print("🎵 반짝반짝 작은별")
        self.play_melody(melody, tempo=120)

    def play_happy_birthday(self):
        """생일 축하 노래"""
        melody = [
            ('C4', 0.75), ('C4', 0.25), ('D4', 1), ('C4', 1),
            ('F4', 1), ('E4', 2),
            ('C4', 0.75), ('C4', 0.25), ('D4', 1), ('C4', 1),
            ('G4', 1), ('F4', 2),
        ]
        print("🎂 생일 축하합니다!")
        self.play_melody(melody, tempo=100)

    def cleanup(self):
        """정리"""
        self.pwm.stop()
        GPIO.cleanup(self.pin)


# 실행 예제
if __name__ == "__main__":
    buzzer = Buzzer()

    try:
        print("=== 버저 테스트 ===\n")

        # 비프음
        print("1. 비프음")
        buzzer.beep(3)
        time.sleep(1)

        # 음계
        print("\n2. 음계")
        buzzer.play_scale()
        time.sleep(1)

        # 작은별
        print("\n3. 반짝반짝 작은별")
        buzzer.play_twinkle_star()

    except KeyboardInterrupt:
        print("\n종료합니다.")
    finally:
        buzzer.cleanup()
```

### 5.5 WS2812 RGB LED (네오픽셀)

```python
#!/usr/bin/env python3
"""
AI Python Education Board - WS2812 RGB LED
네오픽셀 어드레서블 LED 제어
"""

import board
import neopixel
import time
import random

# WS2812 설정
LED_PIN = board.D12  # GPIO 12
LED_COUNT = 8        # LED 개수 (조정 필요)

class NeoPixelLED:
    """WS2812 네오픽셀 LED 클래스"""

    def __init__(self, pin=LED_PIN, count=LED_COUNT, brightness=0.3):
        """네오픽셀 초기화"""
        self.count = count
        self.pixels = neopixel.NeoPixel(
            pin, count,
            brightness=brightness,
            auto_write=False
        )
        self.clear()

    def clear(self):
        """모든 LED 끄기"""
        self.pixels.fill((0, 0, 0))
        self.pixels.show()

    def set_pixel(self, index, color):
        """개별 LED 색상 설정"""
        if 0 <= index < self.count:
            self.pixels[index] = color
            self.pixels.show()

    def fill(self, color):
        """모든 LED 같은 색상"""
        self.pixels.fill(color)
        self.pixels.show()

    def rainbow_cycle(self, wait=0.01, iterations=5):
        """무지개 효과"""
        def wheel(pos):
            if pos < 85:
                return (pos * 3, 255 - pos * 3, 0)
            elif pos < 170:
                pos -= 85
                return (255 - pos * 3, 0, pos * 3)
            else:
                pos -= 170
                return (0, pos * 3, 255 - pos * 3)

        print("🌈 무지개 효과")
        for _ in range(iterations):
            for j in range(255):
                for i in range(self.count):
                    pixel_index = (i * 256 // self.count) + j
                    self.pixels[i] = wheel(pixel_index & 255)
                self.pixels.show()
                time.sleep(wait)

    def chase(self, color, wait=0.1):
        """체이스 효과"""
        print("🏃 체이스 효과")
        for _ in range(3):
            for i in range(self.count):
                self.clear()
                self.pixels[i] = color
                self.pixels.show()
                time.sleep(wait)

    def sparkle(self, color, count=20, wait=0.05):
        """반짝임 효과"""
        print("✨ 반짝임 효과")
        for _ in range(count):
            i = random.randint(0, self.count - 1)
            self.pixels[i] = color
            self.pixels.show()
            time.sleep(wait)
            self.pixels[i] = (0, 0, 0)
            self.pixels.show()

    def color_wipe(self, color, wait=0.1):
        """색상 채우기 효과"""
        for i in range(self.count):
            self.pixels[i] = color
            self.pixels.show()
            time.sleep(wait)

    def breathing(self, color, cycles=3):
        """숨쉬기 효과"""
        print("💨 숨쉬기 효과")
        r, g, b = color
        for _ in range(cycles):
            # 밝아지기
            for brightness in range(0, 100, 5):
                factor = brightness / 100
                self.fill((int(r*factor), int(g*factor), int(b*factor)))
                time.sleep(0.03)
            # 어두워지기
            for brightness in range(100, 0, -5):
                factor = brightness / 100
                self.fill((int(r*factor), int(g*factor), int(b*factor)))
                time.sleep(0.03)


# 색상 정의
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
CYAN = (0, 255, 255)
WHITE = (255, 255, 255)
ORANGE = (255, 165, 0)


# 실행 예제
if __name__ == "__main__":
    np = NeoPixelLED(brightness=0.2)

    try:
        print("=== WS2812 네오픽셀 테스트 ===\n")

        # 색상 채우기
        print("1. 색상 채우기")
        for color in [RED, GREEN, BLUE]:
            np.color_wipe(color)
            time.sleep(0.5)

        # 무지개
        print("\n2. 무지개")
        np.rainbow_cycle(iterations=2)

        # 체이스
        print("\n3. 체이스")
        np.chase(CYAN)

        # 숨쉬기
        print("\n4. 숨쉬기")
        np.breathing(PURPLE)

        np.clear()

    except KeyboardInterrupt:
        print("\n종료합니다.")
        np.clear()
```

### 5.6 AI 음성 비서 (ChatGPT 연동)

```python
#!/usr/bin/env python3
"""
AI Python Education Board - AI Voice Assistant
ChatGPT 연동 음성 비서 예제
"""

import os
import openai
from gtts import gTTS
import pygame
import speech_recognition as sr
import tempfile

# OpenAI API 키 설정
openai.api_key = os.environ.get('OPENAI_API_KEY', 'your-api-key')

class AIAssistant:
    """AI 음성 비서 클래스"""

    def __init__(self):
        """초기화"""
        # 음성 인식기
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()

        # 오디오 재생
        pygame.mixer.init()

        # 대화 기록
        self.conversation = []

        # 시스템 프롬프트
        self.system_prompt = """
        당신은 친절한 Python 교육 도우미입니다.
        학생들에게 프로그래밍을 쉽게 설명해주세요.
        답변은 간결하고 이해하기 쉽게 해주세요.
        """

    def listen(self):
        """음성 듣기"""
        print("🎤 듣고 있습니다...")

        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)
            audio = self.recognizer.listen(source, timeout=5)

        try:
            text = self.recognizer.recognize_google(audio, language='ko-KR')
            print(f"📝 인식: {text}")
            return text
        except sr.UnknownValueError:
            print("❌ 음성을 인식하지 못했습니다.")
            return None
        except sr.RequestError as e:
            print(f"❌ 음성 인식 서비스 오류: {e}")
            return None

    def think(self, user_input):
        """ChatGPT로 응답 생성"""
        print("🤔 생각 중...")

        # 대화 기록에 추가
        self.conversation.append({
            "role": "user",
            "content": user_input
        })

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    *self.conversation[-10:]  # 최근 10개 대화만 유지
                ],
                max_tokens=200,
                temperature=0.7
            )

            answer = response.choices[0].message.content

            # 응답 저장
            self.conversation.append({
                "role": "assistant",
                "content": answer
            })

            print(f"💬 응답: {answer}")
            return answer

        except Exception as e:
            print(f"❌ API 오류: {e}")
            return "죄송합니다, 응답을 생성하지 못했습니다."

    def speak(self, text):
        """음성 출력 (TTS)"""
        print("🔊 말하는 중...")

        try:
            # gTTS로 음성 생성
            tts = gTTS(text=text, lang='ko')

            # 임시 파일에 저장
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as f:
                tts.save(f.name)
                temp_file = f.name

            # 재생
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

            while pygame.mixer.music.get_busy():
                pygame.time.Clock().tick(10)

            # 임시 파일 삭제
            os.unlink(temp_file)

        except Exception as e:
            print(f"❌ TTS 오류: {e}")

    def run(self):
        """메인 루프"""
        print("\n" + "="*50)
        print("   🤖 AI Python 교육 도우미")
        print("   '종료'라고 말하면 끝납니다.")
        print("="*50 + "\n")

        self.speak("안녕하세요! 파이썬 교육 도우미입니다. 무엇을 도와드릴까요?")

        while True:
            # 음성 입력
            user_input = self.listen()

            if user_input is None:
                continue

            # 종료 체크
            if '종료' in user_input or '끝' in user_input:
                self.speak("안녕히 가세요!")
                break

            # AI 응답 생성
            response = self.think(user_input)

            # 음성 출력
            self.speak(response)


# 간단한 텍스트 버전 (마이크 없이 테스트)
class TextAssistant(AIAssistant):
    """텍스트 기반 AI 비서"""

    def listen(self):
        """키보드 입력"""
        return input("\n💬 질문: ")

    def speak(self, text):
        """텍스트 출력"""
        print(f"\n🤖 AI: {text}\n")


# 실행 예제
if __name__ == "__main__":
    print("=== AI 음성 비서 ===\n")
    print("1. 음성 비서 (마이크 필요)")
    print("2. 텍스트 비서 (키보드 입력)")

    choice = input("\n선택: ")

    if choice == '1':
        assistant = AIAssistant()
    else:
        assistant = TextAssistant()

    try:
        assistant.run()
    except KeyboardInterrupt:
        print("\n종료합니다.")
```

### 5.7 ESP32-C3 통신

```python
#!/usr/bin/env python3
"""
AI Python Education Board - ESP32-C3 Communication
UART를 통한 ESP32-C3 통신
"""

import serial
import time
import json

class ESP32Communication:
    """ESP32-C3 UART 통신 클래스"""

    def __init__(self, port='/dev/ttyAMA0', baudrate=115200):
        """시리얼 초기화"""
        self.serial = serial.Serial(
            port=port,
            baudrate=baudrate,
            timeout=1
        )
        time.sleep(2)  # ESP32 부팅 대기
        print(f"✅ ESP32-C3 연결됨 ({port})")

    def send_command(self, command):
        """명령 전송"""
        cmd = f"{command}\n"
        self.serial.write(cmd.encode())
        print(f"📤 전송: {command}")

    def receive_response(self, timeout=2):
        """응답 수신"""
        start_time = time.time()
        response = ""

        while (time.time() - start_time) < timeout:
            if self.serial.in_waiting:
                response += self.serial.read(self.serial.in_waiting).decode()
                if '\n' in response:
                    break
            time.sleep(0.1)

        response = response.strip()
        if response:
            print(f"📥 수신: {response}")
        return response

    def send_receive(self, command, timeout=2):
        """명령 전송 후 응답 수신"""
        self.send_command(command)
        return self.receive_response(timeout)

    def get_wifi_status(self):
        """WiFi 상태 확인"""
        return self.send_receive("WIFI_STATUS")

    def connect_wifi(self, ssid, password):
        """WiFi 연결"""
        cmd = f"WIFI_CONNECT:{ssid}:{password}"
        return self.send_receive(cmd, timeout=10)

    def http_get(self, url):
        """HTTP GET 요청"""
        cmd = f"HTTP_GET:{url}"
        return self.send_receive(cmd, timeout=10)

    def send_sensor_data(self, data):
        """센서 데이터 전송"""
        json_data = json.dumps(data)
        cmd = f"SENSOR_DATA:{json_data}"
        return self.send_receive(cmd)

    def set_led(self, r, g, b):
        """ESP32 내장 LED 제어"""
        cmd = f"LED:{r}:{g}:{b}"
        return self.send_receive(cmd)

    def close(self):
        """연결 종료"""
        self.serial.close()


# 실행 예제
if __name__ == "__main__":
    esp = ESP32Communication()

    try:
        print("=== ESP32-C3 통신 테스트 ===\n")

        # WiFi 상태
        print("1. WiFi 상태 확인")
        esp.get_wifi_status()

        # LED 제어
        print("\n2. LED 제어")
        esp.set_led(255, 0, 0)  # 빨강
        time.sleep(1)
        esp.set_led(0, 255, 0)  # 초록
        time.sleep(1)
        esp.set_led(0, 0, 255)  # 파랑

        # 센서 데이터 전송
        print("\n3. 센서 데이터 전송")
        esp.send_sensor_data({
            'temperature': 25.5,
            'humidity': 60.0
        })

    except KeyboardInterrupt:
        print("\n종료합니다.")
    finally:
        esp.close()
```

---

## 6. 설치 및 설정

### 6.1 하드웨어 설치

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Installation Steps                               │
└─────────────────────────────────────────────────────────────────────┘

  Step 1: 라즈베리 파이 준비
  ┌─────────────────────────────────────────┐
  │  • Raspberry Pi 4 (4GB 이상 권장)       │
  │  • SD Card (32GB 이상)                  │
  │  • Raspberry Pi OS 설치                 │
  └─────────────────────────────────────────┘
                    │
                    ▼
  Step 2: 보드 장착
  ┌─────────────────────────────────────────┐
  │  • 전원 OFF 상태에서 작업               │
  │  • 40핀 GPIO 헤더에 정확히 정렬          │
  │  • 부드럽게 눌러서 장착                  │
  └─────────────────────────────────────────┘
                    │
                    ▼
  Step 3: 전원 연결
  ┌─────────────────────────────────────────┐
  │  • 5V 3A 이상 전원 어댑터 사용          │
  │  • USB-C 포트로 전원 연결               │
  │  • 보드 LED 점등 확인                   │
  └─────────────────────────────────────────┘
```

### 6.2 소프트웨어 설정

```bash
# 1. 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 2. I2C, SPI 활성화
sudo raspi-config
# -> Interface Options -> I2C -> Enable
# -> Interface Options -> SPI -> Enable

# 3. Python 라이브러리 설치
pip3 install RPi.GPIO
pip3 install adafruit-circuitpython-ssd1306
pip3 install adafruit-circuitpython-ahtx0
pip3 install adafruit-circuitpython-bmp280
pip3 install adafruit-circuitpython-neopixel
pip3 install rpi_ws281x
pip3 install pyserial
pip3 install Pillow

# 4. AI/음성 관련 (선택)
pip3 install openai
pip3 install gtts
pip3 install SpeechRecognition
pip3 install pygame

# 5. I2C 장치 확인
i2cdetect -y 1

# 예상 출력:
#      0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
# 00:          -- -- -- -- -- -- -- -- -- -- -- -- --
# 30:          -- -- -- -- -- -- 38 -- -- -- 3c -- --
# 40:          -- -- -- -- -- -- -- -- -- -- -- -- --
# 70:          -- -- -- -- -- -- 76 --

# 6. 재부팅
sudo reboot
```

### 6.3 핀 맵핑 참조표

| 기능 | GPIO | 물리 핀 | 비고 |
|------|------|---------|------|
| LED D1 (Blue) | GPIO 17 | Pin 11 | 디지털 출력 |
| LED D2 (Yellow) | GPIO 27 | Pin 13 | 디지털 출력 |
| LED D3 (Red) | GPIO 22 | Pin 15 | 디지털 출력 |
| LED D4 (Red) | GPIO 23 | Pin 16 | 디지털 출력 |
| Buzzer | GPIO 18 | Pin 12 | PWM 가능 |
| Switch | GPIO 24 | Pin 18 | 풀업/풀다운 |
| WS2812 | GPIO 12 | Pin 32 | PWM |
| I2C SDA | GPIO 2 | Pin 3 | I2C 데이터 |
| I2C SCL | GPIO 3 | Pin 5 | I2C 클럭 |
| SPI MOSI | GPIO 10 | Pin 19 | SPI 데이터 |
| SPI MISO | GPIO 9 | Pin 21 | SPI 데이터 |
| SPI SCLK | GPIO 11 | Pin 23 | SPI 클럭 |
| UART TX | GPIO 14 | Pin 8 | ESP32 RX |
| UART RX | GPIO 15 | Pin 10 | ESP32 TX |

---

## 7. 기술 사양

### 7.1 보드 사양

| 항목 | 사양 |
|------|------|
| **폼팩터** | Raspberry Pi HAT |
| **호환** | Raspberry Pi 3B/3B+/4B/5 |
| **크기** | 65 x 56 mm |
| **전원** | 5V (라즈베리파이 공급) |
| **통신** | I2C, SPI, UART, GPIO |

### 7.2 ESP32-C3 모듈 사양

| 항목 | 사양 |
|------|------|
| **칩셋** | ESP32-C3 |
| **코어** | RISC-V 32-bit, 160MHz |
| **WiFi** | 802.11 b/g/n (2.4GHz) |
| **Bluetooth** | BLE 5.0 |
| **Flash** | 4MB |
| **SRAM** | 400KB |

### 7.3 센서 사양

| 센서 | 측정 범위 | 정확도 |
|------|-----------|--------|
| **AHT20 온도** | -40°C ~ 85°C | ±0.3°C |
| **AHT20 습도** | 0~100% RH | ±2% RH |
| **BMP280 기압** | 300~1100 hPa | ±1 hPa |
| **BMP280 온도** | -40°C ~ 85°C | ±1°C |

---

## 8. 문의

### 제품 정보
- **제품명**: AI Python Education Board
- **버전**: 1.0
- **대상**: Python/AI 교육

### 연락처
- **제조사**:
- **이메일**:
- **웹사이트**:

---

*© 2024 AI Python Education System. All Rights Reserved.*
