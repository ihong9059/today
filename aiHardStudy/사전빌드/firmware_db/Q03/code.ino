// [반응속도] 게임 상태 열거형
enum GameState { WAIT_START, RANDOM_DELAY, SIGNAL, SHOW_RESULT };
volatile GameState gameState = WAIT_START;

// [반응속도] 메인 태스크
void reactionTask(void* param) {
  while (true) {
    // [초기화] 화면 안내 출력
    oled.clear();
    oled.drawString(0, 0, "Reaction Test");
    oled.drawString(0, 16, "Press button");
    oled.drawString(0, 24, "when LED ON!");
    oled.display();
    delay(2000);

    // [대기] 스위치 떼질 때까지 대기
    while (digitalRead(32) == LOW) delay(10);

    // [랜덤 대기] 1~5초 무작위 대기
    int waitMs = random(1000, 5001);
    unsigned long waitStart = millis();
    bool tooEarly = false;

    oled.clear();
    oled.drawString(0, 0, "Ready...");
    oled.display();

    while (millis() - waitStart < (unsigned long)waitMs) {
      if (digitalRead(32) == LOW) {
        // [실수] 너무 일찍 누름
        tooEarly = true;
        break;
      }
      delay(5);
    }

    if (tooEarly) {
      // [경고] 부저 경고음
      tone(33, 200, 400);
      oled.clear();
      oled.drawString(0, 0, "Too Early!");
      oled.drawString(0, 16, "Wait for LED...");
      oled.display();
      delay(2000);
      continue;
    }

    // [신호] LED 켜고 시작 신호음
    digitalWrite(LED_RED, LOW);
    tone(33, 1000, 100);
    unsigned long ledOnTime = millis();

    // [측정] 버튼 눌릴 때까지 대기 (최대 5초)
    bool timeout = false;
    while (digitalRead(32) == HIGH) {
      if (millis() - ledOnTime > 5000) {
        timeout = true;
        break;
      }
      delay(1);
    }

    unsigned long reactionMs = millis() - ledOnTime;
    digitalWrite(LED_RED, HIGH); // [LED 끄기]

    if (timeout) {
      // [시간초과] 안 누름
      oled.clear();
      oled.drawString(0, 0, "Timeout!");
      oled.drawString(0, 16, "Too slow...");
      oled.display();
      Serial.println("[반응속도] 시간초과");
      delay(2500);
      continue;
    }

    // [결과] 반응속도 시리얼 출력
    Serial.printf("[반응속도] %lu ms\n", reactionMs);

    // [등급] 반응속도 평가
    char grade[16];
    if (reactionMs < 200)      strcpy(grade, "Excellent! <200");
    else if (reactionMs < 300) strcpy(grade, "Good!  <300ms");
    else if (reactionMs < 500) strcpy(grade, "Normal <500ms");
    else                        strcpy(grade, "Slow... try!  ");

    // [OLED] 결과 표시
    char timeBuf[24];
    sprintf(timeBuf, "Time: %lu ms", reactionMs);
    oled.clear();
    oled.drawString(0, 0, "Result:");
    oled.drawString(0, 12, timeBuf);
    oled.drawString(0, 26, grade);
    oled.display();

    // [결과음] 성공 멜로디
    tone(33, 880, 120); delay(150);
    tone(33, 1100, 120); delay(150);
    tone(33, 1320, 200);

    delay(3000);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시드] 랜덤 시드 초기화
  randomSeed(analogRead(0));

  // [태스크] 반응속도 게임 태스크 시작
  xTaskCreate(reactionTask, "reactionTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}