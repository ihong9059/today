---
name: UTTEC BLE Module — flash 후 POWER reset 필수 ⚠️
description: 🚨 west flash / nrfjprog --reset 직후 LED·UART·GPIO 동작 안 함 = SW reset 부족. POWER OFF/ON 필수. "아무것도 동작 안 함" 사용자 신호 = 즉시 power cycle 권고
type: feedback
triggers: [west flash, nrfjprog --reset, UTTEC BLE Module 펌웨어 업데이트, 보드 동작 확인]
originSessionId: 11d40656-fcf2-41d9-abd5-1ce25c02d963
---
## 🚨 핵심

UTTEC BLE Module (nRF52832 QFAA, 2022.09.22 PCB)에 펌웨어를 flash한 후, **soft reset (`--reset`, `--pinreset`)만으로는 깨끗한 부팅이 안 됨**. LED·UART·GPIO toggle 등 외부 관찰 가능한 동작이 모두 멈춘 것처럼 보임.

**해결**: 외부 전원 (PCA10100 VTG_3V3 또는 별도 3.3V) **OFF → ON (POWER reset)** 한 번 수행. 즉시 동작.

## 증상

- `nrfjprog --readregs` → PC, SP 정상 (실행 중처럼 보임)
- `nrfjprog --memrd` chip ID 정상 (0x00052832)
- west flash → `Verify successful` + `Board flashed successfully`
- **그러나 LED 안 깜빡임, UART 출력 0, Relay/GPIO 토글 0**
- chip은 정상이나 실제 회로 동작 무

## Why

추정 원인:
- SWD pin reset이 chip core는 reset해도 일부 peripheral state 또는 외부 신호 회로의 latch를 clear 안 함
- 또는 GPIO output state가 flash 전 잔여 상태로 유지
- POWER cycle은 모든 capacitor 방전 + chip RAM/peripheral 완전 초기화

## How to apply

**🚨 PREEMPTIVE**: 펌웨어 flash 직후 사용자에게 LED/UART/GPIO 동작 확인 요청할 때, 미리 "POWER reset 1회 수행 후 확인" 가이드 첨부.

**진단 순서** (사용자가 "동작 안 함" 보고 시):
1. ⭐ **첫 액션 = POWER reset 권고** (외부 전원 차단 5초 → 재공급)
2. POWER reset 후에도 무동작 → chip ID / PC 진단
3. chip 정상 + 무동작 → 회로/결선 점검 (LED active polarity, GPIO 핀맵 등)

이 순서가 가장 빠른 진단 경로. SW 진단 먼저 → 시간 낭비 (2026-06-07 박제).

## 박제 사건

- **2026-06-07**: 한림용인CC bleModule_uart_test에 P0.04 Relay GPIO 추가 + flash. west flash 성공 (Verify ✅, J-Link SN 683795210 PCA10056 OB). 사용자: "왜 아무것도 동작 안 함?" → SW 진단 (chip ID, PC, SP 모두 정상) → 사용자: "**파워 reset 안 했네요**" → POWER cycle 후 즉시 동작 확인.

## 관련

- `reference_factory_rpi4_uttec_factory.md` — UTTEC 보드 인프라
- `feedback_ncs_build_cmd_autorun_conflict.md` — flash 명령 직전 AutoRun 사전 해제 (같이 자주 발동되는 함정)
- 메모리에 박제된 PCA10056 SN 683795210 = J-Link OB (UTTEC BLE Module SWD 디버그 전용)
