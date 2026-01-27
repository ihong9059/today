#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000
#define PORT_C_OUT 0x104
#define PORT_C_OE  0x114
#define GPIO_BIT   (1 << 0)

volatile unsigned int *gpio_out;
volatile unsigned int *gpio_oe;

static inline void gpio_high(void) {
    *gpio_out |= GPIO_BIT;
}

static inline void gpio_low(void) {
    *gpio_out &= ~GPIO_BIT;
}

static inline void delay_short(void) {
    for (volatile int i = 0; i < 10; i++);
}

static inline void delay_long(void) {
    for (volatile int i = 0; i < 20; i++);
}

void send_bit(int bit) {
    if (bit) {
        gpio_high();
        delay_long();
        gpio_low();
        delay_short();
    } else {
        gpio_high();
        delay_short();
        gpio_low();
        delay_long();
    }
}

void send_byte(unsigned char byte) {
    for (int i = 7; i >= 0; i--) {
        send_bit((byte >> i) & 1);
    }
}

void send_color(unsigned char r, unsigned char g, unsigned char b) {
    send_byte(g);
    send_byte(r);
    send_byte(b);
}

int main() {
    int fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (fd < 0) {
        perror("open");
        return 1;
    }

    void *map = mmap(NULL, GPIO_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO_BASE);
    if (map == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }

    gpio_out = (volatile unsigned int *)((char *)map + PORT_C_OUT);
    gpio_oe = (volatile unsigned int *)((char *)map + PORT_C_OE);

    *gpio_oe |= GPIO_BIT;

    printf("WS2812 C Test - GPIO16 Pin19\n");

    gpio_low();
    usleep(100);

    printf("Red\n");
    send_color(100, 0, 0);
    gpio_low();
    sleep(2);

    printf("Green\n");
    send_color(0, 100, 0);
    gpio_low();
    sleep(2);

    printf("Blue\n");
    send_color(0, 0, 100);
    gpio_low();
    sleep(2);

    printf("Off\n");
    send_color(0, 0, 0);
    gpio_low();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done\n");
    return 0;
}
