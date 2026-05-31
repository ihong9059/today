---
title: UTTEC BLE Module (자체 양산 보드)
type: hardware-entity
created: 2026-05-31
chip: nRF52832-QFAA QFN48
schematic: oldProject/회로도/bleModule.pdf (2022.09.22)
production_volume: AMANO BLE Mesh 일본 3,800대 + 8년+
status: 양산 검증 완료, 한림용인CC 시공용 후보 보드
---

# UTTEC BLE Module — 한림용인CC reference 보드

> 본 entity는 한림용인CC 고가수조 자동급수 무선제어 프로젝트에서 **시공 양산용 보드 후보**로 등재된 UTTEC 자체 BLE 모듈 reference. 외부 자산 (oldProject) 참조 + 본 프로젝트 적용 가능성 평가.

## 기본 정보

| 항목 | 값 |
|---|---|
| **MCU** | nRF52832-QFAA QFN48 (Cortex-M4F @ 64MHz, 512KB Flash, 64KB RAM) |
| **회로도** | `oldProject/회로도/bleModule.pdf` (UTTEC, 2022.09.22) |
| **양산 실적** | **AMANO BLE Mesh 일본 3,800대 + 8년+ 운용** ⭐⭐⭐ |
| 외형 헤더 | J23 (4-pin SWD/UART), J28 (**14-pin CON14A 2.54mm**) |
| 디버그 | J-Link 외부 (J23 SWD) |
| LED | 2개 (D21 BLUE = P0.23, D22 RED = P0.18, 모두 ACTIVE_LOW) |
| 단가 | 자체 BOM, ~5만원/노드 예상 (양산 시) |

## J28 14-pin 풀 매핑 ⭐⭐⭐ (2026-05-31 사용자 실측 확정)

| Pin | **칩 port** | 회로도 net | RS485 통합 시 용도 |
|:-:|:-:|---|---|
| 1 | **P0.11** ✅ | IN_A1 | 자유 사용 (INA219 미장착 시) |
| 2 | **P0.15** ✅ | (실측 확정) | 자유 사용 |
| 3 | **P0.13** ✅ | IN_A2 | 자유 사용 |
| 4 | **P0.02** ✅ | (실측 확정) | 자유 사용 |
| 5 | **P0.08** ✅ | Rx | UART0 RX와 동일 (E22와 공유 ⚠️) |
| 6 | **P0.17** ✅ | (실측 확정) | 자유 사용 |
| 7 | **P0.22** ✅ | (실측 확정) | 자유 사용 (lora_tx에서 SW-UART debug 사용) |
| 8 | **P0.19** ✅ | (실측 확정) | 자유 사용 |
| 9 | **P0.24** ✅ | (J28 net) | DE/RE control 후보 |
| 10 | **P0.20** ✅ | (실측 확정) | 자유 사용 |
| 11 | VDDA_3.3V | — | MAX3485 전원 (3.3V) |
| 12 | **P0.04** ✅ | (실측 확정) | 자유 사용 |
| 13 | GND | — | GND |
| 14 | **P0.05** ⚠️ | (chip OK, J28 미연결) | **사용 불가** (PCB 라우팅 누락) |

✅ = `firmware/bleModule_uart_test/` 검증 펌웨어로 1Hz 동시 토글 후 사용자 J28 각 핀에서 신호 측정 확정.

### MAX485 + QDY30A-B RS485 통합 자유도 ↑

기존엔 J28 6핀 미확정으로 회로 설계 제약이 컸으나 풀 매핑 완료 후:
- **UART1 노출 가능** — 자유 GPIO 11개 중 2개를 UART1 TX/RX로 할당 (예: TX=P0.22, RX=P0.17)
- **DE/RE control** — P0.24 (J28 Pin 9) 또는 다른 free GPIO
- **MAX485 power 3.3V** — J28 Pin 11 (VDDA_3.3V) 활용
- → **UTTEC BLE Module v2 설계 불필요**, 기존 v1 보드에 J28 wire 추가로 한림용인CC 양산 가능

## 한림용인CC 본격 5-channel 배치 (2026-05-31 사용자 확정)

