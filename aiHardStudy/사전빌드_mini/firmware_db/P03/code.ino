// [게임] 기억력 색상 게임 상수
#define MAX_LEVEL 10
#define NUM_COLORS 4

// [게임] 색상별 RGB 및 주파수
const uint8_t colorR[NUM_COLORS] = {255, 0,   0,   255};
const uint8_t colorG[NUM_COLORS] = {0,   255, 0,   200};
const uint8_t colorB[NUM_COLORS] = {0,   0,   255, 0  };
const int     colorFreq[NUM_COLORS] = {440, 523, 659, 784};
const char*   colorName[NUM_COLORS] = {"RED", "GRN", "BLU", "YLW"};

// [게임] 상태 열거형
enum GameState { IDLE, SHOWING, WAITING };
volatile GameState gameState = IDLE;

// [게임] 패턴 및 입력 버퍼
int pattern[MAX_LEVEL];
int currentLevel = 1;
int inputIndex   = 0;

// [BLE] 플래그 (콜백 → 루프 전달)
volatile bool startRequested = false;
volatile int  bleInput = -1;

// [OLED] 두 줄 표시
void showOled(const char* l1, const char* l2) {
  oled.clear();
  oled.drawString(0, 0,  l1);
  oled.drawString(0, 16, l2);
  oled.display();
}

// [BLE] 문자열 전송
void bleSend(String msg) {
  if (deviceConnected && sensorChar) {
    std::string s = msg.c_str();
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [LED+사운드] 색상 깜빡임 피드백
void flashColor(int ci) {
  pixel.setPixelColor(0, pixel.Color(colorR[ci], colorG[ci], colorB[ci]));
  pixel.show();
  tone(2, colorFreq[ci], 400);
  delay(500);
  pixel.clear();
  pixel.show();
  noTone(2);
  delay(300);
}

// [사운드] 레벨업 성공음
void playSuccess() {
  for (int i = 0; i < NUM_COLORS; i++) {
    tone(2, colorFreq[i], 100);
    delay(150);
  }
  noTone(2);
}

// [사운드] 실패음
void playFail() {
  tone(2, 180, 900);
  delay(1000);
  noTone(2);
}

// [게임] 새 패턴 생성
void generatePattern() {
  for (int i = 0; i < MAX_LEVEL; i++) {
    pattern[i] = random(0, NUM_COLORS);
  }
}

// [게임] LED로 패턴 시연
void doShowPattern() {
  char title[20];
  snprintf(title, sizeof(title), "Level %d", currentLevel);
  showOled(title, "Watch LED!");
  bleSend("SHOW:Level " + String(currentLevel));
  delay(1000);

  for (int i = 0; i < currentLevel; i++) {
    char sub[20];
    snprintf(sub, sizeof(sub), "%d/%d: %s", i + 1, currentLevel, colorName[pattern[i]]);
    showOled(title, sub);
    flashColor(pattern[i]);
  }

  // [게임] 입력 대기 상태 전환
  bleInput   = -1;
  inputIndex = 0;
  showOled(title, "Input R/G/B/Y");
  bleSend("INPUT:0/" + String(currentLevel) + " Send R G B Y");
  gameState = WAITING;
}

// [게임] 사용자 입력 처리
void processInput(int ci) {
  char title[20];
  snprintf(title, sizeof(title), "Level %d", currentLevel);

  // [LED] 입력 색상 즉시 피드백
  flashColor(ci);

  if (ci != pattern[inputIndex]) {
    // [게임] 오답 처리
    playFail();
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show();
    delay(800);
    pixel.clear();
    pixel.show();

    char failBuf[20];
    snprintf(failBuf, sizeof(failBuf), "Fail Lv%d", currentLevel);
    showOled(failBuf, "Game Over!");
    bleSend("FAIL:Wrong at step " + String(inputIndex + 1) + " Level " + String(currentLevel));
    delay(2000);

    currentLevel = 1;
    generatePattern();
    gameState = IDLE;
    showOled("Memory Game", "Send START");
    bleSend("RESTART:Send START to play again");
    return;
  }

  inputIndex++;
  bleSend("OK:" + String(inputIndex) + "/" + String(currentLevel));

  if (inputIndex >= currentLevel) {
    // [게임] 레벨 클리어
    playSuccess();
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();
    delay(800);
    pixel.clear();
    pixel.show();

    currentLevel++;

    if (currentLevel > MAX_LEVEL) {
      // [게임] 전체 클리어
      showOled("YOU WIN!", "All Clear!");
      bleSend("WIN:Congratulations! All levels cleared!");
      for (int i = 0; i < 10; i++) {
        pixel.setPixelColor(0, pixel.Color(random(256), random(256), random(256)));
        pixel.show();
        tone(2, 400 + i * 60, 120);
        delay(180);
      }
      noTone(2);
      pixel.clear();
      pixel.show();
      currentLevel = 1;
      generatePattern();
      gameState = IDLE;
      showOled("Memory Game", "Send START");
    } else {
      // [게임] 다음 레벨 예고
      char nextBuf[20];
      snprintf(nextBuf, sizeof(nextBuf), "Level %d!", currentLevel);
      showOled("Level Up!", nextBuf);
      bleSend("LEVELUP:Level " + String(currentLevel));
      delay(1500);
      gameState = SHOWING;
    }
  }
}

// [BLE] 수신 콜백 — R/G/B/Y 또는 START
void onBleReceive(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if      (cmd == "START" || cmd == "S") startRequested = true;
  else if (cmd == "R") bleInput = 0;
  else if (cmd == "G") bleInput = 1;
  else if (cmd == "B") bleInput = 2;
  else if (cmd == "Y") bleInput = 3;
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  randomSeed(esp_random());
  generatePattern();

  showOled("Memory Game", "Send START");
  bleSend("READY:Memory Game! Send START or press button");
}

void loop() {
  // [스위치] 버튼으로도 시작 가능
  if (digitalRead(SWITCH_PIN) == LOW && gameState == IDLE) {
    delay(50);
    if (digitalRead(SWITCH_PIN) == LOW) {
      startRequested = true;
      while (digitalRead(SWITCH_PIN) == LOW) delay(10);
    }
  }

  // [게임] 시작 요청 처리
  if (startRequested && gameState == IDLE) {
    startRequested = false;
    currentLevel = 1;
    generatePattern();
    gameState = SHOWING;
  }

  // [게임] 패턴 시연
  if (gameState == SHOWING) {
    doShowPattern(); // 내부에서 gameState = WAITING 설정
  }

  // [게임] 사용자 입력 처리
  if (gameState == WAITING && bleInput >= 0) {
    int ci = bleInput;
    bleInput = -1;
    processInput(ci);
  }

  delay(50);
}