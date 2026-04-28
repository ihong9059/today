// [BLE 메시지] 수신 메시지를 LCD에 표시
int msgY = 60;
void onBleReceive(String cmd) {
  if (msgY > 280) { lcdClear(); lcdText(10, 10, "BLE Message", C_CYAN, 2); msgY = 60; }
  lcdText(10, msgY, cmd.c_str(), C_GREEN, 2);
  msgY += 25;
  setColor(0, 100, 0);
  delay(200);
  ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Message", C_CYAN, 2);
  lcdText(10, 40, "Waiting...", C_GRAY, 2);
}
void loop() { delay(10000); }
