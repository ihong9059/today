# ESP32-C6-LCD-1.47 (Waveshare) 하드웨어 사양

## MCU

| 항목 | 사양 |
|------|------|
| SoC | ESP32-C6FH4 |
| CPU | RISC-V 싱글코어 160MHz + 저전력코어 20MHz |
| SRAM | 512KB |
| PSRAM | 없음 |
| Flash | 4MB |
| USB | Type-C |
| Arduino FQBN | esp32:esp32:esp32c6 |
| COM 포트 | COM22 |

## 내장 디스플레이

| 항목 | 사양 |
|------|------|
| 크기 | 1.47인치 TFT LCD |
| 해상도 | 172 x 320 |
| 드라이버 | ST7789 (SPI) |
| 백라이트 | PWM 제어 (GPIO22) |

### LCD 핀 매핑

| LCD 신호 | GPIO |
|----------|:----:|
| MOSI | 6 |
| SCLK | 7 |
| CS | 14 |
| DC | 15 |
| RST | 21 |
| BL | 22 |

## 내장 주변장치

| 구성요소 | 상세 | GPIO |
|----------|------|:----:|
| WS2812 RGB LED | 1개 | GPIO8 |
| TF카드 슬롯 | MicroSD (SPI) | MISO=5, CS=4 |
| RESET 버튼 | 리셋 | - |
| BOOT 버튼 | 부트모드 | GPIO9 |

## 연결성

| 항목 | 사양 |
|------|------|
| WiFi | **WiFi 6** (802.11ax) 2.4GHz |
| Bluetooth | BLE 5.0 |
| Zigbee | 3.0 |
| Thread | 지원 |

## 사용 가능 GPIO

```
내부 사용: GPIO4~8 (TF+RGB), GPIO14~15 (LCD), GPIO21~22 (LCD)
사용 가능: GPIO0~3, GPIO9~13, GPIO16~20, GPIO23
```

## 회로 상세 (Schematic)

### 회로도 다운로드

| 자료 | URL |
|------|-----|
| 회로도 PDF | https://files.waveshare.com/wiki/ESP32-C6-LCD-1.47/ESP32-C6-LCD-1.47_schemetics.pdf |
| 3D 도면 | https://files.waveshare.com/wiki/ESP32-C6-LCD-1.47/ESP32-C6-LCD-1.47-3D_Drawing.rar |
| LCD 데이터시트 | https://files.waveshare.com/wiki/ESP32-C6-LCD-1.47/1.47inch_LCD_Datasheet.pdf |
| 데모 코드 | https://files.waveshare.com/wiki/ESP32-C6-LCD-1.47/ESP32-C6-LCD-1.47-Demo.zip |
| 공식 위키 | https://www.waveshare.com/wiki/ESP32-C6-LCD-1.47 |

### 전원 회로 (Power Supply)

| 항목 | 사양 |
|------|------|
| 입력 | USB Type-C 5V |
| LDO | ME6217C33M5G (3.3V 출력) |
| 최대 출력 전류 | 800mA |
| 출력 전압 | 3.3V (MCU, LCD, 주변장치) |
| 외부 핀 | 5V, 3.3V, GND 제공 |

```
USB Type-C 5V ──► ME6217C33M5G LDO ──► 3.3V (ESP32-C6, LCD, WS2812 등)
                 │
                 └──► 5V 핀 (외부 출력)
```

### LCD 회로 (ST7789V SPI)

LCD와 TF카드가 SPI 버스를 공유 (MOSI, SCLK).

| LCD 신호 | GPIO | 설명 |
|----------|:----:|------|
| MOSI (SDA) | GPIO6 | SPI 데이터 출력 (공유) |
| SCLK (SCL) | GPIO7 | SPI 클럭 (공유) |
| LCD_CS | GPIO14 | LCD 칩 선택 (Active Low) |
| LCD_DC | GPIO15 | Data/Command 선택 |
| LCD_RST | GPIO21 | LCD 리셋 (Active Low) |
| LCD_BL | GPIO22 | 백라이트 PWM (LEDC) |

```
ESP32-C6                    ST7789V (1.47" LCD)
─────────                   ───────────────────
GPIO6  (MOSI) ────────────► SDA
GPIO7  (SCLK) ────────────► SCL
GPIO14 (CS)   ────────────► CS  (Active Low)
GPIO15 (DC)   ────────────► DC  (0=Command, 1=Data)
GPIO21 (RST)  ────────────► RST (Active Low)
GPIO22 (BL)   ──[PWM]─────► Backlight
3.3V          ────────────► VDD
GND           ────────────► GND
```

