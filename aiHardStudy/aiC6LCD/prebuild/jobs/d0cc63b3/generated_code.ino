// [RGB LED] 1초 간격 빨간 LED 깜빡임

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();
  lcdText(10, 140, "Red LED Blink", C_RED, 2);
  lcdText(10, 170, "1 sec interval", C_TEXT, 2);
}

void loop() {
  // [LED 켜기] 빨간색
  setColor(255, 0, 0);
  delay(500);

  // [LED 끄기]
  ledOff();
  delay(500);
}