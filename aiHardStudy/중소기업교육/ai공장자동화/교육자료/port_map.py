"""
AI Smart Factory - UTTEC 보드 포트 맵
=====================================
Raspberry Pi 40핀 헤더 ↔ UTTEC Shield (raspberry_esp32c3) 매핑

회로도: ai_smart_factory_schematic.pdf (V1.0, 2026-05-03)
커넥터: CN1 (2.54mm 2x20)
"""

# ============================================================
#  I2C (SDA/SCL) - AHT20 온습도센서, OLED 디스플레이
# ============================================================
PIN_SDA = 2    # GPIO2  (Pin 3)  - I2C SDA → AHT20(U5), OLED(U3), AHT20 확장(U2)
PIN_SCL = 3    # GPIO3  (Pin 5)  - I2C SCL → AHT20(U5), OLED(U3), AHT20 확장(U2)

# ============================================================
#  LED 출력 (100Ω 저항 R4, R5, R6 경유)
# ============================================================
PIN_RED = 17     # GPIO17 (Pin 11) - RED LED (U16)
PIN_YELLOW = 27  # GPIO27 (Pin 13) - YELLOW LED (U17)
PIN_BLUE = 22    # GPIO22 (Pin 15) - BLUE LED (U18)

# ============================================================
#  WS2812 NeoPixel LED (U4 → U8 → U9 → U10, 데이지체인 4개)
# ============================================================
PIN_DIN = 12           # GPIO12 (Pin 32) - WS2812 DIN (데이터 입력)
WS2812_COUNT = 4       # U4, U8, U9, U10 총 4개
WS2812_VCC = 5.0       # 구동 전압: +5V

# ============================================================
#  스위치 입력
# ============================================================
PIN_SWITCH = 4   # GPIO4  (Pin 7)  - 택트 스위치 (SW1, TS-1088)

# ============================================================
#  부저 / 스피커
# ============================================================
PIN_ALARM = 5      # GPIO5  (Pin 29) - 알람 부저 (BUZ1, 12x9.5mm)
PIN_SPEAKER = 13   # GPIO13 (Pin 33) - 스피커 출력 (Q1 BCX56 트랜지스터 경유, BUZZER1 2.7kHz)

# ============================================================
#  UART (LoRa 모듈 E22-900T30D CN3 연결)
# ============================================================
#
#  [주의] 회로도 CN1 라벨 vs RPi 실제 GPIO 불일치
#  ─────────────────────────────────────────────────
#  회로도 CN1에서 Pin 8을 "RX", Pin 10을 "TX"로 표기하고 있으나,
#  Raspberry Pi 40핀 헤더의 실제 GPIO 기능은 반대입니다:
#
#    CN1 Pin │ 회로도 라벨 │ RPi 실제 GPIO   │ RPi 기능
#    ────────┼────────────┼─────────────────┼─────────
#    Pin 8   │    "RX"    │ GPIO14          │ TXD (송신)
#    Pin 10  │    "TX"    │ GPIO15          │ RXD (수신)
#
#  회로도 라벨은 LoRa 모듈 관점(LoRa가 수신=RX, LoRa가 송신=TX)으로
#  표기된 것이며, 실제 UART 크로스 연결은 다음과 같습니다:
#
#    RPi GPIO14 (TXD) ──→ LoRa Pin 3 (RXD) : RPi가 송신 → LoRa가 수신
#    RPi GPIO15 (RXD) ←── LoRa Pin 4 (TXD) : LoRa가 송신 → RPi가 수신
#
#  [주의] RPi 3B+ UART 설정 필수
#  ─────────────────────────────────
#  RPi 3B+에서는 Bluetooth가 PL011 UART(/dev/ttyAMA0)를 점유하여
#  GPIO14/15가 mini UART(/dev/ttyS0)로 동작합니다.
#  mini UART는 보드레이트가 불안정하여 LoRa 통신에 부적합합니다.
#
#  해결: /boot/config.txt에 아래 2줄 추가 후 재부팅
#    dtoverlay=miniuart-bt
#    enable_uart=1
#
#  그리고 raspi-config에서:
#    Serial Port → login shell: No, hardware: Yes
#
#  설정 후 시리얼 디바이스:
#    RPi 3B+: serial.Serial('/dev/serial0', 9600)  ← 권장 (심볼릭 링크)
#    RPi 4B:  serial.Serial('/dev/ttyS0', 9600)
#
PIN_TX = 14   # GPIO14 (Pin 8)  - RPi TXD → LoRa RXD (Pin 3)
PIN_RX = 15   # GPIO15 (Pin 10) - RPi RXD ← LoRa TXD (Pin 4)
SERIAL_PORT = '/dev/serial0'  # RPi 3B+/4B 공통 호환 경로

