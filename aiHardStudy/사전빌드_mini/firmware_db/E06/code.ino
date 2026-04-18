void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화
}

void loop() {
  // [OLED] 텍스트 표시
  oled.clear();
  oled.drawString(0, 0, "Hello UTTEC!");
  oled.display();
  delay(1000);

  // [OLED] 화면 지우기
  oled.clear();
  oled.display();
  delay(1000);
}