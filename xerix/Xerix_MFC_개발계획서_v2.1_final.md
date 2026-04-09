# Xerix MFC Controller 개발계획서 v2.1 (Final)

> **프로젝트명**: Xerix 반도체 공정용 MFC (Mass Flow Controller) Controller 개발
> **발주사**: Xerix (창구: 유진기 선임, jkyu@xerix.co.kr)
> **수행사**: UTTEC (창구: 홍광선 대표, ihong@uttec.co.kr)
> **문서 버전**: v2.1 (Final)
> **작성일**: 2026-04-09
> **기준 문서**:
> - **[PRIMARY]** Xerix MFC 개발 사양서 메일 (2026-04-08, 유진기 선임) → `Xerix_MFC_요구사양서_20260408.md`
> - **[PRIMARY]** 미팅 구두 합의사항 (EtherCAT/DeviceNet 추가, ET1100 지정)
> - **[SUPPLEMENT]** Wishket 프로젝트 모집 원문 → `wishket.txt` (누락 기본 요건 보완용)

---

## 0. 문서 작성 방침

1. **본 계획서의 기술 요구사항 기준은 Xerix 메일 + 미팅 합의사항**이다.
2. **Wishket 원문**은 *메일/미팅에 명시되지 않은 기본 요건(전원/커넥터/PCB 규격/툴/IP 귀속 등)*을 확인하기 위한 **보조 자료**로 활용한다.
3. **개발 기간 = 6개월** 고정 조건으로 Phase를 역산하여 배치한다.
4. 개발 비용은 "기간 × 인원 × 필수 절차(H/W/S/W/테스트/인증준비)"를 기준으로 산정한다.
5. **사전 확인/검토 필요사항**은 별도 Section 10에 통합 정리하여 **계약 착수 전 Xerix 회신**으로 확정해야 한다.

---

## 1. 프로젝트 개요

### 1.1 목적
반도체 공정용 가스/유체의 정밀 유량 측정 및 제어를 위한 **MFC Controller** 개발.
상위 제어기와 **3종 산업 프로토콜(PIO+RS485 / DeviceNet / EtherCAT)** 중 DIP SW로 선택 연동 가능한 **모듈형 아키텍처**로 설계한다.

### 1.2 최종 확정 사양

| 항목 | 사양 | 근거 |
|---|---|---|
| 제어 MCU | **STM32F429ZI** (LQFP144, Flash 2MB, RAM 256KB) | 메일(STM32Fx 계열) + 자료 풀 |
| EtherCAT ESC | **BECKHOFF ET1100** (SPI PDI) + KSZ8041NL ×2 PHY | 메일 지정 |
| 센서 방식 | **Thermal + Coriolis** (DIP SW 전환, Sensor PCB 2종 분리) | 메일 |
| 압력 보상 | **Pressure Sensor 내장**, PID 보정 연산 | 메일 |
| 밸브 | Piezo Stack(Premium) / Solenoid 비례(Standard) | 미팅 |
| 통신 프로토콜 | PIO+RS485 / DeviceNet / EtherCAT **3종 Sub-Board 플러그** (DIP SW 2ch) | 메일 |
| Analog I/O | 0~5VDC / 4~20mA (DIP SW 1ch) | 메일 + Wishket |
| 응답 시간 | **1초 이내 확실, 10SLM @ 0.5초 목표** | 메일 |
| 정밀도 | **소수점 2자리 목표** (불가 시 1자리) | 메일 |
| Display | **1인치 이하 OLED (SPI)** — XERiX 로고 + 유량 표시 | 메일 + Wishket |
| 조작부 | **Button1 / Button2** (전면) + Green/Red Status LED | 메일 + Wishket |
| UART | UART1 Debug ("HIX"→"XERIX") + UART2 Customer ("HIC"→"CUSTOMER") | 메일 |
| 부가 기능 | **Zero Calibration**, **Auto PID (환경 적응형)**, **MGMR (가스 보정)** | 메일 + Wishket |
| 전원 | **+24VDC + ±15VDC** 입력, **+24V 탄탈륨 금지**, **D-SUB 09P Male** 커넥터 | **Wishket 보완** |
| PCB | **110 × 70 mm** 규격 (Main PCB 기준, Sub-Protocol/Sensor는 별도 소형 보드) | **Wishket 보완** |
| 설계 툴 | **OR-CAD / Allegro** | **Wishket 보완** |
| 검증 | 일반 Gas Line + IGS Type | 메일 |
| 지식재산권 | **클라이언트(Xerix) 귀속** | **Wishket 보완** |

### 1.3 제품 라인업 전략

| 라인 | 센서 | 밸브 | 프로토콜 | 타겟 |
|---|---|---|---|---|
| **Base** | Thermal | Solenoid 비례 | PIO+RS485 | 유틸리티/저가 장비 |
| **Standard** | Thermal | Solenoid 비례 | PIO+RS485 + DeviceNet | 일반 공정 |
| **Premium** | Coriolis | Piezo Stack | EtherCAT (ET1100) | 반도체 공정 챔버 |

---

## 2. 시스템 아키텍처

### 2.1 3-Board 모듈 구조

