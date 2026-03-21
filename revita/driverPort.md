# REVITA_LINK_v2 드라이버 포트 연결 설명서

> **문서명**: REVITA_LINK_v2 Driver Port Mapping
> **버전**: V2.0
> **기준 회로도**: REVITA_LINK_v2.pdf
> **MCU**: RAK4630-9-SM-I (nRF52840 + SX1262)
> **작성일**: 2026-03-18

---

## 1. 시스템 개요

REVITA_LINK_v2는 RAK4630 모듈을 기반으로 한 LoRa/BLE 통신 보드로, 태양광 충전, 모터 제어, RS485 통신, 도난 방지 기능을 통합한 IoT 디바이스입니다.

### 1.1 주요 기능 블록

```
┌─────────────────────────────────────────────────────────────────┐
│                      REVITA_LINK_v2 시스템 구성                    │
├─────────────────────────────────────────────────────────────────┤
│  [POWER]          [MCU]           [COMMUNICATION]              │
│  ├─ Solar Input   ├─ RAK4630      ├─ LoRa (SX1262)            │
│  ├─ Battery       │  (nRF52840)   ├─ BLE 5.0                  │
│  ├─ 3.3V Buck/Boost              └─ RS485 (MAX3485)          │
│  └─ 12V Step-up                                               │
│                                                                │
│  [MOTOR CONTROL]  [I/O]           [PROTECTION]                │
│  ├─ 3-Line X      ├─ DIO Input    ├─ TVS Diodes              │
│  └─ 3-Line Y      ├─ LED/Button   ├─ Fuses                   │
│                   └─ Buzzer       └─ ESD Protection          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. RAK4630 핀 할당 상세

### 2.1 전체 핀맵

| Pin No. | RAK4630 Pin | 회로도 신호명 | 기능 | 드라이버 | 비고 |
|---------|-------------|-------------|------|---------|------|
| 1 | VBUS | - | USB 전원 | - | 미사용 |
| 2 | USB- | - | USB Data- | - | 미사용 |
| 3 | USB+ | - | USB Data+ | - | 미사용 |
| 4 | P0.13/I2C_SDA | - | I2C SDA | i2c | 미사용 (v2) |
| 5 | P0.14/I2C_SCL | - | I2C SCL | i2c | 미사용 (v2) |
| 6 | P0.15/UART2_RX | UART2_RX | 디버그 UART RX | uart | 디버그/확장용 |
| 7 | P0.16/UART2_TX | UART2_TX | 디버그 UART TX | uart | 디버그/확장용 |
| 8 | P0.17/UART2_DE | - | UART2 DE | - | 미사용 |
| 9 | P0.19/UART1_RX | UART1_RX | RS485 RX | uart | MAX3485 RO |
| 10 | P0.20/UART1_TX | UART1_TX | RS485 TX | uart | MAX3485 DI |
| 11 | P0.21/UART1_DE | DE | RS485 TX Enable | gpio | MAX3485 DE |
| 12 | P0.10/NFC2 | DIO_X | 12V DIO 입력 X | gpio | 포토커플러 출력 |
| 13 | P0.09/NFC1 | DIO_Y | 12V DIO 입력 Y | gpio | 포토커플러 출력 |
| 14 | GND | GND | Ground | - | - |
| 15 | RF_BT | - | BLE 안테나 | - | 내부 연결 |
| 16 | GND | GND | Ground | - | - |
| 17 | NRF_RESET | RST# | MCU 리셋 | - | ST-Link 연결 |
| 18 | SWDCLK | SWCLK | SWD Clock | swd | 디버그 |
| 19 | SWDIO | SWDIO | SWD Data | swd | 디버그 |
| 20 | VBAT_SX | 3.3V | LoRa 전원 | - | 3.3V 공급 |
| 21 | VBAT_IO_SX | 3.3V | LoRa I/O 전원 | - | 3.3V 공급 |
| 22 | GND | GND | Ground | - | - |
| 23 | P0.24/I2C_SDA_2 | X_EN_A | 모터X A방향 | gpio | 3-Line Motor |
| 24 | P0.25/I2C_SCL_2 | X_EN_B | 모터X B방향 | gpio | 3-Line Motor |
| 25 | P1.01/SW1 | X_EN_P2 | 모터X 공통 | gpio | 3-Line Motor |
| 26 | P1.02/SW2 | Y_EN_A | 모터Y A방향 | gpio | 3-Line Motor |
| 27 | P1.03/LED1 | Y_EN_B | 모터Y B방향 | gpio | 3-Line Motor |
| 28 | P1.04/LED2 | Y_EN_P2 | 모터Y 공통 | gpio | 3-Line Motor |
| 29 | P0.03/QSPI_CLK | QSPI_SCLK | Flash Clock | qspi | MX25R1635F |
| 30 | P0.02/QSPI_DIO3 | QSPI_DIO3 | Flash DIO3 | qspi | MX25R1635F |
| 31 | P0.28/QSPI_DIO2 | QSPI_DIO2 | Flash DIO2 | qspi | MX25R1635F |
| 32 | P0.29/QSPI_DIO1 | QSPI_DIO1 | Flash DIO1 | qspi | MX25R1635F |
| 33 | P0.30/QSPI_DIO0 | QSPI_DIO0 | Flash DIO0 | qspi | MX25R1635F |
| 34 | P0.26/QSPI_CS | QSPI_CS | Flash CS | qspi | MX25R1635F |
| 35 | GND | GND | Ground | - | - |
| 36 | GND | GND | Ground | - | - |
| 37 | RF_LoRa | - | LoRa 안테나 | - | 내부 연결 |
| 38 | GND | GND | Ground | - | - |
| 39 | P0.31/AIN7 | BAT_AIN | 배터리 전압 | adc | 분압 1M+1M |
| 40 | P0.05/AIN3 | VIB_SENSE | 진동 센서 | gpio/adc | SW-18010P |
| 41 | P0.04/AIN2 | - | - | - | 미사용 |
| 42 | GND | GND | Ground | - | - |
| 43 | VDD_NRF | 3.3V | MCU 전원 | - | 3.3V 공급 |
| 44 | VBAT_NRF | 3.3V | MCU 배터리 | - | 3.3V 공급 |

---

## 3. 기능별 드라이버 연결

### 3.1 RS485 통신 (MAX3485ESA)

```
┌──────────────┐     ┌──────────────┐     ┌──────────┐
│   RAK4630    │     │   MAX3485    │     │ RS485 Bus│
│              │     │              │     │          │
│ P0.20(TX)────┼────►│DI        A───┼────►│A         │
│ P0.19(RX)◄───┼─────│RO        B───┼────►│B         │
│ P0.21(DE)────┼────►│DE            │     │          │
│              │     │#RE ◄──┬──────│     │          │
│              │     │       │      │     │          │
└──────────────┘     └───────┴──────┘     └──────────┘
                          RE# = DE (Half-Duplex)
