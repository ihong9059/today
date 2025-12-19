# UTTEC Lab AI - C Programming Education System
## ESP32 WROOM 기반 AI C 프로그래밍 교육 보드

---

## 1. 제품 개요

### 1.1 제품 소개

**UTTEC Lab AI**는 ESP32 WROOM 마이크로컨트롤러를 기반으로 한 **AI 및 C 프로그래밍 교육용 개발 보드**입니다.
다양한 센서, LED, 디스플레이를 통해 임베디드 C 프로그래밍의 기초부터 AI 응용까지 학습할 수 있습니다.

### 1.2 제품 특징

| 특징 | 설명 |
|------|------|
| **올인원 설계** | 센서, 디스플레이, LED, 버저 통합 |
| **WiFi/BT 내장** | ESP32 WROOM 무선 통신 지원 |
| **USB-C 인터페이스** | 편리한 전원 공급 및 프로그래밍 |
| **C 언어 학습** | ESP-IDF 기반 임베디드 C 프로그래밍 |
| **AI 연동** | 클라우드 AI API 연동 실습 |

### 1.3 교육 목표

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Learning Objectives                             │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
  │   C 언어 기초    │   │  임베디드 시스템  │   │   IoT / AI     │
  │                 │   │                 │   │                 │
  │ • 변수, 자료형   │   │ • GPIO 제어     │   │ • WiFi 통신     │
  │ • 조건문, 반복문 │──▶│ • I2C/SPI 통신  │──▶│ • HTTP/MQTT    │
  │ • 함수, 포인터   │   │ • 타이머, 인터럽트│   │ • AI API 연동   │
  │ • 구조체, 배열   │   │ • RTOS 기초     │   │ • 음성인식/TTS  │
  └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 1.4 대상 사용자

- C 프로그래밍 입문자
- 임베디드 시스템 학습자
- 대학교 마이크로프로세서 실습
- IoT/AI 개발 입문자
- 메이커 및 취미 개발자

---

## 2. 하드웨어 구성

### 2.1 보드 레이아웃

```
┌─────────────────────────────────────────────────────────────────────┐
│                      UTTEC Lab AI Board                             │
│                        (Top View)                                   │
└─────────────────────────────────────────────────────────────────────┘

         UTTEC
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │   ┌─────┐                           ┌─────────────────┐    │
    │   │Buzzer│    ┌───┐                 │  AHT20+BMP280   │    │
    │   │ 🔔  │    │SW1│                 │  Temp/Humidity  │    │
    │   └─────┘    └───┘                 │    Sensor       │    │
    │                                     └─────────────────┘    │
    │                                                       ┌───┐│
    │   ○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○              │🔴││
    │   5V D0 5V D3 CMD D2 D3 GND 13 D2 D3 ...  3V3 EN ...  │LED││
    │                                                       └───┘│
    │                     ┌─────────────────────┐                │
    │   ┌──────┐         │                     │           ┌───┐│
    │   │      │         │    ESP32 WROOM      │           │🟡││
    │   │USB-C │         │    Module           │           │LED││
    │   │      │         │  (Xtensa Dual-Core) │           └───┘│
    │   └──────┘         │                     │                │
    │                     └─────────────────────┘           ┌───┐│
    │                                                       │🔵││
    │   ┌─────┐    ○○○○○○○○○○○○○○○○○○○○○○○○                │LED││
    │   │Buzzer│   CLK D0 D1 15 2 0 4 16 17 5 18 19 GND 21 └───┘│
    │   └─────┘                                 RX TX 22 23 GND │
    │                                                             │
    │             2025.08  ┌─────────────────────────────────┐   │
    │                      │        SSD1306 OLED            │   │
    │                      │      ┌─────────────────┐       │   │
    │                      │      │ UTTEC Lab Ai    │       │   │
    │                      │      │ 2025.08.21      │       │   │
    │                      │      │ Program Study   │       │   │
    │                      │      │ by Ai           │       │   │
    │                      │      │ End of Display  │       │   │
    │                      │      └─────────────────┘       │   │
    │                      │      GND VDD SCK SDA           │   │
    │                      └─────────────────────────────────┘   │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
```

### 2.2 구성 요소 상세

| 구성요소 | 모델/사양 | 인터페이스 | 기능 |
|----------|-----------|------------|------|
| **MCU** | ESP32 WROOM (Xtensa LX6 Dual-Core) | - | 메인 프로세서, WiFi/BT/BLE |
| **디스플레이** | SSD1306 OLED (128x64) | I2C | 텍스트/그래픽 출력 |
| **환경센서** | AHT20 + BMP280 | I2C | 온도/습도/기압 측정 |
| **LED (빨강)** | 5mm Red LED | GPIO | 상태 표시 |
| **LED (노랑)** | 5mm Yellow LED | GPIO | 상태 표시 |
| **LED (파랑)** | 5mm Blue LED | GPIO | 상태 표시 |
| **버저** | 피에조 버저 | GPIO/PWM | 사운드 출력 |
| **스위치** | 택트 스위치 (SW1) | GPIO | 사용자 입력 |
| **USB** | USB-C 커넥터 | USB | 전원/프로그래밍 |
| **I2C** | 4핀 헤더 (GND,VDD,SCK,SDA) | I2C | 외부 I2C 장치 연결 |

