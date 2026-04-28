// [전역] 버튼 카운터 변수
int buttonCount = 0;
bool lastBtnState = HIGH;

// [화면] 카운터 표시 함수
void drawCounter() {
  lcdClear();
  lcdText(20, 80, "Button Counter", C_CYAN, 2);
  lcd.drawLine(0, 110, 172, 110, C_GRAY);

  lcd.setTextColor(C_YELLOW, C_BG);
  lcd.setTextSize(5);
  lcd.setCursor(40, 140);
  lcd.print(buttonCount);

  lcdText(30, 240, "Press BOOT btn", C_GRAY, 1);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 화면 첫 표시
  drawCounter();
  setColor(0, 50, 50); // 청록색 대기 표시
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN);

  // [버튼] 눌림 감지 (HIGH→LOW 엣지)
  if (btnState == LOW && lastBtnState == HIGH) {
    buttonCount++;
    Serial.println("Count: " + String(buttonCount));

    // [LED] 버튼 누를 때 흰색 깜빡
    setColor(255, 255, 255);
    drawCounter();
    delay(100);
    setColor(0, 50, 50);
  }

  lastBtnState = btnState;
  delay(20); // 디바운스
}