void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] 배경을 빨간색으로 채우기
  lcd.fillScreen(C_RED);
}

void loop() {
  delay(10000);
}