- 해상도: 172x320 (칩은 240x320 지원, height offset = 34px)
- 컬러: 262K (RGB565)
- SPI 속도: 4~5 MHz 이상
- SPI 모드: 0 또는 3

### TF카드 회로 (MicroSD SPI)

LCD와 SPI 버스 공유 (MOSI=GPIO6, SCLK=GPIO7).

| TF 신호 | GPIO | 설명 |
|---------|:----:|------|
| MISO | GPIO5 | SPI 데이터 입력 |
| MOSI | GPIO6 | SPI 데이터 출력 (LCD 공유) |
| SCLK | GPIO7 | SPI 클럭 (LCD 공유) |
| SD_CS | GPIO4 | TF카드 칩 선택 (Active Low) |
| SD_D1 | NC | 미사용 |
| SD_D2 | NC | 미사용 |

```
ESP32-C6                    TF Card (MicroSD)
─────────                   ─────────────────
GPIO5  (MISO) ◄──────────── DAT0 (MISO)
GPIO6  (MOSI) ────────────► CMD  (MOSI)  ← LCD와 공유
GPIO7  (SCLK) ────────────► CLK  (SCLK)  ← LCD와 공유
GPIO4  (CS)   ────────────► DAT3 (CS, Active Low)
3.3V          ────────────► VDD
GND           ────────────► GND
```

### WS2812 RGB LED 회로

| 항목 | 사양 |
|------|------|
| LED 타입 | WS2812B (NeoPixel) |
| 제어 핀 | GPIO8 |
| 구동 방식 | ESP32 RMT (Remote Control) |
| 색상 순서 | GRB |
| 수량 | 1개 |
| 특이사항 | 투명 아크릴 인터레이어 장착 |

```
ESP32-C6                    WS2812B
─────────                   ───────
GPIO8 (DIN) ──────────────► DIN
3.3V        ──────────────► VDD
GND         ──────────────► GND
```

### 버튼 회로

| 버튼 | GPIO | 기능 |
|------|:----:|------|
| BOOT | GPIO9 | 부트모드 진입 (BOOT + RESET 동시) |
| RESET | EN핀 | 시스템 리셋 |

```
BOOT 버튼:  GPIO9 ──[Button]── GND  (내부 풀업, 누르면 LOW)
RESET 버튼: EN   ──[Button]── GND  (누르면 칩 리셋)
```

- 다운로드 모드 진입: BOOT 누른 상태에서 RESET 누르고 놓기
- GPIO9는 부트 후 일반 GPIO로 사용 가능

### USB 회로

| 항목 | 사양 |
|------|------|
| 커넥터 | USB Type-C |
| 기능 | 전원 공급 + 시리얼 통신 |
| USB 모드 | Full-speed USB Serial (내장) |
| 별도 USB-UART 칩 | 불필요 (ESP32-C6 내장 USB) |

### I2C 기본 핀 (사용 가능)

| 신호 | GPIO |
|------|:----:|
| SDA | GPIO1 |
| SCL | GPIO2 |

### 전체 GPIO 할당 요약

| GPIO | 용도 | 비고 |
|:----:|------|------|
| 0 | **사용 가능** | |
| 1 | **사용 가능** (I2C SDA) | I2C 기본핀 |
| 2 | **사용 가능** (I2C SCL) | I2C 기본핀 |
| 3 | **사용 가능** | |
| 4 | TF카드 CS | Active Low |
| 5 | TF카드 MISO | SPI 입력 |
| 6 | SPI MOSI | LCD + TF 공유 |
| 7 | SPI SCLK | LCD + TF 공유 |
| 8 | WS2812 RGB LED | RMT 제어 |
| 9 | BOOT 버튼 | 부트 후 사용 가능 |
| 10~13 | **사용 가능** | |
| 14 | LCD CS | Active Low |
| 15 | LCD DC | Data/Command |
| 16~20 | **사용 가능** | |
| 21 | LCD RST | Active Low |
| 22 | LCD BL | PWM 백라이트 |
| 23 | **사용 가능** | |

- 외부 헤더: 2x 9핀 (총 18핀), GPIO 13개 + UART/I2C/PWM + ADC 6개 + 5V/3.3V/GND

## 물리 사양

| 항목 | 값 |
|------|-----|
| 크기 | 36.37 x 20.32 mm (USB 커넥터 제외) |
| 가격 | ~$12 (~16,000원) |
