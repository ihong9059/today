// [레벨업] 도미솔도 음계 정의
const int notes[] = {523, 659, 784, 1047};
const int noteDuration = 100; // 빠르게 100ms씩

void playLevelUp() {
  // [효과음] 도-미-솔-도 순서로 연주
  for (int i = 0; i < 4; i++) {
    tone(2, notes[i], noteDuration);
    delay(noteDuration + 20);
  }
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] OLED에 레벨업 표시
  oled.clear();
  oled.drawString(20, 20, "LEVEL UP!");
  oled.display();

  // [LED] 골드 색상으로 점멸
  pixel.setPixelColor(0, pixel.Color(255, 200, 0));
  pixel.show();

  // [효과음] 레벨업 사운드 재생
  playLevelUp();

  // [LED] 소등
  pixel.clear();
  pixel.show();
}

void loop() {
  delay(10000);
}