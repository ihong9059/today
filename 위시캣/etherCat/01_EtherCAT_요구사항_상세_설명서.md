# EtherCAT 기반 통신 컨버터 및 DIO/DAQ 보드 개발
## 요구사항 상세 설명서

**프로젝트 ID**: 152447
**작성일**: 2026-02-09
**문서 버전**: 1.0

---

## 1. 프로젝트 개요

### 1.1 목적
EtherCAT 산업용 통신 프로토콜 기반의 3종 보드 개발:
1. EtherCAT to CAN FD 통신 컨버터 (신규 개발)
2. DIO 보드 (기존 통신부 EtherCAT 전환)
3. DAQ 보드 (기존 통신부 EtherCAT 전환)

### 1.2 예산 및 기간
- 예산: 2억원
- 기간: 180일 (약 6개월)
- 산출물: 회로도, PCB Gerber, BOM, 펌웨어, ESI(XML), 테스트 리포트

---

## 2. EtherCAT 기술 개요

### 2.1 EtherCAT이란?
EtherCAT (Ethernet for Control Automation Technology)은 Beckhoff Automation에서 개발한 실시간 산업용 이더넷 프로토콜입니다.

**핵심 특징**:
- 표준 이더넷 프레임 사용
- "Processing on the Fly" 방식 (데이터가 슬레이브를 통과하면서 처리)
- 마이크로초(μs) 단위 사이클 타임
- 최대 65,535개 노드 지원
- 분산 클럭(DC) 동기화로 나노초 단위 정밀도

### 2.2 EtherCAT 네트워크 구조

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  EtherCAT   │────▶│   Slave 1   │────▶│   Slave 2   │────▶│   Slave 3   │
│   Master    │◀────│   (ESC)     │◀────│   (ESC)     │◀────│   (ESC)     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                          │                   │                   │
                          ▼                   ▼                   ▼
                    ┌─────────┐         ┌─────────┐         ┌─────────┐
                    │  Local  │         │  Local  │         │  Local  │
                    │   App   │         │   App   │         │   App   │
                    └─────────┘         └─────────┘         └─────────┘
```

### 2.3 EtherCAT Slave Controller (ESC)

ESC는 EtherCAT 슬레이브의 핵심 칩으로, 이더넷 프레임 처리 및 프로세스 데이터 교환을 담당합니다.

**주요 ESC 칩셋**:

| 칩셋 | 제조사 | 특징 |
|------|--------|------|
| ET1100 | Beckhoff | 원조 ESC, 외부 PHY 필요 |
| LAN9252 | Microchip | 내장 PHY 2개, QFN 패키지, 저비용 |
| XMC4300 | Infineon | Cortex-M4 내장, 외부 MCU 불필요 |
| AX58100 | ASIX | 저비용 솔루션 |

---

## 3. 프로젝트 요구사항 상세

### 3.1 Board 1: EtherCAT to CAN FD 통신 컨버터

#### 3.1.1 기능 요구사항

```
┌─────────────────────────────────────────────────────────────────┐
│                    EtherCAT to CAN FD 컨버터                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EtherCAT     ┌──────────────┐      ┌──────────────┐   CAN FD   │
│  Network  ───▶│     ESC      │─────▶│     MCU      │───▶ Port 1 │
│           ◀───│  (LAN9252)   │◀─────│  (STM32H7)   │───▶ Port 2 │
│               └──────────────┘      └──────────────┘───▶ Port 3 │
│                                                     ───▶ Port 4 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**핵심 기능**:
1. **4포트 CAN FD 변환**: EtherCAT PDO 데이터를 4개의 CAN FD 포트로 분배
2. **양방향 중계**: PDO ↔ CAN FD 프레임 상호 변환
3. **DC 동기화**: Sync0 신호 기반 1ms/500μs 사이클 동기화

#### 3.1.2 DC 동기화 (Distributed Clocks) 상세

**Sync0/Sync1 신호**:
- Sync0: 주기적 동기화 신호 (사이클 트리거)
- Sync1: 출력 유효/입력 래치 타이밍 제어

```
     ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
Sync0│   │   │   │   │   │   │   │   │   │
─────┘   └───┘   └───┘   └───┘   └───┘   └────
     |<---->|
      1ms or 500μs Cycle Time

     ┌─┐     ┌─┐     ┌─┐     ┌─┐     ┌─┐
Sync1│ │     │ │     │ │     │ │     │ │
─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └──────
      |<->|
      Output Shift Time
```

**DC 동기화 구현 요소**:
- 사이클 타임: 1ms (1000μs) 또는 500μs
- Sync0 지터: < 1μs (목표)
- 모든 슬레이브 동일 시간 베이스 동기화
- PDO 데이터 전송 타이밍 최적화

#### 3.1.3 PDO (Process Data Object) 매핑

**RxPDO (Master → Slave)**: EtherCAT에서 받은 데이터를 CAN FD로 전송

