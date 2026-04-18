// [스크롤] 오른쪽→왼쪽 흐르는 텍스트 태스크
void scrollTask(void* pvParameters) {
  const char* msg = "Hello! ESP32 OLED Scrolling Text Demo - Right to Left Animation! Have Fun~  ";
  const int  Y         = 28;   // 세로 중앙 위치
  const int  SPEED     = 2;    // 프레임당 이동 픽셀
  const int  CHAR_W    = 6;    // 문자 폭 추정(픽셀)
  int textW = (int)strlen(msg) * CHAR_W;
  int x     = 128;             // 시작: 화면 오른쪽 끝

  while (true) {
    // [렌더] 현재 위치에 텍스트 출력
    oled.clear();
    oled.drawString(x, Y, msg);
    oled.display();

    x -= SPEED; // [이동] 왼쪽으로 밀기

    // [리셋] 텍스트가 화면 왼쪽을 완전히 벗어나면 처음으로
    if (x < -textW) {
      x = 128;
    }

    vTaskDelay(pdMS_TO_TICKS(30)); // ~33fps
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀·OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [태스크] 스크롤 전담 FreeRTOS 태스크 생성
  xTaskCreate(scrollTask, "Scroll", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000); // BLE OTA 유지
}