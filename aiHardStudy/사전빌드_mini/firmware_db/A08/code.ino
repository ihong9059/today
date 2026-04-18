void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] RGB LED 끄기
  pixel.clear();
  pixel.show();
}

void loop() {
  delay(10000);
}