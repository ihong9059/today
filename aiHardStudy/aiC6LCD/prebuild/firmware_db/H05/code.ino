// [경찰차+경고] LED 사이렌 + LCD 경고
int phase = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  if (phase % 2 == 0) {
    setColor(255, 0, 0);
    lcd.fillScreen(C_RED);
    lcdText(10, 80, "WARNING!", C_TEXT, 3);
    lcdText(10, 130, "POLICE", C_YELLOW, 3);
  } else {
    setColor(0, 0, 255);
    lcd.fillScreen(C_BLUE);
    lcdText(10, 80, "WARNING!", C_TEXT, 3);
    lcdText(10, 130, "POLICE", C_YELLOW, 3);
  }
  phase++;
  delay(300);
}
