// [무지개] 7가지 색상 순환 태스크
void rainbowTask(void* param) {
  // [색상] 무지개 순서: 빨→주→노→초→파→남→보
  uint32_t colors[] = {
    pixel.Color(255, 0, 0),    // 빨강
    pixel.Color(255, 127, 0),  // 주황
    pixel.Color(255, 255, 0),  // 노랑
    pixel.Color(0, 255, 0),    // 초록
    pixel.Color(0, 0, 255),    // 파랑
    pixel.Color(75, 0, 130),   // 남색
    pixel.Color(148, 0, 211)   // 보라
  };
  int count = 7;
  int idx = 0;

  while (true) {
    // [LED] 현재 색상 표시
    pixel.setPixelColor(0, colors[idx]);
    pixel.show();

    // [OLED] 색상 이름 표시
    const char* names[] = {"Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"};
    oled.clear();
    oled.drawString(0, 0, "Rainbow Cycle");
    oled.drawString(0, 16, names[idx]);
    oled.display();

    idx = (idx + 1) % count;
    vTaskDelay(700 / portTICK_PERIOD_MS); // [딜레이] 0.7초마다 색상 전환
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀/OLED/WS2812 초기화
  initBLE();      // [BLE] OTA 초기화

  // [태스크] 무지개 순환 백그라운드 실행
  xTaskCreate(rainbowTask, "rainbow", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000); // [루프] BLE/OTA 유지
}