/**
 * AI FanStick MVP - ESP32-C3 SuperMini
 * 하드웨어 테스트용 펌웨어
 *
 * GPIO 핀 설정:
 * - GPIO1: WS2812 LED (DIN)
 * - GPIO2: Buzzer
 * - GPIO5: Button (풀업)
 * - GPIO6: I2C SDA (OLED)
 * - GPIO7: I2C SCL (OLED)
 *
 * 시리얼 명령:
 * - C:R,G,B     → LED 색상 변경
 * - P:패턴명   → 패턴 실행 (rainbow, pulse, blink, wave, solid)
 * - T:텍스트   → OLED 텍스트 표시
 * - B:패턴     → 버저 (ack, beep, error, success)
 * - L:밝기     → 밝기 조절 (0-255)
 */

#include <Adafruit_NeoPixel.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ===== GPIO 핀 정의 =====
#define LED_PIN     1
#define BUZZER_PIN  2
#define BUTTON_PIN  5
#define SDA_PIN     6
#define SCL_PIN     7

// ===== LED 설정 =====
#define NUM_LEDS    1
Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

uint8_t currentR = 0, currentG = 0, currentB = 128;
uint8_t brightness = 128;
String currentPattern = "solid";
unsigned long lastPatternUpdate = 0;
int patternStep = 0;
bool patternRunning = false;

// ===== OLED 설정 =====
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
#define OLED_ADDRESS  0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
bool oledReady = false;

// ===== 버튼 설정 =====
bool lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

// ===== 함수 선언 =====
void parseCommand(String cmd);
void setLedColor(uint8_t r, uint8_t g, uint8_t b);
void startPattern(String pattern);
void updatePattern();
void playBuzzer(String pattern);
void showText(String text);
uint32_t colorWheel(uint8_t pos);

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.println("================================");
  Serial.println("  AI FanStick MVP v1.0");
  Serial.println("  Hardware Test Mode");
  Serial.println("================================");

  // 핀 설정
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // LED 초기화
  strip.begin();
  strip.setBrightness(brightness);
  strip.show();
  Serial.println("[LED] Initialized on GPIO1");

  // OLED 초기화
  Wire.begin(SDA_PIN, SCL_PIN);
  if (display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
    oledReady = true;
    display.clearDisplay();
    display.setTextSize(2);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(10, 10);
    display.println("FanStick");
    display.setTextSize(1);
    display.setCursor(20, 35);
    display.println("HW Test v1.0");
    display.setCursor(10, 50);
    display.println("Ready for commands");
    display.display();
    Serial.println("[OLED] Initialized (128x64)");
  } else {
    Serial.println("[OLED] Init failed!");
  }

  // 시작 LED (파란색)
  setLedColor(0, 0, 128);

  // 시작음
  playBuzzer("success");

  Serial.println("[SETUP] Ready!");
  Serial.println("Commands: C:R,G,B | P:pattern | T:text | B:buzz | L:brightness");
  Serial.println("================================");
}

void loop() {
  // 시리얼 명령 처리
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd.length() > 0) {
      Serial.print("[CMD] ");
      Serial.println(cmd);
      parseCommand(cmd);
    }
  }

  // 패턴 업데이트
  updatePattern();

  // 버튼 처리
  static bool buttonState = HIGH;
  bool reading = digitalRead(BUTTON_PIN);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == LOW) {
        Serial.println("[BUTTON] Pressed");
        playBuzzer("ack");

        // 패턴 전환
        static int patternIndex = 0;
        const char* patterns[] = {"solid", "rainbow", "pulse", "blink", "wave"};
        patternIndex = (patternIndex + 1) % 5;
        startPattern(patterns[patternIndex]);
      }
    }
  }
  lastButtonState = reading;

  delay(10);
}

