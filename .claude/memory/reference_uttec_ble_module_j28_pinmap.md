---
name: UTTEC BLE Module J28 14-pin header 핀맵 (target nRF52832) ⭐
description: 한림용인CC LoRa TX·RX 보드의 J28 14pin header 전체 핀 매핑. 전원·신호·역할 누적. PCA10056·PCA10100 DK의 14-pin SWD header를 통해 외부 target nRF52832 보드의 J28 14pin과 연결됨
type: reference
originSessionId: 4f18aee0-b940-4ead-acdf-7edcb4f91c82
---
## J28 14pin header 핀맵 (TX/RX 양쪽 보드)

| J28 Pin | nRF P | TX 역할 (lora_tx_water_level) | RX 역할 (lora_rx_display) |
|:-:|:-:|------|------|
| 1 | P0.11 | LoRa E22 RXD ← UART0 TX (9600) | LoRa E22 RXD ← UART0 TX (자동 setup) |
| 2 | P0.15 | MAX485 DI ← HW UART0 TX (Modbus, time-mux) | — |
| 3 | P0.13 | (unused — TX만, LoRa RX 없음) | LoRa E22 TXD → UART0 RX (수신) |
| 4 | P0.02 | MAX485 RO → HW UART0 RX (Modbus, time-mux) | — |
| 5 | (미확정) | — | — |
| 6 | P0.17 | LoRa M0 (Normal = LOW) | LoRa M0 (Normal = LOW) |
| 7 | P0.22 | Debug TX (SPI2 MOSI, SW-UART 115200) | (SPI2 disabled) |
| 8 | P0.19 | LoRa M1 (Normal = LOW) | LoRa M1 (Normal = LOW) |
| 9 | P0.24 | MAX485 DE/RE | — |
| 10 | P0.20 | LoRa AUX | LoRa AUX (input, unused) |
| **11** | **3.3V** | **전원 ⭐ 박제 2026-06-09** | **전원 ⭐ 박제 2026-06-09** |
| 12 | P0.04 | Relay/buzzer (active low alarm, level<400 ON) | Relay/buzzer (active low alarm, level<400 ON) |
| **13** | **GND** | **접지 ⭐ 박제 2026-06-09** | **접지 ⭐ 박제 2026-06-09** |
| 14 | (미확정) | — | — |

## J28과 별도 핀 (header 미노출)

| nRF P | 역할 | 비고 |
|:-:|------|------|
| P0.06 | SPI0 MOSI = SW-UART USB-VCOM (9600) → 외부 CP210x → COM8 (TX) / COM47 (RX) | J28 미노출 |
| P0.16 | SPI0 dummy SCK | J28 미노출, free |
| P0.14 | SPI2 dummy SCK (TX only) | J28 미노출 |
| P0.18 | LED RED (uttec_led_red, ACTIVE_LOW) | J28 미노출 |
| P0.23 | LED BLUE (uttec_led_blue, ACTIVE_LOW) | J28 미노출 |

## 부저(Relay) 동작 사양 (2026-06-09 추가)

- 핀: P0.04 (= J28 Pin 12)
- 극성: active low (LOW=beep ON, HIGH=OFF)
- 임계: `level < 400` → ON, `level ≥ 400` → OFF
- 부팅 초기값: HIGH (OFF — 부저 미동작)
- TX/RX 양쪽 적용 (TX는 자체 Modbus 응답에서, RX는 LoRa 메시지 파싱 후 비교)
- 사용자 의도: 외부 회로는 relay 출력이지만, 시연 시 청취 확인용으로 active low buzzer를 동일 핀에 결선. 의미는 "relay"

## Why

- 사용자가 J28 14pin header에 외부 부저·전원·신호를 결선해서 시연. 핀 5/11/13/14 정보가 overlay에 없어 매번 확인 요청 발생.
- 2026-06-09 D-day 직전에 Pin 11=3.3V, Pin 13=GND 박제 (사용자 직접 알려줌).

## How to apply

- TX/RX 양쪽 boards/nrf52dk_nrf52832.overlay 코멘트에도 동일 J28 핀맵을 박제 (코드와 같이 살아있도록)
- 새 J28 신호 추가 시 본 문서와 양쪽 overlay 코멘트 동시 업데이트
- Pin 5, 14 는 사용자 추후 확인 시 박제
- cross-link: `feedback_nrf_dk_14pin_swd_target.md` (DK ↔ target 구조)
