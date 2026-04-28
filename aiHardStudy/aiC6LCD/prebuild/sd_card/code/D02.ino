void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] 초록 사각형 그리기
  lcd.fillRect(36, 110, 100, 100, C_GREEN);
}

void loop() {
  delay(10000);
}