void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE OTA 초기화
}

void loop() {
  // [LED] 빨간색 켜기
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  delay(1000);

  // [LED] 끄기
  pixel.clear();
  pixel.show();
  delay(1000);
}