// [신호등] LED 상태 제어 태스크
void trafficLightTask(void* param) {
  while (true) {
    // [빨강] 빨간불 3초
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
    delay(3000);

    // [노랑] 노란불 1초
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, HIGH);
    delay(1000);

    // [파랑] 파란불 3초
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, LOW);
    delay(3000);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 및 OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [태스크] 신호등 태스크 생성
  xTaskCreate(trafficLightTask, "traffic", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}