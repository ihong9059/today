#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

#define GPIO_BASE 0x6000d000
#define GPIO_SIZE 0x1000
#define PORT_C_OUT 0x104
#define PORT_C_OE  0x114
#define GPIO_BIT   (1 << 0)

int main() {
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

    volatile unsigned int *gpio_out = (volatile unsigned int *)((char *)map + PORT_C_OUT);
    volatile unsigned int *gpio_oe = (volatile unsigned int *)((char *)map + PORT_C_OE);

    *gpio_oe |= GPIO_BIT;

    printf("GPIO16 Blink Test - Pin 19\n");

    for (int i = 0; i < 10; i++) {
        *gpio_out |= GPIO_BIT;
        printf("HIGH\n");
        usleep(500000);

        *gpio_out &= ~GPIO_BIT;
        printf("LOW\n");
        usleep(500000);
    }

    munmap(map, GPIO_SIZE);
    close(fd);
    printf("Done\n");
    return 0;
}
