void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // 빨간색 5번 깜빡이기
  for (int i = 0; i < 5; i++) {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨간색 켜기
    pixel.show();
    delay(500);
    pixel.clear(); // LED 끄기
    pixel.show();
    delay(500);
  }
}

void loop() {
  delay(10000);
}