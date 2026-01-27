#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>
#include <signal.h>

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
volatile int running = 1;

void sig_handler(int sig) { running = 0; }

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
    signal(SIGINT, sig_handler);

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

    *gpio_cnf |= GPIO16_BIT;
    *gpio_oe |= GPIO16_BIT;

    out_high = *gpio_out | GPIO16_BIT;
    out_low = *gpio_out & ~GPIO16_BIT;
    freq = get_freq();

    printf("Sending 0xAA (10101010) continuously...\n");
    printf("Check timing on oscilloscope. Ctrl+C to stop.\n");

    while (running) {
        *gpio_out = out_low;
        usleep(50);
        send_byte(0xAA);  // 10101010 pattern
        send_byte(0xAA);
        send_byte(0xAA);
    }

    *gpio_out = out_low;
    printf("\nStopped.\n");
    munmap(map, GPIO_SIZE);
    close(fd);
    return 0;
}
