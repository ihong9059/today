// [타이핑 게임] 전역 변수
char currentLetter = 'A';
int score = 0;
bool waitingForInput = true;

// [랜덤 알파벳] 새 글자 생성 및 OLED 표시
void showNewLetter() {
  currentLetter = 'A' + random(0, 26);
  waitingForInput = true;

  oled.clear();
  oled.drawString(0, 0, "== Typing Game ==");
  
  char letterStr[2] = {currentLetter, '\0'};
  oled.drawString(55, 20, letterStr); // 가운데 큰 글자

  char scoreStr[20];
  snprintf(scoreStr, sizeof(scoreStr), "Score: %d", score);
  oled.drawString(0, 48, scoreStr);
  oled.display();

  // [BLE 전송] 현재 글자를 스마트폰에 전송
  if (deviceConnected && sensorChar) {
    char msg[32];
    snprintf(msg, sizeof(msg), "LETTER:%c|SCORE:%d", currentLetter, score);
    std::string s(msg);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [정답 처리] 맞으면 LED+버저 피드백
void onCorrect() {
  score++;

  // [파란 LED] 정답 표시
  digitalWrite(LED_BLUE, LOW);
  tone(33, 1047, 100); // C6
  delay(100);
  tone(33, 1319, 100); // E6
  delay(100);
  noTone(33);
  digitalWrite(LED_BLUE, HIGH);

  // [BLE 전송] 점수 업데이트
  if (deviceConnected && sensorChar) {
    char msg[32];
    snprintf(msg, sizeof(msg), "CORRECT|SCORE:%d", score);
    std::string s(msg);
    sensorChar->setValue(s);
    sensorChar->notify();
  }

  delay(300);
  showNewLetter();
}

// [오답 처리] 틀리면 빨간 LED+버저
void onWrong() {
  digitalWrite(LED_RED, LOW);
  tone(33, 300, 300);
  delay(300);
  noTone(33);
  digitalWrite(LED_RED, HIGH);

  // [BLE 전송] 오답 알림
  if (deviceConnected && sensorChar) {
    char msg[32];
    snprintf(msg, sizeof(msg), "WRONG|SCORE:%d", score);
    std::string s(msg);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [BLE 수신] 스마트폰에서 글자 입력 받기
void onBleReceive(String cmd) {
  cmd.trim();
  cmd.toUpperCase();

  if (cmd == "RESET") {
    // [리셋] 점수 초기화
    score = 0;
    showNewLetter();
    return;
  }

  if (!waitingForInput || cmd.length() != 1) return;

  char input = cmd.charAt(0);
  if (input == currentLetter) {
    waitingForInput = false;
    onCorrect();
  } else {
    onWrong();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  randomSeed(esp_random()); // [시드] ESP32 하드웨어 난수

  // [시작 화면] 게임 안내
  oled.clear();
  oled.drawString(0, 0, "Typing Game!");
  oled.drawString(0, 16, "Connect BLE");
  oled.drawString(0, 32, "& type letters");
  oled.display();

  delay(2000);
  showNewLetter();
}

void loop() {
  // [스위치] GPIO32 누르면 점수 리셋
  if (digitalRead(32) == LOW) {
    score = 0;
    delay(300); // 디바운스
    showNewLetter();
  }

  delay(10000);
}