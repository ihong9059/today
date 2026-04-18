void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [비프음] 3번 울리기
  for (int i = 0; i < 3; i++) {
    tone(2, 1000, 200);   // 1kHz, 200ms
    delay(400);
  }
}

void loop() {
  delay(10000);
}