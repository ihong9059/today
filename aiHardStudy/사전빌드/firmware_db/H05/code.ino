void ledTask(void *param) {
  // [LED] 랜덤 핀 배열 정의
  int leds[] = {LED_RED, LED_YELLOW, LED_BLUE};
  int prev = -1;

  while (true) {
    // [LED] 이전과 다른 랜덤 LED 선택
    int idx;
    do {
      idx = random(3);
    } while (idx == prev);
    prev = idx;

    // [LED] 모두 끄고 선택된 LED만 켜기
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    digitalWrite(leds[idx],  LOW);

    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] LED 랜덤 점등 태스크 생성
  xTaskCreate(ledTask, "ledTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}