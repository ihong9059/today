// [LED] 서서히 흰색으로 밝아졌다가 꺼지는 효과

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [페이드인] 0 → 255 (흰색으로 서서히 밝아짐)
  for (int i = 0; i <= 255; i++) {
    pixel.setPixelColor(0, pixel.Color(i, i, i));
    pixel.show();
    delay(10);
  }

  delay(500); // [대기] 최대 밝기 유지

  // [페이드아웃] 255 → 0 (서서히 꺼짐)
  for (int i = 255; i >= 0; i--) {
    pixel.setPixelColor(0, pixel.Color(i, i, i));
    pixel.show();
    delay(10);
  }

  pixel.clear();
  pixel.show();

  delay(1000); // [대기] 꺼진 상태 유지 후 반복
}