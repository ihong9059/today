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

#define SDA_PIN 21
#define SCL_PIN 22
#define I2C_ADDR 0x3C

#define PAGE_COUNT 8
#define PAGE_DISPLAY_MS 3000

static const char *pages[PAGE_COUNT][4] = {
    { "=== PRODUCT ===",
      " ESP32 DevKitC",
      " IoT Platform",
      " v1.0" },

    { "[LED Control]",
      " RED   : GPIO25",
      " YELLOW: GPIO26",
      " BLUE  : GPIO27" },

    { "[Buzzer]",
      " Alert : GPIO14",
      " Melody: GPIO33",
      " PWM support" },

    { "[Display]",
      " OLED SSD1306",
      " 128x64 I2C",
      " Addr: 0x3C" },

    { "[Sensor]",
      " AHT20 Temp/Hum",
      " I2C Addr:0x38",
      " Auto measure" },

    { "[Switch]",
      " GPIO32 Input",
      " Active LOW",
      " Internal PullUp" },

    { "[Wireless]",
      " BLE OTA Update",
      " Firmware upload",
      " via Smartphone" },

    { "[Support]",
      " BLE: ota_update",
      " FW update ready",
      " === END ===" },
};

static void oled_manual_task(void *arg)
{
    int page = 0;

    while (1) {
        ssd1306_clear();
        ssd1306_draw_string(0,  0, pages[page][0]);
        ssd1306_draw_string(0, 16, pages[page][1]);
        ssd1306_draw_string(0, 32, pages[page][2]);
        ssd1306_draw_string(0, 48, pages[page][3]);
        ssd1306_flush(I2C_NUM_0);

        vTaskDelay(PAGE_DISPLAY_MS / portTICK_PERIOD_MS);

        page++;
        if (page >= PAGE_COUNT) {
            page = 0;
        }
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
        .sda_io_num = SDA_PIN,
        .scl_io_num = SCL_PIN,
        .sda_pullup_en = GPIO_PULLUP_DISABLE,
        .scl_pullup_en = GPIO_PULLUP_DISABLE,
        .master.clk_speed = 100000,
    };
    i2c_param_config(I2C_NUM_0, &conf);
    i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);

    ssd1306_init(I2C_NUM_0);

    xTaskCreate(oled_manual_task, "oled_manual", 4096, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}