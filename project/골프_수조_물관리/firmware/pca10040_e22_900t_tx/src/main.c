/*
 * pca10040_e22_900t_tx — E22-900T30D LoRa 거리 테스트 송신 노드 (v3 loopback)
 *
 *   목적: 2초 주기로 `$SEQ=NNNNN#\n` 송신. RX 노드가 받자마자 echo back 송신.
 *         TX 보드는 echo를 수신하여 양방향 통신을 검증.
 *
 *   거리 테스트 시 TX 보드 1대만 들고 다니면 됨:
 *     - LED1 ON (송신 중)  → 송신 작동 visual
 *     - LED2 toggle (echo 수신) → 양방향 통신 OK visual
 *     - LED2 안 깜빡임 → RX 보드까지 신호 도달 또는 echo 미수신 → 거리 한계
 *
 *   타겟: PCA10040 (nRF52 DK, nRF52832), SN 682359916
 *
 *   결선:
 *     E22 RXD ← P0.11 (D0)  UART TX
 *     E22 TXD → P0.12 (D1)  UART RX
 *     E22 M0  ← P0.29 (A3)
 *     E22 M1  ← P0.30 (A4)
 *     E22 AUX → P0.31 (A5)  input + pull-up
 *
 *   ⚠ E22 Config 함정 — 본 코드는 5/10 검증 시퀀스 + 5/19 baud 9600 발견 결합:
 *     - Config 모드 = M0=0, M1=1 (Mapping B)
 *     - Config UART baud = 9600 고정 (REG0 무관) ★★★
 *     - Sleep (M0=1, M1=1) = UART OFF, 절대 사용 금지
 *     - 응답 prefix = C1 (write 응답도 C1)
 *     상세: oldProject/test/bleModule/lora_e22/GOTCHA.md
 */

#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/uart.h>
#include <zephyr/sys/ring_buffer.h>
#include <zephyr/sys/printk.h>
#include <stdio.h>
#include <string.h>

#define E22_M0_PIN   29
#define E22_M1_PIN   30
#define E22_AUX_PIN  31

/*
 * Round-trip 타이밍 분석 (air 0.3 kbps, 12 byte payload):
 *   TX UART → E22:   ~1 ms
 *   E22 TX → RF:     ~870 ms
 *   RX E22 → UART:   ~1 ms
 *   RX MCU 처리:     ~5 ms
 *   RX UART → E22:   ~1 ms
 *   RX E22 TX → RF:  ~870 ms
 *   TX E22 → UART:   ~1 ms
 *   합계 round-trip: ~1.75 s
 */
#define TX_PERIOD_MS    4000   /* 4 s 주기 — round-trip + 마진 */
#define ECHO_TIMEOUT_MS 3000   /* 3 s echo wait — round-trip 1.75 s 충분 cover */

static const struct device *gpio0    = DEVICE_DT_GET(DT_NODELABEL(gpio0));
static const struct device *uart_e22 = DEVICE_DT_GET(DT_NODELABEL(uart0));
/* PCA10040 onboard LEDs: led0 = LED1 (P0.17), led1 = LED2 (P0.18). Active LOW. */
static const struct gpio_dt_spec led1 = GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios);
static const struct gpio_dt_spec led2 = GPIO_DT_SPEC_GET(DT_ALIAS(led1), gpios);

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
	0x00, 0x00, 0x00,  /* ADDH, ADDL, NETID */
	0xE0,              /* REG0: baud 115200 / 8N1 / air 0.3 kbps */
	0x00,              /* REG1: TX 30 dBm / subpkt 200B */
	0x48,              /* REG2: CH 72 = 922.125 MHz (Korea ISM) */
	0x80,              /* REG3: RSSI byte ON / transparent */
	0x00, 0x00,        /* CRYPT_H, CRYPT_L */
};

