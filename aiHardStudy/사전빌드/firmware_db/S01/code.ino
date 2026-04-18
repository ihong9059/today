// [현관벨] 딩동 멜로디 음표 정의
const int MELODY[] = {523, 659, 784, 659, 784, 880, 784, 659};
const int DURATIONS[] = {300, 300, 400, 300, 300, 400, 300, 500};
const int MELODY_LEN = 8;

bool lastSwitchState = HIGH;
bool bellRinging = false;

// [현관벨] 딩동 멜로디 재생 함수
void playDingDong() {
  for (int i = 0; i < MELODY_LEN; i++) {
    tone(33, MELODY[i], DURATIONS[i]);
    delay(DURATIONS[i] + 50);
  }
  noTone(33);
}

// [현관벨] OLED에 방문자 메시지 표시
void showVisitorOLED() {
  oled.clear();
  oled.drawString(20, 10, "** Visitor! **");
  oled.drawString(10, 30, "Door Bell Ring!");
  oled.drawString(25, 48, "Please open~");
  oled.display();
}

// [현관벨] OLED 대기 화면 표시
void showIdleOLED() {
  oled.clear();
  oled.drawString(15, 20, "Door Bell Ready");
  oled.drawString(20, 40, "Waiting...");
  oled.display();
}

// [현관벨] BLE로 방문자 알림 전송
void sendBleAlert() {
  if (deviceConnected && sensorChar) {
    std::string msg = "VISITOR_DETECTED";
    sensorChar->setValue(msg);
    sensorChar->notify();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀, OLED 초기화
  initBLE();        // BLE 초기화

  pinMode(32, INPUT_PULLUP); // [스위치] GPIO32 입력 설정

  // [현관벨] 시작 화면 표시
  showIdleOLED();
  Serial.println("Door Bell System Ready");
}

void loop() {
  bool currentState = digitalRead(32); // [스위치] 현재 상태 읽기

  // [스위치] 눌림 감지 (HIGH→LOW 엣지)
  if (lastSwitchState == HIGH && currentState == LOW) {
    Serial.println("Bell pressed!");

    // [LED] 파란 LED 켜기
    digitalWrite(LED_BLUE, LOW);

    // [OLED] 방문자 메시지 표시
    showVisitorOLED();

    // [BLE] 스마트폰에 알림 전송
    sendBleAlert();

    // [멜로디] 딩동 재생
    playDingDong();

    // [LED] 파란 LED 끄기
    digitalWrite(LED_BLUE, HIGH);

    // [OLED] 3초 후 대기 화면 복귀
    delay(3000);
    showIdleOLED();
  }

  lastSwitchState = currentState;
  delay(20); // [디바운스] 20ms 딜레이
}