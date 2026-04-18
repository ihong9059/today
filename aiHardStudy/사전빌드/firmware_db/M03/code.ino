// [카운트다운] OLED에 5초 카운트다운 후 LED 전체 켜기

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // 카운트다운 5→0 표시
  for (int i = 5; i >= 0; i--) {
    oled.clear();
    oled.drawString(50, 20, String(i).c_str());
    oled.display();
    delay(1000);
  }

  // 카운트다운 완료 후 LED 전체 켜기 (active LOW)
  digitalWrite(LED_RED,    LOW);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_BLUE,   LOW);

  // 완료 메시지 표시
  oled.clear();
  oled.drawString(20, 20, "ALL LED ON!");
  oled.display();
}

void loop() {
  delay(10000);
}