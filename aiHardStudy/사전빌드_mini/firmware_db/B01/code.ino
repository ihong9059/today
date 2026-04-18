// [도레미] C장조 음계 주파수 정의
const int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};
const char* noteNames[] = {"도", "레", "미", "파", "솔", "라", "시", "도"};
const int NOTE_COUNT = 8;

// [색상] 음계별 LED 색상
const uint32_t noteColors[] = {
  0xFF0000, // 도 - 빨강
  0xFF7F00, // 레 - 주황
  0xFFFF00, // 미 - 노랑
  0x00FF00, // 파 - 초록
  0x0000FF, // 솔 - 파랑
  0x4B0082, // 라 - 남색
  0x8B00FF, // 시 - 보라
  0xFFFFFF  // 도 - 흰색
};

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] OLED에 제목 표시
  oled.clear();
  oled.drawString(10, 0, "Do Re Mi");
  oled.drawString(10, 16, "Scale Play");
  oled.display();

  delay(1000);

  // [연주] 도레미파솔라시도 순서대로 연주
  for (int i = 0; i < NOTE_COUNT; i++) {
    // [OLED] 현재 음계 표시
    oled.clear();
    oled.drawString(20, 0, "Playing:");
    oled.drawString(40, 20, noteNames[i]);
    oled.display();

    // [LED] 음계별 색상 표시
    uint32_t c = noteColors[i];
    pixel.setPixelColor(0, pixel.Color((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
    pixel.show();

    // [소리] 음계 재생 (400ms)
    tone(2, notes[i], 400);
    delay(500);
    noTone(2);
    delay(100);
  }

  // [완료] 연주 종료 표시
  oled.clear();
  oled.drawString(10, 10, "Done!");
  oled.display();

  pixel.clear();
  pixel.show();
}

void loop() {
  delay(10000);
}