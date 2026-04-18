// [초시계] 전역 변수
unsigned long startTime = 0;
char timeStr[20];

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초시계] 시작 시간 기록
  startTime = millis();

  // [OLED] 초기 화면
  oled.clear();
  oled.drawString(0, 0, "Stopwatch");
  oled.drawString(0, 16, "00:00.000");
  oled.display();
}

void loop() {
  // [경과시간] millis로 계산
  unsigned long elapsed = millis() - startTime;

  unsigned long ms   = elapsed % 1000;
  unsigned long sec  = (elapsed / 1000) % 60;
  unsigned long min  = (elapsed / 60000);

  // [포맷] snprintf로 char 배열에 시간 포맷팅
  snprintf(timeStr, sizeof(timeStr), "%02lu:%02lu.%03lu", min, sec, ms);

  // [OLED] 화면 갱신
  oled.clear();
  oled.drawString(0, 0, "Stopwatch");
  oled.drawString(0, 16, timeStr);
  oled.display();

  // [스위치] GPIO5 누르면 초시계 리셋
  if (digitalRead(SWITCH_PIN) == LOW) {
    startTime = millis();
    delay(300); // 디바운스
  }

  delay(50); // 20fps 갱신
}