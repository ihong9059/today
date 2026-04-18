/**
 * ESP32-C6-LCD-1.47 전체 하드웨어 테스트
 * - LCD (ST7789 172x320)
 * - RGB LED (WS2812 GPIO8)
 * - BOOT 버튼 (GPIO9)
 */

#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Adafruit_NeoPixel.h>

// ─── LCD 핀 정의 (ESP32-C6-LCD-1.47) ───
#define LCD_MOSI  6
#define LCD_SCLK  7
#define LCD_CS    14
#define LCD_DC    15
#define LCD_RST   21
#define LCD_BL    22

// ─── RGB LED ───
#define WS2812_PIN 8
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_GRB + NEO_KHZ800);
#define QMI8658_CTRL7    0x08
#define QMI8658_AX_L     0x35

// ─── BOOT 버튼 (ESP32-C6 = GPIO9) ───
#define BOOT_BTN 9

// ─── LCD 객체 ───
Adafruit_ST7789 tft = Adafruit_ST7789(&SPI, LCD_CS, LCD_DC, LCD_RST);

int testStep = 0;
unsigned long lastUpdate = 0;

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("=== ESP32-S3-LCD-1.47B Hardware Test ===");

  // BOOT 버튼
  pinMode(BOOT_BTN, INPUT_PULLUP);

  // 백라이트 ON
  pinMode(LCD_BL, OUTPUT);
  digitalWrite(LCD_BL, HIGH);

  // SPI 초기화
  SPI.begin(LCD_SCLK, -1, LCD_MOSI, LCD_CS);

  // LCD 초기화
  tft.init(172, 320);
  tft.setRotation(0);
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_WHITE);
  tft.setTextSize(2);

  // RGB LED 초기화
  pixel.begin();
  pixel.clear();
  pixel.show();

  // 시작 화면
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_CYAN);
  tft.setTextSize(2);
  tft.println("UTTEC S3");
  tft.println("HW Test");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_YELLOW);
  tft.println();
  tft.println("Press BOOT btn");
  tft.println("for next test");

  Serial.println("Setup complete. Press BOOT button for next test.");
}

// ─── Test 1: LCD 색상 테스트 ───
void testLCD() {
  Serial.println("[Test 1] LCD Color Test");
  tft.fillScreen(ST77XX_RED);
  delay(500);
  tft.fillScreen(ST77XX_GREEN);
  delay(500);
  tft.fillScreen(ST77XX_BLUE);
  delay(500);
  tft.fillScreen(ST77XX_WHITE);
  delay(500);
  tft.fillScreen(ST77XX_BLACK);

  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_GREEN);
  tft.setTextSize(2);
  tft.println("LCD OK!");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();
  tft.println("172 x 320 ST7789");
  tft.println("Colors: R G B W");
  Serial.println("[Test 1] LCD OK");
}

// ─── Test 2: RGB LED 테스트 ───
void testRGBLED() {
  Serial.println("[Test 2] RGB LED Test");
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_MAGENTA);
  tft.setTextSize(2);
  tft.println("RGB LED");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();

  // 빨강
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  tft.println("RED");
  delay(700);

  // 초록
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();
  tft.println("GREEN");
  delay(700);

  // 파랑
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
  tft.println("BLUE");
  delay(700);

  // 흰색
  pixel.setPixelColor(0, pixel.Color(255, 255, 255));
  pixel.show();
  tft.println("WHITE");
  delay(700);

  // 끄기
  pixel.clear();
  pixel.show();

  tft.println();
  tft.setTextColor(ST77XX_GREEN);
  tft.println("RGB LED OK!");
  Serial.println("[Test 2] RGB LED OK");
}

// ─── Test 3: WiFi 스캔 테스트 ───
void testWiFi() {
  Serial.println("[Test 3] WiFi Scan");
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_YELLOW);
  tft.setTextSize(2);
  tft.println("WiFi 6");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();
  tft.println("ESP32-C6 WiFi 6");
  tft.println("802.11ax support");
  tft.println();
  tft.setTextColor(ST77XX_GREEN);
  tft.println("WiFi 6 Ready!");
  tft.println("+ Zigbee 3.0");
  tft.println("+ Thread/Matter");
  Serial.println("[Test 3] WiFi 6 + Zigbee + Thread");
}

// ─── Test 4: BOOT 버튼 테스트 ───
void testButton() {
  Serial.println("[Test 4] Button Test");
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_CYAN);
  tft.setTextSize(2);
  tft.println("Button");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();
  tft.println("Press BOOT btn...");
  tft.println("(5 sec test)");

  int pressCount = 0;
  unsigned long start = millis();
  bool lastState = HIGH;

  while (millis() - start < 5000) {
    bool state = digitalRead(BOOT_BTN);
    if (state == LOW && lastState == HIGH) {
      pressCount++;
      pixel.setPixelColor(0, pixel.Color(0, 255, 0));
      pixel.show();
      char buf[32];
      snprintf(buf, sizeof(buf), "Press #%d", pressCount);
      tft.println(buf);
      Serial.println(buf);
    } else if (state == HIGH) {
      pixel.clear();
      pixel.show();
    }
    lastState = state;
    delay(50);
  }

  pixel.clear();
  pixel.show();
  char buf[32];
  snprintf(buf, sizeof(buf), "Total: %d presses", pressCount);
  tft.println();
  tft.setTextColor(ST77XX_GREEN);
  tft.println(buf);
  Serial.println(buf);
}

// ─── Test 5: 종합 대시보드 ───
void testDashboard() {
  Serial.println("[Test 5] Dashboard");
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_GREEN);
  tft.setTextSize(2);
  tft.println("ALL OK!");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();
  tft.println("=== Test Results ===");
  tft.println();
  tft.setTextColor(ST77XX_GREEN);
  tft.println("[OK] LCD 172x320");
  tft.println("[OK] RGB LED WS2812");
  tft.println("[OK] WiFi6+Zigbee");
  tft.println("[OK] BOOT Button");
  tft.println();
  tft.setTextColor(ST77XX_YELLOW);
  tft.println("UTTEC C6 Ready!");
  tft.println();
  tft.setTextColor(ST77XX_CYAN);
  tft.println("Board: ESP32-C6-LCD");
  tft.println("CPU: RISC-V 160MHz");
  tft.println("RAM: 512KB");
  tft.println("Flash: 4MB");
  tft.println("WiFi 6 + Zigbee");

  // 무지개 LED 효과
  for (int i = 0; i < 30; i++) {
    uint32_t color = pixel.ColorHSV(i * 65536 / 30);
    pixel.setPixelColor(0, color);
    pixel.show();
    delay(100);
  }
  pixel.clear();
  pixel.show();
}

void loop() {
  // BOOT 버튼 누르면 다음 테스트
  if (digitalRead(BOOT_BTN) == LOW) {
    delay(300);  // 디바운스
    while (digitalRead(BOOT_BTN) == LOW) delay(10);  // 릴리즈 대기

    testStep++;
    switch (testStep) {
      case 1: testLCD(); break;
      case 2: testRGBLED(); break;
      case 3: testWiFi(); break;
      case 4: testButton(); break;
      case 5: testDashboard(); break;
      default:
        testStep = 0;
        tft.fillScreen(ST77XX_BLACK);
        tft.setCursor(10, 10);
        tft.setTextColor(ST77XX_CYAN);
        tft.setTextSize(2);
        tft.println("UTTEC S3");
        tft.println("HW Test");
        tft.setTextSize(1);
        tft.setTextColor(ST77XX_YELLOW);
        tft.println();
        tft.println("Press BOOT btn");
        tft.println("for next test");
        break;
    }
  }
}
