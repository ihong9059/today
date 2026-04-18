void emergencyLedTask(void *param) {
    // [비상등] 빨강/파랑 번갈아 깜빡이기
    while (true) {
        digitalWrite(LED_RED, LOW);   // 빨강 ON
        digitalWrite(LED_BLUE, HIGH); // 파랑 OFF
        delay(200);
        digitalWrite(LED_RED, HIGH);  // 빨강 OFF
        digitalWrite(LED_BLUE, LOW);  // 파랑 ON
        delay(200);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();
    // [비상등] 태스크 생성
    xTaskCreate(emergencyLedTask, "EmergencyLED", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}