```

| 신호 | RAK4630 Pin | GPIO | 방향 | 설명 |
|------|-------------|------|------|------|
| TX | P0.20 | UART1_TX | OUT | RS485 송신 데이터 |
| RX | P0.19 | UART1_RX | IN | RS485 수신 데이터 |
| DE | P0.21 | GPIO | OUT | 송신 활성화 (HIGH=TX) |
| RE# | P0.21 | GPIO | OUT | DE와 연결 (LOW=RX) |

**드라이버 설정 (RUI3/Arduino)**:
```cpp
// UART1 - RS485
#define RS485_TX    WB_IO2  // P0.20
#define RS485_RX    WB_IO1  // P0.19
#define RS485_DE    WB_IO3  // P0.21

void rs485_init() {
    Serial1.begin(9600);
    pinMode(RS485_DE, OUTPUT);
    digitalWrite(RS485_DE, LOW);  // RX mode default
}

void rs485_send(uint8_t* data, size_t len) {
    digitalWrite(RS485_DE, HIGH);  // TX mode
    delay(1);
    Serial1.write(data, len);
    Serial1.flush();
    digitalWrite(RS485_DE, LOW);   // RX mode
}
```

---

### 3.2 3선 모터 제어 (3-Line Motor Control)

회로도에서 2개의 독립적인 3선 모터 컨트롤러가 구현되어 있습니다.

```
                    12V_VDD
                       │
           ┌───────────┴───────────┐
           │                       │
      ┌────┴────┐             ┌────┴────┐
      │ FDS9435A│             │ FDS9435A│
      │ (P-MOS) │             │ (P-MOS) │
      │   M3    │             │   M4    │
      └────┬────┘             └────┬────┘
           │                       │
           ▼A                      ▼B
           │                       │
           └───────────┬───────────┘
                       │
                  ┌────┴────┐
                  │Si2302CDS│
                  │ (N-MOS) │
                  │   Q3    │
                  └────┬────┘
                       │
                      GND
                   (EN_P2)
