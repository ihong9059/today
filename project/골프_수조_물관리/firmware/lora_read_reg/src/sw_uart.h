/*
 * sw_uart.h — Software UART TX via SPI MOSI (9600 baud, multi-instance)
 *
 * SPI MOSI 핀에서 UART 파형 직접 송신. 다중 인스턴스 지원 (SPI1, SPI2 동시 운용).
 *
 * 설계:
 *   - SPI clock = 1 MHz, MSB-first
 *   - 1 UART bit = 104 or 105 SPI bits (Bresenham 분배, 1 MHz / 9600 = 104.17)
 *   - 패턴: [104, 104, 104, 104, 105, 104, 104, 104, 104, 104] sum = 1041 SPI bits
 *   - 실효 baud = 1e6 × 10 / 1041 = 9606 Hz (목표 9600 대비 +0.06%, UART tolerance ±2-3% 내)
 *   - 1 UART byte = 131 SPI bytes (= 1048 bits, trailing 7 bits idle high)
 *
 * 사용:
 *   static struct sw_uart tx2;
 *   sw_uart_init(&tx2, DEVICE_DT_GET(DT_NODELABEL(spi1)));
 *   sw_uart_write_str(&tx2, "hello\r\n");
 *
 *   static struct sw_uart tx3;
 *   sw_uart_init(&tx3, DEVICE_DT_GET(DT_NODELABEL(spi2)));
 *   sw_uart_write_str(&tx3, "debug\r\n");
 */

#ifndef SW_UART_H_
#define SW_UART_H_

#include <stddef.h>
#include <stdint.h>
#include <zephyr/device.h>

enum sw_uart_baud {
	SW_UART_BAUD_115200,   /* 8 MHz SPI, 87 SPI bytes/UART byte */
	SW_UART_BAUD_9600,     /* 1 MHz SPI, 131 SPI bytes/UART byte */
};

struct sw_uart {
	const struct device *spi_dev;
	enum sw_uart_baud baud;
};

int sw_uart_init(struct sw_uart *u, const struct device *spi_dev, enum sw_uart_baud baud);
int sw_uart_write(struct sw_uart *u, const uint8_t *data, size_t len);
int sw_uart_write_str(struct sw_uart *u, const char *str);

#endif /* SW_UART_H_ */
