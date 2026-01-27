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

volatile uint32_t *out;
uint32_t out_high, out_low;
volatile int running = 1;

void sig_handler(int sig) {
    running = 0;
}

int main(int argc, char *argv[]) {
    int t0h_nops = 1;  // T0H nop count
    int t0l_nops = 30; // T0L nop count
    int t1h_nops = 20; // T1H nop count
    int t1l_nops = 10; // T1L nop count

    if (argc >= 5) {
        t0h_nops = atoi(argv[1]);
        t0l_nops = atoi(argv[2]);
        t1h_nops = atoi(argv[3]);
        t1l_nops = atoi(argv[4]);
    }

    printf("WS2812 Oscilloscope Test\n");
    printf("Timing: T0H=%d, T0L=%d, T1H=%d, T1L=%d nops\n", t0h_nops, t0l_nops, t1h_nops, t1l_nops);
    printf("Sending 0xAA (10101010) pattern continuously...\n");
    printf("Press Ctrl+C to stop\n\n");

    signal(SIGINT, sig_handler);

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

    // Send 0xAA pattern (10101010) continuously
    // This gives alternating 1 and 0 bits for easy scope measurement
    while (running) {
        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l_nops; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l_nops; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l_nops; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l_nops; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l_nops; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l_nops; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l_nops; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h_nops; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l_nops; i++) asm volatile("nop");

        // Small gap between bytes
        usleep(10);
    }

    *out = out_low;
    munmap(map, GPIO_SIZE);
    close(fd);

    printf("\nStopped.\n");
    return 0;
}
