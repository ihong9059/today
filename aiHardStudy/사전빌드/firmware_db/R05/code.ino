// [BLE] 온도 경보용 서비스/특성 UUID
#define ALERT_SERVICE_UUID "DEAD1234-BEEF-CAFE-1234-DEADBEEFCAFE"
#define ALERT_CHAR_UUID    "DEAD5678-BEEF-CAFE-5678-DEADBEEFCAFE"
#define TEMP_THRESHOLD     28.0f
#define SENSOR_INTERVAL_MS 5000

NimBLECharacteristic* pAlertChar = nullptr;
volatile bool alertActive = false;
SemaphoreHandle_t oledMutex = nullptr;

// [LED] 경보 점멸 태스크 (28도 이상 시 순차 점멸)
void ledAlertTask(void* param) {
    while (true) {
        if (alertActive) {
            // [경보] 빨간→노란→파란 순차 점멸
            digitalWrite(LED_RED,    LOW);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   HIGH);
            vTaskDelay(pdMS_TO_TICKS(250));

            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, LOW);
            vTaskDelay(pdMS_TO_TICKS(250));

            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   LOW);
            vTaskDelay(pdMS_TO_TICKS(250));

            digitalWrite(LED_BLUE,   HIGH);
            vTaskDelay(pdMS_TO_TICKS(250));
        } else {
            // [정상] 모든 LED OFF
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   HIGH);
            vTaskDelay(pdMS_TO_TICKS(100));
        }
    }
}

// [센서] 온도 모니터링 + BLE 알림 태스크
void tempMonitorTask(void* param) {
    char buf[48];
    while (true) {
        float temp = 0, humi = 0;
        bool ok = aht20_read(temp, humi);

        if (ok) {
            Serial.printf("[AHT20] %.1f°C  %.1f%%RH\n", temp, humi);

            // [OLED] 온도/습도 + 경보 상태 표시
            if (xSemaphoreTake(oledMutex, pdMS_TO_TICKS(500)) == pdTRUE) {
                oled.clear();
                sprintf(buf, "Temp: %.1f C", temp);
                oled.drawString(0, 0, buf);
                sprintf(buf, "Humi: %.1f %%", humi);
                oled.drawString(0, 16, buf);

                if (temp >= TEMP_THRESHOLD) {
                    oled.drawString(0, 36, "!! HIGH TEMP !!");
                    oled.drawString(0, 52, "BLE ALERT SENT");
                } else {
                    oled.drawString(0, 36, "Status: Normal");
                }
                oled.display();
                xSemaphoreGive(oledMutex);
            }

            if (temp >= TEMP_THRESHOLD) {
                // [경보] 플래그 설정
                alertActive = true;

                // [BLE] 경고 문자열 notify 전송
                if (pAlertChar != nullptr) {
                    sprintf(buf, "ALERT Temp=%.1fC Humi=%.1f%%", temp, humi);
                    pAlertChar->setValue((uint8_t*)buf, strlen(buf));
                    pAlertChar->notify();
                    Serial.println("[BLE] 경고 알림 전송 완료");
                }
            } else {
                // [정상] 경보 해제
                alertActive = false;
            }
        } else {
            Serial.println("[AHT20] 센서 읽기 실패");
        }

        vTaskDelay(pdMS_TO_TICKS(SENSOR_INTERVAL_MS));
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // 핀 초기화 + OLED + Wire
    initBLE();       // BLE OTA 초기화

    // [BLE] 온도 경보 서비스 등록 (initBLE 이후 서버에 추가)
    NimBLEServer* pServer = NimBLEDevice::getServer();
    NimBLEService* pAlertSvc = pServer->createService(ALERT_SERVICE_UUID);
    pAlertChar = pAlertSvc->createCharacteristic(
        ALERT_CHAR_UUID,
        NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY
    );
    pAlertSvc->start();
    NimBLEDevice::getAdvertising()->start(); // 재광고 시작

    // [뮤텍스] OLED I2C 동시 접근 방지
    oledMutex = xSemaphoreCreateMutex();

    // [태스크] LED 경보 + 온도 모니터링 병렬 실행
    xTaskCreate(ledAlertTask,    "LEDAlert",  2048, nullptr, 1, nullptr);
    xTaskCreate(tempMonitorTask, "TempMon",   4096, nullptr, 2, nullptr);
}

void loop() {
    delay(10000);
}