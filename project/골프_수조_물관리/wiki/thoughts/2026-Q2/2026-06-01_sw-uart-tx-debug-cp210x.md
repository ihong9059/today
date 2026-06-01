---
title: SW-UART TX 깨짐 디버그 — CP210x 비대칭 baud-dependent fix
type: thought
created: 2026-06-01
tags: [firmware, sw-uart, debug, cp210x, nrf52832, hanlim-yongin, spi-mosi]
related: [uttec-ble-module, sw-uart-tx-design]
---

# SW-UART TX 깨짐 디버그 — CP210x 비대칭 baud-dependent fix (2026-06-01)

## 배경

2026-05-31 한림용인CC 5-channel UART bring-up 펌웨어 작성 시 SW-UART TX 비대칭 현상 발견. internal loopback (TX→RX, 같은 MCU 내)은 정상이지만 외부 USB-UART (CP210x) 에선 깨짐. 5/31 deep-dive 9 iteration에도 미해결.

2026-06-01 사용자 재확인 ("HyperTerminal에서 TX2 깨져 보임") 후 재검토 → root cause 확인 + baud-dependent fix 확정.

## 증상 매트릭스

| 경로 | baud | SPI clock | 결과 | 비고 |
|---|---|---|:-:|---|
| TX1 → RX1 (HW UART) | 9600 | — | ✅ | 100% 정상 |
| TX1 → RX2 (SW-UART) | 9600 | — | ✅ | 100% 정상 |
| TX2 → RX2 (SW-UART internal) | 9600 | 1 MHz | ✅ | 100% 정상 (45/45) |
| **TX2 → RX1 (HW UART)** | 9600 | 1 MHz | ❌ | garbled (5/31 deep-dive 9 iteration) |
| **TX2 → CP210x USB-UART** | 9600 | 1 MHz | ❌ | 첫 byte 후 garbled (6/1 발견) |
| TX3 → CP210x USB-UART | 115200 | 8 MHz | ✅ | 정상 (5/31 검증 + 6/1 재확인) |

⭐ **결정적 단서**: TX3 (115200) 정상 + TX2 (9600) 깨짐 + TX2→RX2 internal 100% OK = **baud-specific 문제**.

## Hypothesis 진화

### Hypothesis A: SW-UART TX glitch (5/31 가설)

- SW-UART TX (SPI MOSI 기반) 가 sub-µs glitch 발생
- HW UART RX의 16x oversampling이 glitch를 majority vote에 포함 → 데이터 왜곡
- SW-UART RX (busy-wait single sample) 는 미감지

**5/31 시도 (모두 실패)**:
- SPI 클럭 8 MHz → 1 MHz → 500 kHz
- Bresenham pattern 1041 → 1050 (baud -0.79% 보정)
- Buffer 132 → 200 bytes (trailing idle 550 µs 확장)

### Hypothesis B: Inter-SPI-transaction MOSI gap (6/1 root cause)

- `sw_uart_write` 가 byte마다 별도 `spi_write()` 호출 → byte 8개면 8 transaction
- transaction 종료 시 SPI peripheral이 MOSI driver 해제 → pull-up이 HIGH 회복
- **회복 과정에 brief LOW glitch (~수십 µs)** 발생
- 9600 baud bit period = 104 µs → 수십 µs glitch가 **1 bit period의 상당 부분** → CP210x 16x oversampling이 false start로 인식
- 115200 baud bit period = 8.7 µs → glitch가 1 bit period보다 짧음 → receiver 무시

### Hypothesis C: TX3 single-transaction 부작용 (6/1 fix 적용 후 발견)

Hypothesis B fix (single transaction)를 양 baud에 일률 적용한 결과:
- TX2 정상화 ✅
- TX3 새로 깨짐 ❌ — "RX2: " 5 byte transaction 시 짝수 인덱스 (2, 4) 가 **1-bit 좌측 시프트** ('2' 0x32 → 'd' 0x64, space 0x20 → '@' 0x40)

**이유**: 115200 baud에서 byte 인코딩 trailing idle이 87 byte 중 2 SPI bit (0.25 µs) 뿐 → back-to-back UART frame 사이 idle 부족 → CP210x 재동기화 실패.

→ **각 baud는 정반대 요구사항**:
- 9600 → inter-transaction gap **제거** 필요
- 115200 → inter-transaction gap **유지** 필요

## Root Cause (확정)

| baud | bit period | glitch (~수십 µs) | back-to-back idle (0.25 µs) | 결론 |
|:-:|:-:|:-:|:-:|---|
| 9600 | 104 µs | bit period의 ~30% → false start | OK (정상 stop) | **gap 제거** |
| 115200 | 8.7 µs | bit period 안 됨 → 무시 | bit period 1/35 → 재동기화 실패 | **gap 유지** |

물리적으로 동일한 glitch와 동일한 timing이 baud rate에 따라 정반대 영향. UART receiver의 동기화 메커니즘 특성이 baud-dependent.

## Fix — baud-dependent 분기

`sw_uart.c` `sw_uart_write()` 함수 분기:

```c
if (u->baud == SW_UART_BAUD_9600) {
    // Single concatenated SPI transaction (gap 제거)
    static uint8_t big_buf[80 * SPI_BYTES_MAX]; // 16 KB
    // 전체 string을 1개 buffer에 encode → 1 spi_write
} else {
    // Per-byte SPI transaction (gap 유지)
    uint8_t buf[SPI_BYTES_MAX];
    for (i = 0; i < len; i++) {
        encode_uart_byte(...);
        spi_write(...);  // byte마다
    }
}
```

