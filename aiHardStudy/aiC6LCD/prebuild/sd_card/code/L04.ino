// [SD 용량] SD 카드 용량/사용량 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Info", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  uint64_t total = SD.totalBytes();
  uint64_t used = SD.usedBytes();
  uint64_t free_ = total - used;
  float pct = (float)used / total * 100;
  char buf[32];
  lcd.drawLine(0, 35, 172, 35, C_GRAY);
  snprintf(buf, sizeof(buf), "Total: %uMB", (unsigned)(total / 1024 / 1024));
  lcdText(10, 50, buf, C_TEXT, 2);
  snprintf(buf, sizeof(buf), "Used:  %uMB", (unsigned)(used / 1024 / 1024));
  lcdText(10, 80, buf, C_YELLOW, 2);
  snprintf(buf, sizeof(buf), "Free:  %uMB", (unsigned)(free_ / 1024 / 1024));
  lcdText(10, 110, buf, C_GREEN, 2);
  lcd.drawRect(10, 160, 152, 30, C_TEXT);
  int barW = (int)(pct * 148 / 100);
  uint16_t barC = (pct < 70) ? C_GREEN : (pct < 90) ? C_YELLOW : C_RED;
  lcd.fillRect(12, 162, barW, 26, barC);
  snprintf(buf, sizeof(buf), "%.1f%%", pct);
  lcdText(55, 200, buf, C_TEXT, 2);
  lcdText(10, 240, "Card Type:", C_GRAY, 1);
  uint8_t ct = SD.cardType();
  const char* types[] = {"None", "MMC", "SD", "SDHC", "Unknown"};
  int ti = (ct <= 3) ? ct : 4;
  lcdText(80, 240, types[ti], C_YELLOW, 1);
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
