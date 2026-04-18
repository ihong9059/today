// [모드] 현재 모드 변수 (0=없음, 1~3=모드)
int currentMode = 0;

// [OLED] 모드명 표시 함수
void displayMode(int mode) {
  oled.clear();
  oled.drawString(0, 0, "=== SMART MODE ===");
  if (mode == 1) {
    oled.drawString(0, 16, "MODE 1: NORMAL");
    oled.drawString(0, 32, "LED: RED ON");
  } else if (mode == 2) {
    oled.drawString(0, 16, "MODE 2: ALERT");
    oled.drawString(0, 32, "LED: YELLOW ON");
  } else if (mode == 3) {
    oled.drawString(0, 16, "MODE 3: ACTIVE");
    oled.drawString(0, 32, "LED: BLUE ON");
  } else {
    oled.drawString(0, 16, "MODE: STANDBY");
    oled.drawString(0, 32, "Waiting...");
  }
  oled.display();
}

// [LED] 모드에 따라 LED 제어
void applyModeLED(int mode) {
  // 모든 LED 끄기
  digitalWrite(LED_RED,    HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE,   HIGH);

  if (mode == 1) {
    digitalWrite(LED_RED,    LOW);  // MODE1: 빨간 LED
  } else if (mode == 2) {
    digitalWrite(LED_YELLOW, LOW);  // MODE2: 노란 LED
  } else if (mode == 3) {
    digitalWrite(LED_BLUE,   LOW);  // MODE3: 파란 LED
  }
}

// [BLE] 스마트폰으로 현재 모드 전송
void sendModeResponse(int mode) {
  if (!deviceConnected || !sensorChar) return;

  String resp;
  if (mode == 1)      resp = "CURRENT_MODE:1 (NORMAL)";
  else if (mode == 2) resp = "CURRENT_MODE:2 (ALERT)";
  else if (mode == 3) resp = "CURRENT_MODE:3 (ACTIVE)";
  else                resp = "CURRENT_MODE:0 (STANDBY)";

  std::string s = resp.c_str();
  sensorChar->setValue(s);
  sensorChar->notify();

  Serial.println("[BLE 응답] " + resp);
}

// [BLE 수신] 스마트폰에서 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();
  Serial.println("[BLE 수신] " + cmd);

  int newMode = -1;

  if (cmd == "MODE:1")      newMode = 1;
  else if (cmd == "MODE:2") newMode = 2;
  else if (cmd == "MODE:3") newMode = 3;

  if (newMode >= 1 && newMode <= 3) {
    currentMode = newMode;
    Serial.printf("[모드 전환] MODE %d\n", currentMode);

    applyModeLED(currentMode);   // LED 업데이트
    displayMode(currentMode);    // OLED 업데이트
    sendModeResponse(currentMode); // BLE 응답 전송

    // [부저] 모드 전환 알림음
    tone(33, 1000 + (currentMode * 200), 150);
  } else {
    // [BLE] 알 수 없는 명령 응답
    if (deviceConnected && sensorChar) {
      std::string err = "ERROR: Unknown command";
      sensorChar->setValue(err);
      sensorChar->notify();
    }
    Serial.println("[경고] 알 수 없는 명령: " + cmd);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 초기화 (LED, 부저, OLED)
  initBLE();       // BLE OTA 초기화

  // [초기화] 대기 모드로 시작
  displayMode(0);
  Serial.println("[시작] BLE 모드 전환 펌웨어 준비 완료");
  Serial.println("[안내] MODE:1 / MODE:2 / MODE:3 명령을 전송하세요");
}

void loop() {
  delay(10000);  // BLE 이벤트는 콜백으로 처리
}