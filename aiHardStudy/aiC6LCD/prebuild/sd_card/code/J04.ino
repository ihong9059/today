// [BLE 상태] 연결 상태를 LCD에 실시간 표시
unsigned long lastUpdate = 0;
int counter = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Status", C_CYAN, 2);
}
void loop() {
  if (millis() - lastUpdate > 1000) {
    lastUpdate = millis();
    counter++;
    lcd.fillRect(0, 60, 172, 200, C_BG);
    if (deviceConnected) {
      lcdText(10, 60, "Connected", C_GREEN, 3);
      setColor(0, 255, 0);
      lcd.fillCircle(86, 160, 30, C_GREEN);
      char buf[16];
      snprintf(buf, sizeof(buf), "Time: %ds", counter);
      lcdText(10, 220, buf, C_TEXT, 2);
    } else {
      lcdText(10, 60, "Waiting..", C_RED, 3);
      if (counter % 2) setColor(0, 0, 30); else ledOff();
      lcd.drawCircle(86, 160, 30, C_RED);
      lcdText(20, 220, "Connect via", C_GRAY, 2);
      lcdText(20, 245, "UTTEC App", C_GRAY, 2);
    }
  }
  delay(100);
}
