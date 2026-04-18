// [점점 높아지는 소리] 100Hz에서 1000Hz까지 순차 재생

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // 주파수 상승 시작
  for (int freq = 100; freq <= 1000; freq += 10) {
    tone(2, freq, 50);  // 50ms씩 재생
    delay(60);          // 약간 겹치지 않게 대기
  }
  noTone(2);  // 종료
}

void loop() {
  delay(10000);
}