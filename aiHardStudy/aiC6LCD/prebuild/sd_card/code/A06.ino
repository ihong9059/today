void setup() {
  Serial.begin(115200);
  initHardware();   // LCD, WS2812, 버튼 초기화
  initBLE();        // BLE OTA 초기화

  // [LED] 하늘색 (Sky Blue) 설정
  setColor(0, 191, 255);

  // [LCD] 상태 표시
  lcdClear();
  lcdText(20, 140, "Sky Blue LED ON", C_CYAN, 2);
}

void loop() {
  delay(10000);
}