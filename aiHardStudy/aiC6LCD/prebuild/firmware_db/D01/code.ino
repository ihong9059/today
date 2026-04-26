void setup() {
  Serial.begin(115200);
  initHardware();   // LCD, LED, 버튼 초기화
  initBLE();        // BLE OTA 초기화

  // [LCD] 화면 중앙에 빨간 원 그리기
  lcdClear();
  lcd.fillCircle(86, 160, 60, C_RED);  // x=중앙, y=중앙, 반지름=60
}

void loop() {
  delay(10000);
}