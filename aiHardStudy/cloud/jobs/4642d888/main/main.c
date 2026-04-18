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

static const gpio_num_t leds[] = {LED_RED, LED_YELLOW, LED_BLUE};
static const int NUM_LEDS = 3;

static void led_task(void *arg)
{
    for (int i = 0; i < NUM_LEDS; i++) {
        gpio_reset_pin(leds[i]);
        gpio_set_direction(leds[i], GPIO_MODE_OUTPUT);
        gpio_set_level(leds[i], 0);
    }

    int idx = 0;
    while (1) {
        gpio_set_level(leds[idx], 1);
        vTaskDelay(200 / portTICK_PERIOD_MS);
        gpio_set_level(leds[idx], 0);
        idx = (idx + 1) % NUM_LEDS;
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

    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = 21,
        .scl_io_num = 22,
        .sda_pullup_en = GPIO_PULLUP_DISABLE,
        .scl_pullup_en = GPIO_PULLUP_DISABLE,
        .master.clk_speed = 100000,
    };
    i2c_param_config(I2C_NUM_0, &conf);
    i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);

    ssd1306_init(I2C_NUM_0);
    ssd1306_clear();
    ssd1306_draw_string(0, 22, "Hello Vibe!");
    ssd1306_draw_string(0, 36, "ESP32 OTA OK");
    ssd1306_flush(I2C_NUM_0);

    xTaskCreate(led_task, "led_task", 2048, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}