// [게임] 온도 맞추기 게임 전역 변수
float actualTemp = 0;
bool gameActive = false;
bool gameWon = false;
int attemptCount = 0;

// [멜로디] 정답 축하 멜로디 음표
int melodyNotes[] = {523, 659, 784, 1047, 784, 1047, 1319};
int melodyDurations[] = {200, 200, 200, 400, 200, 200, 500};
int melodyLength = 7;

// [멜로디] 정답 축하 멜로디 재생
void playVictoryMelody() {
  for (int i = 0; i < melodyLength; i++) {
    tone(33, melodyNotes[i], melodyDurations[i]);
    delay(melodyDurations[i] + 50);
    noTone(33);
  }
}

// [힌트] 틀렸을 때 짧은 버저음
void playWrongBeep() {
  tone(33, 200, 150);
  delay(200);
  noTone(33);
}

// [OLED] 게임 상태 화면 표시
void updateOled(String line1, String line2, String line3) {
  oled.clear();
  oled.drawString(0, 0, line1.c_str());
  oled.drawString(0, 20, line2.c_str());
  oled.drawString(0, 40, line3.c_str());
  oled.display();
}

// [게임] 게임 초기화 및 온도 측정
void startGame() {
  float h;
  bool ok = aht20_read(actualTemp, h);
  if (!ok) {
    updateOled("센서 오류!", "재시도 중...", "");
    delay(2000);
    ok = aht20_read(actualTemp, h);
  }
  // [온도] 소수점 한 자리로 반올림
  actualTemp = round(actualTemp * 10.0) / 10.0;
  attemptCount = 0;
  gameWon = false;
  gameActive = true;

  // [OLED] 게임 시작 화면
  updateOled("온도 맞추기!", "몇 도일까?", "BLE로 입력하세요");

  // [BLE] 게임 시작 안내 전송
  if (deviceConnected && sensorChar) {
    std::string msg = "=== 온도 맞추기 게임 ===\n숫자(예: 25.5)를 입력하세요!";
    sensorChar->setValue(msg);
    sensorChar->notify();
  }
  Serial.println("[게임] 시작. 정답: " + String(actualTemp));
}

// [BLE] 스마트폰에서 숫자 입력 수신
void onBleReceive(String cmd) {
  cmd.trim();

  // [명령] "start" 명령으로 게임 재시작
  if (cmd.equalsIgnoreCase("start") || cmd.equalsIgnoreCase("시작")) {
    startGame();
    return;
  }

  // [게임] 게임이 활성 상태가 아니면 안내
  if (!gameActive || gameWon) {
    if (deviceConnected && sensorChar) {
      std::string msg = "\"start\"를 입력하면 게임을 시작합니다!";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  // [입력] 숫자 파싱
  float guess = cmd.toFloat();
  if (guess == 0 && cmd != "0") {
    if (deviceConnected && sensorChar) {
      std::string msg = "숫자를 입력해주세요 (예: 24.5)";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  attemptCount++;
  float diff = guess - actualTemp;
  String result = "";
  String oledLine2 = "";
  String oledLine3 = "시도: " + String(attemptCount) + "회";

  if (abs(diff) < 0.5) {
    // [정답] 0.5도 이내면 정답 처리
    gameWon = true;
    gameActive = false;
    result = "정답! " + String(actualTemp) + "°C\n" + String(attemptCount) + "번 만에 맞췄어요!";
    oledLine2 = "정답: " + String(actualTemp) + "C";

    // [OLED] 축하 화면
    updateOled("정답입니다!", oledLine2, oledLine3);

    // [BLE] 정답 전송
    if (deviceConnected && sensorChar) {
      sensorChar->setValue(result.c_str());
      sensorChar->notify();
    }

    // [LED] 정답 LED 점멸
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_BLUE, LOW);
      delay(200);
      digitalWrite(LED_BLUE, HIGH);
      delay(200);
    }

    // [멜로디] 축하 멜로디 재생
    playVictoryMelody();

    // [OLED] 재시작 안내
    updateOled("정답!", oledLine2, "\"start\" 재시작");

  } else if (diff > 0) {
    // [힌트] 추측값이 실제보다 높음
    result = "너무 높아요! ↓ (" + String(guess) + "°C)";
    oledLine2 = String(guess, 1) + "C → 낮춰요!";
    updateOled("더 낮게!", oledLine2, oledLine3);
    digitalWrite(LED_RED, LOW);
    delay(300);
    digitalWrite(LED_RED, HIGH);
    playWrongBeep();

    if (deviceConnected && sensorChar) {
      sensorChar->setValue(result.c_str());
      sensorChar->notify();
    }

  } else {
    // [힌트] 추측값이 실제보다 낮음
    result = "너무 낮아요! ↑ (" + String(guess) + "°C)";
    oledLine2 = String(guess, 1) + "C → 높여요!";
    updateOled("더 높게!", oledLine2, oledLine3);
    digitalWrite(LED_YELLOW, LOW);
    delay(300);
    digitalWrite(LED_YELLOW, HIGH);
    playWrongBeep();

    if (deviceConnected && sensorChar) {
      sensorChar->setValue(result.c_str());
      sensorChar->notify();
    }
  }

  Serial.println("[게임] 입력: " + String(guess) + " 정답: " + String(actualTemp) + " → " + result);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [게임] 초기 OLED 안내
  updateOled("온도 맞추기", "BLE 연결 후", "\"start\" 입력!");

  Serial.println("[시스템] 온도 맞추기 게임 준비 완료");
}

void loop() {
  // [연결] BLE 연결 감지 시 게임 안내
  static bool wasConnected = false;
  if (deviceConnected && !wasConnected) {
    delay(500);
    if (sensorChar) {
      std::string msg = "연결됨! \"start\"를 입력해 게임을 시작하세요!";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    updateOled("BLE 연결됨!", "몇 도일까?", "\"start\" 시작");
  }
  wasConnected = deviceConnected;

  delay(10000);
}