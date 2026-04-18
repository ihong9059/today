// [게임센터] 상태 및 게임 ID 열거형
enum GameState { STATE_MENU, STATE_REACTION, STATE_DICE, STATE_MASH, STATE_RESULT };
enum GameId { GAME_REACTION = 0, GAME_DICE = 1, GAME_MASH = 2, GAME_COUNT = 3 };

GameState gameState = STATE_MENU;
int selectedGame = 0;

// [버튼] 디바운스 변수
bool lastBtn = HIGH;
unsigned long btnDownTime = 0;

// [반응속도] 상태 변수
unsigned long signalTime = 0;
bool waitingSignal = false;
bool signalOn = false;

// [빨리누르기] 상태 변수
int mashCount = 0;
unsigned long mashStart = 0;
bool mashActive = false;

// [OLED] 메뉴 화면 표시
void showMenu() {
  const char* names[] = {"1.Reaction", "2.Dice", "3.ButtonMash"};
  oled.clear();
  oled.drawString(0, 0, "-- GAME CENTER --");
  for (int i = 0; i < 3; i++) {
    oled.drawString(0, 16 + i * 16, i == selectedGame ? ">" : " ");
    oled.drawString(10, 16 + i * 16, names[i]);
  }
  oled.drawString(0, 56, "S:next  L:start");
  oled.display();
}

// [BLE] 게임 점수 전송
void sendScore(const char* game, int score) {
  if (deviceConnected && sensorChar) {
    String msg = String(game) + ":" + String(score);
    std::string s = msg.c_str();
    sensorChar->setValue(s);
    sensorChar->notify();
  }
  Serial.print("[점수] "); Serial.print(game);
  Serial.print(": "); Serial.println(score);
}

// [주사위] 굴리기 효과음
void playDiceSound() {
  for (int i = 0; i < 4; i++) {
    tone(2, random(300, 900), 55);
    delay(85);
  }
  tone(2, 1047, 250);
  delay(280);
  noTone(2);
}

// [반응속도] 게임 시작
void startReaction() {
  gameState = STATE_REACTION;
  waitingSignal = true;
  signalOn = false;
  signalTime = millis() + random(2000, 5000); // [랜덤] 2~5초 후 신호
  pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // [LED] 빨간 - 대기
  pixel.show();
  oled.clear();
  oled.drawString(0, 0, "REACTION TEST");
  oled.drawString(0, 20, "Wait for GREEN...");
  oled.drawString(0, 40, "Then press ASAP!");
  oled.display();
}

// [주사위] 굴리기 실행
void doDice() {
  int result = random(1, 7);
  pixel.setPixelColor(0, pixel.Color(random(100, 255), random(100, 255), 0));
  pixel.show();
  playDiceSound();
  oled.clear();
  oled.drawString(0, 0, "=== DICE ===");
  char buf[16];
  sprintf(buf, "  [ %d ]", result);
  oled.drawString(20, 24, buf);
  oled.drawString(0, 50, "Press: re-roll");
  oled.display();
  sendScore("DICE", result);
  gameState = STATE_DICE;
}

// [빨리누르기] 게임 시작
void startMash() {
  gameState = STATE_MASH;
  mashCount = 0;
  mashActive = true;
  mashStart = millis();
  pixel.setPixelColor(0, pixel.Color(255, 255, 0)); // [LED] 노란 - 게임중
  pixel.show();
  tone(2, 880, 300);
  oled.clear();
  oled.drawString(0, 0, "BUTTON MASH! 10s");
  oled.drawString(0, 20, "Count: 0");
  oled.drawString(0, 40, "Time: 10s");
  oled.display();
}

// [반응속도] 결과 표시
void showReactionResult(unsigned long ms, bool falseStart) {
  pixel.setPixelColor(0, pixel.Color(0, 0, 255)); // [LED] 파란 - 결과
  pixel.show();
  oled.clear();
  oled.drawString(0, 0, "REACTION RESULT");
  if (falseStart) {
    oled.drawString(0, 20, "FALSE START!");
    oled.drawString(0, 38, "Wait for green!");
    tone(2, 200, 600);
  } else {
    char buf[24];
    sprintf(buf, "Time: %dms", (int)ms);
    oled.drawString(0, 20, buf);
    const char* grade;
    if (ms < 200)      grade = "Grade: S GENIUS!";
    else if (ms < 300) grade = "Grade: A Fast!";
    else if (ms < 500) grade = "Grade: B Normal";
    else               grade = "Grade: C Slow...";
    oled.drawString(0, 38, grade);
    tone(2, 1320, 400);
    sendScore("REACT", (int)ms);
  }
  oled.drawString(0, 56, "Press: back menu");
  oled.display();
  waitingSignal = false;
  signalOn = false;
  gameState = STATE_RESULT;
}

