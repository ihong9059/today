/*
 * UTTEC BLE Module — LoRa loopback TX (counter, 9600 + max range, 2026-06-07)
 *
 *   부팅 시 e22_config() 자동 호출 → REG0=0x60 (9600+0.3k) write (이미 target이면 skip)
 *   매 1초:
 *     "Cnt: N\r\n" → LoRa HW UART0 (P0.11) 송신 + USB-VCOM display
 *
 *   target_cfg (양쪽 동일):
 *     ADDR=0000, NETID=00
 *     REG0=0x60 (9600 baud + 0.3 kbps air = max range)
 *     REG1=0x00 (TX 30 dBm max + subpkt 200B)
 *     REG2=0x48 (CH 72 = 922.125 MHz Korea ISM)
 *     REG3=0x80 (RSSI byte ON + transparent)
 *     CRYPT=0000
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

#define E22_M0_PIN   17
#define E22_M1_PIN   19
#define E22_AUX_PIN  20

static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);
static const struct device *gpio0 = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart_e22 = DEVICE_DT_GET(DT_NODELABEL(uart0));

static struct sw_uart tx4;  /* SPI0 MOSI = P0.06 → USB-VCOM (9600) */

RING_BUF_DECLARE(rx_rb, 256);

static void uart_isr(const struct device *dev, void *user_data)
{
	ARG_UNUSED(user_data);
	while (uart_irq_update(dev) && uart_irq_is_pending(dev)) {
		if (uart_irq_rx_ready(dev)) {
			uint8_t buf[32];
			int n = uart_fifo_read(dev, buf, sizeof(buf));
			if (n > 0) ring_buf_put(&rx_rb, buf, n);
		}
	}
}

static const uint8_t target_cfg[9] = {
	0x00, 0x00, 0x00,  /* ADDH, ADDL, NETID */
	0x60,              /* REG0: 9600 baud + 0.3k air (max range) */
	0x00,              /* REG1: TX 30 dBm max + subpkt 200B */
	0x48,              /* REG2: CH 72 = 922.125 MHz Korea ISM */
	0x80,              /* REG3: RSSI byte ON + transparent */
	0x00, 0x00,        /* CRYPT */
};

static void set_mode(int m0, int m1, int settle_ms)
{
	gpio_pin_set(gpio0, E22_M0_PIN, m0);
	gpio_pin_set(gpio0, E22_M1_PIN, m1);
	k_msleep(settle_ms);
}

static int wait_aux_high(int timeout_ms)
{
	int64_t t0 = k_uptime_get();
	while (k_uptime_get() - t0 < timeout_ms) {
		if (gpio_pin_get(gpio0, E22_AUX_PIN) == 1) {
			return (int)(k_uptime_get() - t0);
		}
		k_msleep(1);
	}
	return -1;
}

static void rx_drain(void)
{
	uint8_t b;
	while (ring_buf_get(&rx_rb, &b, 1) == 1) { /* drop */ }
}

static int recv_bytes(uint8_t *out, size_t want, int timeout_ms)
{
	int64_t t0 = k_uptime_get();
	size_t got = 0;
	while (k_uptime_get() - t0 < timeout_ms && got < want) {
		uint8_t b;
		if (ring_buf_get(&rx_rb, &b, 1) == 1) {
			out[got++] = b;
		} else {
			k_msleep(1);
		}
	}
	return (int)got;
}

static int uart_set_baud(uint32_t baud)
{
	struct uart_config cfg = {
		.baudrate = baud,
		.parity = UART_CFG_PARITY_NONE,
		.stop_bits = UART_CFG_STOP_BITS_1,
		.data_bits = UART_CFG_DATA_BITS_8,
		.flow_ctrl = UART_CFG_FLOW_CTRL_NONE,
	};
	return uart_configure(uart_e22, &cfg);
}

