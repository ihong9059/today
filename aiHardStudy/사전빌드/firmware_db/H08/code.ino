// [하트비트] 빨간 LED 빠르게 2번 깜박 + 1초 휴식 태스크
void heartbeatTask(void* param) {
  while (true) {
    // [1번째 박동] 빠르게 켜고 끄기
    digitalWrite(LED_RED, LOW);
    delay(80);
    digitalWrite(LED_RED, HIGH);
    delay(100);

    // [2번째 박동] 빠르게 켜고 끄기
    digitalWrite(LED_RED, LOW);
    delay(80);
    digitalWrite(LED_RED, HIGH);

    // [휴식] 1초 대기
    delay(1000);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크 생성] 하트비트 LED 패턴 실행
  xTaskCreate(heartbeatTask, "heartbeat", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}