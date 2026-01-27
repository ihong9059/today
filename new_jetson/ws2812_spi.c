#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/spi/spidev.h>

/*
 * WS2812 via SPI
 *
 * SPI clock: 2.5MHz (400ns per bit)
 * Each WS2812 bit encoded as 3 SPI bits:
 *   WS2812 '0' = 0b100 = high(400ns) + low(800ns)
 *   WS2812 '1' = 0b110 = high(800ns) + low(400ns)
 *
 * Each WS2812 byte (8 bits) becomes 24 SPI bits (3 bytes)
 * Each LED (24 bits) becomes 72 SPI bits (9 bytes)
 */

#define SPI_DEVICE "/dev/spidev0.0"
#define SPI_SPEED  2500000  // 2.5 MHz

int spi_fd;

// Encode one WS2812 byte into 3 SPI bytes
void encode_byte(uint8_t byte, uint8_t *out) {
    uint32_t encoded = 0;

    for (int i = 7; i >= 0; i--) {
        encoded <<= 3;
        if ((byte >> i) & 1) {
            encoded |= 0b110;  // WS2812 '1'
        } else {
            encoded |= 0b100;  // WS2812 '0'
        }
    }

    // 24 bits -> 3 bytes (MSB first)
    out[0] = (encoded >> 16) & 0xFF;
    out[1] = (encoded >> 8) & 0xFF;
    out[2] = encoded & 0xFF;
}

// Send one LED color (GRB order)
void send_led(uint8_t r, uint8_t g, uint8_t b) {
    uint8_t buffer[9];  // 3 bytes per color channel

    encode_byte(g, &buffer[0]);
    encode_byte(r, &buffer[3]);
    encode_byte(b, &buffer[6]);

    write(spi_fd, buffer, 9);
}

// Reset (low for >50us)
void reset_led(void) {
    uint8_t zeros[20] = {0};  // Send zeros for reset
    write(spi_fd, zeros, sizeof(zeros));
    usleep(100);
}

int main() {
    spi_fd = open(SPI_DEVICE, O_RDWR);
    if (spi_fd < 0) {
        perror("open SPI");
        return 1;
    }

    // Configure SPI
    uint8_t mode = SPI_MODE_0;
    uint8_t bits = 8;
    uint32_t speed = SPI_SPEED;

    ioctl(spi_fd, SPI_IOC_WR_MODE, &mode);
    ioctl(spi_fd, SPI_IOC_WR_BITS_PER_WORD, &bits);
    ioctl(spi_fd, SPI_IOC_WR_MAX_SPEED_HZ, &speed);

    printf("=== WS2812 via SPI ===\n");
    printf("SPI Device: %s\n", SPI_DEVICE);
    printf("SPI Speed: %d Hz\n", speed);

    reset_led();

    printf("RED...\n");
    send_led(150, 0, 0);
    reset_led();
    sleep(3);

    printf("GREEN...\n");
    send_led(0, 150, 0);
    reset_led();
    sleep(3);

    printf("BLUE...\n");
    send_led(0, 0, 150);
    reset_led();
    sleep(3);

    printf("OFF\n");
    send_led(0, 0, 0);
    reset_led();

    close(spi_fd);
    printf("Done!\n");
    return 0;
}
