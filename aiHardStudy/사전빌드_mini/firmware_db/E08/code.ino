// [업타임] 동작 시작 시간 기록
unsigned long startTime = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  startTime = millis();
}

void loop() {
  // [업타임] 경과 시간(초) 계산
  unsigned long elapsed = (millis() - startTime) / 1000;

  char buf[32];
  sprintf(buf, "Uptime: %lus", elapsed);

  // [OLED] 동작 시간 표시
  oled.clear();
  oled.drawString(0, 0, "=== Uptime ===");
  oled.drawString(0, 16, buf);
  oled.display();

  delay(1000);
}