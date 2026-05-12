/*
 * Blue Pill (STM32F103C8T6) — default LED blink
 *
 * 보드 정보:
 *   - MCU:  STM32F103C8T6 (Cortex-M3, 72 MHz max, 64 KB Flash, 20 KB RAM)
 *   - LED:  PC13, active LOW (핀이 LOW → LED ON / HIGH → LED OFF)
 *   - 클럭: 본 펌웨어는 별도 PLL 설정 없이 reset 직후 HSI 8 MHz로 동작
 *
 * 본 파일은 CMSIS 헤더를 쓰지 않는 순수 레지스터 직접 제어 코드.
 */

#include <stdint.h>

/* ---- RCC (Reset and Clock Control) ---- */
#define RCC_BASE            0x40021000UL
#define RCC_APB2ENR         (*(volatile uint32_t *)(RCC_BASE + 0x18))
#define RCC_APB2ENR_IOPCEN  (1U << 4)   /* GPIOC 클럭 enable 비트 */

/* ---- GPIOC ---- */
#define GPIOC_BASE          0x40011000UL
#define GPIOC_CRH           (*(volatile uint32_t *)(GPIOC_BASE + 0x04))
#define GPIOC_BSRR          (*(volatile uint32_t *)(GPIOC_BASE + 0x10))

/* ---- LED on PC13 ----
 * Active LOW: BSRR의 high half(=BR) 비트를 set하면 ODR이 0 → LED ON
 *             BSRR의 low  half(=BS) 비트를 set하면 ODR이 1 → LED OFF
 */
#define LED_PIN     13
#define LED_ON()    (GPIOC_BSRR = (1U << (LED_PIN + 16)))
#define LED_OFF()   (GPIOC_BSRR = (1U <<  LED_PIN))

/* busy-wait 지연.
 * volatile로 인해 컴파일러가 루프를 제거하지 못함.
 * HSI 8 MHz + -O2 기준으로 count=800,000 ≈ 250 ms.
 * 정밀 타이밍이 아니라 점멸 시연용 근사값.
 */
static void delay(volatile uint32_t count)
{
    while (count--) {
        __asm__ volatile ("nop");
    }
}

int main(void)
{
    /* 1) GPIOC 클럭 enable */
    RCC_APB2ENR |= RCC_APB2ENR_IOPCEN;

    /* 2) PC13을 2 MHz push-pull 출력으로 설정
     *    CRH 비트 23:20 = pin 13 설정 영역
     *    MODE13 = 0b10 (output 2 MHz)
     *    CNF13  = 0b00 (general-purpose push-pull)
     *    → 4비트 묶음 = 0b0010 = 0x2
     */
    GPIOC_CRH &= ~(0xFU << 20);
    GPIOC_CRH |=  (0x2U << 20);

    /* 3) 약 2 Hz로 점멸 (250 ms ON / 250 ms OFF) */
    while (1) {
        LED_ON();
        delay(800000);
        LED_OFF();
        delay(800000);
    }
}
