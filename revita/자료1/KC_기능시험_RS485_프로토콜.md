# KC 인증 기능시험용 RS485 제어 프로토콜

리비타 링크(REVITA_LINK_v1) KC 인증 시 시험자가 개별 드라이버 동작을 모르더라도
RS485를 통해 외부에서 명령을 보내 각 기능을 제어하고 동작을 확인할 수 있도록 설계한 프로토콜.

---

## 1. 통신 사양

| 항목 | 값 |
|------|-----|
| 물리 계층 | RS485 반이중 |
| 프로토콜 | Modbus RTU |
| Baud Rate | 9600 bps |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Slave Address | 0x01 (고정) |
| Byte Order | Big Endian |

### 연결 방법

```
시험 장비 (PC + USB-RS485 컨버터)
    │
    ├── A (D+) ──── RS485 포트 A
    ├── B (D-) ──── RS485 포트 B
    └── GND ─────── GND
```

- RS485 핀: UART1_TX (P0.20), UART1_RX (P0.19), DE (P1.04), RE# (P1.03)
- 시험 모드 진입 시 RS485는 센서 통신이 아닌 **시험 명령 수신 전용**으로 전환됨

---

## 2. 시험 모드 진입/해제

배터리 일체형 장비로 전원 인가/해제가 어려우므로, **외부 전원 버튼(BTN, P0.05)을 누른 후 3초 이내**에
아래 명령을 RS485로 전송하면 KC 시험 모드로 진입한다.

### 진입 절차

1. 외부 전원 버튼(BTN)을 **짧게 1번** 누른다 (장비가 RS485 수신 대기 상태로 전환)
2. 버튼 입력 후 **3초 이내**에 시험모드 진입 명령을 RS485로 전송한다
3. 장비가 에코 응답을 보내면 시험 모드 진입 완료

> 3초가 경과하면 장비는 정상 동작(sleep/스케줄)으로 복귀하므로 재시도 필요.

### 시험모드 상태

시험 모드에서는 LoRa/BLE 통신, 스케줄러, sleep이 모두 비활성화되고
RS485 명령으로만 장비를 제어할 수 있다.
**시험 모드 진입 시 LoRa/BLE 파라미터는 자동으로 기본값(제품 운용 설정)으로 초기화된다.**

| 명령 | Function | Register | Value | 설명 |
|------|----------|----------|-------|------|
| 시험모드 진입 | 0x06 | 0x01FF | 0x0001 | KC 시험 모드 ON (기본값 자동 초기화) |
| 시험모드 해제 | 0x06 | 0x01FF | 0x0000 | 정상 동작 복귀 |

**시험모드 진입 응답**: 동일 프레임 에코 (Modbus 표준)

---

## 3. Modbus Function Code 요약

| Function Code | 용도 | 설명 |
|---------------|------|------|
| 0x03 | Read Holding Registers | 상태/센서값 읽기 |
| 0x06 | Write Single Register | 단일 기능 제어 |
| 0x10 | Write Multiple Registers | 복합 파라미터 제어 |

---

## 4. 레지스터 맵

### 4.1 읽기 레지스터 (Function 0x03)

#### 기기 정보 (0x0000 ~ 0x000F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0000 | DEVICE_ID | - | 기기 고유 ID (상위 16bit) |
| 0x0001 | DEVICE_ID_L | - | 기기 고유 ID (하위 16bit) |
| 0x0002 | FW_VERSION | - | 펌웨어 버전 (Major.Minor, 예: 0x0101 = v1.1) |
| 0x0003 | HW_VERSION | - | 하드웨어 버전 |
| 0x0004 | TEST_MODE | - | 0=정상, 1=시험모드 |

#### 전원/센서 상태 (0x0010 ~ 0x001F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0010 | BAT_VOLTAGE | mV | 배터리 전압 (BAT_AIN, P0.31) |
| 0x0011 | BAT_PERCENT | % | 배터리 잔량 (인산철 1S 기준 환산) |
| 0x0012 | VIB_STATUS | - | 진동 센서 상태 (0=정상, 1=진동감지) |
| 0x0013 | VIB_COUNT | 회 | 마지막 리셋 이후 진동 감지 횟수 |
| 0x0014 | BTN_STATUS | - | 버튼 상태 (0=미입력, 1=눌림) |
| 0x0015 | SUPPLY_12V | - | 12V 전원 상태 (0=OFF, 1=ON) |

#### 밸브/모터 상태 (0x0020 ~ 0x002F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0020 | VALVE_X_STATE | - | X축 밸브 상태 (0=폐쇄, 1=개방, 2=동작중) |
| 0x0021 | VALVE_Y_STATE | - | Y축 밸브 상태 (0=폐쇄, 1=개방, 2=동작중) |
| 0x0022 | VALVE_X_PIN | - | X축 GPIO 현재 출력값 (EN_A, EN_B, EN_P2 비트맵) |
| 0x0023 | VALVE_Y_PIN | - | Y축 GPIO 현재 출력값 (EN_A, EN_B, EN_P2 비트맵) |

