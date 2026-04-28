// [디지털시계] LCD에 시:분:초 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 10, "Clock", C_CYAN, 3);
  lcd.drawLine(0, 45, 172, 45, C_GRAY);
}
void loop() {
  unsigned long t = millis() / 1000;
  int h = (t / 3600) % 24;
  int m = (t / 60) % 60;
  int s = t % 60;
  char buf[16];
  snprintf(buf, sizeof(buf), "%02d:%02d:%02d", h, m, s);
  lcd.fillRect(0, 80, 172, 60, C_BG);
  lcdText(10, 90, buf, C_GREEN, 4);
  snprintf(buf, sizeof(buf), "%lu sec", t);
  lcd.fillRect(0, 180, 172, 20, C_BG);
  lcdText(20, 180, buf, C_GRAY, 2);
  delay(1000);
}
