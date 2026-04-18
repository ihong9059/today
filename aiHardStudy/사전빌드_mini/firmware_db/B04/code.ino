// [학교종] 멜로디 음계 주파수 정의
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_G4  392
#define NOTE_A4  440

// [멜로디] 학교종이 땡땡땡 어서 모이자 선생님이 우리를 기다리신다
int melody[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4,
  NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4,
  NOTE_G4, 0,
  NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4,
  NOTE_C4, 0
};

// [박자] 각 음표 길이 (ms)
int durations[] = {
  300, 300, 300, 300,
  300, 300, 600,
  300, 300, 300, 300,
  600, 300,
  300, 300, 300, 300,
  600, 300
};

int noteCount = sizeof(melody) / sizeof(melody[0]);

void playMelody() {
  // [연주] 학교종 멜로디 순서대로 재생
  for (int i = 0; i < noteCount; i++) {
    if (melody[i] == 0) {
      noTone(2); // [쉼표] 무음
    } else {
      tone(2, melody[i], durations[i]); // [음표] 주파수와 길이로 재생
    }
    delay(durations[i] + 50); // [간격] 음표 사이 짧은 간격
  }
  noTone(2); // [종료] 마지막에 소리 끄기
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀, OLED, WS2812 초기화
  initBLE();      // [BLE] OTA 초기화

  // [화면] OLED에 제목 표시
  oled.clear();
  oled.drawString(10, 0,  "School Bell");
  oled.drawString(10, 16, "학교종이");
  oled.drawString(10, 32, "땡땡땡~");
  oled.display();

  // [LED] 노란색으로 연주 시작 알림
  pixel.setPixelColor(0, pixel.Color(255, 200, 0));
  pixel.show();

  // [연주] 멜로디 재생
  playMelody();

  // [완료] LED 끄기
  pixel.clear();
  pixel.show();

  oled.clear();
  oled.drawString(10, 16, "Done!");
  oled.display();
}

void loop() {
  delay(10000);
}