// [BLE LED] 스마트폰에서 LED 색상 제어
void onBleReceive(String cmd) {
  if (cmd == "RED") { setColor(255, 0, 0); lcdText(10, 100, "RED   ", C_RED, 3); }
  else if (cmd == "GREEN") { setColor(0, 255, 0); lcdText(10, 100, "GREEN ", C_GREEN, 3); }
  else if (cmd == "BLUE") { setColor(0, 0, 255); lcdText(10, 100, "BLUE  ", C_BLUE, 3); }
  else if (cmd == "OFF") { ledOff(); lcdText(10, 100, "OFF   ", C_GRAY, 3); }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE LED", C_CYAN, 2);
  lcdText(10, 40, "Send color:", C_TEXT, 2);
  lcdText(10, 65, "RED/GREEN/", C_GRAY, 1);
  lcdText(10, 80, "BLUE/OFF", C_GRAY, 1);
}
void loop() { delay(10000); }
