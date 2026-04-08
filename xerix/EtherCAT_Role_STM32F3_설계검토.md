# EtherCAT Role 구분 및 STM32F3 기반 Xerix MFC Slave 설계 검토

> **프로젝트**: Xerix 반도체 공정용 유체/기체 MFC Controller (EtherCAT 적용)
> **MCU**: STM32F3 계열 (Cortex-M4F, 72MHz)
> **센서 방식**: 압력식(Pressure-based) + 코리올리식(Coriolis) 하이브리드
> **작성일**: 2026-04-08

---

## 1. EtherCAT 기본 네트워크 구조

EtherCAT은 **1개 Master + 다수 Slave** 의 단일 마스터 구조이다. 일반 이더넷과 달리 **"On-the-fly 처리"** 방식으로, 프레임이 슬레이브를 통과하면서 각 노드가 자기 데이터를 읽고 쓰기 때문에 1개 프레임으로 수백 개 노드를 μs 단위로 제어 가능하다.

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Master  │──►│ Slave 1 │──►│ Slave 2 │──►│ Slave N │──┐
│  (PC/   │   │ (MFC_A) │   │ (MFC_B) │   │ (MFC_C) │  │
│   PLC)  │◄──┴─────────┴───┴─────────┴───┴─────────┴──┘
└─────────┘              (Daisy-chain, 1 프레임 순환)
```

---

## 2. EtherCAT Master (마스터)

### 2.1 역할

| 기능 | 설명 |
|---|---|
| **네트워크 구성 관리** | 슬레이브 검색(Scan), 주소 할당, 상태 머신 제어 |
| **주기 통신** | 고정 주기(1ms, 500μs, 125μs 등)로 Process Data 교환 |
| **비주기 통신** | Mailbox (CoE, FoE, SoE 등) 파라미터 설정 |
| **DC(Distributed Clock) 동기화** | 모든 슬레이브 ns급 시간 동기 |
| **진단/복구** | 슬레이브 에러 감지, Working Counter 검증 |
| **ENI 파일 관리** | 네트워크 구성 정보(XML) 로드 |

### 2.2 대표 구현체

| 종류 | 예시 | 특징 |
|---|---|---|
| **PC 기반** | TwinCAT(Beckhoff), Acontis EC-Master | 고성능, RT OS 필요 |
| **PLC 기반** | Beckhoff CX, Omron NX, Keyence KV | 산업 표준 |
| **임베디드 Master** | Acontis on STM32MP1, SOEM on Linux | 저가, 임베디드 |
| **오픈소스** | **SOEM (Simple Open EtherCAT Master)**, IgH EtherLab | 무료, Linux/RTOS |

### 2.3 Xerix 제품에서의 위치

- **Xerix가 만드는 것은 Master가 아니다** → Fab 장비사(AMAT, TEL, Lam, Hynix 내부 장비 등)가 Master 역할
- Xerix 제품은 **Slave** 로 연결되어 Host Master의 명령을 수신

---

## 3. EtherCAT Slave (슬레이브) ← **Xerix 제품의 위치**

### 3.1 역할

| 기능 | 설명 |
|---|---|
| **Process Data 송수신** | Setpoint 수신, Flow/Pressure 피드백 송신 |
| **ESC 칩 운영** | EtherCAT Slave Controller 하드웨어 제어 |
| **상태 머신** | Init → PreOp → SafeOp → Op 전이 |
| **Mailbox 응답** | CoE(SDO) 파라미터 Read/Write 처리 |
| **DC 동기** | Master 시간에 local clock 동기, SYNC0/1 인터럽트 |
| **응용 제어** | 수신한 Setpoint로 PID 루프 구동, 밸브 제어 |

### 3.2 Slave 하드웨어 구성 요소

```
┌──────────────────────────────────────────────┐
│              EtherCAT Slave Node             │
│                                              │
│  ┌─────────┐   SPI/PDI   ┌────────────────┐  │
│  │  ESC    │◄──────────►│  Host MCU       │  │
│  │(LAN9252 │             │  (STM32F3)      │  │
│  │ ET1100  │             │                 │  │
│  │ AX58100)│             │  - PID 제어     │  │
│  └────┬────┘             │  - 센서 ADC     │  │
│       │                  │  - 밸브 DAC     │  │
│   MII/│RMII              │  - 진단         │  │
│       │                  └────────────────┘  │
│  ┌────┴────┐                                 │
│  │ PHY x2  │  IN/OUT 포트                    │
│  └─────────┘                                 │
└──────────────────────────────────────────────┘
```

### 3.3 Slave 구현 방식 3가지

| 방식 | ESC | Host MCU | 특징 | STM32F3 적합도 |
|---|---|---|---|---|
| **A. 전용 ESC + MCU** | **LAN9252** (Microchip) / **ET1100** (Beckhoff) / **AX58100** (ASIX) | STM32F3 | ESC는 하드웨어 칩, MCU는 SPI/PDI로 연결 | ★★★★★ **권장** |
| **B. MCU 내장 ESC** | STM32H723/H735 내장, NXP LPC, Infineon XMC | 자체 | ESC + MCU 일체형 | STM32F3에는 없음 |
| **C. FPGA 구현** | Altera/Xilinx + ET1810/ET1815 IP | 별도 | 완전 커스텀 | 과설계 |

**→ STM32F3 선택 시 반드시 방식 A: LAN9252 + STM32F3 (SPI 연결)**

---

## 4. Slave의 세부 역할 분류 (EtherCAT Sub-roles)

### 4.1 토폴로지 관점

| Role | 설명 |
|---|---|
| **First Slave** | Master 직후, 네트워크 시작점 |
| **Middle Slave** | IN/OUT 2포트 모두 사용, daisy-chain |
| **Last Slave** | OUT 미사용, 프레임 턴어라운드 지점 |
| **Junction Slave** | 3~4 포트, 분기(Star/Tree) 구성 |

**Xerix MFC는 보통 Middle Slave** (IN/OUT 2포트, daisy-chain) 로 여러 MFC를 직렬 연결한다.

### 4.2 통신 프로파일 관점

| Profile | 설명 | Xerix 적용 |
|---|---|---|
| **CoE (CANopen over EtherCAT)** | 가장 널리 사용, SDO/PDO, 객체 사전 | ★ **최적** |
| **SoE (Servo Drive Profile)** | 서보 드라이브 전용 (IEC 61800-7) | 모터 드라이브용 |
| **EoE (Ethernet over EtherCAT)** | 일반 이더넷 터널링 | 진단·웹 인터페이스 |
| **FoE (File over EtherCAT)** | 펌웨어 업데이트 | **OTA 용도로 필요** |

**Xerix MFC는 CoE + FoE 조합이 적절**:
- **CoE**: 실시간 Setpoint/Flow 데이터, 파라미터 설정
- **FoE**: 필드에서 펌웨어 업데이트

### 4.3 DC(Distributed Clock) 관점

| Role | 설명 |
|---|---|
| **Reference Clock Slave** | 네트워크 시간 기준 (보통 첫 번째 DC-capable slave) |
| **DC Synchronized Slave** | Reference에 동기, SYNC0/1 인터럽트로 PID 루프 트리거 |
| **DC Unsynchronized** | 시간 동기 없이 프리런 |

**→ Xerix MFC는 DC Synchronized Slave로 동작해야 한다** — 여러 MFC가 가스 혼합비를 정확히 맞추려면 μs 단위 동기 필수.

---

## 5. STM32F3 + LAN9252 조합 검토

### 5.1 권장 조합

```
┌─────────────────────────────────────────────────────┐
│  Xerix EtherCAT MFC Slave Node                      │
│                                                     │
│  [EtherCAT IN]──┐         ┌──[EtherCAT OUT]         │
│                 ▼         ▼                         │
│             ┌──────────────────┐                    │
│             │    LAN9252       │ ← ESC (Slave 칩)   │
│             │  (Microchip)     │                    │
│             └────────┬─────────┘                    │
│                      │ SPI (up to 30MHz)            │
│                      │ + IRQ (SYNC0/1, PDI_IRQ)     │
│                      ▼                              │
│             ┌──────────────────┐                    │
│             │  STM32F303xx     │ ← Host MCU         │
│             │  (Cortex-M4F     │                    │
│             │   72MHz, FPU)    │                    │
│             └───┬────┬─────┬───┘                    │
│                 │    │     │                        │
│               ADC  DAC   GPIO                       │
│                 │    │     │                        │
│       ┌─────────▼┐  ┌▼─────▼──────┐                 │
│       │ Pressure │  │ Piezo Valve │                 │
│       │ Sensor   │  │  Driver     │                 │
│       └──────────┘  └─────────────┘                 │
└─────────────────────────────────────────────────────┘
```

### 5.2 STM32F3 선택의 장단점

**장점**
- Cortex-M4F (FPU) → PID + Coriolis 센서 DSP 연산 적합
- 빠른 ADC (5 Msps, 12bit) → 압력 센서 고속 샘플링
- 저렴, 재고 안정적
- **CORDIC/FMAC 주변장치** (F3 고유) → 삼각함수·필터 하드웨어 가속 (Coriolis 위상차 계산에 유용)

**제약**
- **내장 ESC 없음** → LAN9252 등 외부 칩 필수
- 최대 72MHz → 복잡한 CoE 스택 + 고속 PID 동시 구동 시 여유 부족 가능
- SRAM 최대 80KB (F303VE 기준) → EtherCAT 스택 + Process Data 버퍼는 여유 있음

### 5.3 EtherCAT Slave 스택 옵션

| 스택 | 라이선스 | STM32F3 지원 |
|---|---|---|
| **SSC (Beckhoff Slave Stack Code)** | Beckhoff Vendor ID 필요 (무료 배포, 상업 제품 사용 시 VID 등록) | ★★★★★ 공식 지원 |
| **SOES (Simple Open EtherCAT Slave)** | GPL | ★★★★ 오픈소스 |
| **KPA Slave Stack** | 상용 | ★★★★★ |
| **EasyCAT (Bausano)** | LAN9252 모듈 + Arduino/STM32 라이브러리 | ★★★ 프로토타입용 |

---

## 6. 적용 대상 센서 (1순위 방향)

### 6.1 Pressure-based MFC (압력식)

- **원리**: 유입 압력 제어 + 음속 노즐(Critical Orifice) 기반 질량 유량 산출
- **특징**: 공급 압력 변동에 강함, 빠른 응답, 최신 반도체 Fab 트렌드
- **대표 경쟁사**: Horiba Z500, Fujikin FCS, MKS π-MFC
- **STM32F3 접점**:
  - 상류/하류 압력 센서 ADC 샘플링 (16bit, 1~10 kHz)
  - 음속 노즐 기반 유량 환산식 (FPU 활용)
  - Piezo Valve DAC 출력

### 6.2 Coriolis Mass Flow (코리올리식)

- **원리**: 진동관 코리올리 힘 → 질량유량 직접 측정
- **특징**: 최고 정밀도 (±0.1%), 유체 밀도 무관, 고가
- **STM32F3 접점**:
  - 진동관 구동 (정현파 출력, DAC or PWM)
  - 두 픽업 센서 위상차 계산 (→ 질량 유량)
  - **CORDIC 주변장치** 로 삼각함수·위상 연산 하드웨어 가속
  - **FMAC 주변장치** 로 디지털 필터(BPF, DC 제거) 가속

### 6.3 하이브리드 제안

| 모드 | 사용 센서 | 목적 |
|---|---|---|
| **Normal** | Pressure-based | 빠른 응답, 일반 공정 |
| **High Precision** | Coriolis | 초정밀 구간, 교정/검증 |
| **Cross-check** | 동시 사용 | 센서 퓨전, 진단/이상 감지 |

---

## 7. 다음 단계 제안

### 7.1 Xerix MFC Slave 상위 설계 질문

다음 사항을 확정해야 본격 설계 진행 가능:

1. **Vendor ID (VID)**: Xerix 자체 등록? 또는 ETG 멤버십?
2. **Process Data 주기**: 1ms / 500μs / 250μs 중 어느 레벨?
3. **채널 수**: 1 MFC = 1 Slave? 또는 Multi-MFC 단일 Slave?
4. **DC 사용**: Required? (가스 혼합비 동기 필요 여부)
5. **CoE Object Dictionary**: 표준 프로파일(DS408 유체제어) 준수 여부

### 7.2 개발 로드맵

```
Phase 0: 개발 환경
   - TwinCAT3 Master (개발·검증용)
   - STM32F303 Discovery + LAN9252 평가보드
   - SSC Tool 설치