> 비트맵: bit0=EN_A, bit1=EN_B, bit2=EN_P2

#### 유량계 상태 (0x0030 ~ 0x003F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0030 | FLOW_X_COUNT | 펄스 | X축 유량계 카운트 (상위 16bit) |
| 0x0031 | FLOW_X_COUNT_L | 펄스 | X축 유량계 카운트 (하위 16bit) |
| 0x0032 | FLOW_Y_COUNT | 펄스 | Y축 유량계 카운트 (상위 16bit) |
| 0x0033 | FLOW_Y_COUNT_L | 펄스 | Y축 유량계 카운트 (하위 16bit) |
| 0x0034 | FLOW_X_ACTIVE | - | X축 카운팅 활성 여부 (0/1) |
| 0x0035 | FLOW_Y_ACTIVE | - | Y축 카운팅 활성 여부 (0/1) |

#### 출력 장치 상태 (0x0040 ~ 0x004F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0040 | BUZZER_STATE | - | 부저 상태 (0=OFF, 1=ON) |
| 0x0041 | LED_STATE | - | LED 상태 (0=OFF, 1=ON) |

#### LoRa 상태 (0x0050 ~ 0x005F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0050 | LORA_STATE | - | 0=IDLE, 1=TX, 2=RX, 3=CAD |
| 0x0051 | LORA_FREQ | MHz | 현재 설정 주파수 (예: 920 = 920MHz) |
| 0x0052 | LORA_TX_POWER | dBm | 현재 TX 출력 |
| 0x0053 | LORA_RSSI | dBm | 최근 수신 RSSI (부호 있는 정수) |
| 0x0054 | LORA_SNR | dB x10 | 최근 수신 SNR (예: 95 = 9.5dB) |
| 0x0055 | LORA_TX_COUNT | 회 | 송신 패킷 수 |
| 0x0056 | LORA_RX_COUNT | 회 | 수신 패킷 수 |

#### BLE 상태 (0x0060 ~ 0x006F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0060 | BLE_STATE | - | 0=OFF, 1=ADVERT, 2=CONNECTED |
| 0x0061 | BLE_TX_POWER | dBm | BLE TX 출력 |

#### Flash 상태 (0x0070 ~ 0x007F)

| Register | 이름 | 단위 | 설명 |
|----------|------|------|------|
| 0x0070 | FLASH_STATE | - | 0=SLEEP, 1=ACTIVE, 2=ERROR |
| 0x0071 | FLASH_TEST | - | 셀프테스트 결과 (0=미실행, 1=PASS, 2=FAIL) |

---

### 4.2 쓰기 레지스터 (Function 0x06 / 0x10)

#### 밸브/모터 제어 (0x0100 ~ 0x010F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0100 | VALVE_X_CMD | 0~2 | X축 밸브 (0=폐쇄, 1=개방, 2=정지) |
| 0x0101 | VALVE_X_DURATION | 0~600 | X축 동작 시간 (초, 0=무제한) |
| 0x0102 | VALVE_Y_CMD | 0~2 | Y축 밸브 (0=폐쇄, 1=개방, 2=정지) |
| 0x0103 | VALVE_Y_DURATION | 0~600 | Y축 동작 시간 (초, 0=무제한) |

> **동작 원리 (3-Line 모터)**
> - 개방(CR02): EN_A=HIGH, EN_B=LOW → duration 후 자동 정지
> - 폐쇄(CR02): EN_A=LOW, EN_B=HIGH → duration 후 자동 정지
> - 정지: EN_A=LOW, EN_B=LOW
> - EN_P2: 12V MOSFET 스위칭 (동작 시 자동 ON, 정지 시 자동 OFF)
> - 12V_EN (P0.17): 밸브 동작 시 자동으로 12V 승압 활성화

#### 유량계 제어 (0x0110 ~ 0x011F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0110 | FLOW_X_CMD | 0~1 | X축 유량계 (0=정지, 1=카운팅시작) |
| 0x0111 | FLOW_X_RESET | 1 | X축 카운트 초기화 (1 쓰면 0으로 리셋) |
| 0x0112 | FLOW_Y_CMD | 0~1 | Y축 유량계 (0=정지, 1=카운팅시작) |
| 0x0113 | FLOW_Y_RESET | 1 | Y축 카운트 초기화 |

> **동작 원리**: DIO_X (P0.10), DIO_Y (P0.09)에 들어오는 펄스를 PPI 카운팅으로 계수.
> 카운팅 시작 후 0x0030~0x0033 레지스터에서 카운트 값 읽기 가능.

