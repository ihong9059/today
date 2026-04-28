void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 흰색으로 켜기
  setColor(255, 255, 255);

  // [LCD] 상태 표시
  lcdClear();
  lcdText(20, 140, "LED: WHITE", C_TEXT, 2);
}

void loop() {
  delay(10000);
}