Phase 1: ESC 통신 확립
   - STM32F3 ↔ LAN9252 SPI 통신 검증
   - EEPROM(SII) 초기화
   - Master에서 Slave 인식 확인

Phase 2: CoE 프로파일 구축
   - ESI 파일 작성 (XML)
   - Object Dictionary 정의 (Setpoint, Flow, Alarm 등)
   - SDO/PDO 매핑

Phase 3: 응용 통합
   - PID 루프 + 센서 ADC
   - Piezo Valve 제어
   - DC SYNC0 인터럽트 기반 제어 타이밍 고정

Phase 4: 고급 기능
   - FoE 기반 펌웨어 업데이트
   - EoE 기반 진단 웹
   - Pressure-based + Coriolis 센서 퓨전
```

---

## 8. 핵심 정리

- **Master** = Host 장비(PLC/PC) — **Xerix가 만들지 않음**
- **Slave** = Xerix MFC 제품 — **이쪽에 집중**
- **STM32F3** 선택 시 반드시 **LAN9252 외부 ESC** 와 조합 (F3에는 내장 ESC 없음)
- **DC Synchronized CoE Slave + FoE** 프로파일 조합 권장
- **CORDIC/FMAC** 주변장치가 Coriolis 센서 DSP 연산에 유리 → F3 선택의 숨은 강점
- 토폴로지상 **Middle Slave** (IN/OUT 2포트 daisy-chain) 이 표준

---

## 참고 자료

- ETG(EtherCAT Technology Group): https://www.ethercat.org
- Microchip LAN9252 Datasheet: 2/3 포트 EtherCAT Slave Controller
- Beckhoff SSC Tool (Slave Stack Code Generator)
- STM32F303 Reference Manual (RM0316) — CORDIC, FMAC 주변장치
- IEC 61158 (EtherCAT Protocol Specification)
