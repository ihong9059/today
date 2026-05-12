# ALD (Antenna Line Device) 타입별 상세

> 위시캣 #155057 미팅 (2026-05-13) 대비 — AISG가 제어하는 ALD 4종(+α)의 동작 원리·명령 셋·미팅 답변용 핵심 포인트.
> 출처: AISG 공식 Subunit Type 표준 (AISG-ST-RET, AISG-ST-TMA, AISG-ES-GLS, AISG-ES-ASD).

---

## 1. ALD 개념 정의

**ALD (Antenna Line Device)** = 이동통신 기지국 안테나 라인에 설치되어 AISG 버스로 원격 제어·모니터링되는 디바이스의 총칭.

```
[기지국 BS]
     │
     │ AISG Bus (RS-485 또는 OOK on RF feeder)
     │
     ▼
┌─────────────────────┐
│  ALD                │  ← 하나의 ALD가 여러 Subunit 포함 가능
│  ├── Subunit: RET   │
│  ├── Subunit: TMA   │
│  └── Subunit: GLS   │
└─────────────────────┘
```

**용어 정리**:
- **ALD** = 물리적 디바이스 (하나의 케이스, 하나의 AISG 인터페이스)
- **Subunit** = ALD 내부 기능 단위 (RET / TMA / GLS / ASD 등)
- **MALD** (v3.0) = Multi-Primary 지원 ALD
- **Primary** = 컨트롤러 (마스터)
- **Secondary** = ALD 측 응답 주체 (슬레이브)

---

## 2. ALD 타입 일람

| 타입 | 정식 명칭 | 역할 | 표준 문서 |
|---|---|---|---|
| **RET** | Remote Electrical Tilt | 안테나 빔 틸트 각도 원격 조정 | AISG-ST-RET-vR.x |
| **TMA** | Tower Mounted Amplifier | 타워 장착 저잡음 증폭기 제어 | AISG-ST-TMA-vTMA3.0.5 |
| **GLS** | Geographic Location Sensor | 안테나 GPS 위치·방위 감지 | AISG-ES-GLS |
| **ASD** | Alignment Sensor Device | 안테나 정렬(틸트·방위·롤) 측정 | AISG-ES-ASD-v2.1.0 |
| **ALS** | Antenna Location & Orientation Sensor | 통합 위치·자세 센서 (개발 중, 2022~) | (개발 중) |

---

## 3. RET — Remote Electrical Tilt

### 3.1 개요

- **역할**: 안테나 빔의 전기적 틸트 각도(electrical downtilt)를 원격 조정
- **물리 구조**: 안테나 내부에 모터(스텝퍼/DC) + 위상 시프터(phase shifter)
- **틸트 조정 효과**: 셀 커버리지·간섭·용량 최적화
- **장점**: 사람이 타워 올라가지 않고 사무실에서 조정 가능

### 3.2 동작 원리

```
   안테나 패치
   ┌───────────┐
   │  ↑  ↑  ↑  │  ← 빔 방향 (위상 차로 결정)
   │  │  │  │  │
   │ [위상시프터]│  ← 모터로 회전 → 각 패치 위상 변경
   └─────┬─────┘
         │
       모터 ◀── AISG 명령으로 회전
```

- 모터가 위상시프터를 회전 → 각 안테나 패치의 신호 위상 차이 변경 → 빔이 위/아래로 기울어짐
- 전형적 범위: 0° ~ 10° 또는 -2° ~ 12° (벤더별 상이)
- 분해능: 0.1°

### 3.3 주요 명령 (AISG-ST-RET)

| 명령 | 방향 | 설명 |
|---|---|---|
| `Calibrate` | P→S | 캘리브레이션 (전체 범위 이동 + 0점 복귀) |
| `SetTilt` | P→S | 틸트 각도 설정 (예: 5.5°) |
| `GetTilt` | P→S | 현재 틸트 조회 |
| `GetTiltLimits` | P→S | 허용 범위 조회 (min/max) |
| `SetTiltLimits` | P→S | 허용 범위 설정 |
| `MoveToZeroPosition` | P→S | 0° 위치로 이동 |
| `GetMotorStatus` | P→S | 모터 상태 조회 |
| `GetAlarmStatus` | P→S | 알람 상태 조회 |

