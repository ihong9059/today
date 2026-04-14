/**
 * @file    esp32c3_board.h
 * @brief   ESP32-C3 SuperMini 커스텀 보드 핀 정의 및 하드웨어 설정
 * @version 1.0
 * @date    2026-04-15
 *
 * @details
 * 본 헤더파일은 esp32c3_ai_super.pdf 회로도(V1.0, 2025-08-06, EasyEDA)를 기반으로
 * 작성되었습니다.
 *
 * @note
 * - MCU: ESP32-C3 SuperMini (RISC-V 싱글코어, 160MHz)
 * - 전원: USB 5V → 3.3V 내장 레귤레이터
 * - GPIO 범위: GPIO0~10, GPIO20~21 (총 13개)
 * - WROOM 대비 차이: LED 3개→WS2812 1개, 부저 2개→스피커 1개(tone 가능), LoRa 없음
 *
 * ═══════════════════════════════════════════════════════════════
 *  핀 배치 요약표
 * ═══════════════════════════════════════════════════════════════
 *
 *  GPIO  │ 이름           │ 방향   │ 기능 설명
 *  ──────┼────────────────┼────────┼──────────────────────────
 *    1   │ PIN_WS2812_DIN │ OUT    │ WS2812 RGB LED 데이터 입력
 *    2   │ PIN_SPEAKER    │ OUT    │ 스피커 (BCX56 트랜지스터, PWM/tone())
 *    5   │ PIN_SWITCH     │ IN     │ 택트 스위치 (Active LOW, 100nF)
 *    6   │ PIN_I2C_SDA    │ I/O    │ I2C 데이터 (10K 풀업)
 *    7   │ PIN_I2C_SCL    │ I/O    │ I2C 클럭 (10K 풀업)
 *    8   │ PIN_SPI_SCK    │ OUT    │ SPI Clock
 *    9   │ PIN_SPI_MISO   │ IN     │ SPI Master In
 *   10   │ PIN_SPI_MOSI   │ OUT    │ SPI Master Out
 *    0   │ PIN_SPI_SS     │ OUT    │ SPI Slave Select (Active LOW)
 *   20   │ PIN_UART_RX    │ IN     │ UART RX
 *   21   │ PIN_UART_TX    │ OUT    │ UART TX
 *    3   │ PIN_TP1        │ I/O    │ 테스트포인트 (ADC1_CH3)
 *    4   │ PIN_TP2        │ I/O    │ 테스트포인트 (ADC1_CH4)
 */

#ifndef ESP32C3_BOARD_H
#define ESP32C3_BOARD_H