void parseCommand(String cmd) {
  if (cmd.length() < 2 || cmd.charAt(1) != ':') {
    Serial.println("[ERR] Invalid format");
    return;
  }

  char type = cmd.charAt(0);
  String param = cmd.substring(2);

  switch (type) {
    case 'C': case 'c': {  // 색상: C:R,G,B
      int comma1 = param.indexOf(',');
      int comma2 = param.lastIndexOf(',');
      if (comma1 > 0 && comma2 > comma1) {
        int r = param.substring(0, comma1).toInt();
        int g = param.substring(comma1 + 1, comma2).toInt();
        int b = param.substring(comma2 + 1).toInt();
        r = constrain(r, 0, 255);
        g = constrain(g, 0, 255);
        b = constrain(b, 0, 255);
        setLedColor(r, g, b);
        Serial.printf("[LED] Color: R=%d, G=%d, B=%d\n", r, g, b);
      }
      break;
    }

    case 'P': case 'p': {  // 패턴: P:rainbow
      startPattern(param);
      Serial.print("[LED] Pattern: ");
      Serial.println(param);
      break;
    }

    case 'T': case 't': {  // 텍스트: T:Hello
      showText(param);
      Serial.print("[OLED] Text: ");
      Serial.println(param);
      break;
    }

    case 'B': case 'b': {  // 버저: B:ack
      playBuzzer(param);
      Serial.print("[BUZZER] ");
      Serial.println(param);
      break;
    }

    case 'L': case 'l': {  // 밝기: L:128
      int b = param.toInt();
      b = constrain(b, 0, 255);
      brightness = b;
      strip.setBrightness(b);
      strip.show();
      Serial.printf("[LED] Brightness: %d\n", b);
      break;
    }

    case 'D': case 'd': {  // 디버그: D:gpio 또는 D:info
      if (param == "gpio" || param == "GPIO") {
        Serial.printf("[DEBUG] GPIO5 (Button): %d\n", digitalRead(BUTTON_PIN));
        Serial.printf("[DEBUG] GPIO1 (LED): %d\n", digitalRead(LED_PIN));
        Serial.printf("[DEBUG] GPIO2 (Buzzer): %d\n", digitalRead(BUZZER_PIN));
      } else {
        Serial.println("[DEBUG] Info:");
        Serial.printf("  Button Pin: GPIO%d, State: %s\n", BUTTON_PIN, digitalRead(BUTTON_PIN) ? "HIGH" : "LOW");
        Serial.printf("  LED Pin: GPIO%d\n", LED_PIN);
        Serial.printf("  Buzzer Pin: GPIO%d\n", BUZZER_PIN);
        Serial.printf("  OLED: %s\n", oledReady ? "OK" : "FAIL");
      }
      break;
    }

    default:
      Serial.println("[ERR] Unknown command");
  }
}

void setLedColor(uint8_t r, uint8_t g, uint8_t b) {
  currentR = r;
  currentG = g;
  currentB = b;
  patternRunning = false;
  currentPattern = "solid";
  strip.setPixelColor(0, strip.Color(r, g, b));
  strip.show();
}

void startPattern(String pattern) {
  currentPattern = pattern;
  patternStep = 0;
  lastPatternUpdate = millis();

  if (pattern == "solid") {
    patternRunning = false;
    strip.setPixelColor(0, strip.Color(currentR, currentG, currentB));
    strip.show();
  } else {
    patternRunning = true;
  }
}

void updatePattern() {
  if (!patternRunning) return;

  unsigned long now = millis();

  if (currentPattern == "rainbow") {
    if (now - lastPatternUpdate > 100) {
      lastPatternUpdate = now;
      uint32_t color = colorWheel(patternStep);
      strip.setPixelColor(0, color);
      strip.show();
      patternStep = (patternStep + 4) % 256;
    }
  }
  else if (currentPattern == "pulse") {
    if (now - lastPatternUpdate > 20) {
      lastPatternUpdate = now;
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
    if (now - lastPatternUpdate > 500) {
      lastPatternUpdate = now;
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
    if (now - lastPatternUpdate > 30) {
      lastPatternUpdate = now;
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

uint32_t colorWheel(uint8_t pos) {
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

void playBuzzer(String pattern) {
  if (pattern == "ack") {
    tone(BUZZER_PIN, 2700, 100);
  }
  else if (pattern == "beep") {
    tone(BUZZER_PIN, 2700, 200);
  }
  else if (pattern == "error") {
    for (int i = 0; i < 3; i++) {
      tone(BUZZER_PIN, 2700, 100);
      delay(150);
    }
  }
  else if (pattern == "success") {
    tone(BUZZER_PIN, 2000, 100);
    delay(100);
    tone(BUZZER_PIN, 2500, 100);
    delay(100);
    tone(BUZZER_PIN, 3000, 150);
  }
  else if (pattern == "connect") {
    tone(BUZZER_PIN, 2700, 100);
    delay(100);
    tone(BUZZER_PIN, 2700, 100);
  }
}

void showText(String text) {
  if (!oledReady) return;

  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Message:");
  display.println("----------------");

  // 줄바꿈 처리 (21자씩)
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
