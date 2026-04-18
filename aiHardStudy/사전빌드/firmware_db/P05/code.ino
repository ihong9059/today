// [패턴] 짧은/긴 누름 기준 시간 (ms)
#define SHORT_MAX 400
#define LONG_MIN 500
#define PATTERN_TIMEOUT 2000

// [패턴] 입력 버퍼 (0=짧, 1=긴)
int pattern[10];
int patternCount = 0;
unsigned long lastPressEnd = 0;

// [패턴] 짧-짧-긴 매칭 확인
bool checkPattern() {
  if (patternCount < 3) return false;
  int s = patternCount - 3;
  return pattern[s] == 0 && pattern[s+1] == 0 && pattern[s+2] == 1;
}

// [동작] 패턴 감지 시 특정 동작 실행
void triggerAction() {
  Serial.println("Pattern matched: SHORT-SHORT-LONG!");

  // [OLED] 성공 메시지 출력
  oled.clear();
  oled.drawString(0, 0, "== UNLOCKED! ==");
  oled.drawString(0, 16, "Short-Short-Long");
  oled.drawString(0, 32, "Pattern OK!");
  oled.display();

  // [LED] 순차 점등 효과
  digitalWrite(LED_RED,    LOW);  delay(150);
  digitalWrite(LED_YELLOW, LOW);  delay(150);
  digitalWrite(LED_BLUE,   LOW);  delay(150);
  digitalWrite(LED_RED,    HIGH); delay(150);
  digitalWrite(LED_YELLOW, HIGH); delay(150);
  digitalWrite(LED_BLUE,   HIGH); delay(150);

  // [멜로디] 성공 알림음 재생
  tone(33, 523, 150); delay(200);
  tone(33, 659, 150); delay(200);
  tone(33, 784, 150); delay(200);
  tone(33, 1047, 400); delay(500);
  noTone(33);

  // [초기화] 패턴 버퍼 리셋 후 대기 화면
  patternCount = 0;
  delay(1000);
  oled.clear();
  oled.drawString(0, 0, "Pattern Input");
  oled.drawString(0, 16, "Waiting...");
  oled.display();
}

// [스위치] 패턴 입력 감지 태스크
void switchTask(void* param) {
  bool lastState = HIGH;
  unsigned long pressStart = 0;

  // [OLED] 초기 안내 화면
  oled.clear();
  oled.drawString(0, 0, "Pattern Input");
  oled.drawString(0, 16, "S - S - L");
  oled.drawString(0, 32, "Waiting...");
  oled.display();

  while (true) {
    unsigned long now = millis();
    bool cur = (bool)digitalRead(32);

    // [타임아웃] 입력 없으면 패턴 리셋
    if (patternCount > 0 && (now - lastPressEnd) > PATTERN_TIMEOUT) {
      Serial.println("Pattern timeout - reset");
      patternCount = 0;
      oled.clear();
      oled.drawString(0, 0, "Timeout - Reset");
      oled.drawString(0, 16, "Waiting...");
      oled.display();
    }

    // [스위치] 눌림 시작 감지 (HIGH -> LOW)
    if (lastState == HIGH && cur == LOW) {
      pressStart = now;
    }

    // [스위치] 뗌 감지 (LOW -> HIGH)
    if (lastState == LOW && cur == HIGH) {
      unsigned long dur = now - pressStart;

      // [디바운스] 50ms 미만 노이즈 무시
      if (dur >= 50) {
        if (dur < SHORT_MAX) {
          pattern[patternCount++] = 0; // [패턴] 짧은 누름 저장
          Serial.print("S ");
        } else {
          pattern[patternCount++] = 1; // [패턴] 긴 누름 저장
          Serial.print("L ");
        }
        Serial.println();
        lastPressEnd = now;

        // [OLED] 현재까지 입력된 패턴 표시
        oled.clear();
        oled.drawString(0, 0, "Pattern:");
        String line = "";
        for (int i = 0; i < patternCount; i++) {
          line += (pattern[i] == 0) ? "S " : "L ";
        }
        oled.drawString(0, 16, line.c_str());
        oled.drawString(0, 48, "Goal: S S L");
        oled.display();

        // [패턴] 짧-짧-긴 성공 여부 확인
        if (checkPattern()) triggerAction();

        // [버퍼] 최대 초과 시 초기화
        if (patternCount >= 10) patternCount = 0;
      }
    }

    lastState = cur;
    delay(10);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [스위치] 입력 핀 설정
  pinMode(32, INPUT_PULLUP);

  // [태스크] 스위치 패턴 감지 태스크 시작
  xTaskCreate(switchTask, "switchTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}