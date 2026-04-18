void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 빨간 LED 켜기 (active LOW)
  digitalWrite(LED_RED, LOW);

  // [부저] 부저 한 번 울리기 (active LOW: LOW=ON)
  digitalWrite(BUZZER, LOW);
  delay(500);
  digitalWrite(BUZZER, HIGH);
}

void loop() {
  delay(10000);
}