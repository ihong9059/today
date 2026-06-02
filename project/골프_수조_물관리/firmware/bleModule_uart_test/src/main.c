/*
 * UTTEC BLE Module — Modbus master demo (HW UART variant)
 *
 * QDY30A-B 수위센서를 RS485로 1초마다 읽어 TX4 (USB-VCOM 9600)에 표시.
 *
 *   HW UART0 (P0.15 TX / P0.02 RX, 9600 8N1) → RS485 dongle DI/RO (auto-DE/RE)
 *   TX4 (SPI0 MOSI, P0.06, SW-UART 9600) → PCA10040 USB-VCOM 표시
 *   TX3 (SPI2 MOSI, P0.22, SW-UART 115200) → Debug console (raw / CRC)
 *   LED: BLUE P0.23 / RED P0.18 — 매 cycle 토글
 *
 * 변경 (이전 SW-UART 시도 → HW UART)
 *   bit 3 corruption (5/31 박제) 우회를 위해 RS485 측 UART를 HW UART로 승격.
 *   HW UART 16× oversampling 으로 신뢰성 확보. LoRa 채널 (P0.11/P0.13) 미사용.
 *
 * Modbus RTU 요청:
 *   slave=1, FC=0x03 (read holding), addr=0x0004 (current level), count=1
 *   응답 7바이트: [01][03][02][hi][lo][CRC_lo][CRC_hi]
 *   값 = signed16(hi, lo) — Unit=17 (mm), Decimal=1
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

#define MODBUS_SLAVE     1
#define MODBUS_REG_LEVEL 0x0004
#define MODBUS_TIMEOUT_MS 200

static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);
static const struct device *uart0 = DEVICE_DT_GET(DT_NODELABEL(uart0));

static struct sw_uart tx3;  /* SPI2 MOSI = P0.22 — Debug (115200) */
static struct sw_uart tx4;  /* SPI0 MOSI = P0.06 — USB-VCOM (9600) */

/* RS485 RX ring buffer (HW UART0 ISR fills) */
RING_BUF_DECLARE(rs485_rx_rb, 256);

static void uart0_isr(const struct device *dev, void *user_data)
{
	ARG_UNUSED(user_data);
	while (uart_irq_update(dev) && uart_irq_is_pending(dev)) {
		if (uart_irq_rx_ready(dev)) {
			uint8_t buf[32];
			int n = uart_fifo_read(dev, buf, sizeof(buf));
			if (n > 0) {
				ring_buf_put(&rs485_rx_rb, buf, n);
			}
		}
	}
}

/* Modbus RTU CRC16 (poly 0xA001 reversed, init 0xFFFF) */
static uint16_t modbus_crc16(const uint8_t *buf, size_t len)
{
	uint16_t crc = 0xFFFF;
	for (size_t i = 0; i < len; i++) {
		crc ^= buf[i];
		for (int b = 0; b < 8; b++) {
			if (crc & 1U) {
				crc = (crc >> 1) ^ 0xA001;
			} else {
				crc >>= 1;
			}
		}
	}
	return crc;
}

/* FC 0x03 read holding registers — 8 byte request */
static void modbus_build_read_holding(uint8_t *out, uint8_t slave,
				       uint16_t addr, uint16_t count)
{
	out[0] = slave;
	out[1] = 0x03;
	out[2] = (uint8_t)(addr >> 8);
	out[3] = (uint8_t)(addr & 0xFF);
	out[4] = (uint8_t)(count >> 8);
	out[5] = (uint8_t)(count & 0xFF);
	uint16_t crc = modbus_crc16(out, 6);
	out[6] = (uint8_t)(crc & 0xFF);
	out[7] = (uint8_t)(crc >> 8);
}

static void rx_drain(void)
{
	uint8_t junk;
	while (ring_buf_get(&rs485_rx_rb, &junk, 1) == 1) {
		/* discard */
	}
}

static void rs485_send(const uint8_t *data, size_t len)
{
	for (size_t i = 0; i < len; i++) {
		uart_poll_out(uart0, data[i]);
	}
}

