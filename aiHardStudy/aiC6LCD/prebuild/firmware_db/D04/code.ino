// [막대 그래프] LCD에 막대 그래프 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Bar Chart", C_YELLOW, 2);
  lcd.drawLine(30, 40, 30, 260, C_TEXT);
  lcd.drawLine(30, 260, 160, 260, C_TEXT);
  int vals[] = {80, 50, 120, 90, 60};
  uint16_t cols[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN};
  const char* labels[] = {"A", "B", "C", "D", "E"};
  for (int i = 0; i < 5; i++) {
    int x = 38 + i * 24;
    int h = vals[i];
    lcd.fillRect(x, 260 - h, 18, h, cols[i]);
    lcdText(x + 3, 265, labels[i], C_TEXT, 1);
  }
  setColor(0, 0, 30);
}
void loop() { delay(10000); }
