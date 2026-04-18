void blinkTask(void *param) {
    // [파란LED] 0.2초 간격으로 20번 깜빡임
    for (int i = 0; i < 20; i++) {
        digitalWrite(LED_BLUE, LOW);   // ON
        delay(100);
        digitalWrite(LED_BLUE, HIGH);  // OFF
        delay(100);
    }
    vTaskDelete(NULL); // [태스크] 완료 후 삭제
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [태스크] 파란 LED 깜빡임 태스크 시작
    xTaskCreate(blinkTask, "blink", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}