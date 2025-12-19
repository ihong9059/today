# UTTEC Lab - ESP32-C6 LCD Education System
## ESP32-C6 기반 컬러 LCD AI C 프로그래밍 교육 보드

---

## 1. 제품 개요

### 1.1 제품 소개

**UTTEC Lab ESP32-C6 LCD**는 컬러 TFT LCD와 SD 카드를 탑재한 **소형 AI C 프로그래밍 교육용 개발 보드**입니다.
고해상도 컬러 디스플레이를 통해 GUI 프로그래밍과 파일 시스템 학습이 가능하며,
ESP32-C6의 WiFi 6 및 BLE 5.0을 활용한 최신 IoT 기술을 학습할 수 있습니다.

### 1.2 제품 특징

| 특징 | 설명 |
|------|------|
| **컬러 LCD** | 172x320 TFT LCD (풀컬러 GUI) |
| **SD 카드** | 파일 시스템, 데이터 로깅 |
| **WiFi 6 지원** | ESP32-C6 최신 무선 통신 |
| **소형 설계** | 휴대 가능한 컴팩트 사이즈 |
| **USB-C** | 편리한 전원 및 프로그래밍 |
| **RGB LED** | WS2812 네오픽셀 LED |

### 1.3 교육 목표

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Learning Objectives                             │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
  │   C 언어 기초    │   │   GUI 프로그래밍  │   │   IoT / AI     │
  │                 │   │                 │   │                 │
  │ • 변수, 자료형   │   │ • LCD 그래픽     │   │ • WiFi 6 통신   │
  │ • 조건문, 반복문 │──▶│ • 한글/영문 폰트  │──▶│ • BLE 5.0      │
  │ • 함수, 구조체   │   │ • 터치/버튼 UI   │   │ • 파일 시스템   │
  │ • 포인터, 메모리 │   │ • 메뉴 시스템    │   │ • AI API 연동   │
  └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 1.4 대상 사용자

- C/GUI 프로그래밍 학습자
- 임베디드 시스템 입문자
- IoT 디바이스 개발자
- 휴대용 장치 프로토타이핑
- 메이커 및 취미 개발자

---

## 2. 하드웨어 구성

### 2.1 보드 레이아웃

```
┌─────────────────────────────────────────────────────────────────────┐
│                 UTTEC Lab ESP32-C6 LCD Board                        │
│                      (Compact Design)                               │
└─────────────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │   USB-C     │
                    │  Connector  │
                    └──────┬──────┘
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
         │  ┌─────────────────────────────┐  │
         │  │                             │  │
         │  │      172 x 320 TFT LCD      │  │
         │  │       (Color Display)       │  │
         │  │                             │  │
         │  │  ┌───────────────────────┐  │  │
         │  │  │     제품 소개          │  │  │
         │  │  ├───────────────────────┤  │  │
         │  │  │     SD 카드 정보       │  │  │
         │  │  │  상태: 정상            │  │  │
         │  │  │  타입: SDHC           │  │  │
         │  │  │  용: 30528 MB         │  │  │
         │  │  │  사용: 0 MB           │  │  │
         │  │  ├───────────────────────┤  │  │
         │  │  │     파일 목록          │  │  │
         │  │  │    (비어 있음)         │  │  │
         │  │  ├───────────────────────┤  │  │
         │  │  │    [UTTEC Lab]        │  │  │
         │  │  └───────────────────────┘  │  │
         │  │                             │  │
         │  └─────────────────────────────┘  │
         │                                   │
         │  ┌─────────┐    ┌─────────────┐  │
         │  │ ESP32-C6│    │  SD Card    │  │
         │  │ Module  │    │   Slot      │  │
         │  └─────────┘    └─────────────┘  │
         │                                   │
         │  ┌─────────┐    ┌─────────────┐  │
         │  │ WS2812  │    │   Buttons   │  │
         │  │RGB LED  │    │             │  │
         │  └─────────┘    └─────────────┘  │
         │                                   │
         └───────────────────────────────────┘
```

### 2.2 구성 요소 상세

| 구성요소 | 모델/사양 | 인터페이스 | 기능 |
|----------|-----------|------------|------|
| **MCU** | ESP32-C6 (RISC-V) | - | 메인 프로세서, WiFi 6/BLE 5.0 |
| **LCD** | TFT 172x320 (ST7789) | SPI | 컬러 그래픽 디스플레이 |
| **SD Card** | Micro SD (SDHC/SDXC) | SPI/SDIO | 파일 저장, 데이터 로깅 |
| **RGB LED** | WS2812 (NeoPixel) | 1-Wire | 상태 표시, 효과 |
| **USB** | USB-C | USB | 전원/프로그래밍/시리얼 |
| **버튼** | 택트 스위치 | GPIO | 사용자 입력, 메뉴 조작 |

### 2.3 ESP32-C6 모듈 특징

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ESP32-C6 Specifications                          │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Core        : RISC-V 32-bit Single Core                      │
  │   Clock       : Up to 160 MHz                                  │
  │   Flash       : 4 MB (External)                                │
  │   SRAM        : 512 KB                                         │
  │                                                                 │
  │   WiFi        : 802.11ax (WiFi 6) - 2.4 GHz                   │
  │   Bluetooth   : BLE 5.0 (Long Range, 2Mbps)                   │
  │   802.15.4    : Zigbee / Thread 지원                           │
  │                                                                 │
  │   GPIO        : 30 Programmable GPIOs                          │
  │   ADC         : 12-bit SAR ADC, 7 channels                    │
  │   I2C         : 2 × I2C                                        │
  │   SPI         : 3 × SPI (LCD, SD Card)                        │
  │   UART        : 2 × UART                                       │
  │   PWM         : 6 × PWM channels                               │
  │   USB         : USB Serial/JTAG                                │
  │                                                                 │
  │   Low Power   : Deep Sleep < 7µA                               │
  │   Temperature : -40°C to 105°C                                 │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