// [빨리누르기] 결과 표시
void showMashResult() {
  mashActive = false;
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
  tone(2, 523, 120); delay(150);
  tone(2, 659, 120); delay(150);
  tone(2, 784, 350); delay(380);
  noTone(2);
  oled.clear();
  oled.drawString(0, 0, "MASH RESULT!");
  char buf[24];
  sprintf(buf, "Count: %d hits!", mashCount);
  oled.drawString(0, 20, buf);
  const char* grade;
  if (mashCount >= 50)      grade = "S: CRAZY FAST!!";
  else if (mashCount >= 35) grade = "A: Very Fast!";
  else if (mashCount >= 20) grade = "B: Normal";
  else                      grade = "C: Keep trying!";
  oled.drawString(0, 40, grade);
  oled.drawString(0, 56, "Press: back menu");
  oled.display();
  sendScore("MASH", mashCount);
  gameState = STATE_RESULT;
}

// [버튼] 짧은 누름 처리
void onShortPress() {
  switch (gameState) {
    case STATE_MENU:
      selectedGame = (selectedGame + 1) % GAME_COUNT; // [메뉴] 다음 게임으로
      tone(2, 440, 80);
      showMenu();
      break;

    case STATE_REACTION:
      if (signalOn) {
        unsigned long rt = millis() - signalTime; // [측정] 반응 시간
        showReactionResult(rt, false);
      } else if (waitingSignal) {
        showReactionResult(0, true); // [실수] 신호 전 누름
      }
      break;

    case STATE_DICE:
      doDice(); // [주사위] 다시 굴리기
      break;

    case STATE_MASH:
      if (mashActive) {
        mashCount++; // [횟수] 증가
        int freq = min(500 + mashCount * 12, 2000);
        tone(2, freq, 18);
      }
      break;

    case STATE_RESULT:
      gameState = STATE_MENU; // [복귀] 메뉴로
      pixel.clear(); pixel.show();
      showMenu();
      break;
  }
}

// [버튼] 긴 누름 처리 (800ms 이상)
void onLongPress() {
  if (gameState == STATE_MENU) {
    tone(2, 660, 100); delay(120); tone(2, 880, 200); // [선택음]
    if (selectedGame == GAME_REACTION) startReaction();
    else if (selectedGame == GAME_DICE) doDice();
    else if (selectedGame == GAME_MASH) startMash();
  } else {
    // [취소] 어디서든 메뉴로 탈출
    mashActive = false;
    waitingSignal = false;
    signalOn = false;
    noTone(2);
    pixel.clear(); pixel.show();
    gameState = STATE_MENU;
    showMenu();
  }
}

// [BLE] 외부 명령 수신
void onBleReceive(String cmd) {
  Serial.print("[BLE수신] "); Serial.println(cmd);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  randomSeed(analogRead(0)); // [랜덤] 노이즈로 시드

  // [환영] 시작 화면
  oled.clear();
  oled.drawString(10, 0, "GAME CENTER");
  oled.drawString(0, 20, "UTTEC Mini Ready!");
  oled.drawString(0, 40, "3 Games Inside!");
  oled.display();

  // [LED] 3색 무지개 시작 연출
  uint32_t startColors[] = {pixel.Color(255,0,0), pixel.Color(0,255,0), pixel.Color(0,0,255)};
  int startFreqs[] = {523, 659, 784};
  for (int i = 0; i < 3; i++) {
    pixel.setPixelColor(0, startColors[i]);
    pixel.show();
    tone(2, startFreqs[i], 150);
    delay(200);
  }
  noTone(2);
  pixel.clear(); pixel.show();

  delay(1500);
  showMenu();
}

void loop() {
  bool btn = digitalRead(SWITCH_PIN);
  unsigned long now = millis();

  // [버튼] 엣지 감지 및 길이 판별
  if (lastBtn == HIGH && btn == LOW) {
    btnDownTime = now; // [누름] 시작 기록
  }
  if (lastBtn == LOW && btn == HIGH) {
    unsigned long dur = now - btnDownTime;
    if (dur > 50) { // [디바운스] 50ms 필터
      if (dur >= 800) onLongPress();
      else onShortPress();
    }
  }
  lastBtn = btn;

  // [반응속도] 신호 타이밍 체크
  if (gameState == STATE_REACTION && waitingSignal && !signalOn) {
    if (now >= signalTime) {
      signalOn = true;
      waitingSignal = false;
      signalTime = now; // [기준점] 신호 켜진 실제 시각
      pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // [LED] 초록 - 눌러!
      pixel.show();
      tone(2, 1760, 120);
      oled.clear();
      oled.drawString(10, 22, ">>> PRESS NOW! <<<");
      oled.display();
    }
  }

  // [빨리누르기] 10초 타이머 및 화면 갱신
  if (gameState == STATE_MASH && mashActive) {
    unsigned long elapsed = now - mashStart;
    if (elapsed >= 10000) {
      showMashResult(); // [종료] 10초 완료
    } else {
      static unsigned long lastDraw = 0;
      if (now - lastDraw >= 300) { // [갱신] 0.3초마다 화면 업데이트
        lastDraw = now;
        oled.clear();
        oled.drawString(0, 0, "BUTTON MASH!");
        char buf[24];
        sprintf(buf, "Count: %d", mashCount);
        oled.drawString(0, 20, buf);
        sprintf(buf, "Time: %ds left", (int)((10000 - elapsed) / 1000));
        oled.drawString(0, 40, buf);
        oled.display();
      }
    }
  }

  delay(10);
}