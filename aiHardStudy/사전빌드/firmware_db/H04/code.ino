void ledSequenceTask(void* param) {
    // [LED] 누적 점등 단계 반복
    while (true) {
        // [단계1] 빨강만 ON
        digitalWrite(LED_RED, LOW);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE, HIGH);
        delay(1000);

        // [단계2] 빨강 + 노랑 ON
        digitalWrite(LED_YELLOW, LOW);
        delay(1000);

        // [단계3] 빨강 + 노랑 + 파랑 ON
        digitalWrite(LED_BLUE, LOW);
        delay(1000);

        // [단계4] 전체 OFF
        digitalWrite(LED_RED, HIGH);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE, HIGH);
        delay(1000);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // 핀 초기화
    initBLE();       // BLE OTA 초기화

    // [태스크] LED 누적 점등 태스크 생성
    xTaskCreate(ledSequenceTask, "ledSeq", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}