// [주사위] 전역 변수
int lastDiceValue = 0;
bool lastSwitchState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] OLED에 안내 메시지 표시
  oled.clear();
  oled.drawString(20, 20, "Press Switch!");
  oled.display();
}

void showDice(int value) {
  // [주사위] 숫자를 OLED 중앙에 크게 표시
  char buf[4];
  snprintf(buf, sizeof(buf), "%d", value);

  oled.clear();
  oled.drawString(50, 5, "DICE");
  oled.drawString(56, 30, buf);
  oled.display();

  // [LED] 주사위 숫자에 따라 색상 변경
  switch (value) {
    case 1: pixel.setPixelColor(0, pixel.Color(255, 0, 0));   break; // 빨강
    case 2: pixel.setPixelColor(0, pixel.Color(255, 165, 0)); break; // 주황
    case 3: pixel.setPixelColor(0, pixel.Color(255, 255, 0)); break; // 노랑
    case 4: pixel.setPixelColor(0, pixel.Color(0, 255, 0));   break; // 초록
    case 5: pixel.setPixelColor(0, pixel.Color(0, 0, 255));   break; // 파랑
    case 6: pixel.setPixelColor(0, pixel.Color(148, 0, 211)); break; // 보라
  }
  pixel.show();

  // [효과] 굴리는 소리
  for (int i = 0; i < value; i++) {
    tone(2, 800 + i * 200, 60);
    delay(100);
  }
  noTone(2);
}

void loop() {
  bool currentSwitch = digitalRead(SWITCH_PIN);

  // [스위치] 눌렸을 때(LOW) 주사위 굴리기
  if (currentSwitch == LOW && lastSwitchState == HIGH) {
    // [랜덤] 굴리는 애니메이션 효과
    for (int i = 0; i < 10; i++) {
      int tempVal = random(1, 7);
      char buf[4];
      snprintf(buf, sizeof(buf), "%d", tempVal);
      oled.clear();
      oled.drawString(50, 5, "DICE");
      oled.drawString(56, 30, buf);
      oled.display();
      delay(50 + i * 15);
    }

    // [결과] 최종 값 결정 및 표시
    lastDiceValue = random(1, 7);
    showDice(lastDiceValue);

    Serial.print("주사위 결과: ");
    Serial.println(lastDiceValue);

    // [BLE] 결과 전송
    if (deviceConnected && sensorChar) {
      char msg[16];
      snprintf(msg, sizeof(msg), "DICE:%d", lastDiceValue);
      std::string s(msg);
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    delay(300); // [디바운스] 중복 입력 방지
  }

  lastSwitchState = currentSwitch;
  delay(10);
}