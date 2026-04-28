// [BLE 리모컨] LED + LCD 동시 원격 제어
void onBleReceive(String cmd) {
  lcd.fillRect(0, 80, 172, 100, C_BG);
  if (cmd.startsWith("COLOR:")) {
    String hex = cmd.substring(6);
    if (hex.length() == 6) {
      uint32_t c = strtoul(hex.c_str(), NULL, 16);
      uint8_t r = (c >> 16) & 0xFF, g = (c >> 8) & 0xFF, b = c & 0xFF;
      setColor(r, g, b);
      lcd.fillRect(20, 90, 132, 50, lcd.color565(r, g, b));
      char buf[32];
      snprintf(buf, sizeof(buf), "#%s", hex.c_str());
      lcdText(30, 150, buf, C_TEXT, 2);
    }
  } else if (cmd.startsWith("TEXT:")) {
    String text = cmd.substring(5);
    lcdText(10, 100, text.c_str(), C_GREEN, 2);
  } else if (cmd == "CLEAR") {
    lcdClear();
    lcdText(10, 10, "BLE Remote", C_CYAN, 2);
    ledOff();
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Remote", C_CYAN, 2);
  lcdText(10, 40, "COLOR:RRGGBB", C_GRAY, 1);
  lcdText(10, 55, "TEXT:message", C_GRAY, 1);
  lcdText(10, 70, "CLEAR", C_GRAY, 1);
}
void loop() { delay(10000); }
