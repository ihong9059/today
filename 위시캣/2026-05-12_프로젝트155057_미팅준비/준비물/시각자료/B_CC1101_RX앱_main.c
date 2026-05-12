/*
 * Raw OOK Sniffer — CC1101 Async Serial Mode
 *
 * CC1101을 비동기 시리얼 OOK 모드로 설정하여 GDO0에서 복조된
 * raw 데이터를 출력하고, GPIO 양방향 에지 인터럽트로 펄스 타이밍을 캡처.
 * 20ms 이상 무신호 시 캡처 버퍼를 덤프합니다.
 */
#include <zephyr/kernel.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/spi.h>
#include <zephyr/logging/log.h>
#include "cc1101_ook.h"
#include "cc1101_regs.h"

LOG_MODULE_REGISTER(rx_raw, LOG_LEVEL_INF);

/* ---- Hardware from devicetree ---- */
static const struct device *spi_dev = DEVICE_DT_GET(DT_NODELABEL(spi3));
static const struct gpio_dt_spec cs_gpio = GPIO_DT_SPEC_GET_BY_IDX(
	DT_NODELABEL(spi3), cs_gpios, 0);
static const struct gpio_dt_spec gdo0 = GPIO_DT_SPEC_GET(DT_NODELABEL(gdo0), gpios);
static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios);

static struct cc1101_dev cc;

/* ---- Pulse capture ---- */
#define MAX_EDGES       600
#define IDLE_TIMEOUT_MS 20      /* 20ms silence = end of burst */
#define MIN_EDGES       8       /* discard noise bursts */

static uint32_t edge_cyc[MAX_EDGES];
static volatile int edge_idx;
static volatile uint32_t last_edge;
static volatile bool active;
static struct gpio_callback gdo0_cb;
static int capture_num;

static void gdo0_isr(const struct device *dev, struct gpio_callback *cb,
		     uint32_t pins)
{
	uint32_t now = k_cycle_get_32();

	if (edge_idx < MAX_EDGES) {
		edge_cyc[edge_idx++] = now;
	}
	last_edge = now;
	active = true;
}

/* ---- Dump captured pulses ---- */
static void dump_pulses(int count)
{
	if (count < MIN_EDGES) {
		return;
	}

	capture_num++;
	int8_t rssi = cc1101_ook_read_rssi(&cc);

	uint32_t total_us = k_cyc_to_us_floor32(
		edge_cyc[count - 1] - edge_cyc[0]);

	printk("\n======= Capture #%d | edges=%d | %u ms | RSSI %d dBm =======\n",
	       capture_num, count, total_us / 1000, rssi);

	/* Print pulse durations (us), comma separated.
	 * Alternates: first duration = time between edge[0]→edge[1], etc.
	 * Odd index (1,3,5...) = gap, Even index (2,4,6...) = pulse
	 * (assuming first edge is rising = signal start)
	 */
	printk("Pulse timings (us):\n");
	for (int i = 1; i < count; i++) {
		uint32_t dur = k_cyc_to_us_floor32(edge_cyc[i] - edge_cyc[i - 1]);
		printk("%u", dur);
		if (i < count - 1) {
			printk(",");
		}
		if ((i % 16) == 0) {
			printk("\n");
		}
	}
	printk("\n");

	/* Guess short/long pulse threshold for common protocols */
	/* Find median-ish duration to suggest protocol */
	uint32_t min_d = UINT32_MAX, max_d = 0;
	for (int i = 1; i < count; i++) {
		uint32_t d = k_cyc_to_us_floor32(edge_cyc[i] - edge_cyc[i - 1]);
		if (d < min_d) {
			min_d = d;
		}
		if (d > max_d) {
			max_d = d;
		}
	}
	printk("Min: %u us  Max: %u us  Ratio: %u\n",
	       min_d, max_d, max_d / (min_d ? min_d : 1));

	/* Try to decode as binary: short=0, long=1
	 * Threshold = (min + max) / 3 — works for PT2262/EV1527 style */
	uint32_t thr = min_d * 2;
	printk("Binary (thr=%u us): ", thr);
	for (int i = 1; i < count; i++) {
		uint32_t d = k_cyc_to_us_floor32(edge_cyc[i] - edge_cyc[i - 1]);
		printk("%c", d > thr ? '1' : '0');
	}
	printk("\n");

	/* Hex dump of the binary interpretation */
	printk("Hex: ");
	uint8_t byte = 0;
	int bit_cnt = 0;
	for (int i = 1; i < count; i++) {
		uint32_t d = k_cyc_to_us_floor32(edge_cyc[i] - edge_cyc[i - 1]);
		byte = (byte << 1) | (d > thr ? 1 : 0);
		bit_cnt++;
		if (bit_cnt == 8) {
			printk("%02X ", byte);
			byte = 0;
			bit_cnt = 0;
		}
	}
	if (bit_cnt > 0) {
		byte <<= (8 - bit_cnt);
		printk("%02X(%d bits)", byte, bit_cnt);
	}
	printk("\n========================================================\n");
}

