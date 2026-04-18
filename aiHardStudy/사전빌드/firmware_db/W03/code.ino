// [전역] 시작 시각 기준점
unsigned long startMillis = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  startMillis = millis(); // 시작 시각 저장
}

void loop() {
  // [시간 계산] 경과 시간(초)
  unsigned long elapsed = (millis() - startMillis) / 1000;
  int minutes = (elapsed / 60) % 100;
  int seconds = elapsed % 60;

  // [OLED] 화면 업데이트
  oled.clear();
  oled.drawString(0, 0, "Digital Clock");

  // [포맷] MM:SS 문자열 구성
  char timeBuf[8];
  snprintf(timeBuf, sizeof(timeBuf), "%02d:%02d", minutes, seconds);
  oled.drawString(20, 28, timeBuf); // 가운데 정렬 근사치

  oled.display();

  delay(1000); // 1초 간격 갱신
}