### 3.4 응답 데이터 예시

```
PrimaryCommand: SetTilt(seq=1, tilt=5.5)
   ↓
ALD Response: ACK(seq=1, status=OK, current_tilt=5.5)

[10초 후]
PrimaryCommand: GetTilt(seq=2)
   ↓
ALD Response: ACK(seq=2, current_tilt=5.5, motor_state=idle)
```

### 3.5 미팅 답변 키 포인트

- **포팅 대상 1순위**: 본 프로젝트(#155057)는 v2.0 → v3.0 포팅이라 RET 명령은 v2.0 그대로 유지
- **신규 변경**: v3.0 신기능(Multi-Primary)에서 RET subunit access right 추가
- **현장 실증**: RET는 모터 동작이 가시적이라 현장 시연 효과 큼

---

## 4. TMA — Tower Mounted Amplifier

### 4.1 개요

- **역할**: 타워 상단(안테나 근처)에 설치된 저잡음 증폭기(LNA) 제어·모니터링
- **목적**: RF 케이블의 신호 손실을 보상 → 수신 감도 향상
- **위치**: 안테나 직하, 피더 케이블 상단

### 4.2 동작 원리

```
   안테나
     │
     ▼
   ┌─────────────┐
   │    TMA      │  ← 저잡음 증폭기 (NF 0.5~1 dB)
   │  ┌───────┐  │
   │  │ LNA   │  │  ← 증폭 (+12~15 dB)
   │  └───┬───┘  │
   │      │      │
   │  [Bypass]   │  ← AISG로 ON/OFF 제어
   │      │      │
   └──────┼──────┘
          │
          ▼
       RF 피더
          │
          ▼
       기지국 BS
```

- 정상 동작: 안테나 ↓ → LNA 증폭 → BS
- Bypass 모드: 안테나 ↓ → 직통 → BS (LNA 우회)
- 고장·점검 시 bypass로 전환

### 4.3 주요 명령 (AISG-ST-TMA)

| 명령 | 방향 | 설명 |
|---|---|---|
| `GetGain` | P→S | 현재 이득 조회 (dB) |
| `SetGain` | P→S | 이득 설정 (가변 TMA의 경우) |
| `SetBypass` | P→S | Bypass ON/OFF |
| `GetBypassStatus` | P→S | Bypass 상태 조회 |
| `GetTemperature` | P→S | 내부 온도 조회 (°C) |
| `GetCurrent` | P→S | 소비 전류 조회 (mA) |
| `GetVSWR` | P→S | VSWR 조회 (피더 매칭 상태) |
| `GetAlarmStatus` | P→S | 알람 (과열/과전류/고장) |

### 4.4 응답 데이터 예시

```
PrimaryCommand: GetGain(seq=1)
   ↓
ALD Response: ACK(seq=1, gain=12.5_dB)

PrimaryCommand: GetTemperature(seq=2)
   ↓
ALD Response: ACK(seq=2, temp=42.3_C, warn=NO)

PrimaryCommand: SetBypass(seq=3, bypass=ON)
   ↓
ALD Response: ACK(seq=3, status=OK)
```

### 4.5 미팅 답변 키 포인트

- **모니터링 빈도**: 온도·전류·VSWR은 1~60초 주기 폴링 — 통신 부하 고려 필요
- **알람**: 임계값 초과 시 ALD가 Primary에게 즉시 알람 전송 (asynchronous notification)
- **포팅 영향**: TMA 명령 자체는 v2.0/v3.0 동일. Multi-Primary 시 모니터링 권한 분리

---

## 5. GLS — Geographic Location Sensor

### 5.1 개요

- **역할**: 안테나의 지리적 위치(GPS) + 방위각(azimuth) 측정
- **목적**: 사이트 설치 후 안테나가 의도한 위치·방향에 있는지 확인
- **센서**: GPS + 자기 컴퍼스(또는 IMU)

### 5.2 측정 항목

| 항목 | 단위 | 비고 |
|---|---|---|
| Latitude | 도(deg) | GPS |
| Longitude | 도(deg) | GPS |
| Altitude | m | GPS |
| Azimuth (방위각) | 도(deg, 0~360) | 자기 컴퍼스 또는 자이로 |
| Heading 정확도 | 도 | 측정 오차 |

### 5.3 주요 명령

| 명령 | 방향 | 설명 |
|---|---|---|
| `GetPosition` | P→S | 위도/경도/고도 조회 |
| `GetAzimuth` | P→S | 방위각 조회 |
| `GetPositionAccuracy` | P→S | GPS 정확도 (HDOP 등) |
| `Calibrate` | P→S | 컴퍼스 캘리브레이션 |

### 5.4 응답 데이터 예시

```
PrimaryCommand: GetPosition(seq=1)
   ↓
ALD Response: ACK(seq=1,
                  lat=37.2436_N,
                  lon=127.1126_E,
                  alt=85.3_m,
                  hdop=1.2)

PrimaryCommand: GetAzimuth(seq=2)
   ↓
ALD Response: ACK(seq=2, azimuth=142.5_deg, accuracy=±2.0_deg)
```

### 5.5 미팅 답변 키 포인트

- **활용**: Site Mapping (v3.0)에서 안테나 위치·방위와 RF 포트·RET 매핑 결합 → 자동화된 사이트 다이어그램
- **포팅 영향**: 명령 자체는 v2.0 호환. v3.0에서는 Site Mapping API에 통합

---

## 6. ASD — Alignment Sensor Device

### 6.1 개요

- **역할**: 안테나의 자세(tilt + roll + azimuth)를 정밀 측정
- **GLS와 차이**: GLS는 위치 위주, ASD는 **자세(orientation)** 정밀 측정
- **센서**: 3축 가속도계 + 3축 자이로 + 자기 컴퍼스 (9-DoF IMU)

### 6.2 측정 항목

| 항목 | 단위 | 설명 |
|---|---|---|
| Mechanical Tilt | 도 | 기계적 틸트 (수평 기준 안테나 기울기) |
| Roll | 도 | 안테나 좌우 기울기 |
| Azimuth | 도 | 방위각 |
| Accuracy | 도 | 각 축의 측정 오차 |

### 6.3 주요 명령 (AISG-ES-ASD)

| 명령 | 방향 | 설명 |
|---|---|---|
| `GetMechanicalTilt` | P→S | 기계적 틸트 조회 |
| `GetRoll` | P→S | Roll 조회 |
| `GetAzimuth` | P→S | 방위각 조회 |
| `GetAllAlignmentAngles` | P→S | 3축 한 번에 조회 |
| `CalibrateSensor` | P→S | 센서 캘리브레이션 |
| `GetCalibrationStatus` | P→S | 캘리브레이션 상태 |

### 6.4 응답 데이터 예시

```
PrimaryCommand: GetAllAlignmentAngles(seq=1)
   ↓
ALD Response: ACK(seq=1,
                  mech_tilt=4.2_deg,
                  roll=0.8_deg,
                  azimuth=142.5_deg,
                  accuracy_tilt=±0.5,
                  accuracy_roll=±0.5,
                  accuracy_az=±2.0)
```

### 6.5 미팅 답변 키 포인트

- **활용**: 풍하중·노후화로 안테나 기울기 변화 감지 → 자동 알람
- **RET와 구분**: RET는 **전기적 틸트(빔)** 조정, ASD는 **기계적 틸트(안테나 자체)** 측정
- **포팅 영향**: ASD는 Extension Standard (선택). 본 프로젝트 범위에 포함되는지 클라이언트 확인 필요

---

## 7. ALD 데이터 모델 (Subunit 구조)

### 7.1 ALD 정보 트리

```
ALD
├── DeviceInfo
│   ├── VendorName
│   ├── ModelNumber
│   ├── SerialNumber
│   ├── HwVersion
│   ├── SwVersion
│   └── AISGVersion  ← 2.0 or 3.0
│
├── Subunits[]
│   ├── Subunit#1 (Type=RET, ID=1)
│   │   ├── TiltRange: [-2, 12]
│   │   ├── CurrentTilt: 5.5
│   │   └── ...
│   ├── Subunit#2 (Type=TMA, ID=2)
│   │   ├── Gain: 12.5
│   │   ├── BypassStatus: OFF
│   │   └── ...
│   └── Subunit#3 (Type=GLS, ID=3)
│       └── ...
│
├── AccessRights[]    ← v3.0 신규
│   ├── Primary#1 → Subunit#1 (RW), Subunit#2 (R), Subunit#3 (R)
│   └── Primary#2 → Subunit#1 (R),  Subunit#2 (RW), Subunit#3 (R)
│
└── SiteMapping       ← v3.0 신규
    ├── RFPort#1 → Subunit#1 (RET)
    └── RFPort#2 → Subunit#2 (TMA)
```

### 7.2 펌웨어 구조 권장

```c
typedef struct {
    char vendor[16];
    char model[16];
    char serial[32];
    uint8_t hw_ver[4];
    uint8_t sw_ver[4];
    uint8_t aisg_ver;  // 2 or 3
} ALD_DeviceInfo;

typedef enum {
    SUBUNIT_RET = 0x01,
    SUBUNIT_TMA = 0x02,
    SUBUNIT_GLS = 0x03,
    SUBUNIT_ASD = 0x04,
} SubunitType;

typedef struct {
    SubunitType type;
    uint8_t id;
    void* type_specific_data;  // RET_Data / TMA_Data / ...
} Subunit;

typedef struct {
    ALD_DeviceInfo info;
    Subunit subunits[MAX_SUBUNITS];
    uint8_t subunit_count;
    AccessRight access_matrix[MAX_PRIMARIES][MAX_SUBUNITS];  // v3.0
    SiteMapping site_map;  // v3.0
} ALD;
```

---

## 8. 미팅에서 받을 수 있는 추가 질문

**Q: 본 프로젝트는 어떤 ALD 타입이 대상인가?**
> 클라이언트와 확인 필요. v2.0 소스가 RET 전용인지, 다중 Subunit 지원인지에 따라 작업 범위 변동. 미팅에서 명확화 후 견적 조정 가능.

**Q: RET는 모터 종류가 다양한데 어떻게 대응?**
> 모터 제어는 ALD 내부 HW 영역. AISG 펌웨어는 추상화된 명령(`SetTilt`, `GetTilt`)만 처리 → 모터 종류 무관하게 포팅 가능. 단, 모터 드라이버 레이어는 기존 v2.0 코드 재사용.

**Q: TMA의 VSWR 측정 정확도는?**
> ALD 내부 RF 검파 회로의 정확도. 펌웨어는 ADC 값 → dB 변환만 처리. 벤더 HW spec에 따라 ±0.5 ~ ±2 dB 일반적.

**Q: GLS·ASD까지 포팅 범위에 포함되나?**
> 본 프로젝트 spec(24M / 90일)이 RET+TMA만 다루는지 / 전체 ALD인지 미팅에서 확인 필요. 범위에 따라 일정·인력 조정.

**Q: 한 ALD에 RET + TMA + GLS가 모두 들어간 사례 본 적 있나?**
> 통합 ALD는 5G 시대 점차 증가 (active antenna에 RET + TMA + sensor 통합). Multi-Subunit ALD는 AISG v3.0의 Site Mapping 강점이 발휘되는 영역.

---

## 9. UTTEC의 ALD 펌웨어 구현 강점

| 영역 | 우리의 자산 |
|---|---|
| 모터 제어 | 컴프레서 밸브 컨트롤러 — PID + 스텝/DC 모터 제어 양산 (RET 모터 즉시 대응) |
| 센서 데이터 처리 | BLE Mesh 양산 — 다채널 센서·온도·전류 모니터링 |
| 데이터 모델 (Subunit) | EtherCAT MFC — 다채널·다 subunit 구조 양산 |
| Access Right (mutex) | FreeRTOS 양산 5종에서 검증된 mutex 패턴 |
| GPS 처리 | LoRa 모듈 양산 (위치 정보 처리 경험) |
| IMU (9-DoF) | (재학습 필요 — 시간 가산 시 명시) |
| 알람·임계값 | Solar Monitor REVITA — 임계값 기반 알람 즉시 송신 양산 |

---

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 참조 표준 | AISG-ST-RET / AISG-ST-TMA / AISG-ES-GLS / AISG-ES-ASD |
| 이전 자료 | `02_AISG_2.0_vs_3.0_심도비교.md` |
| 다음 단계 | 미팅 후 클라이언트 측 ALD 타입 범위 확정 → 펌웨어 모듈 설계 |