#### 출력 장치 제어 (0x0120 ~ 0x012F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0120 | BUZZER_CMD | 0~65535 | 부저 (0=OFF, 1~65534=ON 시간(초), 65535=상시ON) |
| 0x0121 | LED_CMD | 0~3 | LED (0=OFF, 1=ON, 2=1박자점멸, 3=2박자점멸) |
| 0x0122 | SUPPLY_12V_CMD | 0~1 | 12V 전원 (0=OFF, 1=ON) |

> **부저**: BUZZER_EN (P0.24) → MOSFET → 12V 부저 (0.72W)
> 부저 동작 시 12V_EN 자동 활성화

#### LoRa RF 제어 (0x0130 ~ 0x013F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0130 | LORA_CMD | 0~6 | LoRa 동작 모드 (아래 표 참조) |
| 0x0131 | LORA_FREQ_SET | 920~925 | LoRa 주파수 설정 (MHz) |
| 0x0132 | LORA_POWER_SET | -4~22 | LoRa TX 출력 (dBm, 부호 있는 정수) |
| 0x0133 | LORA_SF_SET | 7~12 | LoRa Spreading Factor |
| 0x0134 | LORA_BW_SET | 0~2 | LoRa Bandwidth (0=125kHz, 1=250kHz, 2=500kHz) |
| 0x013F | LORA_RESET | 1 | **LoRa 파라미터 기본값 초기화** (1 쓰면 실행) |

**LORA_CMD 값:**

| 값 | 동작 | 설명 |
|---|------|------|
| 0 | STOP | LoRa 중지, IDLE 복귀 |
| 1 | TX_CARRIER | 무변조 캐리어 연속 출력 (전파 측정용) |
| 2 | TX_MODULATED | 변조 신호 연속 출력 |
| 3 | TX_PACKET | 테스트 패킷 1회 송신 |
| 4 | RX_CONTINUOUS | 연속 수신 모드 |
| 5 | TX_SWEEP | 주파수 스윕 (920~925MHz) |
| 6 | DEFAULT_TX | **기본 설정으로 변조 TX** (초기화 후 즉시 송신) |

**LoRa 기본값 (제품 운용 설정):**

| 파라미터 | 기본값 | 설명 |
|----------|--------|------|
| LORA_FREQ | 922.1 MHz | 한국 LoRa 대역 중심 주파수 |
| LORA_POWER | 14 dBm | 제품 기본 송신 출력 |
| LORA_SF | 7 | Spreading Factor 7 |
| LORA_BW | 125 kHz | Bandwidth 125kHz |

> **LORA_RESET (0x013F)에 1을 쓰면** 위 기본값으로 모든 LoRa 파라미터가 초기화됨.
> 시험 모드 진입 시에도 자동으로 기본값 초기화가 수행됨.
> KC 인증 시 "이 장비의 기본 운용 조건"에서의 RF 성능을 측정해야 할 때,
> LORA_RESET → LORA_CMD=6(DEFAULT_TX) 순서로 기본 설정 상태의 송신을 바로 시작할 수 있음.

> **KC LoRa 인증 시**: 한국 LoRa 대역 920.9~923.3MHz에서 TX_CARRIER 또는 TX_MODULATED 사용

#### BLE RF 제어 (0x0140 ~ 0x014F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0140 | BLE_CMD | 0~5 | BLE 동작 모드 (아래 표 참조) |
| 0x0141 | BLE_CHANNEL | 0~39 | BLE 채널 (Advert: 37,38,39) |
| 0x0142 | BLE_POWER_SET | -40~8 | BLE TX 출력 (dBm) |
| 0x0143 | BLE_DATA_RATE | 0~1 | BLE 데이터 레이트 (0=1Mbps, 1=2Mbps) |
| 0x014F | BLE_RESET | 1 | **BLE 파라미터 기본값 초기화** (1 쓰면 실행) |

**BLE_CMD 값:**

| 값 | 동작 | 설명 |
|---|------|------|
| 0 | STOP | BLE 중지 |
| 1 | ADVERT | BLE Advertising 시작 |
| 2 | TX_CARRIER | BLE 무변조 캐리어 (nRF Radio Test 모드) |
| 3 | TX_MODULATED | BLE 변조 캐리어 |
| 4 | RX_TEST | BLE 수신 테스트 |
| 5 | DEFAULT_ADVERT | **기본 설정으로 Advertising** (초기화 후 즉시 시작) |

**BLE 기본값 (제품 운용 설정):**

| 파라미터 | 기본값 | 설명 |
|----------|--------|------|
| BLE_CHANNEL | 37, 38, 39 | 표준 Advertising 채널 |
| BLE_TX_POWER | 0 dBm | 제품 기본 송신 출력 |
| BLE_DATA_RATE | 1 Mbps | BLE 1Mbps 모드 |

