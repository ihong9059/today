void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [멜로디] 100Hz에서 1000Hz까지 점점 높아지는 소리 재생
void playSweep() {
  for (int freq = 100; freq <= 1000; freq += 10) {
    tone(33, freq, 30); // 각 주파수를 30ms씩 재생
    delay(35);
  }
  noTone(33); // 소리 정지
}

void loop() {
  playSweep(); // 주파수 스윕 실행
  delay(10000);
}