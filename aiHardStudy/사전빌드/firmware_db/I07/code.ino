void sirenTask(void *pvParameters) {
  const int LOW_FREQ  = 500;  // [사이렌] 최저 주파수 (Hz)
  const int HIGH_FREQ = 1500; // [사이렌] 최고 주파수 (Hz)
  const int STEP      = 10;   // [사이렌] 주파수 변화 단계
  const int STEP_MS   = 8;    // [사이렌] 단계별 지연 시간 (ms)

  while (true) {
    // [상승] 주파수 점점 높아짐
    for (int freq = LOW_FREQ; freq <= HIGH_FREQ; freq += STEP) {
      tone(33, freq, STEP_MS);
      delay(STEP_MS);
    }
    // [하강] 주파수 점점 낮아짐
    for (int freq = HIGH_FREQ; freq >= LOW_FREQ; freq -= STEP) {
      tone(33, freq, STEP_MS);
      delay(STEP_MS);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [사이렌] 구급차 사이렌 태스크 생성
  xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}