# ============================================================
#  LoRa 모듈 제어 (E22-900T30D, CN3: 1x7PIN, 2.54mm)
# ============================================================
#
#  E22-900T30D 모듈 핀 ↔ CN3 커넥터 ↔ RPi GPIO 매핑:
#
#    LoRa Pin │ LoRa 기능  │ CN3 Pin │ CN3 라벨 │ RPi GPIO
#    ─────────┼───────────┼─────────┼─────────┼──────────
#    Pin 1    │ M0        │ CN3-1   │ M0      │ GPIO21 (Pin 40)
#    Pin 2    │ M1        │ CN3-2   │ M1      │ GPIO20 (Pin 38)
#    Pin 3    │ RXD (입력) │ CN3-3   │ TX      │ GPIO14 (Pin 8)
#    Pin 4    │ TXD (출력) │ CN3-4   │ RX      │ GPIO15 (Pin 10)
#    Pin 5    │ AUX       │ CN3-5   │ AUX     │ GPIO7  (Pin 26)
#    Pin 6    │ VCC       │ CN3-6   │ +5V     │ +5V
#    Pin 7    │ GND       │ CN3-7   │ GND     │ GND
#
#  동작 모드 (M1, M0 조합):
#    M1=0, M0=0 : 전송 모드 (투명 전송)
#    M1=0, M0=1 : WOR 모드 (공중 웨이크업)
#    M1=1, M0=0 : 설정 모드 (레지스터 접근)
#    M1=1, M0=1 : 딥슬립 모드
#
PIN_M0 = 21    # GPIO21 (Pin 40) - LoRa M0 (모드 설정)
PIN_M1 = 20    # GPIO20 (Pin 38) - LoRa M1 (모드 설정)
PIN_AUX = 7    # GPIO7  (Pin 26) - LoRa AUX (LOW=busy, HIGH=idle)

# ============================================================
#  SPI (확장용 커넥터 U12: HX 2.54mm-5P)
# ============================================================
PIN_MOSI = 10  # GPIO10 (Pin 19) - SPI MOSI
PIN_MISO = 9   # GPIO9  (Pin 21) - SPI MISO
PIN_SCLK = 11  # GPIO11 (Pin 23) - SPI SCLK

# ============================================================
#  테스트 포인트 (TP) / 범용 GPIO
# ============================================================
PIN_TP13 = 0   # GPIO0  (Pin 27) - TP13 (ID_SD, 예약)
PIN_TP14 = 19  # GPIO19 (Pin 35) - TP14
PIN_TP15 = 26  # GPIO26 (Pin 37) - TP15
PIN_TP16 = 18  # GPIO18 (Pin 12) - TP16
PIN_TP17 = 23  # GPIO23 (Pin 16) - TP17
PIN_TP18 = 24  # GPIO24 (Pin 18) - TP18
PIN_TP19 = 25  # GPIO25 (Pin 22) - TP19
PIN_TP20 = 8   # GPIO8  (Pin 24) - TP20 (SPI CE0)
PIN_TP23 = 6   # GPIO6  (Pin 31) - TP23
PIN_TP24 = 16  # GPIO16 (Pin 36) - TP24

# ============================================================
#  I2C 확장 커넥터
# ============================================================
# CN2 (2.54mm-4P): SDA, SCL, VCC, GND → 외부 I2C 센서 확장용
# U2 (2542WR-04P): AHT20 온습도센서 확장 포트
# U3 (2542WR-04P): OLED 디스플레이 포트

# ============================================================
#  전원
# ============================================================
# Pin 1, 17: VCC (3.3V)
# Pin 2, 4:  +5V
# Pin 6, 9, 14, 20, 25, 30, 34, 39: GND