static void e22_config(void)
{
	printk("\n[Config] E22 setup — Mapping B (M0=0,M1=1) + baud 9600\n");

	/* Normal mode reset */
	set_mode(0, 0, 100);
	wait_aux_high(500);

	/* Config mode + baud 9600 */
	set_mode(0, 1, 50);
	wait_aux_high(500);
	uart_set_baud(9600);
	k_msleep(50);
	rx_drain();

	uint8_t before[9], after[9];
	if (!read_all_reg(before)) {
		printk("  ⚠ read fail at 9600 — abort config\n");
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
	/* Normal mode + baud 115200 */
	uart_set_baud(115200);
	k_msleep(50);
	set_mode(0, 0, 100);
	wait_aux_high(500);
	rx_drain();
}

/* 13-byte frame "$SEQ=NNNNN#\n" + RSSI byte parser.
 *   r=1 valid frame (seq, rssi set), r=-1 bad, r=0 accumulating. */
static char frame_buf[13];
static int  frame_len = 0;

static int feed_byte(uint8_t b, int *out_seq, int *out_rssi)
{
	if (frame_len == 0) {
		if (b != '$') return 0;
	}
	frame_buf[frame_len++] = (char)b;
	if (frame_len < 13) return 0;

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
	*out_rssi = rssi_dbm;
	return 1;
}

int main(void)
{
	gpio_pin_configure(gpio0, E22_M0_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_M1_PIN,  GPIO_OUTPUT_LOW);
	gpio_pin_configure(gpio0, E22_AUX_PIN, GPIO_INPUT | GPIO_PULL_UP);
	gpio_pin_configure_dt(&led1, GPIO_OUTPUT_INACTIVE);
	gpio_pin_configure_dt(&led2, GPIO_OUTPUT_INACTIVE);

	k_msleep(300);

	printk("\n======================================================\n");
	printk("  PCA10040 + E22-900T30D — TX (SN 682359916, v3 loopback)\n");
	printk("  TX every %d ms → RX echo back → TX 양방향 검증\n", TX_PERIOD_MS);
	printk("  LED1 = 송신 표시 (송신 중 ON)\n");
	printk("  LED2 = echo 수신 표시 (수신마다 toggle)\n");
	printk("======================================================\n");

	uart_irq_callback_set(uart_e22, uart_isr);
	uart_irq_rx_enable(uart_e22);
	k_msleep(50);

	e22_config();

	printk("\n[Loop] TX/echo-listen loop start\n\n");

	uint32_t tx_count = 0, echo_count = 0, echo_lost = 0;
	int last_echo_rssi = 0;

	while (1) {
		tx_count++;

		/* ★ LED1 ON during TX */
		gpio_pin_set_dt(&led1, 1);

		char buf[16];
		int n = snprintf(buf, sizeof(buf), "$SEQ=%05u#\n", (unsigned)tx_count);
		rx_drain();  /* discard stale echo bytes from prior cycles */
		for (int i = 0; i < n; i++) {
			uart_poll_out(uart_e22, (uint8_t)buf[i]);
		}
		printk("TX %05u → ", (unsigned)tx_count);

		/* Wait for RX echo (RX board echoes immediately on receive) */
		int64_t deadline = k_uptime_get() + ECHO_TIMEOUT_MS;
		bool got_echo = false;
		while (k_uptime_get() < deadline) {
			uint8_t b;
			if (ring_buf_get(&rx_rb, &b, 1) == 1) {
				int seq, rssi;
				int r = feed_byte(b, &seq, &rssi);
				if (r == 1 && seq == (int)tx_count) {
					got_echo = true;
					last_echo_rssi = rssi;
					echo_count++;
					gpio_pin_toggle_dt(&led2);  /* ★ LED2 toggle on echo */
					printk("ECHO seq=%d RSSI=%d dBm  ✓ round-trip\n",
					       seq, rssi);
					break;
				}
			} else {
				k_msleep(1);
			}
		}

		if (!got_echo) {
			echo_lost++;
			printk("NO ECHO  ✗ (TX=%u echo_rx=%u lost=%u)\n",
			       tx_count, echo_count, echo_lost);
		}

		/* LED1 OFF after TX phase */
		gpio_pin_set_dt(&led1, 0);

		/* Status line every 10 cycles */
		if (tx_count % 10 == 0) {
			uint32_t per_x10 = tx_count ? (echo_lost * 1000U / tx_count) : 0;
			printk("STAT tx=%u echo=%u lost=%u round-trip-PER=%u.%u%%  "
			       "last_RSSI=%d dBm\n",
			       tx_count, echo_count, echo_lost,
			       per_x10 / 10U, per_x10 % 10U, last_echo_rssi);
		}

		/* Sleep until next TX */
		int64_t next = k_uptime_get();
		(void)next;
		k_msleep(TX_PERIOD_MS - ECHO_TIMEOUT_MS);  /* roughly maintain TX_PERIOD_MS */
	}
	return 0;
}
