// [카운트다운] 전역 변수
int countDown = 10;
unsigned long lastUpdate = 0;
const int INTERVAL = 1000; // 1초 간격

void drawCountdown(int num) {
  // [화면] 배경 클리어 후 숫자 표시
  lcdClear();

  // [제목] 상단 텍스트
  lcdText(30, 40, "COUNTDOWN", C_CYAN, 2);
  lcd.drawLine(0, 65, 172, 65, C_GRAY);

  // [숫자] 큰 숫자 중앙 표시
  String s = String(num);
  int x = (num >= 10) ? 30 : 60; // 두 자리/한 자리 위치 조정
  lcd.setTextColor(C_YELLOW, C_BG);
  lcd.setTextSize(8);
  lcd.setCursor(x, 110);
  lcd.print(s);

  // [하단] 상태 메시지
  if (num == 0) {
    lcdText(45, 260, "DONE!", C_GREEN, 3);
  } else {
    lcdText(25, 260, "seconds left", C_GRAY, 2);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 카운트다운 시작
  drawCountdown(countDown);
  setColor(0, 0, 50); // 파란색 LED
}

void loop() {
  unsigned long now = millis();

  if (now - lastUpdate >= INTERVAL) {
    lastUpdate = now;

    drawCountdown(countDown);

    if (countDown > 0) {
      // [LED] 숫자에 따라 색 변경
      if (countDown > 5) {
        setColor(0, 200, 0);   // 녹색
      } else if (countDown > 2) {
        setColor(200, 100, 0); // 주황색
      } else {
        setColor(200, 0, 0);   // 빨간색
      }
      countDown--;
    } else {
      // [완료] 초록 LED 점멸
      static bool toggle = false;
      toggle = !toggle;
      if (toggle) setColor(0, 255, 0);
      else ledOff();
    }
  }

  delay(10);
}