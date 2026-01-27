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

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            gpio_high();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
        } else {
            gpio_high();
            asm volatile("nop;nop;nop;nop;nop;");
            gpio_low();
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
            asm volatile("nop;nop;nop;nop;nop;nop;nop;nop;nop;nop;");
        }
    }
}

void reset_led(void) {
    gpio_low();
    usleep(80);
}

int main(int argc, char *argv[]) {
    int mode = 1; // Default: GRB (most common for WS2812)

    if (argc > 1) {
        mode = atoi(argv[1]);
    }

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

    reset_led();

    // Pure RED (255, 0, 0)
    uint8_t r = 150, g = 0, b = 0;

    printf("Pure RED test - Mode %d\n", mode);

    switch(mode) {
        case 0: // RGB
            printf("RGB order: sending bytes [R=%d, G=%d, B=%d]\n", r, g, b);
            send_byte(r);
            send_byte(g);
            send_byte(b);
            break;
        case 1: // GRB (WS2812 standard)
            printf("GRB order: sending bytes [G=%d, R=%d, B=%d]\n", g, r, b);
            send_byte(g);
            send_byte(r);
            send_byte(b);
            break;
        case 2: // BGR
            printf("BGR order: sending bytes [B=%d, G=%d, R=%d]\n", b, g, r);
            send_byte(b);
            send_byte(g);
            send_byte(r);
            break;
    }

    reset_led();

    printf("LED should be RED. Press Ctrl+C to exit, or wait 10s...\n");
    sleep(10);

    // Turn off
    reset_led();
    send_byte(0);
    send_byte(0);
    send_byte(0);
    reset_led();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done\n");
    return 0;
}
