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

// WS2812 timing adjusted - shorter T0H
// T0H should be ~350ns, T0L ~800ns
// T1H should be ~700ns, T1L ~600ns
void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            // Send 1: longer high (~700ns), shorter low
            gpio_high();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;");
        } else {
            // Send 0: very short high (~300ns), longer low
            gpio_high();
            asm volatile("nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;");
        }
    }
}

void reset_led(void) {
    gpio_low();
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

    printf("=== WS2812 v6 - Adjusted Timing ===\n\n");

    // Test with GRB order (standard WS2812)
    // To show RED: G=0, R=value, B=0

    reset_led();
    printf("Test: Pure RED (GRB: G=0, R=100, B=0)\n");
    send_byte(0);    // G
    send_byte(100);  // R
    send_byte(0);    // B
    reset_led();
    sleep(5);

    reset_led();
    printf("Test: Pure GREEN (GRB: G=100, R=0, B=0)\n");
    send_byte(100);  // G
    send_byte(0);    // R
    send_byte(0);    // B
    reset_led();
    sleep(5);

    reset_led();
    printf("Test: Pure BLUE (GRB: G=0, R=0, B=100)\n");
    send_byte(0);    // G
    send_byte(0);    // R
    send_byte(100);  // B
    reset_led();
    sleep(5);

    // Off
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