### 2.4 LCD 디스플레이 사양

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LCD Display Specifications                       │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Type        : TFT LCD (IPS)                                  │
  │   Controller  : ST7789 (또는 호환)                              │
  │   Resolution  : 172 x 320 pixels                               │
  │   Color Depth : 16-bit (65,536 colors)                         │
  │   Interface   : SPI (4-wire)                                   │
  │   Backlight   : LED (밝기 조절 가능)                            │
  │                                                                 │
  │   Display Area:                                                 │
  │   ┌─────────────────────────────────┐                          │
  │   │           172 pixels            │                          │
  │   │  ┌───────────────────────────┐  │                          │
  │   │  │                           │  │  320                     │
  │   │  │      Display Area         │  │  pixels                  │
  │   │  │                           │  │                          │
  │   │  │   한글/영문 텍스트 출력     │  │                          │
  │   │  │   그래픽/이미지 표시       │  │                          │
  │   │  │   메뉴 UI 구현            │  │                          │
  │   │  │                           │  │                          │
  │   │  └───────────────────────────┘  │                          │
  │   └─────────────────────────────────┘                          │
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
                                       │ WiFi 6
                                       │
         USB-C ════════════════════════╪════════════════════════
           │                           │
           │    ┌──────────────────────┴──────────────────────┐
           │    │                                             │
           │    │               ESP32-C6                      │
           │    │           ┌───────────────┐                 │
           │    │           │   RISC-V      │                 │
           └────┼──────────▶│   160 MHz     │                 │
         Power  │           │               │                 │
         + USB  │           │WiFi6+BLE+Zigbee│                │
                │           └───────┬───────┘                 │
                │                   │                         │
                │    ┌──────────────┼──────────────┐         │
                │    │              │              │         │
                │    ▼              ▼              ▼         │
                │ ┌──────┐    ┌──────────┐   ┌──────────┐   │
                │ │ SPI  │    │   SPI    │   │   GPIO   │   │
                │ │(LCD) │    │(SD Card) │   │  (LED)   │   │
                │ └──┬───┘    └────┬─────┘   └────┬─────┘   │
                │    │             │              │         │
                └────┼─────────────┼──────────────┼─────────┘
                     │             │              │
                     ▼             ▼              ▼
              ┌───────────┐ ┌───────────┐ ┌───────────┐
              │  TFT LCD  │ │  SD Card  │ │  WS2812   │
              │ 172x320   │ │  Slot     │ │  RGB LED  │
              │ ST7789    │ │SDHC/SDXC  │ │           │
              └───────────┘ └───────────┘ └───────────┘
```

### 3.2 핀 맵핑

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GPIO Pin Mapping                            │
└─────────────────────────────────────────────────────────────────────┘

  LCD Display (SPI):
  ┌───────────────────────────────────────────────────────────────┐
  │  Signal       │  GPIO  │  Description                        │
  ├───────────────────────────────────────────────────────────────┤
  │  LCD_MOSI     │  GPIO6 │  SPI 데이터 출력                    │
  │  LCD_SCK      │  GPIO7 │  SPI 클럭                           │
  │  LCD_CS       │  GPIO10│  Chip Select                        │
  │  LCD_DC       │  GPIO4 │  Data/Command 선택                  │
  │  LCD_RST      │  GPIO5 │  리셋                               │
  │  LCD_BL       │  GPIO8 │  백라이트 제어 (PWM)                │
  └───────────────────────────────────────────────────────────────┘

  SD Card (SPI):
  ┌───────────────────────────────────────────────────────────────┐
  │  Signal       │  GPIO  │  Description                        │
  ├───────────────────────────────────────────────────────────────┤
  │  SD_MOSI      │  GPIO6 │  SPI 데이터 출력 (LCD와 공유)       │
  │  SD_MISO      │  GPIO2 │  SPI 데이터 입력                    │
  │  SD_SCK       │  GPIO7 │  SPI 클럭 (LCD와 공유)              │
  │  SD_CS        │  GPIO9 │  Chip Select                        │
  └───────────────────────────────────────────────────────────────┘

  Others:
  ┌───────────────────────────────────────────────────────────────┐
  │  Signal       │  GPIO  │  Description                        │
  ├───────────────────────────────────────────────────────────────┤
  │  WS2812_DATA  │  GPIO3 │  네오픽셀 LED 데이터                │
  │  BUTTON_1     │  GPIO0 │  버튼 1 (BOOT)                      │
  │  BUTTON_2     │  GPIO1 │  버튼 2                             │
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

# 3. ESP-IDF 설치 (ESP32-C6 지원)
cd ~/esp/esp-idf
./install.sh esp32c6

# 4. 환경 변수 설정
. $HOME/esp/esp-idf/export.sh

# 5. 설치 확인
idf.py --version
```

### 4.2 프로젝트 구조

```
uttec_lcd_project/
├── CMakeLists.txt
├── sdkconfig
├── main/
│   ├── CMakeLists.txt
│   ├── main.c
│   ├── lcd_driver.c
│   ├── lcd_driver.h
│   ├── lcd_gui.c
│   ├── lcd_gui.h
│   ├── sd_card.c
│   ├── sd_card.h
│   ├── ws2812.c
│   ├── ws2812.h
│   ├── menu_system.c
│   ├── menu_system.h
│   ├── font_korean.c
│   └── font_korean.h
├── components/
│   ├── lvgl/           # LVGL 그래픽 라이브러리
│   └── fatfs/          # 파일 시스템
└── README.md
```

### 4.3 빌드 및 플래시

