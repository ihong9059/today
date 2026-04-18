// [시계] 시작 시각 기준점
unsigned long startMillis = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  startMillis = millis(); // [시계] 기준 시간 설정

  // [디스플레이] 초기 화면
  oled.clear();
  oled.drawString(0, 0, "Digital Clock");
  oled.display();
}

void loop() {
  // [시계] 경과 시간(초) 계산
  unsigned long elapsed = (millis() - startMillis) / 1000;
  int minutes = (elapsed / 60) % 60;
  int seconds = elapsed % 60;

  // [문자열] MM:SS 형식 포맷
  char timeStr[8];
  snprintf(timeStr, sizeof(timeStr), "%02d:%02d", minutes, seconds);

  // [디스플레이] OLED 갱신
  oled.clear();
  oled.drawString(20, 20, timeStr);
  oled.display();

  delay(1000); // [루프] 1초마다 갱신
}