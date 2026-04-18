// [주사위] 전역 변수
int diceResult = 0;
bool lastSwitchState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 초기 화면 표시
  oled.clear();
  oled.drawString(20, 20, "Press Switch");
  oled.drawString(28, 36, "to Roll!");
  oled.display();

  randomSeed(esp_random());
}

void showDice(int num) {
  // [OLED] 주사위 숫자 크게 표시
  oled.clear();
  oled.drawString(30, 8, "DICE ROLL");

  String numStr = String(num);
  oled.drawString(56, 28, numStr.c_str());

  oled.display();
}

void loop() {
  // [스위치] 버튼 눌림 감지 (active LOW)
  bool currentState = digitalRead(32);

  if (lastSwitchState == HIGH && currentState == LOW) {
    // [주사위] 1~6 랜덤 생성
    diceResult = random(1, 7);
    Serial.printf("주사위 결과: %d\n", diceResult);

    // [LED] 결과에 따라 LED 표시
    digitalWrite(LED_RED,    diceResult <= 2 ? LOW : HIGH);
    digitalWrite(LED_YELLOW, diceResult == 3 || diceResult == 4 ? LOW : HIGH);
    digitalWrite(LED_BLUE,   diceResult >= 5 ? LOW : HIGH);

    // [부저] 짧은 알림음
    tone(33, 1000, 100);

    showDice(diceResult);
  }

  lastSwitchState = currentState;
  delay(20);
}