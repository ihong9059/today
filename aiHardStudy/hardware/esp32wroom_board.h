/**
 * @file    esp32wroom_board.h
 * @brief   ESP32-WROOM-32 DevKitC (38핀) 커스텀 보드 핀 정의 및 하드웨어 설정
 * @version 2.0
 * @date    2026-04-11
 *
 * @details
 * 본 헤더파일은 esp32Wroom_38.pdf 회로도(V1.0, 2025-08-06, EasyEDA)를 기반으로
 * 작성되었으며, 실제 하드웨어 테스트로 핀 매핑을 검증하였습니다.
 *
 * @note
 * - MCU: ESP32-WROOM-32 (Xtensa LX6 듀얼코어, 240MHz)
 * - 전원: USB 5V → 3.3V 내장 레귤레이터
 * - IO34, IO35, IO36, IO39는 입력 전용 (출력 불가)
 *
 * ═══════════════════════════════════════════════════════════════
 *  핀 배치 요약표 (실측 검증 완료 ✅)
 * ═══════════════════════════════════════════════════════════════
 *
 *  GPIO  │ 이름           │ 방향   │ 기능 설명
 *  ──────┼────────────────┼────────┼──────────────────────────
 *   25   │ PIN_LED_RED    │ OUT    │ 빨강 LED (100Ω, Active HIGH)     ✅ 실측
 *   26   │ PIN_LED_YELLOW │ OUT    │ 노랑 LED (100Ω, Active HIGH)     ✅ 실측
 *   27   │ PIN_LED_BLUE   │ OUT    │ 파랑 LED (100Ω, Active HIGH)     ✅ 실측
 *   14   │ PIN_BUZZER_BEEP│ OUT    │ 능동 부저 (Active LOW, 직접구동)  ✅ 실측
 *   33   │ PIN_BUZZER_MELODY│OUT   │ 수동 부저 (BCX56 트랜지스터, PWM) ✅ 실측
 *   32   │ PIN_SWITCH     │ IN     │ 택트 스위치 (Active LOW, 100nF)   ✅ 실측
 *   21   │ PIN_I2C_SDA    │ I/O    │ I2C 데이터 (10K 풀업)
 *   22   │ PIN_I2C_SCL    │ I/O    │ I2C 클럭 (10K 풀업)
 *   23   │ PIN_SPI_MOSI   │ OUT    │ SPI Master Out
 *   19   │ PIN_SPI_MISO   │ IN     │ SPI Master In
 *   18   │ PIN_SPI_SCK    │ OUT    │ SPI Clock
 *    5   │ PIN_SPI_SS     │ OUT    │ SPI Slave Select (Active LOW)
 *   17   │ PIN_LORA_TXD   │ OUT    │ UART2 TX → LoRa RX
 *   16   │ PIN_LORA_RXD   │ IN     │ UART2 RX ← LoRa TX
 *   15   │ PIN_LORA_M0    │ OUT    │ LoRa 모드 선택 비트0             ✅ 실측
 *    4   │ PIN_LORA_M1    │ OUT    │ LoRa 모드 선택 비트1
 *   34   │ PIN_LORA_AUX   │ IN     │ LoRa 상태 (입력전용)            ✅ 실측
 *   36   │ PIN_TP1        │ IN     │ 테스트포인트 (입력전용, ADC1_CH0)
 *   39   │ PIN_TP2        │ IN     │ 테스트포인트 (입력전용, ADC1_CH3)
 *   35   │ PIN_TP3        │ IN     │ 테스트포인트 (입력전용)
 *   13   │ PIN_TP4        │ I/O    │ 테스트포인트 (ADC2_CH4)
 *
 *  ※ V1.0 → V2.0 변경 이력:
 *     RED: IO33→IO25, YELLOW: IO25→IO26, BLUE: IO26→IO27
 *     BEEP: IO27→IO14, MELODY: IO32→IO33, SWITCH: IO35→IO32
 *     LORA_M0: IO2→IO15, LORA_AUX: IO39→IO34
 *     TP2: IO34→IO39 (AUX와 교환)
 *     원인: 회로도 핀 라벨 오독 → 실측 테스트로 교정
 */

