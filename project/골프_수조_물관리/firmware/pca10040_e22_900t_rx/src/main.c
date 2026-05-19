/*
 * pca10040_e22_900t_rx — E22-900T30D LoRa 거리 테스트 수신 + echo 노드 (v3 loopback)
 *
 *   목적: TX 노드의 `$SEQ=NNNNN#\n` 수신 → LED1 toggle → **즉시 echo 송신** (return)
 *         TX가 echo를 받아 양방향 검증.
 *
 *   동작 시퀀스:
 *     1. UART RX ISR로 13 byte frame ($SEQ + RSSI) 수신
 *     2. LED1 toggle (수신 표시)
 *     3. 12 byte ($SEQ=NNNNN#\n)만 그대로 echo 송신
 *     4. RX 측 RSSI byte는 echo에서 자동 추가됨 (E22 REG3=0x80)
 *
 *   타겟: PCA10040 (nRF52 DK, nRF52832), SN 1050349064
 *
 *   ⚠ E22 Config 함정 — 본 코드 부팅 시 자동 인가:
 *     - Config 모드 = M0=0, M1=1 (Mapping B)
 *     - Config UART baud = 9600 고정 ★★★
 *     - 상세: oldProject/test/bleModule/lora_e22/GOTCHA.md
 */

#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/uart.h>
#include <zephyr/sys/ring_buffer.h>
#include <zephyr/sys/printk.h>
#include <stdio.h>
#include <string.h>

#define E22_M0_PIN       29
#define E22_M1_PIN       30
#define E22_AUX_PIN      31

#define FRAME_LEN        13   /* "$SEQ=NNNNN#\n" + RSSI byte */
#define STATS_PERIOD_MS  5000

static const struct device *gpio0    = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart_e22 = DEVICE_DT_GET(DT_NODELABEL(uart0));
static const struct gpio_dt_spec led1 = GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios);

RING_BUF_DECLARE(rx_rb, 256);

