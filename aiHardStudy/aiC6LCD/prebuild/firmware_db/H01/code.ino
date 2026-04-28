// [LED+LCD 빨강] 동시에 빨간색 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcd.fillScreen(C_RED);
  lcdText(20, 100, "RED", C_TEXT, 4);
  lcdText(20, 160, "LED + LCD", C_YELLOW, 2);
  setColor(255, 0, 0);
}
void loop() { delay(10000); }