# ============================================================
#  40핀 헤더 전체 매핑 (CN1)
# ============================================================
CN1_PIN_MAP = {
    # Pin: (신호명, GPIO번호, 용도)
    1:  ("VCC",     None,  "3.3V 전원"),
    2:  ("+5V",     None,  "5V 전원"),
    3:  ("SDA",     2,     "I2C SDA → AHT20, OLED"),
    4:  ("+5V",     None,  "5V 전원"),
    5:  ("SCL",     3,     "I2C SCL → AHT20, OLED"),
    6:  ("GND",     None,  "접지"),
    7:  ("SWITCH",  4,     "택트 스위치 입력 (SW1)"),
    8:  ("RX*",     14,    "RPi TXD(GPIO14) → LoRa RXD [회로도 라벨 'RX'는 LoRa 관점]"),
    9:  ("GND",     None,  "접지"),
    10: ("TX*",     15,    "RPi RXD(GPIO15) ← LoRa TXD [회로도 라벨 'TX'는 LoRa 관점]"),
    11: ("RED",     17,    "RED LED (R4=100Ω)"),
    12: ("TP16",    18,    "테스트포인트 / GPIO"),
    13: ("YELLOW",  27,    "YELLOW LED (R5=100Ω)"),
    14: ("GND",     None,  "접지"),
    15: ("BLUE",    22,    "BLUE LED (R6=100Ω)"),
    16: ("TP17",    23,    "테스트포인트 / GPIO"),
    17: ("VCC",     None,  "3.3V 전원"),
    18: ("TP18",    24,    "테스트포인트 / GPIO"),
    19: ("MOSI",    10,    "SPI MOSI → U12"),
    20: ("GND",     None,  "접지"),
    21: ("MISO",    9,     "SPI MISO → U12"),
    22: ("TP19",    25,    "테스트포인트 / GPIO"),
    23: ("SCLK",    11,    "SPI SCLK → U12"),
    24: ("TP20",    8,     "테스트포인트 / SPI CE0"),
    25: ("GND",     None,  "접지"),
    26: ("AUX",     7,     "LoRa AUX 상태"),
    27: ("TP13",    0,     "테스트포인트 (ID_SD)"),
    28: ("N/C",     1,     "미사용"),
    29: ("ALARM",   5,     "알람 부저 (BUZ1)"),
    30: ("GND",     None,  "접지"),
    31: ("TP23",    6,     "테스트포인트 / GPIO"),
    32: ("DIN",     12,    "WS2812 NeoPixel 데이터"),
    33: ("SPEAKER", 13,    "스피커 (Q1 BCX56 경유)"),
    34: ("GND",     None,  "접지"),
    35: ("TP14",    19,    "테스트포인트 / GPIO"),
    36: ("TP24",    16,    "테스트포인트 / GPIO"),
    37: ("TP15",    26,    "테스트포인트 / GPIO"),
    38: ("M1",      20,    "LoRa M1 모드 설정"),
    39: ("GND",     None,  "접지"),
    40: ("M0",      21,    "LoRa M0 모드 설정"),
}


def print_port_map():
    """포트 맵을 테이블 형태로 출력"""
    print("=" * 72)
    print("  AI Smart Factory - UTTEC 보드 포트 맵")
    print("=" * 72)
    print(f"{'Pin':>4} {'신호':>8} {'GPIO':>5} │ {'GPIO':<5} {'신호':<8} {'Pin':<4}")
    print("─" * 34 + "┼" + "─" * 37)

    for odd in range(1, 40, 2):
        even = odd + 1
        s_odd = CN1_PIN_MAP[odd]
        s_even = CN1_PIN_MAP[even]
        gpio_odd = f"GPIO{s_odd[1]}" if s_odd[1] is not None else "---"
        gpio_even = f"GPIO{s_even[1]}" if s_even[1] is not None else "---"
        print(f"{odd:>4} {s_odd[0]:>8} {gpio_odd:>7} │ {gpio_even:<7} {s_even[0]:<8} {even:<4}  {s_even[2]}")


def print_function_summary():
    """기능별 GPIO 요약 출력"""
    print("\n" + "=" * 50)
    print("  기능별 GPIO 요약")
    print("=" * 50)
    groups = {
        "LED 출력": [(PIN_RED, "RED"), (PIN_YELLOW, "YELLOW"), (PIN_BLUE, "BLUE")],
        "WS2812 NeoPixel": [(PIN_DIN, f"DIN ({WS2812_COUNT}개, {WS2812_VCC}V)")],
        "스위치 입력": [(PIN_SWITCH, "택트 스위치")],
        "부저/스피커": [(PIN_ALARM, "알람 부저"), (PIN_SPEAKER, "스피커(PWM)")],
        "I2C 센서": [(PIN_SDA, "SDA"), (PIN_SCL, "SCL")],
        "UART (LoRa E22-900T30D)": [(PIN_TX, "TX (GPIO14→LoRa RXD)"), (PIN_RX, "RX (GPIO15←LoRa TXD)")],
        "LoRa 제어": [(PIN_M0, "M0 (모드설정)"), (PIN_M1, "M1 (모드설정)"), (PIN_AUX, "AUX (상태)")],
        "SPI 확장": [(PIN_MOSI, "MOSI"), (PIN_MISO, "MISO"), (PIN_SCLK, "SCLK")],
    }
    for group, pins in groups.items():
        print(f"\n  [{group}]")
        for gpio, desc in pins:
            print(f"    GPIO{gpio:<3} - {desc}")


if __name__ == "__main__":
    print_port_map()
    print_function_summary()
