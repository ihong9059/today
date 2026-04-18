// [숨쉬기] LED 브리딩 태스크 (active LOW: 0=최대밝기, 255=꺼짐)
void breathingTask(void* param) {
  while (true) {
    // 천천히 켜지기: 255→0
    for (int i = 255; i >= 0; i--) {
      analogWrite(LED_RED,    i);
      analogWrite(LED_YELLOW, i);
      analogWrite(LED_BLUE,   i);
      delay(8); // 256단계 × 8ms ≈ 2초
    }
    // 잠시 최대 밝기 유지
    delay(300);
    // 천천히 꺼지기: 0→255
    for (int i = 0; i <= 255; i++) {
      analogWrite(LED_RED,    i);
      analogWrite(LED_YELLOW, i);
      analogWrite(LED_BLUE,   i);
      delay(8);
    }
    // 잠시 꺼진 상태 유지
    delay(300);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀 초기화 (LED, 버저, OLED)
  initBLE();      // BLE OTA 초기화

  // [태스크] 숨쉬기 효과 태스크 생성
  xTaskCreate(breathingTask, "breathing", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}