> **BLE_RESET (0x014F)에 1을 쓰면** 위 기본값으로 모든 BLE 파라미터가 초기화됨.
> 시험 모드 진입 시에도 자동으로 기본값 초기화가 수행됨.
> KC 인증 시 기본 운용 조건 측정: BLE_RESET → BLE_CMD=5(DEFAULT_ADVERT)

> **KC BLE 인증 시**: 2402/2440/2480 MHz (채널 0/19/39)에서 TX_CARRIER 사용

#### Flash 테스트 (0x0150 ~ 0x015F)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x0150 | FLASH_CMD | 0~2 | Flash (0=sleep, 1=wakeup, 2=self-test) |

> **Self-test**: Flash wakeup → 특정 주소에 패턴 write → read back → 검증 → 결과를 0x0071에 저장

#### 종합 제어 (0x01F0 ~ 0x01FF)

| Register | 이름 | 값 범위 | 설명 |
|----------|------|---------|------|
| 0x01F0 | ALL_STOP | 1 | 모든 출력 즉시 중지 (비상 정지) |
| 0x01F1 | SELF_TEST_NO_RF | 1 | **셀프 테스트 (RF 미포함)** - EMI 측정용 |
| 0x01F2 | SELF_TEST_WITH_RF | 1 | **셀프 테스트 (RF 포함)** - 전체 기능 점검용 |
| 0x01F3 | SELF_TEST_RESULT | R/O | 셀프 테스트 종합 결과 (0=미실행, 1=PASS, 2=FAIL) |
| 0x01F4 | SELF_TEST_DETAIL | R/O | 개별 항목 비트맵 결과 (아래 참조) |
| 0x01FF | TEST_MODE | 0~1 | 시험 모드 진입(1)/해제(0) |

> **SELF_TEST_DETAIL 비트맵** (0=PASS, 1=FAIL):
> - bit0: 배터리 전압
> - bit1: Flash R/W
> - bit2: 12V 전원
> - bit3: 부저
> - bit4: LED
> - bit5: 밸브 X
> - bit6: 밸브 Y
> - bit7: LoRa TX (RF 포함 테스트에서만 사용)
> - bit8: BLE Advert (RF 포함 테스트에서만 사용)

---

## 5. 기능별 시험 절차

### 5.1 밸브 제어 시험 (관수 동작 확인)

**목적**: 3-Line 모터 밸브(CR02) 개방/폐쇄 동작 확인

**대상 핀 (X축)**: EN_A (P0.14), EN_B (P0.13), EN_P2 (P0.04)
**대상 핀 (Y축)**: EN_A (P0.25), EN_B (P1.01), EN_P2 (P1.02)

#### X축 밸브 개방 (5초간)

```
TX: 01 10 01 00 00 02 04 00 01 00 05 XX XX
     │  │  │     │     │  │     │     └ CRC
     │  │  │     │     │  │     └ Duration=5초
     │  │  │     │     │  └ CMD=1(개방)
     │  │  │     │     └ 4바이트
     │  │  │     └ 레지스터 2개
     │  │  └ 시작 레지스터 0x0100
     │  └ Write Multiple Registers
     └ Slave Address

RX: 01 10 01 00 00 02 XX XX  (정상 응답)
```

**확인 방법**:
1. 명령 전송 후 X축 모터 동작음 확인
2. 상태 읽기: `01 03 00 20 00 01 XX XX` → VALVE_X_STATE=1(개방) 확인
3. GPIO 읽기: `01 03 00 22 00 01 XX XX` → EN_A=1 확인
4. 5초 후 자동 정지, VALVE_X_STATE=0 확인

#### X축 밸브 폐쇄 (5초간)

```
TX: 01 10 01 00 00 02 04 00 00 00 05 XX XX
                           └ CMD=0(폐쇄)
```

#### X축 밸브 즉시 정지

```
TX: 01 06 01 00 00 02 XX XX
              │     └ CMD=2(정지)
              └ VALVE_X_CMD
```

> Y축: 레지스터 0x0102, 0x0103 사용, 동일 절차

---

### 5.2 유량계 시험

**목적**: DIO 펄스 카운팅 동작 확인

**대상 핀**: DIO_X (P0.10), DIO_Y (P0.09) - 12V→3.3V 레벨 변환

#### X축 유량계 카운팅 시작

```
TX: 01 06 01 10 00 01 XX XX   (카운팅 시작)
```

#### X축 카운트 초기화

```
TX: 01 06 01 11 00 01 XX XX   (카운트 리셋)
```

#### X축 카운트 읽기

```
TX: 01 03 00 30 00 02 XX XX   (32bit 카운트 읽기)
RX: 01 03 04 00 00 00 64 XX XX  (예: 100 펄스)
```

