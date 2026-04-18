// [공유] 센서 데이터 보호용 뮤텍스
SemaphoreHandle_t xSensorMutex;

// [공유] 태스크 간 공유 센서값
volatile float g_temp = 0.0f;
volatile float g_humi = 0.0f;

// [LED] 각 LED 깜빡임 주기 정의
#define RED_INTERVAL    500
#define YELLOW_INTERVAL 1000
#define BLUE_INTERVAL   2000

// [LED] 세 LED를 서로 다른 주기로 깜빡이는 태스크
void taskLED(void* param) {
    unsigned long redLast = 0, yellowLast = 0, blueLast = 0;
    bool redOn = false, yellowOn = false, blueOn = false;
    for (;;) {
        unsigned long now = millis();
        if (now - redLast >= RED_INTERVAL) {
            redOn = !redOn;
            digitalWrite(LED_RED, redOn ? LOW : HIGH); // [LED] 빨강 500ms 주기
            redLast = now;
        }
        if (now - yellowLast >= YELLOW_INTERVAL) {
            yellowOn = !yellowOn;
            digitalWrite(LED_YELLOW, yellowOn ? LOW : HIGH); // [LED] 노랑 1초 주기
            yellowLast = now;
        }
        if (now - blueLast >= BLUE_INTERVAL) {
            blueOn = !blueOn;
            digitalWrite(LED_BLUE, blueOn ? LOW : HIGH); // [LED] 파랑 2초 주기
            blueLast = now;
        }
        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

// [OLED] AHT20 읽어서 2초마다 화면 갱신하는 태스크
void taskOLED(void* param) {
    char buf[32];
    for (;;) {
        float t, h;
        bool ok = aht20_read(t, h); // [센서] 온도/습도 읽기
        if (ok) {
            if (xSemaphoreTake(xSensorMutex, pdMS_TO_TICKS(100))) {
                g_temp = t; // [공유] 전역 업데이트
                g_humi = h;
                xSemaphoreGive(xSensorMutex);
            }
            oled.clear();
            snprintf(buf, sizeof(buf), "Temp: %.1f C", t);
            oled.drawString(0, 0, buf); // [OLED] 온도 표시 (상단)
            snprintf(buf, sizeof(buf), "Humi: %.1f %%", h);
            oled.drawString(0, 16, buf); // [OLED] 습도 표시 (하단)
            oled.display();
        } else {
            oled.clear();
            oled.drawString(0, 0, "Sensor Error");
            oled.display();
        }
        vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
}

// [BLE] 센서 데이터를 JSON 형식으로 3초마다 시리얼 전송
void taskBLESend(void* param) {
    char buf[64];
    for (;;) {
        float t = 0.0f, h = 0.0f;
        if (xSemaphoreTake(xSensorMutex, pdMS_TO_TICKS(100))) {
            t = g_temp; // [공유] 뮤텍스 보호하여 읽기
            h = g_humi;
            xSemaphoreGive(xSensorMutex);
        }
        snprintf(buf, sizeof(buf), "{\"temp\":%.1f,\"humi\":%.1f}", t, h);
        Serial.println(buf); // [BLE] BLE notify 연동 시 여기에 characteristic->notify() 추가
        vTaskDelay(3000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware(); // [초기화] 핀/OLED/I2C 초기화
    initBLE();      // [BLE] OTA BLE 초기화

    xSensorMutex = xSemaphoreCreateMutex(); // [동기화] 뮤텍스 생성

    // [태스크] LED 깜빡임 — 스택 2KB, 우선순위 1
    xTaskCreate(taskLED, "LED", 2048, NULL, 1, NULL);
    // [태스크] OLED 갱신 — 스택 4KB, 우선순위 1
    xTaskCreate(taskOLED, "OLED", 4096, NULL, 1, NULL);
    // [태스크] BLE 전송 — 스택 4KB, 우선순위 1
    xTaskCreate(taskBLESend, "BLE", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000); // [루프] BLE OTA 처리를 위한 최소 루프 유지
}