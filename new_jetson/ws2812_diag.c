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

    printf("=== WS2812 Color Diagnostic ===\n");
    printf("Testing each byte position separately\n\n");

    // Test 1: First byte only = 150
    reset_led();
    printf("Test 1: Byte1=150, Byte2=0, Byte3=0\n");
    printf("        What color do you see?\n");
    send_byte(150);
    send_byte(0);
    send_byte(0);
    reset_led();
    sleep(5);

    // Test 2: Second byte only = 150
    reset_led();
    printf("Test 2: Byte1=0, Byte2=150, Byte3=0\n");
    printf("        What color do you see?\n");
    send_byte(0);
    send_byte(150);
    send_byte(0);
    reset_led();
    sleep(5);

    // Test 3: Third byte only = 150
    reset_led();
    printf("Test 3: Byte1=0, Byte2=0, Byte3=150\n");
    printf("        What color do you see?\n");
    send_byte(0);
    send_byte(0);
    send_byte(150);
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

    printf("\nPlease tell me:\n");
    printf("- Test 1 color = ?\n");
    printf("- Test 2 color = ?\n");
    printf("- Test 3 color = ?\n");

    return 0;
}