| Byte Offset | Size | Description |
|-------------|------|-------------|
| 0x00 | 1 | CAN Port Select (1-4) |
| 0x01 | 4 | CAN ID (29-bit extended) |
| 0x05 | 1 | Data Length (0-64) |
| 0x06 | 64 | CAN FD Payload |

**TxPDO (Slave → Master)**: CAN FD에서 받은 데이터를 EtherCAT으로 전송

| Byte Offset | Size | Description |
|-------------|------|-------------|
| 0x00 | 1 | Source CAN Port (1-4) |
| 0x01 | 4 | CAN ID |
| 0x05 | 1 | Data Length |
| 0x06 | 64 | CAN FD Payload |
| 0x46 | 1 | Status Flags |

#### 3.1.4 CAN FD 사양

| 항목 | 사양 |
|------|------|
| 포트 수 | 4개 |
| 전송 속도 | 최대 8 Mbps (Data Phase) |
| ID 형식 | 11-bit Standard / 29-bit Extended |
| 페이로드 | 최대 64 bytes |
| 프로토콜 | ISO 11898-1:2015 (CAN FD) |

---

### 3.2 Board 2: DIO 보드 (EtherCAT 전환)

#### 3.2.1 기능 요구사항

```
┌─────────────────────────────────────────────────────────────────┐
│                      EtherCAT DIO 보드                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EtherCAT     ┌──────────────┐      ┌──────────────┐            │
│  Network  ───▶│     ESC      │─────▶│     MCU      │───▶ DO x16 │
│           ◀───│  (LAN9252)   │◀─────│              │◀─── DI x16 │
│               └──────────────┘      └──────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Digital Output (DO)**:
- 채널 수: 16ch
- 출력 타입: 24V DC, 최대 500mA/ch
- 보호: 과전류, 단락 보호

**Digital Input (DI)**:
- 채널 수: 16ch
- 입력 타입: 24V DC (Sink/Source 선택)
- 필터: 디바운스 필터 (설정 가능)

#### 3.2.2 PDO 매핑

**RxPDO (출력 제어)**:
| Byte | Description |
|------|-------------|
| 0-1 | DO Status (16-bit, each bit = 1 channel) |

**TxPDO (입력 상태)**:
| Byte | Description |
|------|-------------|
| 0-1 | DI Status (16-bit) |
| 2-3 | DO Feedback (16-bit) |
| 4 | Diagnostics |

---

### 3.3 Board 3: DAQ 보드 (EtherCAT 전환)

#### 3.3.1 기능 요구사항

```
┌─────────────────────────────────────────────────────────────────┐
│                      EtherCAT DAQ 보드                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EtherCAT     ┌──────────────┐      ┌──────────────┐            │
│  Network  ───▶│     ESC      │─────▶│     MCU      │◀─── AI x8  │
│           ◀───│  (LAN9252)   │◀─────│              │───▶ AO x4  │
│               └──────────────┘      └──────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Analog Input (AI)**:
- 채널 수: 8ch (Differential 또는 Single-ended)
- 분해능: 16-bit
- 샘플링: 100kSPS (합산)
- 입력 범위: ±10V, ±5V, 0-10V, 0-5V (선택)

**Analog Output (AO)**:
- 채널 수: 4ch
- 분해능: 16-bit
- 출력 범위: ±10V, 0-10V
- Settling Time: < 10μs

#### 3.3.2 PDO 매핑

**RxPDO (AO 제어)**:
| Byte | Description |
|------|-------------|
| 0-1 | AO Channel 1 (16-bit) |
| 2-3 | AO Channel 2 (16-bit) |
| 4-5 | AO Channel 3 (16-bit) |
| 6-7 | AO Channel 4 (16-bit) |

**TxPDO (AI 데이터)**:
| Byte | Description |
|------|-------------|
| 0-15 | AI Channel 1-8 (16-bit x 8) |
| 16 | Status/Diagnostics |

---

## 4. 하드웨어 요구사항

### 4.1 ESC 칩셋 선정

**LAN9252 선정 이유**:

| 항목 | LAN9252 | ET1100 |
|------|---------|--------|
| 내장 PHY | 2개 (100BASE-TX) | 없음 (외부 필요) |
| 패키지 | 64-pin QFN (9x9mm) | 144-pin TQFP |
| 외부 부품 | 적음 | 많음 |
| 비용 | 저렴 | 고가 |
| 호스트 인터페이스 | SPI/QSPI/GPIO | 병렬/SPI |

**LAN9252 블록도**:

```
                    ┌─────────────────────────────────┐
                    │           LAN9252               │
                    │  ┌─────────┐    ┌─────────┐    │
   RJ45 Port A ────▶│  │  PHY A  │    │  ESC    │    │◀──── SPI/QSPI
   RJ45 Port B ────▶│  │  PHY B  │    │  Core   │    │◀──── from MCU
                    │  └─────────┘    └─────────┘    │
                    │         │            │         │
                    │         └────────────┘         │
                    │              DPRAM             │
                    └─────────────────────────────────┘
```

