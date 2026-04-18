// [상태] 클릭 감지 상태 변수
#define SWITCH_PIN 32
#define DOUBLE_CLICK_MS 300
#define DEBOUNCE_MS 50

volatile int clickCount = 0;
volatile unsigned long lastClickTime = 0;

// [LED] 상태에 따라 LED 설정 (active LOW)
void setLed(int mode) {
    digitalWrite(LED_RED,    mode == 1 ? LOW : HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   mode == 2 ? LOW : HIGH);
}

// [태스크] 스위치 더블클릭 감지 및 LED 제어
void switchTask(void* param) {
    bool lastRaw   = HIGH;
    bool stable    = HIGH;
    unsigned long debounceTime = 0;

    for (;;) {
        bool raw = digitalRead(SWITCH_PIN);

        // [디바운스] 상태 변화 시 시간 기록
        if (raw != lastRaw) {
            debounceTime = millis();
        }
        lastRaw = raw;

        if ((millis() - debounceTime) > DEBOUNCE_MS && raw != stable) {
            stable = raw;
            if (stable == LOW) {
                // [클릭] 눌림 감지, 카운트 증가
                clickCount++;
                lastClickTime = millis();
            }
        }

        // [판정] 타임아웃 후 클릭 횟수로 판정
        if (clickCount > 0 && (millis() - lastClickTime) > DOUBLE_CLICK_MS) {
            if (clickCount >= 2) {
                // [더블클릭] 파랑 LED 켜기
                setLed(2);
                Serial.println("더블클릭 → 파랑");
            } else {
                // [싱글클릭] 빨강 LED 켜기
                setLed(1);
                Serial.println("싱글클릭 → 빨강");
            }
            clickCount = 0;
        }

        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 핀 초기화
    initBLE();        // BLE OTA 초기화

    // [스위치] 입력 핀 설정
    pinMode(SWITCH_PIN, INPUT_PULLUP);

    // [태스크] 스위치 감지 태스크 생성
    xTaskCreate(switchTask, "switchTask", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}