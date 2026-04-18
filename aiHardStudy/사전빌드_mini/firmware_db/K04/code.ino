// [프로그레스바] OLED에 = 문자로 진행률 표시

void drawProgressBar(int percent) {
  // [바 길이] 최대 16칸 기준 채워진 칸 수 계산
  const int MAX_BARS = 16;
  int filled = (percent * MAX_BARS) / 100;

  // [채움 문자열] = 와 공백으로 바 구성
  char bar[MAX_BARS + 1];
  for (int i = 0; i < MAX_BARS; i++) {
    bar[i] = (i < filled) ? '=' : ' ';
  }
  bar[MAX_BARS] = '\0';

  // [바 감싸기] 대괄호 포함 문자열 조합
  char barLine[MAX_BARS + 3];
  snprintf(barLine, sizeof(barLine), "[%s]", bar);

  // [퍼센트 텍스트] 숫자 문자열 변환
  char pctStr[10];
  snprintf(pctStr, sizeof(pctStr), "%d%%", percent);

  // [OLED 출력] 제목/바/퍼센트 순서로 표시
  oled.clear();
  oled.drawString(0, 0,  "  Progress Bar");
  oled.drawString(0, 20, barLine);
  oled.drawString(48, 42, pctStr);
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [진행 루프] 0%~100% 순차 표시 후 1초 대기 반복
  for (int pct = 0; pct <= 100; pct++) {
    drawProgressBar(pct);
    delay(60);
  }
  delay(1000);
}