```
┌─────────────────────────────────────────────────────────────────┐
│ Xerix MFC Controller — 3-Board Modular Architecture               │
│                                                                   │
│ ┌──────────────────────────────┐                                 │
│ │  MAIN CONTROL PCB (110×70mm) │                                 │
│ │  STM32F429ZI                 │                                 │
│ │                              │  ┌──────────────────────┐      │
│ │  ┌──────┐ ┌──────┐           │  │  SENSOR PCB (Type A) │      │
│ │  │DIP×4 │ │OLED  │           │◀─┤  Thermal Bridge +    │      │
│ │  └──────┘ └──────┘           │  │  Pressure Sensor     │      │
│ │  ┌──────┐ ┌──────┐           │  └──────────────────────┘      │
│ │  │Btn1/2│ │LED×2 │           │                                 │
│ │  └──────┘ └──────┘           │  ┌──────────────────────┐      │
│ │  PID Engine (1ms DC SYNC0)   │  │  SENSOR PCB (Type B) │      │
│ │  MGMR / Zero Cal / Auto PID  │◀─┤  Coriolis U-Tube +   │      │
│ │  UART1 (HIX) / UART2 (HIC)   │  │  Drive/Pickup +Press │      │
│ │  Analog 0-5V / 4-20mA        │  └──────────────────────┘      │
│ │  +24V / ±15V Power Mgmt      │                                 │
│ │  D-SUB 09P Male              │  ┌──────────────────────┐      │
│ │                              │  │ SUB-PROTOCOL PCB     │      │
│ │                              │──┤ Type A: PIO+RS485    │      │
│ │                              │  │ Type B: DeviceNet    │      │
│ │                              │  │ Type C: EtherCAT     │      │
│ │                              │  │  (ET1100+KSZ8041×2)  │      │
│ │                              │  └──────────────────────┘      │
│ └──────────────────────────────┘                                 │
│         │                                                         │
│         ▼                                                         │
│  ┌─────────────────┐                                              │
│  │ ACTUATOR         │  Piezo Stack / Solenoid 비례 Valve           │
│  │ + GAS LINE       │                                              │
│  └─────────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Wishket "4영역 분할" 규정 반영

Wishket 원문의 *"센서부 / 제어부 / 조작부 / 전원부 분할 설계"*는 본 3-Board 구조에서 다음과 같이 해석/준수한다:

| 영역 | 배치 위치 |
|---|---|
| **센서부** | 별도 Sensor PCB (Thermal / Coriolis 2종) |
| **제어부** | Main PCB 중앙 (STM32F429ZI + PID + UART) |
| **조작부** | Main PCB 전면 (OLED + Btn1/2 + Green/Red LED) |
| **전원부** | Main PCB 한쪽 구역 (+24V/±15V 입력, 전원 변환, 제어부와 병합 가능) |

> Wishket 원안은 단일 PCB 4영역이었으나, **미팅 시 3프로토콜 확장**으로 SubProtocol Board 분리가 불가피하다. Xerix에 본 구조의 명시적 승인을 Section 10에서 확인한다.

### 2.3 주요 하드웨어 IC

| 모듈 | 구성 | 핵심 IC |
|---|---|---|
| **MCU** | STM32F429ZI | STMicro |
| **EtherCAT ESC** | ET1100 + 2× KSZ8041NL + H1102NL 트랜스포머 | Beckhoff + Microchip + Pulse |
| **DeviceNet CAN** | MCP2515 + MCP2551 | Microchip |
| **RS485** | THVD1500 (광절연 선택) | TI |
| **Thermal AFE** | ADS1220 (24bit, 브릿지 입력) | TI |
| **Coriolis AFE** | ADS1263 (32bit, 5ch) + Drive Coil Amp | TI |
| **Pressure Sensor** | Honeywell SSCDANN005PGAA5 (0~5bar, I²C/Analog) | Honeywell |
| **Piezo Driver** | PiezoDrive PDU150 / TI DRV2700 | - |
| **Solenoid Driver** | DRV8251A + 전류 검출 | TI |
| **OLED** | SSD1306 0.96" (128×64, SPI) | Univision |
| **전원 변환** | TPS54360 (24V→5V), LDO (±15V→±12V/5V) | TI |

### 2.4 EtherCAT ESC — BECKHOFF ET1100 선정 분석 (장단점)

> **배경**: Xerix 메일 명시 *"ETHERCAT — BECKHOFF ET1100 적용, ESI 등 다운로드 필요"*
> 본 섹션은 Xerix의 ET1100 지정이 프로젝트에 미치는 영향을 장단점으로 분석하고, 수용/대응 방안을 제시한다.

#### 2.4.1 ET1100 개요

| 항목 | 내용 |
|---|---|
| 제조사 | **Beckhoff Automation** (EtherCAT 원천 기술 보유사) |
| 칩 종류 | 전용 **EtherCAT Slave Controller (ESC)** ASIC |
| 패키지 | BGA128 (17×17 mm, 1.0 mm pitch) |
| 포트 수 | **최대 4 포트** (Daisy-chain + Junction + 분기 지원) |
| PHY | **외장 PHY 필수** (MII 인터페이스, KSZ8041NL / DP83848 / LAN8720 등) |
| PDI (Process Data Interface) | **SPI / 16bit Parallel / 8bit Parallel / Digital IO** 선택 |
| DC (Distributed Clock) | **완전 지원** (SYNC0/SYNC1, LATCH0/1, Reference Clock) |
| FMMU | **8개** |
| SyncManager | **8개** |
| 내장 RAM | 4 KB Process Data Memory |
| EEPROM IF | I²C (24Cxx, SII 저장) |
| 공급 전원 | 3.3V Core + I/O 3.3V/2.5V |
| 표준 가격 | 약 $20~25 @ 100ea (단품) |

#### 2.4.2 장점 (ET1100 지정의 긍정적 효과)

| # | 장점 | 설명 |
|:---:|---|---|
| ✅ 1 | **EtherCAT 원천 기술 호환성 최상** | Beckhoff 본가 ESC로, TwinCAT3/EL 모듈 및 타사 마스터와의 **상호운용성 최고 수준**. 반도체 공정 장비에서 Beckhoff 컨트롤러를 쓰는 경우가 많아 Xerix 고객사에 유리 |
| ✅ 2 | **EtherCAT 인증(Conformance Test) 통과 안정성** | ETG 공식 인증 절차에서 **검증된 레퍼런스 플랫폼**. 경쟁 칩(LAN9252/AX58100)보다 인증 이슈가 적음 |
| ✅ 3 | **풀 기능 ESC 스펙** | FMMU 8개 / SyncManager 8개 / DC 완전 지원 / 최대 4포트 → LAN9252(FMMU 3개, 2포트)보다 **상위 기능** |
| ✅ 4 | **PDI 선택 유연성** | SPI 외에 **Parallel 16bit** 사용 시 STM32 FSMC로 고속 DPRAM 액세스 가능 (SPI 대비 ~5배 대역폭). 향후 고속화 여지 |
| ✅ 5 | **DC(Distributed Clock) 완성도** | 1ms 이하 정밀 동기화(지터 < 100ns) 보장 → Xerix 요구 1ms PID 주기 + 다중 슬레이브 동기 제어에 유리 |
| ✅ 6 | **SSC(Slave Stack Code) Tool 완벽 호환** | Beckhoff 제공 SSC Tool이 ET1100을 **기본 타겟**으로 설계됨. ESI 파일 생성/편집이 가장 원활 |
| ✅ 7 | **풍부한 Reference Design** | Beckhoff 공식 레퍼런스 + ETG 회원사 자료 + 다수 상용 제품(Omron, Delta, Panasonic 등)에서 채택 → **검증된 토폴로지** 참조 가능 |
| ✅ 8 | **4 포트 확장 여력** | 향후 **Junction Slave** 요구 시(예: MFC 2대 직렬 + 분기 제어) 칩 교체 없이 확장 가능 |
| ✅ 9 | **장기 공급(Long-term Supply) 안정성** | Beckhoff는 EtherCAT 생태계 주도사로 **10년+ 공급 보장**. 반도체 장비의 긴 수명에 적합 |
| ✅ 10 | **Xerix 브랜드 신뢰성** | "BECKHOFF ET1100 기반" 표기가 **영업/마케팅 관점에서 프리미엄 이미지** 형성 |

#### 2.4.3 단점 (ET1100 지정의 부정적 효과)

| # | 단점 | 설명 | 대응 |
|:---:|---|---|---|
| ⚠️ 1 | **외장 PHY 필수** | LAN9252는 PHY 내장이지만 ET1100은 **MII 외장 PHY 2~4개 필요** → 부품 수 증가, 레이아웃 복잡화 | KSZ8041NL ×2 + H1102NL 트랜스포머 ×2 채택, 100Ω 차동 임피던스 레이아웃 |
| ⚠️ 2 | **PCB 면적 증가** | ET1100 BGA128 (17×17mm) + PHY ×2 (각 7×7mm) + 트랜스포머 ×2 + RJ45 ×2 → **약 25×50mm 영역 소요** → **110×70mm Main PCB에 탑재 불가** | **Sub-Protocol PCB로 분리** (본 v2.1 3-Board 구조가 이 문제 해결) |
| ⚠️ 3 | **BOM 비용 상승** | ET1100($20) + PHY×2($6) + 트랜스포머×2($4) + 25MHz XTAL + 24LC32 EEPROM = **약 $32** vs LAN9252 단품 **$12** → **양산 원가 +$20/대** | 양산 수량 기반 발주 단가 협상, Premium 라인 전용으로 포지셔닝 |
| ⚠️ 4 | **STMicro 공식 AN 없음** | STM32 공식 X-CUBE-ECAT 패키지는 **LAN9252 기준 AN5397**만 제공. ET1100은 STMicro 공식 지원 문서 없음 | Beckhoff **AN_ET1100_Section_I/II/III** 데이터시트 + Beckhoff **Reference Design** + **SOEM 오픈소스**로 대체 |
| ⚠️ 5 | **한국어 개발 자료 부족** | LAN9252는 국내 커뮤니티/블로그/튜토리얼 다수, ET1100은 **영문 Beckhoff 포럼/ETG 회원 전용 자료** 중심 → 학습 곡선 증가 | 프로젝트 리더가 **영문 데이터시트 정독**, ETG 교육(온라인) 수강, 예비 학습 기간 Phase 0에 포함 |
| ⚠️ 6 | **SPI 포팅 이식성** | X-CUBE-ECAT의 LAN9252 SPI 드라이버를 **ET1100 SPI 명령 포맷으로 재작성** 필요 (커맨드 프레임 다름) → 펌웨어 초기 브링업 공수 증가 | Phase 3 브링업 기간 **+1주 예비**, SOEM Slave Stack 오픈소스 참고 |
| ⚠️ 7 | **SII EEPROM 쓰기 절차 복잡** | 공장 출하 시 ESI 파일을 **I²C EEPROM에 쓰는 JIG/절차** 별도 필요. LAN9252는 개발 보드가 이 과정 표준화되어 있음 | Phase 2에 **ET1100 EEPROM Writer JIG** 개발(반나절 작업) 포함 |
| ⚠️ 8 | **디버깅 복잡성** | 문제 발생 시 "ESC 레지스터 / PHY 상태 / MII 신호 / SPI 프레임"을 **독립 디버깅**해야 함. LAN9252는 단일 칩이라 디버깅이 단순 | SPI 로직 애널라이저 + MII Tap + Wireshark EtherCAT 플러그인 병행 사용 |
| ⚠️ 9 | **소비 전력 증가** | ET1100 + PHY ×2 = 약 **600mW~1W** vs LAN9252 약 400mW → **+500mW 수준 증가** | 전원 설계 시 +5V 레귤레이터 용량 마진 확보 (이미 v2.1 반영) |
| ⚠️ 10 | **리드 타임 리스크** | 국내 소수 유통사만 취급, **ET1100 BGA128 샘플 리드타임 4~8주** 가능성 | **Phase 0 Week 1에 즉시 발주**, Digi-Key/Mouser 직접 수입 병행 |

#### 2.4.4 LAN9252 대비 종합 비교

| 항목 | BECKHOFF ET1100 | Microchip LAN9252 | 우위 |
|---|:---:|:---:|:---:|
| 제조사 | Beckhoff (원천기술) | Microchip | ET1100 |
| 패키지 | BGA128 17×17 | QFN64 10×10 | LAN9252 |
| 포트 | 2~4 | 2 | ET1100 |
| PHY 내장 | ✗ (외장 필수) | ✓ (내장) | LAN9252 |
| PDI | SPI / Parallel / Digital | SPI / HBI | ET1100 |
| FMMU | 8 | 3 | ET1100 |
| SyncManager | 8 | 4 | ET1100 |
| DC 기능 | 완전 지원 | 지원 (제한적 LATCH) | ET1100 |
| Process RAM | 4 KB | 4 KB | 동일 |
| PCB 소요 면적 | 약 1,250 mm² (PHY 포함) | 약 250 mm² | LAN9252 |
| BOM 원가 (주변 포함) | 약 $32 | 약 $12 | LAN9252 |
| STMicro 공식 AN | ✗ | ✓ AN5397 | LAN9252 |
| SSC Tool 호환성 | 최상 (기본 타겟) | 양호 | ET1100 |
| 한국어 자료 | 부족 | 보통 | LAN9252 |
| 개발 난이도 | 중상 | 중 | LAN9252 |
| Conformance 안정성 | 최상 | 양호 | ET1100 |
| 장기 공급 | 매우 안정 (10년+) | 안정 (7년+) | ET1100 |
| Xerix 요구 부합 | **✓ (지정됨)** | ✗ (대안) | **ET1100** |

**결론**:
- **기술적으로 ET1100이 상위 기능**을 제공하며, 특히 **Conformance 안정성 / SSC Tool 호환성 / DC 완성도 / 장기 공급**에서 우수하다.
- **개발 공수/비용/PCB 면적** 측면에서는 LAN9252가 유리하지만, 본 프로젝트는 **Xerix 지정이므로 ET1100 채택**을 최종 결정한다.
- 단점은 모두 **공학적으로 해결 가능**하며, 본 계획서에 대응 방안이 포함되어 있다.

#### 2.4.5 ET1100 수용에 따른 계획서 반영 사항

1. **아키텍처**: Sub-Protocol PCB Type C에 ET1100 + PHY ×2 + RJ45 ×2 탑재 (Main PCB와 분리)
2. **Phase 0 (W1~2)**: ET1100 샘플 즉시 발주 + 리드타임 확인 + 학습 자료 수집
3. **Phase 1 (W5)**: Sub-Protocol Type C 회로 설계에 Beckhoff Reference Design 적용, 100Ω 차동 임피던스 제어
4. **Phase 2 (W10~11)**: **ET1100 EEPROM Writer JIG** 개발 포함
5. **Phase 3 (W11~14)**: SPI PDI 드라이버 **ET1100 전용 포팅** (X-CUBE-ECAT LAN9252 코드 재작성), 예비 +1주
6. **Phase 4 (W20)**: SSC Tool 기반 ESI 파일 작성, TwinCAT3로 인식 검증, DC SYNC0 기반 1ms 동기화
7. **리스크 R1**: "ET1100 포팅 자료 부족" 이미 반영됨 → SOEM 병행 전략 명시
8. **비용**: 하드웨어 BOM에 ET1100 개발 보드 + 주변 부품 반영 (Section 5.2.1)
9. **S/W**: **ETG 가입비 180만원** 반영 (ET1100 SSC Tool + Vendor ID 발급용)
10. **산출물**: "ESI 파일 (Xerix_MFC.xml) Xerix에 이관" 명시 (Section 8.2)

#### 2.4.6 Xerix 회신 필요 사항 (Section 10에 통합)

- **Q8-1**: ET1100 지정의 배경은 (a) Beckhoff 상호운용성 강제 (b) 과거 개발 경험 (c) 고객사 요구 중 어느 것인가?
- **Q8-2**: 향후 "ET1100 공급 중단" 상황 발생 시 **LAN9253/AX58100 등 대안 허용** 조건은?
- **Q8-3**: **ESI 파일** 작성 시 Xerix 공식 **Vendor ID / Product Code / Revision Number** 체계를 제공해 주실 수 있는가? (ETG 가입 여부 확인)
- **Q8-4**: EtherCAT **Conformance Test 공식 인증**을 본 개발에서 수행해야 하는가, 아니면 Self-Declaration으로 충분한가? (공식 인증 시 추가 350만원)

---

## 3. 개발 단계 (Phase) — 6개월 기준

> **총 기간**: 6개월 = 약 26주
> **병렬 진행**: 회로 설계 ↔ 펌웨어 환경 구축, 펌웨어 브링업 ↔ 센서 AFE 튜닝 등 핵심 경로 외 작업은 병렬 배치

### Phase 0 — 사전 협의 및 사양 확정 (Week 1~2)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W1 | Xerix Kick-off 미팅, 확인사항 Q1~Q18 회신 수령, 공식 사양서 합의 | Kick-off 회의록 |
| W1 | RS485 Protocol 규격서 수령, MGMR 가스 리스트 확정 | RS485 Protocol v0 |
| W2 | 부품 리스트 초안(BOM v0.1), 리드타임 조사, 구매 품목 결정 | BOM v0.1 |
| W2 | 시스템 블록도/아키텍처 최종 확정 | Architecture.pdf |

**필수 선제 조건 (PRE-REQUISITE)**
- Xerix로부터 **D-SUB 09P Male 핀맵 도면** 수령
- Xerix로부터 **RS485 Protocol 상세 규격서** 수령
- Xerix로부터 **MGMR 가스 종류 리스트** 수령
- OR-CAD / Allegro 라이선스 및 숙련 인력 확보 확인
- ET1100 / KSZ8041NL / H1102NL 샘플 구매 가능성 및 리드타임 확인

### Phase 1 — 회로 설계 (Week 3~7)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W3 | Main PCB 회로 설계 — MCU + Clock + Reset + JTAG + OLED/Button/LED/DIP | Main Sch v0.1 |
| W3 | 전원부 설계 — +24V/±15V 입력 보호, DC-DC, LDO, D-SUB 09P 핀맵 | Power Sch |
| W4 | Main PCB — Actuator 드라이버 (Piezo HV + Solenoid 옵션), Analog I/O 선택 회로 | Main Sch v0.2 |
| W4 | Main PCB — Main↔Sub-Protocol 인터페이스 커넥터 정의 (SPI+UART+GPIO+Power) | Interface Spec |
| W5 | Sub-Protocol PCB — Type A (PIO+RS485), Type B (DeviceNet) 회로 설계 | Sub-Proto Sch A/B |
| W5 | Sub-Protocol PCB — Type C (EtherCAT, ET1100 + 2×PHY + RJ45) 회로 설계 | Sub-Proto Sch C |
| W6 | Sensor PCB — Type A (Thermal Bridge + Pressure) 회로 설계 | Sensor Sch A |
| W6 | Sensor PCB — Type B (Coriolis Drive/Pickup AFE + Pressure) 회로 설계 | Sensor Sch B |
| W7 | 회로 Review, DRC, 부품 확정, BOM v1.0 | BOM v1.0, Sch Final |

**마일스톤**: Week 7 말 **회로도(Schematic) 설계 완료** ✅

### Phase 2 — PCB 아트웍 및 제작 발주 (Week 8~11)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W8 | Main PCB 아트웍 — **110×70mm 4영역 분할 배치**, 4~6층 스택업, 임피던스 제어(PHY 100Ω 차동) | Main Layout v0.1 |
| W8 | Sub-Protocol PCB 아트웍 3종 (소형) | Sub-Proto Layout |
| W9 | Sensor PCB 아트웍 2종 | Sensor Layout |
| W9 | DRC/ERC, Silk 정리, Assembly Drawing | Gerber + Drill |
| W10 | PCB 제작 발주 (2회전 여유 확보 위해 Rev.A 10장 제작) | PCB 발주서 |
| W10 | SMT 부품 발주 (ET1100 BGA, STM32F429, Sensor AFE 포함) | 부품 발주 |
| W11 | PCB 수령 + SMT 조립 (3장 Main + 3장 Sub × 3Type + 3장 Sensor × 2Type) | Rev.A 보드 |

**마일스톤**: Week 11 말 **PCB Rev.A 조립 완료** ✅

### Phase 3 — 저수준 펌웨어 브링업 (Week 9~14) *(PCB 아트웍과 병렬)*

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W9 | STM32CubeIDE 프로젝트 구성, Nucleo-F429ZI로 초기 코드 작성 | Project Skeleton |
| W10 | HAL Driver 환경 구축 — Clock/GPIO/SPI/DAC/ADC/UART/TIM | Base FW |
| W11 | 보드 수령 후 기본 동작 확인 — Blinky, UART Console, JTAG Debug | Boot OK |
| W12 | OLED (SSD1306) 드라이버 포팅, 로고/숫자 출력 | Display FW |
| W12 | Button/LED 상태머신 (Btn1 토글, Btn2 Zero Cal / Auto PID Long Press) | UI FW |
| W13 | Analog I/O (0~5V / 4~20mA) 변환 처리, Pressure Sensor I²C 드라이버 | Analog FW |
| W14 | UART1 (HIX) + UART2 (HIC) 커맨드 파서 초안, RS485 Protocol 적용 | Protocol FW v0 |

**마일스톤**: Week 14 말 **기본 펌웨어 + Display + Button + UART 동작 완료** ✅

### Phase 4 — 센서 AFE / 밸브 PID / 3종 프로토콜 통합 (Week 15~21)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W15 | Thermal AFE (ADS1220) 구동, 기준 유량 교정 곡선 초안 | Thermal FW |
| W15 | Coriolis AFE (ADS1263) 구동, Drive Coil 공진 탐색, Pickup Phase 측정 | Coriolis FW |
| W16 | Sensor Type 자동 인식 (Sensor PCB EEPROM ID), 알고리즘 분기 | Sensor Detect |
| W16 | **MGMR 연산 엔진** — Gas Profile 테이블, GCF 적용 | MGMR FW |
| W17 | 밸브 구동 — Piezo HV Driver 브링업, DAC 0~3.3V→0~150V 매핑 | Valve FW |
| W17 | **PID 폐루프 제어 (1ms 주기)**, 응답 τ 측정 | PID FW |
| W18 | **Auto PID Function** — 환경 적응형 자동 튜닝 알고리즘 | AutoPID FW |
| W18 | Zero Calibration Function 완성 | ZeroCal FW |
| W19 | **Sub-Protocol Type A** 통합 — PIO+RS485 Protocol 완성 | PIO+RS485 Done |
| W19 | **Sub-Protocol Type B** 통합 — DeviceNet (MCP2515), ODVA EDS 파일 | DeviceNet Done |
| W20 | **Sub-Protocol Type C** 통합 — ET1100 SPI PDI, SSC Tool, ESI 파일 작성 | EtherCAT Done |
| W20 | TwinCAT3로 EtherCAT Slave 인식 확인, DC SYNC0 기반 1ms PID 동기화 | ECAT Validated |
| W21 | **3종 프로토콜 DIP SW 자동 전환** 통합 시험 | Full Protocol |

**마일스톤**: Week 21 말 **전 기능 통합 완료** ✅

### Phase 5 — 성능 검증 및 최종 납품 준비 (Week 22~26)

| 주차 | 작업 | 산출물 |
|:---:|---|---|
| W22 | **응답 시간 측정** — 10SLM @ 0.5s 목표 확인, 1초 이내 확실 검증 | 응답 리포트 |
| W22 | **정밀도 시험** — 소수점 2자리 달성 여부, Full-Scale 대비 오차 측정 | 정확도 리포트 |
| W23 | **일반 Gas Line Type 검증** — N₂/Ar 실유량 시험 | GasLine 보고서 |
| W23 | **IGS Type 검증** — SEMI 표준 대응 시험 (확인 사항 Q12) | IGS 보고서 |
| W24 | EMI/EMC 설계 고려 사항 확인 (사전 시험 외주) | EMI Pre-Test |
| W24 | 온도 드리프트 / 노이즈 / 안정성 장기 시험 (72시간 연속) | Stability 리포트 |
| W25 | 문제점 Rev.B 보드 수정 (필요 시) 또는 SW 패치 | Rev.B 또는 FW v1.0 |
| W25 | 사용자 매뉴얼(KO) + 서비스 매뉴얼 + 교정 절차서 작성 | Docs |
| W26 | 최종 시제품 납품(수량 협의) + 산출물 일체 이관 + 교육 세션 | **납품 완료** |

**마일스톤**: Week 26 말 **시제품 납품 완료 + 산출물 전부 이관** ✅

### 3.1 Gantt Chart

```
 Week        1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
 --------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 P0 사양  ■■
 P1 회로       ■■■■■■■■■■
 P2 PCB                    ■■■■■■■■
 P3 FW BU              ■■■■■■■■■■■■
 P4 통합                                   ■■■■■■■■■■■■■■
 P5 검증                                                                   ■■■■■■■■■■
 --------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 M:회로도              ★
 M:Rev.A 조립                      ★
 M:기본 FW                                  ★
 M:통합완료                                                          ★
 M:납품                                                                                              ★
