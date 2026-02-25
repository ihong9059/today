/**
 * AI FanStick MVP - LED 컨트롤러
 * WS2812 (Neopixel) RGB LED 제어
 *
 * GPIO1 (DIN)에 연결된 WS2812 LED를 제어합니다.
 */

#ifndef LED_CONTROLLER_H
#define LED_CONTROLLER_H

#include <Adafruit_NeoPixel.h>

// 핀 및 LED 설정
#define LED_PIN     1
#define NUM_LEDS    1

class LedController {
private:
    Adafruit_NeoPixel strip;
    uint8_t currentR, currentG, currentB;
    uint8_t brightness;
    String currentPattern;
    unsigned long lastUpdate;
    int patternStep;
    bool patternRunning;

public:
    LedController() :
        strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800),
        currentR(0), currentG(0), currentB(0),
        brightness(128),
        currentPattern("solid"),
        lastUpdate(0),
        patternStep(0),
        patternRunning(false) {}

    void begin() {
        strip.begin();
        strip.setBrightness(brightness);
        strip.show();
        Serial.println("[LED] Initialized on GPIO1");
    }

    /**
     * 단색 설정
     */
    void setColor(uint8_t r, uint8_t g, uint8_t b) {
        currentR = r;
        currentG = g;
        currentB = b;
        currentPattern = "solid";
        patternRunning = false;

        strip.setPixelColor(0, strip.Color(r, g, b));
        strip.show();

        Serial.printf("[LED] Color: R=%d, G=%d, B=%d\n", r, g, b);
    }

    /**
     * 밝기 설정 (0-255)
     */
    void setBrightness(uint8_t b) {
        brightness = b;
        strip.setBrightness(b);
        strip.show();
        Serial.printf("[LED] Brightness: %d\n", b);
    }

    /**
     * 패턴 시작
     */
    void startPattern(const String& pattern) {
        currentPattern = pattern;
        patternStep = 0;
        lastUpdate = millis();
        patternRunning = true;
        Serial.printf("[LED] Pattern: %s\n", pattern.c_str());
    }

    /**
     * 패턴 정지
     */
    void stopPattern() {
        patternRunning = false;
        currentPattern = "solid";
        setColor(currentR, currentG, currentB);
    }

    /**
     * LED 끄기
     */
    void off() {
        patternRunning = false;
        strip.setPixelColor(0, 0);
        strip.show();
    }

    /**
     * 패턴 업데이트 (loop에서 호출)
     */
    void update() {
        if (!patternRunning) return;

        unsigned long now = millis();

        if (currentPattern == "rainbow") {
            // 무지개 패턴 (200ms 간격)
            if (now - lastUpdate > 200) {
                lastUpdate = now;
                uint32_t color = wheel(patternStep);
                strip.setPixelColor(0, color);
                strip.show();
                patternStep = (patternStep + 8) % 256;
            }
        }
        else if (currentPattern == "pulse") {
            // 페이드 인/아웃 (20ms 간격)
            if (now - lastUpdate > 20) {
                lastUpdate = now;
                float factor = (sin(patternStep * 0.1) + 1.0) / 2.0;
                uint8_t r = currentR * factor;
                uint8_t g = currentG * factor;
                uint8_t b = currentB * factor;
                strip.setPixelColor(0, strip.Color(r, g, b));
                strip.show();
                patternStep++;
            }
        }
        else if (currentPattern == "blink") {
            // 깜빡임 (500ms 간격)
            if (now - lastUpdate > 500) {
                lastUpdate = now;
                patternStep = !patternStep;
                if (patternStep) {
                    strip.setPixelColor(0, strip.Color(currentR, currentG, currentB));
                } else {
                    strip.setPixelColor(0, 0);
                }
                strip.show();
            }
        }
        else if (currentPattern == "wave") {
            // 파도 효과 (30ms 간격)
            if (now - lastUpdate > 30) {
                lastUpdate = now;
                float wave = (sin(patternStep * 0.15) + 1.0) / 2.0;
                uint8_t r = currentR * wave;
                uint8_t g = currentG * wave;
                uint8_t b = currentB * wave;
                strip.setPixelColor(0, strip.Color(r, g, b));
                strip.show();
                patternStep++;
            }
        }
    }

    // 현재 색상 getter
    uint8_t getR() { return currentR; }
    uint8_t getG() { return currentG; }
    uint8_t getB() { return currentB; }

private:
    /**
     * 색상 휠 (무지개 효과용)
     */
    uint32_t wheel(uint8_t pos) {
        if (pos < 85) {
            return strip.Color(pos * 3, 255 - pos * 3, 0);
        } else if (pos < 170) {
            pos -= 85;
            return strip.Color(255 - pos * 3, 0, pos * 3);
        } else {
            pos -= 170;
            return strip.Color(0, pos * 3, 255 - pos * 3);
        }
    }
};

#endif // LED_CONTROLLER_H
