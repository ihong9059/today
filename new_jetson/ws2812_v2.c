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

static inline void gpio_high(void) {
    *out |= GPIO16_BIT;
}

static inline void gpio_low(void) {
    *out &= ~GPIO16_BIT;
}

// Busy-wait delay (tune these values)
static inline void delay_t0h(void) {
    for (volatile int i = 0; i < 3; i++);
}

static inline void delay_t0l(void) {
    for (volatile int i = 0; i < 6; i++);
}

static inline void delay_t1h(void) {
    for (volatile int i = 0; i < 6; i++);
}

static inline void delay_t1l(void) {
    for (volatile int i = 0; i < 3; i++);
}

void send_bit(int bit) {
    if (bit) {
        gpio_high();
        delay_t1h();
        gpio_low();
        delay_t1l();
    } else {
        gpio_high();
        delay_t0h();
        gpio_low();
        delay_t0l();
    }
}

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        send_bit((byte >> i) & 1);
    }
}

void send_color(uint8_t r, uint8_t g, uint8_t b) {
    send_byte(g);
    send_byte(r);
    send_byte(b);
}

int main() {
    // Set real-time priority for better timing
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

    printf("WS2812 Test v2 - GPIO16 (Pin 19)\n");

    // Reset
    gpio_low();
    usleep(100);

    printf("Red...\n");
    send_color(100, 0, 0);
    gpio_low();
    usleep(100);
    sleep(2);

    printf("Green...\n");
    send_color(0, 100, 0);
    gpio_low();
    usleep(100);
    sleep(2);

    printf("Blue...\n");
    send_color(0, 0, 100);
    gpio_low();
    usleep(100);
    sleep(2);

    printf("Off...\n");
    send_color(0, 0, 0);
    gpio_low();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done\n");
    return 0;
}
