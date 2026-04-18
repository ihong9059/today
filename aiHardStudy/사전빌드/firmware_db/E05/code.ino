void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [카운트다운] 5부터 0까지 OLED에 표시
void loop() {
  for (int i = 5; i >= 0; i--) {
    oled.clear();
    oled.drawString(55, 24, String(i).c_str()); // [숫자] 화면 중앙에 출력
    oled.display();
    delay(1000); // [대기] 1초 간격
  }

  // [완료] 카운트다운 종료 후 대기
  delay(10000);
}