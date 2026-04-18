// [초기화] 시리얼, 하드웨어, BLE 초기화
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [스위치] 버튼 눌림 감지 (INPUT_PULLUP, active LOW)
  if (digitalRead(SWITCH_PIN) == LOW) {
    tone(2, 1000, 200);  // [비프음] 1kHz, 200ms
    delay(300);           // [디바운스] 중복 입력 방지
  }
  delay(10);
}