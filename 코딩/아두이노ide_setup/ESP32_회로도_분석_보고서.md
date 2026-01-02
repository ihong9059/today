# ESP32-WROOM 회로도 분석 보고서

**문서명:** esp32wroom_250806
**버전:** V1.0
**작성일:** 2025-08-06
**설계 도구:** EasyEDA

---

## 1. 개요

본 회로는 ESP32-DevKitC (38핀)를 중심으로 다양한 주변장치가 연결된 IoT 개발 보드입니다.

---

## 2. ESP32 GPIO 핀 연결 현황

### 2.1 ESP32-DevKitC 핀맵 (U15)

```
        [ESP32-DevKitC 38-Pin]

   3V3  [ 1]           [20] GND
    EN  [ 2]           [21] IO23 ─── MOSI
    VP  [ 3] ─── TP1   [22] IO22 ─── SCL
    VN  [ 4] ─── TP2   [23] TX
  IO34  [ 5] ─── AUX   [24] RX
  IO35  [ 6]           [25] IO21 ─── SDA
  IO32  [ 7] ─── SWITCH[26] GND
  IO33  [ 8] ─── MELODY[27] IO19 ─── MISO
  IO25  [ 9] ─── RED   [28] IO18 ─── SCK
  IO26  [10] ─── YELLOW[29] IO5  ─── SS
  IO27  [11] ─── BLUE  [30] IO17 ─── TXD2
  IO14  [12] ─── BEEP  [31] IO16 ─── RXD2
  IO12  [13] ─── TP3   [32] IO4  ─── M1
   GND  [14]           [33] IO0
  IO13  [15] ─── TP4   [34] IO2
    D2  [16]           [35] IO15 ─── M0
    D3  [17]           [36] D1
   CMD  [18]           [37] D0
    5V  [19]           [38] CLK
```

---

### 2.2 입력 장치 (Input)

| GPIO | 핀번호 | 신호명 | 연결 장치 | 회로 구성 |
|------|--------|--------|-----------|-----------|
| IO32 | 7 | SWITCH | SW1 (TS-1088-AR02016) | 택트 스위치 + C1 (100nF) 디바운싱 |
| IO34 | 5 | AUX | H2 (LoRa 모듈) | LoRa 상태 출력 수신 |

---

### 2.3 LED 출력 (Output)

| GPIO | 핀번호 | 신호명 | 연결 장치 | 저항 | LED 색상 |
|------|--------|--------|-----------|------|----------|
| IO25 | 9 | RED | U6 (XL-1004SURD) | R1: 100Ω | 빨간색 |
| IO26 | 10 | YELLOW | U7 (XL-1004SURD) | R2: 100Ω | 노란색 |
| IO27 | 11 | BLUE | U8 (XL-1004SURD) | R3: 100Ω | 파란색 |

**LED 구동 방식:**
- GPIO → 100Ω 저항 → LED → GND
- Active High (GPIO HIGH = LED ON)

---

### 2.4 버저 출력 (Output)

| GPIO | 핀번호 | 신호명 | 연결 장치 | 구동 방식 |
|------|--------|--------|-----------|-----------|
| IO14 | 12 | BEEP | BUZ1 (Buzzer_12x9.5RM6.5) | 직접 구동 |
| IO33 | 8 | MELODY | BUZ2 (Buzzer_12x9.5RM6.5) | Q1 (BCX56) 트랜지스터 구동 |

**BUZ2 (MELODY) 상세 회로:**
```
IO33 (MELODY) ──┬── R4 (10K) ── Q1 Base
                │              Q1: BCX56 (NPN)
                │              Q1 Collector ── BUZ2 ── VCC
                │              Q1 Emitter ── GND
```
- 트랜지스터를 통한 고전류 구동 가능
- R4 (10KΩ): 베이스 전류 제한 저항

---

### 2.5 I2C 통신

| GPIO | 핀번호 | 신호명 | 풀업 저항 |
|------|--------|--------|-----------|
| IO21 | 25 | SDA | R5: 10KΩ (VCC 풀업) |
| IO22 | 22 | SCL | R6: 10KΩ (VCC 풀업) |

