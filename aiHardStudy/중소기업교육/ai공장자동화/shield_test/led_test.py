"""
UTTEC Shield 3색 LED 테스트 — Raspberry Pi 3B+ + UTTEC Shield

회로도 기준 (ai_smart_factory_schematic.pdf V1.0, port_map.py):
  - RED    LED (U16) ← GPIO17 (Pin 11), R4=100Ω
  - YELLOW LED (U17) ← GPIO27 (Pin 13), R5=100Ω
  - BLUE   LED (U18) ← GPIO22 (Pin 15), R6=100Ω

테스트 시나리오 (약 35초):
  1. 순차 점등 R→Y→B × 3회 (개당 0.5초)        — 6초
  2. 개별 깜빡임 R(5)→Y(5)→B(5) (개당 0.3s ON/OFF) — 9초
  3. 전체 동시 깜빡임 × 5회 (0.4s 간격)            — 4초
  4. 신호등 시뮬레이션 Blue(3s)→Yellow(1s)→Red(3s)→Yellow(1s) × 2 사이클 — 16초
  5. 모두 OFF (cleanup)
"""
from gpiozero import LED
from time import sleep

PIN_RED, PIN_YELLOW, PIN_BLUE = 17, 27, 22

red    = LED(PIN_RED)
yellow = LED(PIN_YELLOW)
blue   = LED(PIN_BLUE)
ALL = [red, yellow, blue]


def all_off():
    for led in ALL:
        led.off()


def step(title):
    print(f">>> {title}")


# 1. 순차 점등
step("1/5  순차 점등 R→Y→B × 3회")
for n in range(3):
    for led, name in [(red, "RED"), (yellow, "YELLOW"), (blue, "BLUE")]:
        all_off()
        led.on()
        print(f"     [{n+1}/3] {name} ON")
        sleep(0.5)
all_off()
sleep(0.3)

# 2. 개별 깜빡임
step("2/5  개별 깜빡임 R(5)→Y(5)→B(5)")
for led, name in [(red, "RED"), (yellow, "YELLOW"), (blue, "BLUE")]:
    print(f"     {name} blink ×5")
    for _ in range(5):
        led.on();  sleep(0.3)
        led.off(); sleep(0.3)

# 3. 전체 동시 깜빡임
step("3/5  전체 동시 깜빡임 ×5")
for i in range(5):
    print(f"     ALL ON ({i+1}/5)")
    for led in ALL: led.on()
    sleep(0.4)
    for led in ALL: led.off()
    sleep(0.4)

# 4. 신호등 시뮬레이션 × 2 사이클
step("4/5  신호등 시뮬레이션 × 2 사이클")
for cycle in range(2):
    print(f"     [{cycle+1}/2] BLUE go (3s)")
    all_off(); blue.on(); sleep(3)
    print(f"     [{cycle+1}/2] YELLOW (1s)")
    all_off(); yellow.on(); sleep(1)
    print(f"     [{cycle+1}/2] RED stop (3s)")
    all_off(); red.on(); sleep(3)
    print(f"     [{cycle+1}/2] YELLOW (1s)")
    all_off(); yellow.on(); sleep(1)

# 5. cleanup
step("5/5  모두 OFF")
all_off()
print("\n✅ LED test 완료. RED/YELLOW/BLUE 3색이 단계별로 정상 점등되었는지 육안 확인.")
