// [BLE→SD 메모] 폰 텍스트를 SD에 저장
int memoCount = 0;
void onBleReceive(String cmd) {
  if (!SD.begin(4, SPI)) { lcdText(10, 200, "SD Error", C_RED, 2); return; }
  File f = SD.open("/memo.txt", FILE_APPEND);
  if (f) {
    f.printf("[%lu] %s\n", millis()/1000, cmd.c_str());
    f.close();
    memoCount++;
  }
  lcd.fillRect(0, 80, 172, 180, C_BG);
  lcdText(5, 80, cmd.c_str(), C_GREEN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Saved #%d", memoCount);
  lcdText(10, 130, buf, C_YELLOW, 2);
  setColor(0, 255, 0); delay(200); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Memo", C_CYAN, 2);
  lcdText(10, 40, "Send text via", C_TEXT, 2);
  lcdText(10, 65, "BLE to save SD", C_TEXT, 2);
}
void loop() { delay(10000); }
