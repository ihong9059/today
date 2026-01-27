#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>
#include <stdlib.h>
#include <string.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000

#define PORT_C 2
#define GPIO_OUT  (0x20 + PORT_C * 4)

#define GPIO16_BIT (1 << 0)

#define T0H_NOPS 50
#define T0L_NOPS 150
#define T1H_NOPS 120
#define T1L_NOPS 60

volatile uint32_t *out;
uint32_t out_high, out_low;

// Setup GPIO via sysfs first
void setup_gpio_sysfs(void) {
    FILE *f;

    // Export GPIO16
    f = fopen("/sys/class/gpio/export", "w");
    if (f) {
        fprintf(f, "16");
        fclose(f);
    }
    usleep(100000);  // Wait for export

    // Set direction to output
    f = fopen("/sys/class/gpio/gpio16/direction", "w");
    if (f) {
        fprintf(f, "out");
        fclose(f);
    }
    usleep(10000);
}

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            *out = out_high;
            for (volatile int j = 0; j < T1H_NOPS; j++) asm volatile("nop");
            *out = out_low;
            for (volatile int j = 0; j < T1L_NOPS; j++) asm volatile("nop");
        } else {
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

    // Setup via sysfs first
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

    // Read current state
    uint32_t current = *out;
    printf("Current OUT register: 0x%08x\n", current);

    out_high = current | GPIO16_BIT;
    out_low = current & ~GPIO16_BIT;

    printf("out_high = 0x%08x, out_low = 0x%08x\n", out_high, out_low);

    // Quick toggle test
    printf("Toggle test...\n");
    for (int i = 0; i < 5; i++) {
        *out = out_high;
        printf("HIGH (0x%08x)\n", *out);
        usleep(500000);
        *out = out_low;
        printf("LOW (0x%08x)\n", *out);
        usleep(500000);
    }

    printf("\nNow LED test...\n");

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
