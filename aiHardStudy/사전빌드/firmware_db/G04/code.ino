void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [스위치] 입력 핀 설정
  pinMode(32, INPUT_PULLUP);
}

void loop() {
  // [스위치] 누름 감지 (active LOW)
  if (digitalRead(32) == LOW) {
    // [OLED] "PRESSED!" 표시
    oled.clear();
    oled.drawString(24, 28, "PRESSED!");
    oled.display();
  } else {
    // [OLED] 기본 화면
    oled.clear();
    oled.drawString(28, 28, "Ready...");
    oled.display();
  }

  delay(10000);
}