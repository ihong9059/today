#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "driver/i2c.h"
#include "driver/ledc.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_ota_ops.h"
#include "ssd1306.h"
#include "ble_ota.h"

#define MELODY_PIN GPIO_NUM_33

static const char *TAG = "MELODY";

typedef struct {
    uint32_t freq;
    uint32_t duration_ms;
} note_t;

static const note_t melody[] = {
    {262, 400}, {262, 400}, {392, 400}, {392, 400},
    {440, 400}, {440, 400}, {392, 800},
    {349, 400}, {349, 400}, {330, 400}, {330, 400},
    {294, 400}, {294, 400}, {262, 800},
    {392, 400}, {392, 400}, {349, 400}, {349, 400},
    {330, 400}, {330, 400}, {294, 800},
    {392, 400}, {392, 400}, {349, 400}, {349, 400},
    {330, 400}, {330, 400}, {294, 800},
    {262, 400}, {262, 400}, {392, 400}, {392, 400},
    {440, 400}, {440, 400}, {392, 800},
    {349, 400}, {349, 400}, {330, 400}, {330, 400},
    {294, 400}, {294, 400}, {262, 800},
};

static void play_tone(uint32_t freq, uint32_t duration_ms)
{
    if (freq == 0) {
        ledc_stop(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0, 0);
        vTaskDelay(duration_ms / portTICK_PERIOD_MS);
        return;
    }

    ledc_timer_config_t timer_conf = {
        .speed_mode = LEDC_LOW_SPEED_MODE,
        .duty_resolution = LEDC_TIMER_10_BIT,
        .timer_num = LEDC_TIMER_0,
        .freq_hz = freq,
        .clk_cfg = LEDC_AUTO_CLK,
    };
    ledc_timer_config(&timer_conf);

    ledc_channel_config_t ch_conf = {
        .gpio_num = MELODY_PIN,
        .speed_mode = LEDC_LOW_SPEED_MODE,
        .channel = LEDC_CHANNEL_0,
        .timer_sel = LEDC_TIMER_0,
        .duty = 512,
        .hpoint = 0,
    };
    ledc_channel_config(&ch_conf);

    vTaskDelay(duration_ms / portTICK_PERIOD_MS);
    ledc_stop(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0, 0);
    vTaskDelay(50 / portTICK_PERIOD_MS);
}

static void melody_task(void *arg)
{
    int num_notes = sizeof(melody) / sizeof(melody[0]);
    for (int i = 0; i < num_notes; i++) {
        play_tone(melody[i].freq, melody[i].duration_ms);
    }
    ESP_LOGI(TAG, "Melody finished");
    vTaskDelete(NULL);
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
    ssd1306_draw_string(0, 0, "Twinkle Twinkle");
    ssd1306_draw_string(0, 16, "Little Star");
    ssd1306_flush(I2C_NUM_0);

    xTaskCreate(melody_task, "melody", 4096, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}