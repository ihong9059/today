// [BLE] 온도 알림 특성 포인터
static NimBLECharacteristic* pTempChar = nullptr;

// [OLED] 온습도 측정값 화면 출력
void showOLED(float temp, float humi) {
    char buf[24];
    oled.clear();
    sprintf(buf, "Temp: %.1f C", temp);
    oled.drawString(0, 0, buf);
    sprintf(buf, "Humi: %.1f %%", humi);
    oled.drawString(0, 16, buf);
    oled.display();
}

// [태스크] 5초마다 AHT20 읽고 BLE 전송
void tempTask(void* pv) {
    for (;;) {
        float temp, humi;
        // [센서] AHT20 온습도 읽기
        bool ok = aht20_read(temp, humi);
        if (ok) {
            // [OLED] 측정값 표시
            showOLED(temp, humi);

            // [BLE] 문자열로 패킷 구성 후 Notify
            char txBuf[32];
            sprintf(txBuf, "T:%.1f H:%.1f", temp, humi);
            if (pTempChar) {
                pTempChar->setValue(txBuf);
                pTempChar->notify();
            }
            Serial.printf("[BLE전송] %s\n", txBuf);
        } else {
            // [오류] 센서 읽기 실패 시 OLED 알림
            oled.clear();
            oled.drawString(0, 0, "Sensor Error");
            oled.display();
        }
        // [타이머] 5초 대기
        vTaskDelay(5000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [BLE] 환경감지 서비스(0x181A)에 온도 특성(0x2A6E) 추가
    NimBLEServer* pServer = NimBLEDevice::getServer();
    NimBLEService* pSvc = pServer->createService("181A");
    pTempChar = pSvc->createCharacteristic(
        "2A6E",
        NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ
    );
    pSvc->start();

    // [OLED] 초기 안내 메시지
    oled.clear();
    oled.drawString(0, 0, "Temp Monitor");
    oled.drawString(0, 16, "BLE Ready");
    oled.display();

    // [태스크] 온도 전송 태스크 시작
    xTaskCreate(tempTask, "TempTask", 4096, nullptr, 1, nullptr);
}

void loop() {
    delay(10000);
}