// [핀] 스위치 핀
#define SWITCH_PIN 32

// [게임] 앱 상태 열거형
enum AppState { ST_MENU, ST_REACTION, ST_MASH, ST_RESULT };

// [전역] 상태 변수
AppState appState = ST_MENU;
int menuIdx      = 0;
int lastScore    = 0;
String lastGame  = "";

// [스위치] 디바운스 변수
unsigned long lastDebounceMs = 0;
unsigned long pressStartMs   = 0;
bool isPressing              = false;

// [반응속도] 변수
bool reactionWaiting    = false;
bool reactionSignal     = false;
unsigned long reactionDelay = 0;
unsigned long reactionTimerStart = 0;

// [빨리누르기] 변수
int  mashCount    = 0;
unsigned long mashStartMs = 0;

// [LED] 점멸 태스크 핸들
TaskHandle_t ledBlinkHandle = NULL;

// [LED] 점멸 태스크 (xTaskCreate 사용)
void ledBlinkTask(void* param) {
  int pin = (int)param;
  for (int i = 0; i < 6; i++) {
    digitalWrite(pin, LOW);
    vTaskDelay(pdMS_TO_TICKS(120));
    digitalWrite(pin, HIGH);
    vTaskDelay(pdMS_TO_TICKS(120));
  }
  ledBlinkHandle = NULL;
  vTaskDelete(NULL);
}

// [BLE] 점수 직렬 전송 (base firmware BLE characteristic 활용)
void sendScore(const char* game, int score) {
  Serial.printf("[BLE_SCORE] %s=%d\n", game, score);
}

// [스위치] 눌림 감지 (1=짧게, 2=길게, 0=없음)
int readSwitch() {
  bool pressed = (digitalRead(SWITCH_PIN) == LOW);
  unsigned long now = millis();
  if (pressed && !isPressing && (now - lastDebounceMs > 50)) {
    isPressing    = true;
    pressStartMs  = now;
    lastDebounceMs = now;
  } else if (!pressed && isPressing && (now - lastDebounceMs > 50)) {
    isPressing     = false;
    lastDebounceMs = now;
    unsigned long dur = now - pressStartMs;
    if (dur >= 800) return 2;  // 긴 누름 → 선택
    if (dur >= 50)  return 1;  // 짧은 누름 → 이동
  }
  return 0;
}

// [OLED] 메뉴 화면 출력
void drawMenu() {
  oled.clear();
  oled.drawString(0,  0, "== GAME CENTER ==");
  oled.drawString(0, 14, menuIdx == 0 ? ">1.Reaction" : " 1.Reaction");
  oled.drawString(0, 24, menuIdx == 1 ? ">2.Dice"     : " 2.Dice");
  oled.drawString(0, 34, menuIdx == 2 ? ">3.Mash!"    : " 3.Mash!");
  oled.drawString(0, 50, "S:Next  L:Start");
  oled.display();
}

// [OLED] 결과 화면 출력
void drawResult() {
  oled.clear();
  oled.drawString(0,  0, "=== RESULT ===");
  oled.drawString(0, 18, lastGame.c_str());
  String s = "Score: " + String(lastScore);
  oled.drawString(0, 34, s.c_str());
  oled.drawString(0, 50, "Press -> Menu");
  oled.display();
}

// [반응속도] 게임 초기화 및 시작
void startReaction() {
  appState           = ST_REACTION;
  reactionDelay      = random(2000, 5000);
  reactionTimerStart = millis();
  reactionWaiting    = true;
  reactionSignal     = false;
  digitalWrite(LED_RED, HIGH);  // OFF
  oled.clear();
  oled.drawString(0,  0, "= REACTION =");
  oled.drawString(0, 20, "준비하세요...");
  oled.drawString(0, 36, "신호 오면 눌러!");
  oled.display();
  tone(33, 440, 200);
}

// [주사위] 즉시 실행 후 결과 화면
void startDice() {
  int dice = random(1, 7);
  oled.clear();
  oled.drawString(0,  0, "= DICE ROLL =");
  String dStr = "Result: " + String(dice);
  oled.drawString(0, 18, dStr.c_str());
  String stars = "";
  for (int i = 0; i < dice; i++) stars += "* ";
  oled.drawString(0, 34, stars.c_str());
  oled.drawString(0, 50, "Press -> Menu");
  oled.display();
  // [주사위] 눈금 수만큼 비프음
  for (int i = 0; i < dice; i++) {
    tone(33, 880, 80);
    delay(200);
  }
  int ledPin = (dice <= 2) ? LED_RED : (dice <= 4 ? LED_YELLOW : LED_BLUE);
  if (ledBlinkHandle == NULL)
    xTaskCreate(ledBlinkTask, "blink", 1024, (void*)ledPin, 1, &ledBlinkHandle);
  lastGame  = "Dice(1-6)";
  lastScore = dice;
  sendScore("Dice", dice);
  appState = ST_RESULT;
  drawResult();
}

