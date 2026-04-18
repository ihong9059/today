void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [카운트다운] 5부터 0까지 OLED에 표시
  for (int i = 5; i >= 0; i--) {
    oled.clear();
    oled.drawString(56, 24, String(i).c_str()); // 화면 중앙에 숫자 표시
    oled.display();
    delay(1000); // 1초 간격
  }

  // [완료] 카운트다운 종료 메시지
  oled.clear();
  oled.drawString(32, 24, "DONE!");
  oled.display();
}

void loop() {
  delay(10000);
}