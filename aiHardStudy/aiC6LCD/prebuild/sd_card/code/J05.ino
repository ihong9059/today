// [BLE 버튼] 버튼 이벤트를 스마트폰에 전송
bool lastBtn = HIGH;
int pressCount = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Button", C_CYAN, 2);
  lcdText(10, 40, "Press BOOT btn", C_TEXT, 2);
  lcdText(10, 65, "to send event", C_TEXT, 2);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    pressCount++;
    if (deviceConnected && sensorChar) {
      char buf[32];
      snprintf(buf, sizeof(buf), "BTN:%d", pressCount);
      std::string s(buf);
      sensorChar->setValue(s);
      sensorChar->notify();
    }
    setColor(0, 255, 0);
    lcd.fillRect(0, 120, 172, 60, C_BG);
    char buf[32];
    snprintf(buf, sizeof(buf), "Press #%d", pressCount);
    lcdText(10, 130, buf, C_GREEN, 3);
    lcdText(10, 190, deviceConnected ? "Sent!" : "No BLE", deviceConnected ? C_GREEN : C_RED, 2);
  }
  if (btn == HIGH && lastBtn == LOW) ledOff();
  lastBtn = btn;
  delay(30);
}
