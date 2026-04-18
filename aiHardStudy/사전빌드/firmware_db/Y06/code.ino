// [보안] 패턴 인식 임계값 (ms)
#define SHORT_MAX   400
#define LONG_MIN    700
#define GAP_TIMEOUT 1500
#define MAX_PATTERN 5

// [보안] 패턴 버퍼 및 버튼 상태
int  pressPattern[MAX_PATTERN];
int  patternCount  = 0;
bool btnWasDown    = false;
unsigned long pressStart  = 0;
unsigned long lastRelease = 0;

// [상태] 사이렌 실행 플래그
volatile bool sirenActive = false;

// [경보] 사이렌 + RED LED 태스크 (BLE 경보 로그 포함)
void sirenTask(void* param) {
  Serial.println("[BLE_ALARM] 잘못된 패턴 감지 - 보안 경보 발생!");
  unsigned long start = millis();
  while (millis() - start < 6000) {      // 6초 경보
    for (int f = 800; f <= 1600; f += 40) {
      tone(33, f, 20);
      digitalWrite(LED_RED, LOW);        // 경보등 ON
      delay(20);
    }
    for (int f = 1600; f >= 800; f -= 40) {
      tone(33, f, 20);
      digitalWrite(LED_RED, HIGH);       // 경보등 깜빡
      delay(20);
    }
  }
  noTone(33);
  digitalWrite(LED_RED, HIGH);           // 경보등 OFF
  sirenActive = false;
  // [OLED] 대기 화면 복귀
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
  vTaskDelete(NULL);
}

// [성공] 멜로디 + BLUE LED 태스크
void successTask(void* param) {
  int notes[] = {523, 659, 784, 1047, 784, 1047};
  int durs[]  = {150, 150, 150, 300,  150, 400};
  for (int i = 0; i < 6; i++) {
    digitalWrite(LED_BLUE, LOW);         // 성공 LED ON
    tone(33, notes[i], durs[i]);
    delay(durs[i] + 30);
    digitalWrite(LED_BLUE, HIGH);        // 성공 LED 깜빡
    delay(30);
  }
  noTone(33);
  delay(1500);
  // [OLED] 대기 화면 복귀
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
  vTaskDelete(NULL);
}

// [패턴] 정답 판정 및 결과 처리
void evaluatePattern() {
  // 정답: 짧(0) 짧(0) 긴(1)
  bool ok = (patternCount == 3) &&
            (pressPattern[0] == 0)  &&
            (pressPattern[1] == 0)  &&
            (pressPattern[2] == 1);

  oled.clear();
  if (ok) {
    oled.drawString(0, 0,  "ACCESS GRANTED");
    oled.drawString(0, 16, ":) 잠금 해제!");
    oled.display();
    xTaskCreate(successTask, "success", 2048, NULL, 1, NULL);
  } else {
    oled.drawString(0, 0,  "ACCESS DENIED");
    oled.drawString(0, 16, ":( 경보 발생!");
    oled.display();
    if (!sirenActive) {
      sirenActive = true;
      xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
    }
  }
  patternCount = 0;
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화 (LED, 부저, OLED)
  initBLE();        // BLE OTA 초기화

  // [OLED] 초기 안내 화면
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
}

void loop() {
  // [사이렌] 경보 중이면 입력 무시
  if (sirenActive) {
    delay(10);
    return;
  }

  bool btnDown = (digitalRead(32) == LOW);
  unsigned long now = millis();

  // [버튼] 누름 시작 감지
  if (btnDown && !btnWasDown) {
    pressStart = now;
    btnWasDown = true;
  }

  // [버튼] 떼짐 - 짧/긴 판별
  if (!btnDown && btnWasDown) {
    unsigned long dur = now - pressStart;
    btnWasDown  = false;
    lastRelease = now;

    if (patternCount < MAX_PATTERN) {
      if (dur < SHORT_MAX) {
        pressPattern[patternCount++] = 0;  // 짧은 누름
      } else if (dur >= LONG_MIN) {
        pressPattern[patternCount++] = 1;  // 긴 누름
      }
      // [OLED] 입력 진행 상태 표시
      oled.clear();
      oled.drawString(0, 0, "입력 중...");
      String s = "";
      for (int i = 0; i < patternCount; i++) {
        s += (pressPattern[i] == 0) ? ".  " : "-  ";
      }
      oled.drawString(0, 16, s.c_str());
      oled.display();
    }
  }

  // [패턴] 입력 타임아웃 → 최종 판정
  if (patternCount > 0 && !btnWasDown &&
      (now - lastRelease > GAP_TIMEOUT)) {
    evaluatePattern();
  }

  delay(10);
}