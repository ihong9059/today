// [음계] 학교종 멜로디 음표 정의
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494

// [멜로디] 학교종이 땡땡땡 음표 배열
int melody[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_G4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_E4, NOTE_D4, NOTE_E4, NOTE_C4
};

// [박자] 각 음표 길이 (ms)
int noteDurations[] = {
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 800
};

int melodyLength = sizeof(melody) / sizeof(melody[0]);

// [BLE 수신] "MELODY:학교종" 명령 처리
void onBleReceive(String cmd) {
  if (cmd == "MELODY:학교종") {
    // [LED] 연주 중 파란색 표시
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();

    // [OLED] 연주 중 메시지 표시
    oled.clear();
    oled.drawString(0, 0, "Playing...");
    oled.drawString(0, 16, "Hak-gyo-jong");
    oled.display();

    // [멜로디] 학교종 연주
    for (int i = 0; i < melodyLength; i++) {
      tone(2, melody[i], noteDurations[i] * 0.9);
      delay(noteDurations[i]);
      noTone(2);
    }

    // [LED] 연주 완료 후 초록색
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();

    // [OLED] 완료 메시지
    oled.clear();
    oled.drawString(0, 0, "Done!");
    oled.display();

    delay(1000);

    // [LED] 초기화
    pixel.clear();
    pixel.show();

    oled.clear();
    oled.display();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀, OLED, WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [OLED] 대기 메시지
  oled.clear();
  oled.drawString(0, 0, "BLE Ready");
  oled.drawString(0, 16, "Send MELODY:");
  oled.drawString(0, 32, "hakgyojong");
  oled.display();
}

void loop() {
  delay(10000);
}