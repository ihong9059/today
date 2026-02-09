# EtherCAT 기반 통신 컨버터 및 DIO/DAQ 보드 개발
## 구현 계획서

**프로젝트 ID**: 152447
**작성일**: 2026-02-09
**문서 버전**: 1.0

---

## 1. 프로젝트 일정 개요

### 1.1 전체 일정 (180일)

```
Phase 1: 사전 준비 및 설계 (Day 1-45)
├── ETG 회원 가입 및 SSC 확보
├── 하드웨어 설계 (회로도)
└── 소프트웨어 아키텍처 설계

Phase 2: 하드웨어 개발 (Day 46-90)
├── PCB 설계 및 제작
├── 시제품 조립
└── 하드웨어 테스트

Phase 3: 펌웨어 개발 (Day 61-135)
├── EtherCAT Slave Stack 포팅
├── 애플리케이션 개발
└── 통합 테스트

Phase 4: 검증 및 문서화 (Day 136-180)
├── CTT 인증 테스트
├── ESI 파일 작성
└── 기술 문서 및 이전 교육
```

### 1.2 보드별 개발 순서

| 순서 | 보드 | 이유 |
|------|------|------|
| 1 | DIO 보드 | 가장 단순, EtherCAT 학습용 |
| 2 | DAQ 보드 | DIO 기반 확장, 아날로그 추가 |
| 3 | CAN FD 컨버터 | 가장 복잡, 경험 축적 후 진행 |

---

## 2. Phase 1: 사전 준비 및 설계 (45일)

### 2.1 ETG 회원 가입 및 자료 확보 (Day 1-7)

**작업 항목**:
1. EtherCAT Technology Group (ETG) 회원 가입
   - URL: https://www.ethercat.org
   - 회원 유형: Implementer (구현자)
   - 비용: 연간 회비 발생

2. Beckhoff SSC (Slave Stack Code) 다운로드
   - ETG 회원 전용 다운로드
   - 버전: 최신 안정 버전

3. 개발 도구 확보
   - SSC Tool (ESI 생성용)
   - TwinCAT 3 (EtherCAT 마스터, 테스트용)
   - CTT (Conformance Test Tool)

**산출물**:
- [ ] ETG 회원 가입 완료
- [ ] SSC 소스 코드 확보
- [ ] 개발 도구 설치 완료

### 2.2 개발 환경 구축 (Day 8-14)

**하드웨어 개발 환경**:

| 도구 | 용도 | 버전/사양 |
|------|------|----------|
| Altium Designer | PCB 설계 | 최신 버전 |
| OrCAD | 회로도 (대안) | 17.4+ |
| 오실로스코프 | 신호 분석 | 200MHz 4ch |
| 로직 분석기 | 디지털 신호 | 16ch 100MHz |
| EtherCAT 마스터 | 테스트용 | TwinCAT 3 |

**소프트웨어 개발 환경**:

| 도구 | 용도 | 버전 |
|------|------|------|
| STM32CubeIDE | MCU 개발 | 최신 |
| Keil MDK | 대안 IDE | 5.x |
| Git | 버전 관리 | 2.x |
| VS Code | 코드 편집 | 최신 |

**평가 보드 확보**:

| 보드 | 용도 | 수량 |
|------|------|------|
| EVB-LAN9252 | EtherCAT 평가 | 2개 |
| NUCLEO-H743ZI | STM32H7 평가 | 2개 |
| NUCLEO-G474RE | STM32G4 평가 | 2개 |

### 2.3 하드웨어 설계 - 회로도 (Day 15-35)

#### 2.3.1 Board 1: CAN FD 컨버터 회로 설계

**블록 다이어그램**:

```
┌────────────────────────────────────────────────────────────────────┐
│                     CAN FD Converter Board                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────┐   ┌─────────┐   ┌─────────────┐   ┌─────────────────┐│
│  │ RJ45 x2 │──▶│LAN9252  │──▶│  STM32H743  │──▶│ CAN Transceiver ││
│  │(EtherCAT)│  │  ESC    │   │   MCU       │   │ TJA1463 x4      ││
│  └─────────┘   └─────────┘   └─────────────┘   └─────────────────┘│
│       │             │              │                    │         │
│       │        ┌────┴────┐    ┌────┴────┐         ┌────┴────┐    │
│       │        │  QSPI   │    │  FDCAN  │         │ CAN FD  │    │
│       │        │Interface│    │  x2     │         │ Port x4 │    │
│       │        └─────────┘    └─────────┘         └─────────┘    │
│       │                                                           │
│  ┌────┴────────────────────────────────────────────────────────┐ │
│  │                    Power Supply                              │ │
│  │  24V DC ──▶ DC-DC ──▶ 5V ──▶ LDO ──▶ 3.3V                   │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**주요 부품 선정**:

| 부품 | 선정 | 사양 |
|------|------|------|
| ESC | LAN9252 | 2-port, QFN-64 |
| MCU | STM32H743VIT6 | 480MHz, LQFP-100 |
| CAN Transceiver | TJA1463 | CAN FD 8Mbps, 4개 |
| DC-DC | TPS54331 | 24V→5V, 3A |
| LDO | AMS1117-3.3 | 5V→3.3V, 1A |
| 크리스탈 | 25MHz | LAN9252용 |
| 크리스탈 | 8MHz | STM32용 (PLL) |

**회로도 작성 순서**:
1. 전원부 설계 (24V→5V→3.3V)
2. LAN9252 + PHY 회로
3. STM32H743 최소 회로
4. QSPI 인터페이스 (LAN9252 ↔ MCU)
5. CAN FD 트랜시버 4채널
6. RJ45 커넥터 (EtherCAT)
7. CAN FD 커넥터 (D-SUB 9pin x4)
8. 상태 LED, 디버그 포트

#### 2.3.2 Board 2: DIO 보드 회로 설계

**블록 다이어그램**:

```
┌────────────────────────────────────────────────────────────────────┐
│                         DIO Board                                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────┐   ┌─────────┐   ┌─────────────┐   ┌─────────────────┐│
│  │ RJ45 x2 │──▶│LAN9252  │──▶│  STM32G474  │──▶│ DO Driver x16   ││
│  │(EtherCAT)│  │  ESC    │   │   MCU       │◀──│ DI Isolator x16 ││
│  └─────────┘   └─────────┘   └─────────────┘   └─────────────────┘│
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Digital Output (DO) x16                                       │ │
│  │ - Driver: ULN2803A (Darlington Array)                        │ │
│  │ - Protection: TVS, Freewheel Diode                           │ │
│  │ - Output: 24V DC, 500mA/ch                                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Digital Input (DI) x16                                        │ │
│  │ - Isolator: TLP291-4 (Photo Coupler)                         │ │
│  │ - Filter: RC Low-pass (Debounce)                             │ │
│  │ - Input: 24V DC (Sink/Source)                                 │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

#### 2.3.3 Board 3: DAQ 보드 회로 설계

**블록 다이어그램**:

```
┌────────────────────────────────────────────────────────────────────┐
│                         DAQ Board                                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────┐   ┌─────────┐   ┌─────────────┐                      │
│  │ RJ45 x2 │──▶│LAN9252  │──▶│  STM32G474  │                      │
│  │(EtherCAT)│  │  ESC    │   │   MCU       │                      │
│  └─────────┘   └─────────┘   └─────────────┘                      │
│                                    │                               │
│            ┌───────────────────────┼───────────────────────┐       │
│            │                       │                       │       │
│       ┌────┴────┐            ┌────┴────┐            ┌────┴────┐  │
│       │  ADC    │            │  DAC    │            │ Analog  │  │
│       │ADS8688  │            │DAC8564  │            │ Power   │  │
│       │ 8ch     │            │ 4ch     │            │ ±15V    │  │
│       │ 16-bit  │            │ 16-bit  │            └─────────┘  │
│       └─────────┘            └─────────┘                          │
│            │                       │                               │
│       ┌────┴────┐            ┌────┴────┐                          │
│       │  Input  │            │ Output  │                          │
│       │ ±10V x8 │            │ ±10V x4 │                          │
│       └─────────┘            └─────────┘                          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 2.4 소프트웨어 아키텍처 설계 (Day 36-45)

**소프트웨어 레이어 구조**:

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 4: Application                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │ CAN FD GW   │ │  DIO App    │ │  DAQ App    │                 │
│ │ - Routing   │ │ - DO Ctrl   │ │ - ADC Read  │                 │
│ │ - Buffering │ │ - DI Read   │ │ - DAC Write │                 │
│ │ - Protocol  │ │ - Diag      │ │ - Scaling   │                 │
│ └─────────────┘ └─────────────┘ └─────────────┘                 │
├─────────────────────────────────────────────────────────────────┤
│ Layer 3: EtherCAT Slave Stack (Beckhoff SSC)                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │    CoE      │ │    FoE      │ │    EoE      │                 │
│ │ (CANopen    │ │ (File over  │ │ (Ethernet   │                 │
│ │  over EC)   │ │  EtherCAT)  │ │  over EC)   │                 │
│ └─────────────┘ └─────────────┘ └─────────────┘                 │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │              EtherCAT State Machine                        │   │
│ │  INIT ──▶ PRE-OP ──▶ SAFE-OP ──▶ OP                       │   │
│ └───────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2: Hardware Abstraction Layer (HAL)                        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │ LAN9252     │ │   Timer     │ │   GPIO      │                 │
│ │ Driver      │ │  (DC Sync)  │ │  (Sync0)    │                 │
│ └─────────────┘ └─────────────┘ └─────────────┘                 │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1: MCU HAL (STM32 HAL/LL)                                  │
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│ │ QSPI  │ │  SPI  │ │ FDCAN │ │  ADC  │ │  DAC  │ │ GPIO  │    │
│ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘    │
└─────────────────────────────────────────────────────────────────┘
```

**디렉토리 구조**:

```
project/
├── Board1_CAN_FD_Converter/
│   ├── Hardware/
│   │   ├── Schematic/
│   │   ├── PCB/
│   │   └── BOM/
│   ├── Firmware/
│   │   ├── Core/
│   │   ├── Drivers/
│   │   ├── EtherCAT/
│   │   │   ├── SSC/
│   │   │   └── HAL/
│   │   └── Application/
│   └── ESI/
│       └── UTTEC_CAN_FD_GW.xml
│
├── Board2_DIO/
│   ├── Hardware/
│   ├── Firmware/
│   └── ESI/
│
├── Board3_DAQ/
│   ├── Hardware/
│   ├── Firmware/
│   └── ESI/
│
├── Documents/
│   ├── Design_Spec/
│   ├── Test_Report/
│   └── User_Manual/
│
└── Tools/
    ├── SSC_Tool/
    └── CTT/
```

---

## 3. Phase 2: 하드웨어 개발 (45일)

### 3.1 PCB 설계 (Day 46-65)

**PCB 설계 규칙**:

| 항목 | 규격 |
|------|------|
| 레이어 | 4층 (Signal-GND-Power-Signal) |
| 최소 선폭 | 6mil (0.15mm) |
| 최소 간격 | 6mil (0.15mm) |
| 비아 | 0.3mm drill, 0.6mm pad |
| 임피던스 | 100Ω differential (EtherCAT) |

**EMC 고려사항**:
- EtherCAT 신호 임피던스 매칭
- CAN FD 고속 신호 GND 리턴 경로
- 전원 디커플링 커패시터 배치
- 아날로그/디지털 영역 분리 (DAQ)

### 3.2 PCB 제작 및 조립 (Day 66-80)

**제작 일정**:

| 작업 | 기간 | 비고 |
|------|------|------|
| Gerber 출력 | 1일 | DRC 완료 후 |
| PCB 제작 | 7일 | 4층, 급행 |
| 부품 수급 | 병행 | DigiKey/Mouser |
| SMT 실장 | 5일 | 외주 또는 자체 |
| 수작업 실장 | 2일 | 커넥터 등 |

### 3.3 하드웨어 테스트 (Day 81-90)

**테스트 항목**:

| 순서 | 테스트 | 판정 기준 |
|------|--------|----------|
| 1 | 전원 전압 | 3.3V±5%, 5V±5% |
| 2 | 전류 소모 | 설계값 이내 |
| 3 | LAN9252 부팅 | LED 점등 |
| 4 | MCU 부팅 | UART 출력 |
| 5 | SPI/QSPI 통신 | 레지스터 R/W |
| 6 | EtherCAT Link | TwinCAT 인식 |

---

## 4. Phase 3: 펌웨어 개발 (75일)

### 4.1 EtherCAT Slave Stack 포팅 (Day 61-90)

**작업 순서**:

1. **SSC 기본 구조 이해** (5일)
   - 소스 코드 분석
   - 문서 학습

2. **HAL 구현** (10일)
   ```c
   // LAN9252 HAL 함수 예시
   void HW_Init(void);
   uint16_t HW_GetALEventRegister(void);
   void HW_EscRead(uint8_t *pData, uint16_t Address, uint16_t Len);
   void HW_EscWrite(uint8_t *pData, uint16_t Address, uint16_t Len);
   ```

3. **타이머/인터럽트 설정** (5일)
   - PDI 인터럽트 (LAN9252 → MCU)
   - Sync0 인터럽트 (DC 동기화)
   - 사이클 타이머

4. **기본 동작 확인** (10일)
   - State Machine (INIT → PRE-OP → SAFE-OP → OP)
   - PDO 통신 확인

### 4.2 애플리케이션 개발 (Day 91-120)

#### 4.2.1 Board 1: CAN FD Gateway 애플리케이션

```c
// CAN FD Gateway 주요 함수
void CANFD_Gateway_Init(void);
void CANFD_ProcessRxPDO(uint8_t *pData);  // EtherCAT → CAN FD
void CANFD_ProcessTxPDO(uint8_t *pData);  // CAN FD → EtherCAT
void CANFD_SyncHandler(void);              // DC Sync0 핸들러

// 메시지 라우팅 테이블
typedef struct {
    uint32_t ecat_offset;    // PDO 내 오프셋
    uint8_t  can_port;       // CAN 포트 (1-4)
    uint32_t can_id;         // CAN ID
    uint8_t  data_len;       // 데이터 길이
} CANFD_Route_t;
```

#### 4.2.2 Board 2: DIO 애플리케이션

```c
// DIO 주요 함수
void DIO_Init(void);
void DIO_SetOutputs(uint16_t outputs);     // DO 제어
uint16_t DIO_GetInputs(void);              // DI 읽기
void DIO_ProcessPDO(void);                 // PDO 처리

// 진단 기능
uint16_t DIO_GetDiagnostics(void);         // 과전류, 단선 검출
```

#### 4.2.3 Board 3: DAQ 애플리케이션

```c
// DAQ 주요 함수
void DAQ_Init(void);
void DAQ_ReadAnalogInputs(int16_t *pData); // AI 읽기 (8ch)
void DAQ_WriteAnalogOutputs(int16_t *pData); // AO 쓰기 (4ch)
void DAQ_ProcessPDO(void);                 // PDO 처리

// 스케일링
float DAQ_ConvertToVoltage(int16_t raw, uint8_t range);
int16_t DAQ_ConvertFromVoltage(float voltage, uint8_t range);
```

### 4.3 DC 동기화 구현 (Day 121-135)

**Sync0 인터럽트 핸들러**:

```c
void Sync0_IRQHandler(void)
{
    // 1. 타임스탬프 기록
    uint32_t timestamp = TIM_GetCounter();

    // 2. 입력 샘플링 (래치)
    if (board_type == BOARD_DIO) {
        DI_Latch();
    } else if (board_type == BOARD_DAQ) {
        ADC_StartConversion();
    }

    // 3. 출력 적용
    if (board_type == BOARD_DIO) {
        DO_Apply();
    } else if (board_type == BOARD_DAQ) {
        DAC_Update();
    } else if (board_type == BOARD_CANFD) {
        CANFD_TransmitQueued();
    }

    // 4. 지터 모니터링
    DC_UpdateJitterStats(timestamp);
}
```

**DC 동기화 설정**:

```c
void DC_Configure(uint32_t cycleTime_ns, uint32_t sync0Shift_ns)
{
    // 1. Sync0 사이클 타임 설정 (1ms = 1,000,000ns)
    EC_WRITE_DWORD(ESC_DC_SYNC0_CYCLE, cycleTime_ns);

    // 2. Sync0 시프트 타임 설정
    EC_WRITE_DWORD(ESC_DC_SYNC0_SHIFT, sync0Shift_ns);

    // 3. Sync0 활성화
    EC_WRITE_BYTE(ESC_DC_SYNC_ACT, 0x03);

    // 4. MCU 타이머와 동기화
    Timer_SyncToDC();
}
```

---

## 5. Phase 4: 검증 및 문서화 (45일)

### 5.1 통합 테스트 (Day 136-150)

**테스트 환경**:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  TwinCAT 3  │────▶│  Board 1    │────▶│  CAN FD     │
│  EtherCAT   │     │ (Converter) │     │  Analyzer   │
│  Master     │     └─────────────┘     └─────────────┘
│             │
│             │────▶┌─────────────┐     ┌─────────────┐
│             │     │  Board 2    │────▶│  24V I/O    │
│             │     │   (DIO)     │     │  Simulator  │
│             │     └─────────────┘     └─────────────┘
│             │
│             │────▶┌─────────────┐     ┌─────────────┐
│             │     │  Board 3    │────▶│  Signal     │
│             │     │   (DAQ)     │     │  Generator  │
└─────────────┘     └─────────────┘     └─────────────┘
```

**테스트 항목**:

| 카테고리 | 테스트 항목 | 합격 기준 |
|----------|------------|----------|
| 기본 동작 | State Machine | 모든 상태 전이 정상 |
| PDO | 입출력 데이터 전송 | 데이터 일치 |
| DC 동기화 | Sync0 지터 | < 1μs |
| 사이클 타임 | 1ms / 500μs | ±10% 이내 |
| CAN FD | 4포트 동시 통신 | 데이터 무결성 |
| DIO | 16ch 동시 동작 | 응답 시간 < 1ms |
| DAQ | 8ch AI 샘플링 | 정확도 0.1% |

### 5.2 CTT 인증 테스트 (Day 151-165)

**CTT 테스트 항목**:

1. **Physical Layer**
   - 케이블 연결/분리 테스트
   - Link 복구 시간

2. **Data Link Layer**
   - 프레임 수신/송신
   - CRC 검증

3. **Application Layer**
   - State Machine
   - PDO 매핑
   - SDO 통신 (CoE)

4. **Distributed Clocks**
   - DC 지원 여부
   - Sync0/Sync1 동작
   - 지터 측정

### 5.3 ESI 파일 작성 (Day 151-160)

**SSC Tool 사용**:

1. SSC Tool 실행
2. 디바이스 정보 입력
3. PDO 매핑 설정
4. DC 설정
5. XML 생성 및 검증

**ESI 파일 주요 섹션**:

```xml
<Device>
  <!-- 디바이스 식별 -->
  <Type ProductCode="0x0001" RevisionNo="0x0001">
    UTTEC CAN FD Converter
  </Type>

  <!-- Sync Manager 설정 -->
  <Sm MinSize="128" MaxSize="128" DefaultSize="128"
      StartAddress="0x1000" ControlByte="0x26" Enable="1">
    MBoxOut
  </Sm>

  <!-- RxPDO 정의 -->
  <RxPdo Sm="2" Fixed="1" Mandatory="1">
    <Index>#x1600</Index>
    <Name>CAN FD Output</Name>
    <Entry>
      <Index>#x7000</Index>
      <SubIndex>1</SubIndex>
      <BitLen>8</BitLen>
      <Name>CAN Port</Name>
      <DataType>USINT</DataType>
    </Entry>
    <!-- ... -->
  </RxPdo>

  <!-- DC 설정 -->
  <Dc>
    <OpMode>
      <Name>DC Sync0</Name>
      <Desc>Synchronous with Sync0</Desc>
      <AssignActivate>#x300</AssignActivate>
      <CycleTimeSync0>1000000</CycleTimeSync0>
    </OpMode>
  </Dc>
