# ESC (EtherCAT Slave Controller) 상세 설명

> **프로젝트**: Xerix 반도체 공정용 유체/기체 MFC Controller (EtherCAT 적용)
> **MCU**: STM32F3 계열 (Cortex-M4F, 72MHz)
> **대상 ESC**: LAN9252 (Microchip)
> **작성일**: 2026-04-08

---

## 1. 정의

**ESC = EtherCAT Slave Controller**

EtherCAT 슬레이브 노드에서 **EtherCAT 프로토콜을 하드웨어 레벨로 처리하는 전용 칩**이다. 일반 MCU로는 EtherCAT의 μs급 실시간성을 구현할 수 없기 때문에, 프로토콜 처리는 전용 ASIC/FPGA에 맡기고 MCU는 응용 로직만 담당하는 구조가 표준이다.

```
   EtherCAT 프레임 (Ethernet Frame, Type 0x88A4)
          │
          ▼
   ┌──────────────────┐
   │       ESC        │ ← 하드웨어가 프레임을 μs 단위로 처리
   │  (LAN9252 등)    │
   └────────┬─────────┘
            │ SPI/Parallel (PDI)
            ▼
   ┌──────────────────┐
   │   Host MCU       │ ← 응용 로직 (PID, 센서, 밸브)
   │   (STM32F3)      │
   └──────────────────┘
```

---

## 2. ESC가 하는 일 (하드웨어 수준)

### 2.1 On-the-fly 프레임 처리

EtherCAT의 핵심 기술. 프레임이 슬레이브를 **통과하는 도중에** 데이터를 읽고/쓰고 즉시 다음 슬레이브로 전달한다. (기존 Ethernet의 "수신 → 처리 → 송신" 방식이 아님)

```
   [프레임 입력] ──► [ESC 내부] ──► [프레임 출력]
                        │
                        ├─ 내 데이터 읽기 (수 ns)
                        ├─ 내 데이터 쓰기 (수 ns)
                        └─ Working Counter 증가
```

### 2.2 FMMU (Fieldbus Memory Management Unit)

Master의 논리 주소(Logical Address)를 ESC 내부 물리 메모리에 매핑. Master가 "주소 0x1000에 써라"라고 하면 FMMU가 "내 DPRAM의 0x0800 오프셋"으로 변환.

### 2.3 SyncManager

Process Data(주기 데이터)와 Mailbox(비주기 데이터)의 **일관성 보장**. MCU가 읽고 있는 동안 새 데이터가 덮어쓰지 않도록 버퍼를 관리.

### 2.4 Distributed Clock (DC)

**모든 슬레이브의 시간을 ns 단위로 동기화**. 각 ESC에 64bit 클럭이 있고, Master가 전파 지연을 측정해 보정값을 뿌려서 전체 네트워크가 같은 시간을 공유.

### 2.5 PDI (Process Data Interface)

Host MCU와 연결되는 인터페이스. SPI, 8/16bit Parallel, Digital I/O 등.

### 2.6 ESM (EtherCAT State Machine)

슬레이브 상태 관리: `Init → Pre-Operational → Safe-Operational → Operational`

---

## 3. ESC 내부 블록 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                    ESC (LAN9252 등)                     │
│                                                         │
│   ┌───────┐      ┌──────────────────┐      ┌───────┐    │
│   │ PHY 0 │◄────►│   EtherCAT       │◄────►│ PHY 1 │    │
│   │ (IN)  │      │   Processing     │      │ (OUT) │    │
│   └───────┘      │   Unit           │      └───────┘    │
│                  │  ┌────────────┐  │                   │
│                  │  │  FMMU x8   │  │                   │
│                  │  ├────────────┤  │                   │
│                  │  │ SyncMgr x8 │  │                   │
│                  │  ├────────────┤  │                   │
│                  │  │  DPRAM     │  │                   │
│                  │  │  (4~8 KB)  │  │                   │
│                  │  ├────────────┤  │                   │
│                  │  │ DC Clock   │  │                   │
│                  │  │ (64bit)    │  │                   │
│                  │  └────────────┘  │                   │
│                  └────────┬─────────┘                   │
│                           │                             │
│                  ┌────────▼─────────┐                   │
│                  │  PDI (SPI/Para)  │                   │
│                  └────────┬─────────┘                   │
│                           │                             │
│                    ┌──────▼──────┐                      │
│                    │   EEPROM    │ ← SII (Slave Info)   │
│                    │   (I²C)     │                      │
│                    └─────────────┘                      │
└─────────────────────────┬───────────────────────────────┘
                          │ SPI
                          ▼
                  ┌───────────────┐
                  │  STM32F3 MCU  │
                  │  (응용 로직)   │
                  └───────────────┘
