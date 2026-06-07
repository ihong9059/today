/*
 * UTTEC BLE Module — LoRa RX echo (받은 그대로 USB-VCOM display, 2026-06-07)
 *
 *   HW UART0 (P0.11 TX / P0.13 RX, 9600 8N1) ← LoRa E22 (REG0=0x60)
 *   SPI0 MOSI (P0.06, SW-UART 9600) → USB-VCOM display
 *
 *   동작:
 *     1) 부팅 시 E22 setup (target REG0=0x60 자동 확인·write)
 *     2) UART0 ISR로 LoRa byte 수신 → ring buffer
 *     3) '\n' (0x0A) 만나면 line 종료 → USB-VCOM에 그대로 echo
 *     4) byte 수신 시 RED LED toggle / line 완성 시 BLUE LED toggle
 *
 *   메시지 포맷 (TX 측 결정): "tx<N>:<센서값>\r\n"
 *     예: "tx1:377\r\n"
 *   RX는 prefix 안 붙이고 받은 그대로 display.
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

#define LINE_BUF_SIZE   64

static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);
static const struct device *gpio0 = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart_e22 = DEVICE_DT_GET(DT_NODELABEL(uart0));

static struct sw_uart tx4;

RING_BUF_DECLARE(rx_rb, 512);

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
	0x00, 0x00, 0x00, 0x60, 0x00, 0x48, 0x80, 0x00, 0x00
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
		if (gpio_pin_get(gpio0, E22_AUX_PIN) == 1) return (int)(k_uptime_get() - t0);
		k_msleep(1);
	}
	return -1;
}

static void rx_drain(void)
{
	uint8_t b;
	while (ring_buf_get(&rx_rb, &b, 1) == 1) { }
}

static int recv_bytes(uint8_t *out, size_t want, int timeout_ms)
{
	int64_t t0 = k_uptime_get();
	size_t got = 0;
	while (k_uptime_get() - t0 < timeout_ms && got < want) {
		uint8_t b;
		if (ring_buf_get(&rx_rb, &b, 1) == 1) out[got++] = b;
		else k_msleep(1);
	}
	return (int)got;
}

static int uart_set_baud(uint32_t baud)
{
	struct uart_config cfg = {
		.baudrate = baud, .parity = UART_CFG_PARITY_NONE,
		.stop_bits = UART_CFG_STOP_BITS_1, .data_bits = UART_CFG_DATA_BITS_8,
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
	emit("\r\n[Cfg] E22 setup\r\n");
	set_mode(0, 0, 100); wait_aux_high(500);
	set_mode(0, 1, 50); wait_aux_high(500);
	uart_set_baud(9600); k_msleep(50); rx_drain();

	uint8_t before[9];
	if (!read_all_reg(before)) { emit("  read fail\r\n"); goto restore; }
	if (memcmp(before, target_cfg, 9) == 0) { emit("  already OK\r\n"); goto restore; }

	emit("  REG0=%02X -> write 0x60\r\n", before[3]);
	if (write_all_reg(target_cfg)) {
		wait_aux_high(800); k_msleep(100);
		uint8_t after[9];
		if (read_all_reg(after) && memcmp(after, target_cfg, 9) == 0) {
			emit("  write OK\r\n");
		} else emit("  verify fail\r\n");
	} else emit("  write fail\r\n");

restore:
	uart_set_baud(9600); k_msleep(50);
	set_mode(0, 0, 100); wait_aux_high(500); rx_drain();
}

int main(void)
{
	gpio_pin_configure(gpio0, E22_M0_PIN, GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_M1_PIN, GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_AUX_PIN, GPIO_INPUT | GPIO_PULL_UP);
	gpio_pin_configure_dt(&led_red, GPIO_OUTPUT_INACTIVE);
	gpio_pin_configure_dt(&led_blue, GPIO_OUTPUT_INACTIVE);

	sw_uart_init(&tx4, DEVICE_DT_GET(DT_NODELABEL(spi0)), SW_UART_BAUD_9600);
	k_msleep(300);
	emit("\r\nUTTEC RX: LoRa HW UART0 echo (line by \\n)\r\n");

	uart_irq_callback_set(uart_e22, uart_isr);
	uart_irq_rx_enable(uart_e22);
	k_msleep(50);

	e22_config();
	emit("[Loop] listening...\r\n");

	uint8_t line_buf[LINE_BUF_SIZE];
	size_t line_len = 0;

	while (1) {
		uint8_t b;
		if (ring_buf_get(&rx_rb, &b, 1) == 1) {
			gpio_pin_toggle_dt(&led_red);

			if (line_len < LINE_BUF_SIZE) {
				line_buf[line_len++] = b;
			}

			if (b == '\n' || line_len >= LINE_BUF_SIZE) {
				/* line emit — 받은 그대로 (TX 메시지에 \r\n 포함되어 있음) */
				sw_uart_write(&tx4, line_buf, line_len);
				gpio_pin_toggle_dt(&led_blue);
				line_len = 0;
			}
		} else {
			k_msleep(2);
		}
	}
	return 0;
}