static int read_all_reg(uint8_t *cfg9)
{
	rx_drain();
	uint8_t cmd[3] = { 0xC1, 0x00, 0x09 };
	for (size_t i = 0; i < sizeof(cmd); i++) uart_poll_out(uart_e22, cmd[i]);
	uint8_t resp[16];
	int n = recv_bytes(resp, 12, 500);
	if (n >= 12 && resp[0] == 0xC1 && resp[1] == 0x00 && resp[2] == 0x09) {
		memcpy(cfg9, &resp[3], 9);
		return 1;
	}
	return 0;
}

static int write_all_reg(const uint8_t *cfg9)
{
	rx_drain();
	uint8_t cmd[12] = { 0xC0, 0x00, 0x09 };
	memcpy(&cmd[3], cfg9, 9);
	for (size_t i = 0; i < sizeof(cmd); i++) uart_poll_out(uart_e22, cmd[i]);
	uint8_t resp[16];
	int n = recv_bytes(resp, 12, 1000);
	return (n >= 12 && (resp[0] == 0xC1 || resp[0] == 0xC0));
}

static void emit(const char *fmt, ...)
{
	char buf[96];
	va_list ap;
	va_start(ap, fmt);
	int n = vsnprintf(buf, sizeof(buf), fmt, ap);
	va_end(ap);
	if (n > 0) sw_uart_write(&tx4, (const uint8_t *)buf, (size_t)n);
}

static void e22_config(void)
{
	emit("\r\n[Cfg] E22 setup (9600 + 0.3k + 30dBm max)\r\n");

	/* Normal mode reset */
	set_mode(0, 0, 100);
	wait_aux_high(500);

	/* Config mode + baud 9600 (Config는 9600 고정) */
	set_mode(0, 1, 50);
	wait_aux_high(500);
	uart_set_baud(9600);
	k_msleep(50);
	rx_drain();

	uint8_t before[9];
	if (!read_all_reg(before)) {
		emit("  read fail (no resp) — skip\r\n");
		goto restore;
	}

	if (memcmp(before, target_cfg, 9) == 0) {
		emit("  already at target. skip.\r\n");
		goto restore;
	}

	emit("  current REG0=%02X → write 0x60\r\n", before[3]);
	if (write_all_reg(target_cfg)) {
		wait_aux_high(800);
		k_msleep(100);
		uint8_t after[9];
		if (read_all_reg(after) && memcmp(after, target_cfg, 9) == 0) {
			emit("  write OK. REG0=%02X verified.\r\n", after[3]);
		} else {
			emit("  verify FAIL\r\n");
		}
	} else {
		emit("  write fail\r\n");
	}

restore:
	/* Normal mode + target baud 9600 (REG0=0x60) */
	uart_set_baud(9600);
	k_msleep(50);
	set_mode(0, 0, 100);
	wait_aux_high(500);
	rx_drain();
}

static void lora_send(const uint8_t *data, size_t len)
{
	for (size_t i = 0; i < len; i++) {
		uart_poll_out(uart_e22, data[i]);
	}
}

int main(void)
{
	gpio_pin_configure(gpio0, E22_M0_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_M1_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_AUX_PIN, GPIO_INPUT | GPIO_PULL_UP);
	gpio_pin_configure_dt(&led_red, GPIO_OUTPUT_INACTIVE);
	gpio_pin_configure_dt(&led_blue, GPIO_OUTPUT_INACTIVE);

	sw_uart_init(&tx4, DEVICE_DT_GET(DT_NODELABEL(spi0)), SW_UART_BAUD_9600);

	k_msleep(300);
	emit("\r\nUTTEC LoRa TX (9600 + max range)\r\n");

	uart_irq_callback_set(uart_e22, uart_isr);
	uart_irq_rx_enable(uart_e22);
	k_msleep(50);

	e22_config();

	emit("[Loop] sending Cnt: N via LoRa\r\n");

	uint32_t counter = 0;
	char out[32];

	while (1) {
		int n = snprintf(out, sizeof(out), "Cnt: %u\r\n", counter);
		lora_send((const uint8_t *)out, n);
		sw_uart_write(&tx4, (const uint8_t *)out, n);
		gpio_pin_toggle_dt(&led_red);
		gpio_pin_toggle_dt(&led_blue);
		counter++;
		k_msleep(1000);
	}
	return 0;
}
