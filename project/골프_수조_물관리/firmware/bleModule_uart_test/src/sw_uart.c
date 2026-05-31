/*
 * sw_uart.c — Software UART TX via SPI MOSI (multi-instance, multi-baud)
 *
 *   SW_UART_BAUD_115200: 8 MHz SPI, Bresenham [69,70,69,70,69,70,69,70,69,69]
 *                        = 694 SPI bits = 87 SPI bytes (양산 검증, lora_tx)
 *
 *   SW_UART_BAUD_9600:   1 MHz SPI, Bresenham [104,104,104,104,105,104,104,104,104,104]
 *                        = 1041 SPI bits = 131 SPI bytes
 */

#include "sw_uart.h"

#include <zephyr/kernel.h>
#include <zephyr/drivers/spi.h>
#include <zephyr/sys/printk.h>
#include <string.h>

#define UART_BITS_PER_BYTE  10U

/* 115200 baud — 8 MHz SPI */
static const uint8_t bres_115200[UART_BITS_PER_BYTE] = {
	69, 70, 69, 70, 69, 70, 69, 70, 69, 69
};
#define SPI_BITS_115200   694U
#define SPI_BYTES_115200  ((SPI_BITS_115200 + 7U) / 8U)   /* 87 */

static const struct spi_config cfg_115200 = {
	.frequency = 8000000U,
	.operation = SPI_WORD_SET(8) | SPI_TRANSFER_MSB | SPI_OP_MODE_MASTER,
	.slave = 0,
};

/* 9600 baud — 1 MHz SPI with extended trailing idle.
 *
 * Pattern: uniform [105×10] = 1050 SPI bits/UART byte → effective 9524 baud
 *
 * Buffer: 200 bytes (= 1600 SPI bits). First 1050 bits encode the UART byte;
 * remaining 550 bits (550 µs) are trailing idle HIGH. This isolates any
 * end-of-SPI-transaction glitch from the next byte's start bit, so HW UART
 * RX (16× oversampling, sensitive to glitches) can recover cleanly.
 *
 * SW-UART RX2 (busy-wait) wasn't affected by the glitch; HW UART RX1 was. */
static const uint8_t bres_9600[UART_BITS_PER_BYTE] = {
	105, 105, 105, 105, 105, 105, 105, 105, 105, 105
};
#define SPI_BITS_9600   1050U
#define SPI_BYTES_9600  200U   /* extended idle for HW UART RX compatibility */

static const struct spi_config cfg_9600 = {
	.frequency = 1000000U,
	.operation = SPI_WORD_SET(8) | SPI_TRANSFER_MSB | SPI_OP_MODE_MASTER,
	.slave = 0,
};

#define SPI_BYTES_MAX  200U  /* max of two configs */

static const struct spi_config *get_cfg(enum sw_uart_baud baud)
{
	return (baud == SW_UART_BAUD_115200) ? &cfg_115200 : &cfg_9600;
}

static const uint8_t *get_bres(enum sw_uart_baud baud)
{
	return (baud == SW_UART_BAUD_115200) ? bres_115200 : bres_9600;
}

static uint16_t get_spi_bytes(enum sw_uart_baud baud)
{
	return (baud == SW_UART_BAUD_115200) ? SPI_BYTES_115200 : SPI_BYTES_9600;
}

static void encode_uart_byte(uint8_t byte, uint8_t *out,
			     const uint8_t *bres, uint16_t total_bytes)
{
	uint16_t pattern = 0U;
	pattern |= ((uint16_t)byte << 1);    /* data: bits 1..8 */
	pattern |= (uint16_t)1U << 9;        /* stop = 1 */
	/* bit 0 = 0 = start */

	memset(out, 0xFF, total_bytes);

	uint32_t spi_bit = 0;
	for (uint32_t u = 0; u < UART_BITS_PER_BYTE; u++) {
		bool val = ((pattern >> u) & 1U) != 0U;
		uint32_t n = bres[u];
		for (uint32_t s = 0; s < n; s++) {
			uint32_t byte_idx = spi_bit / 8U;
			uint32_t bit_in_byte = 7U - (spi_bit & 7U);
			if (!val) {
				out[byte_idx] &= (uint8_t)~(1U << bit_in_byte);
			}
			spi_bit++;
		}
	}
}

int sw_uart_init(struct sw_uart *u, const struct device *spi_dev, enum sw_uart_baud baud)
{
	if (u == NULL || spi_dev == NULL) {
		return -1;
	}
	if (!device_is_ready(spi_dev)) {
		printk("sw_uart: spi not ready\n");
		return -1;
	}
	u->spi_dev = spi_dev;
	u->baud = baud;

	/* Warmup: 16 byte 0xFF to set MOSI line idle high */
	uint8_t warmup[16];
	memset(warmup, 0xFF, sizeof(warmup));
	struct spi_buf tx = { .buf = warmup, .len = sizeof(warmup) };
	struct spi_buf_set tx_set = { .buffers = &tx, .count = 1 };
	(void)spi_write(spi_dev, get_cfg(baud), &tx_set);
	k_msleep(10);
	return 0;
}

int sw_uart_write(struct sw_uart *u, const uint8_t *data, size_t len)
{
	if (u == NULL || u->spi_dev == NULL) {
		return -1;
	}
	if (len == 0) {
		return 0;
	}

	const struct spi_config *cfg = get_cfg(u->baud);
	const uint8_t *bres = get_bres(u->baud);
	uint16_t total_bytes = get_spi_bytes(u->baud);

	uint8_t buf[SPI_BYTES_MAX];
	for (size_t i = 0; i < len; i++) {
		encode_uart_byte(data[i], buf, bres, total_bytes);
		struct spi_buf tx = { .buf = buf, .len = total_bytes };
		struct spi_buf_set tx_set = { .buffers = &tx, .count = 1 };
		int rc = spi_write(u->spi_dev, cfg, &tx_set);
		if (rc < 0) {
			return rc;
		}
	}
	return 0;
}

int sw_uart_write_str(struct sw_uart *u, const char *str)
{
	return sw_uart_write(u, (const uint8_t *)str, strlen(str));
}
