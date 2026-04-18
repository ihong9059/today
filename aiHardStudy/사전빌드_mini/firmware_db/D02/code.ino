// 음계 주파수 정의
#define C4  262
#define D4  294
#define E4  330
#define F4  349
#define G4  392
#define REST 0

// 박자 기준 (BPM 120, 4분음표 = 500ms)
#define Q  500   // 4분음표
#define H  1000  // 2분음표
#define E8 250   // 8분음표

// 곰 세 마리 멜로디 (음, 길이) 쌍
int melody[][2] = {
  // 곰 세 마 리 가  한  집  에  있  어
  {E4, Q}, {E4, Q}, {G4, Q}, {G4, Q},
  {E4, Q}, {E4, Q}, {D4, H},
  {E4, Q}, {E4, Q}, {E4, H},
  {REST, Q},

  // 아빠 곰  엄마 곰  아기 곰
  {G4, Q}, {G4, Q}, {G4, Q},
  {F4, Q}, {F4, Q}, {F4, Q},
  {E4, Q}, {E4, H},
  {REST, Q},

  // 아빠 곰은  뚱 뚱 해
  {E4, Q}, {E4, Q}, {G4, Q}, {G4, Q}, {G4, H},
  {REST, Q},

  // 엄마 곰은  날 씬 해
  {E4, Q}, {E4, Q}, {G4, Q}, {G4, Q}, {G4, H},
  {REST, Q},

  // 아기 곰은  너무  귀 여 워
  {E4, Q}, {E4, Q}, {G4, Q}, {G4, Q},
  {G4, Q}, {E4, Q}, {D4, H},
  {REST, Q},

  // 히 쭉  히 쭉  잘  한  다
  {E4, E8}, {D4, E8}, {E4, E8}, {D4, E8},
  {C4, H}, {C4, H},
  {REST, H}
};

int totalNotes = sizeof(melody) / sizeof(melody[0]);

void playMelody() {
  // 멜로디 전체 재생
  for (int i = 0; i < totalNotes; i++) {
    int freq = melody[i][0];
    int dur  = melody[i][1];

    if (freq == REST) {
      noTone(2);
    } else {
      tone(2, freq, dur * 0.9); // 10% 짧게 → 음 구분
    }
    delay(dur);
  }
  noTone(2);
}

void showOled(const char* line1, const char* line2) {
  // OLED 텍스트 표시
  oled.clear();
  oled.drawString(0, 0, line1);
  oled.drawString(0, 20, line2);
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 하드웨어 초기화
  initBLE();      // BLE/OTA 초기화

  // 시작 표시
  showOled("곰 세 마리", "연주 시작!");
  pixel.setPixelColor(0, pixel.Color(255, 100, 0)); // 주황색: 연주 중
  pixel.show();

  playMelody(); // 멜로디 재생

  // 완료 표시
  showOled("곰 세 마리", "연주 완료!");
  pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // 초록: 완료
  pixel.show();
}

void loop() {
  // 스위치 누르면 다시 재생
  if (digitalRead(SWITCH_PIN) == LOW) {
    showOled("곰 세 마리", "다시 연주중..");
    pixel.setPixelColor(0, pixel.Color(255, 100, 0));
    pixel.show();

    playMelody();

    showOled("곰 세 마리", "연주 완료!");
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();
    delay(500); // 디바운스
  }
  delay(10000);
}