static void uart_isr(const struct device *dev, void *user_data)
{
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

static int read_all_reg(uint8_t *cfg9)
{
	rx_drain();
	uint8_t cmd[3] = {0xC1, 0x00, 0x09};
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

static const uint8_t target_cfg[9] = {
	0x00, 0x00, 0x00,
	0xE0, 0x00, 0x48, 0x80,
	0x00, 0x00,
};

static void e22_config(void)
{
	printk("\n[Config] E22 setup — Mapping B (M0=0,M1=1) + baud 9600\n");

	set_mode(0, 0, 100);
	wait_aux_high(500);

	set_mode(0, 1, 50);
	wait_aux_high(500);
	uart_set_baud(9600);
	k_msleep(50);
	rx_drain();

	uint8_t before[9], after[9];
	if (!read_all_reg(before)) {
		printk("  ⚠ read fail at 9600 — abort\n");
		goto restore;
	}
	printk("  BEFORE: REG0=%02X REG2=%02X(CH%u→%u.125MHz) REG3=%02X(RSSI=%s)\n",
	       before[3], before[5], before[5], 850 + before[5], before[6],
	       (before[6] & 0x80) ? "ON" : "off");

	if (memcmp(before, target_cfg, 9) == 0) {
		printk("  → already at target. skip write.\n");
		goto restore;
	}

	write_all_reg(target_cfg);
	wait_aux_high(800);
	k_msleep(100);

	if (read_all_reg(after) && memcmp(after, target_cfg, 9) == 0) {
		printk("  AFTER:  REG0=%02X REG2=%02X(CH%u→%u.125MHz) REG3=%02X(RSSI=%s)\n",
		       after[3], after[5], after[5], 850 + after[5], after[6],
		       (after[6] & 0x80) ? "ON" : "off");
		printk("  ✅ config WRITE OK\n");
	} else {
		printk("  ⚠ verify fail\n");
	}

restore:
	uart_set_baud(115200);
	k_msleep(50);
	set_mode(0, 0, 100);
	wait_aux_high(500);
	rx_drain();
}

/* 13-byte frame parser */
static char frame_buf[FRAME_LEN];
static int  frame_len = 0;

static int feed_byte(uint8_t b, int *out_seq, int *out_rssi_dbm)
{
	if (frame_len == 0) {
		if (b != '$') return 0;
	}
	frame_buf[frame_len++] = (char)b;
	if (frame_len < FRAME_LEN) return 0;

	int seq = 0;
	bool ok = (memcmp(frame_buf, "$SEQ=", 5) == 0
	        && frame_buf[10] == '#' && frame_buf[11] == '\n');
	if (ok) {
		for (int i = 5; i < 10; i++) {
			if (frame_buf[i] < '0' || frame_buf[i] > '9') { ok = false; break; }
			seq = seq * 10 + (frame_buf[i] - '0');
		}
	}
	int rssi_dbm = -(256 - (uint8_t)frame_buf[12]);

	frame_len = 0;
	if (!ok) return -1;
	*out_seq = seq;
	*out_rssi_dbm = rssi_dbm;
	return 1;
}

int main(void)
{
	gpio_pin_configure(gpio0, E22_M0_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_M1_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_AUX_PIN, GPIO_INPUT | GPIO_PULL_UP);
	gpio_pin_configure_dt(&led1, GPIO_OUTPUT_INACTIVE);

	k_msleep(300);

	printk("\n======================================================\n");
	printk("  PCA10040 + E22-900T30D — RX (SN 1050349064, v3 loopback)\n");
	printk("  RX → LED1 toggle → immediate echo back to TX\n");
	printk("======================================================\n");

	uart_irq_callback_set(uart_e22, uart_isr);
	uart_irq_rx_enable(uart_e22);
	k_msleep(50);

	e22_config();

	printk("\n[Loop] RX/echo loop start\n\n");

	uint32_t rx_count = 0, lost_count = 0, bad_count = 0;
	int last_seq = -1;
	int min_rssi = 0, max_rssi = 0, sum_rssi = 0;
	int64_t next_stat = k_uptime_get() + STATS_PERIOD_MS;

	while (1) {
		uint8_t b;
		while (ring_buf_get(&rx_rb, &b, 1) == 1) {
			int seq, rssi;
			int r = feed_byte(b, &seq, &rssi);
			if (r == 1) {
				rx_count++;

				/* ★ LED1 toggle on receive */
				gpio_pin_toggle_dt(&led1);

				/* ★ Immediate echo back — 12 byte "$SEQ=NNNNN#\n" only.
				 * E22 will auto-append RSSI byte on TX side again. */
				char echo[16];
				int n = snprintf(echo, sizeof(echo), "$SEQ=%05u#\n", (unsigned)seq);
				for (int i = 0; i < n; i++) {
					uart_poll_out(uart_e22, (uint8_t)echo[i]);
				}

				if (last_seq > 0 && seq > last_seq + 1) {
					int gap = seq - last_seq - 1;
					lost_count += gap;
					printk("RX %05d  RSSI=%4d dBm  [GAP +%d] → echoed\n",
					       seq, rssi, gap);
				} else {
					printk("RX %05d  RSSI=%4d dBm → echoed\n", seq, rssi);
				}

				if (rx_count == 1) {
					min_rssi = max_rssi = rssi;
				} else {
					if (rssi < min_rssi) min_rssi = rssi;
					if (rssi > max_rssi) max_rssi = rssi;
				}
				sum_rssi += rssi;
				last_seq = seq;
			} else if (r == -1) {
				bad_count++;
				printk("[BAD frame]\n");
			}
		}

		if (k_uptime_get() >= next_stat) {
			uint32_t total = rx_count + lost_count;
			uint32_t per_x10 = total ? (lost_count * 1000U / total) : 0;
			int avg_rssi = rx_count ? (sum_rssi / (int)rx_count) : 0;
			printk("STAT rx=%u lost=%u bad=%u PER=%u.%u%%  "
			       "RSSI min=%d max=%d avg=%d  last=%d\n",
			       rx_count, lost_count, bad_count,
			       per_x10 / 10U, per_x10 % 10U,
			       min_rssi, max_rssi, avg_rssi, last_seq);
			next_stat += STATS_PERIOD_MS;
		}

		k_msleep(1);
	}
	return 0;
}
