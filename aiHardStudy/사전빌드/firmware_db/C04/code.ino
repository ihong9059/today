// [SOS] 모스부호 상수 정의
#define TONE_PIN 33
#define DIT_MS   150
#define DAH_MS   450
#define SIG_GAP  150
#define LET_GAP  450
#define SOS_GAP  1500

// [모스] 짧은 신호 (dit)
void playDit() {
  tone(TONE_PIN, 800, DIT_MS);
  delay(DIT_MS + SIG_GAP);
}

// [모스] 긴 신호 (dah)
void playDah() {
  tone(TONE_PIN, 800, DAH_MS);
  delay(DAH_MS + SIG_GAP);
}

// [모스] 글자 간 대기
void letterGap() {
  delay(LET_GAP);
}

// [LED] SOS 점멸 태스크
void sosLedTask(void* param) {
  while (true) {
    // S: 짧3
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_RED, LOW);
      delay(DIT_MS);
      digitalWrite(LED_RED, HIGH);
      delay(SIG_GAP);
    }
    delay(LET_GAP);
    // O: 긴3
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_YELLOW, LOW);
      delay(DAH_MS);
      digitalWrite(LED_YELLOW, HIGH);
      delay(SIG_GAP);
    }
    delay(LET_GAP);
    // S: 짧3
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_BLUE, LOW);
      delay(DIT_MS);
      digitalWrite(LED_BLUE, HIGH);
      delay(SIG_GAP);
    }
    delay(SOS_GAP);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] SOS 안내 표시
  oled.clear();
  oled.drawString(20, 10, "SOS MORSE");
  oled.drawString(10, 30, "...  ---  ...");
  oled.display();

  // [LED] SOS 점멸 태스크 시작
  xTaskCreate(sosLedTask, "sosLed", 2048, NULL, 1, NULL);
}

void loop() {
  // [모스] S: 짧은 신호 3회
  for (int i = 0; i < 3; i++) playDit();
  letterGap();

  // [모스] O: 긴 신호 3회
  for (int i = 0; i < 3; i++) playDah();
  letterGap();

  // [모스] S: 짧은 신호 3회
  for (int i = 0; i < 3; i++) playDit();

  // [SOS] 반복 전 대기
  delay(SOS_GAP);
}