```

---

## 4. 대표 ESC 칩 비교

| 칩 | 제조사 | 포트 | PDI | 가격대 | 특징 |
|---|---|---|---|---|---|
| **LAN9252** | Microchip | 2/3 | SPI, Parallel | $$ | **가장 인기**, 데이터시트·예제 풍부, STM32와 조합 사례 많음 |
| **ET1100** | Beckhoff | 4 | SPI, Parallel, μC 에뮬레이션 | $$$ | EtherCAT 원조, 4포트(분기) 가능 |
| **ET1200** | Beckhoff | 3 | SPI, Parallel | $$ | ET1100 저가판 |
| **AX58100** | ASIX | 2/3 | SPI, HBI, Local Bus | $ | 저가, 대만산 |
| **XMC4800 내장** | Infineon | 3 | 내장 MCU (ARM M4) | $$$ | ESC + MCU 일체형 |
| **TMS320F28388D 내장** | TI | 2 | 내장 MCU (C28x) | $$$$ | DSP + ESC 일체형 |
| **STM32H723/735 내장** | ST | 2 | 내장 MCU (M7) | $$$ | **F3에는 없음**, H7 상위 라인만 |

---

## 5. ESC가 필요한 이유 (왜 MCU로는 못 하나?)

| 요구사항 | 일반 MCU 한계 | ESC 하드웨어 처리 |
|---|---|---|
| **프레임 처리 시간** | 수 μs ~ 수십 μs | **< 1 μs** (수백 ns) |
| **On-the-fly** | 불가 (저장 → 처리 → 전송) | 가능 (통과 중 처리) |
| **DC 동기 정확도** | ms 수준 | **ns 수준** |
| **프레임 지터** | 인터럽트 처리 시 변동 | 하드웨어 고정 지연 |
| **CPU 부담** | 100% 통신에 할당해도 부족 | **0%** (MCU는 응용만) |

**→ EtherCAT의 핵심 성능(수백 노드 μs 주기 동기)은 ESC 하드웨어 없이는 불가능**

---

## 6. STM32F3 + LAN9252 연결 예시

### 6.1 핀 연결

```
STM32F303               LAN9252
─────────               ────────
PA4  (SPI1_NSS)  ─────► SPI_CS#
PA5  (SPI1_SCK)  ─────► SPI_CLK
PA6  (SPI1_MISO) ◄───── SPI_SO
PA7  (SPI1_MOSI) ─────► SPI_SI
PB0  (GPIO EXTI) ◄───── IRQ     (프레임 도착 인터럽트)
PB1  (GPIO EXTI) ◄───── SYNC0   (DC 동기 트리거 → PID 루프 시작)
PB2  (GPIO EXTI) ◄───── SYNC1   (보조 동기)
PC13 (GPIO OUT)  ─────► RESET#  (ESC 리셋)

VCC_3V3          ─────► VDD_CORE, VDD_IO
GND              ─────► GND

                        PHY 0 (IN)  ──► RJ45 또는 M8 커넥터
                        PHY 1 (OUT) ──► RJ45 또는 M8 커넥터
                        EEPROM (I²C) ──► AT24C64 (SII 저장)
```

### 6.2 데이터 흐름

```
[Master]
   │ 1. EtherCAT Frame 송신 (1ms 주기)
   ▼
