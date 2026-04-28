void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 주황색 설정 (R=255, G=80, B=0)
  setColor(255, 80, 0);

  // [LCD] 상태 표시
  lcdClear();
  lcdText(20, 140, "LED: Orange", C_ORANGE, 2);
}

void loop() {
  delay(10000);
}