/*
 * UTTEC BLE Module — 7-channel UART bring-up test (4 TX + 3 RX).
 *
 * 동작:
 *   매 1초 카운터 N 증가, 다음 송신:
 *     TX1 (UART0,    P0.11) : "TX1: N\r\n"  ← LoRa channel        (9600)
 *     TX2 (SW SPI1,  P0.15) : "TX2: N\r\n"  ← RS485 channel       (9600)
 *     TX3 (SW SPI2,  P0.22) : "TX3: N\r\n"  ← Debug console       (115200, CP210x)
 *     TX4 (SW SPI0,  P0.06) : "TX4: N\r\n"  ← PCA10040 USB-VCOM   (9600)
 *   동시에 LED 토글 (BLUE P0.23, RED P0.18)
 *
 *   TX3는 추가로 monitor 역할:
 *     RX1 (UART0,   P0.13) 입력 → "RX1: ..." 으로 TX3에 echo
 *     RX2 (GPIO INT, P0.02) 입력 → "RX2: ..." 으로 TX3에 echo
 *     RX4 (GPIO INT, P0.08) 입력 → "RX4: ..." 으로 TX3에 echo
 *
 * 검증 (외부 점퍼):
 *   TX1 ↔ RX1 (J28 Pin 1 ↔ Pin 3) 점퍼 → TX3에서 "RX1: TX1: N\r\n" 확인
 *   TX2 ↔ RX2 (J28 Pin 2 ↔ Pin 4) 점퍼 → TX3에서 "RX2: TX2: N\r\n" 확인
 *   TX4 → PCA10040 USB-VCOM (별도 점퍼 불필요) → HyperTerminal 9600 8N1에서 "TX4: N" 확인
 *   USB-VCOM 키 입력 → RX4 → TX3에서 "RX4: x\r\n" echo
 */

#include <zephyr/kernel.h>
#include <zephyr/sys/printk.h>
#include <zephyr/device.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/uart.h>
#include <zephyr/sys/ring_buffer.h>
#include <stdio.h>
#include <string.h>

#include "sw_uart.h"
#include "sw_uart_rx.h"

/* GPIO pin numbers (P0.X) */
#define LORA_M0_PIN     17  /* J28 Pin 6  */
#define LORA_M1_PIN     19  /* J28 Pin 8  */
#define LORA_AUX_PIN    20  /* J28 Pin 10, input pullup */
#define MAX485_DE_PIN   24  /* J28 Pin 9, MAX485 DE+RE control */
#define SW_UART_RX2_PIN  2  /* J28 Pin 4, P0.02 — RS485 sensor RX */
#define SW_UART_RX4_PIN  8  /* J28 Pin 5, P0.08 — PCA10040 USB-VCOM RX */

static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);
static const struct device *gpio0 = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart0 = DEVICE_DT_GET(DT_NODELABEL(uart0));

static struct sw_uart tx2;  /* SPI1 MOSI = P0.15 (J28 Pin 2)  → RS485 (9600) */
static struct sw_uart tx3;  /* SPI2 MOSI = P0.22 (J28 Pin 7)  → Debug (115200, CP210x) */
static struct sw_uart tx4;  /* SPI0 MOSI = P0.06 (J23 Pin 2)  → USB-VCOM (9600) */
static struct sw_uart_rx rx2;  /* GPIO INT on P0.02 (J28 Pin 4) ← RS485 */
static struct sw_uart_rx rx4;  /* GPIO INT on P0.08 (J28 Pin 5) ← USB-VCOM */

/* UART0 RX (RX1) ring buffer — captured by ISR */
RING_BUF_DECLARE(rx1_rb, 256);

static void uart0_isr(const struct device *dev, void *user_data)
{
	ARG_UNUSED(user_data);
	while (uart_irq_update(dev) && uart_irq_is_pending(dev)) {
		if (uart_irq_rx_ready(dev)) {
			uint8_t buf[32];
			int n = uart_fifo_read(dev, buf, sizeof(buf));
			if (n > 0) {
				ring_buf_put(&rx1_rb, buf, n);
			}
		}
	}
}

/* TX1 send via HW UART0 (polling, 9600 baud) */
static void tx1_write(const char *str)
{
	while (*str) {
		uart_poll_out(uart0, (uint8_t)*str++);
	}
}

/* Echo received bytes to TX3 with channel prefix.
 * Drains ring buffer / sw_uart_rx queue until empty.
 * Prefix is sent once per "line" — flushed after newline OR after gap.
 */
static void drain_rx1_to_tx3(void)
{
	uint8_t b;
	bool any = false;
	while (ring_buf_get(&rx1_rb, &b, 1) == 1) {
		if (!any) {
			sw_uart_write_str(&tx3, "RX1: ");
			any = true;
		}
		sw_uart_write(&tx3, &b, 1);
		if (b == '\n') {
			any = false;  /* next batch starts new "RX1: " prefix */
		}
	}
}

static void drain_rx2_to_tx3(void)
{
	uint8_t b;
	bool any = false;
	while (sw_uart_rx_get(&rx2, &b) == 1) {
		if (!any) {
			sw_uart_write_str(&tx3, "RX2: ");
			any = true;
		}
		sw_uart_write(&tx3, &b, 1);
		if (b == '\n') {
			any = false;
		}
	}
}

