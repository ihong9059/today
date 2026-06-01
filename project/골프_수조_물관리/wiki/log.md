---
title: 한림용인CC 시공 진행 로그
type: log
created: 2026-05-17
updated: 2026-06-01 (TX4/RX4 USB-VCOM bring-up + line-buffered loopback 검증)
---

# 한림용인CC 고가수조 자동급수 무선제어 — 진행 로그

> Tier 2 sub-vault. 시공·진행·결정 단계별 박제.
>
> action: start / decision / purchase / site / firmware / revenue / milestone / complete / absorb

## [2026-06-01] firmware | TX4/RX4 USB-VCOM 양방향 + line-buffered loopback 검증 ✅

**증분**: 5/31 5-channel UART bring-up → 7-channel (TX4 P0.06 + RX4 P0.08, 9600). PCA10040 onboard J-Link OB **USB-VCOM 직결** 활용 — 별도 CP210x 케이블 없이 PC↔MCU 9600 양방향.

**구현**:
- SPI0 MOSI = SW-UART TX4 (9600 single transaction) — TX2와 동일 방식
- GPIO INT + DWT = SW-UART RX4 (9600) — RX2와 동일 방식
- overlay: `&spi0 status="okay"` + pinctrl SPIM_MOSI=P0.06 dummy SCK=P0.16
- main.c: tx4/rx4 인스턴스 + `drain_rx4_to_tx3_and_tx4()` line-buffered loopback

**검증**:
- ✅ TX4 → USB-VCOM 카운터 정상 출력 (`TX4: N`)
- ✅ PC 키 입력 → RX4 수신 → TX4 line echo (loopback) + TX3 debug echo (`RX4: <line>`)
- ⚠️ 일부 byte (특히 영문 'o', 'y') bit 3 일관 flip (예: o→g) — SW-UART TX 9600 timing margin 부족
- ⚠️ Enter 처리 초기 버전에서 `\r\n`이 별도 transaction → false-start trigger → **single transaction (line + CRLF 한 번)으로 fix 완료**

**핵심 박제 — single transaction CRLF**:
9600 SW-UART에서 line + "\r\n"을 두 번 호출하면 transaction 간 MOSI gap이 receiver의 false-start trigger. **buffer에 \r\n append 후 한 transaction**으로 묶어야 함. 같은 패턴이 향후 모든 line-based SW-UART 출력에 적용.

**리소스**:
- FLASH: 27 → **28.7 KB** / 512 KB (5.48%)
- RAM: 22 → **23.0 KB** / 64 KB (35.16%, line_buf 128 byte 포함)
- 빌드: 정상 / 플래시: 4회 반복 모두 verify OK

**다음 (6/2 화)**:
- ⭐ **MAX485 + QDY30A-B Modbus 통합** (sensing-test-2026-06-02.md 시퀀스 따라)
- TX2/RX2 + TX1/RX1(LoRa) + TX3 + TX4/RX4 모든 채널 동시 검증
- bit 3 깨짐 → MAX485 차동 hysteresis로 회복 여부 (5/31 글리치 가설 실전 검증)

**박제**:
- firmware/bleModule_uart_test/{overlay, main.c, README.md} 갱신
- wiki/thoughts/2026-Q2/2026-06-01_sw-uart-tx-debug-cp210x.md
- 작업보고서 6/1 #18 TX4/RX4 검증 완료

## [2026-05-12] site | 1차 현장 방문 — 담당자와 가능성 확인 ✅

- 한림용인CC 현장 1차 방문
- 담당자와 시공 가능성 확인 완료
- 결과: 시공 진행 합의, 2차 방문(5/19)에서 LoRa 통신 검증 + 계약 진행 결정
- ⚠️ 본 박제는 후행 박제 (실제 활동일 5/12 → wiki 박제 5/17, 5일 지연 — sub-vault 신설 전이라 박제 누락)

## [2026-05-17] start | Tier 2 sub-vault 신설 — 한림용인CC 시공 진행 격리 공간