```

#### 모터 X 제어 핀

| 신호 | RAK4630 Pin | GPIO | 방향 | 설명 |
|------|-------------|------|------|------|
| X_EN_A | P0.24 | GPIO | OUT | A 방향 활성화 |
| X_EN_B | P0.25 | GPIO | OUT | B 방향 활성화 |
| X_EN_P2 | P1.01 | GPIO | OUT | 공통 스위치 (전원) |

#### 모터 Y 제어 핀

| 신호 | RAK4630 Pin | GPIO | 방향 | 설명 |
|------|-------------|------|------|------|
| Y_EN_A | P1.02 | GPIO | OUT | A 방향 활성화 |
| Y_EN_B | P1.03 | GPIO | OUT | B 방향 활성화 |
| Y_EN_P2 | P1.04 | GPIO | OUT | 공통 스위치 (전원) |

**모터 제어 진리표**:

| EN_P2 | EN_A | EN_B | 동작 |
|-------|------|------|------|
| 0 | X | X | 정지 (전원 차단) |
| 1 | 0 | 0 | 정지 (브레이크) |
| 1 | 1 | 0 | A 방향 회전 |
| 1 | 0 | 1 | B 방향 회전 |
| 1 | 1 | 1 | **금지** (단락 위험) |

**드라이버 코드**:
```cpp
// Motor X pins
#define MOTOR_X_EN_A   WB_IO4  // P0.24
#define MOTOR_X_EN_B   WB_IO5  // P0.25
#define MOTOR_X_EN_P2  WB_IO6  // P1.01

// Motor Y pins
#define MOTOR_Y_EN_A   WB_A0   // P1.02
#define MOTOR_Y_EN_B   WB_A1   // P1.03
#define MOTOR_Y_EN_P2  WB_LED1 // P1.04

typedef enum {
    MOTOR_STOP = 0,
    MOTOR_DIR_A,
    MOTOR_DIR_B
} motor_dir_t;

void motor_x_control(motor_dir_t dir) {
    if (dir == MOTOR_STOP) {
        digitalWrite(MOTOR_X_EN_P2, LOW);
        digitalWrite(MOTOR_X_EN_A, LOW);
        digitalWrite(MOTOR_X_EN_B, LOW);
    } else if (dir == MOTOR_DIR_A) {
        digitalWrite(MOTOR_X_EN_B, LOW);
        digitalWrite(MOTOR_X_EN_A, HIGH);
        digitalWrite(MOTOR_X_EN_P2, HIGH);
    } else if (dir == MOTOR_DIR_B) {
        digitalWrite(MOTOR_X_EN_A, LOW);
        digitalWrite(MOTOR_X_EN_B, HIGH);
        digitalWrite(MOTOR_X_EN_P2, HIGH);
    }
}
```

---

### 3.3 12V DIO 입력 (포토커플러 절연)

```
외부 12V 신호              MCU 3.3V 입력
     │                        │
     │    ┌────────────┐      │
     ├───►│  PC817C    │      │
     │    │            │      │
12V_DIO_IN│  ├─►├─┐   │      │
     │    │     │ │   ├──────┼──► 3.3V_DIO_OUT
     │    │  ┌──┴─┴─┐ │      │    (to P0.10/P0.09)
     │    │  │Photo │ │      │
     │    │  │Trans │ │      │
    GND   │  └──────┘ │     3.3V
          └────────────┘
```

| 신호 | RAK4630 Pin | GPIO | 방향 | 설명 |
|------|-------------|------|------|------|
| DIO_X | P0.10 (NFC2) | GPIO | IN | 12V 입력 X (절연) |
| DIO_Y | P0.09 (NFC1) | GPIO | IN | 12V 입력 Y (절연) |

**드라이버 코드**:
```cpp
#define DIO_X_PIN  WB_IO7  // P0.10 (NFC2)
#define DIO_Y_PIN  WB_IO8  // P0.09 (NFC1)

