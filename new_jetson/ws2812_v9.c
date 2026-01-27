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

// Tuned values from oscilloscope (using for loop method)
#define T0H_NOPS 50
#define T0L_NOPS 150
#define T1H_NOPS 120
#define T1L_NOPS 60

volatile uint32_t *out;
uint32_t out_high, out_low;

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            // Bit 1
            *out = out_high;
            for (volatile int j = 0; j < T1H_NOPS; j++) asm volatile("nop");
            *out = out_low;
            for (volatile int j = 0; j < T1L_NOPS; j++) asm volatile("nop");
        } else {
            // Bit 0
            *out = out_high;
            for (volatile int j = 0; j < T0H_NOPS; j++) asm volatile("nop");
            *out = out_low;
            for (volatile int j = 0; j < T0L_NOPS; j++) asm volatile("nop");
        }
    }
}

void send_grb(uint8_t r, uint8_t g, uint8_t b) {
    send_byte(g);
    send_byte(r);
    send_byte(b);
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

    printf("=== WS2812 v9 (Same as scope test) ===\n\n");

    reset_led();
    printf("RED...\n");
    send_grb(150, 0, 0);
    reset_led();
    sleep(3);

    reset_led();
    printf("GREEN...\n");
    send_grb(0, 150, 0);
    reset_led();
    sleep(3);

    reset_led();
    printf("BLUE...\n");
    send_grb(0, 0, 150);
    reset_led();
    sleep(3);

    reset_led();
    printf("OFF\n");
    send_grb(0, 0, 0);
    reset_led();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done!\n");
    return 0;
}
