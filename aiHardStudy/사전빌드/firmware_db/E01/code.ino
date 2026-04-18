void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] "Hello" 텍스트 표시
  oled.clear();
  oled.drawString(0, 0, "Hello");
  oled.display();
}

void loop() {
  delay(10000);
}