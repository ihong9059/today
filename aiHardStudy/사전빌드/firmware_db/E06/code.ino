// [OLED 깜빡임] 1초 표시 후 1초 지우기 반복

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // 화면에 텍스트 표시
  oled.clear();
  oled.drawString(20, 20, "Hello ESP32!");
  oled.display();
  delay(1000); // 1초 표시

  // 화면 지우기
  oled.clear();
  oled.display();
  delay(1000); // 1초 꺼짐

  delay(10000);
}