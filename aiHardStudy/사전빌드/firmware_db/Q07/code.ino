// [스톱워치] 상태 열거형: 대기/실행/정지
enum SwState { SW_IDLE, SW_RUNNING, SW_STOPPED };
SwState swState = SW_IDLE;

unsigned long startTime   = 0;  // 시작 기준 millis
unsigned long elapsedTime = 0;  // 누적 경과시간(ms)
unsigned long lastDebounce = 0; // 디바운스 타이머
bool lastBtnState = HIGH;
int pressCount = 0; // 버튼 누른 횟수 (1=시작 2=정지 3=리셋)

// [시간 포맷] mm:ss.xxx 문자열 생성
void formatTime(unsigned long ms, char* buf) {
  unsigned long min  = ms / 60000;
  unsigned long sec  = (ms % 60000) / 1000;
  unsigned long msec = ms % 1000;
  sprintf(buf, "%02lu:%02lu.%03lu", min, sec, msec);
}

// [OLED 갱신] 경과시간 + 상태 표시
void updateOLED(unsigned long t) {
  char buf[16];
  formatTime(t, buf);
  oled.clear();
  oled.drawString(16, 0, "StopWatch");
  oled.drawString(4,  18, buf);
  if (swState == SW_IDLE)    oled.drawString(28, 40, "READY");
  else if (swState == SW_RUNNING) oled.drawString(24, 40, "RUNNING");
  else                       oled.drawString(24, 40, "STOPPED");
  oled.display();
}

// [버튼 처리] 순차 누름: 1=시작, 2=정지, 3=리셋
void handleButton() {
  bool btn = digitalRead(32); // 스위치 GPIO32

  if (btn == LOW && lastBtnState == HIGH && millis() - lastDebounce > 60) {
    lastDebounce = millis();
    pressCount++;

    if (pressCount == 1) {
      // 시작
      swState = SW_RUNNING;
      startTime = millis() - elapsedTime;
      digitalWrite(LED_RED,    HIGH); // 꺼짐
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE,   LOW);  // 파랑=실행 중
    } else if (pressCount == 2) {
      // 정지
      swState = SW_STOPPED;
      elapsedTime = millis() - startTime;
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(LED_YELLOW, LOW);  // 노랑=정지
    } else if (pressCount == 3) {
      // 리셋
      swState = SW_IDLE;
      elapsedTime = 0;
      pressCount  = 0;
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_RED,    LOW);  // 빨강=리셋 순간 점등
      delay(200);
      digitalWrite(LED_RED,    HIGH);
    }
  }
  lastBtnState = btn;
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀 초기화
  initBLE();      // BLE OTA 초기화

  // 초기 화면 표시
  updateOLED(0);
}

void loop() {
  handleButton(); // 버튼 상태 확인

  // 현재 표시할 시간 계산
  unsigned long displayTime = (swState == SW_RUNNING)
      ? (millis() - startTime)
      : elapsedTime;

  updateOLED(displayTime); // OLED 갱신 (~20fps)
  delay(50);
}