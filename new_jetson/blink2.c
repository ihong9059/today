#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>

// Tegra210 GPIO base
#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000

// Port C (GPIO16-23) - Port 2 in Bank 0
// Each bank has: CNF, OE, OUT, IN at offsets 0x00, 0x10, 0x20, 0x30
// Each port offset: port * 4
#define PORT_C 2
#define GPIO_CNF  (0x00 + PORT_C * 4)  // 0x08
#define GPIO_OE   (0x10 + PORT_C * 4)  // 0x18
#define GPIO_OUT  (0x20 + PORT_C * 4)  // 0x28
#define GPIO_IN   (0x30 + PORT_C * 4)  // 0x38

#define GPIO16_BIT (1 << 0)  // GPIO16 = Port C, bit 0

int main() {
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

    volatile uint32_t *cnf = (volatile uint32_t *)((char *)map + GPIO_CNF);
    volatile uint32_t *oe = (volatile uint32_t *)((char *)map + GPIO_OE);
    volatile uint32_t *out = (volatile uint32_t *)((char *)map + GPIO_OUT);

    printf("GPIO16 (Pin 19) Blink Test v2\n");
    printf("CNF=0x%08x, OE=0x%08x, OUT=0x%08x\n", *cnf, *oe, *out);

    // Configure as GPIO (CNF bit = 1)
    *cnf |= GPIO16_BIT;
    // Enable output
    *oe |= GPIO16_BIT;

    printf("After config: CNF=0x%08x, OE=0x%08x\n", *cnf, *oe);

    for (int i = 0; i < 10; i++) {
        *out |= GPIO16_BIT;
        printf("HIGH (OUT=0x%08x)\n", *out);
        usleep(500000);

        *out &= ~GPIO16_BIT;
        printf("LOW (OUT=0x%08x)\n", *out);
        usleep(500000);
    }

    munmap(map, GPIO_SIZE);
    close(fd);
    printf("Done\n");
    return 0;
}