- 프로젝트 개요: 한림용인CC 고가수조 자동급수 무선제어 (1,000만/VAT 포함 11,022,108원)
- 발주자: 한림용인CC (골프존카운티 한림용인, 경기도 용인 처인구 남사면)
- 단계: ★ 시공 직전 (D-3, 5/20 D-day)
- sub-vault 신설 배경:
  - 사용자 요청 — Tier 2 sub-vault 패턴 실험 사례 1번째 (2026-05-17)
  - 목적: ① 진행 관리 격리 ② myWiki wiki화 과정 측정 ③ 완료 후 라이프사이클 평가
  - 결정: today 직접 박제(추적 불명확) vs 별도 repo(과잉) 사이 중간 — sub-vault 채택
- 1차 기획 참조: `../README.md` (10KB, 2026-05-10 작성)
- myWiki entity: `today/myWiki/second-brain/entities/한림용인cc-고가수조.md` (2026-05-12 신설)

## [2026-05-17] decision | sub-vault 라이프사이클 측정 대상 정의

본 sub-vault의 실험 목적 (Tier 2 패턴 검증):

| 단계 | 측정 항목 |
|---|---|
| 1. 셋업 | 셋업 코스트 (실측: ~20분) |
| 2. 시공 진행 박제 (5/17~5/20) | 카드 발송 vs 직접 박제 효율 |
| 3. 시공 완료 (5/20 이후) | sub-vault 산출물 양·질 |
| 4. myWiki 흡수 (5/21~) | 흡수 비용 + 정보 손실률 |
| 5. archive 결정 (1~2주 후) | "분리할 가치 있었나" 평가 |

→ 평가 결과는 `obsidian/myWikiSetup/EXAMPLES_tier2_subvault.md`에 자산화 예정 (myWikiSetup 5번째 사례, Tier 2 1번째 사례).

## [2026-05-17] decision | 실제 일정·자재 계획 박제 (1차 기획 README 갱신)

5/10 README의 "D-3 발주 / D-7 답사 / D-10 펌웨어" 일정은 **시공 일정 미확정 상태의 가설**이었음. 실제 진행 흐름은 다음과 같이 확정:

### 실제 일정

| 날짜 | 단계 | 상태 |
|---|---|:-:|
| 5/12 | 1차 현장 방문, 담당자와 가능성 확인 | ✅ 완료 |
| **5/19** | **2차 현장 방문 — LoRa 통신 거리·상태 검증 + 계약서 사인** ⭐ D-day | ⏳ D-2 |
| 5/19 이후 | 자재 발주 (계약 후) | ⏸ 대기 |
| ~7/19 | 시공 완료 (계약 후 2개월 이내) | ⏸ 대기 |

→ **D-day = 5/19** (계약 + 통신 검증), **완료 = ~7/19** (계약 후 2개월)
→ Tier 2 sub-vault (30~120일)에 정확히 맞는 라이프사이클 (~60일)

### 자재 간소화 (계약 후 발주)

5/10 README 자재 리스트 → 실제 발주 대상 축소:

| 자재 | 5/10 README | 실제 발주 |
|---|---|---|
| 케이스 (함체) | 플라스틱 IP65 (4만/노드) | ✅ **발주 예정** |
| 수위 센서 | 저가형 압력센서 ×N | ✅ **2개 발주 예정** |
| LoRa 모듈 | E22 변종 5~7개 | 🔄 보유분 활용 검토 (5/19 검증 결과 따라) |
| 펌프 제어반 | 핵심부품 35만 | 🔄 (확정 후 박제) |
| 중계기 | 자체조립 20만 | 🔄 (5/19 검증 후 결정 — 중계기 필요 여부 판단) |
| 게이트웨이 RPi 4 | 25만 | 🔄 (확정 후 박제) |

→ 5/19 통신 검증 결과가 자재 결정의 분기점. NLOS 환경 LoRa 통달 OK면 중계기 축소 가능.

### 5/19 D-day 준비 체크리스트

