// [전역] 태스크 주기 상수
#define LED_INTERVAL    50     // LED 무지개: 50ms
#define OLED_INTERVAL   2000   // OLED 온도: 2초
#define BLE_INTERVAL    5000   // BLE 전송: 5초

// [전역] 공유 센서 데이터 (태스크 간 공유)
volatile float g_temp = 0.0f;
volatile float g_humi = 0.0f;
volatile uint8_t g_hue = 0;    // 무지개 색상 단계 (0~255)

// [유틸] HSV → RGB 변환 (무지개 색상 생성)
uint32_t hsvToColor(uint8_t hue) {
    uint8_t r, g, b;
    uint8_t sector = hue / 43;
    uint8_t frac   = (hue % 43) * 6;
    switch (sector) {
        case 0: r=255;     g=frac;    b=0;       break;
        case 1: r=255-frac;g=255;     b=0;       break;
        case 2: r=0;       g=255;     b=frac;    break;
        case 3: r=0;       g=255-frac;b=255;     break;
        case 4: r=frac;    g=0;       b=255;     break;
        default:r=255;     g=0;       b=255-frac;break;
    }
    return pixel.Color(r, g, b);
}

// [태스크1] LED 무지개 순환 (50ms 주기)
void taskLedRainbow(void* pvParameters) {
    TickType_t xLastWake = xTaskGetTickCount();
    while (true) {
        pixel.setPixelColor(0, hsvToColor(g_hue));
        pixel.show();
        g_hue++;                             // 256 후 자동 wrap
        vTaskDelayUntil(&xLastWake, pdMS_TO_TICKS(LED_INTERVAL));
    }
}

// [태스크2] OLED 온도/습도 표시 (2초 주기)
void taskOledUpdate(void* pvParameters) {
    TickType_t xLastWake = xTaskGetTickCount();
    char buf[32];
    while (true) {
        // [센서] AHT20 읽기
        float t, h;
        if (aht20_read(t, h)) {
            g_temp = t;
            g_humi = h;
        }
        // [OLED] 화면 갱신
        oled.clear();
        oled.drawString(0, 0, "=== UTTEC Mini ===");
        snprintf(buf, sizeof(buf), "Temp: %.1f C", g_temp);
        oled.drawString(0, 16, buf);
        snprintf(buf, sizeof(buf), "Humi: %.1f %%", g_humi);
        oled.drawString(0, 32, buf);
        snprintf(buf, sizeof(buf), "Hue:  %d", g_hue);
        oled.drawString(0, 48, buf);
        oled.display();
        vTaskDelayUntil(&xLastWake, pdMS_TO_TICKS(OLED_INTERVAL));
    }
}

// [태스크3] BLE 센서 데이터 전송 (5초 주기)
void taskBleSend(void* pvParameters) {
    TickType_t xLastWake = xTaskGetTickCount();
    char buf[64];
    while (true) {
        if (deviceConnected && sensorChar) {
            snprintf(buf, sizeof(buf), "T:%.1f,H:%.1f,Hue:%d",
                     g_temp, g_humi, g_hue);
            std::string s(buf);
            sensorChar->setValue(s);
            sensorChar->notify();            // BLE 알림 전송
        }
        vTaskDelayUntil(&xLastWake, pdMS_TO_TICKS(BLE_INTERVAL));
    }
}

// [BLE 수신] 외부 명령 처리
void onBleReceive(String cmd) {
    if (cmd == "reset_hue") {
        g_hue = 0;                           // 무지개 초기화
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [초기] 시작 멜로디
    tone(2, 523, 100); delay(150);
    tone(2, 659, 100); delay(150);
    tone(2, 784, 200); noTone(2);

    // [태스크 생성] 각각 독립 주기로 실행 (ESP32-C3 단일 코어)
    xTaskCreate(taskLedRainbow,  "LED",  2048, NULL, 1, NULL);
    xTaskCreate(taskOledUpdate,  "OLED", 4096, NULL, 1, NULL);
    xTaskCreate(taskBleSend,     "BLE",  4096, NULL, 1, NULL);
}

void loop() {
    // [메인] FreeRTOS 태스크가 모든 작업 처리
    delay(10000);
}