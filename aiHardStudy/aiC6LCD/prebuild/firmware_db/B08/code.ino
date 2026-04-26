// [백라이트] 밝기 단계 정의 (0~255)
const uint8_t BL_LEVELS[] = {10, 50, 100, 180, 255};
const int BL_LEVEL_COUNT = 5;
int currentLevel = 4; // 기본값: 최대 밝기

bool lastBtnState = HIGH;
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_MS = 50;

// [화면] 현재 밝기 정보 표시
void drawBrightnessScreen(int level) {
  lcdClear();

  lcdText(20, 30, "LCD Backlight", C_CYAN, 2);
  lcdText(30, 60, "Brightness", C_TEXT, 2);

  // [밝기바] 배경
  lcd.drawRect(16, 100, 140, 30, C_GRAY);

  // [밝기바] 채워진 부분
  int barW = (int)(140.0f * BL_LEVELS[level] / 255.0f);
  uint16_t barColor;
  if (BL_LEVELS[level] < 60)       barColor = C_BLUE;
  else if (BL_LEVELS[level] < 130) barColor = C_GREEN;
  else if (BL_LEVELS[level] < 200) barColor = C_YELLOW;
  else                              barColor = C_ORANGE;
  lcd.fillRect(16, 100, barW, 30, barColor);

  // [수치] 퍼센트 표시
  char buf[20];
  int pct = (int)(BL_LEVELS[level] * 100 / 255);
  sprintf(buf, "%d%%", pct);
  lcdText(60, 150, buf, C_TEXT, 3);

  // [단계] 현재 단계
  sprintf(buf, "Level %d / %d", level + 1, BL_LEVEL_COUNT);
  lcdText(25, 200, buf, C_GRAY, 2);

  lcdText(10, 260, "BOOT: Change Level", C_GRAY, 1);
}

// [LED] 밝기에 따라 LED 색상 변경
void updateLED(int level) {
  uint8_t val = BL_LEVELS[level];
  if (val < 60)       setColor(0, 0, val * 4);       // 어두움: 파랑
  else if (val < 130) setColor(0, val * 2, 0);       // 보통: 초록
  else if (val < 200) setColor(val, val / 2, 0);     // 밝음: 노랑
  else                setColor(255, 100, 0);          // 최대: 주황
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 최대 밝기로 시작
  analogWrite(LCD_BL, BL_LEVELS[currentLevel]);
  drawBrightnessScreen(currentLevel);
  updateLED(currentLevel);

  Serial.println("백라이트 밝기 조절 준비 완료");
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN);

  // [버튼] 눌렸을 때 (LOW) → 다음 단계로
  if (btnState == LOW && lastBtnState == HIGH) {
    unsigned long now = millis();
    if (now - lastDebounce > DEBOUNCE_MS) {
      lastDebounce = now;

      currentLevel = (currentLevel + 1) % BL_LEVEL_COUNT;
      analogWrite(LCD_BL, BL_LEVELS[currentLevel]);
      drawBrightnessScreen(currentLevel);
      updateLED(currentLevel);

      Serial.printf("밝기 변경: Level %d (%d/255)\n",
                    currentLevel + 1, BL_LEVELS[currentLevel]);
    }
  }

  lastBtnState = btnState;
  delay(10);
}
```

**동작 방식:**

| 단계 | 밝기 값 | % | LED 색상 |
|------|---------|---|---------|
| 1 | 10 | 4% | 파랑 (어두움) |
| 2 | 50 | 20% | 파랑 |
| 3 | 100 | 39% | 초록 |
| 4 | 180 | 71% | 노랑 |
| 5 | 255 | 100% | 주황 (최대) |

- **BOOT 버튼** 누를 때마다 다음 밝기 단계로 순환
- LCD에 밝기 바 + 퍼센트 표시
- RGB LED 색상으로도 밝기 수준을 직관적으로 표시
- `analogWrite(LCD_BL, 0~255)`로 PWM 제어