| 준비 | 상태 |
|:-:|---|
| LoRa 통신 검증 장비 (E22 + 수신기 + RSSI 측정) | ⏸ 사용자 확인 필요 |
| 계약서 초안 (하자보증 한계 명시 포함) | ⏸ 사용자 확인 필요 |
| 현장 8 노드 후보 위치 사전 검토 (지도 기반) | ⏸ 사용자 확인 필요 |

## [2026-05-31] firmware | QDY30A-B RS485 수위센서 6개 입수 + 교차 basic test 6/6 통과 ⭐⭐

5/10 README 기준 4-20mA 계획이었으나 실제 입수품은 **RS485 (Modbus RTU) type**. 출력 방식 변경 → 회로/펌웨어 아키텍처 수정 필요. 동일자 PC에서 첫 시도에 통신 확립 + 6개 sensor 교차 검증 완료.

### 환경
- USB-RS485 동글: CH340 (WCH VID 1A86 PID 7523) on **COM44**
- DC 24V 어댑터 + sensor + 동글 1:1 결선 (Red=+24V / Green=GND / Blue=A+ / Yellow=B-)
- 공통 GND: sensor·PSU·동글 3점 묶음
- Modbus 9600/8N1, Slave 0x01, FC 0x03

### Config (6개 모두 동일 — 완벽한 lot 일관성)

