void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화
}

void loop() {
  // 스위치 상태 읽기 (INPUT_PULLUP, 눌리면 LOW)
  bool pressed = (digitalRead(SWITCH_PIN) == LOW);

  if (pressed) {
    // 스위치 누름: LED 흰색으로 켜기
    pixel.setPixelColor(0, pixel.Color(255, 255, 255));
  } else {
    // 스위치 뗌: LED 끄기
    pixel.setPixelColor(0, pixel.Color(0, 0, 0));
  }
  pixel.show();

  delay(20); // 디바운스 딜레이
}