**확인 방법**:
1. 카운팅 시작 명령 전송
2. DIO_X 포트에 외부 펄스 발생기 연결 (12V 레벨)
3. 일정 펄스 인가 후 카운트 읽기로 정확성 확인

---

### 5.3 부저 시험 (도난 경보 동작)

**목적**: 도난 방지 부저 동작 확인

**대상 핀**: BUZZER_EN (P0.24) → MOSFET → 12V 피에조 부저

#### 부저 3초간 동작

```
TX: 01 06 01 20 00 03 XX XX   (3초간 ON)
```

#### 부저 즉시 정지

```
TX: 01 06 01 20 00 00 XX XX   (OFF)
```

**확인 방법**: 부저음 발생/정지 확인, 지정 시간 후 자동 정지 확인

---

### 5.4 진동 센서 시험 (도난 감지)

**목적**: 진동 감지 → 경보 연동 확인

**대상 핀**: VIB_SENSE (P0.21) - SW-18010P, 다운 엣지 인터럽트

#### 진동 상태 읽기

```
TX: 01 03 00 12 00 02 XX XX   (VIB_STATUS + VIB_COUNT 읽기)
RX: 01 03 04 00 01 00 05 XX XX  (감지중, 5회)
```

**확인 방법**:
1. 장비를 흔들기 전/후 VIB_STATUS 변화 확인
2. VIB_COUNT 증가 확인
3. 일정 횟수 이상 시 자동 부저 동작 확인 (도난 판정 로직)

---

### 5.5 배터리 전압 읽기

**목적**: ADC 기반 배터리 전압 측정 확인

**대상 핀**: BAT_AIN (P0.31/AIN7) - 1M/1M 분배 전압

#### 전압 읽기

```
TX: 01 03 00 10 00 02 XX XX   (BAT_VOLTAGE + BAT_PERCENT)
RX: 01 03 04 0C E4 00 50 XX XX  (3300mV, 80%)
```

---

### 5.6 12V 전원 제어

**목적**: 12V 스텝업 전원 스위칭 확인

**대상 핀**: 12V_EN (P0.17)

#### 12V ON

```
TX: 01 06 01 22 00 01 XX XX
```

#### 12V OFF

```
TX: 01 06 01 22 00 00 XX XX
```

**확인 방법**: 12V 출력 단자에서 전압 측정

---

### 5.7 LED 상태 표시 시험

**목적**: 기기 상태 LED 점멸 패턴 확인

#### LED 제어

```
TX: 01 06 01 21 00 01 XX XX   (LED 상시 ON)
TX: 01 06 01 21 00 02 XX XX   (1박자 점멸 - 정상 상태)
TX: 01 06 01 21 00 03 XX XX   (2박자 점멸 - 저전력 상태)
TX: 01 06 01 21 00 00 XX XX   (LED OFF)
```

---

### 5.8 LoRa RF 시험

**목적**: LoRa 무선 송수신 특성 측정 (KC 전파 인증)

**주파수 범위**: 920.9 ~ 923.3 MHz (한국 LoRa 대역)

#### LoRa 기본값 초기화 및 기본 모드 송신

KC 인증에서 **장비의 기본 운용 설정 상태**에서의 RF 성능을 먼저 측정할 때 사용.

```
# LoRa 파라미터 기본값 초기화 (922.1MHz, 14dBm, SF7, BW125kHz)
TX: 01 06 01 3F 00 01 XX XX   (LORA_RESET)

# 기본 설정 그대로 변조 TX 시작
TX: 01 06 01 30 00 06 XX XX   (DEFAULT_TX)

# 측정 완료 후 중지
TX: 01 06 01 30 00 00 XX XX   (STOP)
```

> 기본값 확인: 0x0051(주파수), 0x0052(출력), 0x0053~0x0054(RSSI/SNR) 레지스터 읽기

#### LoRa 캐리어 출력 (920MHz, 14dBm)

```
# 주파수 설정
TX: 01 06 01 31 03 98 XX XX   (920 MHz)

# 출력 설정
TX: 01 06 01 32 00 0E XX XX   (14 dBm)

# 캐리어 출력 시작
TX: 01 06 01 30 00 01 XX XX   (TX_CARRIER)

# 측정 완료 후 중지
TX: 01 06 01 30 00 00 XX XX   (STOP)
```

#### LoRa 변조 신호 출력

```
# SF, BW 설정
TX: 01 06 01 33 00 07 XX XX   (SF7)
TX: 01 06 01 34 00 00 XX XX   (BW=125kHz)

# 변조 출력 시작
TX: 01 06 01 30 00 02 XX XX   (TX_MODULATED)
```

#### LoRa 수신 테스트

