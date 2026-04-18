// [LED] 왕복 순환 태스크 함수
void ledCycleTask(void* param) {
  // [순서] 빨강→노랑→파랑→노랑 왕복 패턴
  const int pins[] = {LED_RED, LED_YELLOW, LED_BLUE, LED_YELLOW};
  const int count = 4;

  while (true) {
    for (int i = 0; i < count; i++) {
      // [LED] 현재 LED만 켜고 나머지 끄기
      digitalWrite(LED_RED,    (pins[i] == LED_RED)    ? LOW : HIGH);
      digitalWrite(LED_YELLOW, (pins[i] == LED_YELLOW) ? LOW : HIGH);
      digitalWrite(LED_BLUE,   (pins[i] == LED_BLUE)   ? LOW : HIGH);
      delay(500); // [타이밍] 각 LED 점등 시간
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀 및 OLED 초기화
  initBLE();      // [BLE] OTA 초기화

  // [태스크] LED 왕복 순환 태스크 생성
  xTaskCreate(ledCycleTask, "ledCycle", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}