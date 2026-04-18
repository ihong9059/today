void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 및 OLED 초기화
  initBLE();        // BLE OTA 초기화

  // [OLED] 화면 클리어 후 UTTEC 굵게 표시
  oled.clear();

  // 굵은 효과: 같은 텍스트를 1픽셀씩 어긋나게 4번 그림
  for (int dx = 0; dx <= 1; dx++) {
    for (int dy = 0; dy <= 1; dy++) {
      oled.drawString(20 + dx, 24 + dy, "UTTEC"); // 중앙 근처 배치
    }
  }

  oled.display(); // 화면 출력
}

void loop() {
  delay(10000); // BLE OTA 대기
}