**연결된 I2C 장치:**

| 장치 | 부품명 | 커넥터 | 핀 배열 |
|------|--------|--------|---------|
| U9 | OLED 디스플레이 | 2542WR-04P | 1:GND, 2:VCC, 3:SDA, 4:SCL |
| U10 | AHT20 온습도 센서 | 2542WR-04P | 1:GND, 2:VCC, 3:SDA, 4:SCL |

**I2C 버스 구성:**
```
VCC ──┬── R5 (10K) ──┬── SDA ──┬── U9 (OLED) Pin 3
      │              │         └── U10 (AHT20) Pin 3
      │              │
      └── R6 (10K) ──┼── SCL ──┬── U9 (OLED) Pin 4
                     │         └── U10 (AHT20) Pin 4
                     │
                IO21 (SDA), IO22 (SCL)
```

---

### 2.6 LoRa 모듈 (H2) 연결

**커넥터:** PH2.54-07PB2G-H25 (7핀)

| H2 핀 | 신호명 | ESP32 GPIO | 핀번호 | 기능 |
|-------|--------|------------|--------|------|
| 1 | AUX | IO34 | 5 | 모듈 상태 출력 (입력) |
| 2 | TXD2 | IO17 | 30 | UART TX (ESP32 → LoRa) |
| 3 | RXD2 | IO16 | 31 | UART RX (LoRa → ESP32) |
| 4 | GND | GND | - | 접지 |
| 5 | M0 | IO15 | 35 | 모드 설정 비트 0 |
| 6 | M1 | IO4 | 32 | 모드 설정 비트 1 |
| 7 | GND | GND | - | 접지 |

**LoRa 모드 설정표:**
| M1 | M0 | 모드 |
|----|----|------|
| 0 | 0 | 일반 모드 |
| 0 | 1 | Wake-Up 모드 |
| 1 | 0 | Power-Saving 모드 |
| 1 | 1 | Sleep 모드 |

---

### 2.7 SPI 통신

| GPIO | 핀번호 | 신호명 | 기능 |
|------|--------|--------|------|
| IO23 | 21 | MOSI | Master Out Slave In |
| IO19 | 27 | MISO | Master In Slave Out |
| IO18 | 28 | SCK | SPI Clock |
| IO5 | 29 | SS | Slave Select (Chip Select) |

**참고:** SPI 신호는 회로도에 네트 라벨로 정의되어 있으나, H2 (LoRa) 커넥터에는 UART 연결만 사용됩니다.

---

### 2.8 테스트 포인트 (예비 핀)

| GPIO | 핀번호 | 신호명 | 비고 |
|------|--------|--------|------|
| VP (IO36) | 3 | TP1 | ADC1_CH0, 입력 전용 |
| VN (IO39) | 4 | TP2 | ADC1_CH3, 입력 전용 |
| IO12 | 13 | TP3 | 부트 스트랩 핀 주의 |
| IO13 | 15 | TP4 | - |

---

## 3. 주변 장치 상세 사양

### 3.1 LED 모듈 (U6, U7, U8)
- **부품번호:** XL-1004SURD
- **타입:** SMD LED
- **전류 제한:** 100Ω 저항
- **예상 LED 전류:** (3.3V - 2.0V) / 100Ω ≈ 13mA

### 3.2 버저 (BUZ1, BUZ2)
- **부품번호:** Buzzer_12x9.5RM6.5
- **크기:** 12mm x 9.5mm, 핀 간격 6.5mm

### 3.3 택트 스위치 (SW1)
- **부품번호:** TS-1088-AR02016
- **디바운싱:** C1 (100nF) 커패시터
- **동작:** 누르면 SWITCH 신호가 GND로 연결 (Active Low)

### 3.4 OLED 디스플레이 (U9)
- **커넥터:** 2542WR-04P
- **인터페이스:** I2C
- **일반적인 I2C 주소:** 0x3C 또는 0x3D

### 3.5 AHT20 온습도 센서 (U10)
- **커넥터:** 2542WR-04P
- **인터페이스:** I2C
- **I2C 주소:** 0x38

