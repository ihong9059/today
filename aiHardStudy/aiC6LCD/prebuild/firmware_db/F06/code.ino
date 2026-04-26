// [메뉴] 버튼 단속 구분: 짧게=이동, 길게=선택
#define SHORT_PRESS_MS 50
#define LONG_PRESS_MS  600

// [메뉴] 항목 정의
const char* menuItems[] = {
  "LED 빨강",
  "LED 초록",
  "LED 파랑",
  "LED 끄기",
  "화면 지우기"
};
const int MENU_COUNT = 5;
int currentIndex = 0;
int selectedIndex = -1;

// [버튼] 상태 변수
bool lastBtnState   = HIGH;
unsigned long pressStart = 0;
bool pressHandled   = false;

// [LCD] 메뉴 화면 그리기
void drawMenu() {
  lcd.fillScreen(C_BG);

  // [제목] 상단 타이틀바
  lcd.fillRect(0, 0, 172, 28, C_BLUE);
  lcdText(10, 6, "[ MENU ]", C_TEXT, 2);

  // [메뉴] 각 항목 출력
  for (int i = 0; i < MENU_COUNT; i++) {
    int y = 40 + i * 44;

    if (i == currentIndex) {
      // [선택] 현재 커서 항목 강조
      lcd.fillRect(0, y - 4, 172, 38, C_ORANGE);
      lcdText(30, y + 6, menuItems[i], C_BG, 2);
      // [화살표] 커서 표시
      lcd.fillTriangle(6, y + 9, 6, y + 23, 20, y + 16, C_BG);
    } else {
      lcd.fillRect(0, y - 4, 172, 38, 0x1082); // 어두운 회색
      lcdText(30, y + 6, menuItems[i], C_GRAY, 2);
    }
  }

  // [안내] 하단 조작 안내
  lcdText(4, 295, "짧게:이동  길게:선택", 0x632C, 1);
}

// [결과] 선택 항목 실행 및 결과 화면 표시
void executeMenu(int idx) {
  lcd.fillScreen(C_BG);
  lcd.fillRect(0, 0, 172, 28, C_GREEN);
  lcdText(14, 6, "SELECTED!", C_BG, 2);

  // [결과] 선택된 메뉴명 출력
  lcdText(10, 50, menuItems[idx], C_YELLOW, 2);

  // [동작] 항목별 실제 동작
  switch (idx) {
    case 0: // LED 빨강
      setColor(200, 0, 0);
      lcdText(20, 110, "LED -> RED", C_RED, 2);
      break;
    case 1: // LED 초록
      setColor(0, 200, 0);
      lcdText(20, 110, "LED -> GREEN", C_GREEN, 2);
      break;
    case 2: // LED 파랑
      setColor(0, 0, 200);
      lcdText(20, 110, "LED -> BLUE", C_BLUE, 2);
      break;
    case 3: // LED 끄기
      ledOff();
      lcdText(20, 110, "LED OFF", C_GRAY, 2);
      break;
    case 4: // 화면 지우기
      ledOff();
      lcdText(20, 110, "CLEARED", C_CYAN, 2);
      break;
  }

  lcdText(10, 270, "3초 후 메뉴 복귀...", C_GRAY, 1);
  delay(3000);
}

void setup() {
  Serial.begin(115200);
  initHardware();  // LCD, WS2812, 버튼 초기화
  initBLE();       // BLE OTA 초기화

  drawMenu();      // 초기 메뉴 표시
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN); // [버튼] 현재 상태 읽기

  // [버튼] 누름 시작 감지
  if (btnState == LOW && lastBtnState == HIGH) {
    pressStart   = millis();
    pressHandled = false;
  }

  // [버튼] 길게 누름 → 선택 (누르는 중 LONG_PRESS_MS 도달 시 즉시 반응)
  if (btnState == LOW && !pressHandled) {
    if (millis() - pressStart >= LONG_PRESS_MS) {
      pressHandled  = true;
      selectedIndex = currentIndex;
      Serial.printf("[선택] %s\n", menuItems[selectedIndex]);

      executeMenu(selectedIndex); // [실행] 선택 항목 처리
      drawMenu();                 // [복귀] 메뉴 다시 그리기
    }
  }

  // [버튼] 뗐을 때 처리
  if (btnState == HIGH && lastBtnState == LOW) {
    unsigned long duration = millis() - pressStart;

    if (!pressHandled && duration >= SHORT_PRESS_MS) {
      // [이동] 짧게 누름 → 다음 항목으로 이동
      currentIndex = (currentIndex + 1) % MENU_COUNT;
      Serial.printf("[이동] -> %s\n", menuItems[currentIndex]);
      drawMenu();
    }
    pressHandled = false;
  }

  lastBtnState = btnState;
  delay(10);
}
```

**동작 방식:**

| 동작 | 효과 |
|------|------|
| 짧게 누름 (50ms~600ms) | 다음 메뉴 항목으로 이동 |
| 길게 누름 (600ms 이상) | 현재 항목 선택 실행 |

**메뉴 항목 5개:**
- LED 빨강 / 초록 / 파랑 → WS2812 색상 변경
- LED 끄기 → LED OFF
- 화면 지우기 → 화면 초기화

선택 후 3초간 결과 화면을 보여주고 메뉴로 자동 복귀합니다.