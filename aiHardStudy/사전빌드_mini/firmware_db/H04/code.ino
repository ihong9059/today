// [크리스마스] 징글벨 멜로디 음표 정의
#define NOTE_E5 659
#define NOTE_G5 784
#define NOTE_A5 880
#define NOTE_F5 698
#define NOTE_D5 587
#define NOTE_C5 523
#define NOTE_B4 494

// [멜로디] 징글벨 음표 배열
int melody[] = {
  NOTE_E5, NOTE_E5, NOTE_E5,
  NOTE_E5, NOTE_E5, NOTE_E5,
  NOTE_E5, NOTE_G5, NOTE_C5, NOTE_D5, NOTE_E5,
  NOTE_F5, NOTE_F5, NOTE_F5, NOTE_F5,
  NOTE_F5, NOTE_E5, NOTE_E5, NOTE_E5,
  NOTE_E5, NOTE_D5, NOTE_D5, NOTE_E5, NOTE_D5, NOTE_G5
};

// [멜로디] 음표 박자 배열
int durations[] = {
  400, 400, 800,
  400, 400, 800,
  400, 400, 400, 400, 1200,
  400, 400, 400, 400,
  400, 400, 200, 200,
  400, 400, 400, 400, 800, 800
};

int noteCount = sizeof(melody) / sizeof(melody[0]);
int currentNote = 0;
unsigned long nextNoteTime = 0;
unsigned long ledChangeTime = 0;

// [LED] 랜덤 크리스마스 색상 배열
uint32_t xmasColors[] = {
  0xFF0000, // 빨강
  0x00FF00, // 초록
  0xFFFF00, // 노랑
  0xFF4400, // 주황
  0xFF00FF, // 마젠타
  0x00FFFF, // 시안
  0xFFFFFF  // 흰색
};

// [LED] 랜덤 크리스마스 색상 표시
void showRandomXmasColor() {
  int idx = random(0, 7);
  uint32_t c = xmasColors[idx];
  uint8_t r = (c >> 16) & 0xFF;
  uint8_t g = (c >> 8) & 0xFF;
  uint8_t b = c & 0xFF;
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();
}

// [OLED] 크리스마스 메시지 표시
void showXmasOled() {
  oled.clear();
  oled.drawString(10, 0, "Merry Christmas!");
  oled.drawString(20, 20, "* Jingle Bells *");
  oled.drawString(25, 40, "Ho Ho Ho! :)");
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  randomSeed(esp_random()); // [랜덤] 시드 초기화
  showXmasOled();            // [OLED] 크리스마스 화면 출력

  nextNoteTime = millis();
  ledChangeTime = millis();
}

void loop() {
  unsigned long now = millis();

  // [멜로디] 징글벨 음표 순서대로 재생
  if (now >= nextNoteTime) {
    tone(2, melody[currentNote], durations[currentNote]);
    nextNoteTime = now + durations[currentNote] + 50; // 음표 간 간격
    currentNote = (currentNote + 1) % noteCount;
  }

  // [LED] 박자에 맞춰 랜덤 색상 변경
  if (now >= ledChangeTime) {
    showRandomXmasColor();
    ledChangeTime = now + 400; // 400ms마다 색상 변경
  }

  delay(10);
}