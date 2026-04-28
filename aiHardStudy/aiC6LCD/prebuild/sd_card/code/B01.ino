void setup() {
  Serial.begin(115200);
  initHardware();   // LCD, LED, 버튼 초기화
  initBLE();        // BLE OTA 초기화

  // [화면] 배경 검정으로 초기화
  lcdClear();

  // [텍스트] 화면 중앙에 Hello World 출력
  lcdText(20, 145, "Hello World", C_TEXT, 3);
}

void loop() {
  delay(10000);
}