[LAN9252 PHY IN]
   │ 2. 프레임 통과 중 Process Data 읽기/쓰기 (수백 ns)
   ▼
[LAN9252 DPRAM] ◄── FMMU/SyncManager 매핑
   │
   │ 3. Mailbox/PDO 업데이트 완료 시 IRQ 발생
   ▼
[STM32F3 SPI IRQ]
   │ 4. DPRAM 읽기 (Setpoint) → PID 계산 → DAC 출력 (밸브)
   │ 5. 센서 ADC 읽기 → DPRAM 쓰기 (Flow 피드백)
   ▼
[다음 프레임에 반영]
```

### 6.3 DC 동기 기반 PID 루프 트리거

```
  LAN9252 SYNC0 ──┐ (1ms 주기, ns 정확도)
                  │
                  ▼
         STM32F3 EXTI 인터럽트
                  │
                  ▼
   1. LAN9252 DPRAM에서 최신 Setpoint 읽기
   2. 센서 ADC 샘플링 (압력, 유량)
   3. PID 계산 (FPU 사용)
   4. Piezo Valve DAC 출력
   5. Flow 피드백 DPRAM 쓰기
                  │
                  ▼
         [다음 EtherCAT 프레임에 반영]
```

---

## 7. ESC 주변 필수 구성품

| 부품 | 역할 |
|---|---|
| **Ethernet PHY** | LAN9252엔 내장(2포트 PHY). ET1100 등은 외장 PHY(예: KSZ8081) 필요 |
| **EEPROM (SII)** | Slave Information Interface — Vendor ID, Product Code, Revision 등 저장. 보통 I²C EEPROM (AT24C64/128) |
| **커넥터** | RJ45 (산업용) 또는 M8 4pin D-coded (IP67 환경) |
| **트랜스포머/자기부품** | Ethernet 절연용 펄스 트랜스, 보통 PHY 후단 |
| **리셋 회로** | POR 또는 MCU 제어 리셋 |

---

## 8. ESC 관련 핵심 용어 정리

| 용어 | 뜻 |
|---|---|
| **ESC** | EtherCAT Slave Controller (하드웨어 칩) |
| **PDI** | Process Data Interface (ESC ↔ MCU 인터페이스) |
| **FMMU** | Fieldbus Memory Management Unit (주소 매핑) |
| **SyncManager** | DPRAM 영역 일관성 보장 |
| **DPRAM** | Dual-Port RAM (ESC 내부, MCU와 공유) |
| **SII** | Slave Information Interface (EEPROM에 저장된 Vendor 정보) |
| **ESI** | EtherCAT Slave Information (XML 파일, Master가 사용) |
| **DC** | Distributed Clock (ns급 동기) |
| **SYNC0/1** | DC 동기 인터럽트 출력 (ESC → MCU) |
| **ESM** | EtherCAT State Machine (Init → Op) |
| **PDO** | Process Data Object (주기 데이터) |
| **SDO** | Service Data Object (비주기 파라미터) |

---

## 9. 핵심 정리

- **ESC = EtherCAT 프로토콜 전용 하드웨어 칩**
- EtherCAT의 μs 동기·on-the-fly 처리는 ESC 없이는 **불가능**
- MCU(STM32F3)는 응용 로직만 담당, **프로토콜은 ESC에 전적으로 맡김**
- Xerix 제품에는 **LAN9252 (Microchip)** 이 가장 적합
  - 2포트 PHY 내장 → daisy-chain 구성 간단
  - SPI 인터페이스 → STM32F3와 쉽게 연결
  - 데이터시트 + SSC 예제 풍부
- ESC는 단독으로 동작 불가 → 반드시 **EEPROM(SII) + Host MCU + PHY(내장/외장)** 와 세트

---

## 참고 자료

- Microchip LAN9252 Datasheet & App Notes (AN1925, AN2420)
- Beckhoff ET1100/ET1200 Hardware Data Sheet
- ETG.1000 시리즈 — EtherCAT Specification (ETG Member 자료)
- ETG.2200 — Slave Implementation Guide
- STM32F303 Reference Manual (RM0316)
