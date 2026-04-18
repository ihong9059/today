// [구급차] 사이렌 태스크 핸들
TaskHandle_t sirenTaskHandle = NULL;

// [사이렌] 구급차 사이렌 소리 재생 태스크
void sirenTask(void* param) {
  while (true) {
    // 높은 음 (고음)
    for (int freq = 800; freq <= 1200; freq += 10) {
      tone(2, freq, 20);
      vTaskDelay(20 / portTICK_PERIOD_MS);
    }
    // 낮은 음 (저음)
    for (int freq = 1200; freq >= 800; freq -= 10) {
      tone(2, freq, 20);
      vTaskDelay(20 / portTICK_PERIOD_MS);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 상태 표시
  oled.clear();
  oled.drawString(0, 0, "Ambulance Siren");
  oled.drawString(0, 16, "Running...");
  oled.display();

  // [LED] 빨간색 점멸용 태스크 없이 루프에서 처리
  // [사이렌] 백그라운드 태스크 시작
  xTaskCreate(sirenTask, "siren", 2048, NULL, 1, &sirenTaskHandle);
}

void loop() {
  // [LED] 빨간/파란 교차 점멸 (구급차 효과)
  pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨간색
  pixel.show();
  delay(300);

  pixel.setPixelColor(0, pixel.Color(0, 0, 255)); // 파란색
  pixel.show();
  delay(300);
}