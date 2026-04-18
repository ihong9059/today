void redLedTask(void *pvParameters) {
  while (true) {
    digitalWrite(LED_RED, LOW);   // [LED] 빨간 LED 켜기
    delay(500);
    digitalWrite(LED_RED, HIGH);  // [LED] 빨간 LED 끄기
    delay(2500);                  // [타이밍] 3초 주기 (켜짐 0.5초 + 꺼짐 2.5초)
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀 및 OLED 초기화
  initBLE();       // [BLE] OTA 블루투스 초기화

  // [태스크] 빨간 LED 깜빡임 태스크 생성
  xTaskCreate(redLedTask, "RedLED", 1024, NULL, 1, NULL);
}

void loop() {
  delay(10000);  // [루프] BLE OTA 유지
}