```
TX: 01 06 01 30 00 04 XX XX   (RX_CONTINUOUS)

# RSSI/SNR 읽기
TX: 01 03 00 53 00 02 XX XX
RX: 01 03 04 FF 9C 00 5F XX XX  (RSSI=-100dBm, SNR=9.5dB)
```

#### KC LoRa 인증 권장 측정 순서

| 순서 | 주파수 | 동작 | 측정 항목 |
|------|--------|------|----------|
| 1 | 920.9 MHz | TX_CARRIER | TX Power, 스퓨리어스 |
| 2 | 922.1 MHz | TX_CARRIER | TX Power (Mid) |
| 3 | 923.3 MHz | TX_CARRIER | TX Power (High) |
| 4 | 922.1 MHz | TX_MODULATED | 변조 특성, 점유 대역폭 |
| 5 | 920~925 MHz | TX_SWEEP | 주파수 스윕 |
| 6 | 922.1 MHz | RX_CONTINUOUS | 수신 감도 |

---

### 5.9 BLE RF 시험

**목적**: BLE 무선 송수신 특성 측정 (KC 전파 인증)

**주파수 범위**: 2402 ~ 2480 MHz

#### BLE 기본값 초기화 및 기본 모드 Advertising

KC 인증에서 **장비의 기본 운용 설정 상태**에서의 BLE RF 성능을 먼저 측정할 때 사용.

```
# BLE 파라미터 기본값 초기화 (채널 37/38/39, 0dBm, 1Mbps)
TX: 01 06 01 4F 00 01 XX XX   (BLE_RESET)

# 기본 설정 그대로 Advertising 시작
TX: 01 06 01 40 00 05 XX XX   (DEFAULT_ADVERT)

# 측정 완료 후 중지
TX: 01 06 01 40 00 00 XX XX   (STOP)
```

#### BLE 캐리어 출력 (2440MHz, 0dBm)

```
# 채널 설정 (채널 19 = 2440MHz)
TX: 01 06 01 41 00 13 XX XX   (채널 19)

# 출력 설정
TX: 01 06 01 42 00 00 XX XX   (0 dBm)

# 캐리어 출력
TX: 01 06 01 40 00 02 XX XX   (TX_CARRIER)

# 중지
TX: 01 06 01 40 00 00 XX XX   (STOP)
```

#### KC BLE 인증 권장 측정 순서

| 순서 | 채널 | 주파수 | 동작 | 측정 항목 |
|------|------|--------|------|----------|
| 1 | 0 | 2402 MHz | TX_CARRIER | TX Power (Low) |
| 2 | 19 | 2440 MHz | TX_CARRIER | TX Power (Mid) |
| 3 | 39 | 2480 MHz | TX_CARRIER | TX Power (High) |
| 4 | 19 | 2440 MHz | TX_MODULATED | 변조 특성 |
| 5 | 0~39 | 전 대역 | ADVERT | 실제 Advertising 동작 |

---

### 5.10 Flash 메모리 시험

**목적**: 외부 Flash (MX25R1635F) 읽기/쓰기 동작 확인

#### Flash 셀프 테스트

```
TX: 01 06 01 50 00 02 XX XX   (Self-test 실행)

# 결과 확인 (수 초 대기 후)
TX: 01 03 00 71 00 01 XX XX
RX: 01 03 02 00 01 XX XX      (PASS)
```

> Self-test 내부 동작: wakeup → 지정 섹터 erase → 패턴 write → read verify → sleep

---

### 5.11 비상 정지

**목적**: 시험 중 이상 발생 시 모든 출력 즉시 중지

```
TX: 01 06 01 F0 00 01 XX XX   (ALL_STOP)
```

**동작**: 밸브 정지, 부저 OFF, LED OFF, 12V OFF, LoRa STOP, BLE STOP

---

### 5.12 셀프 테스트 (RF 미포함) - EMI 측정용

**목적**: RF 송신 없이 하드웨어 기능만 자동 점검. EMI 측정 시 RF 방사가 결과에 영향을 주지 않도록 LoRa/BLE 송신을 제외한 테스트.

```
TX: 01 06 01 F1 00 01 XX XX   (SELF_TEST_NO_RF 실행)
```

**자동 실행 항목 및 순서**:

| 순서 | 항목 | 판정 기준 | 비고 |
|------|------|----------|------|
| 1 | 배터리 전압 | 2.5V ~ 4.2V 범위 | ADC 읽기 |
| 2 | Flash R/W | write 후 read back 일치 | QSPI 통신 |
| 3 | 12V 전원 | EN 후 전압 확인 | 스텝업 동작 |
| 4 | 부저 | 0.5초 동작 | 소리 확인 |
| 5 | LED | 1초 점등 | 육안 확인 |
| 6 | 밸브 X | 개방 1초 → 정지 | 모터 동작음 |
| 7 | 밸브 Y | 개방 1초 → 정지 | 모터 동작음 |

