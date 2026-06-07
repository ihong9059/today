/*
 * UTTEC BLE Module — Modbus + LoRa TX (time-multiplexed HW UART, 3s cycle, 2026-06-07)
 *
 *   HW UART0 (NRF_UARTE0) 핀맵 동적 전환:
 *     [RS485 phase] PSEL.TXD = P0.15, PSEL.RXD = P0.02 — Modbus 폴링
 *     [LoRa  phase] PSEL.TXD = P0.11, PSEL.RXD = P0.13 — LoRa 송신
 *
 *   매 3초 cycle:
 *     1) RS485 phase: Modbus → QDY30A-B 수위센서 read (HW UART, 정확성)
 *     2) 응답 OK → 메시지 "tx<N>:<level>\r\n" 생성
 *     3) LoRa phase: HW UART로 LoRa E22 송신 (정확성)
 *     4) USB-VCOM, Debug 출력 (SW-UART, cosmetic)
 *     5) LED + Relay toggle, 3초 sleep
 *
 *   TX 노드 ID: TX_NODE_ID (build-time). 1, 2, 3으로 변경 가능.
 *
 *   하드웨어 가정:
 *     E22 already setup (REG0=0x60: 9600 + 0.3k air + 30dBm max)
 *     LoRa M0=M1=LOW (Normal transparent)
 */

#include <zephyr/kernel.h>
#include <zephyr/sys/printk.h>
#include <zephyr/device.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/uart.h>
#include <zephyr/sys/ring_buffer.h>
#include <hal/nrf_uarte.h>
#include <stdio.h>
#include <string.h>

#include "sw_uart.h"

#define TX_NODE_ID  1   /* 1, 2, 3 — 빌드 시 변경 가능 */

#define MODBUS_SLAVE     1
#define MODBUS_REG_LEVEL 0x0004
#define MODBUS_TIMEOUT_MS 200

#define CYCLE_MS 3000

#define LORA_M0_PIN     17
#define LORA_M1_PIN     19

#define RS485_TX_PIN  15
#define RS485_RX_PIN   2
#define LORA_TX_PIN   11
#define LORA_RX_PIN   13

static const struct gpio_dt_spec led_red =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_red), gpios);
static const struct gpio_dt_spec led_blue =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_led_blue), gpios);
static const struct gpio_dt_spec relay =
	GPIO_DT_SPEC_GET(DT_ALIAS(uttec_relay), gpios);
static const struct device *gpio0 = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart0 = DEVICE_DT_GET(DT_NODELABEL(uart0));

static struct sw_uart tx3;  /* SPI2 MOSI = P0.22 → Debug (115200) */
static struct sw_uart tx4;  /* SPI0 MOSI = P0.06 → USB-VCOM (9600) */

RING_BUF_DECLARE(uart_rx_rb, 256);

static void uart0_isr(const struct device *dev, void *user_data)
{
	ARG_UNUSED(user_data);
	while (uart_irq_update(dev) && uart_irq_is_pending(dev)) {
		if (uart_irq_rx_ready(dev)) {
			uint8_t buf[32];
			int n = uart_fifo_read(dev, buf, sizeof(buf));
			if (n > 0) ring_buf_put(&uart_rx_rb, buf, n);
		}
	}
}

/* Time-multiplexing: NRF_UARTE0 PSEL 동적 변경 + STARTRX 명시 trigger.
 * Default (overlay) = LoRa (P0.11/P0.13). RS485 (P0.15/P0.02)는 임시 phase. */
static void uart_switch_pins(uint32_t tx_pin, uint32_t rx_pin)
{
	uart_irq_rx_disable(uart0);

	/* Stop ongoing operations */
	NRF_UARTE0->TASKS_STOPRX = 1;
	NRF_UARTE0->TASKS_STOPTX = 1;
	k_busy_wait(200);

	/* Disable peripheral to allow PSEL write */
	NRF_UARTE0->ENABLE = 0;

	/* Change PSEL */
	NRF_UARTE0->PSEL.TXD = tx_pin;
	NRF_UARTE0->PSEL.RXD = rx_pin;

	/* Re-enable UARTE */
	NRF_UARTE0->ENABLE = 8;

	/* Explicitly start RX (driver might not auto-restart after ENABLE toggle) */
	NRF_UARTE0->TASKS_STARTRX = 1;

	uart_irq_rx_enable(uart0);
	k_busy_wait(2000);  /* longer settle */
}

static void uart_to_rs485(void)
{
	uart_switch_pins(RS485_TX_PIN, RS485_RX_PIN);
}

static void uart_to_lora(void)
{
	uart_switch_pins(LORA_TX_PIN, LORA_RX_PIN);
}

static uint16_t modbus_crc16(const uint8_t *buf, size_t len)
{
	uint16_t crc = 0xFFFF;
	for (size_t i = 0; i < len; i++) {
		crc ^= buf[i];
		for (int b = 0; b < 8; b++) {
			if (crc & 1U) crc = (crc >> 1) ^ 0xA001;
			else crc >>= 1;
		}
	}
	return crc;
}

