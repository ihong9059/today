void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [스위치] 입력 핀 설정
  pinMode(32, INPUT_PULLUP);
}

void loop() {
  // [스위치] LOW=눌림 (INPUT_PULLUP)
  bool pressed = (digitalRead(32) == LOW);

  // [LED] 눌리면 켜고(LOW), 떼면 끄기(HIGH)
  digitalWrite(LED_RED,    pressed ? LOW : HIGH);
  digitalWrite(LED_YELLOW, pressed ? LOW : HIGH);
  digitalWrite(LED_BLUE,   pressed ? LOW : HIGH);

  delay(10);
}