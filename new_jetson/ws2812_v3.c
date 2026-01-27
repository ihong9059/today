#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000

#define PORT_C 2
#define GPIO_CNF  (0x00 + PORT_C * 4)
#define GPIO_OE   (0x10 + PORT_C * 4)
#define GPIO_OUT  (0x20 + PORT_C * 4)

#define GPIO16_BIT (1 << 0)

volatile uint32_t *out;
uint32_t out_high, out_low;

static inline void gpio_high(void) {
    *out = out_high;
}

static inline void gpio_low(void) {
    *out = out_low;
}

// WS2812 timing (adjusted)
// T0H: ~350ns (shorter)
// T0L: ~900ns (longer)
// T1H: ~700ns (longer)
// T1L: ~600ns (shorter)

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            // Send 1: long high, short low
            gpio_high();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
        } else {
            // Send 0: short high, long low
            gpio_high();
            asm volatile("nop;nop;nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
        }
    }
}

void send_color(uint8_t r, uint8_t g, uint8_t b) {
    send_byte(g);
    send_byte(r);
    send_byte(b);
}

int main() {
    struct sched_param sp;
    sp.sched_priority = sched_get_priority_max(SCHED_FIFO);
    sched_setscheduler(0, SCHED_FIFO, &sp);

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

    volatile uint32_t *cnf = (volatile uint32_t *)((char *)map + GPIO_CNF);
    volatile uint32_t *oe = (volatile uint32_t *)((char *)map + GPIO_OE);
    out = (volatile uint32_t *)((char *)map + GPIO_OUT);

    *cnf |= GPIO16_BIT;
    *oe |= GPIO16_BIT;

    // Pre-calculate output values
    out_high = *out | GPIO16_BIT;
    out_low = *out & ~GPIO16_BIT;

    printf("WS2812 Test v3\n");

    gpio_low();
    usleep(100);

    printf("Red...\n");
    send_color(80, 0, 0);
    gpio_low();
    sleep(2);

    printf("Green...\n");
    send_color(0, 80, 0);
    gpio_low();
    sleep(2);

    printf("Blue...\n");
    send_color(0, 0, 80);
    gpio_low();
    sleep(2);

    printf("Off...\n");
    send_color(0, 0, 0);
    gpio_low();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done\n");
    return 0;
}