### 4.2 MCU 선정

**Board 1 (CAN FD 컨버터) - STM32H743**:
- Core: ARM Cortex-M7 @ 480MHz
- CAN FD: 2개 내장 (외부 CAN 트랜시버로 4포트 확장)
- Memory: 1MB Flash, 1MB RAM
- Interface: QSPI (LAN9252 연결용)

**Board 2/3 (DIO/DAQ) - STM32F407 또는 STM32G474**:
- Core: ARM Cortex-M4 @ 168MHz
- 충분한 GPIO/ADC/DAC
- SPI (LAN9252 연결용)

### 4.3 전원 설계

| 전압 | 용도 | 전류 (예상) |
|------|------|------------|
| 24V DC | 입력 전원 | - |
| 5V | 디지털 회로 | 500mA |
| 3.3V | LAN9252, MCU | 300mA |
| ±15V | 아날로그 회로 (DAQ) | 200mA |

---

## 5. 소프트웨어/펌웨어 요구사항

### 5.1 EtherCAT Slave Stack

**Beckhoff SSC (Slave Stack Code)**:
- ETG 회원 가입 필요 (EtherCAT Technology Group)
- HAL (Hardware Abstraction Layer) 구현 필요
- LAN9252용 드라이버 제공 (Microchip)

**소프트웨어 구조**:

```
┌─────────────────────────────────────────┐
│           Application Layer             │
│    (CAN FD Gateway / DIO / DAQ Logic)   │
├─────────────────────────────────────────┤
│         EtherCAT Slave Stack            │
│    (Beckhoff SSC / CoE / FoE / EoE)     │
├─────────────────────────────────────────┤
│      Hardware Abstraction Layer         │
│         (LAN9252 Driver)                │
├─────────────────────────────────────────┤
│              MCU HAL                    │
│     (SPI, Timer, GPIO, CAN FD)          │
└─────────────────────────────────────────┘
```

### 5.2 ESI (EtherCAT Slave Information) 파일

ESI는 XML 기반 디바이스 설명 파일로, EtherCAT 마스터가 슬레이브를 구성하는 데 필요합니다.

**ESI 파일 구조 예시**:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<EtherCATInfo>
  <Vendor>
    <Id>0x12345678</Id>
    <Name>UTTEC</Name>
  </Vendor>
  <Descriptions>
    <Devices>
      <Device>
        <Type ProductCode="0x0001" RevisionNo="0x0001">
          EtherCAT to CAN FD Converter
        </Type>
        <Name>UTTEC CAN FD Gateway</Name>
        <Sm>...</Sm>
        <RxPdo>...</RxPdo>
        <TxPdo>...</TxPdo>
        <Dc>
          <OpMode>
            <Name>DC Sync0</Name>
            <CycleTimeSync0>1000000</CycleTimeSync0>
          </OpMode>
        </Dc>
      </Device>
    </Devices>
  </Descriptions>
</EtherCATInfo>
```

### 5.3 CTT (Conformance Test Tool) 인증

EtherCAT 장치의 표준 준수 여부를 검증하는 테스트:

**테스트 항목**:
1. Physical Layer Test (PHY)
2. Data Link Layer Test
3. Application Layer Test (CoE, PDO)
4. DC Synchronization Test
5. State Machine Test

---

## 6. 산출물 상세

| 산출물 | 설명 | 형식 |
|--------|------|------|
| 회로도 (Schematic) | 전체 회로 설계도 | PDF, OrCAD/Altium |
| PCB 파일 (Gerber) | 제조용 PCB 데이터 | Gerber RS-274X |
| BOM | 부품 목록 | Excel |
| 펌웨어 소스 코드 | MCU 펌웨어 전체 | C/C++ |
| ESI 파일 | EtherCAT 디바이스 설명 | XML |
| 테스트 리포트 | CTT 테스트 결과 | PDF |
| 기술 문서 | 사용자 매뉴얼, 프로토콜 정의서 | PDF/Word |

---

## 7. 참고 자료

- [Microchip LAN9252 Migration from ET1100](https://ww1.microchip.com/downloads/en/Appnotes/00001907C.pdf)
- [LAN9252 SDK Firmware API Guide](http://ww1.microchip.com/downloads/en/AppNotes/AN2655-LAN9252-SDK-Firmware-API-Guide-DS00002655A.pdf)
- [EtherCAT Slave Information (ESI) Specification](https://www.ethercat.org/en/downloads/downloads_48EF1F220AF54F77AF58921401342864.htm)
- [Implementing DC Synchronization - RT-Labs](https://rt-labs.com/ethercat/implementing-distributed-clock-synchronization-in-ethercat-a-step-by-step-guide/)
- [Beckhoff - Synchronization Modes](https://infosys.beckhoff.com/content/1033/ethercatsystem/2469122443.html)
- [Microchip MPLAB Harmony EtherCAT Library](https://microchip-mplab-harmony.github.io/ethercat/driver/docs/readme_drvlan9252.html)

---

*문서 끝*
