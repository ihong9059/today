// [게임 시작] 낮은음에서 높은음으로 올라가는 효과음

void playGameStartSound() {
  // [상승 음계] 도레미파솔라시도 패턴으로 상승
  int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};
  int durations[] = {100, 100, 100, 100, 100, 100, 100, 300};

  for (int i = 0; i < 8; i++) {
    tone(2, notes[i], durations[i]);
    delay(durations[i] + 20); // [간격] 음 사이 짧은 쉬기
  }

  // [피날레] 마지막 화음 효과 (빠르게 올라가기)
  for (int freq = 523; freq <= 1047; freq += 30) {
    tone(2, freq, 20);
    delay(25);
  }
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 게임 시작 색상 초록으로 표시
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();

  // [OLED] 게임 시작 메시지 표시
  oled.clear();
  oled.drawString(10, 20, "GAME START!");
  oled.display();

  // [효과음] 시작 사운드 재생
  playGameStartSound();

  // [LED] 효과음 후 LED 끄기
  pixel.clear();
  pixel.show();
}

void loop() {
  delay(10000);
}