void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [부저] 한 번 울리기
  digitalWrite(BUZZER, LOW);
  delay(500);
  digitalWrite(BUZZER, HIGH);
}

void loop() {
  delay(10000);
}