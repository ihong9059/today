// [게임시작] 낮은음→높은음 상승 효과음

void playGameStart() {
  // [상승음] 200Hz에서 2000Hz까지 빠르게 올림
  for (int freq = 200; freq <= 2000; freq += 50) {
    tone(33, freq, 20);
    delay(25);
  }
  noTone(33);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [효과음] 게임 시작 상승 효과음 재생
  playGameStart();
}

void loop() {
  delay(10000);
}