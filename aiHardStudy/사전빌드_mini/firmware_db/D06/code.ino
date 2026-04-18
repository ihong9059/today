// [알람] 짧은 비프 5번 + 긴 비프 1번

void playAlarm() {
  // [단음] 짧은 비프 5번 (1000Hz, 100ms)
  for (int i = 0; i < 5; i++) {
    tone(2, 1000, 100);
    delay(200);
  }
  // [장음] 긴 비프 1번 (1000Hz, 800ms)
  tone(2, 1000, 800);
  delay(900);
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [실행] 알람 재생
  playAlarm();
}

void loop() {
  delay(10000);
}