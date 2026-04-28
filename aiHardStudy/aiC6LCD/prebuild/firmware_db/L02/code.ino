// [SD 읽기] 파일 읽어서 LCD 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Read", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File f = SD.open("/hello.txt", FILE_READ);
  if (!f) {
    lcdText(10, 50, "No file!", C_RED, 2);
    lcdText(10, 75, "Run L01 first", C_GRAY, 1);
    return;
  }
  lcdText(10, 40, "/hello.txt", C_YELLOW, 2);
  lcd.drawLine(0, 60, 172, 60, C_GRAY);
  int y = 70;
  while (f.available() && y < 290) {
    String line = f.readStringUntil('\n');
    lcdText(5, y, line.c_str(), C_GREEN, 1);
    y += 15;
  }
  char buf[32];
  snprintf(buf, sizeof(buf), "Size: %u bytes", f.size());
  lcdText(10, y + 10, buf, C_GRAY, 1);
  f.close();
  setColor(0, 0, 30);
}
void loop() { delay(10000); }
