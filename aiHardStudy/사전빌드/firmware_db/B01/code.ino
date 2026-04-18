void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 모든 LED 켜기 (active LOW)
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_BLUE, LOW);
}

void loop() {
  delay(10000);
}