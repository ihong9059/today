/*
 * sw_uart_rx.c — GPIO interrupt + DWT cycle-precise wait SW-UART RX (9600 8N1)
 *
 * 9600 baud bit period = 104.17 µs → ISR latency (~10 µs)에 robust.
 * Cortex-M4 DWT CYCCNT (64 MHz CPU clock) 직접 사용으로 정밀 timing.
 *
 *   BIT_CYCLES      = 64e6 / 9600 = 6666.67 → 6667 cycles (= 104.17 µs, -0.005%)
 *   HALF_BIT_CYCLES = 3333 cycles
 *
 * 마진: half-bit 3333 cycles ≫ ISR latency ~100-200 cycles → 매우 안전
 */

#include "sw_uart_rx.h"

#include <zephyr/kernel.h>
#include <zephyr/sys/printk.h>

/* DWT (Data Watchpoint and Trace) — Cortex-M4 cycle counter */
#define DWT_CTRL_REG    (*(volatile uint32_t *)0xE0001000)
#define DWT_CYCCNT_REG  (*(volatile uint32_t *)0xE0001004)
#define DEMCR_REG       (*(volatile uint32_t *)0xE000EDFC)
#define DEMCR_TRCENA    (1UL << 24)
#define DWT_CTRL_CYCCNTENA (1UL << 0)

#define BIT_CYCLES_9600        6667U   /* 64e6 / 9600 = 6666.67 → 6667 */
#define HALF_BIT_CYCLES_9600   3333U

static inline void dwt_init(void)
{
	DEMCR_REG |= DEMCR_TRCENA;
	DWT_CYCCNT_REG = 0;
	DWT_CTRL_REG |= DWT_CTRL_CYCCNTENA;
}

static inline void wait_cycles(uint32_t target)
{
	uint32_t start = DWT_CYCCNT_REG;
	while ((uint32_t)(DWT_CYCCNT_REG - start) < target) { /* spin */ }
}

/* ISR HW latency compensation — Cortex-M4 minimum is 12 cycles + Zephyr
 * dispatch + my function prologue. Empirical estimate ~100 cycles (~1.6 µs). */
#define ISR_LATENCY_CYCLES 100U

static inline void wait_until(uint32_t edge, uint32_t target_cycles_from_edge)
{
	while ((uint32_t)(DWT_CYCCNT_REG - edge) < target_cycles_from_edge) { /* spin */ }
}

static void rx_isr_cb(const struct device *port, struct gpio_callback *cb,
		      gpio_port_pins_t pins)
{
	struct sw_uart_rx *r = CONTAINER_OF(cb, struct sw_uart_rx, cb);

	/* Diagnostic: count ISR fires */
	r->isr_fire_count++;

	/* Record entry time, estimate falling edge as ISR_LATENCY_CYCLES earlier. */
	uint32_t edge = DWT_CYCCNT_REG - ISR_LATENCY_CYCLES;

	gpio_pin_interrupt_configure(r->gpio_dev, r->pin, GPIO_INT_DISABLE);

	/* Verify start bit (line should still be 0) */
	if (gpio_pin_get(r->gpio_dev, r->pin) != 0) {
		r->false_start_count++;
		goto rearm;
	}

	uint8_t data = 0;
	for (int i = 0; i < 8; i++) {
		uint32_t target = BIT_CYCLES_9600 * (uint32_t)(i + 1)
				  + HALF_BIT_CYCLES_9600;
		wait_until(edge, target);
		if (gpio_pin_get(r->gpio_dev, r->pin)) {
			data |= (uint8_t)(1U << i);
		}
	}

	wait_until(edge, BIT_CYCLES_9600 * 9U + HALF_BIT_CYCLES_9600);
	int stop = gpio_pin_get(r->gpio_dev, r->pin);
	if (stop == 1) {
		uint32_t put = ring_buf_put(&r->rb, &data, 1);
		(void)put;
		r->byte_ok_count++;
	} else {
		r->framing_err_count++;
	}

	wait_until(edge, BIT_CYCLES_9600 * 10U);

rearm:
	gpio_pin_interrupt_configure(r->gpio_dev, r->pin, GPIO_INT_EDGE_FALLING);
}

int sw_uart_rx_init(struct sw_uart_rx *r, const struct device *gpio_dev, gpio_pin_t pin)
{
	if (r == NULL || gpio_dev == NULL) {
		return -1;
	}
	if (!device_is_ready(gpio_dev)) {
		printk("sw_uart_rx: gpio not ready\n");
		return -1;
	}

	r->gpio_dev = gpio_dev;
	r->pin = pin;
	ring_buf_init(&r->rb, sizeof(r->rb_storage), r->rb_storage);

	/* Enable DWT cycle counter for precise timing (idempotent if already on) */
	dwt_init();

	int rc = gpio_pin_configure(gpio_dev, pin, GPIO_INPUT | GPIO_PULL_UP);
	if (rc < 0) {
		printk("sw_uart_rx: pin configure failed (%d)\n", rc);
		return rc;
	}

	gpio_init_callback(&r->cb, rx_isr_cb, BIT(pin));
	rc = gpio_add_callback(gpio_dev, &r->cb);
	if (rc < 0) {
		printk("sw_uart_rx: add_callback failed (%d)\n", rc);
		return rc;
	}

	rc = gpio_pin_interrupt_configure(gpio_dev, pin, GPIO_INT_EDGE_FALLING);
	if (rc < 0) {
		printk("sw_uart_rx: interrupt configure failed (%d)\n", rc);
		return rc;
	}
	return 0;
}

int sw_uart_rx_get(struct sw_uart_rx *r, uint8_t *out)
{
	if (r == NULL || out == NULL) {
		return 0;
	}
	return (int)ring_buf_get(&r->rb, out, 1);
}
