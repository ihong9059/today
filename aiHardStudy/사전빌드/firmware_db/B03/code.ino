void ledSequenceTask(void* param) {
  // [LED] 빨강→노랑→파랑 순서로 1초씩 반복
  while (true) {
    digitalWrite(LED_RED, LOW);
    delay(1000);
    digitalWrite(LED_RED, HIGH);

    digitalWrite(LED_YELLOW, LOW);
    delay(1000);
    digitalWrite(LED_YELLOW, HIGH);

    digitalWrite(LED_BLUE, LOW);
    delay(1000);
    digitalWrite(LED_BLUE, HIGH);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] LED 순차 점등 태스크 생성
  xTaskCreate(ledSequenceTask, "ledSeq", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}