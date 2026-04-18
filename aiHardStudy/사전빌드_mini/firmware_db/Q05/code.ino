// [보안] 스위치 패턴 비밀번호 시스템 (짧-짧-긴)

#define SHORT_MAX       500   // 짧은 누름: 500ms 미만
#define LONG_MIN        500   // 긴 누름: 500ms 이상
#define INPUT_TIMEOUT   2500  // 입력 대기 타임아웃 (ms)
#define PATTERN_LEN     3     // 비밀번호 패턴 길이

// [비밀번호] 0=짧, 1=긴 → 짧-짧-긴
const int PASSWORD[PATTERN_LEN] = {0, 0, 1};

int  inputPattern[PATTERN_LEN]; // 입력된 패턴
int  patternIndex  = 0;         // 현재 입력 위치
bool collecting    = false;     // 수집 진행 중 여부
unsigned long lastPressTime = 0; // 마지막 버튼 입력 시각

// ── 헬퍼 함수들 ─────────────────────────────────────────

// [OLED] 두 줄 메시지 표시
void showOled(const char* line1, const char* line2) {
  oled.clear();
  oled.drawString(0, 0,  line1);
  oled.drawString(0, 16, line2);
  oled.display();
}

// [LED] 단색 표시
void setLED(uint8_t r, uint8_t g, uint8_t b) {
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();
}

// [LED] 깜빡임 피드백 (버튼 입력 시)
void blinkFeedback(int pressType) {
  // 짧은 누름=파란색, 긴 누름=노란색 깜빡
  if (pressType == 0) setLED(0, 0, 200);
  else                setLED(200, 200, 0);
  delay(150);
  setLED(0, 0, 0);
}

// [멜로디] 인증 성공 멜로디
void playSuccessMelody() {
  tone(2, 523, 120); delay(160); // C5
  tone(2, 659, 120); delay(160); // E5
  tone(2, 784, 120); delay(160); // G5
  tone(2, 1047, 300); delay(350); // C6
  noTone(2);
}

// [사이렌] 경보음 (5회 반복)
void playSiren() {
  for (int i = 0; i < 5; i++) {
    tone(2, 1200, 200); delay(220);
    tone(2, 600,  200); delay(220);
  }
  noTone(2);
}

// [BLE] 경보 메시지 전송
void sendBleAlarm(const char* msg) {
  if (deviceConnected && sensorChar) {
    std::string s = msg;
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [보안] 입력 패턴과 비밀번호 비교
bool checkPassword() {
  for (int i = 0; i < PATTERN_LEN; i++) {
    if (inputPattern[i] != PASSWORD[i]) return false;
  }
  return true;
}

// [보안] 인증 성공 처리
void onAuthSuccess() {
  showOled("ACCESS GRANTED", "인증 성공!");
  setLED(0, 255, 0);     // 초록 LED
  playSuccessMelody();
  delay(2500);
  setLED(0, 0, 0);
}

// [보안] 인증 실패 처리
void onAuthFail() {
  showOled("ACCESS DENIED", "경보 발령!");
  setLED(255, 0, 0);            // 빨간 LED
  sendBleAlarm("ALARM:WRONG_PASSWORD"); // BLE 경보 전송
  playSiren();
  delay(1000);
  setLED(0, 0, 0);
}

// [보안] 패턴 수집 초기화
void resetPattern() {
  patternIndex = 0;
  collecting   = false;
}

// ── 메인 ─────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  showOled("보안 시스템", "버튼을 누르세요");
  Serial.println("[보안] 시스템 시작 — 패턴: 짧-짧-긴");
}

void loop() {
  // [버튼] 타임아웃 감지 — 입력 중 2.5초 초과 시 초기화
  if (collecting && (millis() - lastPressTime > INPUT_TIMEOUT)) {
    showOled("시간 초과", "처음부터 입력");
    resetPattern();
    delay(1500);
    showOled("보안 시스템", "버튼을 누르세요");
  }

  // [버튼] 눌림 감지 (active LOW)
  if (digitalRead(SWITCH_PIN) == LOW) {
    unsigned long pressStart = millis();

    // [버튼] 버튼 떼질 때까지 대기
    while (digitalRead(SWITCH_PIN) == LOW) {
      delay(5);
    }

    unsigned long duration = millis() - pressStart;
    if (duration < 30) { delay(10); return; } // 디바운스: 너무 짧으면 무시

    // [패턴] 짧/긴 판별 후 저장
    int pressType = (duration < SHORT_MAX) ? 0 : 1;
    inputPattern[patternIndex++] = pressType;
    lastPressTime = millis();
    collecting    = true;

    // [피드백] LED 깜빡 + 시리얼 로그
    blinkFeedback(pressType);
    Serial.printf("[입력 %d/%d] %s (%lums)\n",
                  patternIndex, PATTERN_LEN,
                  pressType == 0 ? "짧" : "긴", duration);

    // [OLED] 입력 진행 상황 표시
    if (patternIndex < PATTERN_LEN) {
      char buf[24];
      snprintf(buf, sizeof(buf), "입력: %d / %d", patternIndex, PATTERN_LEN);
      showOled("패턴 입력 중...", buf);
    }

    // [보안] 패턴 완성 시 비밀번호 검증
    if (patternIndex >= PATTERN_LEN) {
      delay(200);
      if (checkPassword()) {
        Serial.println("[보안] 인증 성공");
        onAuthSuccess();
      } else {
        Serial.println("[보안] 인증 실패 — BLE 경보");
        onAuthFail();
      }
      resetPattern();
      showOled("보안 시스템", "버튼을 누르세요");
    }

    delay(250); // 연속 입력 방지 디바운스
  }

  delay(10);
}