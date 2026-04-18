// [비프음] 점점 빨라지는 비프음 10번 울리기

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // 시작 딜레이
  delay(500);

  int baseDelay = 800; // 초기 간격 (ms)
  for (int i = 0; i < 10; i++) {
    // 비프음 재생
    tone(2, 1000, 100);
    delay(150);
    noTone(2);

    // 간격 점점 줄이기
    delay(baseDelay);
    baseDelay = baseDelay * 8 / 10; // 매 반복마다 20% 감소
  }
}

void loop() {
  delay(10000);
}