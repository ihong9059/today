// [주사위] 전역 변수
int diceResult = 0;
bool lastSwitchState = HIGH;
bool switchPressed = false;

// [주사위] 1~6 랜덤 굴리기
int rollDice() {
  return (esp_random() % 6) + 1;
}

// [주사위] OLED에 결과 표시
void showDiceOnOLED(int val) {
  oled.clear();
  oled.drawString(0, 0, "[ DICE GAME ]");

  char buf[8];
  snprintf(buf, sizeof(buf), "%d", val);
  oled.drawString(52, 20, buf);

  const char* msg = "";
  if (val == 1) msg = "Lucky One!";
  else if (val == 6) msg = "Maximum!";
  else if (val >= 4) msg = "Good!";
  else msg = "Try again~";

  oled.drawString(0, 45, msg);
  oled.display();
}

// [주사위] LED 색상: 숫자에 따라
void showDiceLED(int val) {
  uint32_t color;
  switch (val) {
    case 1: color = pixel.Color(255, 0, 0);   break; // 빨강
    case 2: color = pixel.Color(255, 100, 0); break; // 주황
    case 3: color = pixel.Color(255, 255, 0); break; // 노랑
    case 4: color = pixel.Color(0, 255, 0);   break; // 초록
    case 5: color = pixel.Color(0, 0, 255);   break; // 파랑
    case 6: color = pixel.Color(255, 0, 255); break; // 보라
    default: color = pixel.Color(0, 0, 0);    break;
  }
  pixel.setPixelColor(0, color);
  pixel.show();
}

// [주사위] 굴릴 때 효과음
void playDiceSound(int val) {
  // 주사위 굴리는 느낌
  for (int i = 0; i < 5; i++) {
    tone(2, 200 + i * 80, 40);
    delay(50);
  }
  // 결과음: 숫자가 클수록 높은 음
  tone(2, 400 + val * 80, 300);
  delay(320);
  noTone(2);
}

// [BLE] 결과 전송
void sendDiceResult(int val) {
  if (deviceConnected && sensorChar) {
    char buf[32];
    snprintf(buf, sizeof(buf), "DICE:%d", val);
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [BLE] 수신: "ROLL" 명령 받으면 주사위 굴림
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "ROLL") {
    switchPressed = true; // 플래그로 loop에서 처리
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작 화면
  oled.clear();
  oled.drawString(0, 0, "[ DICE GAME ]");
  oled.drawString(0, 20, "Press Switch");
  oled.drawString(0, 35, "or send ROLL");
  oled.display();

  pixel.setPixelColor(0, pixel.Color(30, 30, 30));
  pixel.show();

  Serial.println("주사위 게임 준비 완료");
}

void loop() {
  // [스위치] 눌림 감지 (디바운스)
  bool currentSwitch = digitalRead(SWITCH_PIN);
  if (currentSwitch == LOW && lastSwitchState == HIGH) {
    switchPressed = true;
    delay(50); // 디바운스
  }
  lastSwitchState = currentSwitch;

  // [주사위] 굴리기 처리
  if (switchPressed) {
    switchPressed = false;

    diceResult = rollDice();
    Serial.printf("주사위 결과: %d\n", diceResult);

    // 애니메이션: 빠르게 숫자 바꾸기
    for (int i = 0; i < 8; i++) {
      int fake = (esp_random() % 6) + 1;
      char buf[4];
      snprintf(buf, sizeof(buf), "%d", fake);
      oled.clear();
      oled.drawString(0, 0, "[ ROLLING... ]");
      oled.drawString(52, 20, buf);
      oled.display();

      pixel.setPixelColor(0, pixel.Color(
        esp_random() % 200,
        esp_random() % 200,
        esp_random() % 200
      ));
      pixel.show();
      delay(80);
    }

    // 최종 결과 표시
    showDiceOnOLED(diceResult);
    showDiceLED(diceResult);
    playDiceSound(diceResult);
    sendDiceResult(diceResult);
  }

  delay(10);
}