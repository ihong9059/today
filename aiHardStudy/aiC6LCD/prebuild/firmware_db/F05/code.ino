// [길게/짧게] 버튼 길게/짧게 구분
unsigned long pressStart = 0;
bool pressing = false;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Press Test", C_CYAN, 2);
  lcdText(10, 40, "Short < 500ms", C_TEXT, 1);
  lcdText(10, 55, "Long  > 500ms", C_TEXT, 1);
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) {
    pressing = true;
    pressStart = millis();
  }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    lcd.fillRect(0, 100, 172, 200, C_BG);
    if (dur > 500) {
      lcdText(10, 120, "LONG!", C_RED, 4);
      setColor(255, 0, 0);
    } else {
      lcdText(10, 120, "SHORT!", C_GREEN, 4);
      setColor(0, 255, 0);
    }
    char buf[32];
    snprintf(buf, sizeof(buf), "%lu ms", dur);
    lcdText(20, 200, buf, C_YELLOW, 2);
  }
  delay(10);
}
