// [버튼] 짧게/길게 누르기 구분 펌웨어

#define LONG_PRESS_MS 800  // 길게 누르기 기준 시간 (ms)

// [버튼] 상태 변수
unsigned long btnPressTime = 0;
bool btnPressed = false;
bool btnHandled = false;

// [화면] 결과 표시 함수
void showResult(const char* label, uint16_t color) {
  lcdClear();
  // 제목
  lcdText(10, 30, "Button Test", C_GRAY, 2);
  lcd.drawLine(0, 55, 172, 55, C_GRAY);

  // 결과 텍스트
  lcd.setTextColor(color, C_BG);
  lcd.setTextSize(3);
  lcd.setCursor(10, 120);
  lcd.print(label);

  // 안내
  lcdText(10, 270, "Press button", C_GRAY, 2);
  lcdText(10, 292, "short / long", C_GRAY, 2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [화면] 초기 안내 표시
  lcdClear();
  lcdText(10, 30, "Button Test", C_TEXT, 2);
  lcd.drawLine(0, 55, 172, 55, C_GRAY);
  lcdText(20, 130, "Press the", C_GRAY, 2);
  lcdText(20, 155, "BOOT btn!", C_GRAY, 2);
  lcdText(10, 270, "short / long", C_GRAY, 2);

  // [LED] 초기 흰색
  setColor(30, 30, 30);
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN); // LOW = 눌림

  if (btnState == LOW && !btnPressed) {
    // [버튼] 누르기 시작
    btnPressTime = millis();
    btnPressed = true;
    btnHandled = false;
    setColor(80, 80, 0); // 노란색: 누르는 중
  }

  if (btnPressed && btnState == LOW && !btnHandled) {
    // [버튼] 누르는 중 - 길게 누르기 감지
    if (millis() - btnPressTime >= LONG_PRESS_MS) {
      // [결과] 길게 누르기 처리
      showResult("LONG!", C_RED);
      setColor(200, 0, 0); // 빨간: 길게
      Serial.println("LONG PRESS");
      btnHandled = true;
    }
  }

  if (btnPressed && btnState == HIGH) {
    // [버튼] 뗐을 때
    if (!btnHandled) {
      unsigned long elapsed = millis() - btnPressTime;
      if (elapsed < LONG_PRESS_MS) {
        // [결과] 짧게 누르기
        showResult("SHORT!", C_GREEN);
        setColor(0, 150, 0); // 초록: 짧게
        Serial.println("SHORT PRESS");
      }
    }
    btnPressed = false;
    btnHandled = false;

    // [LED] 1초 후 흰색으로 복귀
    delay(1000);
    setColor(30, 30, 30);
  }

  delay(10);
}
```

**동작 설명:**

| 동작 | 결과 | LED |
|------|------|-----|
| 짧게 누르기 (<800ms) | `SHORT!` (초록) | 초록 |
| 길게 누르기 (≥800ms) | `LONG!` (빨간) | 빨간 |
| 누르는 중 | 노란 LED | 노란 |

- `LONG_PRESS_MS` 값을 바꿔 기준 시간 조정 가능
- 길게 누르기는 **떼지 않아도** 즉시 감지 (누르는 도중 판정)