```bash
# 1. 프로젝트 설정
idf.py set-target esp32c6

# 2. 메뉴 설정 (SPI, FATFS 등)
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

### 5.1 LCD 드라이버 (ST7789)

```c
/**
 * UTTEC Lab - LCD Driver (ST7789)
 * SPI를 이용한 172x320 TFT LCD 제어
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/spi_master.h"
#include "driver/gpio.h"
#include "esp_log.h"

// LCD 핀 정의
#define LCD_MOSI    GPIO_NUM_6
#define LCD_SCK     GPIO_NUM_7
#define LCD_CS      GPIO_NUM_10
#define LCD_DC      GPIO_NUM_4
#define LCD_RST     GPIO_NUM_5
#define LCD_BL      GPIO_NUM_8

// LCD 크기
#define LCD_WIDTH   172
#define LCD_HEIGHT  320

// 색상 정의 (RGB565)
#define COLOR_BLACK     0x0000
#define COLOR_WHITE     0xFFFF
#define COLOR_RED       0xF800
#define COLOR_GREEN     0x07E0
#define COLOR_BLUE      0x001F
#define COLOR_YELLOW    0xFFE0
#define COLOR_CYAN      0x07FF
#define COLOR_MAGENTA   0xF81F
#define COLOR_ORANGE    0xFD20

static const char *TAG = "LCD";
static spi_device_handle_t spi;

// SPI 명령 전송
static void lcd_cmd(uint8_t cmd)
{
    gpio_set_level(LCD_DC, 0);  // Command mode
    spi_transaction_t t = {
        .length = 8,
        .tx_buffer = &cmd,
    };
    spi_device_polling_transmit(spi, &t);
}

// SPI 데이터 전송
static void lcd_data(const uint8_t *data, int len)
{
    if (len == 0) return;
    gpio_set_level(LCD_DC, 1);  // Data mode
    spi_transaction_t t = {
        .length = len * 8,
        .tx_buffer = data,
    };
    spi_device_polling_transmit(spi, &t);
}

// 단일 바이트 데이터 전송
static void lcd_data_byte(uint8_t data)
{
    lcd_data(&data, 1);
}

// LCD 초기화
void lcd_init(void)
{
    // GPIO 설정
    gpio_config_t io_conf = {
        .pin_bit_mask = (1ULL << LCD_DC) | (1ULL << LCD_RST) | (1ULL << LCD_BL),
        .mode = GPIO_MODE_OUTPUT,
    };
    gpio_config(&io_conf);

    // SPI 버스 설정
    spi_bus_config_t bus_cfg = {
        .mosi_io_num = LCD_MOSI,
        .miso_io_num = -1,
        .sclk_io_num = LCD_SCK,
        .quadwp_io_num = -1,
        .quadhd_io_num = -1,
        .max_transfer_sz = LCD_WIDTH * LCD_HEIGHT * 2,
    };
    spi_bus_initialize(SPI2_HOST, &bus_cfg, SPI_DMA_CH_AUTO);

    // SPI 디바이스 설정
    spi_device_interface_config_t dev_cfg = {
        .clock_speed_hz = 40 * 1000 * 1000,  // 40MHz
        .mode = 0,
        .spics_io_num = LCD_CS,
        .queue_size = 7,
    };
    spi_bus_add_device(SPI2_HOST, &dev_cfg, &spi);

    // 하드웨어 리셋
    gpio_set_level(LCD_RST, 0);
    vTaskDelay(pdMS_TO_TICKS(100));
    gpio_set_level(LCD_RST, 1);
    vTaskDelay(pdMS_TO_TICKS(100));

    // ST7789 초기화 시퀀스
    lcd_cmd(0x01);  // Software Reset
    vTaskDelay(pdMS_TO_TICKS(150));

    lcd_cmd(0x11);  // Sleep Out
    vTaskDelay(pdMS_TO_TICKS(120));

    lcd_cmd(0x3A);  // Color Mode
    lcd_data_byte(0x55);  // 16-bit color

    lcd_cmd(0x36);  // Memory Access Control
    lcd_data_byte(0x00);

    lcd_cmd(0x21);  // Display Inversion On

    lcd_cmd(0x13);  // Normal Display Mode On

    lcd_cmd(0x29);  // Display On

    // 백라이트 ON
    gpio_set_level(LCD_BL, 1);

    ESP_LOGI(TAG, "LCD initialized: %dx%d", LCD_WIDTH, LCD_HEIGHT);
}

// 디스플레이 영역 설정
void lcd_set_window(uint16_t x0, uint16_t y0, uint16_t x1, uint16_t y1)
{
    lcd_cmd(0x2A);  // Column Address Set
    uint8_t col_data[] = {x0 >> 8, x0 & 0xFF, x1 >> 8, x1 & 0xFF};
    lcd_data(col_data, 4);

    lcd_cmd(0x2B);  // Row Address Set
    uint8_t row_data[] = {y0 >> 8, y0 & 0xFF, y1 >> 8, y1 & 0xFF};
    lcd_data(row_data, 4);

    lcd_cmd(0x2C);  // Memory Write
}

// 화면 채우기
void lcd_fill_screen(uint16_t color)
{
    lcd_set_window(0, 0, LCD_WIDTH - 1, LCD_HEIGHT - 1);

    uint8_t color_hi = color >> 8;
    uint8_t color_lo = color & 0xFF;

    // DMA 버퍼 사용
    static uint8_t *buffer = NULL;
    if (buffer == NULL) {
        buffer = heap_caps_malloc(LCD_WIDTH * 2, MALLOC_CAP_DMA);
    }

    // 한 줄씩 채우기
    for (int i = 0; i < LCD_WIDTH; i++) {
        buffer[i * 2] = color_hi;
        buffer[i * 2 + 1] = color_lo;
    }

    gpio_set_level(LCD_DC, 1);
    for (int y = 0; y < LCD_HEIGHT; y++) {
        spi_transaction_t t = {
            .length = LCD_WIDTH * 16,
            .tx_buffer = buffer,
        };
        spi_device_polling_transmit(spi, &t);
    }
}

// 사각형 그리기
void lcd_fill_rect(uint16_t x, uint16_t y, uint16_t w, uint16_t h, uint16_t color)
{
    if (x >= LCD_WIDTH || y >= LCD_HEIGHT) return;
    if (x + w > LCD_WIDTH) w = LCD_WIDTH - x;
    if (y + h > LCD_HEIGHT) h = LCD_HEIGHT - y;

    lcd_set_window(x, y, x + w - 1, y + h - 1);

    uint8_t color_hi = color >> 8;
    uint8_t color_lo = color & 0xFF;

    uint8_t *buffer = heap_caps_malloc(w * 2, MALLOC_CAP_DMA);
    for (int i = 0; i < w; i++) {
        buffer[i * 2] = color_hi;
        buffer[i * 2 + 1] = color_lo;
    }

    gpio_set_level(LCD_DC, 1);
    for (int row = 0; row < h; row++) {
        spi_transaction_t t = {
            .length = w * 16,
            .tx_buffer = buffer,
        };
        spi_device_polling_transmit(spi, &t);
    }

    free(buffer);
}

// 픽셀 그리기
void lcd_draw_pixel(uint16_t x, uint16_t y, uint16_t color)
{
    if (x >= LCD_WIDTH || y >= LCD_HEIGHT) return;

    lcd_set_window(x, y, x, y);

    uint8_t data[] = {color >> 8, color & 0xFF};
    lcd_data(data, 2);
}

// 수평선 그리기
void lcd_draw_hline(uint16_t x, uint16_t y, uint16_t w, uint16_t color)
{
    lcd_fill_rect(x, y, w, 1, color);
}

// 수직선 그리기
void lcd_draw_vline(uint16_t x, uint16_t y, uint16_t h, uint16_t color)
{
    lcd_fill_rect(x, y, 1, h, color);
}

// 사각형 테두리 그리기
void lcd_draw_rect(uint16_t x, uint16_t y, uint16_t w, uint16_t h, uint16_t color)
{
    lcd_draw_hline(x, y, w, color);
    lcd_draw_hline(x, y + h - 1, w, color);
    lcd_draw_vline(x, y, h, color);
    lcd_draw_vline(x + w - 1, y, h, color);
}

// 백라이트 밝기 설정 (0-100)
void lcd_set_brightness(uint8_t brightness)
{
    // PWM으로 구현 가능
    gpio_set_level(LCD_BL, brightness > 0 ? 1 : 0);
}

// RGB888을 RGB565로 변환
uint16_t lcd_color_rgb(uint8_t r, uint8_t g, uint8_t b)
{
    return ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);
}
```

### 5.2 GUI 및 텍스트 출력

```c
/**
 * UTTEC Lab - LCD GUI
 * 텍스트 및 GUI 요소 출력
 */

