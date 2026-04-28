// [색상 텍스트] 색상별 텍스트 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Color Text", C_YELLOW, 2);
  lcd.drawLine(0, 32, 172, 32, C_GRAY);
  lcdText(10, 45, "WHITE", C_TEXT, 3);
  lcdText(10, 85, "RED", C_RED, 3);
  lcdText(10, 125, "GREEN", C_GREEN, 3);
  lcdText(10, 165, "BLUE", C_BLUE, 3);
  lcdText(10, 205, "YELLOW", C_YELLOW, 3);
  lcdText(10, 245, "CYAN", C_CYAN, 3);
  lcdText(10, 285, "ORANGE", C_ORANGE, 2);
  setColor(0, 30, 30);
}
void loop() { delay(10000); }
