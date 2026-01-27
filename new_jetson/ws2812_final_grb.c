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

volatile uint32_t *gpio_out;
uint32_t out_high, out_low;
uint64_t freq;

static inline uint64_t get_cycles(void) {
    uint64_t val;
    asm volatile("mrs %0, cntvct_el0" : "=r" (val));
    return val;
}

static inline uint64_t get_freq(void) {
    uint64_t val;
    asm volatile("mrs %0, cntfrq_el0" : "=r" (val));
    return val;
}

static inline void delay_ns(uint64_t ns) {
    uint64_t cycles = (ns * freq) / 1000000000ULL;
    uint64_t start = get_cycles();
    while ((get_cycles() - start) < cycles);
}

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            *gpio_out = out_high;
            delay_ns(700);
            *gpio_out = out_low;
            delay_ns(600);
        } else {
            *gpio_out = out_high;
            delay_ns(350);
            *gpio_out = out_low;
            delay_ns(800);
        }
    }
}

// GRB order (WS2812 standard)
void ws2812_set_color(uint8_t r, uint8_t g, uint8_t b) {
    *gpio_out = out_low;
    usleep(80);  // Reset
    send_byte(g);
    send_byte(r);
    send_byte(b);
    *gpio_out = out_low;
    usleep(80);
}

int main() {
    struct sched_param sp;
    sp.sched_priority = sched_get_priority_max(SCHED_FIFO);
    sched_setscheduler(0, SCHED_FIFO, &sp);
    mlockall(MCL_CURRENT | MCL_FUTURE);

    int fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (fd < 0) { perror("open"); return 1; }

    void *map = mmap(NULL, GPIO_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO_BASE);
    if (map == MAP_FAILED) { perror("mmap"); close(fd); return 1; }

    volatile uint32_t *gpio_cnf = (volatile uint32_t *)((char *)map + GPIO_CNF);
    volatile uint32_t *gpio_oe = (volatile uint32_t *)((char *)map + GPIO_OE);
    gpio_out = (volatile uint32_t *)((char *)map + GPIO_OUT);

    *gpio_cnf |= GPIO16_BIT;
    *gpio_oe |= GPIO16_BIT;
    out_high = *gpio_out | GPIO16_BIT;
    out_low = *gpio_out & ~GPIO16_BIT;
    freq = get_freq();

    printf("=== WS2812 Final Test (GRB order) ===\n\n");

    printf("RED\n");
    ws2812_set_color(100, 0, 0);
    sleep(3);

    printf("GREEN\n");
    ws2812_set_color(0, 100, 0);
    sleep(3);

    printf("BLUE\n");
    ws2812_set_color(0, 0, 100);
    sleep(3);

    printf("WHITE\n");
    ws2812_set_color(50, 50, 50);
    sleep(3);

    printf("OFF\n");
    ws2812_set_color(0, 0, 0);

    munmap(map, GPIO_SIZE);
    close(fd);
    printf("Done!\n");
    return 0;
}
