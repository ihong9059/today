// [프로그레스바] 바 설정값
#define BAR_X       16
#define BAR_Y       140
#define BAR_W       140
#define BAR_H       24
#define BAR_RADIUS  4

int currentProgress = 0;
bool goingUp = true;

// [프로그레스바] 둥근 모서리 채운 사각형 (직접 구현)
void fillRoundRect(int x, int y, int w, int h, int r, uint16_t color) {
  lcd.fillRect(x + r, y, w - 2 * r, h, color);
  lcd.fillRect(x, y + r, r, h - 2 * r, color);
  lcd.fillRect(x + w - r, y + r, r, h - 2 * r, color);
  lcd.fillCircle(x + r, y + r, r, color);
  lcd.fillCircle(x + w - r, y + r, r, color);
  lcd.fillCircle(x + r, y + h - r, r, color);
  lcd.fillCircle(x + w - r, y + h - r, r, color);
}

// [프로그레스바] 퍼센트에 맞게 바 그리기
void drawProgressBar(int percent) {
  // 배경 바
  lcd.drawRect(BAR_X - 1, BAR_Y - 1, BAR_W + 2, BAR_H + 2, C_GRAY);
  lcd.fillRect(BAR_X, BAR_Y, BAR_W, BAR_H, 0x2104); // 어두운 배경

  // 채워진 바
  int fillW = (BAR_W * percent) / 100;
  if (fillW > 0) {
    // 그라데이션 효과 (녹→주황→빨강)
    uint16_t barColor;
    if (percent < 50)       barColor = C_GREEN;
    else if (percent < 80)  barColor = C_YELLOW;
    else                    barColor = C_RED;

    fillRoundRect(BAR_X, BAR_Y, fillW, BAR_H, BAR_RADIUS, barColor);
  }

  // 퍼센트 텍스트 (바 위에 지우고 다시 그리기)
  lcd.fillRect(BAR_X, BAR_Y - 30, BAR_W, 24, C_BG);
  char buf[8];
  snprintf(buf, sizeof(buf), "%d%%", percent);
  int tx = BAR_X + (BAR_W / 2) - (strlen(buf) * 12 / 2);
  lcdText(tx, BAR_Y - 28, buf, C_TEXT, 2);
}

// [LED] 퍼센트에 따라 색상 변경
void updateLED(int percent) {
  if (percent < 50)       setColor(0, 80, 0);   // 녹색
  else if (percent < 80)  setColor(80, 60, 0);  // 노란색
  else                    setColor(80, 0, 0);    // 빨간색
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [화면] 초기 UI 그리기
  lcdClear();
  lcdText(20, 40, "PROGRESS BAR", C_CYAN, 2);
  lcd.drawLine(10, 68, 162, 68, C_GRAY);
  lcdText(30, 190, "LOADING...", C_GRAY, 1);
}

void loop() {
  drawProgressBar(currentProgress);
  updateLED(currentProgress);

  // [애니메이션] 0→100→0 왕복
  if (goingUp) {
    currentProgress++;
    if (currentProgress >= 100) goingUp = false;
  } else {
    currentProgress--;
    if (currentProgress <= 0) {
      goingUp = true;
      // [완료] 완료 메시지 잠깐 표시
      lcd.fillRect(BAR_X, 190, BAR_W, 16, C_BG);
      lcdText(20, 190, "COMPLETE!", C_GREEN, 2);
      delay(800);
      lcd.fillRect(BAR_X, 190, BAR_W + 20, 20, C_BG);
      lcdText(30, 190, "LOADING...", C_GRAY, 1);
    }
  }

  delay(20); // ~50fps
}