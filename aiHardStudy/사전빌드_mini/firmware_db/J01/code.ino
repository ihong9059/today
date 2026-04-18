// [전역] LED 상태 및 스위치 이전 상태
bool ledOn = false;
bool lastSwitchState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [스위치] 현재 상태 읽기
  bool currentState = digitalRead(SWITCH_PIN);

  // [토글] 버튼 눌림 감지 (HIGH→LOW 엣지)
  if (lastSwitchState == HIGH && currentState == LOW) {
    ledOn = !ledOn;

    if (ledOn) {
      // [LED] 켜기 - 흰색
      pixel.setPixelColor(0, pixel.Color(255, 255, 255));
    } else {
      // [LED] 끄기
      pixel.setPixelColor(0, pixel.Color(0, 0, 0));
    }
    pixel.show();

    delay(50); // [디바운스] 채터링 방지
  }

  lastSwitchState = currentState;
  delay(10);
}