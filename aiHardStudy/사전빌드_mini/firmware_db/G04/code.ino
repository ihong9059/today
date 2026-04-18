// [스위치] 이전 상태 저장
bool lastSwitchState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [스위치] 현재 상태 읽기 (INPUT_PULLUP, active LOW)
  bool currentState = digitalRead(SWITCH_PIN);

  if (currentState == LOW && lastSwitchState == HIGH) {
    // [OLED] 누름 감지 시 텍스트 표시
    oled.clear();
    oled.drawString(20, 24, "PRESSED!");
    oled.display();

    // [LED] 파란색 점등
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();

    // [소리] 짧은 비프음
    tone(2, 1000, 150);
  } else if (currentState == HIGH && lastSwitchState == LOW) {
    // [OLED] 버튼 뗄 때 화면 초기화
    oled.clear();
    oled.display();

    // [LED] 소등
    pixel.clear();
    pixel.show();
  }

  lastSwitchState = currentState;
  delay(20);
}