void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [카운트] 1부터 10까지 순서대로 표시
  for (int i = 1; i <= 10; i++) {
    oled.clear();
    oled.drawString(56, 24, String(i).c_str()); // 화면 중앙에 숫자 표시
    oled.display();
    delay(1000); // 1초 간격
  }

  // [대기] 10 표시 후 잠시 멈춤
  delay(2000);
}