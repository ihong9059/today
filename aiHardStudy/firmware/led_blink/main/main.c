#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define RED_LED 25
#define BEEP 14

void app_main(void)
{
    gpio_reset_pin(RED_LED);
    gpio_set_direction(RED_LED, GPIO_MODE_OUTPUT);  // 빨간 LED 출력 설정

    gpio_reset_pin(BEEP);
    gpio_set_direction(BEEP, GPIO_MODE_OUTPUT);
    gpio_set_level(BEEP, 1);  // 부저 끄기

    while (1) {
        gpio_set_level(RED_LED, 1);  // 빨간 LED 켜기
        vTaskDelay(200 / portTICK_PERIOD_MS);  // 0.2초 대기
        gpio_set_level(RED_LED, 0);  // 빨간 LED 끄기
        vTaskDelay(200 / portTICK_PERIOD_MS);  // 0.2초 대기
    }
}