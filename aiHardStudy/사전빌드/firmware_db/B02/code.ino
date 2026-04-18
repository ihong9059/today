void ledBlinkTask(void *param) {
  // [LED] 빨강/노랑/파랑 동시 깜빡임
  while (true) {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, LOW);
    delay(500);
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [태스크] LED 깜빡임 태스크 생성
  xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}