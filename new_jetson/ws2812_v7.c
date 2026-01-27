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

// Minimal delay - just the write itself
static inline __attribute__((always_inline)) void send_bit_1(void) {
    *out = out_high;
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
    *out = out_low;
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
}

static inline __attribute__((always_inline)) void send_bit_0(void) {
    *out = out_high;
    // Minimal high time - just the write
    *out = out_low;
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
    asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
}

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            send_bit_1();
        } else {
            send_bit_0();
        }
    }
}

void reset_led(void) {
    *out = out_low;
    usleep(100);
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

    out_high = *out | GPIO16_BIT;
    out_low = *out & ~GPIO16_BIT;

    printf("=== WS2812 v7 - Minimal T0H ===\n\n");

    // GRB order test
    reset_led();
    printf("RED (GRB: 0, 100, 0)\n");
    send_byte(0);
    send_byte(100);
    send_byte(0);
    reset_led();
    sleep(4);

    reset_led();
    printf("GREEN (GRB: 100, 0, 0)\n");
    send_byte(100);
    send_byte(0);
    send_byte(0);
    reset_led();
    sleep(4);

    reset_led();
    printf("BLUE (GRB: 0, 0, 100)\n");
    send_byte(0);
    send_byte(0);
    send_byte(100);
    reset_led();
    sleep(4);

    reset_led();
    printf("Off\n");
    send_byte(0);
    send_byte(0);
    send_byte(0);
    reset_led();

    munmap(map, GPIO_SIZE);
    close(fd);

    return 0;
}
