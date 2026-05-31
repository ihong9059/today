/*
 * sw_uart_rx.h — Software UART RX via GPIO interrupt + busy-wait timing (9600 8N1)
 *
 * 동작:
 *   1. GPIO falling edge → start bit 감지
 *   2. ISR 안에서 1/2 bit (52 µs) 대기 → start bit 중심 sample 검증
 *   3. 8 data bits 매 104 µs 간격 sample (LSB first)
 *   4. stop bit (HIGH) 검증
 *   5. ring buffer로 byte push, 다음 falling edge 대기
 *
 * 검증 사양 한계:
 *   ISR 안 busy-wait ~1 ms/byte. 본격 운영은 TIMER capture로 개선 권장.
 *   9600 baud × 10 bytes/sec burst (UART 한 줄) → 누적 ISR 시간 ~10 ms/sec OK.
 *
 * 사용:
 *   static struct sw_uart_rx rx2;
 *   sw_uart_rx_init(&rx2, DEVICE_DT_GET(DT_NODELABEL(gpio0)), 2);  // P0.02
 *   while (1) {
 *       uint8_t b;
 *       if (sw_uart_rx_get(&rx2, &b) > 0) {
 *           // process b
 *       }
 *   }
 */

#ifndef SW_UART_RX_H_
#define SW_UART_RX_H_

#include <stddef.h>
#include <stdint.h>
#include <zephyr/device.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/sys/ring_buffer.h>

#define SW_UART_RX_BUF_SIZE 128

struct sw_uart_rx {
	const struct device *gpio_dev;
	gpio_pin_t pin;
	struct gpio_callback cb;
	struct ring_buf rb;
	uint8_t rb_storage[SW_UART_RX_BUF_SIZE];

	/* Diagnostics */
	volatile uint32_t isr_fire_count;     /* ISR fires (falling edges detected) */
	volatile uint32_t byte_ok_count;       /* Bytes with valid stop bit */
	volatile uint32_t framing_err_count;   /* Bytes with bad stop bit */
	volatile uint32_t false_start_count;   /* Start bit verify failed */
};

int sw_uart_rx_init(struct sw_uart_rx *r, const struct device *gpio_dev, gpio_pin_t pin);

/* Pop one byte from rx ring buffer. Returns 1 if byte read, 0 if empty. */
int sw_uart_rx_get(struct sw_uart_rx *r, uint8_t *out);

#endif /* SW_UART_RX_H_ */
