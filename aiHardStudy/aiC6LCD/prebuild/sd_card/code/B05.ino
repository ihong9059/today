// [시간] millis() 기반 경과 시간 계산
unsigned long startMillis = 0;

// [시간] 초를 HH:MM:SS 문자열로 변환
String formatTime(unsigned long totalSeconds) {
  unsigned long h = totalSeconds / 3600;
  unsigned long m = (totalSeconds % 3600) / 60;
  unsigned long s = totalSeconds % 60;
  char buf[9];
  snprintf(buf, sizeof(buf), "%02lu:%02lu:%02lu", h, m, s);
  return String(buf);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [화면] 초기 배경 및 라벨 출력
  lcdClear();
  lcdText(30, 100, "ELAPSED TIME", C_CYAN, 2);
  lcd.drawLine(10, 125, 162, 125, C_GRAY);

  startMillis = millis();
}

void loop() {
  // [시간] 경과 초 계산
  unsigned long elapsed = (millis() - startMillis) / 1000;
  String timeStr = formatTime(elapsed);

  // [화면] 시간 표시 (깜빡임 방지를 위해 배경색으로 덮고 재출력)
  lcd.fillRect(10, 145, 152, 36, C_BG);
  lcdText(18, 148, timeStr.c_str(), C_YELLOW, 3);

  // [LED] 초마다 파란색 깜빡임
  if (elapsed % 2 == 0) {
    setColor(0, 0, 30);
  } else {
    ledOff();
  }

  delay(500);
}