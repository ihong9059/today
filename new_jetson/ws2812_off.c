#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdint.h>
#include <sched.h>
#include <stdlib.h>

// Use sysfs value file for direct control
int fd_value;

#define T0H_NOPS 50
#define T0L_NOPS 150
#define T1H_NOPS 120
#define T1L_NOPS 60

void gpio_high(void) {
    write(fd_value, "1", 1);
    lseek(fd_value, 0, SEEK_SET);
}

void gpio_low(void) {
    write(fd_value, "0", 1);
    lseek(fd_value, 0, SEEK_SET);
}

void send_byte(uint8_t byte) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            gpio_high();
            for (volatile int j = 0; j < T1H_NOPS; j++) asm volatile("nop");
            gpio_low();
            for (volatile int j = 0; j < T1L_NOPS; j++) asm volatile("nop");
        } else {
            gpio_high();
            for (volatile int j = 0; j < T0H_NOPS; j++) asm volatile("nop");
            gpio_low();
            for (volatile int j = 0; j < T0L_NOPS; j++) asm volatile("nop");
        }
    }
}

void send_grb(uint8_t r, uint8_t g, uint8_t b) {
    send_byte(g);
    send_byte(r);
    send_byte(b);
}

int main() {
    struct sched_param sp;
    sp.sched_priority = sched_get_priority_max(SCHED_FIFO);
    sched_setscheduler(0, SCHED_FIFO, &sp);

    // Export and configure GPIO16
    FILE *f = fopen("/sys/class/gpio/export", "w");
    if (f) { fprintf(f, "16"); fclose(f); }
    usleep(100000);

    f = fopen("/sys/class/gpio/gpio16/direction", "w");
    if (f) { fprintf(f, "out"); fclose(f); }
    usleep(10000);

    fd_value = open("/sys/class/gpio/gpio16/value", O_WRONLY);
    if (fd_value < 0) {
        perror("open value");
        return 1;
    }

    printf("Sending all zeros (LED OFF)...\n");

    gpio_low();
    usleep(100);

    // Send 24 bits of 0
    send_grb(0, 0, 0);

    gpio_low();
    usleep(100);

    close(fd_value);

    printf("Done. LED should be OFF.\n");
    return 0;
}
