#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000
#define PORT_C 2
#define GPIO_OUT  (0x20 + PORT_C * 4)
#define GPIO16_BIT (1 << 0)

volatile uint32_t *out;
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
            *out = out_high;
            delay_ns(700);
            *out = out_low;
            delay_ns(600);
        } else {
            *out = out_high;
            delay_ns(350);
            *out = out_low;
            delay_ns(800);
        }
    }
}

// BRG order: Byte1=Blue, Byte2=Red, Byte3=Green
void send_brg(uint8_t r, uint8_t g, uint8_t b) {
    send_byte(b);
    send_byte(r);
    send_byte(g);
}

void reset_led(void) {
    *out = out_low;
    usleep(100);
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

    out = (volatile uint32_t *)((char *)map + GPIO_OUT);
    out_high = *out | GPIO16_BIT;
    out_low = *out & ~GPIO16_BIT;
    freq = get_freq();

    printf("=== RED only (5 seconds) ===\n");
    reset_led();
    send_brg(150, 0, 0);  // RED
    reset_led();
    sleep(5);

    printf("=== OFF ===\n");
    reset_led();
    send_brg(0, 0, 0);
    reset_led();

    munmap(map, GPIO_SIZE);
    close(fd);
    return 0;
}