#include <stdio.h>
#include <string.h>
#include "lcd_driver.h"
#include "esp_log.h"

static const char *TAG = "LCD_GUI";

// 간단한 8x16 ASCII 폰트 (일부)
static const uint8_t font_8x16[][16] = {
    // Space (32)
    {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
     0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00},
    // ... 추가 문자들
};

// 한글 폰트 (16x16) - 예시
typedef struct {
    uint16_t code;      // 유니코드
    uint8_t bitmap[32]; // 16x16 = 32 bytes
} korean_char_t;

// 문자 출력 (ASCII)
void lcd_draw_char(uint16_t x, uint16_t y, char c, uint16_t fg, uint16_t bg)
{
    if (c < 32 || c > 126) c = ' ';

    for (int row = 0; row < 16; row++) {
        uint8_t line = font_8x16[c - 32][row];
        for (int col = 0; col < 8; col++) {
            uint16_t color = (line & (0x80 >> col)) ? fg : bg;
            lcd_draw_pixel(x + col, y + row, color);
        }
    }
}

// 문자열 출력
void lcd_draw_string(uint16_t x, uint16_t y, const char *str,
                     uint16_t fg, uint16_t bg)
{
    while (*str) {
        lcd_draw_char(x, y, *str, fg, bg);
        x += 8;
        str++;
    }
}

// 정수 출력
void lcd_draw_number(uint16_t x, uint16_t y, int32_t num,
                     uint16_t fg, uint16_t bg)
{
    char buf[16];
    sprintf(buf, "%ld", num);
    lcd_draw_string(x, y, buf, fg, bg);
}

// 버튼 그리기
void lcd_draw_button(uint16_t x, uint16_t y, uint16_t w, uint16_t h,
                     const char *text, uint16_t bg_color, uint16_t text_color)
{
    // 배경
    lcd_fill_rect(x, y, w, h, bg_color);

    // 테두리
    lcd_draw_rect(x, y, w, h, COLOR_WHITE);

    // 텍스트 (중앙 정렬)
    int text_len = strlen(text);
    int text_x = x + (w - text_len * 8) / 2;
    int text_y = y + (h - 16) / 2;
    lcd_draw_string(text_x, text_y, text, text_color, bg_color);
}

// 프로그레스 바 그리기
void lcd_draw_progress_bar(uint16_t x, uint16_t y, uint16_t w, uint16_t h,
                           uint8_t percent, uint16_t fg, uint16_t bg)
{
    // 배경
    lcd_fill_rect(x, y, w, h, bg);

    // 테두리
    lcd_draw_rect(x, y, w, h, COLOR_WHITE);

    // 채움
    if (percent > 100) percent = 100;
    uint16_t fill_w = (w - 4) * percent / 100;
    lcd_fill_rect(x + 2, y + 2, fill_w, h - 4, fg);
}

// 헤더 바 그리기
void lcd_draw_header(const char *title, uint16_t bg_color)
{
    lcd_fill_rect(0, 0, LCD_WIDTH, 30, bg_color);
    lcd_draw_string(10, 7, title, COLOR_WHITE, bg_color);
}

// 메뉴 아이템 그리기
void lcd_draw_menu_item(uint16_t y, const char *text,
                        bool selected, uint16_t bg_color)
{
    uint16_t fg = selected ? COLOR_BLACK : COLOR_WHITE;
    uint16_t bg = selected ? COLOR_CYAN : bg_color;

    lcd_fill_rect(0, y, LCD_WIDTH, 25, bg);
    lcd_draw_string(10, y + 5, text, fg, bg);

    if (selected) {
        lcd_draw_string(LCD_WIDTH - 20, y + 5, ">", fg, bg);
    }
}

