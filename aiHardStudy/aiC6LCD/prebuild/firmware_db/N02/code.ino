// [BLE 알림 로그] 메시지 수신 → SD 로그 + LCD + LED
int logCount = 0;
void onBleReceive(String cmd) {
  logCount++;
  setColor(255, 255, 0);
  if (SD.begin(4, SPI)) {
    File f = SD.open("/alerts.csv", FILE_APPEND);
    if (f) { f.printf("%lu,%d,%s\n", millis()/1000, logCount, cmd.c_str()); f.close(); }
  }
  lcd.fillRect(0, 70, 172, 200, C_BG);
  lcdText(5, 70, "NEW ALERT!", C_RED, 2);
  lcdText(5, 100, cmd.c_str(), C_GREEN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Log #%d saved", logCount);
  lcdText(5, 150, buf, C_YELLOW, 1);
  delay(500); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Alert Logger", C_CYAN, 2);
  lcdText(10, 40, "Waiting BLE...", C_GRAY, 2);
}
void loop() { delay(10000); }
