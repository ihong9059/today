// [변수] 스위치 누름 시작 시간 및 상태
unsigned long pressStart = 0;
bool wasPressed = false;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] OLED 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Switch Timer");
  oled.drawString(0, 16, "Press button...");
  oled.display();
}

void loop() {
  // [스위치] 현재 상태 읽기 (active LOW)
  bool pressed = (digitalRead(32) == LOW);

  if (pressed && !wasPressed) {
    // [누름 시작] 시작 시간 기록
    pressStart = millis();
    wasPressed = true;

    // [OLED] 누르는 중 표시
    oled.clear();
    oled.drawString(0, 0, "Switch Timer");
    oled.drawString(0, 16, "Holding...");
    oled.display();
  }
  else if (!pressed && wasPressed) {
    // [누름 종료] 경과 시간 계산
    unsigned long elapsed = millis() - pressStart;
    wasPressed = false;

    // [시간 변환] 밀리초 → 소수점 1자리 초
    unsigned long sec = elapsed / 1000;
    unsigned long dec = (elapsed % 1000) / 100;

    // [문자열] "X.X초" 형식으로 조합
    char buf[16];
    snprintf(buf, sizeof(buf), "%lu.%lu\xEC\xB4\x88", sec, dec);  // "초" UTF-8

    // [OLED] 측정 결과 표시
    oled.clear();
    oled.drawString(0, 0, "Switch Timer");
    oled.drawString(0, 16, buf);
    oled.display();

    // [시리얼] 디버그 출력
    Serial.printf("눌린 시간: %lu.%lu초 (%lums)\n", sec, dec, elapsed);
  }

  delay(10);
}