void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화
}

void loop() {
  // 빨강 1초
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  delay(1000);

  // 초록 1초
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();
  delay(1000);

  // 파랑 1초
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
  delay(1000);
}