/**
 * BLE OTA 부트로더 — Step 2: 부팅 + LED + OLED 상태 표시
 */
#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "driver/i2c.h"
#include "esp_ota_ops.h"
#include "esp_log.h"
#include "esp_mac.h"
#include "nvs_flash.h"
#include "ssd1306.h"
#include "korean_bitmaps.h"
#include "ble_ota.h"

#define LED_RED    25
#define LED_YELLOW 26
#define LED_BLUE   27
#define I2C_SDA    21
#define I2C_SCL    22

static const char *TAG = "MAIN";

static void hw_init(void)
{
    // LED
    gpio_reset_pin(LED_RED);
    gpio_reset_pin(LED_YELLOW);
    gpio_reset_pin(LED_BLUE);
    gpio_set_direction(LED_RED, GPIO_MODE_OUTPUT);
    gpio_set_direction(LED_YELLOW, GPIO_MODE_OUTPUT);
    gpio_set_direction(LED_BLUE, GPIO_MODE_OUTPUT);
    gpio_set_level(LED_RED, 0);
    gpio_set_level(LED_YELLOW, 0);
    gpio_set_level(LED_BLUE, 0);

    // 부저 끄기
    gpio_reset_pin(14);
    gpio_set_direction(14, GPIO_MODE_OUTPUT);
    gpio_set_level(14, 1);

    // I2C
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_SDA,
        .scl_io_num = I2C_SCL,
        .sda_pullup_en = GPIO_PULLUP_DISABLE,
        .scl_pullup_en = GPIO_PULLUP_DISABLE,
        .master.clk_speed = 100000,
    };
    i2c_param_config(I2C_NUM_0, &conf);
    i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);

    // OLED
    ssd1306_init(I2C_NUM_0);
}

static void oled_show_status(const char *line1, const char *line2,
                              const char *line3, const char *line4)
{
    ssd1306_clear();
    ssd1306_draw_hbitmap(0, 0, 128, 16, bitmap_line1);  // 바이브 코딩

    // 구분선
    for (int x = 0; x < 128; x++)
        ssd1306_buf[(18/8) * SSD1306_W + x] |= (1 << (18%8));

    if (line1) ssd1306_draw_string(0, 22, line1);
    if (line2) ssd1306_draw_string(0, 32, line2);
    if (line3) ssd1306_draw_string(0, 42, line3);
    if (line4) ssd1306_draw_string(0, 52, line4);
    ssd1306_flush(I2C_NUM_0);
}

// LED 깜빡임 태스크 — v1: 파랑 느린 깜빡임
static void led_task(void *arg)
{
    while (1) {
        gpio_set_level(LED_BLUE, 1);
        vTaskDelay(500 / portTICK_PERIOD_MS);
        gpio_set_level(LED_BLUE, 0);
        vTaskDelay(1500 / portTICK_PERIOD_MS);
    }
}

void app_main(void)
{
    // NVS 초기화
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        nvs_flash_erase();
        nvs_flash_init();
    }

    // 하드웨어 초기화
    hw_init();

    // 부팅 정보
    const esp_partition_t *running = esp_ota_get_running_partition();
    ESP_LOGI(TAG, "Partition: %s", running->label);

    // MAC 주소
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_BT);
    char mac_str[20];
    snprintf(mac_str, sizeof(mac_str), "%02X:%02X:%02X:%02X:%02X:%02X",
             mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

    // OTA Health Check
    esp_ota_img_states_t ota_state;
    if (esp_ota_get_state_partition(running, &ota_state) == ESP_OK) {
        if (ota_state == ESP_OTA_IMG_PENDING_VERIFY) {
            oled_show_status("OTA Verifying...", "Please wait 5s", "", "");
            ESP_LOGI(TAG, "OTA pending verify...");
            vTaskDelay(5000 / portTICK_PERIOD_MS);
            esp_ota_mark_app_valid_cancel_rollback();
            ESP_LOGI(TAG, "OTA confirmed!");
        }
    }

    // 파티션 정보
    char part_str[24];
    snprintf(part_str, sizeof(part_str), "Part: %s", running->label);

    // LED 태스크 시작
    xTaskCreate(led_task, "led", 2048, NULL, 3, NULL);

    // OLED 상태 표시
    oled_show_status(
        "BLE OTA Ready!",
        part_str,
        mac_str,
        "Waiting connect..."
    );

    // BLE OTA 시작
    ble_ota_init();

    ESP_LOGI(TAG, "=== BLE OTA Ready ===");
    ESP_LOGI(TAG, "MAC: %s", mac_str);
    ESP_LOGI(TAG, "Device name: ESP32-OTA");
    ESP_LOGI(TAG, "Waiting for BLE connection...");

    while (1) {
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}
