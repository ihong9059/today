void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [부저] 짧게 5번, 길게 1번 울리기
void buzzPattern() {
  // 짧게 5번
  for (int i = 0; i < 5; i++) {
    digitalWrite(BUZZER, LOW);   // 부저 켜기
    delay(100);
    digitalWrite(BUZZER, HIGH);  // 부저 끄기
    delay(150);
  }
  delay(300);
  // 길게 1번
  digitalWrite(BUZZER, LOW);
  delay(800);
  digitalWrite(BUZZER, HIGH);
}

void loop() {
  buzzPattern();
  delay(10000);
}