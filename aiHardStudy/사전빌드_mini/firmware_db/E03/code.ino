// [OLED] 3줄 텍스트 표시 예제

void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화

  // [OLED] 화면 초기화 후 3줄 텍스트 출력
  oled.clear();
  oled.drawString(0, 0,  "Line 1: Hello!");   // 1번째 줄 (y=0)
  oled.drawString(0, 16, "Line 2: ESP32-C3"); // 2번째 줄 (y=16)
  oled.drawString(0, 32, "Line 3: UTTEC");    // 3번째 줄 (y=32)
  oled.display();
}

void loop() {
  delay(10000); // [루프] 대기
}