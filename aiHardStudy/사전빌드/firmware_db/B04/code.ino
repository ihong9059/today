void ledSequenceTask(void *pvParameters) {
  // [LED] 빨강→노랑→파랑 순서 반복
  while (true) {
    digitalWrite(LED_RED, LOW);    // 빨강 ON
    delay(500);
    digitalWrite(LED_RED, HIGH);   // 빨강 OFF
    delay(200);

    digitalWrite(LED_YELLOW, LOW); // 노랑 ON
    delay(500);
    digitalWrite(LED_YELLOW, HIGH);// 노랑 OFF
    delay(200);

    digitalWrite(LED_BLUE, LOW);   // 파랑 ON
    delay(500);
    digitalWrite(LED_BLUE, HIGH);  // 파랑 OFF
    delay(200);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀 및 OLED 초기화
  initBLE();      // BLE OTA 초기화

  // [태스크] LED 시퀀스 태스크 생성
  xTaskCreate(ledSequenceTask, "ledSeq", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}