```

---

## 4. 조직 구성 및 투입 인력

| 역할 | 인원 | 투입률 | 주요 담당 |
|---|:---:|:---:|---|
| **프로젝트 리더 / 펌웨어 Lead** | 1 (Senior 10년+) | 100% | 아키텍처, PID, EtherCAT, MGMR, 통합 |
| **하드웨어 엔지니어** | 1 (Mid 5~10년) | 100% | 회로 설계, PCB 아트웍, Piezo HV, 전원 |
| **센서/제어 엔지니어** | 1 (Mid) | 50% (3MM) | Thermal/Coriolis AFE, 신호처리, 교정 |
| **펌웨어 보조 (프로토콜)** | 1 (Junior~Mid) | 50% (3MM) | RS485/DeviceNet/OLED/UI 구현 |
| **테스트/검증** | 1 (Part) | 30% (1.8MM) | 유량 벤치, 성능 측정, 문서화 |

- **총 투입**: 풀타임 2명 + 파트 3명 (환산 **13.8 MM**)
- **외주**: PCB 레이아웃 심화(옵션 2주), EMI 사전 시험(1주), 가스 누설/내압 시험(1주)

---

## 5. 개발 비용 산정

### 5.1 인건비 (6개월 기준)

| 역할 | 월 비용 (KRW) | MM | 소계 (KRW) |
|---|---:|:---:|---:|
| 프로젝트 리더 (Senior) | 9,000,000 | 6.0 | 54,000,000 |
| 하드웨어 엔지니어 (Mid) | 7,000,000 | 6.0 | 42,000,000 |
| 센서/제어 엔지니어 (50%) | 8,000,000 | 3.0 | 24,000,000 |
| 펌웨어 보조 (50%) | 6,000,000 | 3.0 | 18,000,000 |
| 테스트/검증 (30%) | 5,500,000 | 1.8 | 9,900,000 |
| **인건비 합계** | | **19.8 MM** | **147,900,000** |

> *월 비용 = 4대보험/퇴직금/관리비 포함 회사 부담 기준*

### 5.2 하드웨어 개발 비용

#### 5.2.1 개발 보드 / 평가 키트

| 항목 | 수량 | 단가 (KRW) | 소계 |
|---|:---:|---:|---:|
| Nucleo-F429ZI | 3 | 80,000 | 240,000 |
| ET1100 개발 보드 (EasyCAT or Beckhoff EVB) | 2 | 450,000 | 900,000 |
| KSZ8041NL EVB | 1 | 200,000 | 200,000 |
| ADS1220 / ADS1263 EVB (Thermal/Coriolis AFE) | 각 1 | 400,000 | 800,000 |
| PiezoDrive PDU150 | 2 | 700,000 | 1,400,000 |
| TI DRV2700 EVM | 1 | 150,000 | 150,000 |
| Piezo Stack 샘플 (PI / Noliac) | 3 | 400,000 | 1,200,000 |
| Solenoid 비례밸브 샘플 | 2 | 250,000 | 500,000 |
| Pressure Sensor (Honeywell) | 5 | 80,000 | 400,000 |
| MCP2515/MCP2551 개발 모듈 (DeviceNet) | 2 | 50,000 | 100,000 |
| **소계** | | | **5,890,000** |

#### 5.2.2 커스텀 PCB 제작

| 항목 | 수량 | 단가 (KRW) | 소계 |
|---|:---:|---:|---:|
| Main PCB Rev.A (110×70mm, 6층) | 10 | 60,000 | 600,000 |
| Main PCB Rev.B (수정 반영) | 10 | 60,000 | 600,000 |
| Sub-Protocol PCB 3종 (각 10장, 소형) | 30 | 25,000 | 750,000 |
| Sensor PCB 2종 (각 10장, 소형) | 20 | 25,000 | 500,000 |
| SMT 조립 (Rev.A Main 3장 + Sub×3×3 + Sensor×2×3) | 1 Lot | - | 3,500,000 |
| SMT 조립 (Rev.B) | 1 Lot | - | 2,500,000 |
| BOM 부품 (Rev.A + Rev.B 전체) | - | - | 3,200,000 |
| **소계** | | | **11,650,000** |

#### 5.2.3 테스트/계측 장비 (기본 보유 제외)

| 항목 | 수량 | 단가 (KRW) | 소계 |
|---|:---:|---:|---:|
| 기준 Mass Flow Meter (교정용, Brooks/MKS 2차품 가능) | 1 | 6,500,000 | 6,500,000 |
| TwinCAT3 Commercial License (EtherCAT 시험) | 1 | 2,500,000 | 2,500,000 |
| Beckhoff EK1100 + EL 카드 1식 | 1 | 1,800,000 | 1,800,000 |
| 고전압 오실로스코프 프로브 (Piezo 150V) | 1 | 1,200,000 | 1,200,000 |
| CAN Analyzer (DeviceNet 시험) | 1 | 800,000 | 800,000 |
| 가스 배관/피팅/Regulator/MFM 치구 | 1 | 1,500,000 | 1,500,000 |
| N₂/Ar/He 고순도 가스 소모품 | - | - | 500,000 |
| **소계** | | | **14,800,000** |

#### 5.2.4 하드웨어 합계

| 항목 | 비용 (KRW) |
|---|---:|
| 개발 보드/평가 키트 | 5,890,000 |
| 커스텀 PCB 제작 | 11,650,000 |
| 테스트/계측 장비 | 14,800,000 |
| **하드웨어 합계** | **32,340,000** |

### 5.3 소프트웨어 / 라이선스

| 항목 | 설명 | 비용 (KRW) |
|---|---|---:|
| **ETG 가입비 (EtherCAT Vendor ID)** | EtherCAT Technology Group | 1,800,000 |
| **ODVA 가입비 (DeviceNet Vendor ID)** | ODVA Vendor 등록 | 2,000,000 |
| **SSC Tool (Beckhoff)** | ETG 가입 시 무료 | 0 |
| **X-CUBE-ECAT, STM32CubeIDE** | 무료 | 0 |
| **OR-CAD Capture / Allegro PCB Editor** | 기존 라이선스 보유 가정 (미보유 시 +1,500만원) | 0* |
| **EtherCAT Conformance Test Tool** | 양산 인증 시 (옵션) | 3,500,000 |
| **SW/라이선스 합계** | | **7,300,000** |

> *OR-CAD/Allegro 라이선스 미보유 시 별도 산정*

### 5.4 외주 / 기타

| 항목 | 비용 (KRW) |
|---|---:|
| PCB 레이아웃 외주 (고난이도 부분, 선택) | 2,500,000 |
| EMI 사전 시험 (양산 인증 아닌 설계 고려 수준) | 1,500,000 |
| 가스 누설/내압 시험 (외부 기관) | 1,500,000 |
| 문서/매뉴얼 (KO/EN) | 1,500,000 |
| 출장/교육/현장 조립 지원 | 1,500,000 |
| **외주 합계** | **8,500,000** |

### 5.5 관리 / 예비비

| 항목 | 비율 | 비용 (KRW) |
|---|:---:|---:|
| 관리비 (사무/통신/출장) | 5% | 9,802,000 |
| 예비비 (리스크 대응) | 10% | 19,604,000 |
| **소계** | | **29,406,000** |

### 5.6 총 개발 비용 (6개월)

| 구분 | 비용 (KRW) | 비율 |
|---|---:|:---:|
| 인건비 | 147,900,000 | 64.9% |
| 하드웨어 | 32,340,000 | 14.2% |
| 소프트웨어/라이선스 | 7,300,000 | 3.2% |
| 외주/기타 | 8,500,000 | 3.7% |
| 관리/예비비 | 29,406,000 | 12.9% |
| **합계** | **약 225,446,000원** | 100% |

> **총 개발 비용: 약 2억 2,540만원 (VAT 별도)**

### 5.7 Lean 시나리오 (핵심 기능 우선, 비용 최소화)

- 투입: 리더 1 + H/W 1 + 보조 0.5 (풀타임 2.5명)
- H/W: 개발 보드 최소화, 기준 MFM 중고/렌탈
- ODVA 가입 및 EtherCAT Conformance Test 제외 (Self-certification)

| 항목 | 비용 (KRW) |
|---|---:|
| 인건비 | 97,500,000 |
| 하드웨어 | 21,000,000 |
| S/W (ETG만) | 1,800,000 |
| 외주 | 3,500,000 |
| 관리/예비비 15% | 18,570,000 |
| **Lean 합계** | **약 142,370,000원** |

> **Lean 개발 비용: 약 1억 4,240만원**

### 5.8 🎯 1억원 타겟 조정안 (Budget Cap = 100,000,000원)

> **전제**: Xerix 측 예산 제약으로 **총 개발비를 1억원 이내**로 맞춰야 하는 상황.
> 본 조정안은 **물리적/공학적으로 달성 가능한 범위**에서 비용을 재구성하되, **타당성 검토를 포함하여 객관적으로 제시**한다.

#### 5.8.1 1억원 달성을 위한 필수 조정 사항

| # | 조정 항목 | 변경 내용 | 절감 효과 |
|:---:|---|---|---:|
| 1 | **범위 축소 (핵심)** | Phase 1 = **Base 라인만** 개발 (Thermal + Solenoid + PIO+RS485) <br>EtherCAT/DeviceNet/Coriolis는 **Phase 2 별도 계약으로 분리** | 50,000,000 |
| 2 | **투입 인력 축소** | 리더 1명 100% + 하드웨어 1명 80% + 파트 검증 20% <br>(= 10.8 MM, 기존 19.8 MM 대비 -9 MM) | 48,300,000 |
| 3 | **프리랜서/외주 계약** | 정규직 대신 프리랜서 단가 (약 15~20% 저렴) | 12,000,000 |
| 4 | **H/W 평가보드 최소화** | Piezo/Coriolis/ET1100 관련 개발보드 제외 (Phase 2에서 별도) | 5,500,000 |
| 5 | **PCB Rev 축소** | Rev.A만 제작 (Rev.B 수정은 필요 시 Xerix 별도 승인) | 3,500,000 |
| 6 | **PCB 종수 축소** | Main PCB + Sensor PCB 1종(Thermal)만 제작 | 4,500,000 |
| 7 | **기준 MFM 렌탈/차용** | Brooks/MKS 기준기 구매 → **렌탈 또는 Xerix 보유품 차용** | 5,500,000 |
| 8 | **TwinCAT3/Beckhoff 장비 제외** | Phase 2에서 EtherCAT 통합 시 구매 | 4,300,000 |
| 9 | **CAN Analyzer 제외** | Phase 2 DeviceNet 시점에 구매 | 800,000 |
| 10 | **ETG/ODVA 가입 제외** | Phase 2 해당 프로토콜 착수 시 가입 | 3,800,000 |
| 11 | **외주 최소화** | 문서/매뉴얼 사내 작성, EMI 사전시험만 유지 | 5,000,000 |
| 12 | **시제품 수량 축소** | Main 3장 + Sensor 3장 + Sub(RS485) 3장 = 9장 | 2,000,000 |

#### 5.8.2 1억원 타겟 비용 구성

**범위**: Base 라인 시제품 + RS485 통신 + Thermal 센서 + Auto PID + Display/Button/Zero Cal

**인력 구성**:

| 역할 | 단가 (KRW/월) | MM | 소계 (KRW) |
|---|---:|:---:|---:|
| 프로젝트 리더 / 펌웨어 (Senior 프리랜서) | 7,500,000 | 6.0 | 45,000,000 |
| 하드웨어 엔지니어 (Mid 프리랜서) | 6,000,000 | 4.8 | 28,800,000 |
| 테스트/검증 (파트 20%) | 5,500,000 | 1.2 | 6,600,000 |
| **인건비 합계** | | **12.0 MM** | **80,400,000** |

**하드웨어**:

| 항목 | 비용 (KRW) |
|---|---:|
| Nucleo-F429ZI ×2 | 160,000 |
| ADS1220 EVB (Thermal AFE) | 400,000 |
| Solenoid 비례밸브 샘플 ×2 | 500,000 |
| Pressure Sensor ×3 | 240,000 |
| **개발 보드 소계** | **1,300,000** |
| Main PCB Rev.A 10장 (110×70mm, 4층) | 500,000 |
| Sensor PCB (Thermal) 10장 | 250,000 |
| Sub-Protocol PCB (RS485) 10장 | 250,000 |
| SMT 조립 1 Lot (Main 3 + Sensor 3 + Sub 3) | 2,500,000 |
| BOM 부품 | 2,000,000 |
| **PCB 소계** | **5,500,000** |
| 기준 MFM (렌탈 1개월 + Xerix 차용) | 1,500,000 |
| 가스 배관/피팅/치구 | 1,000,000 |
| 가스 소모품 (N₂) | 300,000 |
| **계측/시험 소계** | **2,800,000** |
| **하드웨어 합계** | **9,600,000** |

**소프트웨어 / 라이선스**:

| 항목 | 비용 (KRW) |
|---|---:|
| STM32CubeIDE (무료) | 0 |
| OR-CAD/Allegro (기존 라이선스 가정) | 0 |
| 기타 오픈소스 | 0 |
| **S/W 합계** | **0** |

**외주 / 기타**:

| 항목 | 비용 (KRW) |
|---|---:|
| EMI 사전 시험 (설계 고려 수준) | 1,500,000 |
| 가스 누설/내압 시험 | 1,000,000 |
| 문서/매뉴얼 (한국어만, 사내 작성) | 500,000 |
| **외주 합계** | **3,000,000** |

**관리 / 예비비**:

| 항목 | 비율 | 비용 (KRW) |
|---|:---:|---:|
| 관리비 (사무/통신/출장) | 3% | 2,790,000 |
| 예비비 (리스크 대응) | 5% | 4,650,000 |
| **소계** | | **7,440,000** |

#### 5.8.3 1억원 타겟 총 비용

| 구분 | 비용 (KRW) | 비율 |
|---|---:|:---:|
| 인건비 | 80,400,000 | 80.4% |
| 하드웨어 | 9,600,000 | 9.6% |
| 소프트웨어/라이선스 | 0 | 0.0% |
| 외주/기타 | 3,000,000 | 3.0% |
| 관리/예비비 (8%) | 7,440,000 | 7.4% |
| **합계** | **100,440,000원** | 100% |

> **총 개발 비용: 약 1억 44만원 (VAT 별도)** — **타겟 달성 ✅**

#### 5.8.4 1억원 조정안의 범위 (Scope)

**✅ 포함 (IN-SCOPE)**:
- Main Control PCB 설계 (110×70mm, STM32F429ZI, OR-CAD/Allegro)
- Sensor PCB (Thermal Bridge + Pressure Sensor)
- Sub-Protocol PCB (PIO + RS485)
- +24V / ±15V 전원 설계, D-SUB 09P Male, 탄탈륨 금지 준수
- 펌웨어: HAL, OLED, Button1/2, UART1(HIX)/UART2(HIC), RS485 Protocol, PID, Auto PID, Zero Cal, MGMR 기본(N₂ only)
- DIP SW 센서/아날로그/프로토콜 선택 회로 (단, Thermal + RS485 조합만 실동작)
- 시제품 Main 3 + Sub(RS485) 3 + Sensor(Thermal) 3 = 총 9장 납품
- 기본 성능 시험 (응답/정확도/안정성) + EMI 사전 시험
- 한국어 사용자/서비스 매뉴얼
- 소스코드 및 설계 원본 파일 일체 이관 (IP Xerix 귀속)

**❌ 제외 (OUT-OF-SCOPE, Phase 2 별도 계약)**:
- ⛔ **EtherCAT 프로토콜 (ET1100) 개발** — 대략 4,500만원 + 2개월 추가 소요 예상
- ⛔ **DeviceNet 프로토콜 개발** — 대략 2,500만원 + 1.5개월 추가 소요 예상
- ⛔ **Coriolis Sensor PCB + AFE + 센서 헤드** — 대략 3,500만원 + 2개월 추가 소요 예상
- ⛔ **Piezo Valve Driver (HV 회로)** — Solenoid 라인만 구현
- ⛔ **IGS Type 검증** — 일반 Gas Line만 시험
- ⛔ **Rev.B 재제작** — 문제 발생 시 Xerix 별도 승인/추가 비용
- ⛔ **7종 MGMR 전체 튜닝** — N₂ 기본 + 1~2종만 시연 (7종 전체 튜닝은 Phase 2)
- ⛔ **양산 이관 문서 / 조립 작업 지시서** — 시제품 납품까지만
- ⛔ **EN 매뉴얼, 양산 인증 지원**

#### 5.8.5 🔬 1억원 조정안 타당성 검토

##### ❌ **결론: 현재 메일/미팅 요구사항 전체 범위에서는 1억원이 불가능**

##### ✅ **1억원이 타당한 조건**: "Base 라인 + RS485 only + 시제품 납품"으로 **범위를 명시적으로 축소**한 경우

##### 세부 타당성 분석

**(1) 인건비 타당성**

| 항목 | 계산 근거 | 판단 |
|---|---|---|
| 리더 750만/월 × 6 = 4,500만 | 프리랜서 Senior 10년+ 시세: 700~900만/월. **하한 근접** | ⚠️ 빡빡함 (숙련자 확보 필수) |
| H/W 600만/월 × 80% × 6 = 2,880만 | 프리랜서 Mid: 550~700만/월. **중간 수준** | ✅ 가능 |
| 검증 파트 110만/월 × 6 = 660만 | 월 20% 투입 기준 | ✅ 가능 |
| **합계 8,040만원** | 총 12 MM | 업계 시세 하한 |

- **타당성**: 업계 최저 시세에 근접하나 Senior 1명 + Mid 1명 수준은 가능
- **리스크**: 숙련된 프리랜서가 6개월 전담 확보 가능한지 불확실, 병가/중도 이탈 시 **치명적**

**(2) 인건비 대비 공수 타당성**

12 MM로 수행 가능한 범위를 업계 경험치로 검토:

| 작업 항목 | 표준 공수 (MM) | 1억 조정안 |
|---|:---:|:---:|
| 시스템 설계 + 부품 선정 | 0.5 | 0.5 |
| 회로 설계 (Main + Sensor + Sub) | 2.0 | **1.5** (Sub 1종, Sensor 1종) |
| PCB 레이아웃 | 1.5 | **1.0** (Main 1장만 110×70 고난이도, 나머지 소형) |
| PCB 제작/SMT/디버깅 | 0.5 | 0.5 |
| 펌웨어 저수준 브링업 | 1.5 | 1.5 |
| Display/Button/UART/Analog | 1.0 | 1.0 |
| Thermal AFE 구동/교정 | 1.5 | 1.5 |
| PID + Auto PID | 1.5 | 1.5 |
| RS485 Protocol 구현 | 1.0 | 1.0 |
| MGMR 기본 | 0.5 | 0.5 |
| 성능 시험/교정/문서 | 1.5 | 1.0 |
| **합계** | **13.0 MM** | **11.5 MM** |

- **판단**: 12 MM에 11.5 MM 작업 배치 → **여유 0.5 MM (4%)** 뿐 → **사실상 여유 없음**
- **결론**: **공수는 이론상 맞지만, 리스크 대응 여력이 거의 없음**. Phase 0 확인사항 지연 1건, 부품 리드타임 1건만 발생해도 **일정 초과**

**(3) 하드웨어 비용 타당성 — 960만원**

| 항목 | 금액 | 판단 |
|---|---:|---|
| 개발 보드 130만 | Nucleo + ADS1220 EVB + Pressure 샘플 + Solenoid 밸브 | ✅ 최저 수준 |
| PCB 550만 | Main + Sensor + Sub(RS485) 각 10장, SMT 1 Lot | ⚠️ 타이트 (Rev.B 불가) |
| 계측 시험 280만 | MFM 렌탈 + 배관 + 가스 | ⚠️ MFM 렌탈 조건 필수 |

- **리스크**: 기준 MFM은 구매 시 650만+, 렌탈 월 30~50만, **Xerix가 보유품 대여 허용**해야 현실성 확보
- **Rev.A 1회 성공 전제** — 하드웨어 결함 발생 시 500만~800만 추가

**(4) 6개월 일정 타당성**

1억원 조정안의 Phase 배치 (Base 라인 기준):

| Phase | 기간 | 비고 |
|---|:---:|---|
| P0 사양 확정 | W1~2 | Xerix 회신, RS485 Protocol 수령 |
| P1 회로 설계 (Main + Sensor(Thermal) + Sub(RS485)) | W3~6 | 범위 축소로 4주 가능 |
| P2 PCB 아트웍/제작 Rev.A | W7~10 | 110×70mm 난이도 여전 |
| P3 펌웨어 브링업 (병렬) | W7~12 | OLED/Button/UART/Analog |
| P4 Thermal AFE + PID + Auto PID + RS485 | W13~20 | 핵심 기능 통합 |
| P5 검증 + 납품 | W21~26 | 성능/EMI/문서/납품 |

- **판단**: 범위 축소로 6개월 내 가능. 단 **Rev.B 재제작 여유 없음**

**(5) 리스크 관점**

| 리스크 | 1억 조정안 | 평가 |
|---|---|---|
| Rev.A 1회 성공 | Rev.B 예비 없음 | 🔴 高 |
| 리드타임 지연 | 예비비 5%만 | 🔴 高 |
| 인력 이탈 | 2명 중 1명이라도 이탈 시 치명적 | 🔴 高 |
| Xerix 확인사항 지연 | Phase 0 연장 시 바로 일정 부족 | 🟡 中 |
| Scope Creep | Xerix가 "조금만 추가" 요구 시 붕괴 | 🔴 高 |

##### 🎯 최종 판단

| 항목 | 평가 |
|---|---|
| **수치적 실현 가능성** | ⚠️ **가능하지만 여유 4% 이하** |
| **품질/기능 타당성** | ✅ Base 라인 + RS485 only 조건에서 타당 |
| **일정 타당성** | ⚠️ 범위 축소 시 6개월 가능, 단 Rev.B 불가 |
| **리스크 수준** | 🔴 **매우 높음** (예비비 5% 부족, Senior 이탈 리스크) |
| **Xerix 요구 메일 범위 대비** | ❌ **약 40% 수준만 구현** (EtherCAT/DeviceNet/Coriolis 제외) |
| **권고** | **옵션 B 또는 C 강력 권장 (아래)** |

#### 5.8.6 권고 옵션 — Xerix와 협의할 3가지 대안

> **1억원 예산 제약이 확정**이라면, 다음 3가지 중 1개를 선택해야 함. **무엇을 포기할지 명확히 합의** 필요.

##### **옵션 A: 현재 1억 조정안 그대로 진행** (범위 축소)
- **범위**: Base 라인 + RS485 only + Thermal only + Solenoid only
- **기간**: 6개월
- **비용**: 1억 44만원
- **산출물**: 시제품 9장
- **리스크**: 🔴 高 (여유 4%, Rev.B 불가)
- **추가 투자**: Phase 2에서 EtherCAT 별도 4,500만 + DeviceNet 별도 2,500만 + Coriolis 별도 3,500만 = **총 2억 5백만원** (1억 + 1억 5백만)
- **평가**: Xerix 전체 요구 충족까지 **누적 2억 500만** 소요, 분할 지급 장점, 시간은 **약 10개월**

##### **옵션 B: 1.4억 Lean 계획으로 증액 협상** ⭐ 권장
- **범위**: Base + Standard 통합 (Thermal/Coriolis 2종 센서 + RS485 + DeviceNet) + Piezo/Solenoid 2종
- **기간**: 6개월
- **비용**: **1억 4,240만원** (Lean 시나리오)
- **산출물**: 시제품 풀세트 (Sub 2종 + Sensor 2종 + Main)
- **리스크**: 🟡 中 (여유 10%)
- **권장 이유**: 옵션 A 대비 **+4,200만원으로 범위 2배 확보**, 리스크 대폭 감소, EtherCAT만 Phase 2로 분리

##### **옵션 C: 2.25억 Standard + 단계 분할 지급**
- **범위**: v2.1 표준안 전체 (3프로토콜 + 2센서 + Piezo/Solenoid)
- **기간**: 6개월
- **비용**: **2억 2,540만원**
- **분할 지급 제안**: Phase 0 착수금 20% + Phase 2 PCB 완료 20% + Phase 4 통합 완료 30% + 최종 납품 30%
- **리스크**: 🟢 低 (여유 15%)
- **권장 이유**: 업계 표준 수준, 전체 요구 충족, 양산 이관 기반 마련

##### 요약 비교

| 항목 | 옵션 A (1억) | 옵션 B (1.4억) ⭐ | 옵션 C (2.25억) |
|---|:---:|:---:|:---:|
| 총 비용 | **1억 44만** | **1억 4,240만** | **2억 2,540만** |
| 기간 | 6개월 | 6개월 | 6개월 |
| 센서 | Thermal만 | Thermal+Coriolis | Thermal+Coriolis |
| 프로토콜 | RS485만 | RS485+DeviceNet | RS485+DeviceNet+EtherCAT |
| 밸브 | Solenoid만 | Piezo+Solenoid | Piezo+Solenoid |
| PCB Rev | Rev.A only | Rev.A+Rev.B | Rev.A+Rev.B |
| 시제품 | 9장 | 15장 | 24장 |
| 예비비 | 5% (🔴) | 10% (🟡) | 15% (🟢) |
| Xerix 요구 충족도 | **~40%** | **~75%** | **100%** |
| **추천** | 조건부 | **⭐ 권장** | 여건 허락 시 |

> **UTTEC 권장**: **옵션 B (1.4억)**. Xerix와 협상하여 **+4,200만원 증액**을 통해 전체 요구사항의 75%를 안정적으로 확보하고, **EtherCAT만 Phase 2 별도 계약**으로 분리하는 방안이 가장 합리적.

#### 5.8.7 1억원 확정 시 필수 계약 조항

옵션 A로 확정되는 경우 계약서에 다음 조항이 **반드시** 포함되어야 합니다:

1. ✅ **범위 명시**: "Base 라인 (Thermal + RS485 + Solenoid) 시제품 개발에 한함. EtherCAT/DeviceNet/Coriolis/Piezo는 본 계약 범위 외"
2. ✅ **Scope Lock**: 착수 후 범위 추가 요청 시 **변경 관리 절차** 적용, 별도 견적/일정 재산정
3. ✅ **PCB Rev.B**: Rev.A 이후 추가 수정 필요 시 Xerix 별도 승인 + 추가 비용 (약 500~800만원)
4. ✅ **기준 MFM 대여**: Xerix 보유품 대여 또는 렌탈 비용 별도 지원
5. ✅ **RS485 Protocol 규격서 지연**: 1주 이상 지연 시 납기 자동 순연
6. ✅ **시제품 수량**: Main 3 + Sensor(Thermal) 3 + Sub(RS485) 3 = 총 9장 고정
7. ✅ **Phase 2 우선 협상권**: EtherCAT/DeviceNet/Coriolis 확장 시 UTTEC 우선 협상권 명시
8. ✅ **인력 이탈 리스크**: Senior 리더 이탈 시 2주 내 동급 인력 대체 또는 일정 조정 조항

---

### 5.9 양산 원가 참고 (개발 완료 후)

| 라인 | BOM 원가 (100대 기준) | 목표 판매가 |
|---|---:|---:|
| **Base** (Thermal + Solenoid + PIO+RS485) | 약 280,000원 | 1,200,000원 |
| **Standard** (+ DeviceNet) | 약 320,000원 | 1,500,000원 |
| **Premium** (Coriolis + Piezo + EtherCAT) | 약 750,000원 | 3,500,000원 |

### 5.10 💡 비용 산정 요약 (4가지 시나리오)

| 시나리오 | 비용 | 범위 | 리스크 | UTTEC 권고 |
|---|---:|---|:---:|:---:|
| **표준 (v2.1)** | 2억 2,540만 | 전체 요구사항 100% | 🟢 低 | 여건 허락 시 |
| **Lean** | 1억 4,240만 | Base+Standard (75%) | 🟡 中 | ⭐ **최우선 권장** |
| **1억 타겟 (A)** | 1억 44만 | Base only (40%) | 🔴 高 | 조건부 |
| **1억 타겟 (Full 요구)** | — | 구현 불가 | 🚫 | ❌ 불가 |

---

## 6. 리스크 관리

| # | 리스크 | 영향 | 확률 | 대응 |
|:---:|---|:---:|:---:|---|
| R1 | ET1100 + 외장 PHY 포팅 난이도 (자료 부족) | 🔴 | 中 | SOEM 오픈소스 병행, Beckhoff 영문 AN 정독, LAN9252 대안 협의 여지 확보 |
| R2 | Coriolis 센서 헤드 OEM 조달 리드타임 | 🔴 | 中 | Phase 0에서 리드타임 확인, Bronkhorst/Endress+Hauser 병행 협상 |
| R3 | 110×70mm 내 전 기능 탑재 불가 | 🟡 | 中 | 3-Board 분리 승인 확보, Main PCB는 조작+제어+전원만 탑재 |
| R4 | ±15V 전원 + 탄탈륨 금지 조건 회로 위반 | 🟡 | 低 | BOM 리뷰 체크리스트 포함, 설계 Peer Review 필수 |
| R5 | Coriolis Phase Detection 노이즈 | 🟡 | 中 | Lock-in Amplifier 기법 + 24bit ΔΣ ADC + DMA 연속 샘플링 |
| R6 | OR-CAD/Allegro 라이선스/숙련 인력 부재 | 🟡 | 中 | Phase 0에 확인, 미보유 시 외주 계약 또는 Xerix에 KiCad 허용 협의 |
| R7 | RS485 Protocol 규격서 수령 지연 | 🟡 | 中 | 착수 조건 명시, 미수령 시 개발 착수일 순연 계약 조항 |
| R8 | 0.5s @ 10SLM 응답 미달성 (Thermal Base 라인) | 🟡 | 中 | Piezo 라인 대체 제안, 스펙 상호 조정 협의 |
| R9 | IGS Type 표준 불명확 | 🟢 | 低 | Phase 0에서 Xerix에 SEMI F81 등 준수 기준 확인 |
| R10 | 일정 지연 (전형적 10~20%) | 🟡 | 高 | 예비비 10% + Phase 병렬 진행 + Buffer Week |

---

## 7. 성공 기준 (Acceptance Criteria)

| 항목 | 기준 | 측정 방법 |
|---|---|---|
| **응답 시간** | 1초 이내 확실, 10SLM @ 0.5s 목표 | 오실로스코프 실측 |
| **정밀도** | 소수점 2자리 (F.S. 대비 ±0.5% 목표) | 기준 MFM 대비 교정 |
| **재현성** | < 0.5% F.S. (10회 반복) | 통계 처리 |
| **RS485 통신** | 지정 Protocol 완전 대응 | 통합 시험 |
| **EtherCAT 통신** | 1ms 주기 99.9% 성공 | TwinCAT3 Scope |
| **DeviceNet 통신** | ODVA Conformance Simulator 통과 | CAN Analyzer |
| **Auto PID** | 환경(±10°C, ±10% 압력) 변화 시 재수렴 | 환경 챔버 시험 |
| **Zero Calibration** | Button2 1회 누름으로 오프셋 < 0.1% F.S. | 버튼 시험 |
| **MGMR** | 등록 가스 7종 이상 GCF 자동 적용 | UART 명령 시험 |
| **누설 (He Leak)** | < 1×10⁻⁹ atm·cc/s | 헬륨 누설 시험기 |
| **IGS Type 검증** | SEMI F81 등 표준 준수 | 외부 시험 기관 |
| **EMI (설계 고려)** | Class A 수준 설계 검토 | 사전 시험 외주 |

---

## 8. 산출물 (Deliverables)

### 8.1 설계 문서
- [ ] 시스템 아키텍처 문서 (본 계획서)
- [ ] 회로 설계서 (OR-CAD Schematic 원본 + PDF)
- [ ] PCB 레이아웃 (Allegro 원본 + Gerber + Drill + Pick&Place)
- [ ] **BOM (부품 속성 포함, 탄탈륨 금지 검증)**
- [ ] 기구 인터페이스 도면 (D-SUB 09P Male 핀맵, 센서 장착 IF)
- [ ] 전원 설계 검토서

### 8.2 펌웨어
- [ ] STM32F429 펌웨어 소스 (완전 개방, 컴파일 환경 가이드 포함)
- [ ] EtherCAT ESI 파일 (Xerix_MFC.xml)
- [ ] DeviceNet EDS 파일
- [ ] RS485 Protocol 구현 문서
- [ ] CoE Object Dictionary
- [ ] Coriolis/Thermal 신호처리 알고리즘 문서
- [ ] PID 파라미터 튜닝 리포트
- [ ] MGMR Gas Profile 테이블

### 8.3 시험/검증
- [ ] 단위 시험 결과서
- [ ] 성능 시험 보고서 (응답/정확도/재현성/안정성)
- [ ] EMI 사전 시험 보고서
- [ ] 누설/내압 시험 보고서
- [ ] IGS Type 검증 보고서

### 8.4 납품
- [ ] 조립 완료된 시제품 보드 (**수량 협의** — Main 3~5대 + Sub-Protocol 각 3대 + Sensor 각 3대)
- [ ] 사용자 매뉴얼 (한국어)
- [ ] 서비스 매뉴얼 + 교정 절차서
- [ ] 조립 작업 지시서
- [ ] **모든 원본 파일 및 소스코드 일체 이관 (IP 전부 Xerix 귀속)**

---

## 9. 계약 특이 사항

- **지식재산권**: 산출물 일체의 지식재산권은 **Xerix에 귀속**한다. UTTEC는 유사 제품 재사용 권리를 갖지 않는다.
- **원본 파일 이관**: 개발 완료 시 OR-CAD/Allegro 원본, 펌웨어 소스 전부를 Xerix에 이관한다.
- **부품 수급 지연**: 하드웨어 부품 수급 지연 발생 시 일정은 상호 협의하여 조정한다.
- **RS485 Protocol 제공**: 개발 착수일은 *"Xerix가 RS485 Protocol 규격서를 제공한 날"*로 한다.
- **시제품 납품 수량**: 계약 시 확정한다 (본 계획서는 Main 3~5대 가정).
- **검수 기준**: 본 문서 Section 7 Acceptance Criteria를 기준으로 한다.

---

## 10. 사전 확인 / 검토 필요 사항 (PRE-CONTRACT CHECKLIST)

> **본 섹션은 계약 체결 또는 개발 착수 전 Xerix와 반드시 합의해야 할 항목이다.**
> 각 항목의 회신이 비용/일정/구현 가능성에 직접 영향을 미친다.

### 10.1 🔴 [CRITICAL] 범위/일정 관련

| # | 질의 | 영향 | 디폴트 가정 |
|:---:|---|---|---|
| Q1 | 3종 프로토콜(PIO+RS485/DeviceNet/EtherCAT)을 **Phase 1에 전부 포함**하는가, 아니면 **PIO+RS485 우선 → 나머지 확장**으로 분리하는가? | 일정 ±2개월, 비용 ±5천만원 | 전부 포함 (본 계획서 기준) |
| Q2 | 첫 양산/시제품은 3종 중 **어느 프로토콜 우선**인가? | Phase 4 일정 배열 | EtherCAT 우선 (미팅 합의) |
| Q3 | Coriolis 센서 헤드 **조달 주체**는? (Xerix / UTTEC / 제3자 OEM) | 비용 +1,000~1,500만, 리드타임 4~8주 | Xerix 공급 (본 계획서 가정) |
| Q4 | Premium 라인(Coriolis + Piezo)도 **본 개발 기간(6개월) 내**에 완료해야 하는가, 아니면 **Base(Thermal) 우선 → Premium 후속**인가? | 일정 집중도 | 본 계획서: Base 완료 → Premium 통합 |

### 10.2 🔴 [CRITICAL] 하드웨어 관련

| # | 질의 | 영향 | 디폴트 가정 |
|:---:|---|---|---|
| Q5 | **PCB 110×70mm 엄수 여부**. 3-Board 분리(Main + Sub-Proto + Sensor) 구조 승인 여부 | 설계 가능성 | 3-Board 승인 전제 |
| Q6 | **±15VDC 공급원** 종류 (장비 측에서 공급? Controller 내부 생성?), **D-SUB 09P Male 공식 핀맵** 도면 | 전원 설계 | 장비 측 공급 가정 |
| Q7 | **+24V 입력단 탄탈륨 금지**의 배경 (과거 소손? 정책?) — 양산 BOM에도 동일 적용? | BOM 부품 선정 | 양산에도 적용 |
| Q8 | **ET1100 지정 이유** — Beckhoff 상호운용성/인증 필수? LAN9252 등 대안 허용? (Section 2.4 참조) | 자료 부족 리스크 대응 | ET1100 고정 |
| Q8-1 | ET1100 지정 배경 — (a) Beckhoff 상호운용성 강제 (b) 과거 개발 경험 (c) 고객사 요구 중 어느 것인가? | 대응 전략 | (c) 고객사 요구 |
| Q8-2 | 향후 ET1100 공급 중단 시 **LAN9253 / AX58100 등 대안 허용** 조건 | 장기 리스크 | 사전 협의 필요 |
| Q8-3 | ESI 파일 작성용 Xerix **Vendor ID / Product Code / Revision** 체계 제공 가능 여부 (ETG 회원 여부) | ESI 발급 | UTTEC가 ETG 가입 (180만원) |
| Q8-4 | EtherCAT **Conformance Test 공식 인증** 수행 여부 (Self-Declaration 허용?) | 비용 +350만원 | Self-Declaration |
| Q9 | **설계 툴 OR-CAD/Allegro 엄수** vs KiCad 등 대안 허용? UTTEC 라이선스 확인 병행 | 설계 공수 ±20% | OR-CAD/Allegro 엄수 가정 |
| Q10 | **Main PCB 4영역 분할** (Wishket 원문) — 본 계획서의 "제어+전원 병합" 해석 승인? | 레이아웃 가이드 | 병합 허용 전제 |

### 10.3 🟡 [IMPORTANT] 기능/사양 관련

| # | 질의 | 영향 | 디폴트 가정 |
|:---:|---|---|---|
| Q11 | **정밀도 "소수점 2자리"** 기준 — 절대 SLM 기준인가 F.S. %? (예: 100SLM에서 0.01SLM인지, 100.00%인지) | AFC 분해능 설계 | F.S. 0.01% (2자리) |
| Q12 | **0.5초 @ 10SLM 응답** — 가스라인/밸브/배관 체적 물리 구성 확정? 가스 종류(N₂ 기준)? | Piezo vs Solenoid 선정 | N₂ 기준 N.C. 라인 |
| Q13 | **Auto PID "환경 변화 적응"** — 1회 튜닝인가 온/압 변화 시 재튜닝인가? | FW 공수 1주 vs 4주 | 환경 적응형 (본 계획서 기준) |
| Q14 | **MGMR 대상 가스 리스트** — 기본 7종(N₂/He/Ar/H₂/O₂/CO₂/SF₆) 외 추가? | Gas Profile DB | 기본 7종 |
| Q15 | **IGS Type 검증 표준** — SEMI F81? 기타? 외부 시험 기관 지정? | 검증 비용 | SEMI F81 가정 |
| Q16 | **Display** 재확인 — OLED 1인치 이하 확정? 해상도 128×64? 모노/컬러? | OLED 선정 | SSD1306 모노 128×64 |
| Q17 | **Button** 배치 — 전면 PCB 직장착? 와이어 풀아웃? 방수 등급? | 기구 IF | PCB 직장착 |
| Q18 | **Status LED** Green/Red 블록 — 개별 LED? 듀얼 컬러? 광파이프? | 기구 설계 | 2mm 각형 × 2개 |

### 10.4 🟢 [STANDARD] 계약/납품/산출물 관련

| # | 질의 | 영향 | 디폴트 가정 |
|:---:|---|---|---|
| Q19 | **RS485 Protocol 상세 규격서** 전달 예정일 → 개발 착수일 D-day 확정 | 착수일 | Kick-off 시 수령 가정 |
| Q20 | **시제품 납품 수량** — Main 몇 대? Sub 몇 대? Sensor 몇 대? | H/W 비용 | Main 5 + Sub×3×3 + Sensor×2×3 |
| Q21 | **산출물 IP 귀속** 계약서 조항 명확화 | 계약 리스크 | Xerix 귀속 100% |
| Q22 | **EMI/EMC** 검증 수준 — 설계 고려 vs 정식 인증 (KC/CE/FCC) | 비용 +3,000만원 (정식 인증 시) | 설계 고려 수준 |
| Q23 | **검수 장소 / 방법** — UTTEC 사내 검수 후 납품? Xerix 현장 동반 검수? | 일정 +1주 | 사내 검수 후 납품 |
| Q24 | **양산 이관** — 본 계약에 양산 이관 지원 포함? 별도 계약? | 범위 | 별도 계약 |
| Q25 | **하자 보증 기간** | A/S 범위 | 납품 후 12개월 |

### 10.5 🟢 [INFORMATIONAL] 기술 자료 제공 요청

- [ ] Xerix 기존 MFC 제품(있는 경우) 사양서/매뉴얼 — 사양 정합성 검토용
- [ ] 경쟁사(Brooks/MKS/Horiba/Bronkhorst) 벤치마킹 대상 모델
- [ ] Xerix 내부 표준 (전원/커넥터/라벨/시리얼 규칙)
- [ ] 양산 목표 수량 (연간) — 양산 원가 최적화 방향 제시용
- [ ] 경쟁 판매가 목표 — 원가 제약 파악용

---

## 11. 요약

| 항목 | 내용 |
|---|---|
| **프로젝트** | Xerix MFC Controller (Thermal/Coriolis + PIO+RS485/DeviceNet/EtherCAT) |
| **아키텍처** | 3-Board (Main 110×70mm + Sub-Protocol 3종 + Sensor 2종) |
| **MCU / ESC** | STM32F429ZI + **BECKHOFF ET1100** (Xerix 지정, Section 2.4 장단점 분석) + KSZ8041NL ×2 + H1102NL ×2 |
| **전원** | +24V + ±15V (D-SUB 09P Male, +24V 탄탈륨 금지) |
| **설계 툴** | OR-CAD / Allegro |
| **개발 기간** | **6개월 (26주)** — P0 2주 / P1 5주 / P2 4주 / P3 6주(병렬) / P4 7주 / P5 5주 |
| **투입 인원** | 풀타임 2명 + 파트 3명 (13.8 MM) |
| **표준 개발비** | **약 2억 2,540만원** (VAT 별도) — 전체 요구 100% |
| **Lean 개발비** ⭐ | **약 1억 4,240만원** — 전체 요구 75% (EtherCAT 제외) **UTTEC 권장** |
| **1억 타겟 조정안** | **1억 44만원** — Base 라인만 (약 40%, RS485/Thermal/Solenoid only) ⚠️ 고위험 |
| **지식재산권** | 전부 Xerix 귀속 |
| **핵심 리스크** | ET1100 포팅 자료 부족, 110×70mm 공간 제약, ±15V/탄탈륨 금지 조건 |
| **선결 조건** | RS485 Protocol 규격서 / D-SUB 09P 핀맵 / MGMR 가스 리스트 / OR-CAD 라이선스 / ET1100 리드타임 |

---

## 12. 다음 단계 (Immediate Next Action)

1. ✅ 본 계획서 v2.1 내부 검토 (홍광선 대표 최종 확인)
2. 🔲 Xerix에 **Section 10 확인 사항(Q1~Q25) 공식 질의서** 발송
3. 🔲 OR-CAD/Allegro 라이선스 및 PCB 레이아웃 인력 내부 확인
4. 🔲 ET1100 / KSZ8041NL / ADS1263 / Piezo Driver 샘플 리드타임 조사
5. 🔲 Xerix 회신 수령 → v2.2 최종 계약 버전 확정 → Kick-off 미팅

---

**문서 작성**: 2026-04-09
**작성자**: UTTEC (Xerix MFC Controller 기술 검토 세션)
**문서 버전**: v2.1 (Final, 계약용 초안)
**관련 문서**:
- `Xerix_MFC_요구사양서_20260408.md` (PRIMARY — Xerix 메일)
- `Mail 첨부 파일.eml` (원문)
- `wishket.txt` (SUPPLEMENT — Wishket 원문)
- `Xerix_MFC_Wishket_vs_미팅요구_교차검토_20260409.md` (누락사항 식별)
- `Xerix_MFC_Controller_개발계획서.md` (v1.0, 초안)
- `Xerix_MFC_설계재정리_20260409.md` (v2.0, 재정리)
