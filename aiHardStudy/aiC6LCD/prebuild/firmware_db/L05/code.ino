// [SD 카운터] 버튼 횟수를 SD에 저장
int count = 0;
bool lastBtn = HIGH;
void loadCount() {
  File f = SD.open("/count.txt", FILE_READ);
  if (f) {
    String s = f.readStringUntil('\n');
    count = s.toInt();
    f.close();
  }
}
void saveCount() {
  File f = SD.open("/count.txt", FILE_WRITE);
  if (f) {
    f.println(count);
    f.close();
  }
}
void showCount() {
  lcd.fillRect(0, 80, 172, 60, C_BG);
  char buf[16];
  snprintf(buf, sizeof(buf), "%d", count);
  lcdText(30, 90, buf, C_GREEN, 4);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Counter", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  loadCount();
  lcdText(10, 50, "Saved count:", C_TEXT, 1);
  showCount();
  lcdText(10, 180, "Press to add", C_GRAY, 2);
  lcdText(10, 210, "Persists after", C_GRAY, 1);
  lcdText(10, 225, "power cycle!", C_GRAY, 1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    count++;
    saveCount();
    showCount();
    setColor(0, 255, 0);
    delay(100);
    ledOff();
  }
  lastBtn = btn;
  delay(30);
}
