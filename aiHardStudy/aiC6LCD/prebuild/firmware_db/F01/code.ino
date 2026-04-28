bool lastBtnState = HIGH;
bool pressed = false;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();
  lcdText(30, 140, "READY", C_GREEN, 3); // [초기화] 준비 상태 표시
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN); // [버튼] 현재 상태 읽기

  if (lastBtnState == HIGH && btnState == LOW) { // [버튼] 눌림 감지 (active LOW)
    lcdClear();
    lcdText(10, 140, "PRESSED", C_YELLOW, 3); // [LCD] PRESSED 표시
    setColor(255, 100, 0); // [LED] 주황색으로 표시
    pressed = true;
  }

  if (lastBtnState == LOW && btnState == HIGH && pressed) { // [버튼] 놓임 감지
    lcdClear();
    lcdText(30, 140, "READY", C_GREEN, 3); // [LCD] 다시 READY 표시
    ledOff(); // [LED] 끄기
    pressed = false;
  }

  lastBtnState = btnState;
  delay(20); // [디바운스] 20ms 대기
}