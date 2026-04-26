// [변수] 현재 배경색 인덱스
int colorIndex = 0;

// [색상] 배경색 배열
uint16_t bgColors[] = {C_BG, C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN, C_PURPLE, C_ORANGE};
const char* colorNames[] = {"BLACK", "RED", "GREEN", "BLUE", "YELLOW", "CYAN", "PURPLE", "ORANGE"};
const int COLOR_COUNT = 8;

// [상태] 버튼 디바운스용 변수
bool lastBtnState = HIGH;
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_MS = 50;

// [화면] 현재 배경색으로 화면 갱신
void drawScreen() {
  lcd.fillScreen(bgColors[colorIndex]);
  lcd.setTextColor(C_TEXT, bgColors[colorIndex]);
  lcd.setTextSize(2);
  lcd.setCursor(20, 130);
  lcd.print("COLOR:");
  lcd.setCursor(20, 160);
  lcd.print(colorNames[colorIndex]);
  lcd.setTextSize(1);
  lcd.setCursor(20, 200);
  lcd.print("BOOT BTN to change");
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 첫 화면 출력
  drawScreen();
  setColor(0, 0, 50); // 파란색으로 준비 완료 표시
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN);

  // [디바운스] 버튼 상태 변화 감지
  if (btnState != lastBtnState) {
    lastDebounce = millis();
  }

  if ((millis() - lastDebounce) > DEBOUNCE_MS) {
    // [버튼] 눌렸을 때(LOW) 색상 변경
    if (btnState == LOW && lastBtnState == HIGH) {
      colorIndex = (colorIndex + 1) % COLOR_COUNT;
      drawScreen();
      Serial.print("색상 변경: ");
      Serial.println(colorNames[colorIndex]);
    }
  }

  lastBtnState = btnState;
  delay(10);
}
```

**동작 설명:**
- BOOT 버튼(GPIO9)을 누를 때마다 배경색이 순환됨
- 8가지 색상: BLACK → RED → GREEN → BLUE → YELLOW → CYAN → PURPLE → ORANGE
- 화면 중앙에 현재 색상 이름 표시
- 50ms 디바운스 처리로 오동작 방지
- 시작 시 RGB LED 파란색으로 준비 완료 표시