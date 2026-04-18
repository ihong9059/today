// [게임오버] 높은음에서 낮은음으로 내려가는 효과음

void playGameOver() {
  // [효과음] 높은 주파수에서 낮은 주파수로 단계적 하강
  int freqs[] = {1000, 880, 740, 622, 494, 392, 294, 220};
  for (int i = 0; i < 8; i++) {
    tone(2, freqs[i], 180);
    delay(200);
  }
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 빨간색으로 게임오버 표시
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();

  // [OLED] 게임오버 메시지 표시
  oled.clear();
  oled.drawString(20, 20, "GAME OVER");
  oled.display();

  // [효과음] 게임오버 사운드 재생
  playGameOver();
}

void loop() {
  // [버튼] 스위치 누르면 효과음 반복 재생
  if (digitalRead(SWITCH_PIN) == LOW) {
    playGameOver();
    delay(500);
  }
  delay(10000);
}