void dio_init() {
    pinMode(DIO_X_PIN, INPUT);
    pinMode(DIO_Y_PIN, INPUT);
}

bool read_dio_x() {
    return digitalRead(DIO_X_PIN) == LOW;  // Active LOW (포토커플러)
}

bool read_dio_y() {
    return digitalRead(DIO_Y_PIN) == LOW;  // Active LOW
}
```

---

### 3.4 QSPI Flash (MX25R1635FZUIL0)

16Mbit (2MB) QSPI NOR Flash 메모리

| 신호 | RAK4630 Pin | 설명 |
|------|-------------|------|
| QSPI_CS | P0.26 | Chip Select |
| QSPI_SCLK | P0.03 | Serial Clock |
| QSPI_DIO0 | P0.30 | Data I/O 0 (MOSI) |
| QSPI_DIO1 | P0.29 | Data I/O 1 (MISO) |
| QSPI_DIO2 | P0.28 | Data I/O 2 |
| QSPI_DIO3 | P0.02 | Data I/O 3 |

**드라이버**: nRF52840 내장 QSPI 컨트롤러 사용

```cpp
// RUI3에서는 내부적으로 설정됨
// Arduino nRF52에서는 Adafruit_QSPI 라이브러리 사용
#include <Adafruit_QSPI.h>
#include <Adafruit_SPIFlash.h>

Adafruit_FlashTransport_QSPI flashTransport;
Adafruit_SPIFlash flash(&flashTransport);
```

---

### 3.5 배터리 전압 모니터링 (ADC)

```
VBAT ──┬── RDIV1 (1M) ──┬── RDIV2 (1M) ──┬── GND
       │                │                │
       │                └────────────────┼──► BAT_AIN (P0.31)
       │                                 │
       └─────────────────────────────────┘

분압비: 0.5 (1M / 2M)
ADC 입력 = VBAT × 0.5
```

| 신호 | RAK4630 Pin | 기능 | 설명 |
|------|-------------|------|------|
| BAT_AIN | P0.31 (AIN7) | ADC | 배터리 전압 (분압) |

**드라이버 코드**:
```cpp
#define BAT_ADC_PIN  WB_A0  // P0.31 (AIN7)
#define VREF         3.3f
#define ADC_RESOLUTION 4096  // 12-bit
#define DIVIDER_RATIO  2.0f  // 1M + 1M

