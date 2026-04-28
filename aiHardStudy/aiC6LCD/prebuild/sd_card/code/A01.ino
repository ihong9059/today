void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 빨간색으로 켜기
  setColor(255, 0, 0);

  lcdText(20, 140, "RED LED ON", C_RED, 2);
}

void loop() {
  delay(10000);
}