// 정보 박스 그리기
void lcd_draw_info_box(uint16_t x, uint16_t y, uint16_t w, uint16_t h,
                       const char *title, uint16_t title_bg)
{
    // 타이틀 바
    lcd_fill_rect(x, y, w, 25, title_bg);
    lcd_draw_string(x + 5, y + 5, title, COLOR_WHITE, title_bg);

    // 본문 영역
    lcd_fill_rect(x, y + 25, w, h - 25, COLOR_BLACK);
    lcd_draw_rect(x, y, w, h, COLOR_WHITE);
}
```

### 5.3 SD 카드 파일 시스템

```c
/**
 * UTTEC Lab - SD Card Driver
 * FATFS를 이용한 SD 카드 파일 시스템
 */

#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <dirent.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_vfs_fat.h"
#include "sdmmc_cmd.h"
#include "driver/sdspi_host.h"
#include "driver/spi_common.h"
#include "esp_log.h"

// SD 카드 핀 정의
#define SD_MOSI     GPIO_NUM_6
#define SD_MISO     GPIO_NUM_2
#define SD_SCK      GPIO_NUM_7
#define SD_CS       GPIO_NUM_9

#define MOUNT_POINT "/sdcard"

static const char *TAG = "SD_CARD";
static sdmmc_card_t *card = NULL;

// SD 카드 정보 구조체
typedef struct {
    bool mounted;
    char type[16];          // SD, SDHC, SDXC
    uint64_t capacity_mb;   // 용량 (MB)
    uint64_t used_mb;       // 사용량 (MB)
    uint64_t free_mb;       // 여유 공간 (MB)
} sd_card_info_t;

// SD 카드 마운트
esp_err_t sd_card_mount(void)
{
    esp_err_t ret;

    // 마운트 설정
    esp_vfs_fat_sdmmc_mount_config_t mount_config = {
        .format_if_mount_failed = false,
        .max_files = 5,
        .allocation_unit_size = 16 * 1024
    };

    // SPI 버스 설정
    spi_bus_config_t bus_cfg = {
        .mosi_io_num = SD_MOSI,
        .miso_io_num = SD_MISO,
        .sclk_io_num = SD_SCK,
        .quadwp_io_num = -1,
        .quadhd_io_num = -1,
        .max_transfer_sz = 4000,
    };

    // SPI 버스 초기화 (LCD와 다른 호스트 사용 또는 공유)
    ret = spi_bus_initialize(SPI3_HOST, &bus_cfg, SPI_DMA_CH_AUTO);
    if (ret != ESP_OK && ret != ESP_ERR_INVALID_STATE) {
        ESP_LOGE(TAG, "Failed to initialize SPI bus");
        return ret;
    }

    // SD SPI 장치 설정
    sdspi_device_config_t slot_config = SDSPI_DEVICE_CONFIG_DEFAULT();
    slot_config.gpio_cs = SD_CS;
    slot_config.host_id = SPI3_HOST;

    // SD 호스트 설정
    sdmmc_host_t host = SDSPI_HOST_DEFAULT();
    host.slot = SPI3_HOST;

    // 마운트
    ret = esp_vfs_fat_sdspi_mount(MOUNT_POINT, &host, &slot_config,
                                   &mount_config, &card);

    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "Failed to mount SD card: %s", esp_err_to_name(ret));
        return ret;
    }

    ESP_LOGI(TAG, "SD card mounted at %s", MOUNT_POINT);
    sdmmc_card_print_info(stdout, card);

    return ESP_OK;
}

// SD 카드 언마운트
esp_err_t sd_card_unmount(void)
{
    esp_err_t ret = esp_vfs_fat_sdcard_unmount(MOUNT_POINT, card);
    if (ret == ESP_OK) {
        ESP_LOGI(TAG, "SD card unmounted");
        card = NULL;
    }
    return ret;
}

// SD 카드 정보 가져오기
esp_err_t sd_card_get_info(sd_card_info_t *info)
{
    if (card == NULL) {
        info->mounted = false;
        return ESP_ERR_INVALID_STATE;
    }

    info->mounted = true;

    // 카드 타입
    if (card->ocr & SD_OCR_SDHC_CAP) {
        if (card->csd.capacity > 32 * 1024 * 1024) {
            strcpy(info->type, "SDXC");
        } else {
            strcpy(info->type, "SDHC");
        }
    } else {
        strcpy(info->type, "SD");
    }

    // 용량 계산
    info->capacity_mb = ((uint64_t)card->csd.capacity) *
                        card->csd.sector_size / (1024 * 1024);

    // 사용량 계산 (FATFS)
    FATFS *fs;
    DWORD free_clusters;
    if (f_getfree(MOUNT_POINT, &free_clusters, &fs) == FR_OK) {
        uint64_t total_sectors = (fs->n_fatent - 2) * fs->csize;
        uint64_t free_sectors = free_clusters * fs->csize;

        info->free_mb = free_sectors * 512 / (1024 * 1024);
        info->used_mb = info->capacity_mb - info->free_mb;
    }

    return ESP_OK;
}

// 파일 목록 가져오기
int sd_card_list_files(const char *path, char files[][64], int max_files)
{
    DIR *dir = opendir(path);
    if (dir == NULL) {
        ESP_LOGE(TAG, "Failed to open directory: %s", path);
        return -1;
    }

    int count = 0;
    struct dirent *entry;

    while ((entry = readdir(dir)) != NULL && count < max_files) {
        strncpy(files[count], entry->d_name, 63);
        files[count][63] = '\0';
        count++;
    }

    closedir(dir);
    return count;
}