/* End-of-frame: 4 ms idle silence after first byte. */
static size_t modbus_wait_response(uint8_t *resp, size_t max_len,
				    uint32_t timeout_ms)
{
	size_t n = 0;
	int64_t deadline = k_uptime_get() + timeout_ms;
	int64_t last_rx = 0;

	while (k_uptime_get() < deadline) {
		uint8_t b;
		if (ring_buf_get(&rs485_rx_rb, &b, 1) == 1) {
			if (n < max_len) {
				resp[n++] = b;
			}
			last_rx = k_uptime_get();
		} else if (n > 0 && (k_uptime_get() - last_rx) >= 4) {
			return n;
		} else {
			k_msleep(1);
		}
	}
	return n;
}

int main(void)
{
	gpio_pin_configure_dt(&led_red, GPIO_OUTPUT_INACTIVE);
	gpio_pin_configure_dt(&led_blue, GPIO_OUTPUT_INACTIVE);

	/* SW-UART TX3 / TX4 (display channels) */
	sw_uart_init(&tx3, DEVICE_DT_GET(DT_NODELABEL(spi2)), SW_UART_BAUD_115200);
	sw_uart_init(&tx4, DEVICE_DT_GET(DT_NODELABEL(spi0)), SW_UART_BAUD_9600);

	/* HW UART0 = RS485 (interrupt RX) */
	uart_irq_callback_set(uart0, uart0_isr);
	uart_irq_rx_enable(uart0);

	sw_uart_write_str(&tx3, "\r\nUTTEC Modbus master (HW UART0 on P0.15/P0.02)\r\n");
	sw_uart_write_str(&tx3, "QDY30A-B slave=1 reg=0x0004 (1 sec poll)\r\n");
	sw_uart_write_str(&tx4, "\r\nUTTEC water level monitor\r\n");
	sw_uart_write_str(&tx4, "Slave 1 / RS485 9600 8N1\r\n");

	uint8_t req[8];
	modbus_build_read_holding(req, MODBUS_SLAVE, MODBUS_REG_LEVEL, 1);

	uint8_t resp[16];
	char out[96];
	uint32_t cycle = 0;
	uint32_t ok = 0, crc_err = 0, no_resp = 0;

	while (1) {
		rx_drain();

		rs485_send(req, sizeof(req));

		size_t rx_n = modbus_wait_response(resp, sizeof(resp),
						   MODBUS_TIMEOUT_MS);

		int n;
		if (rx_n == 7 && resp[0] == MODBUS_SLAVE && resp[1] == 0x03 &&
		    resp[2] == 0x02) {
			uint16_t crc_calc = modbus_crc16(resp, 5);
			uint16_t crc_recv =
				(uint16_t)resp[5] | ((uint16_t)resp[6] << 8);
			if (crc_calc == crc_recv) {
				int16_t level =
					(int16_t)((resp[3] << 8) | resp[4]);
				n = snprintf(out, sizeof(out),
					     "Level: %d mm\r\n", level);
				sw_uart_write(&tx4, (const uint8_t *)out, n);
				sw_uart_write(&tx3, (const uint8_t *)out, n);
				ok++;
			} else {
				n = snprintf(out, sizeof(out),
					     "CRC ERR calc=%04X recv=%04X\r\n",
					     crc_calc, crc_recv);
				sw_uart_write(&tx4, (const uint8_t *)out, n);
				sw_uart_write(&tx3, (const uint8_t *)out, n);
				crc_err++;
			}
		} else {
			n = snprintf(out, sizeof(out),
				     "NO/BAD RESP n=%u\r\n", (unsigned)rx_n);
			sw_uart_write(&tx4, (const uint8_t *)out, n);

			n = snprintf(out, sizeof(out), "  raw:");
			sw_uart_write(&tx3, (const uint8_t *)out, n);
			for (size_t i = 0; i < rx_n; i++) {
				n = snprintf(out, sizeof(out), " %02X", resp[i]);
				sw_uart_write(&tx3, (const uint8_t *)out, n);
			}
			sw_uart_write_str(&tx3, "\r\n");
			no_resp++;
		}

		if ((cycle % 10) == 9) {
			n = snprintf(out, sizeof(out),
				     "  stats: ok=%u crc=%u err=%u\r\n",
				     ok, crc_err, no_resp);
			sw_uart_write(&tx3, (const uint8_t *)out, n);
		}

		gpio_pin_toggle_dt(&led_red);
		gpio_pin_toggle_dt(&led_blue);
		cycle++;
		k_msleep(1000);
	}
	return 0;
}