| J28 Pin | port | 채널 | 디바이스 | 구현 |
|:-:|:-:|:-:|---|---|
| 1 | P0.11 | TX1 | LoRa E22 RXD | HW UART0 TX |
| 2 | P0.15 | TX2 | MAX485 DI (RS485) | SW-UART SPI1 MOSI |
| 3 | P0.13 | RX1 | LoRa E22 TXD | HW UART0 RX (button0 disable) |
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
| 14 | — | (NC) | — | PCB 미연결 ⚠️ |

검증 펌웨어: `firmware/bleModule_uart_test/` (3 TX + 2 RX 동시 운용, 9600 8N1, FLASH 27 KB)

## J23 4-pin (SWD + UART)

| Pin | 신호 |
|:-:|:-:|
| 1 | VDD_3V (3.3V 전원) |
| 2 | TX = P0.06 (UART TX) |
| 3 | RX = P0.08 (J28 Pin 5와 동일 net) |
| 4 | GND |

## 한림용인CC 적용 평가

### ✅ 장점

- **양산 검증 8년+** — AMANO 3,800대 무인 운용 안정성 실증
- **단가 우위** — 자체 BOM, dev kit (PCA10040 ~$50) 대비 시공 단가 절감
- **폼팩터** — 모듈 크기, 양산 케이스에 fit
- **E22 LoRa 양산 코드 존재** (`bleModule_lora_tx`) — 한림용인 LoRa 인프라 그대로 활용

### ⚠️ 제약 — RS485 sensor 통합 시

| 항목 | 상태 | 영향 |
|---|---|---|
| UART 충돌 | E22 + RS485 모두 UART 필요, 보드는 UART0(P0.06/P0.08) 노출만 | 동시 운용 불가 → SoftUART 또는 보드 v2 설계 |
| J28 사전 할당 | AMANO 펌웨어용 라우팅 (IN/LS/LED A·B 채널) | 골프장 RS485에는 부분 부적합 |
| J28 미확정 6핀 | LED_A·LS_A·IN_B1·IN_B2·LED_B·LS_B | main_scan 으로 식별 필요 |
| 디버그 인터페이스 | 외부 J-Link 필요 | dev kit 대비 디버그 약간 불편 |

## 권고 (한림용인CC 단계별 진행)

| 단계 | 보드 | 이유 |
|---|---|---|
| **1차 시공** (1대) | **PCA10040 dev kit** | UART0=E22 + UART1=RS485, 핀 충돌 0, 빠른 진입 |
| **2차 확장** (3~5대) | UTTEC BLE Module + 부분 wire 추가 (J23 UART + extension wire) | 양산 단가 |
| **3차 양산** (한림그룹 다음 골프장) | **UTTEC BLE Module v2** (J28 재라우팅, UART1 노출) | 골프장 다중 sensor 공식 양산 보드 |

## 참조 자산 (외부 — oldProject/)

| 파일 | 가치 |
|---|---|
| `oldProject/회로도/bleModule.pdf` | 회로도 원본 |
| `oldProject/test/bleModule/PINMAP.md` | 칩 핀 1~49 + J28/J23 매핑 + 0Ω 점퍼 (lora_tx 확정값 반영, 2026-05-31 갱신) |
| **`oldProject/test/bleModule_lora_tx/boards/nrf52dk_nrf52832.overlay`** ⭐ | **J28 Pin 1·3 + LED 확정 reference (devicetree 형식)** |
| **`oldProject/test/bleModule_lora_tx/src/main.c`** ⭐ | INA219 solar + battery VDD + E22 LoRa 양산 데모 |
| `oldProject/test/bleModule/src/main_scan.c` | 27 GPIO 토글 (미확정 6핀 식별 도구) |

## 관련 entity

- 한림용인CC 고가수조 — 본 프로젝트
- AMANO BLE Mesh (일본) — 양산 실증 사례 (myWiki/entities/양산제품.md)
- E22-900T30D LoRa 모듈 — 동시 운용 시 UART 충돌 이슈

## log

- **2026-05-31**: entity 신설. `bleModule_lora_tx`를 J28 핀 → port 매핑 reference로 등재. PINMAP.md 갱신 (LED 핀 P0.23/P0.18, J28 Pin 1·3 = P0.11/P0.13). QDY30A-B RS485 통합 시 P0.08 (UART RX) E22와 공유 제약 박제.
