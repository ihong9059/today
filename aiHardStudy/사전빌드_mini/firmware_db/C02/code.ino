// [랜덤 색상] 0.5초마다 LED 색상 변경
void randomColorTask(void* pvParameters) {
  while (true) {
    uint8_t r = random(0, 256);
    uint8_t g = random(0, 256);
    uint8_t b = random(0, 256);
    pixel.setPixelColor(0, pixel.Color(r, g, b));
    pixel.show();
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [초기화] 랜덤 시드 설정
  randomSeed(esp_random());
  // [태스크] 랜덤 색상 변경 태스크 생성
  xTaskCreate(randomColorTask, "randomColor", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}