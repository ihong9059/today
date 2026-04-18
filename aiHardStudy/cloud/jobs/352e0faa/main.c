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

#define MELODY_PIN      GPIO_NUM_33
#define LEDC_CHANNEL    LEDC_CHANNEL_0
#define LEDC_TIMER      LEDC_TIMER_0

#define G4  392
#define A4  440
#define E4  330
#define D4  294
#define REST 0

static const char *TAG = "SCHOOL_BELL";

typedef struct {
    int freq;
    int duration_ms;
} note_t;

static const note_t melody[] = {
    {G4, 400}, {G4, 400}, {A4, 400}, {A4, 400},
    {G4, 400}, {G4, 400}, {E4, 800},
    {G4, 400}, {G4, 400}, {E4, 400}, {E4, 400},
    {D4, 800}, {REST, 400},

    {G4, 400}, {G4, 400}, {A4, 400}, {A4, 400},
    {G4, 400}, {G4, 400}, {E4, 800},
    {G4, 400}, {E4, 400}, {D4, 400}, {E4, 400},
    {G4, 800}, {REST, 400},

    {D4, 400}, {D4, 400}, {D4, 400}, {D4, 400},
    {D4, 400}, {E4, 400}, {G4, 800},
    {E4, 400}, {E4, 400}, {E4, 400}, {E4, 400},
    {E4, 400}, {G4, 400}, {A4, 800},

    {G4, 400}, {G4, 400}, {A4, 400}, {A4, 400},
    {G4, 400}, {G4, 400}, {E4, 800},
    {G4, 400}, {E4, 400}, {D4, 400}, {E4, 400},
    {G4, 800}, {REST, 400},
};

static const int melody_len = sizeof(melody) / sizeof(melody[0]);

static void play_tone(int freq, int duration_ms)
{
    if (freq == REST) {
        ledc_stop(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL, 0);
    } else {
        ledc_set_freq(LEDC_LOW_SPEED_MODE, LEDC_TIMER, freq);
        ledc_set_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL, 512);
        ledc_update_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL);
    }
    vTaskDelay(duration_ms / portTICK_PERIOD_MS);
    ledc_stop(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL, 0);
    vTaskDelay(50 / portTICK_PERIOD_MS);
}

static void melody_task(void *arg)
{
    ledc_timer_config_t timer_conf = {
        .speed_mode = LEDC_LOW_SPEED_MODE,
        .duty_resolution = LEDC_TIMER_10_BIT,
        .timer_num = LEDC_TIMER,
        .freq_hz = 440,
        .clk_cfg = LEDC_AUTO_CLK,
    };
    ledc_timer_config(&timer_conf);

    ledc_channel_config_t ch_conf = {
        .gpio_num = MELODY_PIN,
        .speed_mode = LEDC_LOW_SPEED_MODE,
        .channel = LEDC_CHANNEL,
        .timer_sel = LEDC_TIMER,
        .duty = 0,
        .hpoint = 0,
    };
    ledc_channel_config(&ch_conf);

    while (1) {
        ESP_LOGI(TAG, "Playing school bell melody");
        for (int i = 0; i < melody_len; i++) {
            play_tone(melody[i].freq, melody[i].duration_ms);
        }
        ESP_LOGI(TAG, "Melody finished, waiting 5s...");
        vTaskDelay(5000 / portTICK_PERIOD_MS);
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
    ssd1306_draw_string(0, 0, "School Bell");
    ssd1306_draw_string(0, 16, "Melody Playing");
    ssd1306_flush(I2C_NUM_0);

    xTaskCreate(melody_task, "melody", 2048, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}