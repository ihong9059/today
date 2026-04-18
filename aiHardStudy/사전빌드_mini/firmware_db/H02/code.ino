// [음계] 도레미파솔라시 주파수 정의
const int notes[] = {262, 294, 330, 349, 392, 440, 494};
const char* noteNames[] = {"도", "레", "미", "파", "솔", "라", "시"};

// [색상] 각 음계에 대응하는 RGB 색상
const uint32_t colors[] = {
  Adafruit_NeoPixel::Color(255, 0, 0),    // 도 - 빨강
  Adafruit_NeoPixel::Color(255, 128, 0),  // 레 - 주황
  Adafruit_NeoPixel::Color(255, 255, 0),  // 미 - 노랑
  Adafruit_NeoPixel::Color(0, 255, 0),    // 파 - 초록
  Adafruit_NeoPixel::Color(0, 0, 255),    // 솔 - 파랑
  Adafruit_NeoPixel::Color(75, 0, 130),   // 라 - 남색
  Adafruit_NeoPixel::Color(148, 0, 211)   // 시 - 보라
};

int currentStep = 0; // [상태] 현재 음계 단계

void playNoteAndSetColor(int step) {
  // [LED] 해당 단계 색상 설정
  pixel.setPixelColor(0, colors[step]);
  pixel.show();

  // [OLED] 음계 이름 표시
  oled.clear();
  oled.drawString(30, 20, noteNames[step]);
  oled.display();

  // [소리] 해당 음계 연주 (300ms)
  tone(2, notes[step], 300);
  delay(350);
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작 시 첫 번째 음계(도) 실행
  playNoteAndSetColor(0);
}

void loop() {
  // [버튼] 스위치 누르면 다음 음계로 이동
  if (digitalRead(SWITCH_PIN) == LOW) {
    delay(50); // 디바운스
    if (digitalRead(SWITCH_PIN) == LOW) {
      currentStep = (currentStep + 1) % 7; // [순환] 0~6 반복
      playNoteAndSetColor(currentStep);
      while (digitalRead(SWITCH_PIN) == LOW) delay(10); // 버튼 뗄 때까지 대기
    }
  }
  delay(10);
}