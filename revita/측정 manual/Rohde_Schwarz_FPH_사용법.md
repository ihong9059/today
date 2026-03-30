# Rohde & Schwarz Spectrum Rider FPH 사용법

## 장비 개요

- **제조사**: Rohde & Schwarz
- **모델**: Spectrum Rider FPH (Model .02)
- **용도**: 휴대용 스펙트럼 분석기
- **주요 적용**: BLE, LoRa, IoT 무선 신호 측정

---

## 주요 버튼 기능

| 버튼 | 기능 |
|------|------|
| **FREQ** | 중심 주파수 / 시작·정지 주파수 설정 |
| **SPAN** | 주파수 범위 설정 (넓히면 전체 대역, 좁히면 상세) |
| **AMPT** | 기준 레벨(REF), 감쇠기(ATT) 설정 |
| **BW** | RBW/VBW (Resolution/Video Bandwidth) 설정 |
| **SWEEP** | 스윕 시간, 연속/단일 스윕 설정 |
| **TRACE** | 트레이스 모드 (Max Hold, Average, Normal) |
| **MARKER** | 마커 설정 (피크 검색, 델타 마커) |
| **MEAS** | 채널 파워, OBW, ACLR 등 측정 기능 |
| **MODE** | Spectrum / Cable&Antenna / Power Meter 모드 전환 |
| **PRESET** | 초기화 (공장 설정 복원) |
| **SAVE RECALL** | 화면 캡처, 설정 저장/불러오기 |
| **SETUP** | 시스템 설정 (날짜, 언어, 인터페이스 등) |
| **LINES** | 리미트 라인 설정 (Pass/Fail 판정용) |
| **WIZARD** | 측정 마법사 (가이드 모드) |
| **F1~F6** | 소프트키 (화면 우측 메뉴에 대응) |
| **다이얼(로터리 노브)** | 값 미세 조정, 마커 이동 |

---

## 기본 측정 순서

### 1단계: 초기화

- `PRESET` 버튼 → 기본 상태로 리셋

### 2단계: 주파수 설정

- `FREQ` 버튼 → Center Freq 선택
- 숫자 키패드로 주파수 입력 (예: `920`)
- 단위 버튼 누름 (`MHz`)
- 또는 `FREQ` → Start Freq / Stop Freq로 범위 직접 지정

### 3단계: 대역폭 설정

- `SPAN` 버튼 → 원하는 범위 설정
- 예: 4 MHz 입력 시 중심 주파수 기준 ±2 MHz 범위 표시

### 4단계: 레벨 조정

- `AMPT` 버튼 → REF Level 조정
- 신호가 화면 상단 근처에 오도록 설정
- ATT(감쇠기)는 강한 신호 입력 시 올려서 장비 보호

### 5단계: 마커로 피크 찾기

- `MARKER` 버튼 → Peak Search 선택
- 다이얼(로터리 노브)로 마커 위치 미세 이동
- Delta Marker로 두 신호 간 차이 측정 가능

### 6단계: 결과 저장

- `SAVE RECALL` → Screenshot 또는 Trace 저장
- USB 메모리로 데이터 복사 가능

---

## 화면 파라미터 설명

```
REF   : -20 dBm     기준 레벨 (화면 최상단 값)
ATT   : 0 dB        입력 감쇠기
PA    : OFF          프리앰프 (약한 신호 시 ON)
RBW   : 100 kHz     Resolution Bandwidth (주파수 분해능)
VBW   : 100 kHz     Video Bandwidth (노이즈 평활화)
SWT   : 20 ms       Sweep Time (1회 스윕 소요 시간)
Start : 920 MHz     시작 주파수
Stop  : 924 MHz     정지 주파수
```

### 파라미터 조정 가이드

| 파라미터 | 작게 설정 시 | 크게 설정 시 |
|----------|-------------|-------------|
| **RBW** | 주파수 분해능 향상, 측정 느림 | 빠른 측정, 분해능 낮음 |
| **VBW** | 노이즈 감소, 측정 느림 | 빠른 측정, 노이즈 많음 |
| **SPAN** | 좁은 범위 상세 관찰 | 넓은 범위 전체 확인 |
| **REF Level** | 약한 신호 관찰 | 강한 신호 관찰 |

---

## 자주 쓰는 측정 설정

### BLE 신호 측정

```
Center Freq : 2440 MHz
Span        : 80 MHz
RBW         : 1 MHz
```

### LoRa 920MHz 대역 측정

```
Center Freq : 922 MHz
Span        : 6 MHz
RBW         : 100 kHz
```

### KC 인증 시험용 (920 MHz ISM)

```
Start Freq  : 920 MHz
Stop Freq   : 924 MHz
RBW         : 100 kHz
VBW         : 100 kHz
REF         : -20 dBm
ATT         : 0 dB
```

---

## 유용한 기능

### Max Hold (피크 홀드)

- `TRACE` → Max Hold 선택
- 간헐적으로 발생하는 신호를 포착할 때 사용
- 시간이 지남에 따라 최대값을 누적 표시

### Channel Power (채널 파워)

- `MEAS` → Channel Power 선택
- 특정 채널 대역의 총 전력을 측정

### OBW (Occupied Bandwidth)

- `MEAS` → OBW 선택
- 점유 대역폭 측정 (인증 시험에 필수)

### Delta Marker

- `MARKER` → Delta Marker
- 기준 마커 대비 상대적 주파수/레벨 차이 측정

### Limit Lines

- `LINES` → 리미트 라인 설정
- 규격 기준선을 화면에 표시하여 Pass/Fail 판정

---

## 한국 IoT 주파수 대역 참고

| 대역 | 주파수 범위 | 용도 |
|------|------------|------|
| 920 MHz ISM | 920.9 ~ 923.3 MHz | LoRa, IoT |
| 2.4 GHz ISM | 2400 ~ 2483.5 MHz | BLE, Wi-Fi, Zigbee |
| Sub-1GHz | 917 ~ 923.5 MHz | LPWAN |

---

## 주의사항

- 강한 신호(+20 dBm 이상) 입력 시 반드시 **ATT(감쇠기)** 사용
- 안테나 직접 연결 시 **PA(프리앰프) OFF** 확인
- 배터리 잔량 확인 후 장시간 측정 시 AC 어댑터 사용 권장
- USB 저장 시 FAT32 포맷 USB 메모리 사용
