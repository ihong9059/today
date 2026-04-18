void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] "빨강!" 텍스트 출력
  oled.clear();
  oled.drawString(0, 0, "빨강!");
  oled.display();

  // [LED] 빨간 LED 켜기 (active LOW)
  digitalWrite(LED_RED, LOW);
}

void loop() {
  delay(10000);
}