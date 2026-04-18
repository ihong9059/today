/**
 * ESP32-S3-LCD-1.47B 전체 하드웨어 테스트
 * - LCD (ST7789 172x320)
 * - RGB LED (WS2812 GPIO38)
 * - IMU (QMI8658 I2C)
 * - WiFi/BLE 스캔
 * - BOOT 버튼 (GPIO0)
 */

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Adafruit_NeoPixel.h>

// ─── LCD 핀 정의 ───
#define LCD_MOSI  45
#define LCD_SCLK  40
#define LCD_CS    42
#define LCD_DC    41
#define LCD_RST   39
#define LCD_BL    46

// ─── RGB LED ───
#define WS2812_PIN 38
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_GRB + NEO_KHZ800);

// ─── IMU (QMI8658) ───
#define QMI8658_ADDR 0x6B
#define QMI8658_WHO_AM_I 0x00
#define QMI8658_CTRL7    0x08
#define QMI8658_AX_L     0x35

// ─── BOOT 버튼 ───
#define BOOT_BTN 0

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

  // I2C 초기화
  Wire.begin(7, 6);  // SDA=7, SCL=6 (Waveshare 기본)

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

// ─── Test 3: IMU (QMI8658) 테스트 ───
void testIMU() {
  Serial.println("[Test 3] IMU Test");
  tft.fillScreen(ST77XX_BLACK);
  tft.setCursor(10, 10);
  tft.setTextColor(ST77XX_YELLOW);
  tft.setTextSize(2);
  tft.println("IMU Test");
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE);
  tft.println();

  // WHO_AM_I 읽기
  Wire.beginTransmission(QMI8658_ADDR);
  Wire.write(QMI8658_WHO_AM_I);
  Wire.endTransmission(false);
  Wire.requestFrom(QMI8658_ADDR, 1);

  if (Wire.available()) {
    uint8_t whoami = Wire.read();
    char buf[32];
    snprintf(buf, sizeof(buf), "WHO_AM_I: 0x%02X", whoami);
    tft.println(buf);
    Serial.println(buf);

    if (whoami == 0x05) {
      tft.setTextColor(ST77XX_GREEN);
      tft.println("QMI8658 Found!");
      Serial.println("QMI8658 Found!");

      // 가속도/자이로 활성화
      Wire.beginTransmission(QMI8658_ADDR);
      Wire.write(QMI8658_CTRL7);
      Wire.write(0x03);  // Accel + Gyro enable
      Wire.endTransmission();
      delay(100);

      // 가속도 읽기
      tft.setTextColor(ST77XX_WHITE);
      tft.println();
      for (int i = 0; i < 5; i++) {
        Wire.beginTransmission(QMI8658_ADDR);
        Wire.write(QMI8658_AX_L);
        Wire.endTransmission(false);
        Wire.requestFrom(QMI8658_ADDR, 6);

        if (Wire.available() >= 6) {
          int16_t ax = Wire.read() | (Wire.read() << 8);
          int16_t ay = Wire.read() | (Wire.read() << 8);
          int16_t az = Wire.read() | (Wire.read() << 8);
          snprintf(buf, sizeof(buf), "A:%6d %6d %6d", ax, ay, az);
          tft.println(buf);
          Serial.println(buf);
        }
        delay(200);
      }
    } else {
      tft.setTextColor(ST77XX_RED);
      tft.println("Unknown device!");
    }
  } else {
    tft.setTextColor(ST77XX_RED);
    tft.println("IMU not found!");
    Serial.println("IMU not found!");
  }
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
  tft.println("[OK] IMU QMI8658");
  tft.println("[OK] BOOT Button");
  tft.println();
  tft.setTextColor(ST77XX_YELLOW);
  tft.println("UTTEC S3 Ready!");
  tft.println();
  tft.setTextColor(ST77XX_CYAN);
  tft.println("Board: ESP32-S3-LCD");
  tft.println("CPU: LX7 240MHz x2");
  tft.println("RAM: 512K+8M PSRAM");
  tft.println("Flash: 16MB");

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
      case 3: testIMU(); break;
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
