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

#define LED_RED    25
#define LED_YELLOW 26
#define LED_BLUE   27
#define BUZZER     14
#define MELODY     33

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

    // LEDs off (active HIGH → set LOW)
    gpio_config_t led_conf = {
        .pin_bit_mask = (1ULL << LED_RED) | (1ULL << LED_YELLOW) | (1ULL << LED_BLUE),
        .mode = GPIO_MODE_OUTPUT,
    };
    gpio_config(&led_conf);
    gpio_set_level(LED_RED, 0);
    gpio_set_level(LED_YELLOW, 0);
    gpio_set_level(LED_BLUE, 0);

    // Buzzer off (active LOW → set HIGH)
    gpio_config_t buz_conf = {
        .pin_bit_mask = (1ULL << BUZZER),
        .mode = GPIO_MODE_OUTPUT,
    };
    gpio_config(&buz_conf);
    gpio_set_level(BUZZER, 1);

    // Melody buzzer off
    gpio_config_t mel_conf = {
        .pin_bit_mask = (1ULL << MELODY),
        .mode = GPIO_MODE_OUTPUT,
    };
    gpio_config(&mel_conf);
    gpio_set_level(MELODY, 0);

    // OLED off
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
    ssd1306_flush(I2C_NUM_0);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}