void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 빨간 LED 끄기 (active LOW: HIGH=OFF)
  digitalWrite(LED_RED, HIGH);
}

void loop() {
  delay(10000);
}