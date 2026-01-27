#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>
#include <signal.h>
#include <stdlib.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000

#define PORT_C 2
#define GPIO_OUT  (0x20 + PORT_C * 4)

#define GPIO16_BIT (1 << 0)

volatile uint32_t *out;
uint32_t out_high, out_low;
volatile int running = 1;

void sig_handler(int sig) {
    running = 0;
}

void setup_gpio_sysfs(void) {
    FILE *f;
    f = fopen("/sys/class/gpio/export", "w");
    if (f) { fprintf(f, "16"); fclose(f); }
    usleep(100000);
    f = fopen("/sys/class/gpio/gpio16/direction", "w");
    if (f) { fprintf(f, "out"); fclose(f); }
    usleep(10000);
}

int main(int argc, char *argv[]) {
    int t0h = 50, t0l = 150, t1h = 120, t1l = 60;

    if (argc >= 5) {
        t0h = atoi(argv[1]);
        t0l = atoi(argv[2]);
        t1h = atoi(argv[3]);
        t1l = atoi(argv[4]);
    }

    signal(SIGINT, sig_handler);

    struct sched_param sp;
    sp.sched_priority = sched_get_priority_max(SCHED_FIFO);
    sched_setscheduler(0, SCHED_FIFO, &sp);

    printf("Setting up GPIO16 via sysfs...\n");
    setup_gpio_sysfs();

    int fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (fd < 0) {
        perror("open /dev/mem");
        return 1;
    }

    void *map = mmap(NULL, GPIO_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO_BASE);
    if (map == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }

    out = (volatile uint32_t *)((char *)map + GPIO_OUT);

    uint32_t current = *out;
    out_high = current | GPIO16_BIT;
    out_low = current & ~GPIO16_BIT;

    printf("WS2812 Scope Test (with sysfs setup)\n");
    printf("Timing: T0H=%d, T0L=%d, T1H=%d, T1L=%d\n", t0h, t0l, t1h, t1l);
    printf("Sending 0xAA pattern. Press Ctrl+C to stop\n");

    while (running) {
        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l; i++) asm volatile("nop");

        // Bit 1
        *out = out_high;
        for (volatile int i = 0; i < t1h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t1l; i++) asm volatile("nop");

        // Bit 0
        *out = out_high;
        for (volatile int i = 0; i < t0h; i++) asm volatile("nop");
        *out = out_low;
        for (volatile int i = 0; i < t0l; i++) asm volatile("nop");

        usleep(10);
    }

    *out = out_low;
    munmap(map, GPIO_SIZE);
    close(fd);

    printf("\nStopped.\n");
    return 0;
}
