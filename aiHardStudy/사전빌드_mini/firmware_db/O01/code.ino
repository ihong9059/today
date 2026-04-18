// [현관벨] 전역 상태
bool lastSwitch = HIGH;
bool bellActive = false;

// [멜로디] 딩동 음계
void playDingDong() {
  tone(2, 880, 200);  // 딩
  delay(250);
  tone(2, 660, 400);  // 동
  delay(450);
  noTone(2);
}

// [OLED] Visitor 표시
void showVisitor() {
  oled.clear();
  oled.drawString(20, 10, "** VISITOR! **");
  oled.drawString(28, 30, "Door Bell");
  oled.display();
}

// [OLED] 대기 화면
void showIdle() {
  oled.clear();
  oled.drawString(18, 20, "Door Bell Ready");
  oled.display();
}

// [벨 작업] 멜로디+OLED+BLE 처리 태스크
void bellTask(void* param) {
  // [OLED] Visitor 표시
  showVisitor();

  // [LED] 노란색 점멸
  for (int i = 0; i < 3; i++) {
    pixel.setPixelColor(0, pixel.Color(255, 200, 0));
    pixel.show();
    delay(200);
    pixel.clear();
    pixel.show();
    delay(200);
  }

  // [멜로디] 딩동 2회 재생
  playDingDong();
  delay(300);
  playDingDong();

  // [BLE] 방문자 알림 전송
  if (deviceConnected && sensorChar) {
    std::string msg = "VISITOR:BELL";
    sensorChar->setValue(msg);
    sensorChar->notify();
  }

  // [LED] 초록 유지 잠시
  pixel.setPixelColor(0, pixel.Color(0, 180, 0));
  pixel.show();
  delay(2000);

  // [복귀] 대기 상태로
  pixel.clear();
  pixel.show();
  showIdle();

  bellActive = false;
  vTaskDelete(NULL);
}

// [BLE] 수신 명령 처리
void onBleReceive(String cmd) {
  if (cmd == "RING") {
    // [BLE] 원격 벨 울리기
    if (!bellActive) {
      bellActive = true;
      xTaskCreate(bellTask, "bell", 4096, NULL, 1, NULL);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 화면 표시
  showIdle();

  // [LED] 파란색 준비 표시
  pixel.setPixelColor(0, pixel.Color(0, 0, 80));
  pixel.show();
  delay(500);
  pixel.clear();
  pixel.show();
}

void loop() {
  // [스위치] 눌림 감지 (디바운스 포함)
  bool cur = digitalRead(SWITCH_PIN);

  if (cur == LOW && lastSwitch == HIGH && !bellActive) {
    // [벨] 스위치 눌림 → 벨 태스크 시작
    bellActive = true;
    xTaskCreate(bellTask, "bell", 4096, NULL, 1, NULL);
  }

  lastSwitch = cur;
  delay(50);  // [디바운스] 50ms 간격
}