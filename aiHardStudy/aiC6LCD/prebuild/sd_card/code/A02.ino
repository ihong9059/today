void setup() {
  Serial.begin(115200);
  initHardware();   // LCD, WS2812, 버튼 초기화
  initBLE();        // BLE OTA 초기화

  // [LED] 초록색으로 켜기
  setColor(0, 255, 0);
}

void loop() {
  delay(10000);
}