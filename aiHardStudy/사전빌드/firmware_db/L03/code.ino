// [전역] 스위치 누른 횟수
volatile int pressCount = 0;

// [OLED] 카운트 표시 함수
void updateOLED() {
  oled.clear();
  oled.drawString(0, 0, "Switch Count:");
  oled.drawString(0, 20, String(pressCount).c_str());
  oled.display();
}

// [태스크] 스위치 감지 및 OLED 업데이트
void switchTask(void* param) {
  bool lastState = HIGH;
  for (;;) {
    bool curState = digitalRead(32); // 스위치 읽기
    if (lastState == HIGH && curState == LOW) { // 눌림 감지 (active LOW)
      delay(20); // 디바운스
      if (digitalRead(32) == LOW) {
        pressCount++; // 카운트 증가
        updateOLED(); // 화면 갱신
      }
    }
    lastState = curState;
    delay(10); // 폴링 주기
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀/OLED 초기화
  initBLE();      // BLE OTA 초기화

  updateOLED(); // 초기 화면 표시

  // [태스크] 스위치 감지 태스크 생성
  xTaskCreate(switchTask, "switchTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}