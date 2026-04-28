// [SD CSV] millis 데이터를 CSV로 로깅
unsigned long lastLog = 0;
int logCount = 0;
bool logging = true;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Logger", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    logging = false;
    return;
  }
  File f = SD.open("/log.csv", FILE_WRITE);
  if (f) {
    f.println("time_ms,seconds,heap,uptime_min");
    f.close();
    lcdText(10, 50, "Logging to", C_GREEN, 2);
    lcdText(10, 75, "/log.csv", C_YELLOW, 2);
  }
}
void loop() {
  if (!logging) { delay(1000); return; }
  if (millis() - lastLog >= 1000) {
    lastLog = millis();
    logCount++;
    File f = SD.open("/log.csv", FILE_APPEND);
    if (f) {
      f.printf("%lu,%d,%u,%.1f\n", millis(), logCount, ESP.getFreeHeap(), millis() / 60000.0);
      f.close();
    }
    lcd.fillRect(0, 120, 172, 140, C_BG);
    char buf[32];
    snprintf(buf, sizeof(buf), "Logs: %d", logCount);
    lcdText(10, 120, buf, C_GREEN, 2);
    snprintf(buf, sizeof(buf), "Heap: %u", ESP.getFreeHeap());
    lcdText(10, 150, buf, C_TEXT, 1);
    snprintf(buf, sizeof(buf), "Time: %lus", millis() / 1000);
    lcdText(10, 170, buf, C_TEXT, 1);
    if (logCount % 2) setColor(0, 10, 0); else ledOff();
    if (logCount >= 300) {
      logging = false;
      lcdText(10, 210, "Done! 300 logs", C_YELLOW, 2);
    }
  }
  delay(100);
}
