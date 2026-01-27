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

void setup_gpio_sysfs(void) {
    FILE *f;
    f = fopen("/sys/class/gpio/export", "w");
    if (f) { fprintf(f, "16"); fclose(f); }
    usleep(100000);
    f = fopen("/sys/class/gpio/gpio16/direction", "w");
    if (f) { fprintf(f, "out"); fclose(f); }
    usleep(10000);
}

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

static inline void delay_ns(uint64_t ns, uint64_t freq) {
    uint64_t cycles = (ns * freq) / 1000000000ULL;
    uint64_t start = get_cycles();
    while ((get_cycles() - start) < cycles);
}

void send_byte(uint8_t byte, uint64_t freq) {
    for (int i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
            *out = out_high;
            delay_ns(700, freq);
            *out = out_low;
            delay_ns(600, freq);
        } else {
            *out = out_high;
            delay_ns(350, freq);
            *out = out_low;
            delay_ns(800, freq);
        }
    }
}

// Try RGB order
void send_rgb(uint8_t r, uint8_t g, uint8_t b, uint64_t freq) {
    send_byte(r, freq);
    send_byte(g, freq);
    send_byte(b, freq);
}

// Try BRG order
void send_brg(uint8_t r, uint8_t g, uint8_t b, uint64_t freq) {
    send_byte(b, freq);
    send_byte(r, freq);
    send_byte(g, freq);
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

    uint64_t freq = get_freq();
    printf("ARM timer frequency: %llu Hz\n", (unsigned long long)freq);

    printf("=== WS2812 Color Order Test ===\n\n");

    // Test 1: RGB order - RED
    reset_led();
    printf("Test RGB order: sending RED (R=150,G=0,B=0)\n");
    send_rgb(150, 0, 0, freq);
    reset_led();
    sleep(3);

    // Test 2: BRG order - RED
    reset_led();
    printf("Test BRG order: sending RED (R=150,G=0,B=0)\n");
    send_brg(150, 0, 0, freq);
    reset_led();
    sleep(3);

    reset_led();
    printf("OFF\n");
    send_rgb(0, 0, 0, freq);
    reset_led();

    munmap(map, GPIO_SIZE);
    close(fd);

    printf("Done!\n");
    return 0;
}
