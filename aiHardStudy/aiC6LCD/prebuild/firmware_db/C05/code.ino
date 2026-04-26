// [사이렌] 경찰차 LED 깜빡임 상태
int sirenState = 0;
unsigned long lastToggle = 0;
const int SIREN_INTERVAL = 150; // ms

void drawSirenScreen(bool isRed) {
  // [화면] 사이렌 색상에 따라 배경 변경
  lcd.fillScreen(isRed ? C_RED : C_BLUE);
  lcd.fillRect(10, 60, 152, 60, C_BG);
  lcdText(20, 75, "POLICE", isRed ? C_RED : C_BLUE, 3);

  lcd.fillRect(10, 150, 152, 40, C_BG);
  lcdText(30, 158, "SIREN", C_TEXT, 2);

  // [표시] 현재 색상 텍스트
  lcd.fillRect(10, 210, 152, 30, C_BG);
  if (isRed) {
    lcdText(50, 215, "RED", C_RED, 2);
  } else {
    lcdText(45, 215, "BLUE", C_BLUE, 2);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 화면 세팅
  lcdClear();
  drawSirenScreen(true);
}

void loop() {
  unsigned long now = millis();

  // [사이렌] 일정 간격으로 빨강/파랑 토글
  if (now - lastToggle >= SIREN_INTERVAL) {
    lastToggle = now;
    sirenState = !sirenState;

    if (sirenState) {
      // [RED] 빨간 불
      setColor(255, 0, 0);
      drawSirenScreen(true);
    } else {
      // [BLUE] 파란 불
      setColor(0, 0, 255);
      drawSirenScreen(false);
    }
  }

  delay(10);
}