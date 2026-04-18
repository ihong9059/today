void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화
  initBLE();        // BLE OTA 초기화

  digitalWrite(LED_RED, LOW); // [RED LED] 켜기 (active LOW)
}

void loop() {
  delay(10000);
}