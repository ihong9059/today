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

volatile uint32_t *gpio_cnf;
volatile uint32_t *gpio_oe;
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

int main() {
    struct sched_param sp;
    sp.sched_priority = sched_get_priority_max(SCHED_FIFO);
    sched_setscheduler(0, SCHED_FIFO, &sp);
    mlockall(MCL_CURRENT | MCL_FUTURE);

    int fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (fd < 0) { perror("open"); return 1; }

    void *map = mmap(NULL, GPIO_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO_BASE);
    if (map == MAP_FAILED) { perror("mmap"); close(fd); return 1; }

    gpio_cnf = (volatile uint32_t *)((char *)map + GPIO_CNF);
    gpio_oe = (volatile uint32_t *)((char *)map + GPIO_OE);
    gpio_out = (volatile uint32_t *)((char *)map + GPIO_OUT);

    // Configure GPIO16 as GPIO output
    *gpio_cnf |= GPIO16_BIT;  // GPIO mode
    *gpio_oe |= GPIO16_BIT;   // Output enable

    printf("CNF=0x%08x, OE=0x%08x, OUT=0x%08x\n", *gpio_cnf, *gpio_oe, *gpio_out);

    out_high = *gpio_out | GPIO16_BIT;
    out_low = *gpio_out & ~GPIO16_BIT;
    freq = get_freq();

    // Slow blink test
    printf("Blink test...\n");
    for (int i = 0; i < 5; i++) {
        *gpio_out = out_high;
        printf("HIGH\n");
        usleep(300000);
        *gpio_out = out_low;
        printf("LOW\n");
        usleep(300000);
    }

    // WS2812 test - GREEN
    printf("Sending GREEN...\n");
    *gpio_out = out_low;
    usleep(100);
    send_byte(0);
    send_byte(0);
    send_byte(150);
    *gpio_out = out_low;
    usleep(100);

    sleep(5);

    // OFF
    *gpio_out = out_low;
    usleep(100);
    send_byte(0);
    send_byte(0);
    send_byte(0);
    *gpio_out = out_low;

    printf("Done\n");
    munmap(map, GPIO_SIZE);
    close(fd);
    return 0;
}
