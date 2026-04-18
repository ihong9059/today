void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [부저] 점점 빠르게 10번 울리기
void loop() {
  for (int i = 0; i < 10; i++) {
    int interval = 500 - (i * 40); // [간격] 500ms → 140ms 점점 줄어듦

    digitalWrite(BUZZER, LOW);  // [부저] ON
    delay(100);
    digitalWrite(BUZZER, HIGH); // [부저] OFF
    delay(interval);
  }

  delay(10000); // [대기] 10초 후 반복
}