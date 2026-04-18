void blinkColor(uint32_t color, int times) {
  // [LED] 지정 색상으로 횟수만큼 깜빡이기
  for (int i = 0; i < times; i++) {
    pixel.setPixelColor(0, color);
    pixel.show();
    delay(300);
    pixel.clear();
    pixel.show();
    delay(300);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 파란색 3번 깜빡이기
  blinkColor(pixel.Color(0, 0, 255), 3);

  // [LED] 빨간색 3번 깜빡이기
  blinkColor(pixel.Color(255, 0, 0), 3);
}

void loop() {
  delay(10000);
}