</Device>
```

### 5.4 기술 문서 작성 (Day 166-175)

**작성 문서 목록**:

| 문서 | 내용 | 페이지 |
|------|------|--------|
| 하드웨어 설계서 | 회로 설명, 부품 선정 이유 | 30p |
| 펌웨어 설계서 | SW 구조, API 설명 | 50p |
| 사용자 매뉴얼 | 설치, 설정, 사용법 | 30p |
| 프로토콜 정의서 | PDO/SDO 매핑, 오브젝트 사전 | 20p |
| 테스트 리포트 | CTT 결과, 성능 측정 | 20p |

### 5.5 기술 이전 교육 (Day 176-180)

**교육 내용**:

| 일차 | 내용 | 시간 |
|------|------|------|
| 1일 | EtherCAT 기초, 프로젝트 개요 | 4h |
| 2일 | 하드웨어 설계 리뷰 | 4h |
| 3일 | 펌웨어 구조 및 소스 설명 | 4h |
| 4일 | 빌드, 디버깅, 수정 방법 | 4h |
| 5일 | Q&A, 실습 | 4h |

---

## 6. 리스크 관리

### 6.1 기술적 리스크

| 리스크 | 영향 | 대응 방안 |
|--------|------|----------|
| EtherCAT 학습 곡선 | 일정 지연 | 평가 보드로 사전 학습 |
| LAN9252 SPI 통신 이슈 | 개발 지연 | Microchip 기술 지원 활용 |
| DC 동기화 지터 | 성능 미달 | 하드웨어 최적화, 인터럽트 우선순위 조정 |
| CTT 인증 실패 | 재작업 | 사전 테스트, ETG 기술 지원 |

### 6.2 일정 리스크

| 리스크 | 영향 | 대응 방안 |
|--------|------|----------|
| PCB 제작 지연 | 전체 지연 | 급행 옵션, 대체 업체 확보 |
| 부품 수급 지연 | 조립 지연 | 사전 발주, 대체 부품 선정 |
| 인력 부족 | 개발 지연 | 우선순위 조정, 외주 검토 |

---

## 7. 필요 자원

### 7.1 개발 장비

| 장비 | 용도 | 수량 | 예상 비용 |
|------|------|------|----------|
| 오실로스코프 | 신호 분석 | 1 | 보유 |
| 로직 분석기 | 디지털 분석 | 1 | 보유 |
| EtherCAT 마스터 | 테스트 | 1 | TwinCAT (무료) |
| CAN FD 분석기 | CAN 테스트 | 1 | 대여/구매 |
| 전원 공급기 | 테스트 | 2 | 보유 |

### 7.2 소프트웨어/라이선스

| 소프트웨어 | 용도 | 비용 |
|------------|------|------|
| ETG 회원 | SSC 접근 | 연회비 |
| Altium Designer | PCB 설계 | 라이선스 |
| STM32CubeIDE | MCU 개발 | 무료 |
| TwinCAT 3 | 테스트 | 무료 |

### 7.3 부품 비용 (예상)

| 보드 | 부품 비용 | 수량 | 합계 |
|------|----------|------|------|
| CAN FD Converter | 15만원 | 5 | 75만원 |
| DIO Board | 8만원 | 5 | 40만원 |
| DAQ Board | 12만원 | 5 | 60만원 |
| PCB 제작 | - | - | 50만원 |
| **합계** | | | **225만원** |

---

## 8. 결론

본 구현 계획서는 EtherCAT 기반 3종 보드 개발을 위한 상세 로드맵을 제시합니다.

**핵심 성공 요인**:
1. ETG 회원 가입 및 SSC 확보 (필수)
2. 평가 보드를 통한 사전 학습
3. 단순한 DIO 보드부터 시작하여 경험 축적
4. 철저한 테스트 및 CTT 인증 준비

**예상 결과물**:
- EtherCAT to CAN FD 컨버터 (4포트)
- EtherCAT DIO 보드 (16DI/16DO)
- EtherCAT DAQ 보드 (8AI/4AO)
- 완전한 기술 문서 및 ESI 파일

---

*문서 끝*
