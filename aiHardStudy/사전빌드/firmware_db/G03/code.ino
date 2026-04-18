void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [스위치] 누름 감지 (active LOW)
  if (digitalRead(32) == LOW) {
    digitalWrite(BUZZER, LOW);   // [부저] 켜기
  } else {
    digitalWrite(BUZZER, HIGH);  // [부저] 끄기
  }
  delay(10);
}