> EMI 시험실에서 불요 전파 방사(스퓨리어스) 측정 시, 장비의 디지털 회로/모터 구동에서
> 발생하는 EMI만 측정해야 하므로 RF 송신기를 활성화하면 안 됨.
> 이 테스트로 RF 외 전체 하드웨어가 동작하는 상태에서의 EMI를 측정할 수 있음.

---

### 5.13 셀프 테스트 (RF 포함) - 전체 기능 점검용

**목적**: RF 포함 모든 기능 자동 점검. 장비 출하 검사 또는 KC 기능 시험 시 전체 동작을 한 번에 확인.

```
TX: 01 06 01 F2 00 01 XX XX   (SELF_TEST_WITH_RF 실행)
```

**자동 실행 항목 및 순서**:

| 순서 | 항목 | 판정 기준 | 비고 |
|------|------|----------|------|
| 1 | 배터리 전압 | 2.5V ~ 4.2V 범위 | ADC 읽기 |
| 2 | Flash R/W | write 후 read back 일치 | QSPI 통신 |
| 3 | 12V 전원 | EN 후 전압 확인 | 스텝업 동작 |
| 4 | 부저 | 0.5초 동작 | 소리 확인 |
| 5 | LED | 1초 점등 | 육안 확인 |
| 6 | 밸브 X | 개방 1초 → 정지 | 모터 동작음 |
| 7 | 밸브 Y | 개방 1초 → 정지 | 모터 동작음 |
| 8 | **LoRa TX** | 기본 설정으로 패킷 1회 송신 | 922.1MHz, 14dBm |
| 9 | **BLE Advert** | 기본 설정으로 3초간 Advertising | 0dBm, 1Mbps |

> 항목 8~9는 RF 포함 테스트에서만 실행됨.
> LoRa/BLE 모두 기본값(제품 운용 설정)으로 자동 초기화 후 송신.

---

### 셀프 테스트 결과 확인

두 테스트 모두 결과 확인 방법은 동일:

```
# 종합 결과 확인
TX: 01 03 01 F3 00 01 XX XX
RX: 01 03 02 00 01 XX XX      (1=PASS, 2=FAIL)

# 개별 항목 비트맵 확인
TX: 01 03 01 F4 00 01 XX XX
RX: 01 03 02 00 00 XX XX      (0x0000 = 전 항목 PASS)
```

**비트맵 해석 (0=PASS, 1=FAIL)**:

| bit | 항목 | RF 미포함 | RF 포함 |
|-----|------|:--------:|:------:|
| 0 | 배터리 전압 | O | O |
| 1 | Flash R/W | O | O |
| 2 | 12V 전원 | O | O |
| 3 | 부저 | O | O |
| 4 | LED | O | O |
| 5 | 밸브 X | O | O |
| 6 | 밸브 Y | O | O |
| 7 | LoRa TX | - | O |
| 8 | BLE Advert | - | O |

> 셀프 테스트 진행 중 상태는 0x0004 (TEST_MODE) 레지스터에 진행률(%)로 표시.
> RF 미포함 테스트에서 bit7, bit8은 항상 0(PASS)으로 표시됨 (미실행이므로).

---

## 6. CRC 계산

Modbus RTU 표준 CRC-16 (다항식: 0x8005, 초기값: 0xFFFF)

### 계산 예시 (C 코드)

```c
uint16_t modbus_crc16(uint8_t *data, uint16_t len) {
    uint16_t crc = 0xFFFF;
    for (uint16_t i = 0; i < len; i++) {
        crc ^= data[i];
        for (uint8_t j = 0; j < 8; j++) {
            if (crc & 0x0001)
                crc = (crc >> 1) ^ 0xA001;
            else
                crc >>= 1;
        }
    }
    return crc;  // Low byte first
}
```

---

## 7. 오류 응답

Modbus 표준 예외 응답 사용.

| Exception Code | 의미 | 발생 조건 |
|----------------|------|----------|
| 0x01 | Illegal Function | 지원하지 않는 Function Code |
| 0x02 | Illegal Data Address | 존재하지 않는 레지스터 주소 |
| 0x03 | Illegal Data Value | 범위를 벗어난 값 |
| 0x06 | Server Device Busy | 이전 명령 실행 중 |

**예외 응답 프레임**:
```
01 86 02 XX XX
│  │  └ Exception Code (Illegal Data Address)
│  └ Function Code + 0x80
└ Slave Address
```

---

## 8. 시험 시나리오 요약표

전체 KC 인증 기능 시험 시 아래 순서로 진행 권장.

