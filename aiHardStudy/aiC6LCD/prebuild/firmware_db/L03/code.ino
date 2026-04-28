// [SD 목록] 파일/폴더 목록 LCD 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Files", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File root = SD.open("/");
  if (!root) {
    lcdText(10, 50, "Open Fail", C_RED, 2);
    return;
  }
  lcd.drawLine(0, 35, 172, 35, C_GRAY);
  int y = 40, count = 0;
  File entry;
  while ((entry = root.openNextFile()) && y < 290) {
    char buf[32];
    if (entry.isDirectory()) {
      snprintf(buf, sizeof(buf), "[%s]", entry.name());
      lcdText(5, y, buf, C_YELLOW, 1);
    } else {
      snprintf(buf, sizeof(buf), "%s", entry.name());
      lcdText(5, y, buf, C_GREEN, 1);
      snprintf(buf, sizeof(buf), "%uB", entry.size());
      lcdText(120, y, buf, C_GRAY, 1);
    }
    entry.close();
    y += 15;
    count++;
  }
  root.close();
  char buf[32];
  snprintf(buf, sizeof(buf), "Total: %d items", count);
  lcdText(10, y + 5, buf, C_TEXT, 1);
  setColor(0, 30, 30);
}
void loop() { delay(10000); }
