void setup() {
  Serial.begin(115200);
  initHardware();   // LCD, WS2812, 버튼 초기화
  initBLE();        // BLE OTA 초기화

  // [LED] 노란색 켜기 (R=255, G=255, B=0)
  setColor(255, 255, 0);
}

void loop() {
  delay(10000);
}