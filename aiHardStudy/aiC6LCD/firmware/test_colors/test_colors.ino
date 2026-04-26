/**
 * WS2812 + LCD Color Test
 * LCD에 색상 이름을 표시하고, WS2812를 해당 색상으로 설정
 * 3초마다 다음 색상으로 변경
 */

#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Adafruit_NeoPixel.h>

#define LCD_MOSI  6
#define LCD_SCLK  7
#define LCD_CS    14
#define LCD_DC    15
#define LCD_RST   21
#define LCD_BL    22
#define WS2812_PIN 8

Adafruit_ST7789 lcd = Adafruit_ST7789(LCD_CS, LCD_DC, LCD_MOSI, LCD_SCLK, LCD_RST);
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_RGB + NEO_KHZ800);

struct ColorEntry {
  const char* name;
  uint8_t r, g, b;
};

ColorEntry colors[] = {
  {"RED",     255,   0,   0},
  {"GREEN",     0, 255,   0},
  {"BLUE",      0,   0, 255},
};
const int NUM_COLORS = 3;

void showColor(int idx) {
  ColorEntry& c = colors[idx];

  // WS2812 설정
  pixel.setPixelColor(0, pixel.Color(c.r, c.g, c.b));
  pixel.show();

  // LCD 표시
  lcd.fillScreen(ST77XX_BLACK);

  // 색상 이름 (큰 글씨)
  lcd.setTextSize(3);
  lcd.setTextColor(lcd.color565(c.r, c.g, c.b), ST77XX_BLACK);
  lcd.setCursor(10, 20);
  lcd.print(c.name);

  // RGB 값
  lcd.setTextSize(2);
  lcd.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  lcd.setCursor(10, 60);
  char buf[32];
  snprintf(buf, sizeof(buf), "R:%3d G:%3d", c.r, c.g);
  lcd.print(buf);
  lcd.setCursor(10, 85);
  snprintf(buf, sizeof(buf), "B:%3d", c.b);
  lcd.print(buf);

  // 색상 미리보기 박스
  lcd.fillRect(10, 120, 152, 80, lcd.color565(c.r, c.g, c.b));
  lcd.drawRect(10, 120, 152, 80, ST77XX_WHITE);

  // 인덱스 표시
  lcd.setTextSize(1);
  lcd.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  lcd.setCursor(10, 220);
  snprintf(buf, sizeof(buf), "Color %d/%d (3sec auto)", idx + 1, NUM_COLORS);
  lcd.print(buf);

  // 순서 표시
  lcd.setCursor(10, 240);
  lcd.print("BOOT btn: next color");

  Serial.printf("Color %d/%d: %s (R=%d G=%d B=%d)\n",
    idx + 1, NUM_COLORS, c.name, c.r, c.g, c.b);
}

void setup() {
  Serial.begin(115200);

  pinMode(LCD_BL, OUTPUT);
  digitalWrite(LCD_BL, HIGH);
  lcd.init(172, 320);
  lcd.setRotation(0);
  lcd.fillScreen(ST77XX_BLACK);

  pixel.begin();
  pixel.setBrightness(50);

  pinMode(9, INPUT_PULLUP);

  Serial.println("WS2812 + LCD Color Test");
  showColor(0);
}

int currentColor = 0;
unsigned long lastChange = 0;

void loop() {
  // 자동 3초 순환
  if (millis() - lastChange > 3000) {
    currentColor = (currentColor + 1) % NUM_COLORS;
    showColor(currentColor);
    lastChange = millis();
  }

  // BOOT 버튼으로 수동 변경
  if (digitalRead(9) == LOW) {
    delay(200); // debounce
    currentColor = (currentColor + 1) % NUM_COLORS;
    showColor(currentColor);
    lastChange = millis();
    while (digitalRead(9) == LOW) delay(10);
  }
}
