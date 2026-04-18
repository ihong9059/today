void ledTask(void *pv) {
  // [LED] 빨간 LED 0.5초 간격 빠른 깜빡임
  while (true) {
    digitalWrite(LED_RED, LOW);   // ON
    delay(250);
    digitalWrite(LED_RED, HIGH);  // OFF
    delay(250);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [태스크] LED 깜빡임 태스크 생성
  xTaskCreate(ledTask, "ledTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}