### 2.3 ESP32 WROOM 모듈 특징

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ESP32 WROOM Specifications                       │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Core        : Xtensa LX6 32-bit Dual-Core                    │
  │   Clock       : Up to 240 MHz                                  │
  │   Flash       : 4 MB                                           │
  │   SRAM        : 520 KB                                         │
  │                                                                 │
  │   WiFi        : 802.11 b/g/n (2.4 GHz)                        │
  │   Bluetooth   : Classic BT + BLE 4.2                           │
  │                                                                 │
  │   GPIO        : 34 Programmable GPIOs                          │
  │   ADC         : 2 × 12-bit SAR ADCs, 18 channels              │
  │   DAC         : 2 × 8-bit DACs                                 │
  │   I2C         : 2 × I2C                                        │
  │   SPI         : 4 × SPI                                        │
  │   UART        : 3 × UART                                       │
  │   PWM         : 16 × PWM channels                              │
  │   Touch       : 10 × Capacitive Touch                          │
  │                                                                 │
  │   Temperature : -40°C to 85°C                                  │
  │   Supply      : 3.0V to 3.6V                                   │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

---

## 3. 시스템 아키텍처

### 3.1 블록 다이어그램

```
┌─────────────────────────────────────────────────────────────────────┐
│                      System Block Diagram                           │
└─────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   Cloud / AI    │
                              │  (ChatGPT, etc) │
                              └────────┬────────┘
                                       │ WiFi
                                       │
         USB-C ════════════════════════╪════════════════════════
           │                           │
           │    ┌──────────────────────┴──────────────────────┐
           │    │                                             │
           │    │              ESP32 WROOM                    │
           │    │           ┌───────────────┐                 │
           │    │           │ Xtensa LX6    │                 │
           └────┼──────────▶│ Dual 240MHz   │                 │
         Power  │           │               │                 │
         + JTAG │           │ WiFi+BT+BLE   │                 │
                │           └───────┬───────┘                 │
                │                   │                         │
                │    ┌──────────────┼──────────────┐         │
                │    │              │              │         │
                │    ▼              ▼              ▼         │
                │ ┌──────┐    ┌──────────┐   ┌──────────┐   │
                │ │ GPIO │    │   I2C    │   │   PWM    │   │
                │ └──┬───┘    └────┬─────┘   └────┬─────┘   │
                │    │             │              │         │
                └────┼─────────────┼──────────────┼─────────┘
                     │             │              │
       ┌─────────────┼─────────────┼──────────────┼─────────────┐
       │             │             │              │             │
       ▼             ▼             ▼              ▼             ▼
  ┌─────────┐  ┌─────────┐  ┌───────────┐  ┌─────────┐  ┌─────────┐
  │  3 LEDs │  │ Switch  │  │  SSD1306  │  │ AHT20+  │  │ Buzzer  │
  │ R/Y/B   │  │  (SW1)  │  │   OLED    │  │ BMP280  │  │  🔔     │
  └─────────┘  └─────────┘  └───────────┘  └─────────┘  └─────────┘
```

### 3.2 핀 맵핑

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GPIO Pin Mapping                            │
└─────────────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────────┐
  │  Function        │  GPIO  │  Description                      │
  ├───────────────────────────────────────────────────────────────┤
  │  LED_RED         │  GPIO2 │  빨간색 LED 출력                   │
  │  LED_YELLOW      │  GPIO3 │  노란색 LED 출력                   │
  │  LED_BLUE        │  GPIO4 │  파란색 LED 출력                   │
  │  BUZZER          │  GPIO5 │  피에조 버저 (PWM)                 │
  │  SWITCH (SW1)    │  GPIO9 │  택트 스위치 입력 (풀업)           │
  │  I2C_SDA         │  GPIO8 │  I2C 데이터                       │
  │  I2C_SCL         │  GPIO10│  I2C 클럭                         │
  │  UART_TX         │  GPIO21│  UART 송신                        │
  │  UART_RX         │  GPIO20│  UART 수신                        │
  └───────────────────────────────────────────────────────────────┘

  I2C Devices:
  ┌───────────────────────────────────────────────────────────────┐
  │  Device          │  Address │  Description                    │
  ├───────────────────────────────────────────────────────────────┤
  │  SSD1306 OLED    │  0x3C   │  128x64 OLED 디스플레이          │
  │  AHT20           │  0x38   │  온도/습도 센서                   │
  │  BMP280          │  0x76   │  기압/온도 센서                   │
  └───────────────────────────────────────────────────────────────┘
```

---

## 4. 개발 환경

### 4.1 ESP-IDF 설치

```bash
# 1. 필수 패키지 설치 (Ubuntu/Debian)
sudo apt-get install git wget flex bison gperf python3 python3-pip \
    python3-venv cmake ninja-build ccache libffi-dev libssl-dev \
    dfu-util libusb-1.0-0

# 2. ESP-IDF 다운로드
mkdir -p ~/esp
cd ~/esp
git clone -b v5.1 --recursive https://github.com/espressif/esp-idf.git

# 3. ESP-IDF 설치
cd ~/esp/esp-idf
./install.sh esp32

# 4. 환경 변수 설정
. $HOME/esp/esp-idf/export.sh

# 5. 설치 확인
idf.py --version
```

### 4.2 프로젝트 구조

```
uttec_lab_ai/
├── CMakeLists.txt
├── sdkconfig
├── main/
│   ├── CMakeLists.txt
│   ├── main.c
│   ├── led_control.c
│   ├── led_control.h
│   ├── oled_display.c
│   ├── oled_display.h
│   ├── sensor.c
│   ├── sensor.h
│   ├── buzzer.c
│   ├── buzzer.h
│   ├── button.c
│   ├── button.h
│   ├── wifi_manager.c
│   ├── wifi_manager.h
│   ├── ai_client.c
│   └── ai_client.h
├── components/
│   ├── ssd1306/
│   └── aht20/
└── README.md
```

### 4.3 빌드 및 플래시

```bash
# 1. 프로젝트 설정
idf.py set-target esp32

