# ESP32 WROOM GPIO 포트 매핑

> 회로도: `esp32wroom_30.pdf` 기반 분석

## GPIO → 디바이스 매핑 총괄표

| GPIO | 기능 | 연결 디바이스 | 커넥터 | 비고 |
|:----:|------|--------------|:------:|------|
| GPIO02 | CS | SPI_Con (J6), ext_con (J7) | J6-3, J7 | SPI Chip Select |
| GPIO04 | ADC | ext_con (J7) | J7 | ADC 입력 |
| GPIO05 | - | SPI_Con (J6), esp32_R (J2) | J6-6, J2-9 | SPI 관련 |
| GPIO12 | - | Lora_con (J5) | J5 | LoRa 모듈 연결 |
| GPIO13 | - | esp32_L (J3), ext_con (J7) | J3-13, J7 | - |
| GPIO14 | - | BZ2 (Beep) | 직접 | 부저 2 |
| **GPIO15** | **DIN** | **WS2812 LED Strip** | **외부** | **WS2812 데이터 입력** |
| GPIO16 | RX2 | Lora_con (J5) | J5 | LoRa UART RX |
| GPIO17 | TX2 | Lora_con (J5) | J5 | LoRa UART TX |
| GPIO18 | SCK | SPI_Con (J6), esp32_R (J2) | J6-5, J2-8 | SPI Clock |
| GPIO19 | MISO | SPI_Con (J6), esp32_R (J2) | J6-4, J2-7 | SPI MISO |
| GPIO21 | SDA | OLED (J1), AHT20 (J4) | J1, J4 | I2C 데이터 (R6 10K 풀업) |
| GPIO22 | SCL | OLED (J1), AHT20 (J4) | J1, J4 | I2C 클럭 (R5 10K 풀업) |
| GPIO23 | MOSI | SPI_Con (J6), esp32_R (J2) | J6-2, J2-1 | SPI MOSI |
| GPIO25 | - | D1 RED LED | 직접 | R1 470Ω 직렬 |
| GPIO26 | - | D2 YELLOW LED | 직접 | R2 470Ω 직렬 |
| GPIO27 | - | D3 GREEN LED | 직접 | R3 470Ω 직렬 |
| GPIO32 | - | SW1 Tact Switch | 직접 | R4 10K 풀업, C1 100nF 디바운스 |
| GPIO33 | - | BZ1 Buzzer | 직접 | 부저 1 |
| GPIO34 | ADC1.6 | ext_con (J7) | J3-4, J7 | 입력 전용 (ADC) |
| GPIO35 | ADC1.7 | ext_con (J7) | J3-5, J7 | 입력 전용 (ADC) |
| GPIO36 | SENSVP | ext_con (J7) | J3-2, J7 | 입력 전용 (센서 VP) |
| GPIO39 | SENSVN | ext_con (J7) | J3-3, J7 | 입력 전용 (센서 VN) |

---

## 커넥터별 상세

### J1 - OLED 디스플레이 (I2C)
| 핀 | 신호 | GPIO |
|:--:|------|:----:|
| 1 | SCL | GPIO22 |
| 2 | SDA | GPIO21 |
| 3 | GND | - |
| 4 | +3V3 | - |

- I2C 풀업 저항: R5 (SCL), R6 (SDA) 각 10KΩ → +3V3

### J2 - esp32_R (ESP32 우측 핀헤더)
| 핀 | GPIO | 기능 |
|:--:|:----:|------|
| 1 | GPIO23 | MOSI |
| 2 | GPIO22 | SCL |
| 5 | GPIO21 | SDA |
| 6 | GPIO19 | MISO |
| 7 | GPIO18 | SCK |
| 8 | GPIO05 | - |
| 9 | GPIO17 | TXD2 |
| 10 | GPIO16 | RXD2 |
| 11 | GPIO04 | ADC |
| 12 | GPIO02 | CS |
| 13 | GPIO15 | - |

