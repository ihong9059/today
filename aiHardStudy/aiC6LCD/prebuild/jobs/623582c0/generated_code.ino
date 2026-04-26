// [설정] 초기화
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 150, "Blue LED Blink", C_BLUE, 2);
}

// [루프] 파란 LED 1초 간격 깜빡임
void loop() {
  setColor(0, 0, 255);  // [LED] 파란색 켜기
  delay(500);
  ledOff();             // [LED] 끄기
  delay(500);
}