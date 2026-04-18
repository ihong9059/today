void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  pinMode(32, INPUT_PULLUP); // [스위치] 입력 설정
}

void loop() {
  // [스위치] 눌리면 LOW
  if (digitalRead(32) == LOW) {
    digitalWrite(LED_RED, LOW);  // [LED] 빨간 LED 켜기
  } else {
    digitalWrite(LED_RED, HIGH); // [LED] 빨간 LED 끄기
  }
  delay(10000);
}