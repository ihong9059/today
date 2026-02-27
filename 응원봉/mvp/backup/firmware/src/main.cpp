/**
 * AI FanStick MVP - 메인 펌웨어
 *
 * ESP32-C3 SuperMini 기반 AI 응원봉 MVP
 * BLE로 스마트폰 앱과 연동하여 LED/OLED/Buzzer를 제어합니다.
 *
 * 하드웨어 연결:
 * - GPIO1: WS2812 LED (DIN)
 * - GPIO6: I2C SDA (OLED)
 * - GPIO7: I2C SCL (OLED)
 * - GPIO2: Buzzer
 * - GPIO5: Button (풀업)
 *
 * BLE 명령 프로토콜:
 * - C:R,G,B     → 색상 변경
 * - P:패턴명   → 패턴 실행 (rainbow, pulse, blink, wave, solid)
 * - T:텍스트   → OLED 텍스트 표시
 * - B:패턴     → 버저 (ack, beep, error)
 * - L:밝기     → 밝기 조절 (0-255)
 * - S:곡제목|색상 → 곡 정보 표시
 */

#include <Arduino.h>
#include "led_controller.h"
#include "oled_display.h"
#include "ble_server.h"

// 핀 정의
#define BUZZER_PIN  2
#define BUTTON_PIN  5

// 전역 객체
LedController led;
OledDisplay oled;
BleServer ble;

// 버튼 상태
bool lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

// 버저 패턴
void playBuzzer(const String& pattern) {
    if (pattern == "ack") {
        // 확인음: 짧은 비프
        tone(BUZZER_PIN, 2700, 100);
    }
    else if (pattern == "beep") {
        // 일반 비프
        tone(BUZZER_PIN, 2700, 200);
    }
    else if (pattern == "error") {
        // 에러음: 3회 짧은 비프
        for (int i = 0; i < 3; i++) {
            tone(BUZZER_PIN, 2700, 100);
            delay(150);
        }
    }
    else if (pattern == "success") {
        // 성공음: 상승 비프
        tone(BUZZER_PIN, 2000, 100);
        delay(100);
        tone(BUZZER_PIN, 2500, 100);
        delay(100);
        tone(BUZZER_PIN, 3000, 150);
    }
    else if (pattern == "connect") {
        // 연결음
        tone(BUZZER_PIN, 2700, 100);
        delay(100);
        tone(BUZZER_PIN, 2700, 100);
    }
    Serial.printf("[BUZZER] Pattern: %s\n", pattern.c_str());
}

// ===== BLE 콜백 함수들 =====

void onColorChange(uint8_t r, uint8_t g, uint8_t b) {
    led.setColor(r, g, b);
    oled.showLedColor(r, g, b);
    playBuzzer("ack");
}

void onPatternChange(const String& pattern) {
    if (pattern == "solid") {
        led.stopPattern();
    } else {
        led.startPattern(pattern);
    }
    oled.showText("Pattern: " + pattern);
}

void onTextReceive(const String& text) {
    oled.showText(text);
}

void onBrightnessChange(uint8_t brightness) {
    led.setBrightness(brightness);
}

void onBuzzerCommand(const String& pattern) {
    playBuzzer(pattern);
}

void onSongInfoReceive(const String& title, const String& color) {
    oled.showSongInfo(title, color);
    playBuzzer("ack");
}

void onConnectionChange(bool connected) {
    if (connected) {
        oled.showConnected(ble.getDeviceName());
        playBuzzer("connect");
        // 초기 색상 설정 (보라색 - BTS 공식 색상)
        led.setColor(128, 0, 128);
    } else {
        oled.showDisconnected();
        // 대기 상태 표시 (파란색 깜빡임)
        led.setColor(0, 0, 128);
        led.startPattern("pulse");
    }
}

// ===== 버튼 처리 =====

void handleButton() {
    bool reading = digitalRead(BUTTON_PIN);

    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading == LOW) {  // 버튼 눌림 (풀업)
            Serial.println("[BUTTON] Pressed");
            playBuzzer("ack");

            // BLE로 버튼 이벤트 전송
            ble.notifyStatus("BTN:PRESS");

            // 패턴 전환 (테스트용)
            static int patternIndex = 0;
            const char* patterns[] = {"solid", "rainbow", "pulse", "blink", "wave"};
            patternIndex = (patternIndex + 1) % 5;
            led.startPattern(patterns[patternIndex]);
            oled.showText(String("Pattern: ") + patterns[patternIndex]);
        }
    }

    lastButtonState = reading;
}

// ===== 시리얼 명령 처리 (디버그용) =====

void handleSerialCommand() {
    if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();

        if (cmd.length() > 0) {
            Serial.printf("[SERIAL] Command: %s\n", cmd.c_str());
            ble.parseCommand(cmd);  // BLE 파서 재사용
        }
    }
}

// ===== Arduino 기본 함수 =====

void setup() {
    // 시리얼 초기화
    Serial.begin(115200);
    delay(1000);

    Serial.println();
    Serial.println("================================");
    Serial.println("  AI FanStick MVP v1.0");
    Serial.println("  ESP32-C3 SuperMini");
    Serial.println("================================");

    // 핀 설정
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(BUTTON_PIN, INPUT_PULLUP);

    // LED 초기화
    led.begin();
    led.setColor(0, 0, 128);  // 시작 색상: 파란색

    // OLED 초기화
    if (oled.begin()) {
        Serial.println("[SETUP] OLED OK");
    } else {
        Serial.println("[SETUP] OLED Failed");
    }

    // BLE 초기화 및 콜백 설정
    ble.setColorCallback(onColorChange);
    ble.setPatternCallback(onPatternChange);
    ble.setTextCallback(onTextReceive);
    ble.setBrightnessCallback(onBrightnessChange);
    ble.setBuzzerCallback(onBuzzerCommand);
    ble.setSongInfoCallback(onSongInfoReceive);
    ble.setConnectionCallback(onConnectionChange);
    ble.begin("AI FanStick");

    // 시작음
    playBuzzer("success");

    // 대기 상태 표시
    led.startPattern("pulse");

    Serial.println("[SETUP] Ready!");
    Serial.println("Commands: C:R,G,B | P:pattern | T:text | B:buzz | L:brightness");
}

void loop() {
    // BLE 상태 업데이트
    ble.update();

    // LED 패턴 업데이트
    led.update();

    // 버튼 처리
    handleButton();

    // 시리얼 명령 처리 (디버그용)
    handleSerialCommand();

    // 약간의 딜레이
    delay(10);
}
