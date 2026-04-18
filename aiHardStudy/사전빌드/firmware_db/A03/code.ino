void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 노란 LED 켜기 (active LOW)
  digitalWrite(LED_YELLOW, LOW);
}

void loop() {
  delay(10000);
}