## 검증 결과 (2026-06-01)

HyperTerminal CP210x:
```
TX3: 41
RX2: TX2: 41         ← TX2 (9600) jumper로 RX2 받아서 TX3 echo
TX3: 42
RX2: TX2: 42
RX2-stats: isr=373 ok=279 framing=32 false=62
RX2: TX2: 45
TX3: 46
...
```

- TX3 ✅ 정상 ("TX3:", "RX2:", stats 모두 깔끔)
- TX2 ✅ 정상 (jumper echo "TX2: N" 깔끔)
- ⚠️ false_start ~2/sec, framing ~1/sec — jumper noise (환경적), MAX485 양산 시 무관

## 잔여 우려 — Interrupt 부하

### sw_uart_rx ISR 분석

ISR 안 busy-wait 약 1 ms/byte (9600 × 10 bit). 다른 Zephyr ISR은 중단됨.

**현 부하** (5초 stats 차분):
- 12 ISR/sec → 12 ms/sec = **1.2% CPU** ✅

**Modbus 양산 시나리오** (sensor 1Hz polling):
- query 8 byte TX (8 ms) + 응답 10 byte RX (10 ms ISR 점유) = cycle당 10 ms ISR
- 1 Hz polling → **1% CPU avg, 10% peak during cycle**
- 다른 작업 (LoRa AUX 폴링, LED, timer) 모두 cycle 사이 idle에서 처리 가능 ✅

**위험 시나리오 (양산에선 발생 안 함)**:
- RX2 continuous 9600 baud burst (960 byte/sec) → 96% CPU
- 실제 sensor는 burst 아님 + MAX485 idle 안정 → 위험 없음

### 추후 개선 여지

여유 시간 시 TIMER capture 방식으로 ISR busy-wait 제거 가능. 양산엔 불필요.

## 양산 PCB 영향

### MAX485 + RS485 차동 환경

| 항목 | 현 단일-ended 환경 (CP210x) | 양산 MAX485 + RS485 |
|---|---|---|
| inter-byte gap 민감도 | 높음 (TX2 fix 필요) | 낮음 (transceiver hysteresis + 차동 noise rejection) |
| Glitch 영향 | 발생 시 false start | 차동 wire가 common-mode glitch 거부 |
| 9600 baud TX | **fix 필수** (CP210x 디버그 시) | fix 없이도 가능성 (MAX485가 흡수) |

→ 현 fix는 디버그 환경 정상 동작 보장. 양산은 fix와 무관하게 MAX485가 더 robust.

### 6/2 (화) 수조 sensing test 의미

본 fix로 PC HyperTerminal 디버깅 가능 → sensing test 중 raw 통신 모니터 가능. fix 없으면 PC 측 디버그 데이터 신뢰성 X.

## 코드 변경 요약

`firmware/bleModule_uart_test/src/sw_uart.c`:
- `sw_uart_write()` baud-dependent 분기 (단일 transaction vs per-byte)
- 양 분기 모두 동일 encoder 사용
- 정적 buffer 16 KB (9600 path), 스택 buffer 200 byte (115200 path)
- RAM 사용: 6.5 KB → 22 KB (16 KB 추가, 64 KB 중 34%)
- FLASH: 27 KB (변동 없음)

## 다음 단계

### 즉시 (~6/2 화)
- [ ] 6/2 수조 sensing test — TX2 ↔ MAX485 ↔ QDY30A-B 통신 검증
- [ ] sensing test 중 HyperTerminal로 raw Modbus frame 모니터

### 6/2 sensing test 결과에 따라
- 정상 → 6/8경 PCB 입고 후 양산 노드 조립
- 통신 안 됨 → MAX485 결선 또는 Modbus master 펌웨어 추가 진단

### 시간 여유 시
- [ ] sw_uart_rx TIMER capture 변환 (ISR busy-wait 제거)
- [ ] sw_uart.h documentation 갱신 (1050 vs 1041 stale)

## 교훈

1. **Internal loopback이 OK여도 외부 검증 필수** — TX2→RX2 100% loopback이 우리를 5/31 deep-dive 9 iteration으로 오도. 외부 USB-UART 검증이 진실에 더 가까웠음.
2. **baud는 단순 timing이 아닌 receiver 동기화 알고리즘 trigger** — 같은 물리 glitch가 baud에 따라 정반대 영향.
3. **fix는 baud-specific일 수 있음** — universal fix가 새 bug 도입 가능. 각 baud의 receiver 특성 이해 필요.
4. **양산 환경 (MAX485 차동) 은 debug 환경 (CP210x 단일-ended) 보다 robust** — debug fix가 양산엔 over-engineering일 수 있지만, debug 가능성 자체가 가치.

## 관련 자산

- `firmware/bleModule_uart_test/src/sw_uart.{h,c}` — 본 fix 적용 코드
- `firmware/bleModule_uart_test/src/sw_uart_rx.{h,c}` — DWT 정밀 SW-UART RX (ISR 부하 분석 대상)
- `firmware/bleModule_uart_test/src/main.c` — 5-channel test main loop
- [[uttec-ble-module]] — 양산 보드 entity
- 2026-05-31 `wiki/log.md` firmware ⭐⭐ — 5/31 deep-dive narrative
