void blinkRedTask(void* param) {
    // [LED] 빨간 LED 10번 깜빡임
    for (int i = 0; i < 10; i++) {
        digitalWrite(LED_RED, LOW);   // ON
        delay(300);
        digitalWrite(LED_RED, HIGH);  // OFF
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