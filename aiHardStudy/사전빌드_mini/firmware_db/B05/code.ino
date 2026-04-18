// [생일] 생일 축하 노래 음표 주파수 (Hz)
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_D5  587
#define REST     0

// [생일] 멜로디 음표 배열
int melody[] = {
  NOTE_D4, NOTE_D4, NOTE_E4, NOTE_D4, NOTE_G4, NOTE_FS4,
  REST,
  NOTE_D4, NOTE_D4, NOTE_E4, NOTE_D4, NOTE_A4, NOTE_G4,
  REST,
  NOTE_D4, NOTE_D4, NOTE_D5, NOTE_B4, NOTE_G4, NOTE_FS4, NOTE_E4,
  REST,
  NOTE_C5, NOTE_C5, NOTE_B4, NOTE_G4, NOTE_A4, NOTE_G4
};

// [생일] 음표 지속 시간 (ms)
int durations[] = {
  500, 200, 700, 700, 700, 1400,
  300,
  500, 200, 700, 700, 700, 1400,
  300,
  500, 200, 700, 700, 700, 700, 1400,
  300,
  500, 200, 700, 700, 700, 1400
};

int noteCount = sizeof(melody) / sizeof(melody[0]);

// [LED] 음표마다 무지개 색상 변경
void setRainbowColor(int index) {
  int phase = index % 6;
  switch (phase) {
    case 0: pixel.setPixelColor(0, pixel.Color(255, 0, 0)); break;   // 빨강
    case 1: pixel.setPixelColor(0, pixel.Color(255, 165, 0)); break; // 주황
    case 2: pixel.setPixelColor(0, pixel.Color(255, 255, 0)); break; // 노랑
    case 3: pixel.setPixelColor(0, pixel.Color(0, 255, 0)); break;   // 초록
    case 4: pixel.setPixelColor(0, pixel.Color(0, 0, 255)); break;   // 파랑
    case 5: pixel.setPixelColor(0, pixel.Color(128, 0, 255)); break; // 보라
  }
  pixel.show();
}

// [생일] 생일 축하 노래 연주 함수
void playHappyBirthday() {
  // [OLED] 생일 메시지 출력
  oled.clear();
  oled.drawString(10, 0, "Happy Birthday!");
  oled.drawString(20, 20, "to You :)");
  oled.display();

  for (int i = 0; i < noteCount; i++) {
    if (melody[i] == REST) {
      // [쉼표] LED 끄고 쉼
      pixel.clear();
      pixel.show();
      delay(durations[i]);
    } else {
      // [연주] 음 재생 + LED 색상 변경
      setRainbowColor(i);
      tone(2, melody[i], durations[i]);
      delay(durations[i] + 30);
      noTone(2);
    }
  }

  // [완료] LED 깜빡임으로 연주 종료 표시
  for (int j = 0; j < 3; j++) {
    pixel.setPixelColor(0, pixel.Color(255, 255, 255)); // 흰색 점멸
    pixel.show();
    delay(300);
    pixel.clear();
    pixel.show();
    delay(200);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 하드웨어 초기화
  initBLE();      // BLE OTA 초기화

  Serial.println("생일 축하 노래 시작!");
  playHappyBirthday(); // 노래 연주
}

void loop() {
  // [대기] 스위치 누르면 다시 연주
  if (digitalRead(SWITCH_PIN) == LOW) {
    delay(50); // 디바운싱
    if (digitalRead(SWITCH_PIN) == LOW) {
      Serial.println("버튼 눌림 - 다시 연주");
      playHappyBirthday();
      while (digitalRead(SWITCH_PIN) == LOW) delay(10); // 버튼 떼기 대기
    }
  }
  delay(10);
}