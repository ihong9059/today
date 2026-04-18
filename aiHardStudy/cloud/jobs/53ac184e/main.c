#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "driver/i2c.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_ota_ops.h"
#include "ssd1306.h"
#include "ble_ota.h"

#define LED_RED    GPIO_NUM_25
#define LED_YELLOW GPIO_NUM_26
#define LED_BLUE   GPIO_NUM_27

static const char *TAG = "LED_BLINK";

static void led_blink_task(void *pvParameters)
{
    gpio_reset_pin(LED_RED);
    gpio_reset_pin(LED_YELLOW);
    gpio_reset_pin(LED_BLUE);
    gpio_set_direction(LED_RED, GPIO_MODE_OUTPUT);
    gpio_set_direction(LED_YELLOW, GPIO_MODE_OUTPUT);
    gpio_set_direction(LED_BLUE, GPIO_MODE_OUTPUT);

    while (1) {
        gpio_set_level(LED_RED, 1);
        gpio_set_level(LED_YELLOW, 1);
        gpio_set_level(LED_BLUE, 1);
        ESP_LOGI(TAG, "LEDs ON");
        vTaskDelay(500 / portTICK_PERIOD_MS);

        gpio_set_level(LED_RED, 0);
        gpio_set_level(LED_YELLOW, 0);
        gpio_set_level(LED_BLUE, 0);
        ESP_LOGI(TAG, "LEDs OFF");
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}

void app_main(void)
{
    nvs_flash_init();

    const esp_partition_t *running = esp_ota_get_running_partition();
    esp_ota_img_states_t ota_state;
    if (esp_ota_get_state_partition(running, &ota_state) == ESP_OK) {
        if (ota_state == ESP_OTA_IMG_PENDING_VERIFY) {
            vTaskDelay(3000 / portTICK_PERIOD_MS);
            esp_ota_mark_app_valid_cancel_rollback();
        }
    }

    xTaskCreate(led_blink_task, "led_blink_task", 2048, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}