/* ---- CC1101 raw async OOK RX configuration ---- */
static int cc1101_init_raw_rx(struct cc1101_dev *dev)
{
	if (!device_is_ready(dev->spi)) {
		printk("SPI not ready!\n");
		return -ENODEV;
	}

	cc1101_ook_strobe(dev, CC1101_SRES);
	k_msleep(10);

	uint8_t pn = cc1101_ook_read_status(dev, CC1101_PARTNUM);
	uint8_t ver = cc1101_ook_read_status(dev, CC1101_VERSION);
	printk("CC1101 PARTNUM=0x%02X VERSION=0x%02X\n", pn, ver);
	if (ver == 0x00 || ver == 0xFF) {
		printk("CC1101 not responding!\n");
		return -EIO;
	}

	/* 447.925 MHz: FREQ = 447925000 * 2^16 / 26e6 = 1129047 = 0x113A57 */
	cc1101_ook_write_reg(dev, CC1101_FREQ2, 0x11);
	cc1101_ook_write_reg(dev, CC1101_FREQ1, 0x3A);
	cc1101_ook_write_reg(dev, CC1101_FREQ0, 0x57);

	/* GDO0 = async serial data output (inverted for RX) */
	cc1101_ook_write_reg(dev, CC1101_IOCFG0, 0x0D);
	cc1101_ook_write_reg(dev, CC1101_IOCFG2, 0x29);

	/* Async serial mode, no CRC, no whitening */
	cc1101_ook_write_reg(dev, CC1101_PKTCTRL0, 0x30);
	cc1101_ook_write_reg(dev, CC1101_PKTCTRL1, 0x00);

	/* OOK modulation, no sync word, no Manchester */
	cc1101_ook_write_reg(dev, CC1101_MDMCFG2, 0x30);
	cc1101_ook_write_reg(dev, CC1101_MDMCFG1, 0x22);
	cc1101_ook_write_reg(dev, CC1101_MDMCFG0, 0xF8);

	/* Channel BW ~325 kHz (wide enough for various remotes) */
	/* Data rate ~3.8 kbps (internal slicer speed) */
	cc1101_ook_write_reg(dev, CC1101_MDMCFG4, 0x87);
	cc1101_ook_write_reg(dev, CC1101_MDMCFG3, 0x32);

	/* Frequency synthesizer */
	cc1101_ook_write_reg(dev, CC1101_FSCTRL1, 0x06);
	cc1101_ook_write_reg(dev, CC1101_FSCTRL0, 0x00);
	cc1101_ook_write_reg(dev, CC1101_DEVIATN, 0x00);

	/* AGC: OOK optimized (TI DN022) */
	cc1101_ook_write_reg(dev, CC1101_AGCCTRL2, 0x03);
	cc1101_ook_write_reg(dev, CC1101_AGCCTRL1, 0x00);
	cc1101_ook_write_reg(dev, CC1101_AGCCTRL0, 0x91);

	/* Front-end config */
	cc1101_ook_write_reg(dev, CC1101_FREND1, 0xB6);
	cc1101_ook_write_reg(dev, CC1101_FREND0, 0x11);

	/* Frequency calibration */
	cc1101_ook_write_reg(dev, CC1101_FSCAL3, 0xE9);
	cc1101_ook_write_reg(dev, CC1101_FSCAL2, 0x2A);
	cc1101_ook_write_reg(dev, CC1101_FSCAL1, 0x00);
	cc1101_ook_write_reg(dev, CC1101_FSCAL0, 0x1F);

	/* Test registers */
	cc1101_ook_write_reg(dev, CC1101_TEST2, 0x81);
	cc1101_ook_write_reg(dev, CC1101_TEST1, 0x35);
	cc1101_ook_write_reg(dev, CC1101_TEST0, 0x09);

	/* Stay in RX after packet */
	cc1101_ook_write_reg(dev, CC1101_MCSM1, 0x3F);
	cc1101_ook_write_reg(dev, CC1101_MCSM0, 0x18);

	/* Calibrate */
	cc1101_ook_strobe(dev, CC1101_SCAL);
	k_msleep(1);

	printk("CC1101 raw OOK RX ready (447.925 MHz, async serial)\n");
	return 0;
}

