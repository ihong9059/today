// [게임] 가위바위보 선택지 및 스코어
const char* choices[] = {"가위", "바위", "보"};
int playerChoice = 0;
int wins = 0, losses = 0, draws = 0;

// [판정] 승=1, 무=0, 패=-1
int judge(int p, int c) {
  if (p == c) return 0;
  if ((p == 1 && c == 0) || (p == 2 && c == 1) || (p == 0 && c == 2)) return 1;
  return -1;
}

// [화면] OLED 4줄 출력
void showOLED(const char* l0, const char* l1, const char* l2, const char* l3) {
  oled.clear();
  oled.drawString(0, 0,  l0);
  oled.drawString(0, 16, l1);
  oled.drawString(0, 32, l2);
  oled.drawString(0, 48, l3);
  oled.display();
}

// [태스크] 게임 루프 (버튼 폴링 + 게임 진행)
void gameTask(void* param) {
  bool lastBtn = HIGH;
  unsigned long pressStart = 0;
  bool pressing = false;
  char scoreBuf[24];

  // [초기] 선택 안내 화면
  showOLED("== 가위바위보 ==", choices[playerChoice], "짧게: 선택변경", "길게: 확정");

  while (true) {
    bool btn = digitalRead(32);

    // [입력] 눌림 시작 시각 기록
    if (btn == LOW && lastBtn == HIGH) {
      pressStart = millis();
      pressing = true;
    }

    // [입력] 버튼 떼는 순간 처리
    if (btn == HIGH && lastBtn == LOW && pressing) {
      unsigned long dur = millis() - pressStart;
      pressing = false;

      if (dur < 500) {
        // [선택] 짧게 누름 → 다음 선택지
        playerChoice = (playerChoice + 1) % 3;
        showOLED("== 가위바위보 ==", choices[playerChoice], "짧게: 선택변경", "길게: 확정");

      } else {
        // [게임] 길게 누름 → 컴퓨터 랜덤 선택 + 판정
        int comp   = random(3);
        int result = judge(playerChoice, comp);

        char resultLine[24];
        sprintf(resultLine, "나:%s vs 컴:%s", choices[playerChoice], choices[comp]);

        if (result == 1) {
          wins++;
          sprintf(scoreBuf, "W:%d L:%d D:%d", wins, losses, draws);
          showOLED(resultLine, ">> 승리!", scoreBuf, "");
          // [효과] 파란 LED + 상승 멜로디
          digitalWrite(LED_BLUE, LOW);
          tone(33, 800,  100); delay(120);
          tone(33, 1000, 100); delay(120);
          tone(33, 1300, 200); delay(220);
          noTone(33);

        } else if (result == -1) {
          losses++;
          sprintf(scoreBuf, "W:%d L:%d D:%d", wins, losses, draws);
          showOLED(resultLine, ">> 패배...", scoreBuf, "");
          // [효과] 빨간 LED + 하강 멜로디
          digitalWrite(LED_RED, LOW);
          tone(33, 600, 200); delay(220);
          tone(33, 400, 400); delay(420);
          noTone(33);

        } else {
          draws++;
          sprintf(scoreBuf, "W:%d L:%d D:%d", wins, losses, draws);
          showOLED(resultLine, ">> 무승부", scoreBuf, "");
          // [효과] 노란 LED + 단음
          digitalWrite(LED_YELLOW, LOW);
          tone(33, 700, 300); delay(320);
          noTone(33);
        }

        delay(2500);

        // [초기화] LED 끄기 + 선택 리셋
        digitalWrite(LED_RED,    HIGH);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE,   HIGH);
        playerChoice = 0;
        showOLED("== 가위바위보 ==", choices[playerChoice], "짧게: 선택변경", "길게: 확정");
      }
    }

    lastBtn = btn;
    vTaskDelay(10 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [태스크] 게임 태스크 시작
  xTaskCreate(gameTask, "rps", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}