// 파일 읽기
esp_err_t sd_card_read_file(const char *filename, char *buffer, size_t max_len)
{
    char filepath[128];
    snprintf(filepath, sizeof(filepath), "%s/%s", MOUNT_POINT, filename);

    FILE *f = fopen(filepath, "r");
    if (f == NULL) {
        ESP_LOGE(TAG, "Failed to open file: %s", filepath);
        return ESP_FAIL;
    }

    size_t read_len = fread(buffer, 1, max_len - 1, f);
    buffer[read_len] = '\0';

    fclose(f);
    return ESP_OK;
}

// 파일 쓰기
esp_err_t sd_card_write_file(const char *filename, const char *data)
{
    char filepath[128];
    snprintf(filepath, sizeof(filepath), "%s/%s", MOUNT_POINT, filename);

    FILE *f = fopen(filepath, "w");
    if (f == NULL) {
        ESP_LOGE(TAG, "Failed to create file: %s", filepath);
        return ESP_FAIL;
    }

    fprintf(f, "%s", data);
    fclose(f);

    ESP_LOGI(TAG, "File written: %s", filepath);
    return ESP_OK;
}

// 파일 추가 (Append)
esp_err_t sd_card_append_file(const char *filename, const char *data)
{
    char filepath[128];
    snprintf(filepath, sizeof(filepath), "%s/%s", MOUNT_POINT, filename);

    FILE *f = fopen(filepath, "a");
    if (f == NULL) {
        ESP_LOGE(TAG, "Failed to open file for append: %s", filepath);
        return ESP_FAIL;
    }

    fprintf(f, "%s", data);
    fclose(f);

    return ESP_OK;
}

// 파일 삭제
esp_err_t sd_card_delete_file(const char *filename)
{
    char filepath[128];
    snprintf(filepath, sizeof(filepath), "%s/%s", MOUNT_POINT, filename);

    if (remove(filepath) == 0) {
        ESP_LOGI(TAG, "File deleted: %s", filepath);
        return ESP_OK;
    }

    ESP_LOGE(TAG, "Failed to delete file: %s", filepath);
    return ESP_FAIL;
}

// 파일 존재 확인
bool sd_card_file_exists(const char *filename)
{
    char filepath[128];
    snprintf(filepath, sizeof(filepath), "%s/%s", MOUNT_POINT, filename);

    struct stat st;
    return (stat(filepath, &st) == 0);
}
```

### 5.4 WS2812 RGB LED

```c
/**
 * UTTEC Lab - WS2812 RGB LED Driver
 * RMT를 이용한 네오픽셀 LED 제어
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/rmt_tx.h"
#include "esp_log.h"

#define WS2812_PIN      GPIO_NUM_3
#define WS2812_NUM_LEDS 1       // LED 개수

static const char *TAG = "WS2812";

// RMT 인코더
static rmt_channel_handle_t led_chan = NULL;
static rmt_encoder_handle_t led_encoder = NULL;

// LED 색상 버퍼
static uint8_t led_buffer[WS2812_NUM_LEDS * 3];  // GRB 순서

// WS2812 타이밍 (나노초)
typedef struct {
    uint32_t resolution_hz;
    uint32_t t0h_ticks;
    uint32_t t0l_ticks;
    uint32_t t1h_ticks;
    uint32_t t1l_ticks;
    uint32_t reset_ticks;
} ws2812_timing_t;

// 초기화
esp_err_t ws2812_init(void)
{
    // RMT TX 채널 설정
    rmt_tx_channel_config_t tx_chan_config = {
        .gpio_num = WS2812_PIN,
        .clk_src = RMT_CLK_SRC_DEFAULT,
        .resolution_hz = 10000000,  // 10MHz, 0.1us
        .mem_block_symbols = 64,
        .trans_queue_depth = 4,
    };
    ESP_ERROR_CHECK(rmt_new_tx_channel(&tx_chan_config, &led_chan));

    // 바이트 인코더 설정
    rmt_bytes_encoder_config_t bytes_encoder_config = {
        .bit0 = {
            .level0 = 1,
            .duration0 = 3,  // 0.3us
            .level1 = 0,
            .duration1 = 9,  // 0.9us
        },
        .bit1 = {
            .level0 = 1,
            .duration0 = 9,  // 0.9us
            .level1 = 0,
            .duration1 = 3,  // 0.3us
        },
        .flags.msb_first = 1,
    };
    ESP_ERROR_CHECK(rmt_new_bytes_encoder(&bytes_encoder_config, &led_encoder));

    // 채널 활성화
    ESP_ERROR_CHECK(rmt_enable(led_chan));

    // 버퍼 초기화
    memset(led_buffer, 0, sizeof(led_buffer));

    ESP_LOGI(TAG, "WS2812 initialized with %d LEDs", WS2812_NUM_LEDS);
    return ESP_OK;
}

// LED 색상 설정 (RGB)
void ws2812_set_color(uint8_t index, uint8_t r, uint8_t g, uint8_t b)
{
    if (index >= WS2812_NUM_LEDS) return;

    // WS2812는 GRB 순서
    led_buffer[index * 3 + 0] = g;
    led_buffer[index * 3 + 1] = r;
    led_buffer[index * 3 + 2] = b;
}

// 모든 LED 같은 색상 설정
void ws2812_set_all(uint8_t r, uint8_t g, uint8_t b)
{
    for (int i = 0; i < WS2812_NUM_LEDS; i++) {
        ws2812_set_color(i, r, g, b);
    }
}

// LED 끄기
void ws2812_clear(void)
{
    memset(led_buffer, 0, sizeof(led_buffer));
    ws2812_show();
}

// 버퍼 내용을 LED에 출력
esp_err_t ws2812_show(void)
{
    rmt_transmit_config_t tx_config = {
        .loop_count = 0,
    };

    ESP_ERROR_CHECK(rmt_transmit(led_chan, led_encoder,
                                  led_buffer, sizeof(led_buffer),
                                  &tx_config));

    // 전송 완료 대기
    ESP_ERROR_CHECK(rmt_tx_wait_all_done(led_chan, portMAX_DELAY));

    return ESP_OK;
}

// HSV to RGB 변환
void ws2812_hsv_to_rgb(uint16_t h, uint8_t s, uint8_t v,
                       uint8_t *r, uint8_t *g, uint8_t *b)
{
    h = h % 360;
    uint8_t region = h / 60;
    uint8_t remainder = (h - (region * 60)) * 255 / 60;

    uint8_t p = (v * (255 - s)) / 255;
    uint8_t q = (v * (255 - ((s * remainder) / 255))) / 255;
    uint8_t t = (v * (255 - ((s * (255 - remainder)) / 255))) / 255;

    switch (region) {
        case 0: *r = v; *g = t; *b = p; break;
        case 1: *r = q; *g = v; *b = p; break;
        case 2: *r = p; *g = v; *b = t; break;
        case 3: *r = p; *g = q; *b = v; break;
        case 4: *r = t; *g = p; *b = v; break;
        default: *r = v; *g = p; *b = q; break;
    }
}

// 무지개 효과
void ws2812_rainbow(uint8_t brightness)
{
    static uint16_t hue = 0;
    uint8_t r, g, b;

    for (int i = 0; i < WS2812_NUM_LEDS; i++) {
        uint16_t pixel_hue = hue + (i * 360 / WS2812_NUM_LEDS);
        ws2812_hsv_to_rgb(pixel_hue, 255, brightness, &r, &g, &b);
        ws2812_set_color(i, r, g, b);
    }

    ws2812_show();
    hue = (hue + 1) % 360;
}

// 깜빡임 효과
void ws2812_blink(uint8_t r, uint8_t g, uint8_t b, int times, int delay_ms)
{
    for (int i = 0; i < times; i++) {
        ws2812_set_all(r, g, b);
        ws2812_show();
        vTaskDelay(pdMS_TO_TICKS(delay_ms));

        ws2812_clear();
        vTaskDelay(pdMS_TO_TICKS(delay_ms));
    }
}

// 숨쉬기 효과
void ws2812_breathe(uint8_t r, uint8_t g, uint8_t b, int cycles)
{
    for (int c = 0; c < cycles; c++) {
        // 밝아지기
        for (int brightness = 0; brightness <= 255; brightness += 5) {
            uint8_t br = r * brightness / 255;
            uint8_t bg = g * brightness / 255;
            uint8_t bb = b * brightness / 255;
            ws2812_set_all(br, bg, bb);
            ws2812_show();
            vTaskDelay(pdMS_TO_TICKS(10));
        }
        // 어두워지기
        for (int brightness = 255; brightness >= 0; brightness -= 5) {
            uint8_t br = r * brightness / 255;
            uint8_t bg = g * brightness / 255;
            uint8_t bb = b * brightness / 255;
            ws2812_set_all(br, bg, bb);
            ws2812_show();
            vTaskDelay(pdMS_TO_TICKS(10));
        }
    }
}
```

### 5.5 메인 애플리케이션 - 제품 소개 UI

```c
/**
 * UTTEC Lab - Main Application
 * 제품 소개 및 SD 카드 정보 표시
 */

