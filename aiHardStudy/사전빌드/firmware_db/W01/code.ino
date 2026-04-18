// [애니메이션] 점 이동 태스크 함수
void dotAnimTask(void *param) {
  int x = 0;
  int y = 32; // 화면 중앙 세로
  while (true) {
    oled.clear();
    oled.drawString(x, y, "o"); // 점 문자 표시
    oled.display();
    x += 4; // 오른쪽으로 이동
    if (x > 120) x = 0; // 끝 도달 시 왼쪽으로 초기화
    delay(60); // 이동 속도 조절
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀 및 OLED 초기화
  initBLE();      // BLE OTA 초기화

  // [태스크] 점 애니메이션 태스크 생성
  xTaskCreate(dotAnimTask, "dotAnim", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}