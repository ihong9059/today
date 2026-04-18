void ledAlarmTask(void *param) {
  // [알람] LED 전체 빠르게 깜빡이기
  while (true) {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, LOW);
    delay(100);
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
    delay(100);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [알람] OLED 알람 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "!! ALARM !!");
  oled.drawString(0, 16, "Alert Active");
  oled.display();

  // [알람] LED 깜빡임 태스크 생성
  xTaskCreate(ledAlarmTask, "ledAlarm", 1024, NULL, 1, NULL);
}

void loop() {
  // [알람] 부저 빠르게 반복
  digitalWrite(BUZZER, LOW);
  delay(100);
  digitalWrite(BUZZER, HIGH);
  delay(100);
}