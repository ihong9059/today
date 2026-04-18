void blinkRedTask(void *param) {
    // [빨간 LED] 5번 깜빡이고 종료
    for (int i = 0; i < 5; i++) {
        digitalWrite(LED_RED, LOW);   // LED 켜기
        delay(300);
        digitalWrite(LED_RED, HIGH);  // LED 끄기
        delay(300);
    }
    vTaskDelete(NULL);
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [태스크] 빨간 LED 깜빡임 태스크 시작
    xTaskCreate(blinkRedTask, "blinkRed", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}