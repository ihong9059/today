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

static const char *TAG = "MELODY";

#define MELODY_BUZZER_GPIO 33
#define LEDC_TIMER       LEDC_TIMER_0
#define LEDC_MODE        LEDC_LOW_SPEED_MODE
#define LEDC_CHANNEL     LEDC_CHANNEL_0
#define LEDC_RESOLUTION  LEDC_TIMER_13_BIT

// Note frequencies (Hz)
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_D5  587
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_G5  784
#define NOTE_REST 0

typedef struct {
    uint32_t freq;
    uint32_t duration_ms;
} note_t;

// "Happy Birthday" melody
static const note_t melody[] = {
    {NOTE_C4, 300}, {NOTE_C4, 200}, {NOTE_D4, 500}, {NOTE_C4, 500}, {NOTE_F4, 500}, {NOTE_E4, 900}, {NOTE_REST, 100},
    {NOTE_C4, 300}, {NOTE_C4, 200}, {NOTE_D4, 500}, {NOTE_C4, 500}, {NOTE_G4, 500}, {NOTE_F4, 900}, {NOTE_REST, 100},
    {NOTE_C4, 300}, {NOTE_C4, 200}, {NOTE_C5, 500}, {NOTE_A4, 500}, {NOTE_F4, 500}, {NOTE_E4, 500}, {NOTE_D4, 900}, {NOTE_REST, 100},
    {NOTE_B4, 300}, {NOTE_B4, 200}, {NOTE_A4, 500}, {NOTE_F4, 500}, {NOTE_G4, 500}, {NOTE_F4, 900},
};
static const int melody_len = sizeof(melody) / sizeof(melody[0]);

static void buzzer_play_tone(uint32_t freq)
{
    if (freq == 0) {
        ledc_set_duty(LEDC_MODE, LEDC_CHANNEL, 0);
        ledc_update_duty(LEDC_MODE, LEDC_CHANNEL);
    } else {
        ledc_set_freq(LEDC_MODE, LEDC_TIMER, freq);
        ledc_set_duty(LEDC_MODE, LEDC_CHANNEL, 4096);
        ledc_update_duty(LEDC_MODE, LEDC_CHANNEL);
    }
}

static void buzzer_stop(void)
{
    ledc_set_duty(LEDC_MODE, LEDC_CHANNEL, 0);
    ledc_update_duty(LEDC_MODE, LEDC_CHANNEL);
}

static void melody_task(void *arg)
{
    while (1) {
        ESP_LOGI(TAG, "Playing Happy Birthday...");
        for (int i = 0; i < melody_len; i++) {
            buzzer_play_tone(melody[i].freq);
            vTaskDelay(melody[i].duration_ms / portTICK_PERIOD_MS);
            buzzer_stop();
            vTaskDelay(50 / portTICK_PERIOD_MS);
        }
        buzzer_stop();
        ESP_LOGI(TAG, "Melody finished. Repeating in 5s...");
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
    ssd1306_draw_string(0, 0, "Happy Birthday!");
    ssd1306_draw_string(0, 16, "Playing melody..");
    ssd1306_flush(I2C_NUM_0);

    ledc_timer_config_t timer_conf = {
        .speed_mode = LEDC_MODE,
        .duty_resolution = LEDC_RESOLUTION,
        .timer_num = LEDC_TIMER,
        .freq_hz = 1000,
        .clk_cfg = LEDC_AUTO_CLK,
    };
    ledc_timer_config(&timer_conf);

    ledc_channel_config_t ch_conf = {
        .speed_mode = LEDC_MODE,
        .channel = LEDC_CHANNEL,
        .timer_sel = LEDC_TIMER,
        .intr_type = LEDC_INTR_DISABLE,
        .gpio_num = MELODY_BUZZER_GPIO,
        .duty = 0,
        .hpoint = 0,
    };
    ledc_channel_config(&ch_conf);

    xTaskCreate(melody_task, "melody_task", 2048, NULL, 5, NULL);

    ble_ota_init();

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}