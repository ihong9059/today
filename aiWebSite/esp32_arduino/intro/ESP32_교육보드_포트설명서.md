# ESP32 교육보드 포트 설명서

**보드명:** esp32wroom_250806
**MCU:** ESP32-DevKitC (38핀)
**버전:** V1.0
**작성일:** 2025-12-27

## 1. 핀 맵 요약

### 1.1 GPIO 할당 현황

| GPIO | 신호명 | 기능 | 연결 부품 | 비고 |
|------|--------|------|-----------|------|
| IO32 | SWITCH | 디지털 입력 | SW1 (택트 스위치) | 풀다운 (100nF) |
| IO33 | MELODY | PWM 출력 | BUZ2 (트랜지스터 Q1 경유) | 멜로디 부저 |
| IO25 | RED | 디지털 출력 | LED U6 (빨강) | 100Ω 저항 |
| IO26 | YELLOW | 디지털 출력 | LED U7 (노랑) | 100Ω 저항 |
| IO27 | BLUE | 디지털 출력 | LED U8 (파랑) | 100Ω 저항 |
| IO14 | BEEP | 디지털 출력 | BUZ1 (비프 부저) | 직접 연결 |
| IO22 | SCL | I2C 클럭 | OLED, AHT20 | 10KΩ 풀업 |
| IO21 | SDA | I2C 데이터 | OLED, AHT20 | 10KΩ 풀업 |
| IO19 | MISO | SPI 입력 | SPI 장치용 | - |
| IO18 | SCK | SPI 클럭 | SPI 장치용 | - |
| IO5 | SS | SPI 슬레이브 선택 | SPI 장치용 | - |
| IO23 | MOSI | SPI 출력 | SPI 장치용 | - |
| IO17 | TXD2 | UART2 송신 | LoRa 모듈 | - |
| IO16 | RXD2 | UART2 수신 | LoRa 모듈 | - |
| IO4 | M1 | 디지털 출력 | LoRa 모듈 | 모드 설정 |
| IO15 | M0 | 디지털 출력 | LoRa 모듈 | 모드 설정 |


## 2. 부품별 상세 설명

### 2.1 LED (3색 신호등)

| LED | 색상 | GPIO | 저항 | 부품번호 |
|-----|------|------|------|----------|
| U6 | 빨강 (RED) | IO25 | R1 (100Ω) | XL-1004SURD |
| U7 | 노랑 (YELLOW) | IO26 | R2 (100Ω) | XL-1004SURD |
| U8 | 파랑 (BLUE) | IO27 | R3 (100Ω) | XL-1004SURD |

**제어 방법:**
- Low Active
- HIGH (3.3V) → LED OFF
- LOW (0V) → LED ON
- PWM으로 밝기 조절 가능

### 2.2 부저 (Buzzer)

| 부저 | 타입 | GPIO | 제어방식 | 부품번호 |
|------|------|------|----------|----------|
| BUZ1 | 비프 부저 | IO14 (BEEP) | 직접 구동 | Buzzer_12x9.5RM6.5 |
| BUZ2 | 멜로디 부저 | IO33 (MELODY) | 트랜지스터(Q1) 구동 | Buzzer_12x9.5RM6.5 |

**BUZ1 (비프 부저):** 단순 ON/OFF 알림음
**제어 방법:**
- Low Active
**BUZ2 (멜로디 부저):** PWM으로 다양한 주파수 출력 가능
**제어 방법:**
- pwm

```cpp
// 핀 정의
#define BUZZER_BEEP   14
#define BUZZER_MELODY 33

// 비프음
digitalWrite(BUZZER_BEEP, HIGH);
delay(100);
digitalWrite(BUZZER_BEEP, LOW);

// 멜로디 (tone 함수 사용)
tone(BUZZER_MELODY, 1000, 500);  // 1kHz, 500ms
```

### 2.3 스위치 (Switch)

| 스위치 | GPIO | 타입 | 회로 | 부품번호 |
|--------|------|------|------|----------|
| SW1 | IO32 (SWITCH) | 택트 스위치 | 풀다운 (100nF 디바운싱) | TS-1088-AR02016 |
**제어 방법:**
- Low Active


### 2.4 I2C 장치 (OLED, AHT20)

| 장치 | 주소 | 연결 | 기능 |
|------|------|------|------|
| OLED (U9) | 0x3C | SDA(IO21), SCL(IO22) | 128x64 디스플레이 |
| AHT20 (U10) | 0x38 | SDA(IO21), SCL(IO22) | 온습도 센서 |

**I2C 풀업저항:** R5, R6 (각 10KΩ)

```cpp
// I2C 핀 정의
#define I2C_SDA 21
#define I2C_SCL 22

// Wire 라이브러리 초기화
#include <Wire.h>
Wire.begin(I2C_SDA, I2C_SCL);
```

**OLED 사용 (Adafruit SSD1306):**
```cpp
#include <Adafruit_SSD1306.h>
Adafruit_SSD1306 display(128, 64, &Wire, -1);
display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
```

**AHT20 온습도 센서:**
```cpp
#include <Adafruit_AHTX0.h>
Adafruit_AHTX0 aht;
aht.begin();
```

### 2.5 SPI 인터페이스

