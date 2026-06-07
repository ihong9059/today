---
name: nRF52 UARTE PSEL 동적 변경 — STARTRX 명시 trigger 필수 🚨
description: 🚨 NRF_UARTE0 PSEL runtime 변경 시 ENABLE 0/8 토글 후 TASKS_STARTRX = 1 명시 호출 필수. Zephyr UART driver는 PSEL 변경 모르고 자동 STARTRX 안 함. 누락 시 RX 응답 0 byte 무한 반복
type: feedback
triggers: [time-multiplexing, NRF_UARTE PSEL runtime 변경, ENABLE toggle, RS485+LoRa 동일 UART 공유, uart driver behavior]
originSessionId: 11d40656-fcf2-41d9-abd5-1ce25c02d963
---
## 🚨 핵심

nRF52832 + Zephyr에서 1개 UART/UARTE 인스턴스를 두 가지 역할 (예: RS485 + LoRa)로 time-multiplex하려면 PSEL 동적 변경 필요. Zephyr UART driver는 init 시 STARTRX task 1회 호출 후 자동 관리 안 함 — **ENABLE = 0/8 토글 후 driver는 hardware state 변경 모름**.

→ **TASKS_STARTRX = 1 명시 호출 안 하면 RX 영원히 0 byte**.

```c
static void uart_switch_pins(uint32_t tx_pin, uint32_t rx_pin)
{
    uart_irq_rx_disable(uart0);

    NRF_UARTE0->TASKS_STOPRX = 1;
    NRF_UARTE0->TASKS_STOPTX = 1;
    k_busy_wait(200);

    NRF_UARTE0->ENABLE = 0;
    NRF_UARTE0->PSEL.TXD = tx_pin;
    NRF_UARTE0->PSEL.RXD = rx_pin;
    NRF_UARTE0->ENABLE = 8;          /* UARTE mode */

    NRF_UARTE0->TASKS_STARTRX = 1;   /* ⭐ 필수 — driver 자동 안 함 */

    uart_irq_rx_enable(uart0);
    k_busy_wait(2000);
}
```

## 2026-06-07 박제 사건

- 한림용인CC TX 노드: RS485 Modbus + LoRa 모두 HW UART 사용 (정확성 우선)
- nRF52832는 UARTE 인스턴스 1개 → time-multiplexing 도입
- 첫 시도: ENABLE 0/8 토글 + PSEL 변경만 → 매 cycle `n=0` (Modbus 응답 0 byte)
- 진단: LED 깜빡 OK, TX는 동작, RX만 안 됨 → STARTRX 누락 확정
- TASKS_STARTRX = 1 명시 추가 → 즉시 동작 (`n=7` 정상 응답)

## How to apply

**PSEL 변경 패턴**:
1. uart_irq_rx_disable (Zephyr driver 측 정지)
2. TASKS_STOPRX + TASKS_STOPTX (HW 측 정지)
3. k_busy_wait 200us (정지 완료 대기)
4. ENABLE = 0 (PSEL write 가능 조건)
5. PSEL.TXD/RXD 변경
6. ENABLE = 8 (UARTE 재활성)
7. **TASKS_STARTRX = 1 ⭐ (필수)**
8. uart_irq_rx_enable (Zephyr driver 측 재시작)
9. k_busy_wait 2ms (settle)

## 빠른 진단

PSEL 변경 후 RX 0 byte 무한 반복 → STARTRX 누락 의심 1순위.