| Register | Value | 해석 |
|:-:|:-:|---|
| 0x0000 SlaveAddr | 1 | 기본값 |
| 0x0001 BaudCode | 3 | 9600 통신 중 |
| 0x0002 Unit | 17 | ⚠️ 비표준 (예상 1=cm/2=mm와 상이, OEM 인코딩 추정) |
| 0x0003 Decimal | 1 | 소수점 1자리 |
| 0x0004 Level | 0 | ✅ 공기 중 (5/6 개체), 3 (#5만, +3 offset) |
| 0x0005 ZeroPoint | 0 | 공장 보정 없음 |
| 0x0006 RangeFull | 3000 | 0~3.0m 모델 추정 |

### 공기 중 안정성 (5초 ≈ 22 샘플)

| Sensor | mean | std | 판정 |
|:-:|:-:|:-:|:-:|
| #0~#4 (5개) | **0.0** | **0.00** | ✅ perfect |
| **#5** | **3.0** | **0.00** | ⚠️ stable +3 offset (settling 후) |

→ **6/6 통신 OK + 6/6 양품 (사양 0.5% FS = ±15 raw 허용 → #5의 +3은 0.1% FS, 사양 내)**

### Outlier 박제: Sensor #5

- 1차 측정: mean=2.6, std=1.05, min=0, max=3 → settling 중
- 2차 측정: mean=3.0, std=0.00 (22/22 samples = 3) → **안정 +3 영점 편이**
- 사양 내 정상 (0.1% FS) — 보정 가능 (register 0x0005 ZeroPoint에 -3 write, FC 0x06)
- 침수 매핑 시 #0~#4 중 1개로 단위 확정 → #5 보정값 검증

### 함정 회피 박제
- **A/B 스왑 0건** — 매뉴얼·커뮤니티가 경고한 lot별 함정이 본 lot에는 없음. 6개 단일 결선 패턴 통일 통신
- **공통 GND 3점 (sensor·PSU·동글)** — 미리 적용해 첫 시도부터 통신 OK
- **Hot-swap COM 핸들 잔여** — #3 교체 후 COM44 PermissionError 발생, 2초 대기 후 자동 정상화 — 다음 lot 작업 시 `Start-Sleep -Seconds 2` 자동 삽입 권장
- **pymodbus 3.13 API 변경** — `slave=` → `device_id=` (3.7+ 적용). 호환 layer 없음. 자체 펌웨어/CRC 직접 구현 시 무관

### 다음 단계
- [ ] **침수 깊이 매핑** — PVC 파이프 1.5m or 양동이 0~50cm, 0/10/30/50/100/(150) cm 단계 raw 변화
- [ ] Range full = 3000의 단위 (cm? mm? 0.1cm?) + Unit register 17의 의미 역산 (실측 매핑으로)
- [ ] **Sensor #5 zero-point -3 write** 후 air raw=0 검증
- [ ] 1분 주기 polling 24h 드리프트 측정 (1개 sensor)
- [ ] nRF52832 UART + MAX485 회로 도면 작성
- [ ] Zephyr Modbus RTU master 라이브러리 결정 (또는 자체 CRC16 구현)

### 산출물
- `references/QDY30A-B_RS485_사양서.md` — 사양·register map·배선·트러블슈팅
- `pc_test/qdy30a_modbus_test.py` — 단발 dump/poll/scan/baud-scan 스크립트 4 mode
- `pc_test/qdy30a_single_measure.py` — non-interactive 단발 측정 + CSV append
- `pc_test/qdy30a_batch_test.py` — interactive 6개 일괄 (이번엔 미사용, 추후 활용)
- `pc_test/results/qdy30a_batch_2026-05-31.csv` — 6 sensor + 재측정 1건 raw data
- `pc_test/results/qdy30a_batch_report_2026-05-31.md` — 비교 보고서

## [2026-05-31] reference | UTTEC BLE Module 양산 reference 등재 + PINMAP.md 갱신

QDY30A-B RS485 통합 펌웨어 진입 전, 시공 양산용 보드 후보로 **UTTEC 자체 BLE 모듈** (`oldProject/회로도/bleModule.pdf`, 2022.09.22, AMANO 일본 3,800대 양산 8년+) 검토. **`bleModule_lora_tx`가 J28 14-pin → nRF52832 port 매핑 reference 구현체**임을 발견.

### J28 핀 확정 (lora_tx 양산 코드 기반)

| J28 Pin | 신호 | 칩 port | 검증 |
|:-:|:-:|:-:|:-:|
| 1 | IN_A1 | **P0.11** | ✅ I2C SDA로 INA219 동작 검증 |
| 3 | IN_A2 | **P0.13** | ✅ I2C SCL로 동작 검증 |
| 5 | Rx | P0.08 | ✅ 회로도 (E22 UART RX와 공유) |
| 9 | (J28 Pin 9) | P0.24 | ✅ 회로도 |
| 11 | VDDA_3.3V | — | ✅ |
| 13 | GND | — | ✅ |
| 14 | ENABLE | — | ✅ |
| (2/4/6/8/10/12) | LED_A·LS_A·IN_B1·IN_B2·LED_B·LS_B | 미확정 | main_scan 식별 필요 |

### LED 확정 (PINMAP.md `[?]` 정정)

- D21 BLUE OP_LED → **P0.23** (이전 PINMAP.md 일부에 P0.24 표기 있었으나 lora_tx로 정정)
- D22 RED LED → **P0.18** (이전 P0.17 추정에서 정정)

### 산출물
- `oldProject/test/bleModule/PINMAP.md` 갱신 — `[?]` 4건 확정, 0Ω 점퍼 R90/R92/R97 매핑 확정, J28 14-pin 표 칩 port 컬럼 추가, 검증 작업 history 정리
- `wiki/entities/uttec-ble-module.md` 신설 — 한림용인CC sub-vault 첫 entity, board 제약·장점·단계별 적용 권고 박제

### 한림용인CC 적용 영향

- **1차 시공 = PCA10040 dev kit** (UART0=E22, UART1=RS485, 핀 충돌 0) — 빠른 진입
- **2차 양산 = UTTEC BLE Module** (J23 + extension wire) — 단가 우위
- **3차 다중 골프장 = UTTEC BLE Module v2** (J28 재라우팅, UART1 노출) — 공식 양산 보드

### ⚠️ 박제된 제약

UTTEC BLE Module의 J28 Pin 5 (P0.08)이 E22 UART RX와 같은 net → **E22 LoRa + RS485 sensor 동시 운용 불가**. 해결책 4종 (UART tunneling / SoftUART / 보드 v2 / dev kit) 평가, 단계별 진행 권장.

## [2026-05-31] firmware | UTTEC BLE Module UART pinmap 검증 펌웨어 빌드+플래시 ⭐

PCA10056 (PCA10056 SN 683795210) J-Link OB → UTTEC BLE Module SWD → 9600 8N1 카운터 펌웨어 양산.

### 신규 펌웨어: `firmware/bleModule_uart_test/`

- UART0 = P0.06 TX / P0.08 RX @ 9600 8N1, `chosen { zephyr,console = &uart0 }`
- LED 2개 (D21 BLUE P0.23 + D22 RED P0.18) 동시 1Hz 토글 (gpio-leds binding + aliases)
- main.c: `printk("%u\n", counter++); k_msleep(1000);` 무한 루프
- 빌드 결과: FLASH 18 KB / RAM 4.4 KB

### 빌드 함정 박제 ⭐⭐⭐ — cmd AutoRun 충돌

NCS v2.9.2 빌드 중 ninja → `cmd.exe /C "cd . && ar.exe..."` 호출 시 **HKCU AutoRun (`cd /d C:\todo`)이 cmd.exe CWD를 강제 이동** → ar.exe가 build dir 상대 경로의 .a 파일을 못 만들고 "No such file or directory" 전체 실패.

**해결 패턴** (NCS 작업 시 표준 SOP):
```powershell
$saved = (Get-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun).AutoRun
Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value ""
try { west build ...; west flash ... } finally { Set-ItemProperty ... -Value $saved }
```

메모리 박제: `~/.claude/projects/C--todo-today/memory/feedback_ncs_build_cmd_autorun_conflict.md`

### 플래시 결과

```
nrfjprog --snr 683795210 --program zephyr.hex --chiperase --verify --reset
✅ Erase 0.191s / Program 0.358s / Verify successful / Reset+Run
```

### 다음 단계 (사용자 검증 대기)

- [ ] USB-UART (CH340/CP210x) J23 Pin 2 (TX) + Pin 4 (GND) 연결
- [ ] 터미널 9600 8N1 → 카운터 증가 출력 + banner 확인
- [ ] D21 BLUE + D22 RED LED 1Hz 동시 토글 확인
- [ ] 결과 박제 (성공 시 P0.06/P0.18/P0.23 핀맵 최종 검증 완료)

## [2026-05-31] firmware ⭐⭐⭐ | UTTEC BLE Module J28 14-pin 풀 매핑 실측 확정

`bleModule_uart_test` 펌웨어를 P0.11 단독 토글 → 11 J28 pin 동시 토글로 확장. 사용자가 J28 각 핀에서 1Hz 신호 측정으로 **14/14 핀 정체 모두 실측 확정**.

### 확정 매핑 (사용자 측정 보고)

| J28 Pin | 칩 port | J28 Pin | 칩 port |
|:-:|:-:|:-:|:-:|
| 1 | **P0.11** | 8 | **P0.19** |
| 2 | **P0.15** | 9 | **P0.24** |
| 3 | **P0.13** | 10 | **P0.20** |
| 4 | **P0.02** | 11 | **3.3V** |
| 5 | **RX (P0.08)** | 12 | **P0.04** |
| 6 | **P0.17** | 13 | **GND** |
| 7 | **P0.22** | 14 | **P0.05** |

### 임팩트 ⭐⭐⭐ — 한림용인CC 양산 보드 결정

이전 평가에서는 UTTEC BLE Module의 J28 14핀 중 6핀이 미확정이라 **UTTEC v2 재설계** 필요하다고 판단했었음. **풀 매핑 확정으로 v2 불필요**:

- 자유 GPIO 11개 확보 → UART1 노출 (TX/RX), DE/RE control, 추가 sensor 모두 J28 wire 추가로 가능
- E22 LoRa + QDY30A-B RS485 **동시 운용 보드 v1로 가능** (UART0 = E22, UART1 = MAX485 RS485)
- 단계별 권고 수정: 1차 PCA10040 → ~~2차 BLE Module + 3차 v2~~ → **2차 BLE Module v1 직진 양산**

### 박제 위치
- `oldProject/test/bleModule/PINMAP.md` — 칩 핀 표 + J28 14-pin 풀 매핑 완성, 회로도 net 라벨과 실측 매핑 비교 박제
- `wiki/entities/uttec-ble-module.md` — J28 풀 매핑 + MAX485 통합 자유도 ↑ 평가
- `firmware/bleModule_uart_test/src/main.c` — 검증 펌웨어 (J28 11 pin array + toggle loop)

### 다음 단계
- [ ] 회로도 (`oldProject/회로도/bleModule.pdf`) 재분석 — J28 net 라벨 (IN_B1·LED_A·LS_A·IN_B2·LED_B·LS_B 등)이 실측 매핑과 어떻게 대응하는지 확인. TxRF (Pin 7), ENABLE (Pin 14) 라벨 의미 재검토
- [ ] MAX485 + QDY30A-B 통합 회로 설계 — UART1 핀 할당 결정 (P0.22 + P0.17 또는 다른 조합)
- [ ] UART1 + MAX485 펌웨어 작성 → QDY30A-B 통신 실증

## [2026-05-31] firmware ⭐⭐⭐ | 5-channel UART bring-up 펌웨어 (3 TX + 2 RX) 빌드+플래시 완료

한림용인CC 본격 펌웨어 진입 — **3 TX (LoRa / RS485 / Debug) + 2 RX (LoRa / RS485)** 다중 채널 검증. nRF52832는 HW UART 1개만 있어 나머지 4 채널은 SW로 구현.

### Pin 14 박제

`bleModule_uart_test` 검증 펌웨어로 J28 14-pin 풀 매핑 확정했으나, **Pin 14 (P0.05)만 J28 헤더로 라우팅 안 됨** 확인 (PCB lot 누락). chip pin 동작은 정상이지만 본 PCB에서는 사용 불가. PINMAP.md + entity 박제.

### J28 채널 최종 배치 (사용자 결정)

| J28 Pin | port | 채널 | 디바이스 | 구현 |
|:-:|:-:|:-:|---|---|
| 1 | P0.11 | TX1 | LoRa E22 RXD | HW UART0 TX |
| 2 | P0.15 | TX2 | MAX485 DI (RS485) | SW-UART SPI1 MOSI |
| 3 | P0.13 | RX1 | LoRa E22 TXD | HW UART0 RX |
| 4 | P0.02 | RX2 | MAX485 RO (RS485) | SW-UART GPIO INT |
| 5 | P0.08 | (free) | — | UART0 이동으로 해방 |
| 6 | P0.17 | LoRa M0 | E22 mode bit 0 | GPIO OUT |
| 7 | P0.22 | TX3 | Debug console | SW-UART SPI2 MOSI |
| 8 | P0.19 | LoRa M1 | E22 mode bit 1 | GPIO OUT |
| 9 | P0.24 | DE/RE | MAX485 방향 | GPIO OUT |
| 10 | P0.20 | LoRa AUX | E22 busy signal | GPIO IN pull-up |
| 11 | 3.3V | — | MAX485 VCC | 전원 |
| 12 | P0.04 | (free) | — | 확장 여유 |
| 13 | GND | — | 공통 | 전원 |
| 14 | — | (NC) | — | PCB 미연결 |

### 신규 자산

1. **`sw_uart.{h,c}` 다중 인스턴스화** (oldProject의 single static → struct 기반)
   - 9600 baud용 Bresenham 패턴 신설: `[104,104,104,104,105,104,104,104,104,104]` = 1041 SPI bits
   - 1 MHz SPI 클럭 / 효율 9606 baud (목표 +0.06%)
   - 1 UART byte = 131 SPI bytes
   - SPI1 + SPI2 동시 인스턴스 OK

2. **`sw_uart_rx.{h,c}` 신규 작성** — GPIO INT + busy-wait timing (9600 baud)
   - falling edge → 52 µs (half bit) 대기 → start 검증 → 8 data bits @ 104 µs → stop bit → ring buffer push
   - 8N1, ISR busy-wait 패턴 (검증용 단순 구현, 추후 TIMER capture로 최적화 가능)

3. **`main.c` 5-channel 동시 운용**
   - TX1/TX2/TX3 각각 "TX{N}: counter" 매 1초 송신
   - TX3 = monitor — RX1·RX2 들어오는 모든 byte를 "RX1: …" / "RX2: …" prefix로 echo
   - 외부 점퍼로 loopback 검증 가능 (TX1↔RX1, TX2↔RX2)

### 빌드 함정 박제 — SPIM PAN 58

nRF52832 SPIM은 Product Anomaly 58 (RXD.MAXCNT==1 + TXD.MAXCNT<=1 시 추가 byte clocked out)로 기본 빌드 차단. SW-UART는 TX-only라 PAN 58 영향 없음. 해결: `CONFIG_SOC_NRF52832_ALLOW_SPIM_DESPITE_PAN_58=y` 추가.

### 결과
- 빌드: FLASH 27 KB / RAM 6.5 KB
- 플래시: PCA10056 SN 683795210 → UTTEC BLE Module via SWD ✅
- Verify successful + System reset + Run ✅

### 검증 사용법 (외부 점퍼)

- TX1 (Pin 1) ↔ RX1 (Pin 3) wire 점퍼 → TX3 line에서 `RX1: TX1: N` 매 초 echo 관찰
- TX2 (Pin 2) ↔ RX2 (Pin 4) wire 점퍼 → TX3 line에서 `RX2: TX2: N` 매 초 echo 관찰
- 점퍼 없으면 TX3에 자기 카운터 `TX3: N`만 표시

→ 5 채널 양방향 모두 동작 검증 가능.

## [2026-05-31] firmware ⭐⭐ | SW-UART TX/RX 호환성 deep-dive

장시간 iteration으로 SW-UART (SPI MOSI 기반) 양산 적용 조건 확정.

### 검증 매트릭스 결과

| baud | TX (SW-UART) | RX (SW-UART) |
|:-:|:-:|:-:|
| 9,600 | ✅ chip 출력 OK (TX2→RX2 internal 100%) / **HW UART RX와 양립 불가** | ✅ DWT cycle-precise 정밀 timing |
| 115,200 | ✅ lora_tx 양산 검증된 path | ❌ ISR latency 한계 (Zephyr GPIO callback ~10 µs > bit period 8.68 µs) |

### TX2 → RX1 비대칭 신비 (미해결, MAX485로 회피)

**증상**: TX1→RX1 ✅ / TX1→RX2 ✅ / TX2→RX2 ✅ (100% perfect, 45/45 OK) / **TX2→RX1 ❌ garbled**

**가설**:
- SW-UART TX (SPI MOSI) 신호에 sub-µs 글리치 존재 (peripheral start/stop 시 발생 가능)
- HW UART RX (16× oversampling) 가 글리치를 majority vote에 포함 → 데이터 왜곡
- SW-UART RX (busy-wait 단일 sample) 는 글리치 미감지

**시도한 해결책 (모두 미해결)**:
- SPI 클럭 변경 (8 MHz / 1 MHz / 500 kHz)
- Bresenham pattern 1041 → 1050 SPI bits (baud -0.79% 보정)
- Buffer 132 → 200 bytes (trailing idle 550 µs 확장)

**실전 영향 예상**: MAX485 hysteresis + RS485 차동 wire 필터링으로 글리치 제거 가능성 높음 → sensor 통신엔 영향 없을 듯. 다음 세션 검증 필요.

### 다음 세션 액션
- [ ] MAX485 결선 + QDY30A-B 실 통신 (Modbus FC 0x03 register 0x0004 read)
- [ ] E22 LoRa baud 9600 재설정 (REG0 0xE0 → 0x60)
- [ ] (선택) Logic analyzer 가능 시 SW-UART TX MOSI 파형 측정으로 글리치 정체 확인

### 산출물
- `firmware/bleModule_uart_test/boards/nrf52dk_nrf52832.overlay` — UART0/SPI1/SPI2 핀 reassign + button0 disable + LED alias
- `firmware/bleModule_uart_test/prj.conf` — RTT console + SPI + PAN58 override
- `firmware/bleModule_uart_test/src/sw_uart.{h,c}` — 9600 baud 다중 인스턴스
- `firmware/bleModule_uart_test/src/sw_uart_rx.{h,c}` — GPIO INT 기반 SW RX
- `firmware/bleModule_uart_test/src/main.c` — 5-channel 통합 + RX→TX3 monitor

## [2026-06-01] firmware ⭐⭐⭐ | SW-UART TX 깨짐 root cause 확정 + baud-dependent fix

5/31 deep-dive 9 iteration이 미해결 상태로 종료된 TX2 SW-UART (9600) 깨짐 문제, 6/1 오전 사용자 HyperTerminal 재확인을 통해 root cause 확정 + 양 baud 안정 동작 fix 완료.

### Root cause (확정)

`sw_uart_write()` 가 byte마다 별도 `spi_write()` 호출 → byte 사이 SPI peripheral이 MOSI driver 해제하는 순간 brief LOW glitch 발생. 9600 baud bit period (104 µs) 의 큰 비율이라 CP210x 16x oversampling이 false start로 인식 → 첫 byte 후 모두 깨짐.

TX2→RX2 internal loopback이 100% OK였던 이유: `sw_uart_rx` 가 busy-wait single sample이라 glitch 미감지. **internal 검증이 우리를 5/31 9 iteration으로 오도**.

### Fix — baud-dependent 분기

| baud | 전략 | 이유 |
|:-:|---|---|
| 9600 | Single concatenated SPI transaction | inter-transaction gap glitch 제거 |
| 115200 | Per-byte SPI transaction | back-to-back byte 사이 idle 부족 회피 (glitch 자체는 bit period 짧음으로 무영향) |

같은 물리 glitch가 baud rate에 따라 정반대 영향 → universal fix가 새 bug 도입 가능성 박제.

### 검증 (HyperTerminal CP210x)

- TX2 (9600) ✅ 깔끔 ("TX2: N\r\n" 100% 정상)
- TX3 (115200) ✅ 깔끔 ("TX3:", "RX2:", stats 모두 정상)
- jumper noise로 false_start ~2/sec, framing ~1/sec — MAX485 양산 시 해소 예상

### Interrupt 부하 분석 (양산 안전 확인)

`sw_uart_rx` ISR busy-wait 1 ms/byte (Zephyr ISR nested 안 함). 현 부하 12 ISR/sec = 1.2% CPU. **Modbus 1 Hz polling 양산 시나리오 1% CPU avg, 안전**. continuous burst 시만 위험하나 실제 sensor는 burst 아님.

### 산출물

- `firmware/bleModule_uart_test/src/sw_uart.c` — baud-dependent 분기 적용
- `firmware/bleModule_uart_test/README.md` — 1단계 stale → 현 5-channel + per-baud strategy 정확히 갱신
- `wiki/thoughts/2026-Q2/2026-06-01_sw-uart-tx-debug-cp210x.md` — 디버그 전 과정 박제 (Hypothesis A/B/C 진화, root cause, fix, 교훈)

### 양산 PCB 영향

본 fix는 디버그 환경 (CP210x 단일-ended) 정상 동작 보장. 양산 MAX485 + RS485 차동 환경은 transceiver hysteresis + 차동 noise rejection으로 본 fix 없이도 더 robust 가능. 그러나 **6/2 (화) 수조 sensing test 시 HyperTerminal raw Modbus frame 모니터 가능** = 디버그 가치.

## 다음 박제 예정 (할 일 큐)

- `## [2026-05-19] milestone | LoRa 통신 거리·상태 검증 + 계약서 사인` ⭐ D-day
- `## [2026-05-19] revenue | 계약 체결 — 1,000만 + VAT 매출 확정` (계약 사인 시)
- `## [2026-05-2X] purchase | 케이스 + 수위센서 2개 발주`
- `## [2026-06-XX] site | 시공 진행 — 노드 설치 (펌프/중계기/고가수조)`
- `## [2026-07-XX] milestone | 시공 완료 (계약 후 2개월 이내)`
- `## [2026-07-XX] complete | 운영 안정성 첫 데이터` (시공 완료 직후)
- `## [2026-07-XX] absorb | myWiki 흡수 — 한림그룹 재거래 패턴 + Stage 3 실증 사례`