### J3 - esp32_L (ESP32 좌측 핀헤더)
| 핀 | GPIO | 기능 |
|:--:|:----:|------|
| 2 | GPIO36 | SENSVP |
| 3 | GPIO39 | SENSVN |
| 4 | GPIO34 | ADC1.6 |
| 5 | GPIO35 | ADC1.7 |
| 6 | GPIO32 | - |
| 7 | GPIO33 | - |
| 8 | GPIO25 | - |
| 9 | GPIO26 | - |
| 10 | GPIO27 | - |
| 11 | GPIO14 | - |
| 12 | GPIO12 | - |
| 13 | GPIO13 | - |
| 15 | +3V3 | 전원 |

### J4 - AHT20 온습도 센서 (I2C)
| 핀 | 신호 | GPIO |
|:--:|------|:----:|
| 1 | SDA | GPIO21 |
| 3 | SCL | GPIO22 |
| 4 | +3V3 | - |

- OLED과 I2C 버스 공유

### J5 - LoRa 모듈 (Lora_con)
| 핀 | 신호 | GPIO |
|:--:|------|:----:|
| 1 | GND | - |
| 2 | +3V3 | - |
| 3 | GPIO12 | - |
| 4 | TXD2 | GPIO17 |
| 5 | RXD2 | GPIO16 |

- UART2 사용 (Serial2)

### J6 - SPI 커넥터 (SPI_Con)
| 핀 | 신호 | GPIO |
|:--:|------|:----:|
| 2 | MOSI | GPIO23 |
| 3 | CS | GPIO02 |
| 4 | MISO | GPIO19 |
| 5 | SCK | GPIO18 |
| 6 | SS | GPIO05 |

### J7 - 외부 확장 커넥터 (ext_con)
| 핀 | GPIO | 기능 |
|:--:|:----:|------|
| 1 | +3V3 | 전원 |
| 2 | GPIO04 | ADC |
| 3 | GPIO02 | CS |
| 4 | GPIO15 | - |
| 5 | GPIO13 | - |
| 6 | GPIO35 | ADC1.7 |
| 7 | GPIO34 | ADC1.6 |
| 8 | GPIO39 | SENSVN |
| 9 | GPIO39 | SENSVN |
| 10 | GPIO36 | SENSVP |

---

## 개별 디바이스

### LED 표시등
| LED | 색상 | GPIO | 저항 |
|:---:|:----:|:----:|:----:|
| D1 | RED | GPIO25 | R1 470Ω |
| D2 | YELLOW | GPIO26 | R2 470Ω |
| D3 | GREEN | GPIO27 | R3 470Ω |

### 부저
| 부저 | 용도 | GPIO |
|:----:|------|:----:|
| BZ1 | Buzzer | GPIO33 |
| BZ2 | Beep | GPIO14 |

### 스위치
| 스위치 | GPIO | 풀업 | 디바운스 |
|:------:|:----:|:----:|:--------:|
| SW1 (Tact) | GPIO32 | R4 10KΩ | C1 100nF |

---

## WS2812 LED Strip (별도 연결)

| 항목 | 내용 |
|------|------|
| **데이터 핀 (DIN)** | **GPIO15** |
| 통신 방식 | 단선 시리얼 (800kHz NRZ) |
| 전원 | 외부 5V 별도 공급 권장 |
| 레벨 시프터 | 3.3V→5V 권장 (74HCT125 등) |

> **참고**: WS2812 DIN은 회로도의 J7 ext_con 또는 J2 esp32_R의 GPIO15 핀에서 배선 가능.
> ESP32의 GPIO15는 부트 시 스트래핑 핀이므로, 외부 풀다운 시 부팅 문제 확인 필요.

---

## 버스 요약

| 버스 | 용도 | GPIO | 디바이스 |
|:----:|------|------|----------|
| I2C | 디스플레이 + 센서 | SCL(22), SDA(21) | OLED (J1), AHT20 (J4) |
| SPI | 외부 확장 | MOSI(23), MISO(19), SCK(18), CS(02/05) | SPI_Con (J6) |
| UART2 | 무선 통신 | TX2(17), RX2(16) | LoRa (J5) |
| 1-Wire | LED 제어 | DIN(15) | WS2812 |

---

## 마운팅 홀
- H1(M1), H2(M2), H3(M3), H4(M4) — 4개 코너 고정용

## 전원
- +3V3 전원 레일 사용
- PWR_FLAG 표시 (전원 체크용)