static void drain_rx4_to_tx3(void)
{
	uint8_t b;
	bool any = false;
	while (sw_uart_rx_get(&rx4, &b) == 1) {
		if (!any) {
			sw_uart_write_str(&tx3, "RX4: ");
			any = true;
		}
		sw_uart_write(&tx3, &b, 1);
		if (b == '\n') {
			any = false;
		}
	}
}

int main(void)
{
	/* LED 초기화 (OFF since ACTIVE_LOW) */
	gpio_pin_configure_dt(&led_red, GPIO_OUTPUT_INACTIVE);
	gpio_pin_configure_dt(&led_blue, GPIO_OUTPUT_INACTIVE);

	/* GPIO: LoRa M0/M1 LOW, AUX input pull-up, MAX485 DE LOW (RX mode) */
	gpio_pin_configure(gpio0, LORA_M0_PIN,   GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, LORA_M1_PIN,   GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, LORA_AUX_PIN,  GPIO_INPUT | GPIO_PULL_UP);
	gpio_pin_configure(gpio0, MAX485_DE_PIN, GPIO_OUTPUT_HIGH);  /* HIGH = TX-enabled during this test */

	/* UART0 RX interrupt — RX1 capture */
	uart_irq_callback_set(uart0, uart0_isr);
	uart_irq_rx_enable(uart0);

	/* SW-UART TX2 at 9600 (diagnostic — loopback to RX2 9600)
	 * SW-UART TX3 at 115200 (proven path — debug monitor)
	 * SW-UART TX4 at 9600 (PCA10040 USB-VCOM, same single-tx strategy as TX2) */
	sw_uart_init(&tx2, DEVICE_DT_GET(DT_NODELABEL(spi1)), SW_UART_BAUD_9600);
	sw_uart_init(&tx3, DEVICE_DT_GET(DT_NODELABEL(spi2)), SW_UART_BAUD_115200);
	sw_uart_init(&tx4, DEVICE_DT_GET(DT_NODELABEL(spi0)), SW_UART_BAUD_9600);

	/* SW-UART RX2 init (P0.02 = J28 Pin 4)
	 * SW-UART RX4 init (P0.08 = J28 Pin 5 / J23 Pin 3 = USB-VCOM RX) */
	sw_uart_rx_init(&rx2, gpio0, SW_UART_RX2_PIN);
	sw_uart_rx_init(&rx4, gpio0, SW_UART_RX4_PIN);

	/* Boot banner on TX3 (115200) — TX2 9600 internal-loopback test */
	sw_uart_write_str(&tx3, "\r\nUTTEC BLE Module 7-ch UART test\r\n");
	sw_uart_write_str(&tx3, "TX1/RX1=9600  TX2=9600 (SPI1)  RX2=9600  TX3=115200  TX4/RX4=9600 (USB-VCOM)\r\n");
	sw_uart_write_str(&tx3, "TX1=P0.11 RX1=P0.13 TX2=P0.15 RX2=P0.02 TX3=P0.22 TX4=P0.06 RX4=P0.08\r\n");
	sw_uart_write_str(&tx3, "TX2->RX2 internal loopback: jumper Pin 2 <-> Pin 4\r\n");
	sw_uart_write_str(&tx3, "TX4->USB-VCOM: open PCA10040 J-Link COM port @ 9600 8N1\r\n");

	/* Boot banner on TX4 (9600 USB-VCOM) */
	sw_uart_write_str(&tx4, "\r\nUTTEC BLE Module — USB-VCOM channel (TX4/RX4 @ 9600 8N1)\r\n");
	sw_uart_write_str(&tx4, "Type any key — echoed to TX3 debug as 'RX4: x'\r\n");

	uint32_t counter = 0;
	char buf[80];

	while (1) {
		/* TX1, TX2, TX3 each emit their own counter line */
		int n;

		n = snprintf(buf, sizeof(buf), "TX1: %u\r\n", counter);
		tx1_write(buf);

		n = snprintf(buf, sizeof(buf), "TX2: %u\r\n", counter);
		sw_uart_write(&tx2, (const uint8_t *)buf, n);

		n = snprintf(buf, sizeof(buf), "TX3: %u\r\n", counter);
		sw_uart_write(&tx3, (const uint8_t *)buf, n);

		n = snprintf(buf, sizeof(buf), "TX4: %u\r\n", counter);
		sw_uart_write(&tx4, (const uint8_t *)buf, n);

		/* Diagnostic: RX2/RX4 ISR stats on TX3 every 5 seconds */
		if ((counter % 5) == 0) {
			n = snprintf(buf, sizeof(buf),
				"RX2-stats: isr=%u ok=%u framing=%u false=%u\r\n",
				rx2.isr_fire_count, rx2.byte_ok_count,
				rx2.framing_err_count, rx2.false_start_count);
			sw_uart_write(&tx3, (const uint8_t *)buf, n);

			n = snprintf(buf, sizeof(buf),
				"RX4-stats: isr=%u ok=%u framing=%u false=%u\r\n",
				rx4.isr_fire_count, rx4.byte_ok_count,
				rx4.framing_err_count, rx4.false_start_count);
			sw_uart_write(&tx3, (const uint8_t *)buf, n);
		}

		counter++;

		/* LED 토글 */
		gpio_pin_toggle_dt(&led_red);
		gpio_pin_toggle_dt(&led_blue);

		/* 1초 동안 100ms 주기로 RX 버퍼 drain + TX3 echo */
		for (int i = 0; i < 10; i++) {
			k_msleep(100);
			drain_rx1_to_tx3();
			drain_rx2_to_tx3();
			drain_rx4_to_tx3();
		}
	}
	return 0;
}
