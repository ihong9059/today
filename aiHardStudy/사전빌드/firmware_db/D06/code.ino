void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [멜로디] 1000Hz에서 100Hz로 점점 낮아지는 소리
void playDescendingTone() {
  for (int freq = 1000; freq >= 100; freq -= 50) {
    tone(33, freq, 80);   // [음계] 주파수 출력 80ms
    delay(100);            // [간격] 다음 음으로 이동 전 대기
  }
  noTone(33);              // [종료] 소리 정지
}

void loop() {
  playDescendingTone();    // [실행] 하강 음계 재생
  delay(10000);
}