static void modbus_build_read(uint8_t *out, uint8_t slave, uint16_t addr, uint16_t count)
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
	while (ring_buf_get(&uart_rx_rb, &junk, 1) == 1) { }
}

static void uart_send(const uint8_t *data, size_t len)
{
	for (size_t i = 0; i < len; i++) uart_poll_out(uart0, data[i]);
}

static size_t modbus_wait_response(uint8_t *resp, size_t max_len, uint32_t timeout_ms)
{
	size_t n = 0;
	int64_t deadline = k_uptime_get() + timeout_ms;
	int64_t last_rx = 0;
	while (k_uptime_get() < deadline) {
		uint8_t b;
		if (ring_buf_get(&uart_rx_rb, &b, 1) == 1) {
			if (n < max_len) resp[n++] = b;
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
	gpio_pin_configure_dt(&relay, GPIO_OUTPUT_INACTIVE);

	gpio_pin_configure(gpio0, LORA_M0_PIN, GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, LORA_M1_PIN, GPIO_OUTPUT_LOW);
	k_msleep(50);

	sw_uart_init(&tx3, DEVICE_DT_GET(DT_NODELABEL(spi2)), SW_UART_BAUD_115200);
	sw_uart_init(&tx4, DEVICE_DT_GET(DT_NODELABEL(spi0)), SW_UART_BAUD_9600);

	uart_irq_callback_set(uart0, uart0_isr);
	uart_irq_rx_enable(uart0);

	char banner[80];
	int bn = snprintf(banner, sizeof(banner),
		"\r\nUTTEC TX node %d — time-mux HW UART (RS485+LoRa), 3s cycle\r\n",
		TX_NODE_ID);
	sw_uart_write(&tx3, (const uint8_t *)banner, bn);
	sw_uart_write(&tx4, (const uint8_t *)banner, bn);

	uint8_t req[8];
	modbus_build_read(req, MODBUS_SLAVE, MODBUS_REG_LEVEL, 1);

	uint8_t resp[16];
	char msg[32];
	uint32_t ok = 0, err = 0;
	uint32_t cycle = 0;

	while (1) {
		int64_t cycle_start = k_uptime_get();

		/* USB-VCOM diagnostic: cycle start */
		char hdr[24];
		int hn = snprintf(hdr, sizeof(hdr), "c%u\r\n", (unsigned)cycle);
		sw_uart_write(&tx4, (const uint8_t *)hdr, hn);

		/* === RS485 phase === */
		uart_to_rs485();
		sw_uart_write_str(&tx4, "R\r\n");
		rx_drain();
		uart_send(req, sizeof(req));
		size_t rx_n = modbus_wait_response(resp, sizeof(resp), MODBUS_TIMEOUT_MS);

		/* USB-VCOM diagnostic: Modbus result */
		char res[24];
		int rn = snprintf(res, sizeof(res), "n=%u\r\n", (unsigned)rx_n);
		sw_uart_write(&tx4, (const uint8_t *)res, rn);

		int n;
		int16_t level = 0;
		if (rx_n == 7 && resp[0] == MODBUS_SLAVE && resp[1] == 0x03 && resp[2] == 0x02) {
			uint16_t crc_calc = modbus_crc16(resp, 5);
			uint16_t crc_recv = (uint16_t)resp[5] | ((uint16_t)resp[6] << 8);
			if (crc_calc == crc_recv) {
				level = (int16_t)((resp[3] << 8) | resp[4]);
				n = snprintf(msg, sizeof(msg), "tx%d:%d\r\n", TX_NODE_ID, level);

				/* === LoRa phase === */
				uart_to_lora();
				sw_uart_write_str(&tx4, "L\r\n");
				uart_send((const uint8_t *)msg, n);
				k_msleep(50);

				/* USB-VCOM display: actual message */
				sw_uart_write(&tx4, (const uint8_t *)msg, n);
				ok++;
			} else {
				err++;
				sw_uart_write_str(&tx4, "CRC\r\n");
			}
		} else {
			err++;
			/* USB-VCOM: also show raw bytes for diagnostic */
			char raw[48];
			int rwn = snprintf(raw, sizeof(raw), "raw:");
			for (size_t i = 0; i < rx_n && i < 8; i++) {
				rwn += snprintf(raw + rwn, sizeof(raw) - rwn, " %02X", resp[i]);
			}
			rwn += snprintf(raw + rwn, sizeof(raw) - rwn, "\r\n");
			sw_uart_write(&tx4, (const uint8_t *)raw, rwn);
		}

		gpio_pin_toggle_dt(&led_red);
		gpio_pin_toggle_dt(&led_blue);
		gpio_pin_toggle_dt(&relay);
		cycle++;

		/* Cycle period control */
		int64_t elapsed = k_uptime_get() - cycle_start;
		if (elapsed < CYCLE_MS) {
			k_msleep(CYCLE_MS - elapsed);
		}
	}
	return 0;
}