#ifndef ESP32WROOM_BOARD_H
#define ESP32WROOM_BOARD_H

#ifdef __cplusplus
extern "C" {
#endif


/* ============================================================================
 *  1. LED 핀 정의  (✅ 실측 검증 완료)
 * ============================================================================
 *
 *  회로 구성:
 *    GPIO → 100Ω 직렬저항 (R1/R2/R3) → LED (XL-1004SURD) → GND
 *
 *  구동 전류: (3.3V - 2.0V) / 100Ω ≈ 13mA
 *  Active HIGH: GPIO HIGH → LED ON, GPIO LOW → LED OFF
 */

#define PIN_LED_RED             25      /**< 빨강 LED — GPIO25 (R1=100Ω) ✅ */
#define PIN_LED_YELLOW          26      /**< 노랑 LED — GPIO26 (R2=100Ω) ✅ */
#define PIN_LED_BLUE            27      /**< 파랑 LED — GPIO27 (R3=100Ω) ✅ */

#define LED_ON                  1       /**< LED 켜기 (Active HIGH) */
#define LED_OFF                 0       /**< LED 끄기 */

/** LED 개수 (배열 순회용) */
#define LED_COUNT               3

/** LED GPIO 배열 초기화 매크로 (for 루프용) */
#define LED_PINS_INIT           { PIN_LED_RED, PIN_LED_YELLOW, PIN_LED_BLUE }


/* ============================================================================
 *  2. 부저 핀 정의  (✅ 실측 검증 완료)
 * ============================================================================
 *
 *  BUZ1 (BEEP) — 능동 부저, 직접 구동
 *  ──────────────────────────────────────────────
 *    회로: VCC ──[BUZ1 +]──[BUZ1 -]── GPIO14 (BEEP)
 *
 *    동작: GPIO14 = LOW  → 전류 흐름 → 부저 ON
 *          GPIO14 = HIGH → 전류 안흐름 → 부저 OFF
 *    Active LOW: 디지털 LOW로 부저 울림
 *    용도: 단순 비프음 (경고, 알림)
 *
 *  BUZ2 (MELODY) — 수동 부저, NPN 트랜지스터(BCX56) 구동
 *  ──────────────────────────────────────────────
 *    회로: GPIO33 (MELODY) ──[R4=10KΩ]── Q1(BCX56) Base
 *          VCC ──[BUZ2 +]──[BUZ2 -]── Q1 Collector
 *          Q1 Emitter ── GND
 *
 *    동작: GPIO33 = HIGH → Q1 ON → BUZ2에 전류 흐름 → 부저 ON
 *          GPIO33 = LOW  → Q1 OFF → 전류 차단 → 부저 OFF
 *    Active HIGH (트랜지스터 반전): PWM 신호로 음계/멜로디 재생 가능
 *    용도: 멜로디, 경고음 패턴 (PWM 주파수로 음높이 제어)
 */

#define PIN_BUZZER_BEEP         14      /**< 능동 부저 (BUZ1) — GPIO14, Active LOW ✅ */
#define PIN_BUZZER_MELODY       33      /**< 수동 부저 (BUZ2) — GPIO33, PWM/Active HIGH ✅ */

#define BEEP_ON                 0       /**< 능동 부저 ON  (Active LOW) */
#define BEEP_OFF                1       /**< 능동 부저 OFF */
#define MELODY_ON               1       /**< 수동 부저 ON  (Active HIGH, 트랜지스터 구동) */
#define MELODY_OFF              0       /**< 수동 부저 OFF */

/**
 * MELODY PWM 기본 설정 (LEDC 채널)
 */
#define MELODY_LEDC_TIMER       LEDC_TIMER_0
#define MELODY_LEDC_CHANNEL     LEDC_CHANNEL_0
#define MELODY_LEDC_SPEED_MODE  LEDC_LOW_SPEED_MODE
#define MELODY_LEDC_RESOLUTION  LEDC_TIMER_8_BIT    /**< 8비트 해상도 (0~255) */
#define MELODY_LEDC_DUTY        128                  /**< 50% 듀티 (음색 균일) */

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
 *  3. 스위치 핀 정의  (✅ 실측 검증 완료)
 * ============================================================================
 *
 *  회로 구성:
 *    GPIO32 (SWITCH) ──[SW1]── GND
 *                     ──[C1=100nF]── GND   (디바운스 캐패시터)
 *
 *  동작: 버튼 미누름 → 내부 풀업으로 HIGH
 *        버튼 누름   → GND 연결 → LOW
 *
 *  Active LOW: LOW = 눌림, HIGH = 해제
 *
 *  @note GPIO32는 입출력 가능 핀으로, 내부 풀업 사용이 가능합니다.
 *        (V1.0에서 IO35로 잘못 지정되어 있었음 — IO35는 입력전용/풀업불가)
 */

#define PIN_SWITCH              32      /**< 택트 스위치 — GPIO32, Active LOW ✅ */

#define SWITCH_PRESSED          0       /**< 스위치 눌림 (Active LOW) */
#define SWITCH_RELEASED         1       /**< 스위치 해제 */
#define SWITCH_DEBOUNCE_MS      30      /**< 소프트웨어 디바운스 시간 (ms) */


/* ============================================================================
 *  4. I2C 버스 정의 (OLED + AHT20)
 * ============================================================================
 *
 *  회로 구성:
 *    SDA (GPIO21) ──[R5=10KΩ 풀업→VCC]── U9(OLED), U10(AHT20)
 *    SCL (GPIO22) ──[R6=10KΩ 풀업→VCC]── U9(OLED), U10(AHT20)
 *
 *  U9: OLED 디스플레이 (SSD1306, 0.96인치 128x64, I2C 주소 0x3C)
 *  U10: AHT20 온습도 센서 (I2C 주소 0x38)
 */

#define PIN_I2C_SDA             21      /**< I2C 데이터 — GPIO21 (10K 풀업) */
#define PIN_I2C_SCL             22      /**< I2C 클럭 — GPIO22 (10K 풀업) */

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
 *  5. LoRa 모듈 핀 정의 (UART2 + 제어)
 * ============================================================================
 *
 *  H2 커넥터 (PH2.54-07PB2G-H25, 7핀) → LoRa 모듈
 *
 *    H2 Pin │ 신호   │ ESP32 GPIO │ 설명
 *    ───────┼────────┼────────────┼─────────────────
 *      1    │ AUX    │ GPIO39(VN) │ 상태 (HIGH=idle)
 *      2    │ TXD2   │ GPIO17     │ ESP32 TX → LoRa RX
 *      3    │ RXD2   │ GPIO16     │ ESP32 RX ← LoRa TX
 *      5    │ M0     │ GPIO2      │ 모드 선택 비트 0
 *      6    │ M1     │ GPIO4      │ 모드 선택 비트 1
 *      7    │ GND    │ GND        │ 공통 접지
 */

#define PIN_LORA_TXD            17
#define PIN_LORA_RXD            16
#define PIN_LORA_AUX            34      /**< 입력전용 ✅ */
#define PIN_LORA_M0             15      /**< LoRa 모드 M0 ✅ */
#define PIN_LORA_M1             4

#define LORA_UART_NUM           UART_NUM_2
#define LORA_UART_BAUD          9600
#define LORA_UART_TX_BUF        256
#define LORA_UART_RX_BUF        256

#define LORA_AUX_IDLE           1
#define LORA_AUX_BUSY           0

#define LORA_MODE_NORMAL        0x00    /**< M1=0, M0=0: 정상 송수신 */
#define LORA_MODE_WOR_TX        0x01    /**< M1=0, M0=1: WOR 송신 */
#define LORA_MODE_WOR_RX        0x02    /**< M1=1, M0=0: WOR 수신 */
#define LORA_MODE_CONFIG        0x03    /**< M1=1, M0=1: 설정 모드 */


/* ============================================================================
 *  6. SPI 버스 핀 정의
 * ============================================================================
 *
 *  VSPI (ESP32 기본 SPI 버스) — 현재 미연결, 확장용 예약
 */

#define PIN_SPI_MOSI            23
#define PIN_SPI_MISO            19
#define PIN_SPI_SCK             18
#define PIN_SPI_SS              5       /**< Active LOW */

#define SPI_HOST_ID             SPI3_HOST
#define SPI_FREQ_HZ             1000000


/* ============================================================================
 *  7. 테스트 포인트 정의
 * ============================================================================
 */

#define PIN_TP1                 36      /**< GPIO36(VP), ADC1_CH0, 입력전용 */
#define PIN_TP2                 39      /**< GPIO39(VN), ADC1_CH3, 입력전용 */
#define PIN_TP3                 35      /**< GPIO35, 입력전용 */
#define PIN_TP4                 13      /**< GPIO13, ADC2_CH4 */


/* ============================================================================
 *  8. ESP32 DevKitC 38핀 전체 핀 맵 요약  (V2.0 실측 검증)
 * ============================================================================
 *
 *  ┌──────────────────────────────────────────────────────────┐
 *  │                ESP32-DevKitC 38핀 배치도                 │
 *  │                                                          │
 *  │   좌측 (Pin 1~19)          우측 (Pin 20~38)              │
 *  │  ─────────────────        ─────────────────              │
 *  │   1  3V3     (전원)       20  GND                        │
 *  │   2  EN      (리셋)       21  IO23  → MOSI              │
 *  │   3  VP/IO36 → TP1        22  IO22  → SCL               │
 *  │   4  VN/IO39 → TP2         23  TX    (UART0, 디버그)     │
 *  │   5  IO34    → AUX(LoRa)✅ 24  RX   (UART0, 디버그)     │
 *  │   6  IO35    → TP3        25  IO21  → SDA               │
 *  │   7  IO32    → SWITCH ✅  26  GND                        │
 *  │   8  IO33    → MELODY ✅  27  IO19  → MISO              │
 *  │   9  IO25    → RED    ✅  28  IO18  → SCK               │
 *  │  10  IO26    → YELLOW ✅  29  IO5   → SS                │
 *  │  11  IO27    → BLUE   ✅  30  IO17  → TXD2 (LoRa)       │
 *  │  12  IO14    → BEEP   ✅  31  IO16  → RXD2 (LoRa)       │
 *  │  13  IO12    → (미사용)   32  IO4   → M1 (LoRa)         │
 *  │  14  GND                  33  IO0   → (BOOT)             │
 *  │  15  IO13    → TP4        34  IO2   → (미사용)           │
 *  │  16  D2      (내부Flash)  35  IO15  → M0 (LoRa) ✅      │
 *  │  17  D3      (내부Flash)  36  D1    (내부Flash)          │
 *  │  18  CMD     (내부Flash)  37  D0    (내부Flash)          │
 *  │  19  5V      (전원)       38  CLK   (내부Flash)          │
 *  │                                                          │
 *  │  ※ D0,D1,D2,D3,CMD,CLK (pin 16~18, 36~38)는             │
 *  │    내부 SPI Flash 전용이므로 사용자 연결 금지            │
 *  └──────────────────────────────────────────────────────────┘
 *
 *  GPIO 사용 현황 요약:
 *  ┌─────────┬──────────┬──────────────┬───────────────────────┐
 *  │ GPIO    │ 방향     │ 기능         │ 비고                  │
 *  ├─────────┼──────────┼──────────────┼───────────────────────┤
 *  │ IO2     │ -        │ (미사용)     │ 부팅 시 LOW 필요      │
 *  │ IO4     │ 출력     │ LoRa M1      │                       │
 *  │ IO5     │ 출력     │ SPI SS       │ Active LOW            │
 *  │ IO13    │ 입출력   │ TP4          │ ADC2_CH4              │
 *  │ IO14    │ 출력     │ BEEP 부저 ✅ │ Active LOW, 직접구동  │
 *  │ IO16    │ 입력     │ LoRa RXD     │ UART2 RX              │
 *  │ IO17    │ 출력     │ LoRa TXD     │ UART2 TX              │
 *  │ IO18    │ 출력     │ SPI SCK      │                       │
 *  │ IO19    │ 입력     │ SPI MISO     │                       │
 *  │ IO21    │ 입출력   │ I2C SDA      │ 10K 풀업              │
 *  │ IO22    │ 입출력   │ I2C SCL      │ 10K 풀업              │
 *  │ IO23    │ 출력     │ SPI MOSI     │                       │
 *  │ IO25    │ 출력     │ RED LED  ✅  │ 100Ω, Active HIGH     │
 *  │ IO26    │ 출력     │ YELLOW LED✅ │ 100Ω, Active HIGH     │
 *  │ IO27    │ 출력     │ BLUE LED ✅  │ 100Ω, Active HIGH     │
 *  │ IO32    │ 입력     │ SWITCH   ✅  │ Active LOW, 100nF     │
 *  │ IO33    │ 출력     │ MELODY   ✅  │ BCX56, PWM            │
 *  │ IO15    │ 출력     │ LoRa M0  ✅  │ 모드 선택 비트0       │
 *  │ IO34    │ 입력전용 │ LoRa AUX ✅  │ 모듈 상태             │
 *  │ IO35    │ 입력전용 │ TP3          │                       │
 *  │ IO36(VP)│ 입력전용 │ TP1          │ ADC1_CH0              │
 *  │ IO39(VN)│ 입력전용 │ TP2          │ ADC1_CH3              │
 *  └─────────┴──────────┴──────────────┴───────────────────────┘
 *
 *  미사용 GPIO: IO0 (BOOT), IO2, IO12
 */


/* ============================================================================
 *  9. GPIO 비트마스크 / 초기화 매크로
 * ============================================================================ */

/**
 * 모든 LED GPIO를 출력으로 설정하는 비트마스크
 */
#define LED_GPIO_OUTPUT_MASK    ((1ULL << PIN_LED_RED)    | \
                                 (1ULL << PIN_LED_YELLOW) | \
                                 (1ULL << PIN_LED_BLUE))

/**
 * 부저 GPIO를 출력으로 설정하는 비트마스크
 */
#define BUZZER_GPIO_OUTPUT_MASK ((1ULL << PIN_BUZZER_BEEP) | \
                                 (1ULL << PIN_BUZZER_MELODY))

/**
 * LoRa 제어 핀(M0, M1)을 출력으로 설정하는 비트마스크
 */
#define LORA_CTRL_OUTPUT_MASK   ((1ULL << PIN_LORA_M0) | \
                                 (1ULL << PIN_LORA_M1))  /* M0=IO15, M1=IO4 */

/**
 * 스위치 + LoRa AUX를 입력으로 설정하는 비트마스크
 */
#define INPUT_GPIO_MASK         ((1ULL << PIN_SWITCH)   | \
                                 (1ULL << PIN_LORA_AUX))

/**
 * LoRa 모드 설정 매크로
 */
#define LORA_SET_MODE(mode) do { \
    gpio_set_level(PIN_LORA_M0, (mode) & 0x01); \
    gpio_set_level(PIN_LORA_M1, ((mode) >> 1) & 0x01); \
} while(0)


#ifdef __cplusplus
}
#endif

#endif /* ESP32WROOM_BOARD_H */
