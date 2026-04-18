// [발표 타이머] 전역 변수
unsigned long timerDuration = 300;   // 기본 5분(초)
unsigned long remainingSeconds = 300;
unsigned long lastSecondTime = 0;
bool timerRunning = false;
bool timerFinished = false;
bool warnPlayed = false;
bool switchLastState = HIGH;

void showTimer() {
  // [OLED] 남은 시간 MM:SS 표시
  oled.clear();
  int mins = remainingSeconds / 60;
  int secs = remainingSeconds % 60;
  char buf[10];
  sprintf(buf, "%02d:%02d", mins, secs);
  oled.drawString(28, 15, buf);

  if (timerFinished) {
    oled.drawString(30, 45, "TIME UP!");
  } else if (timerRunning) {
    oled.drawString(35, 45, "Running");
  } else {
    oled.drawString(18, 45, "Btn: Start/Pause");
  }
  oled.display();
}

void setLed() {
  // [LED] 상태별 색상: 초록→진행, 노랑→1분이하, 빨강→종료
  if (timerFinished) {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  } else if (timerRunning && remainingSeconds <= 60) {
    pixel.setPixelColor(0, pixel.Color(255, 200, 0));
  } else if (timerRunning) {
    pixel.setPixelColor(0, pixel.Color(0, 200, 0));
  } else {
    pixel.setPixelColor(0, pixel.Color(0, 0, 0));
  }
  pixel.show();
}

void playWarning() {
  // [스피커] 1분 경고: 짧은 비프 2회
  tone(2, 880, 200);
  delay(300);
  tone(2, 880, 200);
  delay(250);
  noTone(2);
}

void playFinish() {
  // [스피커] 종료 알림: 하강 3음
  tone(2, 1200, 300);
  delay(380);
  tone(2, 900, 300);
  delay(380);
  tone(2, 600, 600);
  delay(650);
  noTone(2);
}

void onBleReceive(String cmd) {
  // [BLE] SET:초, START, PAUSE, RESET 명령 처리
  if (cmd.startsWith("SET:")) {
    int secs = cmd.substring(4).toInt();
    if (secs > 0) {
      timerDuration = secs;
      remainingSeconds = secs;
      timerRunning = false;
      timerFinished = false;
      warnPlayed = false;
    }
  } else if (cmd == "START") {
    if (!timerFinished && !timerRunning) {
      timerRunning = true;
      lastSecondTime = millis();
    }
  } else if (cmd == "PAUSE") {
    timerRunning = false;
  } else if (cmd == "RESET") {
    remainingSeconds = timerDuration;
    timerRunning = false;
    timerFinished = false;
    warnPlayed = false;
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 타이머 시작 상태 설정
  remainingSeconds = timerDuration;
  lastSecondTime = millis();
  showTimer();
  setLed();
}

void loop() {
  unsigned long now = millis();

  // [스위치] 버튼: 시작/일시정지/리셋 토글
  bool swState = digitalRead(SWITCH_PIN);
  if (swState == LOW && switchLastState == HIGH) {
    delay(50);
    if (timerFinished) {
      // [리셋] 종료 후 버튼으로 초기화
      remainingSeconds = timerDuration;
      timerFinished = false;
      timerRunning = false;
      warnPlayed = false;
    } else if (timerRunning) {
      timerRunning = false;  // [일시정지]
    } else {
      timerRunning = true;   // [시작]
      lastSecondTime = millis();
    }
  }
  switchLastState = swState;

  // [카운트다운] 1초마다 감소
  if (timerRunning && (now - lastSecondTime >= 1000)) {
    lastSecondTime = now;
    if (remainingSeconds > 0) {
      remainingSeconds--;

      // [1분 경고] 60초 남으면 노랑 LED + 경고음
      if (remainingSeconds == 60 && !warnPlayed) {
        warnPlayed = true;
        playWarning();
        if (deviceConnected && sensorChar) {
          std::string s = "WARN:1MIN";
          sensorChar->setValue(s);
          sensorChar->notify();
        }
      }

      // [종료] 0초 도달 시 빨강 + 비프
      if (remainingSeconds == 0) {
        timerRunning = false;
        timerFinished = true;
        setLed();
        playFinish();
        if (deviceConnected && sensorChar) {
          std::string s = "TIMER_END";
          sensorChar->setValue(s);
          sensorChar->notify();
        }
      }
    }
  }

  showTimer();
  setLed();
  delay(100);
}