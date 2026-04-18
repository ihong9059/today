// [스크롤] 텍스트 위치 변수
int scrollX = 128;
const char* scrollText = "Hello! UTTEC Mini ESP32-C3 NeoPixel Speaker OLED AHT20 BLE OTA Ready!";
const int TEXT_PIXEL_WIDTH = 6; // 기본 폰트 1글자 약 6px
int textLen = 0;
int totalTextWidth = 0;

// [스크롤] OLED 좌우 스크롤 태스크
void scrollTask(void* pvParam) {
  while (true) {
    // [스크롤] OLED 화면 지우고 텍스트 출력
    oled.clear();
    oled.drawString(scrollX, 24, scrollText);
    oled.display();

    // [스크롤] 왼쪽으로 이동
    scrollX -= 2;

    // [스크롤] 텍스트가 완전히 왼쪽으로 사라지면 오른쪽에서 재시작
    if (scrollX < -totalTextWidth) {
      scrollX = 128;
    }

    vTaskDelay(pdMS_TO_TICKS(30)); // 30ms 간격으로 갱신
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [스크롤] 텍스트 길이 계산
  textLen = strlen(scrollText);
  totalTextWidth = textLen * TEXT_PIXEL_WIDTH;

  // [스크롤] 시작 위치: 오른쪽 끝
  scrollX = 128;

  // [스크롤] 태스크 생성 (코어 0)
  xTaskCreate(scrollTask, "scrollTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}