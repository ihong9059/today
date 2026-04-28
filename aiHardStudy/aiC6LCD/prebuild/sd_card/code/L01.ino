// [SD 쓰기] Hello World 텍스트 파일 생성
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Write", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File f = SD.open("/hello.txt", FILE_WRITE);
  if (f) {
    f.println("Hello, World!");
    f.println("UTTEC C6-LCD");
    f.printf("Uptime: %lu ms\n", millis());
    f.close();
    lcdText(10, 50, "Written!", C_GREEN, 2);
    lcdText(10, 80, "/hello.txt", C_YELLOW, 2);
    File r = SD.open("/hello.txt", FILE_READ);
    if (r) {
      lcdText(10, 120, "Content:", C_TEXT, 2);
      int y = 145;
      while (r.available() && y < 290) {
        String line = r.readStringUntil('\n');
        lcdText(10, y, line.c_str(), C_GREEN, 1);
        y += 15;
      }
      r.close();
    }
  } else {
    lcdText(10, 50, "Write Fail", C_RED, 2);
  }
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