| 신호 | GPIO | 설명 |
|------|------|------|
| MOSI | IO23 | Master Out Slave In |
| MISO | IO19 | Master In Slave Out |
| SCK | IO18 | Serial Clock |
| SS | IO5 | Slave Select (Chip Select) |

**용도:** SD카드, TFT LCD, 기타 SPI 장치 연결용

```cpp
// SPI 핀 정의
#define SPI_MOSI 23
#define SPI_MISO 19
#define SPI_SCK  18
#define SPI_SS   5

#include <SPI.h>
SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI, SPI_SS);
```

---

### 2.6 LoRa 모듈 (H2 커넥터)

| 핀 | 신호 | GPIO | 설명 |
|----|------|------|------|
| 1 | AUX | IO34 | 모듈 상태 (입력 전용) |
| 2 | TXD2 | IO17 | ESP32 → LoRa |
| 3 | RXD2 | IO16 | LoRa → ESP32 |
| 4 | GND | - | 접지 |
| 5 | M0 | IO15 | 모드 설정 비트 0 |
| 6 | M1 | IO4 | 모드 설정 비트 1 |
| 7 | VCC | - | 전원 (3.3V) |

**LoRa 모드 설정:**
| M1 | M0 | 모드 |
|----|----|----|
| 0 | 0 | 일반 모드 (송수신) |
| 0 | 1 | Wake-Up 모드 |
| 1 | 0 | 저전력 모드 |
| 1 | 1 | 설정 모드 |

```cpp
// LoRa 핀 정의
#define LORA_AUX  34
#define LORA_TXD  17
#define LORA_RXD  16
#define LORA_M0   15
#define LORA_M1   4

// Serial2로 LoRa 통신
Serial2.begin(9600, SERIAL_8N1, LORA_RXD, LORA_TXD);
```


---

## 6. 교육용 핀 요약표

| 기능 | GPIO | Arduino 상수 | 설명 |
|------|------|--------------|------|
| **LED** | | | |
| 빨강 LED | 25 | `LED_RED` | 디지털 출력 |
| 노랑 LED | 26 | `LED_YELLOW` | 디지털 출력 |
| 파랑 LED | 27 | `LED_BLUE` | 디지털 출력 |
| **부저** | | | |
| 비프 | 14 | `BUZZER_BEEP` | 디지털 출력 |
| 멜로디 | 33 | `BUZZER_MELODY` | PWM 출력 |
| **입력** | | | |
| 스위치 | 32 | `SWITCH_PIN` | 디지털 입력 |
| **I2C** | | | |
| SDA | 21 | `I2C_SDA` | OLED, AHT20 |
| SCL | 22 | `I2C_SCL` | OLED, AHT20 |
| **SPI** | | | |
| MOSI | 23 | `SPI_MOSI` | - |
| MISO | 19 | `SPI_MISO` | - |
| SCK | 18 | `SPI_SCK` | - |
| SS | 5 | `SPI_SS` | - |
| **LoRa** | | | |
| TXD | 17 | `LORA_TXD` | Serial2 TX |
| RXD | 16 | `LORA_RXD` | Serial2 RX |
| M0 | 15 | `LORA_M0` | 모드 설정 |
| M1 | 4 | `LORA_M1` | 모드 설정 |
| AUX | 34 | `LORA_AUX` | 상태 입력 |


## 7. 공통 헤더 파일 예시

```cpp
// esp32_edu_board.h
// ESP32 교육보드 핀 정의

#ifndef ESP32_EDU_BOARD_H
#define ESP32_EDU_BOARD_H

// ===== LED =====
#define LED_RED       25
#define LED_YELLOW    26
#define LED_BLUE      27

// ===== 부저 =====
#define BUZZER_BEEP   14
#define BUZZER_MELODY 33

// ===== 스위치 =====
#define SWITCH_PIN    32

// ===== I2C =====
#define I2C_SDA       21
#define I2C_SCL       22
#define OLED_ADDR     0x3C
#define AHT20_ADDR    0x38

// ===== SPI =====
#define SPI_MOSI      23
#define SPI_MISO      19
#define SPI_SCK       18
#define SPI_SS        5

// ===== LoRa =====
#define LORA_TXD      17
#define LORA_RXD      16
#define LORA_M0       15
#define LORA_M1       4
#define LORA_AUX      34

// ===== 테스트 포인트 =====
#define TP1_PIN       36  // ADC 입력 전용
#define TP2_PIN       39  // ADC 입력 전용
#define TP3_PIN       12  // 범용 GPIO
#define TP4_PIN       13  // 범용 GPIO

// ===== 보드 초기화 함수 =====
void initBoard() {
    // LED 출력 설정
    pinMode(LED_RED, OUTPUT);
    pinMode(LED_YELLOW, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);

    // 부저 출력 설정
    pinMode(BUZZER_BEEP, OUTPUT);
    pinMode(BUZZER_MELODY, OUTPUT);

    // 스위치 입력 설정
    pinMode(SWITCH_PIN, INPUT);

    // LoRa 설정
    pinMode(LORA_M0, OUTPUT);
    pinMode(LORA_M1, OUTPUT);
    pinMode(LORA_AUX, INPUT);

    // 초기 상태
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, LOW);
    digitalWrite(BUZZER_BEEP, LOW);
    digitalWrite(BUZZER_MELODY, LOW);
}

#endif

이상의 base를 가지고 program을 진행해 주세요.