float read_battery_voltage() {
    int adc_value = analogRead(BAT_ADC_PIN);
    float voltage = (adc_value * VREF / ADC_RESOLUTION) * DIVIDER_RATIO;
    return voltage;
}
```

---

### 3.6 도난 방지 시스템 (Anti-Theft)

#### 3.6.1 진동 센서 (SW-18010P)

| 신호 | RAK4630 Pin | 기능 | 설명 |
|------|-------------|------|------|
| VIB_SENSE | P0.05 (AIN3) | GPIO/ADC | 진동 감지 |

#### 3.6.2 부저 (Dual Buzzer)

| 부저 | 주파수 | 전원 | 제어 |
|------|--------|------|------|
| BUZZER1 | 2.7kHz | 12V_SW | N-CH MOSFET |
| BUZZER2 | 3kHz | 12V_SW | 병렬 연결 |

**참고**: 부저 제어 핀(BUZZER_EN)이 회로도에서 명확하게 RAK4630 핀에 연결되어 있지 않음 → **문제점 섹션 참조**

---

### 3.7 12V 전원 제어

| 신호 | RAK4630 Pin | 기능 | 설명 |
|------|-------------|------|------|
| 12V_EN | 미할당 | GPIO | 12V Step-up 활성화 |

**회로 구성**: TPS61178RNWR (12V Boost Converter)
- 입력: LOAD_VCC (배터리/충전기 출력)
- 출력: 12V_VOUT → 12V_SW (스위칭 출력)

---

### 3.8 디버그 인터페이스

#### SWD (ST-Link 호환)

| 신호 | RAK4630 Pin | 커넥터 Pin | 설명 |
|------|-------------|-----------|------|
| SWDIO | Pin 19 | DEBUG-1 | SWD Data |
| SWCLK | Pin 18 | DEBUG-2 | SWD Clock |
| RST# | Pin 17 | DEBUG-3 | MCU Reset |
| GND | GND | DEBUG-GND | Ground |

#### UART2 (디버그 콘솔)

| 신호 | RAK4630 Pin | 설명 |
|------|-------------|------|
| UART2_TX | P0.16 | 디버그 출력 |
| UART2_RX | P0.15 | 디버그 입력 |

---

## 4. 커넥터 핀아웃

### 4.1 전원 커넥터 (POWER_PORT)

| Pin | 신호 | 설명 |
|-----|------|------|
| BAT+ | VBAT | 배터리 양극 (3.7V Li-Ion) |
| BAT- | GND | 배터리 음극 |
| SOLAR+ | VSOLAR | 태양광 패널 양극 |
| SOLAR- | GND | 태양광 패널 음극 |

### 4.2 RS485 커넥터 (RS485_X, RS485_Y)

5264-5A 커넥터 (5핀)

| Pin | 신호 | 설명 |
|-----|------|------|
| 1 | 12V_SW | 12V 전원 출력 |
| 2 | A | RS485 A (+) |
| 3 | B | RS485 B (-) |
| 4 | GND | Ground |
| 5 | - | NC |

### 4.3 4선 모터 커넥터 (4-Line-X, 4-Line-Y)

5264-4A 커넥터 (4핀)

| Pin | 신호 | 설명 |
|-----|------|------|
| 1 | EN_A 출력 | A 방향 |
| 2 | EN_B 출력 | B 방향 |
| 3 | 12V_SW | 전원 |
| 4 | GND | Ground |

### 4.4 외부 버튼/LED 커넥터 (EXTERNAL_BUTTON)

5264-4A 커넥터 (4핀)

| Pin | 신호 | 설명 |
|-----|------|------|
| 1 | BTN+ | 버튼 입력 |
| 2 | LED+ | LED 양극 |
| 3 | LED- | LED 음극 |
| 4 | BTN- | 버튼 GND |

---

## 5. 보호 회로

### 5.1 TVS 다이오드

| 위치 | 부품 | 보호 대상 |
|------|------|----------|
| U16, U17, U18 | TVS0500DRVR | 전원 입력 |
| T9 | SM712.TCT | RS485 라인 |
| T3~T8 | SMAJ16A | 12V 출력 |
| D4, D5 | SMAJ5.0CA-JSM | 신호 라인 |

### 5.2 퓨즈

| 위치 | 부품 | 보호 대상 |
|------|------|----------|
| F1~F4 | SS14 | 모터 출력 라인 |

---

## 6. 문제점 및 검토 사항

### 6.1 심각한 문제 (Critical)

| # | 문제 | 상세 | 권장 조치 |
|---|------|------|----------|
| C1 | **BUZZER_EN 핀 미할당** | 회로도에서 BUZZER_EN 신호가 있으나 RAK4630 핀에 명확히 연결되지 않음 | 회로도 수정 필요. 남는 GPIO 핀 할당 필요 |
| C2 | **12V_EN 핀 미할당** | 12V Step-up 컨버터 EN 핀이 RAK4630에 연결되지 않음 | GPIO 핀 할당하여 전력 관리 가능하게 수정 |
| C3 | **LED_EN 핀 미확인** | 외부 LED 제어 핀이 불명확 | 회로도에서 LED_EN 연결 확인 필요 |
| C4 | **BTN 핀 미확인** | 외부 버튼 입력 핀이 RAK4630 핀에 명확히 연결되지 않음 | 핀 할당 확인 필요 |

### 6.2 주의 사항 (Warning)

| # | 문제 | 상세 | 권장 조치 |
|---|------|------|----------|
| W1 | **RE# 신호 연결** | 회로도에서 RS485의 RE#가 DE와 별도로 표시되어 있으나, 실제로는 DE에 연결되어야 Half-Duplex 동작 | 회로 연결 확인 필요 |
| W2 | **NFC 핀 사용** | P0.09(NFC1), P0.10(NFC2)를 GPIO로 사용 중. NFC 기능 사용 불가 | NFC 불필요시 OK |
| W3 | **I2C 미사용** | v1에서 MCP23017 GPIO 확장 IC가 있었으나 v2에서 제거됨. I2C 핀(P0.13, P0.14) 미사용 | 필요시 센서 연결 가능 |
| W4 | **모터 동시 활성화 방지** | EN_A와 EN_B 동시 HIGH 시 단락 위험 | 소프트웨어에서 인터락 구현 필수 |

### 6.3 개선 권장 사항 (Recommendation)

| # | 항목 | 상세 | 효과 |
|---|------|------|------|
| R1 | **Watchdog 추가** | v1에 있던 TPS3808G30DBVR (3.0V Watchdog)이 v2에서 제거됨 | 시스템 안정성 향상 |
| R2 | **배터리 보호 IC** | 과충전/과방전 보호 회로 추가 권장 | 배터리 수명 연장 |
| R3 | **상태 LED** | 전원/통신 상태 표시 LED 추가 | 디버깅 용이 |
| R4 | **테스트 포인트** | 주요 신호에 TP 추가 | 생산 테스트 용이 |

---

## 7. GPIO 사용 요약

### 7.1 사용 중인 GPIO

| GPIO | nRF52840 Pin | 기능 | 드라이버 |
|------|-------------|------|---------|
| P0.09 | NFC1 | DIO_Y 입력 | gpio (input) |
| P0.10 | NFC2 | DIO_X 입력 | gpio (input) |
| P0.15 | - | UART2_RX | uart |
| P0.16 | - | UART2_TX | uart |
| P0.19 | - | UART1_RX (RS485) | uart |
| P0.20 | - | UART1_TX (RS485) | uart |
| P0.21 | - | RS485 DE | gpio (output) |
| P0.24 | - | X_EN_A | gpio (output) |
| P0.25 | - | X_EN_B | gpio (output) |
| P0.31 | AIN7 | BAT_AIN | adc |
| P0.05 | AIN3 | VIB_SENSE | gpio/adc |
| P1.01 | SW1 | X_EN_P2 | gpio (output) |
| P1.02 | SW2 | Y_EN_A | gpio (output) |
| P1.03 | LED1 | Y_EN_B | gpio (output) |
| P1.04 | LED2 | Y_EN_P2 | gpio (output) |

### 7.2 미사용 GPIO (사용 가능)

| GPIO | nRF52840 Pin | 비고 |
|------|-------------|------|
| P0.04 | AIN2 | ADC 가능 |
| P0.13 | I2C_SDA | I2C 사용 가능 |
| P0.14 | I2C_SCL | I2C 사용 가능 |
| P0.17 | UART2_DE | DE 제어 가능 |

---

## 8. 펌웨어 개발 가이드

### 8.1 초기화 순서

```cpp
void setup() {
    // 1. 시리얼 디버그 초기화
    Serial.begin(115200);  // UART2 (USB)

    // 2. RS485 초기화
    Serial1.begin(9600);   // UART1
    pinMode(RS485_DE, OUTPUT);
    digitalWrite(RS485_DE, LOW);

    // 3. 모터 GPIO 초기화
    motor_init();

    // 4. DIO 입력 초기화
    dio_init();

    // 5. ADC 초기화
    analogReadResolution(12);

    // 6. LoRa 초기화
    lora_init();

    // 7. BLE 초기화 (필요시)
    ble_init();
}
```

### 8.2 메인 루프 구조

```cpp
void loop() {
    // RS485 통신 처리
    if (Serial1.available()) {
        rs485_process();
    }

    // DIO 입력 감지
    check_dio_inputs();

    // 진동 감지 (도난 방지)
    check_vibration();

    // 배터리 전압 모니터링
    monitor_battery();

    // LoRa 메시지 처리
    lora_process();

    // 저전력 모드 진입 (필요시)
    enter_sleep_if_idle();
}
```

---

## 9. 참고 자료

- RAK4630 Datasheet: https://docs.rakwireless.com/Product-Categories/WisDuo/RAK4630-Module/
- nRF52840 Product Specification: https://infocenter.nordicsemi.com/
- MAX3485 Datasheet: Maxim Integrated
- TPS63001 Datasheet: Texas Instruments
- TPS61178 Datasheet: Texas Instruments

---

*문서 작성일: 2026-03-18*
*회로도 버전: REVITA_LINK_v2 (Update: 2026-03-18)*
