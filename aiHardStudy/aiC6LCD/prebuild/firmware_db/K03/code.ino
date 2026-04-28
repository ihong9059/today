// [포토프레임] 컬러 도형 슬라이드쇼
int slide = 0;
void drawSlide0() {
  lcd.fillScreen(lcd.color565(0, 0, 60));
  for (int i = 0; i < 8; i++)
    lcd.fillCircle(random(10, 162), random(10, 310), random(10, 30), lcd.color565(random(256), random(256), random(256)));
}
void drawSlide1() {
  lcd.fillScreen(C_BG);
  for (int i = 0; i < 6; i++)
    lcd.fillRect(random(0, 120), random(0, 260), random(20, 60), random(20, 60), lcd.color565(random(256), random(256), random(256)));
}
void drawSlide2() {
  for (int y = 0; y < 320; y += 4) {
    uint16_t c = lcd.color565(y * 200 / 320, 100, 255 - y * 200 / 320);
    lcd.fillRect(0, y, 172, 4, c);
  }
  lcdText(20, 140, "ART", C_TEXT, 4);
}
void drawSlide3() {
  lcd.fillScreen(C_BG);
  for (int i = 0; i < 20; i++) {
    int x1 = random(172), y1 = random(320), x2 = random(172), y2 = random(320);
    lcd.drawLine(x1, y1, x2, y2, lcd.color565(random(256), random(256), random(256)));
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
}
void loop() {
  switch (slide % 4) {
    case 0: drawSlide0(); break;
    case 1: drawSlide1(); break;
    case 2: drawSlide2(); break;
    case 3: drawSlide3(); break;
  }
  slide++;
  setColor(random(50), random(50), random(50));
  delay(3000);
}
