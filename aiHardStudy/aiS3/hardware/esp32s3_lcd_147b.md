# ESP32-S3-LCD-1.47B (Waveshare) 하드웨어 사양

## MCU

| 항목 | 사양 |
|------|------|
| SoC | ESP32-S3R8 |
| CPU | Xtensa 듀얼코어 LX7, 240MHz |
| SRAM | 512KB |
| PSRAM | 8MB |
| Flash | 16MB |
| USB | Type-C |
| Arduino FQBN | esp32:esp32:waveshare_esp32_s3_lcd_147 |
| COM 포트 | COM22 |

## 내장 디스플레이

| 항목 | 사양 |
|------|------|
| 크기 | 1.47인치 TFT LCD |
| 해상도 | 172 x 320 |
| 드라이버 | ST7789 (SPI) |
| 백라이트 | PWM 제어 (GPIO46) |

### LCD 핀 매핑

| LCD 신호 | GPIO |
|----------|:----:|
| MOSI | 45 |
| SCLK | 40 |
| CS | 42 |
| DC | 41 |
| RST | 39 |
| BL | 46 |

## 내장 센서/주변장치

| 구성요소 | 상세 | GPIO/인터페이스 |
|----------|------|:---------------:|
| QMI8658 IMU | 6축 (가속도+자이로) | I2C |
| WS2812 RGB LED | 1개 | GPIO38 |
| TF카드 슬롯 | MicroSD, 4-bit SDIO | GPIO14~18,21 |
| 배터리 충전 | 3.7V Li-ion 충전 회로 | VBAT 핀 |
| RESET 버튼 | 리셋 | - |
| BOOT 버튼 | 부트모드 | - |

## 연결성

| 항목 | 사양 |
|------|------|
| WiFi | 2.4GHz 802.11 b/g/n |
| Bluetooth | BLE 5.0 |

## 사용 가능 GPIO (핀 헤더)

```
좌측: 5V, GND, 3V3, GP0, GP2, GP3, GP4, GP5, GP6
우측: TX, RX, VBAT, GND, GP11, GP10, GP9, GP8, GP7
```

## 물리 사양

| 항목 | 값 |
|------|-----|
| 크기 | 36.37 x 20.32 mm |
| 가격 | ~$13 (~17,000원) |

## 보드 비교 (UTTEC 프로젝트)

| | WROOM (사전빌드) | C3 Mini (사전빌드_mini) | S3-LCD-1.47B (aiS3) |
|---|:-:|:-:|:-:|
| CPU | 듀얼코어 240MHz | 싱글코어 160MHz | 듀얼코어 240MHz |
| RAM | 520KB | 400KB | 512KB + 8MB PSRAM |
| Flash | 4MB | 4MB | 16MB |
| 디스플레이 | 외장 OLED | 외장 OLED | **1.47" 컬러 LCD 내장** |
| IMU | 없음 | 없음 | **QMI8658 6축** |
| SD카드 | 없음 | 없음 | **MicroSD 슬롯** |
| RGB LED | 없음 (단색 3개) | GPIO1 (1개) | GPIO38 (1개) |
| 스피커 | GPIO14+33 | GPIO2 | **없음 (외장 필요)** |
| 스위치 | GPIO32 | GPIO5 | **BOOT 버튼만** |
| BLE | 4.2 | 5.0 | 5.0 |
| 가격 | ~$5 | ~$3 | ~$13 |
