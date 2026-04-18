void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [음계] 도레미파솔라시도 주파수 정의
  int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};
  int duration = 400;

  // [연주] 각 음계를 순서대로 재생
  for (int i = 0; i < 8; i++) {
    tone(33, notes[i], duration);
    delay(duration + 50);
    noTone(33);
  }
}

void loop() {
  delay(10000);
}