void taskRedBlink(void* param) {
    // [빨강LED] 0.2초 주기로 빠르게 깜빡임
    while (true) {
        digitalWrite(LED_RED, LOW);
        vTaskDelay(pdMS_TO_TICKS(100));
        digitalWrite(LED_RED, HIGH);
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void taskBlueBlink(void* param) {
    // [파랑LED] 2초 주기로 느리게 깜빡임
    while (true) {
        digitalWrite(LED_BLUE, LOW);
        vTaskDelay(pdMS_TO_TICKS(1000));
        digitalWrite(LED_BLUE, HIGH);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [태스크] 빨강/파랑 동시 깜빡임 태스크 생성
    xTaskCreate(taskRedBlink,  "RedBlink",  1024, NULL, 1, NULL);
    xTaskCreate(taskBlueBlink, "BlueBlink", 1024, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}