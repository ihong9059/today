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

#define AHT20_ADDR 0x38
#define I2C_PORT I2C_NUM_0

static const char *TAG = "TEMP";

static void aht20_init(void)
{
    uint8_t cmd[] = {0xBE, 0x08, 0x00};
    i2c_cmd_handle_t handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write(handle, cmd, sizeof(cmd), true);
    i2c_master_stop(handle);
    i2c_master_cmd_begin(I2C_PORT, handle, 1000 / portTICK_PERIOD_MS);
    i2c_cmd_link_delete(handle);
    vTaskDelay(40 / portTICK_PERIOD_MS);
}

static esp_err_t aht20_read(float *temperature, float *humidity)
{
    uint8_t trigger[] = {0xAC, 0x33, 0x00};
    i2c_cmd_handle_t handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write(handle, trigger, sizeof(trigger), true);
    i2c_master_stop(handle);
    esp_err_t ret = i2c_master_cmd_begin(I2C_PORT, handle, 1000 / portTICK_PERIOD_MS);
    i2c_cmd_link_delete(handle);
    if (ret != ESP_OK) return ret;

    vTaskDelay(80 / portTICK_PERIOD_MS);

    uint8_t data[7];
    handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_READ, true);
    i2c_master_read(handle, data, sizeof(data), I2C_MASTER_LAST_NACK);
    i2c_master_stop(handle);
    ret = i2c_master_cmd_begin(I2C_PORT, handle, 1000 / portTICK_PERIOD_MS);
    i2c_cmd_link_delete(handle);
    if (ret != ESP_OK) return ret;

    uint32_t raw_hum = ((uint32_t)(data[1]) << 12) | ((uint32_t)(data[2]) << 4) | ((data[3] >> 4) & 0x0F);
    uint32_t raw_temp = (((uint32_t)(data[3] & 0x0F)) << 16) | ((uint32_t)(data[4]) << 8) | data[5];

    *humidity = (float)raw_hum / 1048576.0f * 100.0f;
    *temperature = (float)raw_temp / 1048576.0f * 200.0f - 50.0f;

    return ESP_OK;
}

static void temp_task(void *arg)
{
    aht20_init();
    ssd1306_init(I2C_PORT);

    float temp = 0, hum = 0;
    char buf[32];

    while (1) {
        if (aht20_read(&temp, &hum) == ESP_OK) {
            ESP_LOGI(TAG, "Temp=%.1fC Hum=%.1f%%", temp, hum);

            ssd1306_clear();
            ssd1306_draw_string(0, 0, "=== Temp Sensor ===");

            snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
            ssd1306_draw_string(0, 20, buf);

            snprintf(buf, sizeof(buf), "Humi: %.1f %%", hum);
            ssd1306_draw_string(0, 40, buf);

            ssd1306_flush(I2C_PORT);
        } else {
            ESP_LOGE(TAG, "AHT20 read failed");
        }

        vTaskDelay(2000 / portTICK_PERIOD_MS);
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
    i2c_param_config(I2C_PORT, &conf);
    i2c_driver_install(I2C_PORT, I2C_MODE_MASTER, 0, 0, 0);

    xTaskCreate(temp_task, "temp_task", 4096, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}