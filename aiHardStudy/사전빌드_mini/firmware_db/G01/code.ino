void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [스위치] 버튼 상태 읽기 (active LOW)
  if (digitalRead(SWITCH_PIN) == LOW) {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // [LED] 빨간색 켜기
    pixel.show();
  } else {
    pixel.clear(); // [LED] 끄기
    pixel.show();
  }
  delay(50);
}