### 3.6 트랜지스터 (Q1)
- **부품번호:** BCX56
- **타입:** NPN
- **용도:** BUZ2 고전류 구동

---

## 4. 전원 구성

| 전원 레일 | 전압 | 용도 |
|-----------|------|------|
| 5V | 5.0V | ESP32 보드 전원 입력 (Pin 19) |
| 3V3 | 3.3V | ESP32 내부 레귤레이터 출력 (Pin 1) |
| VCC | 3.3V | LED, 센서, OLED, I2C 풀업, 버저 |
| GND | 0V | 공통 접지 (Pin 14, 20, 26) |

---

## 5. GPIO 사용 요약표

| GPIO | 핀번호 | 방향 | 신호명 | 연결 장치 |
|------|--------|------|--------|-----------|
| VP (IO36) | 3 | INPUT | TP1 | 테스트 포인트 |
| VN (IO39) | 4 | INPUT | TP2 | 테스트 포인트 |
| IO34 | 5 | INPUT | AUX | LoRa 모듈 상태 |
| IO32 | 7 | INPUT | SWITCH | 택트 스위치 |
| IO33 | 8 | OUTPUT | MELODY | 버저2 (트랜지스터) |
| IO25 | 9 | OUTPUT | RED | 빨간색 LED |
| IO26 | 10 | OUTPUT | YELLOW | 노란색 LED |
| IO27 | 11 | OUTPUT | BLUE | 파란색 LED |
| IO14 | 12 | OUTPUT | BEEP | 버저1 |
| IO12 | 13 | - | TP3 | 테스트 포인트 |
| IO13 | 15 | - | TP4 | 테스트 포인트 |
| IO23 | 21 | OUTPUT | MOSI | SPI 데이터 출력 |
| IO22 | 22 | OUTPUT | SCL | I2C 클럭 |
| IO21 | 25 | I/O | SDA | I2C 데이터 |
| IO19 | 27 | INPUT | MISO | SPI 데이터 입력 |
| IO18 | 28 | OUTPUT | SCK | SPI 클럭 |
| IO5 | 29 | OUTPUT | SS | SPI 슬레이브 선택 |
| IO17 | 30 | OUTPUT | TXD2 | UART2 송신 |
| IO16 | 31 | INPUT | RXD2 | UART2 수신 |
| IO4 | 32 | OUTPUT | M1 | LoRa 모드 설정 |
| IO15 | 35 | OUTPUT | M0 | LoRa 모드 설정 |

---

## 6. 프로그래밍 참고 (Arduino/ESP-IDF)

```cpp
// GPIO 정의
#define PIN_SWITCH    32    // 입력 - 택트 스위치
#define PIN_MELODY    33    // 출력 - 버저2 (트랜지스터)
#define PIN_LED_RED   25    // 출력 - 빨간색 LED
#define PIN_LED_YELLOW 26   // 출력 - 노란색 LED
#define PIN_LED_BLUE  27    // 출력 - 파란색 LED
#define PIN_BEEP      14    // 출력 - 버저1

// I2C
#define PIN_SDA       21
#define PIN_SCL       22

// LoRa UART
#define PIN_LORA_TX   17    // TXD2
#define PIN_LORA_RX   16    // RXD2
#define PIN_LORA_M0   15
#define PIN_LORA_M1   4
#define PIN_LORA_AUX  34    // 입력 전용

// SPI
#define PIN_MOSI      23
#define PIN_MISO      19
#define PIN_SCK       18
#define PIN_SS        5
```

---

## 7. 주의 사항

1. **입력 전용 핀:** IO34, IO35, IO36(VP), IO39(VN)는 입력 전용입니다. 출력으로 설정 불가.
2. **부트 스트랩:** IO12(TP3)는 부트 시 플래시 전압 설정에 사용됩니다. 외부 풀업/풀다운 주의.
3. **I2C 주소 충돌:** OLED와 AHT20이 같은 버스에 연결되어 있으므로 주소가 달라야 합니다.
4. **스위치 입력:** SW1은 Active Low 방식입니다 (눌렀을 때 GND).

---

*본 보고서는 esp32wroom_250806.pdf 회로도를 기반으로 작성되었습니다.*
