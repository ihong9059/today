void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 보라색 설정 (R=128, G=0, B=128)
  setColor(128, 0, 128);

  // [LCD] 상태 표시
  lcdClear();
  lcdText(20, 140, "LED: Purple", C_PURPLE, 2);
}

void loop() {
  delay(10000);
}