// [BLE] 버튼 알림용 서비스/특성 UUID
#define BTN_SVC_UUID  "AA000001-0000-1000-8000-00805F9B34FB"
#define BTN_CHAR_UUID "AA000002-0000-1000-8000-00805F9B34FB"

static NimBLECharacteristic* pBtnChar = nullptr;
static volatile int pressCount = 0;

// [BLE] 버튼 서비스 및 알림 특성 생성
void setupBtnBleService() {
    NimBLEServer* pServer = NimBLEDevice::getServer();
    if (!pServer) return;
    NimBLEService* pSvc = pServer->createService(BTN_SVC_UUID);
    pBtnChar = pSvc->createCharacteristic(
        BTN_CHAR_UUID,
        NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY
    );
    pSvc->start();
    NimBLEDevice::getAdvertising()->addServiceUUID(BTN_SVC_UUID);
}

// [스위치] 눌림 감지 및 BLE 전송 태스크
void switchTask(void* param) {
    bool lastState = HIGH;
    unsigned long lastDebounce = 0;
    const unsigned long DEBOUNCE_MS = 50;

    while (true) {
        bool cur = (bool)digitalRead(32);

        // [디바운스] 상태 변화 감지 시 타이머 리셋
        if (cur != lastState) {
            lastDebounce = millis();
        }

        if ((millis() - lastDebounce) > DEBOUNCE_MS) {
            if (cur == LOW && lastState == HIGH) {
                // [스위치] 눌림 확정 — 카운트 증가
                pressCount++;

                // [BLE] "눌림:횟수" 포맷으로 알림 전송
                char msg[32];
                snprintf(msg, sizeof(msg), "눌림:%d", pressCount);

                if (pBtnChar && NimBLEDevice::getServer()->getConnectedCount() > 0) {
                    pBtnChar->setValue((uint8_t*)msg, strlen(msg));
                    pBtnChar->notify();
                }

                Serial.printf("[스위치] %s\n", msg);
            }
            lastState = cur;
        }

        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // [초기화] LED·부저·OLED·핀 설정
    initBLE();        // [BLE] OTA 및 기본 BLE 초기화

    setupBtnBleService(); // [BLE] 버튼 알림 서비스 추가

    // [태스크] 스위치 감지 태스크 생성
    xTaskCreate(switchTask, "switchTask", 2048, nullptr, 1, nullptr);
}

void loop() {
    delay(10000); // [메인] BLE 스택이 백그라운드에서 동작
}