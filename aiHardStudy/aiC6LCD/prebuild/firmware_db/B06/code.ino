// [다중 줄] LCD에 여러 줄 텍스트를 순서대로 표시

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();

  // [제목] 상단 제목 표시
  lcdText(10, 10, "UTTEC C6-LCD", C_CYAN, 2);

  // [구분선] 제목 아래 가로선
  lcd.drawLine(0, 32, 172, 32, C_GRAY);

  // [본문] 여러 줄 텍스트 (size 2: 줄 높이 ~18px)
  lcdText(5, 45,  "Line 1: Hello!", C_TEXT, 2);
  lcdText(5, 65,  "Line 2: World", C_GREEN, 2);
  lcdText(5, 85,  "Line 3: ESP32-C6", C_YELLOW, 2);
  lcdText(5, 105, "Line 4: 172x320", C_ORANGE, 2);
  lcdText(5, 125, "Line 5: RISC-V", C_PURPLE, 2);
  lcdText(5, 145, "Line 6: WiFi 6", C_BLUE, 2);
  lcdText(5, 165, "Line 7: BLE 5.0", C_RED, 2);

  // [구분선] 하단 구분선
  lcd.drawLine(0, 188, 172, 188, C_GRAY);

  // [소형] size 1로 작은 텍스트 여러 줄
  lcdText(5, 195, "small text size=1", C_GRAY, 1);
  lcdText(5, 207, "x:0~171 y:0~319", C_GRAY, 1);
  lcdText(5, 219, "line height ~12px", C_GRAY, 1);

  // [구분선] 하단 영역
  lcd.drawLine(0, 232, 172, 232, C_GRAY);

  // [대형] size 3 큰 텍스트
  lcdText(10, 245, "BIG!", C_CYAN, 3);
  lcdText(70, 245, "TEXT", C_YELLOW, 3);

  // [LED] 초록색으로 정상 표시
  setColor(0, 30, 0);
}

void loop() {
  delay(10000);
}