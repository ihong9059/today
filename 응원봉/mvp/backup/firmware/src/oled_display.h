/**
 * AI FanStick MVP - OLED 디스플레이
 * SSD1306 128x64 I2C OLED 제어
 *
 * GPIO6 (SDA), GPIO7 (SCL)에 연결된 OLED를 제어합니다.
 */

#ifndef OLED_DISPLAY_H
#define OLED_DISPLAY_H

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// OLED 설정
#define SCREEN_WIDTH    128
#define SCREEN_HEIGHT   64
#define OLED_RESET      -1
#define OLED_ADDRESS    0x3C
#define SDA_PIN         6
#define SCL_PIN         7

class OledDisplay {
private:
    Adafruit_SSD1306 display;
    bool initialized;
    String currentText;
    String statusLine;

public:
    OledDisplay() :
        display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET),
        initialized(false),
        currentText(""),
        statusLine("Ready") {}

    bool begin() {
        // I2C 초기화 (ESP32-C3 핀 지정)
        Wire.begin(SDA_PIN, SCL_PIN);

        if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
            Serial.println("[OLED] SSD1306 allocation failed");
            initialized = false;
            return false;
        }

        initialized = true;
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SSD1306_WHITE);
        display.cp437(true);  // CP437 문자셋 사용

        // 시작 화면
        showStartup();

        Serial.println("[OLED] Initialized (128x64)");
        return true;
    }

    /**
     * 시작 화면 표시
     */
    void showStartup() {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(2);
        display.setCursor(10, 10);
        display.println("FanStick");
        display.setTextSize(1);
        display.setCursor(20, 35);
        display.println("AI MVP v1.0");
        display.setCursor(15, 50);
        display.println("Connecting...");
        display.display();
    }

    /**
     * 연결 상태 표시
     */
    void showConnected(const String& deviceName) {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("BLE Connected");
        display.println("----------------");
        display.setCursor(0, 20);
        display.print("Device: ");
        display.println(deviceName.substring(0, 10));  // 10자 제한
        display.setCursor(0, 40);
        display.println("Ready for commands");
        display.display();

        statusLine = "Connected";
    }

    /**
     * 연결 해제 표시
     */
    void showDisconnected() {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("BLE Disconnected");
        display.println("----------------");
        display.setCursor(0, 30);
        display.println("Waiting for");
        display.println("connection...");
        display.display();

        statusLine = "Waiting";
    }

    /**
     * 텍스트 메시지 표시
     */
    void showText(const String& text) {
        if (!initialized) return;

        currentText = text;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("Message:");
        display.println("----------------");

        // 긴 텍스트 줄바꿈 처리 (21자씩)
        display.setCursor(0, 20);
        int len = text.length();
        int pos = 0;
        int line = 0;

        while (pos < len && line < 4) {
            String sub = text.substring(pos, min(pos + 21, len));
            display.println(sub);
            pos += 21;
            line++;
        }

        display.display();
    }

    /**
     * 현재 곡 정보 표시
     */
    void showSongInfo(const String& songTitle, const String& colorName) {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("Now Playing:");
        display.println("----------------");

        // 곡 제목 (2줄까지)
        display.setCursor(0, 20);
        if (songTitle.length() > 21) {
            display.println(songTitle.substring(0, 21));
            display.println(songTitle.substring(21, min((int)songTitle.length(), 42)));
        } else {
            display.println(songTitle);
        }

        // 색상 정보
        display.setCursor(0, 50);
        display.print("Color: ");
        display.println(colorName);

        display.display();
    }

    /**
     * LED 색상 표시 (RGB 값)
     */
    void showLedColor(uint8_t r, uint8_t g, uint8_t b) {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("LED Color:");
        display.println("----------------");

        display.setCursor(0, 25);
        display.print("R: ");
        display.println(r);
        display.print("G: ");
        display.println(g);
        display.print("B: ");
        display.println(b);

        // 색상 미리보기 (사각형)
        display.fillRect(80, 20, 40, 40, SSD1306_WHITE);

        display.display();
    }

    /**
     * 상태 바 업데이트
     */
    void updateStatus(const String& status) {
        statusLine = status;
    }

    /**
     * 에러 메시지 표시
     */
    void showError(const String& error) {
        if (!initialized) return;

        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 0);
        display.println("ERROR");
        display.println("================");
        display.setCursor(0, 20);

        // 에러 메시지 출력 (여러 줄)
        int len = error.length();
        int pos = 0;
        while (pos < len) {
            display.println(error.substring(pos, min(pos + 21, len)));
            pos += 21;
        }

        display.display();
    }

    /**
     * 화면 지우기
     */
    void clear() {
        if (!initialized) return;
        display.clearDisplay();
        display.display();
    }

    bool isInitialized() {
        return initialized;
    }
};

#endif // OLED_DISPLAY_H
