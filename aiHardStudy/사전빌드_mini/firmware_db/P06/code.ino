// [게임] 온도 맞추기 게임 변수
int targetTemp = 0;       // 실제 온도 (정수)
bool gameActive = false;  // 게임 진행 중 여부
int tryCnt = 0;           // 시도 횟수

// [멜로디] 정답 멜로디 음계
void playWinMelody() {
  int notes[] = {262, 330, 392, 523, 659, 784};
  int durs[]  = {150, 150, 150, 150, 150, 300};
  for (int i = 0; i < 6; i++) {
    tone(2, notes[i], durs[i]);
    delay(durs[i] + 30);
  }
  noTone(2);
}

// [OLED] 두 줄 메시지 표시
void showOled(const char* line1, const char* line2) {
  oled.clear();
  oled.drawString(0, 0, line1);
  oled.drawString(0, 16, line2);
  oled.display();
}

// [게임] 새 게임 시작 — AHT20로 목표 온도 설정
void startGame() {
  float temp, humi;
  if (aht20_read(temp, humi)) {
    targetTemp = (int)round(temp);
  } else {
    targetTemp = 25; // 읽기 실패 시 기본값
  }
  tryCnt = 0;
  gameActive = true;

  // [OLED] 게임 시작 화면
  showOled("온도 맞추기!", "BLE로 숫자 입력");
  delay(1500);
  showOled("몇 도 일까요?", "숫자를 보내세요");

  // [BLE] 게임 시작 알림
  if (deviceConnected && sensorChar) {
    std::string msg = "게임시작! 온도를 맞춰보세요 (BLE로 숫자 전송)";
    sensorChar->setValue(msg);
    sensorChar->notify();
  }
}

// [BLE] 스마트폰에서 숫자 수신 → 힌트 제공
void onBleReceive(String cmd) {
  cmd.trim();

  // [명령] "start" 명령으로 게임 재시작
  if (cmd.equalsIgnoreCase("start")) {
    startGame();
    return;
  }

  if (!gameActive) {
    if (deviceConnected && sensorChar) {
      std::string msg = "\"start\" 를 보내서 게임을 시작하세요!";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  // [입력] 숫자 파싱
  int guess = cmd.toInt();
  if (guess == 0 && cmd != "0") {
    if (deviceConnected && sensorChar) {
      std::string msg = "숫자를 입력해주세요!";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  tryCnt++;
  char tryBuf[16];
  snprintf(tryBuf, sizeof(tryBuf), "%d번째 시도", tryCnt);

  if (guess == targetTemp) {
    // [정답] 맞췄을 때
    char buf[32];
    snprintf(buf, sizeof(buf), "정답! %d도 (%d번)", targetTemp, tryCnt);

    showOled("정답!", buf);

    if (deviceConnected && sensorChar) {
      sensorChar->setValue(std::string(buf));
      sensorChar->notify();
    }

    // [LED] 정답 축하 — 무지개 깜빡임
    for (int i = 0; i < 3; i++) {
      pixel.setPixelColor(0, pixel.Color(255, 0, 0));   pixel.show(); delay(150);
      pixel.setPixelColor(0, pixel.Color(0, 255, 0));   pixel.show(); delay(150);
      pixel.setPixelColor(0, pixel.Color(0, 0, 255));   pixel.show(); delay(150);
    }
    pixel.clear(); pixel.show();

    playWinMelody();
    gameActive = false;

    delay(2000);
    showOled("\"start\" 전송시", "새 게임 시작!");

  } else if (guess > targetTemp) {
    // [힌트] 너무 높음
    char hint[32];
    snprintf(hint, sizeof(hint), "%d도? 낮춰봐!", guess);
    showOled(tryBuf, hint);

    if (deviceConnected && sensorChar) {
      sensorChar->setValue(std::string(hint));
      sensorChar->notify();
    }
    // [LED] 높음 → 빨간색
    pixel.setPixelColor(0, pixel.Color(255, 50, 0));
    pixel.show();
    tone(2, 200, 200);
    delay(300);
    pixel.clear(); pixel.show();

  } else {
    // [힌트] 너무 낮음
    char hint[32];
    snprintf(hint, sizeof(hint), "%d도? 높여봐!", guess);
    showOled(tryBuf, hint);

    if (deviceConnected && sensorChar) {
      sensorChar->setValue(std::string(hint));
      sensorChar->notify();
    }
    // [LED] 낮음 → 파란색
    pixel.setPixelColor(0, pixel.Color(0, 50, 255));
    pixel.show();
    tone(2, 500, 200);
    delay(300);
    pixel.clear(); pixel.show();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 대기 화면
  showOled("BLE 연결 후", "\"start\" 전송!");
}

void loop() {
  // [연결] BLE 연결 시 게임 안내
  static bool lastConnected = false;
  if (deviceConnected && !lastConnected) {
    showOled("연결됨!", "\"start\" 전송!");
    if (sensorChar) {
      std::string msg = "연결됨! \"start\" 를 보내서 게임을 시작하세요!";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
  }
  lastConnected = deviceConnected;

  delay(500);
}