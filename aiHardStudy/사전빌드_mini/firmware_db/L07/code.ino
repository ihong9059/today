// [퀴즈 타이머] 상태 정의
enum TimerState { IDLE, COUNTING, DONE };
TimerState timerState = IDLE;

unsigned long countdownStart = 0;
const int TOTAL_SECONDS = 10;
int lastDisplayedSec = -1;
bool switchPressed = false;
bool lastSwitchState = HIGH;

// [LED] 남은 시간에 따라 색상 변경
void updateLedColor(int remaining) {
  if (remaining > 6) {
    // 초록: 여유 있음 (7~10초)
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  } else if (remaining > 3) {
    // 노랑: 주의 (4~6초)
    pixel.setPixelColor(0, pixel.Color(255, 180, 0));
  } else if (remaining > 0) {
    // 빨강: 위험 (1~3초)
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  } else {
    // 꺼짐: 종료
    pixel.setPixelColor(0, pixel.Color(0, 0, 0));
  }
  pixel.show();
}

// [OLED] 남은 시간 표시
void displayTimer(int remaining) {
  oled.clear();
  if (timerState == IDLE) {
    oled.drawString(10, 10, "QUIZ TIMER");
    oled.drawString(10, 30, "Press to Start");
  } else if (timerState == COUNTING) {
    oled.drawString(10, 5, "Time Left:");
    char buf[8];
    sprintf(buf, "%2d sec", remaining);
    oled.drawString(25, 28, buf);
    // [진행바] 남은 시간 비율로 가로 막대 표시
    int barWidth = (remaining * 100) / TOTAL_SECONDS;
    for (int x = 0; x < barWidth; x++) {
      oled.drawString(x + 14, 52, "-");
    }
  } else if (timerState == DONE) {
    oled.drawString(20, 15, "TIME UP!");
    oled.drawString(5, 35, "Press to Reset");
  }
  oled.display();
}

// [버저] 종료 경고음 재생
void playEndSound() {
  for (int i = 0; i < 3; i++) {
    tone(2, 880, 150);
    delay(200);
  }
  tone(2, 440, 500);
  delay(600);
  noTone(2);
}

// [틱음] 매 초 짧은 비프음
void playTickSound() {
  tone(2, 1200, 40);
  delay(50);
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 화면 표시
  timerState = IDLE;
  pixel.clear();
  pixel.show();
  displayTimer(TOTAL_SECONDS);
}

void loop() {
  // [스위치] 버튼 감지 (디바운싱)
  bool currentSwitch = digitalRead(SWITCH_PIN);
  if (lastSwitchState == HIGH && currentSwitch == LOW) {
    switchPressed = true;
    delay(50); // 디바운스
  }
  lastSwitchState = currentSwitch;

  // [상태 전환] 버튼으로 시작/리셋
  if (switchPressed) {
    switchPressed = false;
    if (timerState == IDLE || timerState == DONE) {
      // 타이머 시작
      timerState = COUNTING;
      countdownStart = millis();
      lastDisplayedSec = TOTAL_SECONDS;
      updateLedColor(TOTAL_SECONDS);
      displayTimer(TOTAL_SECONDS);
      playTickSound();
      Serial.println("타이머 시작!");
    }
  }

  // [카운트다운] 진행 중
  if (timerState == COUNTING) {
    unsigned long elapsed = (millis() - countdownStart) / 1000;
    int remaining = TOTAL_SECONDS - (int)elapsed;

    if (remaining < 0) remaining = 0;

    // [갱신] 초가 바뀔 때만 표시 업데이트
    if (remaining != lastDisplayedSec) {
      lastDisplayedSec = remaining;
      updateLedColor(remaining);
      displayTimer(remaining);

      if (remaining > 0) {
        playTickSound(); // 매 초 틱 소리
        Serial.print("남은 시간: ");
        Serial.println(remaining);
      }
    }

    // [종료] 0초 도달
    if (remaining <= 0) {
      timerState = DONE;
      updateLedColor(0);
      displayTimer(0);
      playEndSound();

      // [LED] 빨간 점멸 3회
      for (int i = 0; i < 3; i++) {
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
        pixel.show();
        delay(200);
        pixel.clear();
        pixel.show();
        delay(200);
      }

      Serial.println("시간 초과!");
    }
  }

  delay(10);
}