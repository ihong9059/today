// [신호등] OLED 상태 표시 함수
void showSignal(const char* msg) {
    oled.clear();
    oled.drawString(28, 20, msg);
    oled.display();
}

// [보행음] 파란불 알림 반복 비프
void playWalkBeep() {
    for (int i = 0; i < 5; i++) {
        tone(33, 880, 120);   // 880Hz 짧은 비프
        delay(250);
    }
    noTone(33);
}

// [신호등] 빨강→노랑→파랑 순환 태스크
void trafficTask(void* param) {
    while (true) {
        // 빨간불 - 정지
        digitalWrite(LED_RED,    LOW);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE,   HIGH);
        showSignal("STOP");
        delay(5000);

        // 노란불 - 대기
        digitalWrite(LED_RED,    HIGH);
        digitalWrite(LED_YELLOW, LOW);
        digitalWrite(LED_BLUE,   HIGH);
        showSignal("WAIT");
        delay(2000);

        // 파란불 - 보행 + WALK 표시 + 알림음
        digitalWrite(LED_RED,    HIGH);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE,   LOW);
        showSignal("WALK");
        playWalkBeep();        // 첫 번째 알림음
        delay(2000);
        playWalkBeep();        // 두 번째 알림음 (종료 예고)
        delay(1000);

        // 소등 및 화면 클리어
        noTone(33);
        oled.clear();
        oled.display();
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // LED, 버저, OLED 초기화
    initBLE();        // BLE OTA 초기화
    // [태스크] 신호등 제어 태스크 생성
    xTaskCreate(trafficTask, "traffic", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}