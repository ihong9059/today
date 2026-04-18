// [전역] 카운트 변수
int pressCount = 0;
bool lastState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 초기 화면
  oled.clear();
  oled.drawString(0, 0, "Switch Counter");
  oled.drawString(0, 16, "Press button!");
  oled.display();
}

void loop() {
  bool curState = digitalRead(SWITCH_PIN);

  // [스위치] 눌림 감지 (HIGH→LOW)
  if (lastState == HIGH && curState == LOW) {
    pressCount++;

    // [LED] 파란색 점멸
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();

    // [소리] 클릭음
    tone(2, 1000, 50);

    // [OLED] 카운트 표시
    char buf[32];
    snprintf(buf, sizeof(buf), "Count: %d", pressCount);
    oled.clear();
    oled.drawString(0, 0, "Switch Counter");
    oled.drawString(0, 16, buf);
    oled.display();

    // [BLE] 카운트 전송
    if (deviceConnected && sensorChar) {
      char bleMsg[32];
      snprintf(bleMsg, sizeof(bleMsg), "COUNT:%d", pressCount);
      std::string s(bleMsg);
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    delay(200); // [디바운스] 반동 방지

    // [LED] 끄기
    pixel.clear();
    pixel.show();
  }

  lastState = curState;
  delay(10);
}