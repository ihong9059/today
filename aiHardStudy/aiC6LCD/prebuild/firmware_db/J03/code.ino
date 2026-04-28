// [BLE 배경색] 원격으로 LCD 배경색 변경
void onBleReceive(String cmd) {
  cmd.toUpperCase();
  if (cmd == "RED") lcd.fillScreen(C_RED);
  else if (cmd == "GREEN") lcd.fillScreen(C_GREEN);
  else if (cmd == "BLUE") lcd.fillScreen(C_BLUE);
  else if (cmd == "YELLOW") lcd.fillScreen(C_YELLOW);
  else if (cmd == "BLACK") lcd.fillScreen(C_BG);
  else if (cmd == "WHITE") lcd.fillScreen(C_TEXT);
  else return;
  lcdText(20, 140, cmd.c_str(), C_BG, 3);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE BG Color", C_CYAN, 2);
  lcdText(10, 50, "Send color", C_TEXT, 2);
  lcdText(10, 75, "name via BLE", C_TEXT, 2);
}
void loop() { delay(10000); }
