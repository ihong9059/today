void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [카운터] 1부터 10까지 숫자를 OLED에 표시
  for (int i = 1; i <= 10; i++) {
    oled.clear();
    oled.drawString(55, 24, String(i).c_str()); // 화면 중앙에 숫자 출력
    oled.display();
    delay(1000); // 1초 간격
  }

  // [대기] 카운팅 완료 후 메시지 표시
  oled.clear();
  oled.drawString(20, 24, "Done!");
  oled.display();
  delay(10000);
}