#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "lcd_driver.h"
#include "lcd_gui.h"
#include "sd_card.h"
#include "ws2812.h"

static const char *TAG = "MAIN";

// 메뉴 상태
typedef enum {
    MENU_PRODUCT_INFO,
    MENU_SD_CARD_INFO,
    MENU_FILE_LIST,
    MENU_SETTINGS
} menu_state_t;

static menu_state_t current_menu = MENU_PRODUCT_INFO;

// 제품 소개 화면
void draw_product_info_screen(void)
{
    lcd_fill_screen(COLOR_BLACK);

    // 헤더
    lcd_draw_header("제품 소개", COLOR_ORANGE);

    // 제품 정보
    lcd_draw_string(10, 40, "UTTEC Lab", COLOR_CYAN, COLOR_BLACK);
    lcd_draw_string(10, 60, "ESP32-C6 LCD Board", COLOR_WHITE, COLOR_BLACK);
    lcd_draw_string(10, 80, "Ver 1.0", COLOR_WHITE, COLOR_BLACK);

    // 사양
    lcd_draw_string(10, 110, "CPU: ESP32-C6", COLOR_GREEN, COLOR_BLACK);
    lcd_draw_string(10, 130, "LCD: 172x320 TFT", COLOR_GREEN, COLOR_BLACK);
    lcd_draw_string(10, 150, "WiFi: 802.11ax", COLOR_GREEN, COLOR_BLACK);
    lcd_draw_string(10, 170, "BLE: 5.0", COLOR_GREEN, COLOR_BLACK);

    // 하단 버튼
    lcd_draw_button(10, LCD_HEIGHT - 40, LCD_WIDTH - 20, 30,
                    "UTTEC Lab", COLOR_CYAN, COLOR_BLACK);
}

