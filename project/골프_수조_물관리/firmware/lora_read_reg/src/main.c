/*
 * UTTEC BLE Module — E22 register read + decode (양쪽 보드 현재 설정 확인)
 *
 *   1) Normal mode reset (M0=0, M1=0) + wait AUX
 *   2) Config mode (M0=0, M1=1) + UART baud 9600 (Config baud 고정)
 *   3) C1 00 09 → 12 byte 응답 (C1 00 09 + 9 byte register)
 *   4) USB-VCOM에 register hex + decode (baud, channel, air rate, RSSI)
 *   5) 1초 주기 LED toggle (idle)
 *
 *   Mapping B (M0/M1 정의): Config=0,1 / Normal=0,0 / WOR=1,0 / Sleep=1,1 (UART OFF, 금지)
 *   E22 register 9 byte 의미: [ADDH ADDL NETID REG0 REG1 REG2 REG3 CRYPT_H CRYPT_L]
 *   - REG0 bits 7-5 = SPED (UART baud, Normal mode)
 *   - REG0 bits 1-0 = AIR DATA RATE
 *   - REG1 bits 7-6 = subpkt size, bits 4-3 = ambient noise, bits 2-0 = TX power
 *   - REG2 = channel (CH72 = 922.125 MHz Korea ISM)
 *   - REG3 bit 7 = RSSI byte ON/OFF, bit 6 = transmission mode
 */

#include <zephyr/kernel.h>
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

static const struct device *gpio0 = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart_e22 = DEVICE_DT_GET(DT_NODELABEL(uart0));
static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);

static struct sw_uart tx4;  /* USB-VCOM display */

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

static const char *sped_name(uint8_t sped)
{
	static const char *names[] = {
		"1200", "2400", "4800", "9600",
		"19200", "38400", "57600", "115200"
	};
	return names[sped & 7];
}

static const char *air_rate_name(uint8_t air)
{
	/* E22-900T airdata: 0:0.3k 1:1.2k 2:2.4k 3:4.8k 4:9.6k 5:19.2k 6:38.4k 7:62.5k */
	static const char *names[] = {
		"0.3k", "1.2k", "2.4k", "4.8k",
		"9.6k", "19.2k", "38.4k", "62.5k"
	};
	return names[air & 7];
}

static void emit_line(const char *fmt, ...)
{
	char buf[128];
	va_list ap;
	va_start(ap, fmt);
	int n = vsnprintf(buf, sizeof(buf), fmt, ap);
	va_end(ap);
	if (n > 0) {
		sw_uart_write(&tx4, (const uint8_t *)buf, (size_t)n);
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

	emit_line("\r\n=== UTTEC E22 register read ===\r\n");

	uart_irq_callback_set(uart_e22, uart_isr);
	uart_irq_rx_enable(uart_e22);
	k_msleep(50);

	/* 1. Normal mode reset */
	set_mode(0, 0, 100);
	wait_aux_high(500);

	/* 2. Config mode + baud 9600 */
	set_mode(0, 1, 50);
	wait_aux_high(500);
	uart_set_baud(9600);
	k_msleep(50);
	rx_drain();

	/* 3. C1 00 09 read all */
	uint8_t cmd[3] = { 0xC1, 0x00, 0x09 };
	for (size_t i = 0; i < sizeof(cmd); i++) {
		uart_poll_out(uart_e22, cmd[i]);
	}

	uint8_t resp[16] = {0};
	int n = recv_bytes(resp, 12, 1000);

	if (n >= 12 && resp[0] == 0xC1 && resp[1] == 0x00 && resp[2] == 0x09) {
		emit_line("OK %d bytes\r\n", n);
		emit_line("Raw: ");
		for (int i = 0; i < 12; i++) emit_line("%02X ", resp[i]);
		emit_line("\r\n");

		uint8_t addh = resp[3], addl = resp[4], netid = resp[5];
		uint8_t reg0 = resp[6], reg1 = resp[7], reg2 = resp[8], reg3 = resp[9];
		uint8_t crypth = resp[10], cryptl = resp[11];

		emit_line("ADDR: %02X%02X / NETID: %02X\r\n", addh, addl, netid);
		emit_line("REG0=%02X SPED=%s air=%s\r\n",
			  reg0, sped_name((reg0 >> 5) & 7), air_rate_name(reg0 & 7));
		emit_line("REG1=%02X subpkt=%u TXpow_idx=%u\r\n",
			  reg1, (reg1 >> 6) & 3, reg1 & 3);
		emit_line("REG2=%02X CH=%u (%u.125MHz)\r\n",
			  reg2, reg2, 850 + reg2);
		emit_line("REG3=%02X RSSI_byte=%s mode=%s\r\n",
			  reg3,
			  (reg3 & 0x80) ? "ON" : "off",
			  (reg3 & 0x40) ? "fixed" : "transparent");
		emit_line("CRYPT=%02X%02X\r\n", crypth, cryptl);
	} else {
		emit_line("READ FAIL n=%d  resp:", n);
		for (int i = 0; i < n; i++) emit_line(" %02X", resp[i]);
		emit_line("\r\n");
	}

	/* 4. Normal mode 복귀 (M0=0, M1=0) — 다음 펌웨어 plug-in 준비 */
	uart_set_baud(115200);
	k_msleep(50);
	set_mode(0, 0, 100);
	wait_aux_high(500);

	emit_line("=== done. idle. ===\r\n");

	while (1) {
		gpio_pin_toggle_dt(&led_red);
		gpio_pin_toggle_dt(&led_blue);
		k_msleep(1000);
	}
	return 0;
}
