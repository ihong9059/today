// [게임 상태] 대기, 진행 중, 결과 표시
enum GameState { WAIT, RUNNING, RESULT };
volatile GameState gameState = WAIT;

int pressCount = 0;           // [카운터] 누른 횟수
unsigned long gameStart = 0;  // [타이머] 게임 시작 시각
const int GAME_DURATION = 10000; // [설정] 10초

bool lastBtn = HIGH;          // [디바운스] 이전 버튼 상태
unsigned long lastDebounce = 0;
const int DEBOUNCE_MS = 30;

// [OLED] 현재 상태 화면 출력
void updateDisplay(int count, int remaining, bool isWaiting, bool isResult) {
  oled.clear();
  if (isWaiting) {
    oled.drawString(0, 0, "RAPID PRESS!");
    oled.drawString(0, 16, "Press to START");
  } else if (isResult) {
    char buf[32];
    oled.drawString(0, 0, "RESULT!");
    snprintf(buf, sizeof(buf), "Score: %d", count);
    oled.drawString(0, 16, buf);
    oled.drawString(0, 32, "Press to RETRY");
  } else {
    char buf[32];
    snprintf(buf, sizeof(buf), "Time: %ds", remaining);
    oled.drawString(0, 0, buf);
    snprintf(buf, sizeof(buf), "Count: %d", count);
    oled.drawString(0, 20, buf);
    oled.drawString(0, 40, "PRESS!PRESS!");
  }
  oled.display();
}

// [LED] 점수에 따라 색상 표시
void showScoreLed(int score) {
  if (score >= 50) {
    pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // 녹색: 고득점
  } else if (score >= 30) {
    pixel.setPixelColor(0, pixel.Color(255, 255, 0)); // 노랑: 중간
  } else {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨강: 저득점
  }
  pixel.show();
}

// [BLE] 점수를 BLE로 전송
void sendScore(int score) {
  if (deviceConnected && sensorChar) {
    char buf[32];
    snprintf(buf, sizeof(buf), "score:%d", score);
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [효과음] 게임 시작 효과음
void playStart() {
  tone(2, 880, 100); delay(120);
  tone(2, 1320, 150); delay(200);
  noTone(2);
}

// [효과음] 결과 발표 효과음
void playResult(int score) {
  if (score >= 50) {
    tone(2, 1047, 100); delay(120);
    tone(2, 1319, 100); delay(120);
    tone(2, 1568, 300); delay(350);
  } else {
    tone(2, 500, 200); delay(250);
    tone(2, 400, 300); delay(350);
  }
  noTone(2);
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀, OLED, WS2812 초기화
  initBLE();      // [BLE] OTA 및 BLE 초기화

  // [대기 화면] 시작 안내
  updateDisplay(0, 10, true, false);
  pixel.setPixelColor(0, pixel.Color(0, 0, 50)); // 파란 대기 LED
  pixel.show();
}

void loop() {
  bool currentBtn = digitalRead(SWITCH_PIN); // [버튼] 현재 상태 읽기

  // [디바운스] 버튼 상태 변화 감지
  if (currentBtn != lastBtn) {
    lastDebounce = millis();
  }

  bool btnPressed = false;
  if ((millis() - lastDebounce) > DEBOUNCE_MS) {
    if (currentBtn == LOW && lastBtn == HIGH) {
      btnPressed = true; // [이벤트] 버튼 눌림 감지 (falling edge)
    }
  }
  lastBtn = currentBtn;

  if (gameState == WAIT) {
    // [대기] 버튼 누르면 게임 시작
    if (btnPressed) {
      pressCount = 0;
      gameStart = millis();
      gameState = RUNNING;
      pixel.setPixelColor(0, pixel.Color(255, 100, 0)); // 주황: 게임 중
      pixel.show();
      playStart();
    }

  } else if (gameState == RUNNING) {
    unsigned long elapsed = millis() - gameStart;
    int remaining = (GAME_DURATION - elapsed) / 1000 + 1;

    if (btnPressed) {
      pressCount++; // [카운트] 누른 횟수 증가
      // [LED 깜빡] 누를 때마다 흰색 반짝
      pixel.setPixelColor(0, pixel.Color(255, 255, 255));
      pixel.show();
      delay(20);
      pixel.setPixelColor(0, pixel.Color(255, 100, 0));
      pixel.show();
      tone(2, 1200, 30); // [효과음] 짧은 클릭음
    }

    // [OLED] 남은 시간, 횟수 표시
    static unsigned long lastOledUpdate = 0;
    if (millis() - lastOledUpdate > 200) {
      updateDisplay(pressCount, remaining, false, false);
      lastOledUpdate = millis();
    }

    // [종료] 10초 경과 시 결과 처리
    if (elapsed >= GAME_DURATION) {
      gameState = RESULT;
      showScoreLed(pressCount);
      updateDisplay(pressCount, 0, false, true);
      sendScore(pressCount); // [BLE] 점수 전송
      playResult(pressCount);
      Serial.printf("게임 종료! 점수: %d\n", pressCount);
    }

  } else if (gameState == RESULT) {
    // [재시작] 버튼 누르면 대기 상태로
    if (btnPressed) {
      gameState = WAIT;
      pixel.setPixelColor(0, pixel.Color(0, 0, 50)); // 파란 대기 LED
      pixel.show();
      updateDisplay(0, 10, true, false);
    }
  }

  delay(10);
}