void ledTask(void *param) {
  // [LED] 빨간 LED 1초 간격 깜빡임
  while (true) {
    digitalWrite(LED_RED, LOW);   // ON
    delay(500);
    digitalWrite(LED_RED, HIGH);  // OFF
    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [태스크] LED 깜빡임 태스크 생성
  xTaskCreate(ledTask, "ledTask", 1024, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}