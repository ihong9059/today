# Raspberry Pi 교육보드 포트 설명서

**보드명:** raspberry_esp32c3 (Raspberry Pi 40핀 HAT)

---

## GPIO 핀맵 요약

| 장치 | RPi 핀 | BCM GPIO | 제어 방식 |
|------|:------:|:--------:|-----------|
| **I2C SDA** | 3 | GPIO2 | I2C Bus 1 |
| **I2C SCL** | 5 | GPIO3 | I2C Bus 1 |
| **SWITCH** | 7 | GPIO4 | 입력, Active LOW (내부 풀업) |
| **TX** | 8 | GPIO14 | UART → ESP32 RX |
| **RX** | 10 | GPIO15 | UART ← ESP32 TX |
| **RED LED** | 11 | GPIO17 | 출력, **LOW=켜짐** (100Ω) |
| **YELLOW LED** | 13 | GPIO27 | 출력, **LOW=켜짐** (100Ω) |
| **BLUE LED** | 15 | GPIO22 | 출력, **LOW=켜짐** (100Ω) |
| **MOSI** | 19 | GPIO10 | SPI |
| **MISO** | 21 | GPIO9 | SPI |
| **SCLK** | 23 | GPIO11 | SPI |
| **ALARM (부저)** | 29 | GPIO5 | 출력, **LOW=울림** (2.7kHz 능동부저) |
| **DIN (WS2812)** | 32 | GPIO12 | NeoPixel 4개, PWM |
| **SPEAKER** | 33 | GPIO13 | PWM 출력, 트랜지스터(BCX56) 경유 |

---

## I2C 장치

| 장치 | 주소 | 설명 |
|------|:----:|------|
| AHT20 | 0x38 | 온습도 센서 |
| OLED | 0x3C | 128x64 SSD1306 |

---

## Python 핀 정의

```python
# I2C
I2C_SDA = 2
I2C_SCL = 3

# LED
LED_RED = 17
LED_YELLOW = 27
LED_BLUE = 22

# 입력
BUTTON = 4  # Active LOW

# 출력
ALARM = 5        # 부저
NEOPIXEL = 12    # WS2812 x4
SPEAKER = 13     # PWM

# UART (ESP32 통신)
UART_TX = 14
UART_RX = 15
```

---

## 필요 라이브러리

```bash
pip3 install RPi.GPIO adafruit-circuitpython-ahtx0 adafruit-circuitpython-ssd1306 adafruit-circuitpython-neopixel rpi_ws281x Pillow pyserial
```
