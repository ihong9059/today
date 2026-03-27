# KC 인증 펌웨어 개발 계획서

**제품명:** 리비타 링크 (REVITA LINK)
**MCU:** nRF52840 (RAK4630 모듈)
**작성일:** 2026-03-25
**참조:** 26-03-24 KC 인증용 펌웨어.pdf

---

## 1. 개요

리비타 링크 제품의 KC 인증(전파인증)을 위한 통합 펌웨어 개발 계획서입니다.

### 1.1 인증 대상 무선 모듈

| 무선 | 칩셋 | 주파수 대역 | 인증 항목 |
|------|------|-------------|-----------|
| **BLE** | nRF52840 | 2402~2480 MHz | TX 출력, 변조 특성, 스퓨리어스 |
| **LoRa** | SX1262 | 920~923 MHz | TX 출력, 점유 대역폭, 불요 발사 |

---

## 2. 모드 구성

외부 버튼으로 모드 전환, LED 깜빡임으로 현재 모드 표시

| 순서 | 모드 이름 | 동작 상세 | LED 표시 | 의도 |
|------|----------|----------|----------|------|
| 0 | 배송용 | Sleep 상태 | 0번 | 배송 중 방전 예방 |
| 1 | 일반/EMC | RS485 루프백, 모터 제어, 유량계 | 1번 (5초 간격) | EMC/ESD 테스트 |
| 2 | LoRa TX Low | 920.9MHz 연속 송신 | 2번 | LoRa 전파인증 |
| 3 | LoRa TX Mid | 922.1MHz 연속 송신 | 3번 | LoRa 전파인증 |
| 4 | LoRa TX High | 923.3MHz 연속 송신 | 4번 | LoRa 전파인증 |
| 5 | LoRa CW | 922.1MHz 무변조 송신 | 5번 | LoRa 전파인증 |
| 6 | LoRa 통신 | RS485 데이터 → LoRa 송신 | 6번 | LoRa 전파인증 |
| **7** | **BLE** | **BLE RF 테스트** | **7번** | **BLE 인증용** |

---

## 3. BLE 인증 모드 (모드 7) 상세 계획

### 3.1 목적

- BLE 2.4GHz 대역 RF 성능 측정
- TX 출력 전력, 변조 특성, 스퓨리어스 방사 확인
- KC 기술기준 준수 여부 검증

### 3.2 구현 방안

#### 옵션 A: Nordic Radio Test 통합 (권장)

현재 `kc_cert` 프로젝트의 Radio Test를 기반으로 통합

**장점:**
- Shell 명령어로 세밀한 제어 가능
- 채널, 출력, 패턴 등 실시간 변경
- 시험소 요구사항에 유연하게 대응

**단점:**
- UART 연결 필요
- 버튼만으로 제어 불가

#### 옵션 B: 단순 TX 모드 구현

버튼으로만 제어 가능한 단순 BLE TX 모드

**장점:**
- 다른 모드와 UI 일관성
- UART 없이 동작 가능

**단점:**
- 세밀한 제어 어려움

### 3.3 BLE 테스트 채널 (권장)

| 채널 | 주파수 | 용도 |
|------|--------|------|
| 0 | 2402 MHz | Low 채널 |
| 19 | 2440 MHz | Mid 채널 |
| 39 | 2480 MHz | High 채널 |

### 3.4 BLE 모드 7 세부 동작 (제안)

```
모드 7 진입 시:
├── 서브모드 7-1: BLE TX Carrier (2440MHz, 0dBm)
├── 서브모드 7-2: BLE TX Modulated (2440MHz, 1Mbps)
├── 서브모드 7-3: BLE TX Low (2402MHz)
├── 서브모드 7-4: BLE TX Mid (2440MHz)
└── 서브모드 7-5: BLE TX High (2480MHz)

버튼 짧게 누름: 서브모드 전환
버튼 길게 누름 (3초): 메인 모드 전환
```

### 3.5 BLE 테스트 명령어 (Radio Test Shell 사용 시)

```bash
# 무변조 캐리어 (TX Power 측정)
start_channel 40
output_power 0
start_tx_carrier

# 변조 캐리어 (변조 특성 측정)
start_channel 40
data_rate ble_1Mbit
transmit_pattern pattern_random
start_tx_modulated_carrier

# 중지
cancel
```

---

## 4. 개발 일정

### Phase 1: BLE Radio Test 검증 (완료)

- [x] Radio Test 샘플 포팅 (`kc_cert` 프로젝트)
- [x] RAK4631 보드 overlay 설정
- [x] UART2 (P0.16/P0.15) 설정
- [x] 빌드 및 플래시 확인
- [x] Shell 명령어 동작 확인

### Phase 2: BLE 인증 테스트 수행

- [ ] TX 출력 전력 측정 (Low/Mid/High 채널)
- [ ] 변조 특성 측정
- [ ] 스퓨리어스 방사 측정
- [ ] 테스트 결과 기록

### Phase 3: 통합 펌웨어 개발

- [ ] 기존 LoRa/EMC 펌웨어와 BLE 모드 통합
- [ ] 모드 7 BLE 기능 구현
- [ ] 버튼/LED 인터페이스 통합
- [ ] 전체 모드 테스트

### Phase 4: 최종 검증

- [ ] 전체 모드 동작 확인
- [ ] 시험소 제출용 펌웨어 빌드
- [ ] 사용 설명서 작성

---

## 5. 하드웨어 연결

### 5.1 디버그 UART (모드 7)

| 신호 | 핀 | 설명 |
|------|-----|------|
| TX | P0.16 | UART2 TX |
| RX | P0.15 | UART2 RX |
| 속도 | 115200 | 8N1 |

### 5.2 외부 인터페이스

| 인터페이스 | 용도 |
|------------|------|
| 외부 버튼 (GPB2) | 모드 전환 |
| LED (GPB1) | 모드 표시 |
| RS485 (UART1) | EMC 모드 통신 |

---

## 6. 파일 구조

```
/home/uttec/revita/zephyr_workspace/kc_cert/
├── CMakeLists.txt
├── Kconfig
├── prj.conf
├── rak4631.overlay
├── src/
│   ├── main.c
│   ├── radio_cmd.c
│   ├── radio_test.c
│   └── radio_test.h
├── KC_Radio_Test_명령어.md
└── KC_인증_펌웨어_개발계획서.md    ← 현재 문서
```

---

## 7. 참고 자료

- [nRF52840_KC인증_RF테스트_가이드.pdf](/home/uttec/revita/자료/kc인증/)
- [26-03-24 KC 인증용 펌웨어.pdf](/home/uttec/revita/자료/kc인증/)
- [Nordic Radio Test Sample](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/peripheral/radio_test/README.html)
- [작업보고서](/home/uttec/revita/ref/hwTest/작업보고서.md)

---

## 8. 담당자

| 구분 | 담당 | 비고 |
|------|------|------|
| LoRa 펌웨어 | - | 모드 2~6 |
| BLE 펌웨어 | 홍선생님 | 모드 7 (본 계획서) |
| EMC 펌웨어 | - | 모드 1 |
| 통합 | - | 전체 모드 통합 |

---

## 변경 이력

| 날짜 | 버전 | 내용 |
|------|------|------|
| 2026-03-25 | v0.1 | 초안 작성, BLE Radio Test 포팅 완료 |
