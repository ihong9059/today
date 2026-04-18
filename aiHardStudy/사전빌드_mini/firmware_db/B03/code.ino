// [반짝반짝 작은별] 멜로디 음계 정의
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440

// [멜로디] 반짝반짝 작은별 음표 배열
int melody[] = {
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4,
  NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4,
  NOTE_D4, NOTE_D4, NOTE_C4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4,
  NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4,
  NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4,
  NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4,
  NOTE_D4, NOTE_D4, NOTE_C4
};

// [박자] 각 음표 길이 (ms)
int durations[] = {
  400, 400, 400, 400,
  400, 400, 800,
  400, 400, 400, 400,
  400, 400, 800,
  400, 400, 400, 400,
  400, 400, 800,
  400, 400, 400, 400,
  400, 400, 800,
  400, 400, 400, 400,
  400, 400, 800,
  400, 400, 400, 400,
  400, 400, 800
};

int noteCount = sizeof(melody) / sizeof(melody[0]);

// [LED색상] 음표별 색상 배열
uint32_t noteColors[] = {
  0xFF0000, 0xFF0000, 0x00FF00, 0x00FF00,
  0x0000FF, 0x0000FF, 0xFFFF00,
  0xFF8800, 0xFF8800, 0xFF0088, 0xFF0088,
  0x00FFFF, 0x00FFFF, 0xFFFFFF
};

// [연주] 멜로디 재생 태스크
void playMelodyTask(void* param) {
  for (int i = 0; i < noteCount; i++) {
    // [LED] 현재 음표에 맞춰 색상 변경
    uint32_t c = noteColors[i % (sizeof(noteColors) / sizeof(noteColors[0]))];
    pixel.setPixelColor(0, pixel.Color((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
    pixel.show();

    // [소리] 음 재생
    tone(2, melody[i], durations[i] * 0.9);
    delay(durations[i]);
    noTone(2);

    // [간격] 음 사이 짧은 쉼
    pixel.clear();
    pixel.show();
    delay(30);
  }

  // [완료] 연주 끝나면 LED 끄기
  pixel.clear();
  pixel.show();

  vTaskDelete(NULL);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 제목 표시
  oled.clear();
  oled.drawString(0, 0, "Twinkle Twinkle");
  oled.drawString(0, 16, "Little Star");
  oled.drawString(0, 32, "Playing...");
  oled.display();

  // [태스크] 백그라운드에서 멜로디 재생
  xTaskCreate(playMelodyTask, "melody", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}