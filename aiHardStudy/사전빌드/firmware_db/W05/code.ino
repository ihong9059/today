// [게임] 전역 변수 정의
int playerX    = 60;
int playerDir  = 1;      // 1=오른쪽, -1=왼쪽
int obstX      = 64;
int obstY      = -8;
bool obstPassed = false;
int  score     = 0;
bool gameOver  = false;
bool gameStarted = false;
int  fallInterval = 200; // 장애물 낙하 간격(ms)

bool          prevSW       = true;
unsigned long lastDebounce = 0;
unsigned long lastFall     = 0;
unsigned long lastMove     = 0;

// [게임] 상태 초기화
void resetGame() {
  playerX      = 60;
  playerDir    = 1;
  obstX        = random(4, 118);
  obstY        = -8;
  obstPassed   = false;
  score        = 0;
  gameOver     = false;
  fallInterval = 200;
}

// [OLED] 현재 게임 상태 그리기
void drawGame() {
  oled.clear();

  if (!gameStarted) {
    // [화면] 타이틀 화면
    oled.drawString(20,  8, "DODGE GAME");
    oled.drawString( 2, 22, "* drops from top");
    oled.drawString( 2, 34, "^ auto-moves L/R");
    oled.drawString( 2, 46, "SW: flip direction");
    oled.drawString(10, 56, "Press SW: Start");
    oled.display();
    return;
  }

  if (gameOver) {
    // [화면] 게임 오버 화면
    oled.drawString(25, 10, "GAME OVER!");
    char buf[20];
    sprintf(buf, "Score: %d", score);
    oled.drawString(28, 28, buf);
    oled.drawString(5,  46, "SW: Play Again");
    oled.display();
    return;
  }

  // [화면] 점수 표시
  char sc[12];
  sprintf(sc, "SC:%d", score);
  oled.drawString(0, 0, sc);

  // [화면] 플레이어 (^)
  oled.drawString(playerX, 56, "^");

  // [화면] 낙하 장애물 (*)
  if (obstY >= 0) {
    oled.drawString(obstX, obstY, "*");
  }

  oled.display();
}

// [태스크] 메인 게임 루프
void gameTask(void* pvParameters) {
  randomSeed(millis());
  gameStarted = false;

  while (true) {
    unsigned long now = millis();
    bool sw = digitalRead(32);

    // [입력] 스위치 눌림 감지 (디바운스 150ms)
    if (prevSW == HIGH && sw == LOW && now - lastDebounce > 150) {
      lastDebounce = now;

      if (!gameStarted) {
        // [시작] 게임 시작
        gameStarted = true;
        resetGame();
      } else if (gameOver) {
        // [재시작] 게임 리셋
        resetGame();
      } else {
        // [입력] 이동 방향 반전
        playerDir = -playerDir;
      }
    }
    prevSW = sw;

    if (gameStarted && !gameOver) {

      // [플레이어] 자동 좌우 이동 (50ms 간격)
      if (now - lastMove > 50) {
        lastMove = now;
        playerX += playerDir * 3;
        if (playerX <= 0)   { playerX = 0;   playerDir =  1; }
        if (playerX >= 118) { playerX = 118; playerDir = -1; }
      }

      // [장애물] 낙하 처리
      if (now - lastFall > (unsigned long)fallInterval) {
        lastFall = now;
        obstY += 4;

        // [충돌] 플레이어 라인 도달 시 판정 (1회만)
        if (obstY >= 48 && !obstPassed) {
          obstPassed = true;
          if (abs(obstX - playerX) < 12) {
            // [게임오버] 충돌 — 빨간 LED + 버저
            gameOver = true;
            digitalWrite(LED_RED, LOW);
            tone(33, 150, 700);
            delay(700);
            digitalWrite(LED_RED, HIGH);
          } else {
            // [성공] 피함 — 점수 증가
            score++;
            if (score % 5 == 0) tone(33, 1046, 80); // [효과음] 5점마다 삑
          }
        }

        // [장애물] 화면 밖으로 벗어나면 재생성
        if (obstY > 64) {
          obstX      = random(4, 118);
          obstY      = -8;
          obstPassed = false;
          // [속도] 점수 오를수록 빨라짐 (최소 70ms)
          fallInterval = max(70, 200 - score * 4);
        }
      }
    }

    drawGame();
    delay(20); // [루프] ~50fps
  }

  vTaskDelete(NULL);
}

void setup() {
  Serial.begin(115200);
  initHardware();  // LED, 버저, OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] 스위치 입력 핀
  pinMode(32, INPUT_PULLUP);

  // [태스크] 게임 루프 태스크 생성
  xTaskCreate(gameTask, "gameTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}