void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [부저] 3번 울리기
  for (int i = 0; i < 3; i++) {
    digitalWrite(BUZZER, LOW);   // 부저 ON
    delay(300);
    digitalWrite(BUZZER, HIGH);  // 부저 OFF
    delay(300);
  }
}

void loop() {
  delay(10000);
}