# 2. 메뉴 설정 (선택)
idf.py menuconfig

# 3. 빌드
idf.py build

# 4. 플래시 (USB-C 연결 후)
idf.py -p /dev/ttyUSB0 flash

# 5. 모니터링
idf.py -p /dev/ttyUSB0 monitor

# 6. 빌드 + 플래시 + 모니터 동시
idf.py -p /dev/ttyUSB0 flash monitor
```

---

## 5. C 언어 예제 코드

### 5.1 LED 제어 (GPIO 기초)

```c
/**
 * UTTEC Lab AI - LED Control Example
 * GPIO를 이용한 LED 제어
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"

// LED 핀 정의
#define LED_RED_PIN     GPIO_NUM_2
#define LED_YELLOW_PIN  GPIO_NUM_3
#define LED_BLUE_PIN    GPIO_NUM_4

static const char *TAG = "LED_CONTROL";

// LED 초기화
void led_init(void)
{
    // GPIO 설정 구조체
    gpio_config_t io_conf = {
        .intr_type = GPIO_INTR_DISABLE,      // 인터럽트 비활성화
        .mode = GPIO_MODE_OUTPUT,             // 출력 모드
        .pin_bit_mask = (1ULL << LED_RED_PIN) |
                        (1ULL << LED_YELLOW_PIN) |
                        (1ULL << LED_BLUE_PIN),
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .pull_up_en = GPIO_PULLUP_DISABLE,
    };

    gpio_config(&io_conf);
    ESP_LOGI(TAG, "LED GPIO initialized");
}

// LED 켜기
void led_on(gpio_num_t led_pin)
{
    gpio_set_level(led_pin, 1);
}

// LED 끄기
void led_off(gpio_num_t led_pin)
{
    gpio_set_level(led_pin, 0);
}

// LED 토글
void led_toggle(gpio_num_t led_pin)
{
    int level = gpio_get_level(led_pin);
    gpio_set_level(led_pin, !level);
}

// 모든 LED 끄기
void led_all_off(void)
{
    led_off(LED_RED_PIN);
    led_off(LED_YELLOW_PIN);
    led_off(LED_BLUE_PIN);
}

// 신호등 패턴
void traffic_light_pattern(void)
{
    ESP_LOGI(TAG, "Traffic Light Pattern Start");

    while (1) {
        // 빨간불
        led_all_off();
        led_on(LED_RED_PIN);
        ESP_LOGI(TAG, "🔴 RED - STOP");
        vTaskDelay(pdMS_TO_TICKS(3000));

        // 노란불
        led_all_off();
        led_on(LED_YELLOW_PIN);
        ESP_LOGI(TAG, "🟡 YELLOW - CAUTION");
        vTaskDelay(pdMS_TO_TICKS(1000));

        // 파란불
        led_all_off();
        led_on(LED_BLUE_PIN);
        ESP_LOGI(TAG, "🔵 BLUE - GO");
        vTaskDelay(pdMS_TO_TICKS(3000));
    }
}

// 순차 점등 패턴
void sequential_pattern(int delay_ms)
{
    gpio_num_t leds[] = {LED_RED_PIN, LED_YELLOW_PIN, LED_BLUE_PIN};

    for (int i = 0; i < 3; i++) {
        led_on(leds[i]);
        vTaskDelay(pdMS_TO_TICKS(delay_ms));
    }
    vTaskDelay(pdMS_TO_TICKS(delay_ms));
    led_all_off();
}

// 메인 함수
void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - LED Control Example");

    // LED 초기화
    led_init();

    // 테스트: 순차 점등
    ESP_LOGI(TAG, "Sequential LED Test");
    for (int i = 0; i < 3; i++) {
        sequential_pattern(300);
        vTaskDelay(pdMS_TO_TICKS(500));
    }

    // 신호등 패턴 시작
    traffic_light_pattern();
}
```

### 5.2 버튼 입력 (인터럽트)

```c
/**
 * UTTEC Lab AI - Button Input Example
 * 인터럽트를 이용한 버튼 입력 처리
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/gpio.h"
#include "esp_log.h"

#define BUTTON_PIN      GPIO_NUM_9
#define LED_PIN         GPIO_NUM_2

static const char *TAG = "BUTTON";
static QueueHandle_t gpio_evt_queue = NULL;
static int led_state = 0;

// 인터럽트 서비스 루틴 (ISR)
static void IRAM_ATTR gpio_isr_handler(void *arg)
{
    uint32_t gpio_num = (uint32_t)arg;
    xQueueSendFromISR(gpio_evt_queue, &gpio_num, NULL);
}

// 버튼 이벤트 처리 태스크
static void button_task(void *arg)
{
    uint32_t gpio_num;

    while (1) {
        if (xQueueReceive(gpio_evt_queue, &gpio_num, portMAX_DELAY)) {
            // 디바운싱
            vTaskDelay(pdMS_TO_TICKS(50));

            if (gpio_get_level(gpio_num) == 0) {  // 버튼 눌림 (Active Low)
                led_state = !led_state;
                gpio_set_level(LED_PIN, led_state);
                ESP_LOGI(TAG, "Button pressed! LED: %s",
                         led_state ? "ON" : "OFF");
            }
        }
    }
}

// 버튼 초기화
void button_init(void)
{
    // 버튼 GPIO 설정
    gpio_config_t btn_conf = {
        .intr_type = GPIO_INTR_NEGEDGE,  // 하강 에지 인터럽트
        .mode = GPIO_MODE_INPUT,
        .pin_bit_mask = (1ULL << BUTTON_PIN),
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
    };
    gpio_config(&btn_conf);

    // LED GPIO 설정
    gpio_config_t led_conf = {
        .intr_type = GPIO_INTR_DISABLE,
        .mode = GPIO_MODE_OUTPUT,
        .pin_bit_mask = (1ULL << LED_PIN),
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
    };
    gpio_config(&led_conf);

    // 이벤트 큐 생성
    gpio_evt_queue = xQueueCreate(10, sizeof(uint32_t));

    // 버튼 태스크 생성
    xTaskCreate(button_task, "button_task", 2048, NULL, 10, NULL);

    // 인터럽트 서비스 설치
    gpio_install_isr_service(0);
    gpio_isr_handler_add(BUTTON_PIN, gpio_isr_handler, (void *)BUTTON_PIN);

    ESP_LOGI(TAG, "Button initialized with interrupt");
}

void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - Button Example");
    button_init();

    // 메인 루프
    while (1) {
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
```

### 5.3 버저 멜로디 (PWM/LEDC)

```c
/**
 * UTTEC Lab AI - Buzzer Melody Example
 * LEDC(PWM)를 이용한 버저 멜로디 연주
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/ledc.h"
#include "esp_log.h"

#define BUZZER_PIN      GPIO_NUM_5
#define LEDC_TIMER      LEDC_TIMER_0
#define LEDC_CHANNEL    LEDC_CHANNEL_0
#define LEDC_MODE       LEDC_LOW_SPEED_MODE

static const char *TAG = "BUZZER";

// 음계 주파수 정의
typedef enum {
    NOTE_C4 = 262,  NOTE_D4 = 294,  NOTE_E4 = 330,  NOTE_F4 = 349,
    NOTE_G4 = 392,  NOTE_A4 = 440,  NOTE_B4 = 494,
    NOTE_C5 = 523,  NOTE_D5 = 587,  NOTE_E5 = 659,  NOTE_F5 = 698,
    NOTE_G5 = 784,  NOTE_A5 = 880,  NOTE_B5 = 988,
    NOTE_REST = 0
} note_t;

// 멜로디 구조체
typedef struct {
    note_t note;
    int duration_ms;
} melody_note_t;

// 버저 초기화
void buzzer_init(void)
{
    // LEDC 타이머 설정
    ledc_timer_config_t timer_conf = {
        .speed_mode = LEDC_MODE,
        .timer_num = LEDC_TIMER,
        .duty_resolution = LEDC_TIMER_8_BIT,
        .freq_hz = 1000,
        .clk_cfg = LEDC_AUTO_CLK,
    };
    ledc_timer_config(&timer_conf);

    // LEDC 채널 설정
    ledc_channel_config_t channel_conf = {
        .speed_mode = LEDC_MODE,
        .channel = LEDC_CHANNEL,
        .timer_sel = LEDC_TIMER,
        .intr_type = LEDC_INTR_DISABLE,
        .gpio_num = BUZZER_PIN,
        .duty = 0,
        .hpoint = 0,
    };
    ledc_channel_config(&channel_conf);

    ESP_LOGI(TAG, "Buzzer initialized");
}

// 톤 출력
void buzzer_tone(int frequency, int duration_ms)
{
    if (frequency > 0) {
        ledc_set_freq(LEDC_MODE, LEDC_TIMER, frequency);
        ledc_set_duty(LEDC_MODE, LEDC_CHANNEL, 127);  // 50% 듀티
        ledc_update_duty(LEDC_MODE, LEDC_CHANNEL);
    }

    vTaskDelay(pdMS_TO_TICKS(duration_ms));

    // 톤 끄기
    ledc_set_duty(LEDC_MODE, LEDC_CHANNEL, 0);
    ledc_update_duty(LEDC_MODE, LEDC_CHANNEL);
}

// 비프음
void buzzer_beep(int times, int duration_ms)
{
    for (int i = 0; i < times; i++) {
        buzzer_tone(1000, duration_ms);
        vTaskDelay(pdMS_TO_TICKS(duration_ms));
    }
}

// 음계 연주
void buzzer_play_scale(void)
{
    note_t scale[] = {NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4,
                      NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5};

    ESP_LOGI(TAG, "Playing scale...");

    for (int i = 0; i < 8; i++) {
        buzzer_tone(scale[i], 300);
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

// 멜로디 연주
void buzzer_play_melody(const melody_note_t *melody, int length)
{
    for (int i = 0; i < length; i++) {
        if (melody[i].note == NOTE_REST) {
            vTaskDelay(pdMS_TO_TICKS(melody[i].duration_ms));
        } else {
            buzzer_tone(melody[i].note, melody[i].duration_ms * 0.9);
            vTaskDelay(pdMS_TO_TICKS(melody[i].duration_ms * 0.1));
        }
    }
}

// 반짝반짝 작은별
void buzzer_play_twinkle_star(void)
{
    melody_note_t melody[] = {
        {NOTE_C4, 400}, {NOTE_C4, 400}, {NOTE_G4, 400}, {NOTE_G4, 400},
        {NOTE_A4, 400}, {NOTE_A4, 400}, {NOTE_G4, 800},
        {NOTE_F4, 400}, {NOTE_F4, 400}, {NOTE_E4, 400}, {NOTE_E4, 400},
        {NOTE_D4, 400}, {NOTE_D4, 400}, {NOTE_C4, 800},
    };

    ESP_LOGI(TAG, "Playing Twinkle Twinkle Little Star...");
    buzzer_play_melody(melody, sizeof(melody) / sizeof(melody[0]));
}

void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - Buzzer Example");

    buzzer_init();

    // 비프음
    ESP_LOGI(TAG, "Beep test");
    buzzer_beep(3, 100);
    vTaskDelay(pdMS_TO_TICKS(1000));

    // 음계
    buzzer_play_scale();
    vTaskDelay(pdMS_TO_TICKS(1000));

    // 작은별
    buzzer_play_twinkle_star();
}
```

### 5.4 SSD1306 OLED 디스플레이

```c
/**
 * UTTEC Lab AI - OLED Display Example
 * I2C를 이용한 SSD1306 OLED 제어
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/i2c.h"
#include "esp_log.h"

#define I2C_MASTER_NUM      I2C_NUM_0
#define I2C_SDA_PIN         GPIO_NUM_8
#define I2C_SCL_PIN         GPIO_NUM_10
#define I2C_FREQ_HZ         400000

#define SSD1306_ADDR        0x3C
#define SSD1306_WIDTH       128
#define SSD1306_HEIGHT      64

static const char *TAG = "OLED";

// 프레임 버퍼
static uint8_t frame_buffer[SSD1306_WIDTH * SSD1306_HEIGHT / 8];

// I2C 초기화
esp_err_t i2c_master_init(void)
{
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_SDA_PIN,
        .scl_io_num = I2C_SCL_PIN,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = I2C_FREQ_HZ,
    };

    esp_err_t err = i2c_param_config(I2C_MASTER_NUM, &conf);
    if (err != ESP_OK) return err;

    return i2c_driver_install(I2C_MASTER_NUM, conf.mode, 0, 0, 0);
}

// SSD1306 명령 전송
esp_err_t ssd1306_send_cmd(uint8_t cmd)
{
    uint8_t data[2] = {0x00, cmd};  // Co=0, D/C=0
    return i2c_master_write_to_device(I2C_MASTER_NUM, SSD1306_ADDR,
                                       data, 2, pdMS_TO_TICKS(100));
}

// SSD1306 초기화
void ssd1306_init(void)
{
    // 초기화 시퀀스
    uint8_t init_cmds[] = {
        0xAE,       // Display OFF
        0xD5, 0x80, // Set Clock Divide Ratio
        0xA8, 0x3F, // Set Multiplex Ratio (64-1)
        0xD3, 0x00, // Set Display Offset
        0x40,       // Set Start Line
        0x8D, 0x14, // Charge Pump Enable
        0x20, 0x00, // Memory Addressing Mode (Horizontal)
        0xA1,       // Segment Re-map
        0xC8,       // COM Output Scan Direction
        0xDA, 0x12, // COM Pins Configuration
        0x81, 0xCF, // Set Contrast
        0xD9, 0xF1, // Set Pre-charge Period
        0xDB, 0x40, // Set VCOMH Deselect Level
        0xA4,       // Entire Display ON (RAM)
        0xA6,       // Normal Display
        0xAF,       // Display ON
    };

    for (int i = 0; i < sizeof(init_cmds); i++) {
        ssd1306_send_cmd(init_cmds[i]);
    }

    ESP_LOGI(TAG, "SSD1306 OLED initialized");
}

// 화면 지우기
void ssd1306_clear(void)
{
    memset(frame_buffer, 0, sizeof(frame_buffer));
}

// 프레임 버퍼를 디스플레이에 전송
void ssd1306_display(void)
{
    ssd1306_send_cmd(0x21);  // Column Address
    ssd1306_send_cmd(0);
    ssd1306_send_cmd(127);

    ssd1306_send_cmd(0x22);  // Page Address
    ssd1306_send_cmd(0);
    ssd1306_send_cmd(7);

    // 데이터 전송
    for (int i = 0; i < sizeof(frame_buffer); i += 16) {
        uint8_t data[17];
        data[0] = 0x40;  // Co=0, D/C=1 (Data)
        memcpy(&data[1], &frame_buffer[i], 16);
        i2c_master_write_to_device(I2C_MASTER_NUM, SSD1306_ADDR,
                                   data, 17, pdMS_TO_TICKS(100));
    }
}

// 픽셀 그리기
void ssd1306_draw_pixel(int x, int y, int color)
{
    if (x < 0 || x >= SSD1306_WIDTH || y < 0 || y >= SSD1306_HEIGHT) return;

    int index = x + (y / 8) * SSD1306_WIDTH;

    if (color) {
        frame_buffer[index] |= (1 << (y % 8));
    } else {
        frame_buffer[index] &= ~(1 << (y % 8));
    }
}

// 5x7 폰트 (간단한 문자)
static const uint8_t font_5x7[][5] = {
    {0x00, 0x00, 0x00, 0x00, 0x00}, // Space
    {0x7E, 0x11, 0x11, 0x11, 0x7E}, // A
    {0x7F, 0x49, 0x49, 0x49, 0x36}, // B
    // ... 추가 문자
};

// 문자 그리기 (간단한 구현)
void ssd1306_draw_char(int x, int y, char c)
{
    // 실제 구현에서는 완전한 폰트 테이블 사용
    // 여기서는 간단히 사각형으로 표시
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 7; j++) {
            if ((c - 'A' >= 0) && (c - 'A' < 26)) {
                ssd1306_draw_pixel(x + i, y + j, 1);
            }
        }
    }
}

// 문자열 그리기
void ssd1306_draw_string(int x, int y, const char *str)
{
    int cursor_x = x;

    while (*str) {
        ssd1306_draw_char(cursor_x, y, *str);
        cursor_x += 6;
        str++;
    }
}

// 사각형 그리기
void ssd1306_draw_rect(int x, int y, int w, int h, int fill)
{
    if (fill) {
        for (int i = x; i < x + w; i++) {
            for (int j = y; j < y + h; j++) {
                ssd1306_draw_pixel(i, j, 1);
            }
        }
    } else {
        // 테두리만
        for (int i = x; i < x + w; i++) {
            ssd1306_draw_pixel(i, y, 1);
            ssd1306_draw_pixel(i, y + h - 1, 1);
        }
        for (int j = y; j < y + h; j++) {
            ssd1306_draw_pixel(x, j, 1);
            ssd1306_draw_pixel(x + w - 1, j, 1);
        }
    }
}

void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - OLED Example");

    // I2C 초기화
    i2c_master_init();

    // OLED 초기화
    ssd1306_init();

    // 화면 그리기
    ssd1306_clear();

    // 테두리 그리기
    ssd1306_draw_rect(0, 0, 128, 64, 0);

    // 텍스트 위치에 간단한 도형 표시
    ssd1306_draw_rect(10, 10, 50, 10, 1);  // "UTTEC" 위치
    ssd1306_draw_rect(10, 25, 60, 10, 1);  // "Lab AI" 위치

    ssd1306_display();

    ESP_LOGI(TAG, "Display updated");
}
```

### 5.5 AHT20 + BMP280 센서

```c
/**
 * UTTEC Lab AI - Environment Sensor Example
 * I2C를 이용한 AHT20, BMP280 센서 읽기
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/i2c.h"
#include "esp_log.h"

#define I2C_MASTER_NUM      I2C_NUM_0
#define I2C_SDA_PIN         GPIO_NUM_8
#define I2C_SCL_PIN         GPIO_NUM_10

#define AHT20_ADDR          0x38
#define BMP280_ADDR         0x76

static const char *TAG = "SENSOR";

// 센서 데이터 구조체
typedef struct {
    float temperature;  // °C
    float humidity;     // %
    float pressure;     // hPa
} sensor_data_t;

// I2C 초기화
esp_err_t i2c_init(void)
{
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_SDA_PIN,
        .scl_io_num = I2C_SCL_PIN,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = 400000,
    };

    esp_err_t err = i2c_param_config(I2C_MASTER_NUM, &conf);
    if (err != ESP_OK) return err;

    return i2c_driver_install(I2C_MASTER_NUM, conf.mode, 0, 0, 0);
}

// AHT20 초기화
esp_err_t aht20_init(void)
{
    uint8_t init_cmd[] = {0xBE, 0x08, 0x00};
    return i2c_master_write_to_device(I2C_MASTER_NUM, AHT20_ADDR,
                                       init_cmd, 3, pdMS_TO_TICKS(100));
}

// AHT20 데이터 읽기
esp_err_t aht20_read(float *temperature, float *humidity)
{
    uint8_t trigger_cmd[] = {0xAC, 0x33, 0x00};
    uint8_t data[7];

    // 측정 트리거
    esp_err_t err = i2c_master_write_to_device(I2C_MASTER_NUM, AHT20_ADDR,
                                                trigger_cmd, 3, pdMS_TO_TICKS(100));
    if (err != ESP_OK) return err;

    // 측정 대기
    vTaskDelay(pdMS_TO_TICKS(80));

    // 데이터 읽기
    err = i2c_master_read_from_device(I2C_MASTER_NUM, AHT20_ADDR,
                                       data, 7, pdMS_TO_TICKS(100));
    if (err != ESP_OK) return err;

    // 데이터 파싱
    uint32_t raw_humidity = ((uint32_t)data[1] << 12) |
                            ((uint32_t)data[2] << 4) |
                            (data[3] >> 4);
    uint32_t raw_temp = ((uint32_t)(data[3] & 0x0F) << 16) |
                        ((uint32_t)data[4] << 8) |
                        data[5];

    *humidity = (float)raw_humidity / 1048576.0f * 100.0f;
    *temperature = (float)raw_temp / 1048576.0f * 200.0f - 50.0f;

    return ESP_OK;
}

// BMP280 초기화
esp_err_t bmp280_init(void)
{
    // 설정 레지스터 쓰기
    uint8_t config[] = {0xF4, 0x27};  // Normal mode, oversampling
    return i2c_master_write_to_device(I2C_MASTER_NUM, BMP280_ADDR,
                                       config, 2, pdMS_TO_TICKS(100));
}

// BMP280 기압 읽기 (간단한 구현)
esp_err_t bmp280_read_pressure(float *pressure)
{
    uint8_t reg = 0xF7;
    uint8_t data[6];

    esp_err_t err = i2c_master_write_read_device(I2C_MASTER_NUM, BMP280_ADDR,
                                                  &reg, 1, data, 6,
                                                  pdMS_TO_TICKS(100));
    if (err != ESP_OK) return err;

    // 간단한 변환 (실제로는 캘리브레이션 필요)
    int32_t raw_press = ((int32_t)data[0] << 12) |
                        ((int32_t)data[1] << 4) |
                        (data[2] >> 4);

    *pressure = (float)raw_press / 256.0f;  // 근사값

    return ESP_OK;
}

// 모든 센서 읽기
esp_err_t sensor_read_all(sensor_data_t *data)
{
    esp_err_t err;

    // AHT20 읽기
    err = aht20_read(&data->temperature, &data->humidity);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "AHT20 read failed");
        return err;
    }

    // BMP280 읽기
    err = bmp280_read_pressure(&data->pressure);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "BMP280 read failed");
        return err;
    }

    return ESP_OK;
}

// 센서 데이터 출력
void sensor_print_data(const sensor_data_t *data)
{
    ESP_LOGI(TAG, "========================================");
    ESP_LOGI(TAG, "  Temperature : %.2f °C", data->temperature);
    ESP_LOGI(TAG, "  Humidity    : %.2f %%", data->humidity);
    ESP_LOGI(TAG, "  Pressure    : %.2f hPa", data->pressure);
    ESP_LOGI(TAG, "========================================");
}

void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - Environment Sensor Example");

    // I2C 초기화
    i2c_init();

    // 센서 초기화
    aht20_init();
    bmp280_init();

    vTaskDelay(pdMS_TO_TICKS(100));

    // 센서 읽기 루프
    sensor_data_t data;

    while (1) {
        if (sensor_read_all(&data) == ESP_OK) {
            sensor_print_data(&data);
        }

        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}
```

### 5.6 WiFi 연결 및 HTTP 요청

```c
/**
 * UTTEC Lab AI - WiFi & HTTP Example
 * WiFi 연결 및 HTTP GET 요청
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_http_client.h"
#include "nvs_flash.h"

#define WIFI_SSID       "YOUR_SSID"
#define WIFI_PASSWORD   "YOUR_PASSWORD"

#define WIFI_CONNECTED_BIT  BIT0
#define WIFI_FAIL_BIT       BIT1

static const char *TAG = "WIFI";
static EventGroupHandle_t wifi_event_group;
static int retry_count = 0;

// WiFi 이벤트 핸들러
static void wifi_event_handler(void *arg, esp_event_base_t event_base,
                               int32_t event_id, void *event_data)
{
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (event_base == WIFI_EVENT &&
               event_id == WIFI_EVENT_STA_DISCONNECTED) {
        if (retry_count < 5) {
            esp_wifi_connect();
            retry_count++;
            ESP_LOGI(TAG, "Retry connecting... (%d)", retry_count);
        } else {
            xEventGroupSetBits(wifi_event_group, WIFI_FAIL_BIT);
        }
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;
        ESP_LOGI(TAG, "Got IP: " IPSTR, IP2STR(&event->ip_info.ip));
        retry_count = 0;
        xEventGroupSetBits(wifi_event_group, WIFI_CONNECTED_BIT);
    }
}

// WiFi 초기화 및 연결
esp_err_t wifi_init_sta(void)
{
    wifi_event_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;

    ESP_ERROR_CHECK(esp_event_handler_instance_register(
        WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler,
        NULL, &instance_any_id));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(
        IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler,
        NULL, &instance_got_ip));

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASSWORD,
            .threshold.authmode = WIFI_AUTH_WPA2_PSK,
        },
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI(TAG, "WiFi initialization completed");

    // 연결 대기
    EventBits_t bits = xEventGroupWaitBits(wifi_event_group,
        WIFI_CONNECTED_BIT | WIFI_FAIL_BIT,
        pdFALSE, pdFALSE, portMAX_DELAY);

    if (bits & WIFI_CONNECTED_BIT) {
        ESP_LOGI(TAG, "Connected to WiFi SSID: %s", WIFI_SSID);
        return ESP_OK;
    } else {
        ESP_LOGE(TAG, "Failed to connect to WiFi");
        return ESP_FAIL;
    }
}

// HTTP 이벤트 핸들러
esp_err_t http_event_handler(esp_http_client_event_t *evt)
{
    switch (evt->event_id) {
        case HTTP_EVENT_ON_DATA:
            ESP_LOGI(TAG, "HTTP Response: %.*s", evt->data_len, (char *)evt->data);
            break;
        default:
            break;
    }
    return ESP_OK;
}

// HTTP GET 요청
void http_get_request(const char *url)
{
    esp_http_client_config_t config = {
        .url = url,
        .event_handler = http_event_handler,
    };

    esp_http_client_handle_t client = esp_http_client_init(&config);

    esp_err_t err = esp_http_client_perform(client);

    if (err == ESP_OK) {
        ESP_LOGI(TAG, "HTTP GET Status = %d, Content-Length = %lld",
                 esp_http_client_get_status_code(client),
                 esp_http_client_get_content_length(client));
    } else {
        ESP_LOGE(TAG, "HTTP GET failed: %s", esp_err_to_name(err));
    }

    esp_http_client_cleanup(client);
}

void app_main(void)
{
    ESP_LOGI(TAG, "UTTEC Lab AI - WiFi & HTTP Example");

    // NVS 초기화
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES ||
        ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    // WiFi 연결
    if (wifi_init_sta() == ESP_OK) {
        // HTTP 요청 테스트
        http_get_request("http://httpbin.org/get");
    }
}
```

### 5.7 통합 예제 - AI 환경 모니터링

```c
/**
 * UTTEC Lab AI - Integrated Example
 * 모든 기능을 통합한 AI 환경 모니터링 시스템
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"

// 각 모듈 헤더 (위 예제들의 함수 사용)
#include "led_control.h"
#include "buzzer.h"
#include "button.h"
#include "oled_display.h"
#include "sensor.h"
#include "wifi_manager.h"

static const char *TAG = "MAIN";

// 경고 임계값
#define TEMP_HIGH_THRESHOLD     30.0f
#define HUMIDITY_HIGH_THRESHOLD 80.0f

// 상태 표시 태스크
void status_led_task(void *arg)
{
    while (1) {
        led_toggle(LED_BLUE_PIN);  // 동작 중 표시
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}

// 센서 읽기 태스크
void sensor_task(void *arg)
{
    sensor_data_t data;
    char display_buf[64];

    while (1) {
        // 센서 읽기
        if (sensor_read_all(&data) == ESP_OK) {
            // 콘솔 출력
            ESP_LOGI(TAG, "Temp: %.1f°C, Humidity: %.1f%%, Press: %.1fhPa",
                     data.temperature, data.humidity, data.pressure);

            // OLED 표시
            ssd1306_clear();
            sprintf(display_buf, "Temp: %.1f C", data.temperature);
            ssd1306_draw_string(0, 0, display_buf);
            sprintf(display_buf, "Humi: %.1f %%", data.humidity);
            ssd1306_draw_string(0, 16, display_buf);
            sprintf(display_buf, "Press: %.0f hPa", data.pressure);
            ssd1306_draw_string(0, 32, display_buf);
            ssd1306_display();

            // 경고 체크
            if (data.temperature > TEMP_HIGH_THRESHOLD) {
                led_on(LED_RED_PIN);
                buzzer_beep(2, 100);
                ESP_LOGW(TAG, "High temperature warning!");
            } else {
                led_off(LED_RED_PIN);
            }

            if (data.humidity > HUMIDITY_HIGH_THRESHOLD) {
                led_on(LED_YELLOW_PIN);
                ESP_LOGW(TAG, "High humidity warning!");
            } else {
                led_off(LED_YELLOW_PIN);
            }
        }

        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

// 버튼 콜백
void button_callback(void)
{
    ESP_LOGI(TAG, "Button pressed - Manual refresh");
    buzzer_beep(1, 50);
}

void app_main(void)
{
    ESP_LOGI(TAG, "========================================");
    ESP_LOGI(TAG, "    UTTEC Lab AI - Environment Monitor  ");
    ESP_LOGI(TAG, "========================================");

    // 모든 모듈 초기화
    led_init();
    buzzer_init();
    button_init(button_callback);
    i2c_init();
    ssd1306_init();
    aht20_init();
    bmp280_init();

    // 시작 알림
    buzzer_beep(3, 100);
    led_all_off();

    // 시작 화면
    ssd1306_clear();
    ssd1306_draw_string(20, 10, "UTTEC Lab AI");
    ssd1306_draw_string(10, 30, "Environment Monitor");
    ssd1306_draw_string(30, 50, "Starting...");
    ssd1306_display();
    vTaskDelay(pdMS_TO_TICKS(2000));

    // WiFi 연결 (선택)
    // wifi_init_sta();

    // 태스크 생성
    xTaskCreate(status_led_task, "status_led", 2048, NULL, 5, NULL);
    xTaskCreate(sensor_task, "sensor", 4096, NULL, 10, NULL);

    ESP_LOGI(TAG, "System started successfully!");
}
```

---

## 6. 교육 커리큘럼

### 6.1 단계별 학습

| 단계 | 주제 | 실습 내용 | 학습 목표 |
|------|------|-----------|-----------|
| **1주차** | C 기초, 개발환경 | ESP-IDF 설치, Hello World | 개발환경 구축 |
| **2주차** | GPIO 출력 | LED 제어, 신호등 | 디지털 출력 |
| **3주차** | GPIO 입력 | 버튼, 인터럽트 | 디지털 입력, ISR |
| **4주차** | PWM | 버저 멜로디 | PWM 제어 |
| **5주차** | I2C 기초 | OLED 텍스트 출력 | I2C 프로토콜 |
| **6주차** | I2C 센서 | 온습도 측정 | 센서 인터페이스 |
| **7주차** | WiFi 연결 | AP 연결, IP 획득 | 네트워크 기초 |
| **8주차** | HTTP 통신 | REST API 호출 | 웹 통신 |
| **9주차** | RTOS 기초 | 멀티태스킹 | FreeRTOS |
| **10주차** | 종합 프로젝트 | IoT 환경 모니터 | 통합 실습 |

---

## 7. 기술 사양

### 7.1 보드 사양

| 항목 | 사양 |
|------|------|
| **모델** | UTTEC Lab AI |
| **MCU** | ESP32 WROOM (Xtensa LX6 Dual-Core, 240MHz) |
| **Flash** | 4MB |
| **SRAM** | 520KB |
| **무선** | WiFi 802.11 b/g/n, Bluetooth Classic + BLE 4.2 |
| **USB** | USB-C (전원/프로그래밍) |
| **전원** | 5V (USB), 3.3V (내부) |
| **크기** | 약 60 x 60 mm |

### 7.2 센서 사양

| 센서 | 측정 범위 | 정확도 |
|------|-----------|--------|
| **AHT20 온도** | -40°C ~ 85°C | ±0.3°C |
| **AHT20 습도** | 0~100% RH | ±2% RH |
| **BMP280 기압** | 300~1100 hPa | ±1 hPa |

### 7.3 I/O 사양

| 항목 | 사양 |
|------|------|
| **LED** | 3개 (빨강, 노랑, 파랑) |
| **버저** | 피에조 버저 (PWM) |
| **스위치** | 택트 스위치 1개 |
| **디스플레이** | SSD1306 OLED (128x64) |
| **I2C 확장** | 4핀 헤더 |

---

## 8. 문의

### 제품 정보
- **제품명**: UTTEC Lab AI
- **용도**: AI C 프로그래밍 교육
- **버전**: 2025.08

### 연락처
- **제조사**: UTTEC
- **이메일**:
- **웹사이트**:

---

*© 2025 UTTEC Lab AI. All Rights Reserved.*
