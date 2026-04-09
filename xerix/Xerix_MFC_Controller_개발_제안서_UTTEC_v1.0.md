# Xerix MFC Controller 개발 제안서

> **제안 프로젝트**: Xerix 반도체 공정용 Mass Flow Controller (MFC) Controller 개발
> **제출 대상**: Xerix (담당: 유진기 선임, jkyu@xerix.co.kr)
> **제안사**: UTTEC (대표: 홍광선, ihong@uttec.co.kr)
> **제안서 버전**: v1.0
> **제출일**: 2026-04-09
> **유효 기간**: 제출일로부터 30일

---

## 목차

1. [Executive Summary](#1-executive-summary)
2. [UTTEC 회사 소개](#2-uttec-회사-소개)
3. [프로젝트 이해](#3-프로젝트-이해)
4. [제안 범위](#4-제안-범위)
5. [기술 제안 — 시스템 아키텍처](#5-기술-제안--시스템-아키텍처)
6. [핵심 기술 검토](#6-핵심-기술-검토)
7. [개발 일정 (6개월)](#7-개발-일정-6개월)
8. [조직 구성](#8-조직-구성)
9. [개발 비용](#9-개발-비용)
10. [리스크 관리](#10-리스크-관리)
11. [성공 기준 및 검수 조건](#11-성공-기준-및-검수-조건)
12. [산출물](#12-산출물)
13. [계약 조건](#13-계약-조건)
14. [사전 확인 사항](#14-사전-확인-사항)
15. [연락처](#15-연락처)

---

## 1. Executive Summary

UTTEC은 Xerix의 반도체 공정용 **MFC Controller 개발 프로젝트** 수행을 제안합니다.

본 제안서는 귀사의 **2026-04-08 개발 사양서** 및 **사전 미팅 논의 사항**을 전면 반영하여, **3-Board 모듈형 아키텍처** 기반의 MFC Controller를 **6개월 내** 시제품 납품하는 것을 목표로 합니다.

### 1.1 핵심 제안 사항

| 항목 | 내용 |
|---|---|
| **프로젝트 범위** | MFC Controller 전체 (HW 설계 + PCB + 펌웨어 + 시제품 납품) |
| **센서 타입** | **Thermal + Coriolis** 2종 (DIP SW 전환) |
| **통신 프로토콜** | **PIO+RS485 / DeviceNet / EtherCAT** 3종 (DIP SW + Sub-Board 플러그) |
| **EtherCAT ESC** | **BECKHOFF ET1100** (Xerix 지정 준수) |
| **밸브 구동** | Piezo Stack + Solenoid 비례 (2종 대응) |
| **개발 기간** | **6개월** (26주) |
| **총 개발 비용** | **49,702,000원** (VAT 별도, 약 4,970만원) |
| **주요 산출물** | 회로도/PCB/BOM/펌웨어/ESI/EDS/시제품 + IP 전부 Xerix 귀속 |
| **지식재산권** | **Xerix 100% 귀속** |

### 1.2 UTTEC의 차별화 경쟁력

- ✅ **STM32 기반 임베디드 + PID 제어 실무 경험** 보유
- ✅ **3종 산업 프로토콜 동시 대응** 설계 역량
- ✅ **반도체 공정용 정밀 계측기** 요구 수준 이해
- ✅ **Xerix 요구사양 전체 반영** — 메일 사양서 18개 항목 + 미팅 확장 3건 + 전원/커넥터/PCB 규격 전체 준수

---

## 2. UTTEC 회사 소개

### 2.1 회사 개요

| 항목 | 내용 |
|---|---|
| **회사명** | UTTEC |
| **대표** | 홍광선 |
| **Email** | ihong@uttec.co.kr |
| **주력 분야** | 산업용 임베디드 시스템, 제어 보드 개발, IoT, 스마트팩토리 |

### 2.2 기술 역량

- **임베디드 시스템 개발**
  - STM32 Series (F0~H7) 기반 제어 보드 설계
  - RTOS / Bare-metal 펌웨어 개발
  - Bootloader / OTA / 필드 업데이트 구현
- **산업 통신 프로토콜**
  - RS485 Serial / Modbus
  - EtherCAT (ESC 기반 Slave 구현)
  - DeviceNet / CANopen
  - Ethernet/IP (향후 확장)
- **정밀 제어 및 신호처리**
  - PID / Auto-Tuning / 적응 제어
  - ADC/DAC 기반 Analog Front-End
  - 센서 교정 및 MGMR 알고리즘
- **H/W 설계**
  - OR-CAD / Allegro / KiCad 등 주요 EDA 툴 활용
  - 다층 PCB (4층~8층) 설계 경험
  - EMI/EMC 고려 설계 및 사전 시험 대응
  - 고전압/고정밀 Analog 혼합 설계

### 2.3 개발 철학

- **산출물 품질 우선**: 계약 범위 내 최고 품질로 납품
- **투명한 소통**: 주간 보고, 이슈 즉시 공유, 설계 검토 협업
- **지식재산권 존중**: 클라이언트 귀속 원칙 엄수
- **장기 파트너십**: 단발성 용역이 아닌 양산/유지보수까지 지원 가능

---

## 3. 프로젝트 이해

### 3.1 요구사양 분석

UTTEC은 Xerix가 제공한 **2026-04-08 개발 사양서**(이메일)와 **사전 미팅 논의 사항**을 면밀히 분석하였으며, 다음과 같이 요구 사항을 정리하였습니다.

#### 3.1.1 하드웨어 요구사항

| 구분 | 요구 사항 |
|---|---|
| **PCB 구성** | Main Control + Sub-Protocol + Sensor **3-Board 분리 구조** |
| **Main PCB** | STM32Fx 계열 MCU, **110 × 70 mm** 규격, 4영역 분할(센서/제어/조작/전원) |
| **Sub-Protocol** | **PIO+RS485 / DeviceNet / EtherCAT** 3종 (사양에 따라 플러그) |
| **Sensor** | Pressure + Thermal + Coriolis 포함 (두 타입 공존 어려울 시 분리 개발) |
| **전원** | **+24VDC 및 ±15VDC** 입력, **D-SUB 09P Male** 커넥터 |
| **특수 조건** | **+24V 입력단 탄탈륨 커패시터 사용 배제** |
| **Actuator** | Gas Line (Bypass, Sensing, Actuator) 포함 |
| **Analog I/O** | 0~5VDC / 4~20mA DIP SW 선택 |

#### 3.1.2 동작 기능 요구사항

| 기능 | 요구 사양 |
|---|---|
| **응답 시간** | Target Time 0.1~1.0초 설정, **1초 이내 확실 제어**, 10SLM 세팅 시 0.5초 이내 |
| **제어 정밀도** | **소수점 2자리** 제어 목표 (불가 시 1자리) |
| **Display** | 전원 인가 시 XERiX 로고 1초 → 현재 유량 표시 |
| **Button1** | 1회 누름: 설정 유량 ↔ 현재 유량 토글 |
| **Button2 (Short)** | **Zero Calibration** 진행 ("ZERO CAL ING" → "ZERO CAL OK") |
| **Button2 (Long)** | **Auto PID** 진행 ("AUTO PID ING" → "AUTO PID OK") |
| **Status LED** | Green / Red Status Block 추가 |
| **DIP SW 1** | Sensor Select (OFF: Thermal, ON: Coriolis) |
| **DIP SW 2** | Analog Select (OFF: 0~5VDC, ON: 4~20mA) |
| **DIP SW 3~4** | Protocol Select (PIO+RS485 / DeviceNet / EtherCAT) |
| **PID Algorithm** | Sensor Data 기반 Actuator 조정 + Pressure 보정 |
| **MGMR** | 가스량 및 성분 선택에 따른 연산 적용 |

#### 3.1.3 통신 프로토콜 요구사항

| UART | 기능 | 명령 |
|:---:|---|---|
| **UART1 Debugging** | 디버그 콘솔 + MGMR 설정 + PV/SV 모니터 | `"HIX" → "XERIX"` reply |
| **UART2 Customer** | 고객 공개 명령어 세트 | `"HIC" → "CUSTOMER"` reply |
| **UART3 DeviceNet** | DeviceNet 전용 | ODVA 규격 + EDS File |
| **UART4 EtherCAT** | EtherCAT 전용 디버그 | ET1100 기반 |

#### 3.1.4 Sub-Board 요구사항

| Board | 요구 사항 |
|---|---|
| **RS485** | Protocol 제공 |
| **DeviceNet** | **ODVA 규정** 준수, **EDS File** 제공 |
| **EtherCAT** | **BECKHOFF ET1100 적용**, **ESI File** 다운로드 제공 |

#### 3.1.5 검증 요구사항

- 일반 Gas Line Type
- IGS Type

### 3.2 주요 개발 포인트

본 프로젝트의 성공적 수행을 위해 UTTEC이 식별한 **Critical Success Factors**:

1. **3-Board 모듈 아키텍처 설계** — 3종 프로토콜을 DIP SW만으로 전환 가능한 확장 구조
2. **BECKHOFF ET1100 최적 적용** — Xerix 지정 칩의 장점 극대화 및 단점 대응
3. **Thermal + Coriolis 양립** — 두 센서 타입의 신호 체인 최적 분리
4. **Auto PID 환경 적응형 구현** — 단순 1회 튜닝이 아닌 온/압 변화에 강인한 제어
5. **±15V + 탄탈륨 금지 전원 설계** — Xerix 특수 요건 준수
6. **110×70mm 공간 제약 극복** — 고밀도 레이아웃 + 4영역 분할

---

## 4. 제안 범위

### 4.1 전체 수행 범위

UTTEC은 Xerix 요구사양서의 **모든 항목을 100% 포함**하여 제안합니다.

#### 4.1.1 ✅ 포함 (IN-SCOPE)

**하드웨어 설계 및 PCB 제작**
- [x] Main Control PCB 설계 (110×70mm, STM32F429ZI, 4영역 분할)
- [x] Sub-Protocol PCB **3종** (PIO+RS485 / DeviceNet / **EtherCAT ET1100**)
- [x] Sensor PCB **2종** (Thermal Bridge / Coriolis AFE, 각각 Pressure Sensor 포함)
- [x] +24VDC / ±15VDC 전원 설계 + D-SUB 09P Male 커넥터
- [x] +24V 입력단 탄탈륨 금지 조건 준수
- [x] OLED Display (1인치 이하) + Button1/2 + Green/Red Status LED
- [x] DIP SW 센서/아날로그/프로토콜 선택 회로
- [x] Piezo HV Driver + Solenoid 비례 Driver 양립
- [x] PCB 아트웍 **OR-CAD / Allegro**

**펌웨어 개발**
- [x] STM32CubeIDE 기반 펌웨어 환경
- [x] HAL Driver (Clock/GPIO/SPI/UART/DAC/ADC/TIM/I²C)
- [x] OLED (SSD1306 SPI) 드라이버 포팅 + 상태 표시 UI
- [x] Button + LED 상태머신 (Display/Zero Cal/Auto PID 플로우)
- [x] **Thermal AFE** 알고리즘 (ADS1220, 브릿지 교정)
- [x] **Coriolis AFE** 알고리즘 (ADS1263, Drive/Pickup, 위상차 측정)
- [x] **Pressure 보정 PID** 제어 (1ms 폐루프)
- [x] **Auto PID Function** (환경 적응형 자동 튜닝)
- [x] **Zero Calibration Function**
- [x] **MGMR 연산 엔진** (N₂/He/Ar/H₂/O₂/CO₂/SF₆ + 사용자 확장)
- [x] **UART1 Debug Protocol** (HIX → XERIX 커맨드 세트)
- [x] **UART2 Customer Protocol** (HIC → CUSTOMER 커맨드 세트)
- [x] **RS485 Serial Protocol** (Xerix 지정 규격서 준수)
- [x] **DeviceNet 프로토콜** (MCP2515 + ODVA EDS 파일)
- [x] **EtherCAT Slave (ET1100)** 구현 (SSC Tool + ESI 파일 + CoE Object Dictionary + DC SYNC0 1ms 동기화)
- [x] Sensor Type 자동 인식 (Thermal ↔ Coriolis)
- [x] Protocol 자동 전환 (DIP SW 감지)

**검증 및 시험**
- [x] 응답 시간 측정 (10SLM @ 0.5s 목표)
- [x] 정밀도 시험 (소수점 2자리 목표)
- [x] 재현성 / 안정성 72시간 연속 시험
- [x] **일반 Gas Line Type** 검증
- [x] **IGS Type** 검증
- [x] 전원 노이즈 / 신호 무결성 측정
- [x] EMI/EMC 설계 고려 수준 사전 시험
- [x] 누설/내압 사전 시험 (외부 기관 위탁)

**산출물**
- [x] 회로도 (Schematic) 원본 (OR-CAD)
- [x] PCB 아트웍 원본 (Allegro) + **Gerber** + Drill + Pick&Place
- [x] **BOM** (부품 속성 포함, 탄탈륨 금지 검증)
- [x] 펌웨어 소스 코드 전체 + 컴파일 환경 가이드
- [x] **ESI 파일** (EtherCAT Xerix_MFC.xml)
- [x] **EDS 파일** (DeviceNet)
- [x] RS485 Protocol 구현 문서
- [x] 교정 절차서 + 사용자 매뉴얼 (한국어)
- [x] 조립 완료 시제품 (수량 협의, 기본 제안 총 15장)
- [x] **모든 지식재산권 Xerix 귀속**

### 4.2 명확히 제외되는 사항

본 제안 범위 외 사항은 다음과 같으며, 필요 시 별도 협의합니다.

- ⛔ 가스 배관/기구 어셈블리 완제품 (Controller + Sub/Sensor Board만 제공)
- ⛔ Coriolis 센서 헤드 제조 (**Xerix 또는 OEM 공급품 전제**)
- ⛔ 양산 조립 치구 및 양산 이관 (별도 프로젝트)
- ⛔ KC/CE/FCC 등 **정식 인증 절차** (본 계약은 설계 고려 수준)
- ⛔ 현장 설치 및 시운전 지원 (별도 용역)
- ⛔ 영문(EN) 매뉴얼 (한국어 기본, 영문은 별도 요청 시 추가)

---

## 5. 기술 제안 — 시스템 아키텍처

### 5.1 3-Board 모듈형 아키텍처

본 제안의 핵심은 **Main / Sub-Protocol / Sensor 3-Board 분리 구조**로, Xerix 요구사양의 3종 프로토콜 + 2종 센서를 **단일 Main PCB 교체 없이 Sub-Board 플러그만으로 전환**할 수 있는 확장형 설계입니다.

```
┌──────────────────────────────────────────────────────────────────┐
│  Xerix MFC Controller — 3-Board Modular Architecture              │
│                                                                    │
│  ┌──────────────────────────────┐                                 │
│  │   MAIN CONTROL PCB           │                                 │
│  │   110 × 70 mm, 4층           │                                 │
│  │   STM32F429ZI + OLED + DIP   │                                 │
│  │   +24V / ±15V / D-SUB 09P    │                                 │
│  │   PID 1ms / MGMR / AutoPID   │  ┌──────────────────────┐     │
│  │   UART1 (HIX) / UART2 (HIC)  │◀─┤  SENSOR PCB Type A   │     │
│  │   Analog 0-5V / 4-20mA       │  │  Thermal Bridge +    │     │
│  │                              │  │  Pressure Sensor     │     │
│  │                              │  └──────────────────────┘     │
│  │                              │  ┌──────────────────────┐     │
│  │                              │◀─┤  SENSOR PCB Type B   │     │
│  │                              │  │  Coriolis AFE (24b)  │     │
│  │                              │  │  + Pressure Sensor   │     │
│  │                              │  └──────────────────────┘     │
│  │                              │                                 │
│  │                              │  ┌──────────────────────┐     │
│  │                              │──┤  SUB-PROTOCOL PCB    │     │
│  │                              │  │  Type A: PIO+RS485   │     │
│  │                              │  │  Type B: DeviceNet   │     │
│  │                              │  │  Type C: EtherCAT    │     │
│  │                              │  │   (BECKHOFF ET1100)  │     │
│  └──────────────────────────────┘  └──────────────────────┘     │
│         │                                                          │
│         ▼                                                          │
│  ┌─────────────────┐                                              │
│  │  Actuator        │  Piezo Stack (Premium) / Solenoid (Standard) │
│  │  + Gas Line      │                                              │
│  └─────────────────┘                                              │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Wishket 요구 PCB 4영역 분할 준수

Main PCB(110×70mm)는 Xerix의 분할 설계 요구를 다음과 같이 반영합니다.

| 영역 | 배치 위치 | 비고 |
|---|---|---|
| **센서부** | Main PCB 내 Sensor IF 커넥터 + 별도 Sensor PCB | 완전 분리 |
| **제어부** | Main PCB 중앙 (STM32F429ZI + 주변 회로) | 제어+전원 병합 가능 |
| **조작부** | Main PCB 전면 (OLED + Btn1/2 + Green/Red LED) | 전면 노출 |
| **전원부** | Main PCB 한쪽 구역 (+24V/±15V 입력, DC-DC, D-SUB 커넥터) | 제어부와 병합 |

### 5.3 주요 부품 선정

| 모듈 | 부품 | 제조사 | 선정 이유 |
|---|---|---|---|
| **MCU** | **STM32F429ZI** (LQFP144, 2MB Flash, 256KB RAM) | STMicro | F4 계열 중 LAN9252/ET1100 X-CUBE-ECAT 공식 레퍼런스, 한국어 자료 풍부 |
| **EtherCAT ESC** | **BECKHOFF ET1100** (BGA128) | Beckhoff | Xerix 지정, EtherCAT 원천 기술 호환성 최상 |
| **EtherCAT PHY** | KSZ8041NL × 2 | Microchip | ET1100 표준 MII PHY, 공급 안정 |
| **EtherCAT 트랜스포머** | H1102NL × 2 | Pulse | 업계 표준 100BASE-TX 절연 |
| **DeviceNet** | MCP2515 + MCP2551 | Microchip | SPI CAN Controller + Transceiver, ODVA 호환 |
| **RS485** | THVD1500 | TI | 저전력 ±15kV ESD 보호 |
| **Thermal AFE** | ADS1220 (24bit ΔΣ) | TI | 브릿지 입력 전용, 초저잡음 |
| **Coriolis AFE** | ADS1263 (32bit ΔΣ, 5ch) | TI | 위상차 측정 고정밀, DMA 지원 |
| **Pressure Sensor** | Honeywell SSCDANN Series | Honeywell | 반도체/산업 검증, 디지털 출력 |
| **Piezo Driver** | PiezoDrive PDU150 / TI DRV2700 | - | 0~150V HV Amp, Piezo Stack 구동 |
| **Solenoid Driver** | DRV8251A + 전류 검출 | TI | PWM 전류원 제어 |
| **OLED** | SSD1306 0.96" 128×64 SPI | Univision | 1인치 이하 요구 충족, 로고/숫자 표시 |
| **전원** | TPS54360 + LDO 조합 | TI | 탄탈륨 회피, 알루미늄 폴리머+MLCC 조합 |

### 5.4 Main ↔ Sub-Board 공통 인터페이스

모든 Sub-Protocol PCB가 동일한 커넥터로 연결되도록 **공통 B2B 커넥터 규격**을 정의합니다.

| 핀 | 신호 | 용도 |
|:---:|---|---|
| 1~4 | VCC 5V / 3.3V / GND × 2 | 전원 공급 |
| 5~8 | SPI1 (SCK/MISO/MOSI/nSS) | ET1100 / CAN Controller / 기타 |
| 9~10 | UART3 TX/RX | DeviceNet 예비 |
| 11~12 | UART4 TX/RX | EtherCAT 디버그 |
| 13 | IRQ_A | SYNC0 / RS485 TX Enable |
| 14 | IRQ_B | SYNC1 / CAN Error |
| 15~16 | Board ID A/B | Sub-Board 자동 인식 (00: PIO, 01: DN, 10: ECAT) |
| 17~20 | Reserved | 향후 확장 |

### 5.5 Sensor PCB 자동 인식

Sensor PCB에 **EEPROM (24C02)**을 탑재하여 센서 타입 ID를 기록합니다. Main PCB 부팅 시 I²C로 읽어 Thermal/Coriolis 알고리즘을 자동 분기합니다.

---

## 6. 핵심 기술 검토

### 6.1 BECKHOFF ET1100 채택의 장점

Xerix가 지정한 ET1100은 다음과 같은 강점을 가집니다.

| # | 장점 | 효과 |
|:---:|---|---|
| 1 | **EtherCAT 원천 기술 호환성 최상** | TwinCAT3/Beckhoff EL 모듈 및 타사 마스터와 상호운용성 최고 |
| 2 | **Conformance Test 안정성** | ETG 공식 인증에서 검증된 레퍼런스 플랫폼 |
| 3 | **풀 기능 ESC** | FMMU 8개 / SyncManager 8개 / DC 완전 지원 / 최대 4포트 |
| 4 | **PDI 유연성** | SPI 외 Parallel 16bit 지원 (고속화 여지) |
| 5 | **SSC Tool 완벽 호환** | Beckhoff SSC Tool의 기본 타겟 |
| 6 | **풍부한 Reference Design** | Omron/Delta/Panasonic 등 다수 양산 제품 참조 가능 |
| 7 | **4포트 확장 여력** | 향후 Junction Slave 요구 시 칩 교체 없이 대응 |
| 8 | **장기 공급 안정성** | Beckhoff 10년 이상 공급 보장 (반도체 장비 수명에 부합) |

### 6.2 ET1100 채택에 따른 기술적 고려 사항 및 대응

| # | 고려 사항 | UTTEC 대응 방안 |
|:---:|---|---|
| 1 | 외장 PHY 필수 | KSZ8041NL ×2 + H1102NL ×2 트랜스포머, 100Ω 차동 임피던스 레이아웃 |
| 2 | PCB 면적 증가 (약 1,250mm²) | **Sub-Protocol PCB로 분리** → Main PCB 공간 제약 해소 |
| 3 | BOM 비용 증가 | Premium 라인 전용 포지셔닝, 양산 단가 협상 |
| 4 | STMicro 공식 AN 없음 | Beckhoff 공식 AN_ET1100 + SOEM 오픈소스 + Reference Design 활용 |
| 5 | SPI 포팅 공수 | Phase 3 브링업 기간에 +1주 예비 확보 |
| 6 | SII EEPROM 쓰기 절차 | Phase 2에 **ET1100 EEPROM Writer JIG** 개발 포함 |
| 7 | 디버깅 복잡성 | SPI 로직 애널라이저 + MII Tap + Wireshark EtherCAT 플러그인 활용 |
| 8 | 리드타임 리스크 (4~8주) | **Phase 0 Week 1 즉시 발주** + 병행 학습 |

### 6.3 핵심 기술 난이도 및 역량

| 기술 | 난이도 | UTTEC 보유 역량 |
|---|:---:|---|
| STM32F4 기반 고속 PID | ★★★ | 기보유 |
| Coriolis 위상차 신호처리 | ★★★★ | Lock-in Amplifier 기법 + 24bit ΔΣ ADC 경험 |
| Thermal Bridge AFE 교정 | ★★★ | 기보유 |
| Piezo HV Driver 회로 | ★★★★ | PDU150/DRV2700 평가보드 활용 |
| EtherCAT ET1100 Slave | ★★★★★ | 본 프로젝트에서 Beckhoff Reference + SOEM 병행 |
| DeviceNet (ODVA) | ★★★ | MCP2515 기반 CAN 구현 경험 |
| Auto PID 환경 적응형 | ★★★★ | RLS / Self-Tuning Regulator 알고리즘 적용 |
| MGMR 가스 보정 | ★★ | Gas Profile Table 기반 연산 |

---

## 7. 개발 일정 (6개월)

### 7.1 전체 Phase 구성

| Phase | 기간 | 주요 작업 | 마일스톤 |
|:---:|:---:|---|---|
| **Phase 0** | W1 ~ W2 | 사양 확정, 확인사항 회신, BOM v0.1, 리드타임 조사 | Kick-off 완료 |
| **Phase 1** | W3 ~ W7 | 회로 설계 (Main / Sub-Proto 3종 / Sensor 2종) | 회로도 완성 |
| **Phase 2** | W8 ~ W11 | PCB 아트웍, 제작 발주, SMT 조립 | Rev.A 조립 완료 |
| **Phase 3** | W9 ~ W14 (병렬) | 펌웨어 저수준 브링업 (Display/Button/UART/Analog) | 기본 FW 동작 |
| **Phase 4** | W15 ~ W21 | 센서 AFE + PID + Auto PID + 3종 프로토콜 통합 | 전체 통합 완료 |
| **Phase 5** | W22 ~ W26 | 성능 검증, IGS Type 시험, 문서화, 최종 납품 | 시제품 납품 |

### 7.2 Gantt Chart

#### 7.2.1 Phase 배치 (주 단위)

```
 Week     | 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
 ---------+------------------------------------------------------------------------------
 P0 Spec  | ## ##
 P1 H/W   |       ## ## ## ## ##
 P2 PCB   |                      ## ## ## ##
 P3 FW    |                         ## ## ## ## ## ##
 P4 Integ |                                           ## ## ## ## ## ## ##
 P5 Valid |                                                                ## ## ## ## ##
 ---------+------------------------------------------------------------------------------
 MS       |    M1             M2          M3       M4                   M5             M6
```

**마일스톤 (Milestone)**

| ID | 주차 | 내용 |
|:---:|:---:|---|
| **M1** | W2 | Kick-off 완료, 사양 확정, BOM v0.1, 부품 발주 |
| **M2** | W7 | 회로도(Schematic) 설계 완료, BOM v1.0 |
| **M3** | W11 | PCB Rev.A 조립 완료, ET1100 EEPROM Writer JIG 준비 |
| **M4** | W14 | 기본 FW 동작 (Display/Button/UART/Analog) |
| **M5** | W21 | 3종 프로토콜 + 2종 센서 + PID 전체 통합 완료 |
| **M6** | W26 | **최종 시제품 납품 + 산출물 이관** |

> **범례**: `##` = 주요 작업 진행 주차 / **MS** = 마일스톤 완료 시점
> **병렬 진행**: W9~W11 구간은 P2(PCB 아트웍/제작/조립) + P3(펌웨어 환경 구축/HAL/Blinky)가 **동시 진행**됩니다.
> **공백 주차 없음**: 26주 모두 명확한 작업과 산출물이 배치되어 있으며, 상세 내역은 다음 §7.2.2 주간 활동 요약표 참조.

#### 7.2.2 주간 활동 요약표

26주 모든 주차에 구체적 활동이 배치되어 있습니다.

| W | Phase | 핵심 활동 | 산출물/마일스톤 |
|:---:|:---:|---|---|
| **W1** | P0 | Kick-off 미팅, Q1~Q25 회신 수령, RS485 Protocol 규격서 수령, **ET1100/PHY/AFE 즉시 발주** | ★ Kick-off |
| **W2** | P0 | BOM v0.1, 시스템 블록도 확정, 개발 환경 구축 (STM32CubeIDE, OR-CAD, Allegro, SSC Tool) | Arch.pdf |
| **W3** | P1 | Main PCB: MCU + Clock + JTAG + OLED + Button + LED + DIP SW 회로 설계 | Main Sch v0.1 |
| **W4** | P1 | Main PCB: **+24V/±15V 전원부**, D-SUB 09P 핀맵, 탄탈륨 금지 BOM, Actuator Driver, Analog I/O | Main Sch v0.2 |
| **W5** | P1 | Sub-Protocol: Type A (PIO+RS485) + Type B (DeviceNet MCP2515) 회로 설계 | Sub Sch A/B |
| **W6** | P1 | Sub-Protocol Type C (**EtherCAT ET1100 + PHY ×2 + 트랜스포머 ×2 + RJ45 ×2**), Sensor PCB 2종 회로 | Sub Sch C, Sensor Sch |
| **W7** | P1 | 회로 Design Review, DRC/ERC, 부품 확정, BOM v1.0 Peer Review | ★ 회로도 완성 / BOM v1.0 |
| **W8** | P2 | **Main PCB 아트웍** (110×70mm 4층, 4영역 분할, 임피던스 제어) | Main Layout v0.1 |
| **W9** | P2 / P3 | Sub-Protocol 3종 + Sensor PCB 2종 아트웍 ∥ **P3 시작**: STM32CubeIDE 프로젝트, Nucleo-F429ZI 초기 코드 | Sub/Sensor Layout / FW Skeleton |
| **W10** | P2 / P3 | DRC/ERC 최종, **Gerber 발주**, SMT 부품 발주 ∥ HAL Driver 환경 (Clock/GPIO/SPI/ADC/UART/TIM) | Gerber / Base FW |
| **W11** | P2 / P3 | PCB 수령, SMT 조립 (Main 5 + Sub ×3×3 + Sensor ×2×3), **ET1100 EEPROM Writer JIG 제작** ∥ 보드 수령 후 Blinky/UART Console/JTAG Debug | ★ Rev.A 조립 완료 |
| **W12** | P3 | OLED (SSD1306) 드라이버 포팅, XERiX 로고/숫자/텍스트 UI 구현 | Display FW |
| **W13** | P3 | Button/LED 상태머신 (Btn1 토글, Btn2 Zero Cal / Long Press Auto PID), Analog I/O (0~5V/4~20mA), Pressure Sensor I²C | UI / Analog FW |
| **W14** | P3 | **UART1 (HIX→XERIX) / UART2 (HIC→CUSTOMER) 커맨드 파서**, RS485 Protocol 규격 초기 적용 | ★ 기본 FW 동작 |
| **W15** | P4 | **Thermal AFE (ADS1220)** 브릿지 구동, 기준 유량 교정 곡선, **Coriolis AFE (ADS1263)** Drive Coil 공진 탐색 | Thermal/Coriolis FW |
| **W16** | P4 | Sensor Type 자동 인식 (EEPROM ID) 및 알고리즘 분기, **MGMR 연산 엔진** (Gas Profile 7종 GCF) | Sensor Detect / MGMR FW |
| **W17** | P4 | **Piezo HV Driver** 브링업 (PDU150/DRV2700, DAC→HV 매핑), **Solenoid 비례 Driver** (PWM + Dither) | Valve FW |
| **W18** | P4 | **PID 폐루프 (1ms 주기)** 구현 + 응답 시간 측정, **Auto PID Function** (환경 적응형 자동 튜닝) | PID / AutoPID FW |
| **W19** | P4 | **Zero Calibration Function** 완성, **Sub-Protocol Type A 통합** (PIO+RS485 Xerix 규격) | ZeroCal / RS485 Done |
| **W20** | P4 | **Sub-Protocol Type B 통합** (DeviceNet MCP2515 + ODVA EDS 파일), **Sub-Protocol Type C 통합** (ET1100 SPI PDI + SSC Tool + ESI 파일) | DeviceNet / ECAT Done |
| **W21** | P4 | TwinCAT3 EtherCAT Slave 인식 검증, **DC SYNC0 기반 1ms 동기화**, **3종 프로토콜 DIP SW 자동 전환 통합 시험** | ★ 전체 통합 완료 |
| **W22** | P5 | **응답 시간 측정** (10 SLM @ 0.5s 목표, 1초 이내 확실), **정밀도 시험** (소수점 2자리 / F.S. 대비 오차) | 응답/정확도 보고서 |
| **W23** | P5 | **일반 Gas Line Type 검증** (N₂/Ar 실유량), **IGS Type 검증** (SEMI F81 대응 시험) | Gas Line / IGS 보고서 |
| **W24** | P5 | **EMI/EMC 설계 고려 사전 시험** (외부 기관 위탁), **72시간 연속 안정성** + 온도 드리프트 시험 | EMI / Stability 보고서 |
| **W25** | P5 | 문제점 수정 및 **FW v1.0 Release Candidate**, 사용자/서비스 매뉴얼 + 교정 절차서 (한국어) 작성 | FW v1.0 RC / Docs |
| **W26** | P5 | **최종 시제품 납품** (20장) + 산출물 전체 이관 + Xerix 담당자 교육 세션 | ★ **납품 완료** |

#### 7.2.3 Phase 중첩 및 병렬 진행

| 구간 | 동시 진행 Phase | 목적 |
|:---:|---|---|
| **W9 ~ W11** | P2 (PCB 아트웍/발주/제작) + P3 (펌웨어 환경 구축 및 HAL Driver) | PCB 제작 대기 시간 동안 펌웨어 선행 개발 |
| **W11** | P2 (SMT 조립 완료) + P3 (수령 후 Blinky) | 보드 수령 즉시 펌웨어 구동 확인 |
| **W19 ~ W20** | P4 내부 (Zero Cal + RS485 + DeviceNet + EtherCAT 통합) | 3종 프로토콜 병렬 통합으로 일정 단축 |

> **공백 주차 없음**: 모든 26주에 명확한 작업과 산출물이 배치되어 있으며, 특히 PCB 제작 대기 주차(W9~11)는 펌웨어 선행 개발로 병렬 활용합니다.

### 7.3 Phase별 상세 작업

#### Phase 0 — 사전 협의 및 사양 확정 (W1~2)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W1 | Kick-off 미팅, Section 14 확인사항 Q1~Q25 회신 수령 | Kick-off 회의록 |
| W1 | RS485 Protocol 규격서 수령, MGMR 가스 리스트 확정 | RS485 Protocol v0 |
| W1 | ET1100 / KSZ8041NL / H1102NL 즉시 발주 (리드타임 리스크 대응) | 발주서 |
| W2 | 부품 BOM v0.1, 시스템 블록도 최종 확정 | BOM v0.1, Arch.pdf |
| W2 | 개발 환경 셋업 (STM32CubeIDE, OR-CAD, Allegro, SSC Tool) | 환경 구축 완료 |

#### Phase 1 — 회로 설계 (W3~7)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W3 | Main PCB: MCU + Clock + JTAG + OLED + Button + LED + DIP SW | Main Sch v0.1 |
| W3 | Main PCB: **+24V/±15V 전원부 + D-SUB 09P 핀맵, 탄탈륨 금지 BOM** | Power Sch |
| W4 | Main PCB: Actuator Driver (Piezo HV + Solenoid), Analog I/O (0-5V/4-20mA) | Main Sch v0.2 |
| W4 | Main PCB: Main ↔ Sub-Board 공통 커넥터 정의 | Interface Spec |
| W5 | Sub-Protocol: Type A (PIO+RS485) + Type B (DeviceNet MCP2515) 회로 | Sub-Proto Sch A/B |
| W5 | Sub-Protocol: **Type C (EtherCAT ET1100 + KSZ8041NL×2 + H1102NL×2 + RJ45×2)** | Sub-Proto Sch C |
| W6 | Sensor PCB: Type A (Thermal ADS1220 + Pressure), Type B (Coriolis ADS1263 + Pressure) | Sensor Sch A/B |
| W7 | 회로 Review, DRC/ERC, 부품 확정, BOM v1.0 Peer Review | BOM v1.0 |

#### Phase 2 — PCB 아트웍 및 제작 (W8~11)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W8 | Main PCB 아트웍: **110×70mm, 4층**, 4영역 분할, 임피던스 100Ω | Main Layout v0.1 |
| W8 | Sub-Protocol PCB 3종 아트웍 | Sub-Proto Layout |
| W9 | Sensor PCB 2종 아트웍 | Sensor Layout |
| W9 | DRC/ERC 최종, Silk 정리, Assembly Drawing | Gerber + Drill |
| W10 | PCB 제작 발주 (Main Rev.A + Sub×3 + Sensor×2, 총 6종 10장씩) | 발주서 |
| W10 | SMT 부품 발주 (ET1100 BGA, STM32F429 포함) | 부품 발주서 |
| W11 | PCB 수령 → SMT 조립 → **ET1100 EEPROM Writer JIG** 제작 | Rev.A 보드 조립 완료 |

#### Phase 3 — 펌웨어 저수준 브링업 (W9~14, Phase 2와 병렬)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W9 | STM32CubeIDE 프로젝트, Nucleo-F429ZI 초기 개발 | Project Skeleton |
| W10 | HAL Driver 환경 — Clock/GPIO/SPI/DAC/ADC/UART/TIM/I²C | Base FW |
| W11 | 보드 수령 후 기본 동작 — Blinky, UART Console, JTAG Debug | Boot OK |
| W12 | OLED (SSD1306) 드라이버 포팅 — 로고/숫자/텍스트 출력 | Display FW |
| W12 | Button/LED 상태머신 (Btn1 토글, Btn2 Zero Cal / Auto PID) | UI FW |
| W13 | Analog I/O (0~5V / 4~20mA) 변환, Pressure Sensor I²C | Analog FW |
| W14 | **UART1 (HIX) / UART2 (HIC) 커맨드 파서 초안**, RS485 Protocol 적용 | Protocol FW v0 |

#### Phase 4 — 센서/PID/3종 프로토콜 통합 (W15~21)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W15 | **Thermal AFE (ADS1220)** 구동, 브릿지 교정 곡선 | Thermal FW |
| W15 | **Coriolis AFE (ADS1263)** 구동, Drive Coil 공진, Pickup Phase 측정 | Coriolis FW |
| W16 | Sensor Type 자동 인식 (EEPROM ID), 알고리즘 분기 | Sensor Detect |
| W16 | **MGMR 연산 엔진** — Gas Profile Table 7종 + GCF 적용 | MGMR FW |
| W17 | **Piezo HV Driver** 브링업 (PDU150/DRV2700), DAC→HV 매핑 | Valve FW (Piezo) |
| W17 | **Solenoid 비례 Driver** — 전류원 PWM, Dither 보상 | Valve FW (Solenoid) |
| W18 | **PID 폐루프 (1ms 주기)**, 응답 시간 측정 및 튜닝 | PID FW |
| W18 | **Auto PID Function** — 환경 적응형 자동 튜닝 알고리즘 | AutoPID FW |
| W19 | **Zero Calibration Function** 완성, Button Long Press 플로우 | ZeroCal FW |
| W19 | **Sub-Protocol Type A** 통합 — PIO+RS485 Xerix 규격 완성 | PIO+RS485 Done |
| W20 | **Sub-Protocol Type B** 통합 — DeviceNet (MCP2515), **ODVA EDS 파일** | DeviceNet Done |
| W20 | **Sub-Protocol Type C** 통합 — **ET1100 SPI PDI**, **SSC Tool**, **ESI 파일** | EtherCAT Done |
| W21 | TwinCAT3로 EtherCAT Slave 인식 + **DC SYNC0 1ms 동기화** 검증 | ECAT Validated |
| W21 | **3종 프로토콜 DIP SW 자동 전환** 통합 시험 | Full Protocol |

#### Phase 5 — 성능 검증 및 납품 (W22~26)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W22 | **응답 시간 측정** — 10SLM @ 0.5s 목표 + 1초 이내 확실 검증 | 응답 보고서 |
| W22 | **정밀도 시험** — 소수점 2자리 / F.S. 대비 오차 측정 | 정확도 보고서 |
| W23 | **일반 Gas Line Type 검증** (N₂/Ar 실유량 시험) | GasLine 보고서 |
| W23 | **IGS Type 검증** (SEMI 표준 대응 시험) | IGS 보고서 |
| W24 | EMI/EMC 설계 고려 사전 시험 (외부 기관 위탁) | EMI Pre-Test |
| W24 | 72시간 연속 안정성 + 온도 드리프트 시험 | Stability 보고서 |
| W25 | 문제점 수정 및 FW v1.0 Release Candidate | FW v1.0 RC |
| W25 | **사용자/서비스 매뉴얼 + 교정 절차서** (한국어) | Docs |
| W26 | **최종 시제품 납품** (15장) + 산출물 전체 이관 + 교육 세션 | **납품 완료 ✅** |

### 7.4 Wishket 기존 마일스톤과의 정합성

Wishket 원 요구 마일스톤(회로도 2주 / PCB 5주 / FW 통합 8주)은 **범위 확장(3프로토콜 + 2센서 + EtherCAT)** 으로 인해 6개월 일정으로 재구성되었습니다. 단계별 산출물은 Xerix 요구 수준을 모두 충족합니다.

---

## 8. 조직 구성

### 8.1 투입 인력

| 역할 | 인원 | 투입률 | 주요 담당 |
|---|:---:|:---:|---|
| **프로젝트 리더 / 펌웨어 Lead** | 1 (Senior 10년+) | 5 MM (5개월) | 아키텍처, PID, EtherCAT, MGMR, 통합, 고객 접점 |
| **하드웨어 엔지니어** | 1 (Mid 5~10년) | 2 MM (집중 투입) | 회로 설계, PCB 아트웍, 전원, 밸브 Driver |
| **테스트/검증** | 1 (Part) | 1.2 MM (20%) | 유량 벤치, 성능 측정, 문서화 |

- **총 투입**: **8.2 MM** (리더 5MM + H/W 2MM + 테스트 1.2MM)
- **인력 운영 전략**: 프로젝트 리더가 펌웨어 전 영역(PID/AutoPID/MGMR/RS485/DeviceNet/EtherCAT/Display/UART) 통합 책임, 하드웨어 엔지니어는 Phase 1~2(회로/PCB) 집중 투입 후 W11 이후 원격 지원 체계로 전환

### 8.2 프로젝트 관리

- **주간 보고**: 매주 Xerix 창구에 진행 상황 및 이슈 공유
- **월간 리뷰**: Phase 종료 시 Xerix 현장 방문 또는 원격 데모
- **이슈 트래킹**: GitHub / Notion 기반 공유 (Xerix 접근 권한 제공)
- **설계 검토 (Design Review)**: Phase 1 종료 시 / Phase 2 종료 시 Xerix Peer Review 세션

---

## 9. 개발 비용

### 9.1 비용 총괄

| 구분 | 금액 (KRW) | 비율 |
|---|---:|:---:|
| **인건비** | 34,000,000 | 68.4% |
| **하드웨어** | 11,535,000 | 23.2% |
| **소프트웨어 / 라이선스** | 1,800,000 | 3.6% |
| **관리비 + 예비비** | 2,367,000 | 4.8% |
| **합계 (VAT 별도)** | **49,702,000** | 100% |

> **총 개발 비용: 49,702,000원 (VAT 별도)**
> **약 4,970만원**

### 9.2 인건비 상세

| 역할 | 단가 (월) | MM | 소계 |
|---|---:|:---:|---:|
| 프로젝트 리더 / 펌웨어 Lead | 4,000,000 | 5.0 | 20,000,000 |
| 하드웨어 엔지니어 | 4,000,000 | 2.0 | 8,000,000 |
| 테스트/검증 (20%) | 5,000,000 | 1.2 | 6,000,000 |
| **인건비 합계** | | **8.2 MM** | **34,000,000** |

> 프로젝트 리더는 펌웨어 전 영역(PID/AutoPID/MGMR/프로토콜 3종/UART/Display/Auto-Tune)을 단일 책임으로 개발합니다. 하드웨어 엔지니어는 Phase 1~2(회로 설계 + PCB 아트웍 + Rev.A 조립)에 집중 투입 후 이슈 발생 시 원격 지원 체계로 전환합니다.

### 9.3 하드웨어 비용 상세

#### 9.3.1 개발 보드 / 평가 키트

| 항목 | 수량 | 단가 | 소계 |
|---|:---:|---:|---:|
| Nucleo-F429ZI | 2 | 80,000 | 160,000 |
| **ET1100 개발 보드** (EasyCAT/Beckhoff EVB) | 1 | 500,000 | 500,000 |
| ADS1220 EVB (Thermal AFE) | 1 | 400,000 | 400,000 |
| ADS1263 EVB (Coriolis AFE) | 1 | 500,000 | 500,000 |
| PiezoDrive PDU150 | 1 | 700,000 | 700,000 |
| TI DRV2700 EVM | 1 | 150,000 | 150,000 |
| Piezo Stack 샘플 (Noliac) | 2 | 350,000 | 700,000 |
| Solenoid 비례밸브 샘플 | 2 | 250,000 | 500,000 |
| Pressure Sensor (Honeywell) | 5 | 80,000 | 400,000 |
| MCP2515/MCP2551 모듈 (DeviceNet) | 2 | 50,000 | 100,000 |
| **소계** | | | **4,110,000** |

#### 9.3.2 커스텀 PCB 제작

| 항목 | 수량 | 단가 | 소계 |
|---|:---:|---:|---:|
| Main PCB Rev.A (110×70mm, 4층) | 10 | 55,000 | 550,000 |
| Main PCB Rev.B (수정) | 5 | 55,000 | 275,000 |
| Sub-Protocol PCB 3종 각 10장 | 30 | 22,000 | 660,000 |
| Sensor PCB 2종 각 10장 | 20 | 22,000 | 440,000 |
| SMT 조립 1 Lot (Main 5 + Sub×3×3 + Sensor×2×3) | - | - | 3,000,000 |
| BOM 부품 (Rev.A + 보수용) | - | - | 2,500,000 |
| **소계** | | | **7,425,000** |

#### 9.3.3 하드웨어 합계

| 항목 | 금액 |
|---|---:|
| 개발 보드 / 평가 키트 | 4,110,000 |
| 커스텀 PCB 제작 | 7,425,000 |
| **하드웨어 합계** | **11,535,000** |

> ※ 테스트/계측 장비(기준 MFM, Beckhoff EK1100, CAN Analyzer, TwinCAT3 등)는 **UTTEC 기존 보유 장비** 또는 **Xerix 현장 장비 활용**을 전제로 하며, 본 항목에는 포함되지 않습니다.

### 9.4 소프트웨어 / 라이선스

| 항목 | 금액 |
|---|---:|
| **ETG 가입비 (EtherCAT Vendor ID + SSC Tool)** | 1,800,000 |
| STM32CubeIDE, X-CUBE-ECAT, SOEM | 0 |
| OR-CAD Capture / Allegro PCB Editor (UTTEC 기보유) | 0 |
| **S/W 라이선스 합계** | **1,800,000** |

> ※ DeviceNet 관련 ODVA 가입은 Phase 4 착수 전 Xerix와 협의하여 진행합니다.
> ※ EtherCAT Conformance Test 공식 인증은 양산 단계에서 별도 진행합니다 (본 계약 범위 외).

### 9.5 관리비 / 예비비

| 항목 | 비율 | 금액 |
|---|:---:|---:|
| 관리비 (사무/통신/출장) | 3% | 1,420,000 |
| 예비비 (리스크 대응) | 2% | 947,000 |
| **소계** | 5% | **2,367,000** |

> ※ EMI 사전 시험, 가스 누설/내압 시험, 문서 번역, 출장 지원 등 **외주 항목은 본 계약 범위 외**로 분리하며, 필요 시 Xerix와 개별 협의합니다.

### 9.6 지급 조건

| 시점 | 비율 | 금액 |
|---|:---:|---:|
| 계약 체결 (착수금) | 20% | 9,940,000 |
| Phase 1 완료 (회로도 Review) | 15% | 7,455,000 |
| Phase 2 완료 (Rev.A 조립) | 20% | 9,940,000 |
| Phase 4 완료 (통합 동작) | 25% | 12,426,000 |
| 최종 납품 검수 완료 | 20% | 9,941,000 |
| **합계** | **100%** | **49,702,000** |

---

## 10. 리스크 관리

| # | 리스크 | 영향 | 확률 | 대응 |
|:---:|---|:---:|:---:|---|
| R1 | ET1100 포팅 난이도 및 자료 부족 | 🔴 | 中 | Beckhoff 공식 AN + SOEM 오픈소스 병행, Phase 3에 +1주 예비 |
| R2 | Coriolis 센서 헤드 조달 리드타임 | 🔴 | 中 | Phase 0 W1에 Xerix에 공급 주체 확인, OEM 병행 협상 |
| R3 | 110×70mm 공간 제약 | 🟡 | 中 | 3-Board 분리 + 고밀도 레이아웃, UTTEC 기존 고밀도 설계 경험 활용 |
| R4 | ±15V 전원 + 탄탈륨 금지 조건 | 🟡 | 低 | BOM 리뷰 체크리스트 + Peer Review 필수화 |
| R5 | Coriolis 위상차 노이즈 | 🟡 | 中 | Lock-in Amplifier + 24bit ΔΣ ADC + DMA 연속 샘플링 |
| R6 | RS485 Protocol 규격서 수령 지연 | 🟡 | 中 | Phase 0 착수 조건으로 명시, 지연 시 일정 자동 순연 조항 |
| R7 | 0.5s @ 10SLM 응답 미달성 | 🟡 | 中 | Piezo 라인 우선 튜닝, 스펙 상호 조정 여지 확보 |
| R8 | IGS Type 표준 불명확 | 🟢 | 低 | Phase 0에서 SEMI F81 등 준수 기준 Xerix 확인 |
| R9 | 부품 리드타임 (ET1100/PHY/AFE) | 🟡 | 中 | Phase 0 W1 즉시 발주, Digi-Key/Mouser 직접 수입 병행 |
| R10 | 일정 지연 (전형 10~15%) | 🟡 | 中 | 예비비 + Phase 병렬 진행 + Buffer Week 확보 |

---

## 11. 성공 기준 및 검수 조건

| 항목 | 기준 | 측정 방법 |
|---|---|---|
| **응답 시간** | 1초 이내 확실, **10SLM @ 0.5s 목표** | 오실로스코프 실측 |
| **정밀도** | **소수점 2자리** (F.S. 대비 ±0.5% 목표) | 기준 MFM 대비 교정 |
| **재현성** | < 0.5% F.S. (10회 반복) | 통계 처리 |
| **RS485 통신** | Xerix 지정 Protocol 완전 대응 | 통합 시험 |
| **EtherCAT 통신** | **1ms 주기 99.9% 이상**, TwinCAT3 인식 OK | TwinCAT3 Scope |
| **DeviceNet 통신** | **ODVA Conformance Simulator 통과** | CAN Analyzer |
| **Auto PID** | 환경(±10°C, ±10% 압력) 변화 시 재수렴 | 환경 챔버 시험 |
| **Zero Calibration** | Button2 단독 누름으로 **오프셋 < 0.1% F.S.** | 버튼 시험 |
| **MGMR** | 등록 가스 **7종 이상 GCF 자동 적용** | UART 명령 시험 |
| **누설 (He Leak)** | < 1×10⁻⁹ atm·cc/s | 헬륨 누설 시험기 |
| **IGS Type 검증** | Xerix 지정 SEMI 표준 준수 | 외부 시험 기관 |
| **EMI (설계 고려)** | Class A 수준 설계 검토 | 사전 시험 외주 |
| **전원 안정성** | +24V ±10% / ±15V ±5% 범위 내 정상 동작 | 전원 변동 시험 |

---

## 12. 산출물

### 12.1 설계 문서

- [ ] 시스템 아키텍처 문서
- [ ] 회로 설계서 (**OR-CAD Schematic 원본** + PDF)
- [ ] PCB 레이아웃 (**Allegro 원본** + Gerber + Drill + Pick&Place)
- [ ] **BOM** (부품 속성 포함, +24V 탄탈륨 금지 검증 완료)
- [ ] 기구 인터페이스 도면 (D-SUB 09P Male 핀맵, 센서 장착 IF)
- [ ] 전원 설계 검토서 (+24V / ±15V)

### 12.2 펌웨어

- [ ] STM32F429 펌웨어 소스 전체 (컴파일 환경 가이드 포함)
- [ ] **EtherCAT ESI 파일** (Xerix_MFC.xml)
- [ ] **DeviceNet EDS 파일**
- [ ] RS485 Protocol 구현 문서
- [ ] CoE Object Dictionary
- [ ] Coriolis/Thermal 신호처리 알고리즘 문서
- [ ] PID 파라미터 튜닝 리포트
- [ ] MGMR Gas Profile 테이블

### 12.3 시험/검증

- [ ] 단위 시험 결과서
- [ ] 성능 시험 보고서 (응답/정확도/재현성/안정성)
- [ ] EMI 사전 시험 보고서
- [ ] 누설/내압 시험 보고서
- [ ] IGS Type 검증 보고서

### 12.4 납품품 및 문서

- [ ] 조립 완료된 시제품 — **Main 5 + Sub-Protocol 3종×3 + Sensor 2종×3 = 총 20장**
- [ ] 사용자 매뉴얼 (한국어)
- [ ] 서비스 매뉴얼 + 교정 절차서
- [ ] 조립 작업 지시서
- [ ] **모든 원본 파일 및 소스코드 일체 이관** (IP 전부 Xerix 귀속)

> ※ 납품 수량은 계약 체결 시 최종 협의하며, 위 수량은 UTTEC 제안 기본 수량입니다.

---

## 13. 계약 조건

### 13.1 주요 계약 사항

- **계약 기간**: 6개월 (계약 체결일 기준, RS485 Protocol 규격서 수령일을 D-day로 조정 가능)
- **지식재산권**: **산출물 일체의 지식재산권은 Xerix에 귀속**
- **원본 파일 이관**: 개발 완료 시 OR-CAD/Allegro 원본, 펌웨어 소스 전부 이관
- **부품 수급 지연**: 부품 수급 지연 발생 시 일정은 상호 협의하여 조정
- **하자 보증**: 납품 검수 완료 후 **12개월 무상 하자 보증**
- **비밀 유지**: 프로젝트 관련 정보 일체 NDA 적용

### 13.2 계약 전 필수 합의 사항

- **RS485 Protocol 규격서**: 계약 체결 후 즉시 제공 (개발 착수일 기준점)
- **D-SUB 09P Male 공식 핀맵 도면**: Kick-off 시점 제공
- **Coriolis 센서 헤드 공급 주체**: Xerix 또는 Xerix 지정 OEM
- **기준 Mass Flow Meter**: Xerix 보유품 대여 또는 별도 렌탈 협의

### 13.3 변경 관리

- 계약 범위 변경 요청 시 **변경 관리 절차** 적용
- 범위/일정/비용 변경은 상호 서면 합의 후 반영
- 경미한 사양 조정은 주간 보고에서 협의 처리

---

## 14. 사전 확인 사항

본 제안서의 정확한 수행을 위해, 계약 체결 전 또는 Kick-off 시점에 Xerix의 공식 회신이 필요한 사항입니다.

### 14.1 🔴 Critical (범위/일정 확정 필수)

| # | 질의 | UTTEC 디폴트 가정 |
|:---:|---|---|
| Q1 | 3종 프로토콜(PIO+RS485/DeviceNet/EtherCAT)을 Phase 1에 전부 포함 | ✅ 전부 포함 |
| Q2 | 첫 양산 우선 프로토콜 | EtherCAT 우선 |
| Q3 | Coriolis 센서 헤드 공급 주체 | Xerix 공급 |
| Q4 | Premium 라인(Coriolis + Piezo)도 6개월 내 완료 | 포함 |

### 14.2 🔴 Critical (하드웨어)

| # | 질의 | UTTEC 디폴트 가정 |
|:---:|---|---|
| Q5 | PCB 110×70mm 엄수, 3-Board 분리 구조 승인 | 3-Board 승인 전제 |
| Q6 | ±15VDC 공급원 + D-SUB 09P Male 공식 핀맵 도면 | 장비 측 공급 |
| Q7 | +24V 입력단 탄탈륨 금지 — 양산 BOM에도 적용 | 양산에도 적용 |
| Q8 | ET1100 지정 배경 (상호운용성/고객사 요구) | 고객사 요구 |
| Q8-1 | ESI 파일 Vendor ID / Product Code 체계 | UTTEC가 ETG 가입 |
| Q8-2 | EtherCAT Conformance Test 공식 인증 | Self-Declaration |
| Q9 | OR-CAD/Allegro 엄수 vs 대안 허용 | OR-CAD/Allegro 준수 |
| Q10 | Main PCB 4영역 분할 해석 (제어+전원 병합) | 병합 허용 전제 |

### 14.3 🟡 Important (기능/사양)

| # | 질의 | UTTEC 디폴트 가정 |
|:---:|---|---|
| Q11 | 정밀도 "소수점 2자리" 기준 (SLM 절대값 vs F.S.%) | F.S. 0.01% |
| Q12 | 0.5s @ 10SLM 응답 — 가스라인 물리 구성 확정 | N₂ 기준 N.C. 라인 |
| Q13 | Auto PID "환경 변화 적응" 수준 (1회 vs 재튜닝) | 환경 적응형 |
| Q14 | MGMR 대상 가스 리스트 | N₂/He/Ar/H₂/O₂/CO₂/SF₆ |
| Q15 | IGS Type 검증 표준 (SEMI F81 등) | SEMI F81 |
| Q16 | Display 재확인 (OLED 1인치 이하 확정) | SSD1306 128×64 |
| Q17 | Button 배치 및 방수 등급 | PCB 직장착 |
| Q18 | Status LED 형태 (개별/듀얼/광파이프) | 2mm 각형 × 2 |

### 14.4 🟢 Standard (계약/납품)

| # | 질의 | UTTEC 디폴트 가정 |
|:---:|---|---|
| Q19 | **RS485 Protocol 상세 규격서** 전달 예정일 | Kick-off 시 수령 |
| Q20 | 시제품 납품 수량 | Main 5 + Sub×3×3 + Sensor×2×3 (20장) |
| Q21 | 산출물 IP 귀속 계약서 조항 | Xerix 100% 귀속 |
| Q22 | EMI/EMC 검증 수준 (설계 고려 vs 정식 인증) | 설계 고려 수준 |
| Q23 | 검수 장소/방법 (UTTEC 사내 vs Xerix 현장) | UTTEC 사내 검수 후 납품 |
| Q24 | 양산 이관 본 계약 포함 여부 | 별도 계약 |
| Q25 | 하자 보증 기간 | 납품 후 12개월 |

---

## 15. 연락처

### 15.1 제안사 (UTTEC)

| 구분 | 내용 |
|---|---|
| **회사명** | UTTEC |
| **대표** | 홍광선 |
| **Email** | ihong@uttec.co.kr |
| **프로젝트 책임** | 홍광선 대표 (본 제안서 문의) |

### 15.2 제안 수신 (Xerix)

| 구분 | 내용 |
|---|---|
| **회사명** | Xerix |
| **담당** | 유진기 선임 |
| **Email** | jkyu@xerix.co.kr |
| **참조 메일** | 2026-04-08 16:37, "MFC 개발 사양서" |

---

## 📌 제안서 요약

| 항목 | 내용 |
|---|---|
| **프로젝트** | Xerix 반도체 공정용 MFC Controller 개발 |
| **범위** | **전체 요구사양 100% 포함** (3프로토콜 + 2센서 + Piezo/Solenoid + ET1100) |
| **아키텍처** | 3-Board 모듈형 (Main 110×70mm + Sub-Protocol 3종 + Sensor 2종) |
| **MCU / ESC** | STM32F429ZI + **BECKHOFF ET1100** + KSZ8041NL ×2 |
| **전원** | +24V + ±15V (D-SUB 09P Male, 탄탈륨 금지 준수) |
| **설계 툴** | OR-CAD / Allegro |
| **개발 기간** | **6개월 (26주)** |
| **투입 인원** | 리더 1명(5MM) + H/W 엔지니어 1명(2MM) + 테스트 파트(1.2MM), 총 **8.2 MM** |
| **총 개발 비용** | **49,702,000원** (VAT 별도, 약 4,970만원) |
| **지급 조건** | 5단계 분할 (착수 20% / P1 15% / P2 20% / P4 25% / 납품 20%) |
| **지식재산권** | Xerix 100% 귀속 |
| **하자 보증** | 납품 후 12개월 |
| **시제품 수량** | 총 20장 (Main 5 + Sub 3×3 + Sensor 2×3) |

---

UTTEC은 본 제안서를 통해 **Xerix의 MFC Controller 개발 목표를 완전히 달성**할 수 있음을 확인드립니다.

**전체 요구사양을 100% 포함하는 통합 제안**이며, 6개월 내 시제품 납품을 약속드립니다.

제안서 관련 문의 및 미팅 일정은 언제든지 환영합니다.

**감사합니다.**

---

**제출일**: 2026-04-09
**제출**: UTTEC 대표 홍광선
**문서**: Xerix_MFC_Controller_개발_제안서_UTTEC_v1.0.md