| 단계 | 시험 항목 | 명령 요약 | 확인 방법 |
|------|----------|----------|----------|
| 0 | **BTN 누르고 시험모드 진입** | BTN → 3초 내 0x01FF=1 | 응답 에코 |
| 1 | 배터리 전압 | 0x0010 읽기 | 전압 범위 확인 |
| 2 | 12V 전원 ON/OFF | 0x0122=1/0 | 멀티미터 측정 |
| 3 | 부저 ON(3초)/OFF | 0x0120=3/0 | 소리 확인 |
| 4 | LED 점등/점멸 | 0x0121=1/2/3/0 | 육안 확인 |
| 5 | 밸브 X 개방/폐쇄 | 0x0100=1/0 | 모터 동작음, GPIO 상태 |
| 6 | 밸브 Y 개방/폐쇄 | 0x0102=1/0 | 모터 동작음, GPIO 상태 |
| 7 | 유량계 X 카운팅 | 0x0110=1, 외부 펄스 | 카운트 읽기 |
| 8 | 유량계 Y 카운팅 | 0x0112=1, 외부 펄스 | 카운트 읽기 |
| 9 | 진동 센서 | 장비 흔들기 | 0x0012 상태 변화 |
| 10 | Flash 셀프테스트 | 0x0150=2 | 0x0071=PASS |
| 11 | **셀프테스트 (RF 미포함)** | **0x01F1=1** | **EMI 측정 시 사용** |
| 12 | **LoRa 기본값 초기화** | **0x013F=1** | 0x0051~0x0052 확인 |
| 13 | **LoRa 기본 모드 TX** | **0x0130=6 (DEFAULT_TX)** | **스펙트럼 분석기** |
| 14 | LoRa TX 캐리어 | 0x0130=1 | 스펙트럼 분석기 |
| 15 | LoRa 변조 TX | 0x0130=2 | 스펙트럼 분석기 |
| 16 | LoRa RX | 0x0130=4 | RSSI/SNR 확인 |
| 17 | **BLE 기본값 초기화** | **0x014F=1** | 0x0061 확인 |
| 18 | **BLE 기본 모드 Advert** | **0x0140=5 (DEFAULT_ADVERT)** | **스마트폰 스캔** |
| 19 | BLE TX 캐리어 | 0x0140=2 | 스펙트럼 분석기 |
| 20 | BLE 변조 TX | 0x0140=3 | 스펙트럼 분석기 |
| 21 | **셀프테스트 (RF 포함)** | **0x01F2=1** | **전체 기능 점검** |
| 22 | 비상 정지 | 0x01F0=1 | 전체 출력 중지 확인 |
| 23 | 시험모드 해제 | 0x01FF=0 | 정상 동작 복귀 |

---

## 9. 시험 장비 요구사항

| 장비 | 용도 |
|------|------|
| PC + 시리얼 터미널 (ModbusPoll 등) | RS485 명령 송수신 |
| USB-RS485 컨버터 | PC와 장비 연결 |
| 스펙트럼 분석기 | LoRa/BLE RF 측정 |
| 멀티미터 | 전압, GPIO 레벨 확인 |
| 펄스 발생기 (12V) | 유량계 DIO 시험 |
| DC 전원 공급기 | 배터리 대신 전원 공급 |

---

## 10. 핀 배치 참고 (REVITA_LINK_v1)

| 기능 | 핀 | Port | 비고 |
|------|-----|------|------|
| RS485 TX | 10 | P0.20 | 시험 명령 수신/응답 |
| RS485 RX | 9 | P0.19 | 시험 명령 수신/응답 |
| RS485 DE | 28 | P1.04 | 송신 활성화 |
| RS485 RE# | 27 | P1.03 | 수신 활성화 |
| X_EN_A | 5 | P0.14 | X축 모터 A |
| X_EN_B | 4 | P0.13 | X축 모터 B |
| X_EN_P2 | 41 | P0.04 | X축 MOSFET |
| Y_EN_A | 24 | P0.25 | Y축 모터 A |
| Y_EN_B | 25 | P1.01 | Y축 모터 B |
| Y_EN_P2 | 26 | P1.02 | Y축 MOSFET |
| DIO_X | 12 | P0.10 | X축 유량계 펄스 |
| DIO_Y | 13 | P0.09 | Y축 유량계 펄스 |
| BUZZER_EN | 23 | P0.24 | 부저 제어 |
| 12V_EN | 8 | P0.17 | 12V 승압 활성화 |
| VIB_SENSE | 11 | P0.21 | 진동 센서 |
| BTN | 40 | P0.05 | 전원 버튼 |
| BAT_AIN | 39 | P0.31 | 배터리 ADC |

---

*작성일: 2026-03-30*
*기반 문서: 26-03-01 펌웨어 개발 의뢰서, RAK4630_Pin_Map_REVITA_LINK_v1*
