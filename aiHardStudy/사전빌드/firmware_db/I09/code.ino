void playGameOver() {
  // [게임오버] 높은음에서 낮은음으로 천천히 하강
  int notes[] = {880, 784, 698, 659, 587, 523, 494, 440, 392, 349, 330, 294, 262};
  int count = sizeof(notes) / sizeof(notes[0]);
  for (int i = 0; i < count; i++) {
    tone(33, notes[i], 300);
    delay(350);
  }
  noTone(33);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 게임 오버 효과음 1회 재생
  playGameOver();
}

void loop() {
  delay(10000);
}