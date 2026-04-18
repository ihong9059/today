// [스위치] 길게 누르기 감지 태스크 함수
void switchTask(void* param) {
  unsigned long pressStart = 0;  // 누르기 시작 시각
  bool pressing = false;         // 현재 누르고 있는지 여부

  while (true) {
    bool swLow = (digitalRead(32) == LOW);  // 스위치 눌림 감지 (active LOW)

    if (swLow && !pressing) {
      // [스위치] 누르기 시작 시각 기록
      pressStart = millis();
      pressing = true;
    } else if (!swLow && pressing) {
      // [스위치] 손 뗌 — 누름 상태 초기화
      pressing = false;
    }

    if (pressing && (millis() - pressStart >= 2000)) {
      // [LED] 2초 이상 누름 → 모든 LED 끄기 (active LOW: HIGH=OFF)
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE, HIGH);
      pressing = false;  // 중복 실행 방지
    }

    vTaskDelay(50 / portTICK_PERIOD_MS);  // [태스크] 50ms 주기로 폴링
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화 (LED, 버저, OLED)
  initBLE();        // BLE OTA 초기화

  // [스위치] 스위치 입력 핀 설정
  pinMode(32, INPUT_PULLUP);

  // [태스크] 스위치 감지 태스크 생성
  xTaskCreate(switchTask, "switchTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}