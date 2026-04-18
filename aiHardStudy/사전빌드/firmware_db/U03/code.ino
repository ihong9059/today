// [기억력 게임] 전역 변수
#define MAX_LEVEL 10
#define NUM_LEDS 3

const int ledPins[NUM_LEDS] = {LED_RED, LED_YELLOW, LED_BLUE};

int  sequence[MAX_LEVEL];   // 게임 시퀀스 (0=R,1=Y,2=B)
int  currentLevel  = 1;     // 현재 레벨
int  inputIndex    = 0;     // 사용자 입력 인덱스
bool gameActive    = false; // 게임 진행 중
bool showingPat    = false; // 패턴 표시 중
bool startRequest  = false; // 시작 요청 플래그
bool inputReceived = false; // BLE 입력 도착 플래그
int  pendingInput  = -1;    // BLE 수신 값 (0~2)

// ── 유틸 ─────────────────────────────────────────────────────────────────────

// [OLED] 두 줄 화면 업데이트
void showOled(const char* l1, const char* l2) {
  oled.clear();
  oled.drawString(0, 0,  l1);
  oled.drawString(0, 16, l2);
  oled.display();
}

// [BLE] 문자열 전송
void bleSend(const char* msg) {
  if (deviceConnected && sensorChar) {
    sensorChar->setValue(std::string(msg));
    sensorChar->notify();
  }
}

// [LED] 해당 LED 단발 점멸
void flashLed(int pin, int ms) {
  digitalWrite(pin, LOW);
  delay(ms);
  digitalWrite(pin, HIGH);
  delay(200);
}

// ── 멜로디 ───────────────────────────────────────────────────────────────────

// [멜로디] 정답 성공음
void playSuccess() {
  tone(33, 523, 120); delay(170);
  tone(33, 659, 120); delay(170);
  tone(33, 784, 250); delay(350);
  noTone(33);
}

// [멜로디] 레벨업 팡파레
void playLevelUp() {
  tone(33, 523, 100); delay(130);
  tone(33, 659, 100); delay(130);
  tone(33, 784, 100); delay(130);
  tone(33, 1047, 350); delay(450);
  noTone(33);
}

// [멜로디] 실패음
void playFail() {
  tone(33, 330, 200); delay(250);
  tone(33, 220, 450); delay(550);
  noTone(33);
}

// [멜로디] 게임 시작 징글
void playStart() {
  tone(33, 440, 150); delay(200);
  tone(33, 550, 150); delay(200);
  tone(33, 660, 250); delay(350);
  noTone(33);
}

// ── 게임 로직 ─────────────────────────────────────────────────────────────────

// [시퀀스] LED 패턴 순서대로 표시
void showSequence() {
  showingPat = true;
  char buf[24];
  snprintf(buf, sizeof(buf), "LEVEL %d", currentLevel);
  showOled(buf, "Watch carefully!");
  bleSend(buf);
  delay(1000);

  for (int i = 0; i < currentLevel; i++) {
    flashLed(ledPins[sequence[i]], 500);
    delay(300);
  }

  showingPat = false;
  inputIndex  = 0;
  showOled("Your Turn!", "1=RED 2=YEL 3=BLU");
  bleSend("YOUR_TURN:1=R,2=Y,3=B");
}

// [게임] 시작 / 레벨1 초기화
void startGame() {
  currentLevel  = 1;
  inputIndex    = 0;
  inputReceived = false;
  pendingInput  = -1;
  gameActive    = true;

  randomSeed(millis());
  for (int i = 0; i < MAX_LEVEL; i++) {
    sequence[i] = random(0, NUM_LEDS); // 전체 시퀀스 미리 생성
  }

  playStart();
  delay(300);
  showSequence();
}

// [입력] 사용자 입력 처리 (메인루프에서 호출)
void processInput(int ledIdx) {
  // [피드백] 누른 LED 점멸
  flashLed(ledPins[ledIdx], 300);

  if (ledIdx != sequence[inputIndex]) {
    // ── 오답 ──
    gameActive = false;
    playFail();
    char buf[24];
    snprintf(buf, sizeof(buf), "FAIL Lv%d", currentLevel);
    showOled("WRONG!", buf);
    bleSend(buf);
    delay(2500);
    startGame(); // 자동 재시작
    return;
  }

  inputIndex++;

  if (inputIndex < currentLevel) {
    // ── 진행 중 ──
    char buf[16];
    snprintf(buf, sizeof(buf), "%d / %d OK", inputIndex, currentLevel);
    showOled("Keep going!", buf);
    bleSend(buf);
    return;
  }

  // ── 시퀀스 완료 ──
  if (currentLevel >= MAX_LEVEL) {
    // 최고 레벨 달성
    playLevelUp();
    showOled("YOU WIN!", "MAX LEVEL!");
    bleSend("WIN:MAXLEVEL");
    for (int i = 0; i < NUM_LEDS; i++) digitalWrite(ledPins[i], LOW);
    delay(3000);
    for (int i = 0; i < NUM_LEDS; i++) digitalWrite(ledPins[i], HIGH);
    gameActive = false;
    showOled("Memory Game", "Press SW or START");
  } else {
    // 레벨업
    playSuccess();
    currentLevel++;
    char buf[24];
    snprintf(buf, sizeof(buf), "CORRECT! Lv%d", currentLevel);
    showOled("CORRECT!", "Next level...");
    bleSend(buf);
    delay(1500);
    playLevelUp();
    showSequence();
  }
}

// ── BLE 수신 ──────────────────────────────────────────────────────────────────

// [BLE] 스마트폰 명령 수신 (콜백 — delay 사용 금지)
void onBleReceive(String cmd) {
  cmd.trim();

  if (cmd.equalsIgnoreCase("START")) {
    startRequest = true; // 메인루프에서 처리
    return;
  }

  if (!gameActive || showingPat) return;

  int val = cmd.toInt(); // "1","2","3" 기대
  if (val >= 1 && val <= 3) {
    pendingInput  = val - 1;
    inputReceived = true;
  }
}

// ── Arduino ───────────────────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 화면
  showOled("Memory Game", "Press SW or START");

  // [초기화] 부팅 알림음
  tone(33, 330, 100); delay(150);
  tone(33, 440, 100); delay(150);
  tone(33, 550, 200); delay(300);
  noTone(33);
}

void loop() {
  // [스위치] 물리 버튼으로 게임 시작
  if (!gameActive && !showingPat && digitalRead(32) == LOW) {
    delay(50); // 디바운싱
    if (digitalRead(32) == LOW) {
      while (digitalRead(32) == LOW); // 릴리즈 대기
      startGame();
    }
  }

  // [BLE] START 명령 처리
  if (startRequest) {
    startRequest = false;
    startGame();
  }

  // [BLE] 사용자 입력 처리
  if (inputReceived && gameActive && !showingPat) {
    inputReceived = false;
    int idx = pendingInput;
    pendingInput = -1;
    processInput(idx);
  }

  delay(10);
}