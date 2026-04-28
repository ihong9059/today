// [밝기 슬라이더] LED 밝기를 LCD 바로 표시
int bright = 0;
int dir = 2;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Brightness", C_CYAN, 2);
}
void loop() {
  bright += dir;
  if (bright >= 255) { bright = 255; dir = -2; }
  if (bright <= 0) { bright = 0; dir = 2; }
  pixel.setBrightness(bright);
  setColor(0, 0, 255);
  int barW = bright * 140 / 255;
  lcd.fillRect(16, 80, barW, 30, C_BLUE);
  lcd.fillRect(16 + barW, 80, 140 - barW, 30, C_GRAY);
  lcd.drawRect(16, 80, 140, 30, C_TEXT);
  char buf[16];
  snprintf(buf, sizeof(buf), "%3d / 255", bright);
  lcd.fillRect(0, 130, 172, 20, C_BG);
  lcdText(30, 130, buf, C_TEXT, 2);
  delay(20);
}
