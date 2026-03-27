# KC 인증 Radio Test 명령어 가이드

nRF52840 BLE KC 인증(전파인증)을 위한 Radio Test 명령어 정리

## 기본 정보

- **주파수 범위**: 2402 ~ 2480 MHz (BLE)
- **채널**: 0 ~ 80 (2400MHz + channel = 실제 주파수)
- **UART 설정**: 115200 baud, 8N1

## 주요 채널

| 채널 | 주파수 | 용도 |
|------|--------|------|
| 0 | 2402 MHz | Low 채널 테스트 |
| 19 | 2419 MHz | - |
| 39 | 2439 MHz | Mid 채널 테스트 |
| 40 | 2440 MHz | - |
| 78 | 2478 MHz | - |
| 80 | 2480 MHz | High 채널 테스트 |

---

## 1. TX 출력 전력 측정 (Carrier Wave)

KC 인증에서 가장 기본적인 테스트. 무변조 캐리어 출력.

```
# 채널 설정 (예: 2440MHz = 채널 40)
start_channel 40

# 출력 전력 설정 (dBm)
output_power 0

# 캐리어 송신 시작
start_tx_carrier

# 측정 완료 후 중지
cancel
```

### 출력 전력 옵션

```
output_power <level>
```
- nRF52840 지원 출력: -40, -20, -16, -12, -8, -4, 0, +2, +3, +4, +5, +6, +7, +8 dBm

---

## 2. 변조 특성 측정 (Modulated Carrier)

BLE 변조 신호 출력 테스트.

```
# 채널 설정
start_channel 40

# 데이터 레이트 설정
data_rate ble_1Mbit

# 전송 패턴 설정
transmit_pattern pattern_11110000

# 변조 캐리어 송신 시작 (연속)
start_tx_modulated_carrier

# 또는 특정 패킷 수만 송신
start_tx_modulated_carrier 1000

# 중지
cancel
```

### 데이터 레이트 옵션

```
data_rate <mode>
```
- `ble_1Mbit` - BLE 1Mbps
- `ble_2Mbit` - BLE 2Mbps
- `nrf_250Kbit` - 250Kbps (proprietary)
- `nrf_1Mbit` - 1Mbps (proprietary)
- `nrf_2Mbit` - 2Mbps (proprietary)
- `ieee802154_250Kbit` - 802.15.4

### 전송 패턴 옵션

```
transmit_pattern <pattern>
```
- `pattern_random` - PRBS9 랜덤 패턴
- `pattern_11110000` - 0xF0 반복
- `pattern_11001100` - 0xCC 반복

---

## 3. 주파수 스윕 테스트

전 채널 스윕 테스트.

```
# 시작/종료 채널 설정
start_channel 0
end_channel 80

# 채널당 체류 시간 (ms)
time_on_channel 50

# TX 스윕 시작
start_tx_sweep

# 중지
cancel
```

---

## 4. 듀티 사이클 변조 TX

특정 듀티 사이클로 변조 신호 출력.

```
# 채널 및 전력 설정
start_channel 40
output_power 0

# 듀티 사이클 설정 (01~90%)
start_duty_cycle_modulated_tx 50

# 중지
cancel
```

---

## 5. RX 테스트

수신 감도 테스트용.

```
# 채널 설정
start_channel 40

# 데이터 레이트 설정
data_rate ble_1Mbit

# RX 시작 (연속)
start_rx

# 또는 특정 패킷 수만 수신
start_rx 100

# 수신 데이터 출력
print_rx

# 중지
cancel
```

---

## 6. 현재 설정 확인

```
parameters_print
```

출력 예시:
```
Data rate: BLE 1Mbit
Tx power: 0 dBm
Channel: 40
Pattern: 0xF0
```

---

## KC 인증 테스트 순서 (권장)

### 1단계: TX Power 측정 (Low/Mid/High 채널)

```
# Low 채널 (2402 MHz)
start_channel 2
output_power 0
start_tx_carrier
# 측정 후
cancel

# Mid 채널 (2440 MHz)
start_channel 40
start_tx_carrier
# 측정 후
cancel

# High 채널 (2480 MHz)
start_channel 80
start_tx_carrier
# 측정 후
cancel
```

### 2단계: 변조 특성 측정

```
start_channel 40
data_rate ble_1Mbit
transmit_pattern pattern_random
start_tx_modulated_carrier
# 측정 후
cancel
```

### 3단계: 스퓨리어스 방사 측정

```
# 동일하게 TX carrier 또는 modulated carrier 상태에서
# 스펙트럼 분석기로 측정
start_channel 40
output_power 0
start_tx_carrier
```

---

## DCDC 컨버터 제어

전력 효율 테스트 시 사용.

```
# DCDC 상태 토글
toggle_dcdc_state 1
```

---

## 빠른 참조

| 명령어 | 설명 |
|--------|------|
| `start_channel <ch>` | 채널 설정 (0-80) |
| `output_power <dBm>` | 출력 전력 설정 |
| `data_rate <mode>` | 데이터 레이트 설정 |
| `transmit_pattern <pat>` | 전송 패턴 설정 |
| `start_tx_carrier` | 무변조 캐리어 송신 |
| `start_tx_modulated_carrier` | 변조 캐리어 송신 |
| `start_tx_sweep` | TX 스윕 |
| `start_rx` | 수신 모드 |
| `cancel` | 현재 동작 중지 |
| `parameters_print` | 현재 설정 출력 |

---

## 참고

- 프로젝트 위치: `/home/uttec/revita/zephyr_workspace/kc_cert/`
- 보드: RAK4631 (nRF52840)
- UART: P0.16 (TX), P0.15 (RX) @ 115200 baud

작성일: 2026-03-25