// SD 카드 정보 화면
void draw_sd_card_info_screen(void)
{
    lcd_fill_screen(COLOR_BLACK);

    // 헤더
    lcd_draw_header("SD 카드 정보", COLOR_BLUE);

    // SD 카드 정보 가져오기
    sd_card_info_t info;
    esp_err_t ret = sd_card_get_info(&info);

    if (ret == ESP_OK && info.mounted) {
        char buf[32];

        lcd_draw_string(10, 45, "상태: 정상", COLOR_GREEN, COLOR_BLACK);

        sprintf(buf, "타입: %s", info.type);
        lcd_draw_string(10, 65, buf, COLOR_WHITE, COLOR_BLACK);

        sprintf(buf, "용: %llu MB", info.capacity_mb);
        lcd_draw_string(10, 85, buf, COLOR_WHITE, COLOR_BLACK);

        sprintf(buf, "사용: %llu MB", info.used_mb);
        lcd_draw_string(10, 105, buf, COLOR_WHITE, COLOR_BLACK);

        // 사용량 프로그레스 바
        uint8_t percent = (info.used_mb * 100) / info.capacity_mb;
        lcd_draw_progress_bar(10, 130, LCD_WIDTH - 20, 20,
                              percent, COLOR_CYAN, COLOR_BLACK);
    } else {
        lcd_draw_string(10, 45, "상태: 없음", COLOR_RED, COLOR_BLACK);
        lcd_draw_string(10, 65, "SD 카드를 삽입하세요", COLOR_YELLOW, COLOR_BLACK);
    }

    // 파일 목록 섹션
    lcd_fill_rect(0, 160, LCD_WIDTH, 25, COLOR_BLUE);
    lcd_draw_string(10, 165, "파일 목록", COLOR_WHITE, COLOR_BLUE);

    // 파일 목록 표시
    char files[10][64];
    int file_count = sd_card_list_files(MOUNT_POINT, files, 10);

    if (file_count > 0) {
        for (int i = 0; i < file_count && i < 5; i++) {
            lcd_draw_string(10, 190 + i * 20, files[i],
                           COLOR_WHITE, COLOR_BLACK);
        }
    } else {
        lcd_draw_string(10, 190, "(비어 있음)", COLOR_YELLOW, COLOR_BLACK);
    }

    // 하단 버튼
    lcd_draw_button(10, LCD_HEIGHT - 40, LCD_WIDTH - 20, 30,
                    "UTTEC Lab", COLOR_CYAN, COLOR_BLACK);
}

// 상태 LED 태스크
void status_led_task(void *arg)
{
    while (1) {
        // 무지개 효과
        ws2812_rainbow(50);
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

// 메인 함수
void app_main(void)
{
    ESP_LOGI(TAG, "========================================");
    ESP_LOGI(TAG, "    UTTEC Lab - ESP32-C6 LCD Board     ");
    ESP_LOGI(TAG, "========================================");

    // LCD 초기화
    lcd_init();
    ESP_LOGI(TAG, "LCD initialized");

    // WS2812 초기화
    ws2812_init();
    ESP_LOGI(TAG, "WS2812 initialized");

    // SD 카드 마운트
    esp_err_t ret = sd_card_mount();
    if (ret == ESP_OK) {
        ESP_LOGI(TAG, "SD card mounted");
    } else {
        ESP_LOGW(TAG, "SD card not mounted");
    }

    // 상태 LED 태스크 시작
    xTaskCreate(status_led_task, "led_task", 2048, NULL, 5, NULL);

    // 시작 화면
    draw_product_info_screen();
    vTaskDelay(pdMS_TO_TICKS(3000));

    // SD 카드 정보 화면
    draw_sd_card_info_screen();

    // 메인 루프
    while (1) {
        // 버튼 입력 처리 (구현 필요)
        // ...

        vTaskDelay(pdMS_TO_TICKS(100));
    }
}
```

---

## 6. 교육 커리큘럼

### 6.1 단계별 학습

| 단계 | 주제 | 실습 내용 | 학습 목표 |
|------|------|-----------|-----------|
| **1주차** | 개발환경 구축 | ESP-IDF 설치, Hello World | 기본 환경 |
| **2주차** | GPIO 기초 | 버튼 입력, LED 제어 | 디지털 I/O |
| **3주차** | SPI 통신 | LCD 초기화, 기본 명령 | SPI 프로토콜 |
| **4주차** | LCD 그래픽 | 도형, 색상, 채우기 | 그래픽 기초 |
| **5주차** | 텍스트 출력 | 폰트, 문자열, 한글 | 폰트 렌더링 |
| **6주차** | GUI 요소 | 버튼, 메뉴, 프로그레스바 | UI 설계 |
| **7주차** | SD 카드 | 파일 읽기/쓰기, 목록 | 파일 시스템 |
| **8주차** | WiFi 6 | AP 연결, HTTP 요청 | 네트워크 |
| **9주차** | RGB LED | WS2812 효과, 애니메이션 | LED 제어 |
| **10주차** | 종합 프로젝트 | 파일 브라우저 앱 | 통합 실습 |

---

## 7. 기술 사양

### 7.1 보드 사양

| 항목 | 사양 |
|------|------|
| **모델** | UTTEC Lab ESP32-C6 LCD |
| **MCU** | ESP32-C6 (RISC-V, 160MHz) |
| **Flash** | 4MB |
| **SRAM** | 512KB |
| **무선** | WiFi 6 (802.11ax), BLE 5.0, Zigbee/Thread |
| **LCD** | 172x320 TFT (ST7789), 16-bit color |
| **Storage** | Micro SD 슬롯 (SDHC/SDXC) |
| **LED** | WS2812 RGB LED |
| **USB** | USB-C (전원/프로그래밍) |
| **전원** | 5V (USB), 3.3V (내부) |
| **크기** | 약 25 x 50 mm (컴팩트) |

### 7.2 LCD 사양

| 항목 | 사양 |
|------|------|
| **해상도** | 172 x 320 pixels |
| **컨트롤러** | ST7789 (또는 호환) |
| **색상** | 16-bit (65,536 colors) |
| **인터페이스** | SPI (최대 40MHz) |
| **백라이트** | LED (PWM 조절 가능) |

### 7.3 SD 카드 사양

| 항목 | 사양 |
|------|------|
| **타입** | Micro SD |
| **지원 규격** | SD, SDHC, SDXC |
| **파일 시스템** | FAT16, FAT32, exFAT |
| **인터페이스** | SPI |
| **최대 용량** | 64GB+ (테스트됨) |

---

## 8. 문의

### 제품 정보
- **제품명**: UTTEC Lab ESP32-C6 LCD
- **용도**: AI C 프로그래밍 교육, GUI 개발
- **버전**: 1.0

### 연락처
- **제조사**: UTTEC Lab
- **이메일**:
- **웹사이트**:

---

*© 2025 UTTEC Lab. All Rights Reserved.*