// [빨리누르기] 게임 시작
void startMash() {
  appState    = ST_MASH;
  mashCount   = 0;
  mashStartMs = millis();
  oled.clear();
  oled.drawString(0,  0, "= MASH GAME =");
  oled.drawString(0, 20, "5초 안에 눌러!!");
  oled.drawString(0, 36, "Count: 0");
  oled.display();
  tone(33, 660, 300);
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀 및 OLED 초기화
  initBLE();        // [BLE] OTA 초기화
  randomSeed(analogRead(35));  // [랜덤] 시드 설정
  drawMenu();
}

void loop() {
  delay(10);  // [BLE] OTA 처리 여유

  int sw = readSwitch();

  // ── 메뉴 ──────────────────────────────────────────
  if (appState == ST_MENU) {
    if (sw == 1) {
      menuIdx = (menuIdx + 1) % 3;  // [메뉴] 다음 항목
      drawMenu();
      tone(33, 400, 50);
    } else if (sw == 2) {
      tone(33, 880, 150);           // [메뉴] 선택 효과음
      delay(200);
      if      (menuIdx == 0) startReaction();
      else if (menuIdx == 1) startDice();
      else                   startMash();
    }

  // ── 반응속도 ──────────────────────────────────────
  } else if (appState == ST_REACTION) {
    unsigned long now = millis();
    // [반응속도] 랜덤 딜레이 후 신호 발생
    if (reactionWaiting && !reactionSignal && (now - reactionTimerStart >= reactionDelay)) {
      reactionSignal     = true;
      reactionTimerStart = now;
      digitalWrite(LED_RED, LOW);   // LED ON
      tone(33, 1200, 100);
      oled.clear();
      oled.drawString(0,  0, "= REACTION =");
      oled.drawString(0, 26, ">>> 지금 눌러! <<<");
      oled.display();
    }
    if (sw > 0) {
      if (reactionSignal) {
        // [반응속도] 측정 완료
        int ms = (int)(millis() - reactionTimerStart);
        digitalWrite(LED_RED, HIGH);
        reactionWaiting = reactionSignal = false;
        lastGame  = "Reaction(ms)";
        lastScore = ms;
        sendScore("Reaction", ms);
        drawResult();
        appState = ST_RESULT;
        // [반응속도] 등급별 LED+멜로디
        if (ms < 300) {
          tone(33, 1500, 600);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_BLUE, 1, &ledBlinkHandle);
        } else if (ms < 600) {
          tone(33, 1000, 500);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_YELLOW, 1, &ledBlinkHandle);
        } else {
          tone(33, 440, 400);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_RED, 1, &ledBlinkHandle);
        }
      } else if (reactionWaiting) {
        // [반응속도] 조기 입력 페널티
        tone(33, 200, 500);
        oled.clear();
        oled.drawString(0, 0, "= REACTION =");
        oled.drawString(0, 22, "너무 일찍!");
        oled.drawString(0, 38, "다시 시도...");
        oled.display();
        delay(1500);
        startReaction();
      }
    }

  // ── 빨리누르기 ────────────────────────────────────
  } else if (appState == ST_MASH) {
    unsigned long now     = millis();
    unsigned long elapsed = now - mashStartMs;

    if (elapsed >= 5000) {
      // [빨리누르기] 종료 멜로디
      tone(33, 1000, 200); delay(250); tone(33, 800, 200);
      lastGame  = "Mash(5s)";
      lastScore = mashCount;
      sendScore("Mash", mashCount);
      drawResult();
      appState = ST_RESULT;
      if (ledBlinkHandle == NULL)
        xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_BLUE, 1, &ledBlinkHandle);
    } else {
      if (sw > 0) {
        mashCount++;
        // [빨리누르기] 누를수록 음정 상승
        int freq = 600 + mashCount * 8;
        if (freq > 2000) freq = 2000;
        tone(33, freq, 20);
      }
      // [빨리누르기] 200ms마다 화면 갱신
      static unsigned long lastMashDraw = 0;
      if (now - lastMashDraw > 200) {
        lastMashDraw = now;
        int remain = (int)((5000 - elapsed) / 1000) + 1;
        oled.clear();
        oled.drawString(0,  0, "= MASH GAME =");
        String tStr = "Time: " + String(remain) + "s";
        oled.drawString(0, 14, tStr.c_str());
        String cStr = "Count: " + String(mashCount);
        oled.drawString(0, 30, cStr.c_str());
        // [빨리누르기] 진행 바
        int bars = (int)(elapsed / 500);  // 0~10
        String bar = "[";
        for (int i = 0; i < 10; i++) bar += (i < bars ? "#" : "-");
        bar += "]";
        oled.drawString(0, 48, bar.c_str());
        oled.display();
      }
    }

  // ── 결과 화면 ─────────────────────────────────────
  } else if (appState == ST_RESULT) {
    if (sw > 0) {
      appState = ST_MENU;
      drawMenu();
    }
  }
}