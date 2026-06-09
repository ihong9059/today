---
name: nRF DK 14-pin SWD → 외부 target nRF52832 구조 🚨
description: PCA10056/PCA10100은 flash 호스트 DK (역할 식별용 명칭). 14-pin SWD header로 외부 nRF52832 target에 연결. nrfjprog NRF52832 출력은 target chip. 매번 confusing/잘못 보고 금지
type: feedback
originSessionId: 4f18aee0-b940-4ead-acdf-7edcb4f91c82
---
🚨 **한림용인CC LoRa 트랙에서 PCA10056·PCA10100을 사용자가 명시하면 즉시 다음 구조로 해석할 것. "보드가 다르다"고 말하지 말 것. 매번 묻지 말 것.**

## 구조

- **PCA10056** = TX 역할의 flash 호스트 DK (nRF52840 DK)
- **PCA10100** = RX 역할의 flash 호스트 DK (nRF52833 DK)
- DK 자체 chip은 flash 대상이 **아님**. DK는 **JLink 디버거 + 14-pin SWD header**로만 사용됨
- 14-pin SWD header → **외부 target nRF52832 보드** (UTTEC BLE Module 형태) 연결
- 실제 flash 대상 = 외부 nRF52832
- `nrfjprog --deviceversion` 결과 `NRF52832_xxAA_REV2` = 정상. **외부 target chip을 본 것**

## 매핑 (한림용인CC D-day 기준)

| DK 명칭 | 역할 | debug COM | target chip |
|---|---|:-:|:-:|
| PCA10056 | TX (lora_tx_water_level) | COM8 | nRF52832 |
| PCA10100 | RX (lora_rx_display) | COM47 | nRF52832 |

- COM8·COM47 = Silicon Labs CP210x USB-UART (외부 어댑터). target nRF52832 P0.06 SW-UART 출력을 받음
- JLink CDC UART (예: COM13, COM14, SEGGER VID 1366) = DK 내장 CDC (RTT/UART direct). debug 용도 아님 — 사용자가 명시한 debug 포트는 CP210x 쪽

## Build target

- `west build -b nrf52dk/nrf52832 --pristine` (DK 명칭과 무관, target chip 기준)
- overlay 파일: `boards/nrf52dk_nrf52832.overlay` 그대로
- PCA10056/PCA10100용 별도 overlay 불필요. 14-pin SWD는 단순히 SWD signal만 통과

## Why

- 사용자가 이 구조를 여러 차례 설명했음에도 매번 잊고 "보드가 다르다"고 잘못 보고함 (6/9 D-day 직전 박제). 매번 같은 설명을 강요하면 한정된 시간을 낭비함.
- nrfjprog 결과의 NRF52832가 PCA10056·PCA10100과 모순처럼 보여도 모순이 **아니다** — SWD 통해 외부 target을 본 것이 정상.

## How to apply

- 사용자가 "PCA10056", "PCA10100" 명시 → 즉시 위 매핑 적용. "보드가 다르다"고 절대 말하지 말 것.
- flash 시: `west flash --runner jlink --dev-id <SN>` — SN은 DK의 JLink SN. SN ↔ TX/RX 매핑은 사용자 확인 후 메모리 update.
- 보드/포트 confusing 시: 이 문서 먼저 읽고, 사용자에게 묻기 전에 구조 자체를 다시 확인.
- 향후 dk(PCA10056·PCA10100)와 target(외부 nRF52832)을 항상 분리해서 표기. "보드"라는 한 단어로 뭉치지 말 것.
