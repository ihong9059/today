// [비상등] 빨간색과 파란색 번갈아 깜빡이는 비상등 태스크
void emergencyLightTask(void* param) {
    while (true) {
        // 빨간색 켜기
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
        pixel.show();
        vTaskDelay(pdMS_TO_TICKS(300));

        // 끄기
        pixel.clear();
        pixel.show();
        vTaskDelay(pdMS_TO_TICKS(100));

        // 파란색 켜기
        pixel.setPixelColor(0, pixel.Color(0, 0, 255));
        pixel.show();
        vTaskDelay(pdMS_TO_TICKS(300));

        // 끄기
        pixel.clear();
        pixel.show();
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 하드웨어 초기화
    initBLE();        // BLE OTA 초기화

    // [OLED] 비상등 안내 메시지 표시
    oled.clear();
    oled.drawString(0, 0, "Emergency Light");
    oled.drawString(0, 16, "Red <-> Blue");
    oled.display();

    // [태스크] 비상등 깜빡임 백그라운드 실행
    xTaskCreate(emergencyLightTask, "EmgLight", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}