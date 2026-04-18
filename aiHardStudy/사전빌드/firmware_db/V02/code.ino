// [스위치 로그] 전역 변수
volatile int pressCount = 0;
volatile unsigned long lastPressMs = 0;
NimBLECharacteristic* pSwChar = nullptr;

// [BLE] 스위치 이벤트 전용 서비스/특성 등록
void setupSwitchBLE() {
    NimBLEServer* pSrv = NimBLEDevice::getServer();
    if (!pSrv) return;
    // [BLE] 스위치 이벤트 서비스 UUID
    NimBLEService* pSvc = pSrv->createService("SW00");
    pSwChar = pSvc->createCharacteristic("SW01", NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ);
    pSvc->start();
}

// [스위치] 눌림 감지 + OLED/BLE 이벤트 전송 태스크
void switchLogTask(void* param) {
    bool prevState = HIGH;
    char line1[24], line2[24], line3[24];

    while (true) {
        bool cur = digitalRead(32); // [스위치] GPIO32 읽기

        if (cur == LOW && prevState == HIGH) {
            delay(50); // [디바운스] 50ms 안정화
            if (digitalRead(32) == LOW) {
                pressCount++;
                lastPressMs = millis();
                unsigned long sec = lastPressMs / 1000;
                unsigned long ms  = lastPressMs % 1000;

                // [OLED] 이벤트 로그 표시
                snprintf(line1, sizeof(line1), "SW Event Log");
                snprintf(line2, sizeof(line2), "Count : %d", pressCount);
                snprintf(line3, sizeof(line3), "Time  : %lu.%03lus", sec, ms);

                oled.clear();
                oled.drawString(0,  0, line1);
                oled.drawString(0, 20, line2);
                oled.drawString(0, 40, line3);
                oled.display();

                // [BLE] 이벤트 문자열 전송
                if (pSwChar) {
                    char msg[48];
                    snprintf(msg, sizeof(msg), "CNT:%d T:%lu.%03lus", pressCount, sec, ms);
                    pSwChar->setValue(msg);
                    pSwChar->notify();
                }

                // [시리얼] 디버그 출력
                Serial.printf("[SW] Count=%d  Time=%lu.%03lus\n", pressCount, sec, ms);
            }
        }

        prevState = cur;
        delay(20); // [태스크] 20ms 폴링 간격
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // [초기화] 핀/OLED/I2C 설정
    initBLE();       // [BLE] OTA 서비스 초기화

    setupSwitchBLE(); // [BLE] 스위치 로그 서비스 추가

    // [OLED] 대기 메시지 표시
    oled.clear();
    oled.drawString(0,  0, "SW Event Logger");
    oled.drawString(0, 20, "Ready...");
    oled.display();

    // [태스크] 스위치 감지 태스크 시작 (스택 4KB, 우선순위 1)
    xTaskCreate(switchLogTask, "SW_LOG", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000); // [루프] BLE OTA 유지
}