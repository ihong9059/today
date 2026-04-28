void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 파란색 점등
  setColor(0, 0, 255);
}

void loop() {
  delay(10000);
}