/* ---- Main ---- */
int main(void)
{
	printk("\n========================================\n");
	printk("  ROLE: RX (RAW OOK)  |  S/N: 679\n");
	printk("========================================\n");

	/* SPI config */
	cc.spi = spi_dev;
	cc.spi_cfg.frequency = 4000000;
	cc.spi_cfg.operation = SPI_WORD_SET(8) | SPI_TRANSFER_MSB;
	cc.cs_ctrl.gpio = cs_gpio;
	cc.cs_ctrl.delay = 0;
	cc.spi_cfg.cs = cc.cs_ctrl;

	int ret = cc1101_init_raw_rx(&cc);
	if (ret) {
		return ret;
	}

	/* LED indicator */
	gpio_pin_configure_dt(&led, GPIO_OUTPUT_INACTIVE);

	/* GDO0: capture both edges */
	gpio_pin_configure_dt(&gdo0, GPIO_INPUT);
	gpio_pin_interrupt_configure_dt(&gdo0, GPIO_INT_EDGE_BOTH);
	gpio_init_callback(&gdo0_cb, gdo0_isr, BIT(gdo0.pin));
	gpio_add_callback(gdo0.port, &gdo0_cb);

	/* Enter RX mode */
	cc1101_ook_strobe(&cc, CC1101_SIDLE);
	cc1101_ook_strobe(&cc, CC1101_SRX);

	/* Diagnostic: verify CC1101 state */
	k_msleep(10);
	uint8_t marc = cc1101_ook_read_status(&cc, CC1101_MARCSTATE) & 0x1F;
	uint8_t iocfg0_rb = cc1101_ook_read_reg(&cc, CC1101_IOCFG0);
	uint8_t pktctrl0_rb = cc1101_ook_read_reg(&cc, CC1101_PKTCTRL0);
	uint8_t mdmcfg2_rb = cc1101_ook_read_reg(&cc, CC1101_MDMCFG2);
	int gdo0_val = gpio_pin_get_dt(&gdo0);
	printk("MARCSTATE=0x%02X (0x0D=RX) IOCFG0=0x%02X PKTCTRL0=0x%02X MDMCFG2=0x%02X\n",
	       marc, iocfg0_rb, pktctrl0_rb, mdmcfg2_rb);
	printk("GDO0 pin level: %d\n", gdo0_val);
	printk("Listening for OOK signals...\n");
	printk("(Press remote buttons near antenna)\n\n");

	int diag_cnt = 0;

	while (1) {
		if (active) {
			uint32_t now = k_cycle_get_32();
			uint32_t elapsed_ms = k_cyc_to_ms_floor32(now - last_edge);

			if (elapsed_ms >= IDLE_TIMEOUT_MS) {
				int count = edge_idx;
				active = false;

				gpio_pin_toggle_dt(&led);
				dump_pulses(count);

				/* Reset for next capture */
				edge_idx = 0;

				/* Re-enter RX */
				cc1101_ook_strobe(&cc, CC1101_SIDLE);
				cc1101_ook_strobe(&cc, CC1101_SRX);
			}
		}
		k_msleep(5);

		/* Periodic diagnostic every 5 seconds */
		diag_cnt++;
		if (diag_cnt >= 1000) {
			diag_cnt = 0;
			marc = cc1101_ook_read_status(&cc, CC1101_MARCSTATE) & 0x1F;
			int8_t rssi = cc1101_ook_read_rssi(&cc);
			int gval = gpio_pin_get_dt(&gdo0);
			printk("[diag] MARC=0x%02X RSSI=%d GDO0=%d edges=%d\n",
			       marc, rssi, gval, edge_idx);
		}
	}
	return 0;
}
