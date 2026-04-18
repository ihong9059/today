void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [LED] 파란 LED 켜기 (active LOW)
  digitalWrite(LED_BLUE, LOW);
  delay(10000);
}