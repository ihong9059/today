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

static void i2c_init(void)
{
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
}

static esp_err_t aht20_init(void)
{
    uint8_t cmd[] = {0xBE, 0x08, 0x00};
    i2c_cmd_handle_t handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write(handle, cmd, sizeof(cmd), true);
    i2c_master_stop(handle);
    esp_err_t ret = i2c_master_cmd_begin(I2C_PORT, handle, pdMS_TO_TICKS(1000));
    i2c_cmd_link_delete(handle);
    vTaskDelay(pdMS_TO_TICKS(20));
    return ret;
}

static esp_err_t aht20_read(float *temperature, float *humidity)
{
    uint8_t trigger[] = {0xAC, 0x33, 0x00};
    i2c_cmd_handle_t handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write(handle, trigger, sizeof(trigger), true);
    i2c_master_stop(handle);
    esp_err_t ret = i2c_master_cmd_begin(I2C_PORT, handle, pdMS_TO_TICKS(1000));
    i2c_cmd_link_delete(handle);
    if (ret != ESP_OK) return ret;

    vTaskDelay(pdMS_TO_TICKS(80));

    uint8_t data[6] = {0};
    handle = i2c_cmd_link_create();
    i2c_master_start(handle);
    i2c_master_write_byte(handle, (AHT20_ADDR << 1) | I2C_MASTER_READ, true);
    i2c_master_read(handle, data, 6, I2C_MASTER_LAST_NACK);
    i2c_master_stop(handle);
    ret = i2c_master_cmd_begin(I2C_PORT, handle, pdMS_TO_TICKS(1000));
    i2c_cmd_link_delete(handle);
    if (ret != ESP_OK) return ret;

    if (data[0] & 0x80) {
        return ESP_ERR_NOT_FINISHED;
    }

    uint32_t raw_hum = ((uint32_t)data[1] << 12) | ((uint32_t)data[2] << 4) | (data[3] >> 4);
    uint32_t raw_temp = ((uint32_t)(data[3] & 0x0F) << 16) | ((uint32_t)data[4] << 8) | data[5];

    *humidity = (float)raw_hum / 1048576.0f * 100.0f;
    *temperature = (float)raw_temp / 1048576.0f * 200.0f - 50.0f;

    return ESP_OK;
}

static void temp_task(void *arg)
{
    float temp = 0, hum = 0;
    char line[32];

    aht20_init();
    vTaskDelay(pdMS_TO_TICKS(100));

    while (1) {
        esp_err_t ret = aht20_read(&temp, &hum);

        ssd1306_clear();
        ssd1306_draw_string(0, 0, "=== AHT20 ===");

        if (ret == ESP_OK) {
            snprintf(line, sizeof(line), "Temp: %.1f C", temp);
            ssd1306_draw_string(0, 16, line);

            snprintf(line, sizeof(line), "Humi: %.1f %%", hum);
            ssd1306_draw_string(0, 32, line);

            ESP_LOGI(TAG, "Temp=%.1fC Humi=%.1f%%", temp, hum);
        } else {
            ssd1306_draw_string(0, 16, "Read error!");
            ESP_LOGE(TAG, "AHT20 read fail: %d", ret);
        }

        ssd1306_flush(I2C_PORT);
        vTaskDelay(pdMS_TO_TICKS(2000));
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

    i2c_init();
    ssd1306_init(I2C_PORT);

    ssd1306_clear();
    ssd1306_draw_string(0, 0, "Starting...");
    ssd1306_flush(I2C_PORT);

    xTaskCreate(temp_task, "temp_task", 4096, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}