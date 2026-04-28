// [스마트 알림] BLE → LCD+LED 알림 + SD 로그
int alertCount = 0;
uint16_t alertColors[] = {C_GREEN, C_YELLOW, C_RED};
void onBleReceive(String cmd) {
  alertCount++;
  int level = 0;
  if (cmd.startsWith("WARN:")) { level = 1; cmd = cmd.substring(5); }
  else if (cmd.startsWith("CRIT:")) { level = 2; cmd = cmd.substring(5); }
  else if (cmd.startsWith("INFO:")) { cmd = cmd.substring(5); }
  setColor(level == 2 ? 255 : (level == 1 ? 255 : 0), level == 0 ? 255 : (level == 1 ? 165 : 0), 0);
  lcd.fillRect(0, 60, 172, 200, C_BG);
  const char* labels[] = {"INFO", "WARNING", "CRITICAL"};
  lcdText(10, 60, labels[level], alertColors[level], 2);
  lcdText(5, 90, cmd.c_str(), C_TEXT, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Alert #%d", alertCount);
  lcdText(10, 150, buf, C_GRAY, 1);
  if (SD.begin(4, SPI)) {
    File f = SD.open("/alerts.csv", FILE_APPEND);
    if (f) { f.printf("%lu,%s,%d,%s\n", millis()/1000, labels[level], alertCount, cmd.c_str()); f.close(); }
  }
  delay(1000); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Smart Alert", C_CYAN, 2);
  lcdText(10, 40, "INFO: / WARN:", C_GRAY, 1);
  lcdText(10, 55, "CRIT: prefix", C_GRAY, 1);
}
void loop() { delay(10000); }
