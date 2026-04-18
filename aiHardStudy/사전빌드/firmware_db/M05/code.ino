void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [업타임] 경과 시간(초) 계산
  unsigned long seconds = millis() / 1000;

  // [OLED] 화면 갱신
  oled.clear();
  oled.drawString(0, 0, "Uptime:");
  oled.drawString(0, 16, (String(seconds) + " sec").c_str());
  oled.display();

  delay(1000);
}