#ifdef __cplusplus
extern "C" {
#endif


/* ============================================================================
 *  1. WS2812 RGB LED 핀 정의
 * ============================================================================
 *
 *  회로 구성:
 *    VCC ── U4(WS2812) VDD
 *    GPIO1 ── U4(WS2812) DIN
 *    U4 VSS ── GND
 *    U4 DOUT ── 미연결 (단일 LED)
 *
 *  WS2812: 내장 IC 포함 RGB LED, 800kHz 단선 프로토콜
 *  색상: 24비트 (GRB 순서, 각 8비트)
 *  ESP32-C3에서는 RMT 주변장치로 구동 권장
 */

#define PIN_WS2812_DIN          1       /**< WS2812 데이터 — GPIO1 */

#define WS2812_LED_COUNT        1       /**< WS2812 LED 개수 */
#define WS2812_RMT_CHANNEL     0       /**< RMT 채널 번호 */
#define WS2812_FREQ_HZ         (800000) /**< 800kHz 신호 주파수 */

/** 기본 색상 정의 (GRB 순서, 24비트) */
#define WS2812_RED              0x00FF00
#define WS2812_GREEN            0xFF0000
#define WS2812_BLUE             0x0000FF
#define WS2812_YELLOW           0xFFFF00
#define WS2812_WHITE            0xFFFFFF
#define WS2812_OFF              0x000000


/* ============================================================================
 *  2. 부저 핀 정의
 * ============================================================================
 *
 *  SPEAKER — 수동 스피커, NPN 트랜지스터(BCX56) 구동
 *  ──────────────────────────────────────────────
 *    회로: GPIO2 (SPEAKER) ──[R3=10KΩ]── Q1(BCX56) Base
 *          VCC ──[SPEAKER +]──[SPEAKER -]── Q1 Collector
 *          Q1 Emitter ── GND
 *
 *    동작: GPIO2 = HIGH → Q1 ON → SPEAKER에 전류 흐름
 *          GPIO2 = LOW  → Q1 OFF → 전류 차단
 *    Active HIGH (트랜지스터 구동)
 *    용도: tone(PIN, freq, duration)으로 멜로디/음계 재생 가능
 *          digitalWrite로 단순 비프음도 가능
 */

#define PIN_SPEAKER             2       /**< 스피커 — GPIO2, PWM/tone() (BCX56 구동) */

#define SPEAKER_ON              1       /**< 스피커 ON  (Active HIGH, 트랜지스터 구동) */
#define SPEAKER_OFF             0       /**< 스피커 OFF */

/** 음계 주파수 정의 (Hz) — 4옥타브 기준 */
#define NOTE_C4     262
#define NOTE_D4     294
#define NOTE_E4     330
#define NOTE_F4     349
#define NOTE_G4     392
#define NOTE_A4     440
#define NOTE_B4     494
#define NOTE_C5     523
#define NOTE_REST   0           /**< 쉼표 (무음) */


/* ============================================================================
 *  3. 스위치 핀 정의
 * ============================================================================
 *
 *  회로 구성:
 *    GPIO5 (SWITCH) ──[SW1]── GND
 *                    ──[C1=100nF]── GND   (디바운스 캐패시터)
 *
 *  동작: 버튼 미누름 → 내부 풀업으로 HIGH
 *        버튼 누름   → GND 연결 → LOW
 *
 *  Active LOW: LOW = 눌림, HIGH = 해제
 */

#define PIN_SWITCH              5       /**< 택트 스위치 — GPIO5, Active LOW */

#define SWITCH_PRESSED          0       /**< 스위치 눌림 (Active LOW) */
#define SWITCH_RELEASED         1       /**< 스위치 해제 */
#define SWITCH_DEBOUNCE_MS      30      /**< 소프트웨어 디바운스 시간 (ms) */


/* ============================================================================
 *  4. I2C 버스 정의 (OLED + AHT20)
 * ============================================================================
 *
 *  회로 구성:
 *    SDA (GPIO6) ──[R1=10KΩ 풀업→VCC]── U2(AHT20), U3(OLED)
 *    SCL (GPIO7) ──[R2=10KΩ 풀업→VCC]── U2(AHT20), U3(OLED)
 *
 *  U2: AHT20 온습도 센서 (I2C 주소 0x38)
 *  U3: OLED 디스플레이 (SSD1306, 0.96인치 128x64, I2C 주소 0x3C)
 */

#define PIN_I2C_SDA             6       /**< I2C 데이터 — GPIO6 (10K 풀업) */
#define PIN_I2C_SCL             7       /**< I2C 클럭 — GPIO7 (10K 풀업) */

#define I2C_PORT_NUM            I2C_NUM_0
#define I2C_FREQ_HZ             100000              /**< 100kHz (표준 모드) */
#define I2C_PULLUP_ENABLE       false               /**< 외부 풀업 있음 → 내부 비활성 */

/** OLED 디스플레이 (SSD1306) */
#define OLED_I2C_ADDR           0x3C
#define OLED_WIDTH              128
#define OLED_HEIGHT             64

/** AHT20 온습도 센서 */
#define AHT20_I2C_ADDR          0x38
#define AHT20_CMD_INIT          0xBE
#define AHT20_CMD_MEASURE       0xAC
#define AHT20_CMD_SOFTRESET     0xBA
#define AHT20_MEASURE_DELAY_MS  80


/* ============================================================================
 *  5. SPI 버스 핀 정의
 * ============================================================================
 *
 *  ESP32-C3 SPI — 현재 미연결, 확장용 예약
 *  테스트포인트(TP5~TP8)로 외부 접근 가능
 */

#define PIN_SPI_SCK             8       /**< SPI Clock — GPIO8 */
#define PIN_SPI_MISO            9       /**< SPI Master In — GPIO9 */
#define PIN_SPI_MOSI            10      /**< SPI Master Out — GPIO10 */
#define PIN_SPI_SS              0       /**< SPI Slave Select — GPIO0, Active LOW */

#define SPI_HOST_ID             SPI2_HOST
#define SPI_FREQ_HZ             1000000


/* ============================================================================
 *  6. UART 핀 정의
 * ============================================================================
 *
 *  ESP32-C3 UART — 테스트포인트(TP3, TP4)로 외부 접근 가능
 */

#define PIN_UART_TX             21      /**< UART TX — GPIO21 */
#define PIN_UART_RX             20      /**< UART RX — GPIO20 */

#define UART_PORT_NUM           UART_NUM_0
#define UART_BAUD               115200


/* ============================================================================
 *  7. 테스트 포인트 정의
 * ============================================================================
 *
 *  TP1, TP2: 범용 GPIO / ADC 테스트 포인트
 *  TP3~TP8: UART, SPI 신호 테스트 포인트 (해당 핀과 동일)
 *
 *  TP  │ GPIO │ 매핑 신호
 *  ────┼──────┼──────────
 *  TP1 │  3   │ 범용 (ADC1_CH3)
 *  TP2 │  4   │ 범용 (ADC1_CH4)
 *  TP3 │ 21   │ TX
 *  TP4 │ 20   │ RX
 *  TP5 │  8   │ SCK
 *  TP6 │  9   │ MISO
 *  TP7 │ 10   │ MOSI
 *  TP8 │  0   │ SS
 */

#define PIN_TP1                 3       /**< GPIO3, ADC1_CH3 */
#define PIN_TP2                 4       /**< GPIO4, ADC1_CH4 */


/* ============================================================================
 *  8. ESP32-C3 SuperMini 전체 핀 맵 요약
 * ============================================================================
 *
 *  ┌──────────────────────────────────────────────────────────┐
 *  │             ESP32-C3 SuperMini 핀 배치도                 │
 *  │                                                          │
 *  │   좌측 (Pin 1~8)             우측 (Pin 9~16)             │
 *  │  ─────────────────          ─────────────────            │
 *  │   1  GPIO5  → SWITCH        16  5V    (전원)             │
 *  │   2  GPIO6  → SDA           15  GND                      │
 *  │   3  GPIO7  → SCL           14  3V3   (전원)             │
 *  │   4  GPIO8  → SCK           13  GPIO4 → TP2              │
 *  │   5  GPIO9  → MISO          12  GPIO3 → TP1              │
 *  │   6  GPIO10 → MOSI          11  GPIO2 → SPEAKER (부저)   │
 *  │   7  GPIO20 → RX            10  GPIO1 → WS2812 DIN      │
 *  │   8  GPIO21 → TX             9  GPIO0 → SS               │
 *  │                                                          │
 *  └──────────────────────────────────────────────────────────┘
 *
 *  GPIO 사용 현황 요약:
 *  ┌─────────┬──────────┬──────────────┬───────────────────────┐
 *  │ GPIO    │ 방향     │ 기능         │ 비고                  │
 *  ├─────────┼──────────┼──────────────┼───────────────────────┤
 *  │ GPIO0   │ 출력     │ SPI SS       │ Active LOW            │
 *  │ GPIO1   │ 출력     │ WS2812 DIN   │ RMT 구동, 800kHz      │
 *  │ GPIO2   │ 출력     │ SPEAKER      │ BCX56, PWM/tone()     │
 *  │ GPIO3   │ 입출력   │ TP1          │ ADC1_CH3              │
 *  │ GPIO4   │ 입출력   │ TP2          │ ADC1_CH4              │
 *  │ GPIO5   │ 입력     │ SWITCH       │ Active LOW, 100nF     │
 *  │ GPIO6   │ 입출력   │ I2C SDA      │ 10K 풀업              │
 *  │ GPIO7   │ 입출력   │ I2C SCL      │ 10K 풀업              │
 *  │ GPIO8   │ 출력     │ SPI SCK      │                       │
 *  │ GPIO9   │ 입력     │ SPI MISO     │                       │
 *  │ GPIO10  │ 출력     │ SPI MOSI     │                       │
 *  │ GPIO20  │ 입력     │ UART RX      │                       │
 *  │ GPIO21  │ 출력     │ UART TX      │                       │
 *  └─────────┴──────────┴──────────────┴───────────────────────┘
 */


/* ============================================================================
 *  9. GPIO 비트마스크 / 초기화 매크로
 * ============================================================================ */

/**
 * 스피커 GPIO를 출력으로 설정하는 비트마스크
 */
#define SPEAKER_GPIO_OUTPUT_MASK (1ULL << PIN_SPEAKER)

/**
 * SPI 출력 핀 비트마스크
 */
#define SPI_GPIO_OUTPUT_MASK    ((1ULL << PIN_SPI_SCK)  | \
                                 (1ULL << PIN_SPI_MOSI) | \
                                 (1ULL << PIN_SPI_SS))

/**
 * 스위치를 입력으로 설정하는 비트마스크
 */
#define INPUT_GPIO_MASK         (1ULL << PIN_SWITCH)


#ifdef __cplusplus
}
#endif

#endif /* ESP32C3_BOARD_H */
