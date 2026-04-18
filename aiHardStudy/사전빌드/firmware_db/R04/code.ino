// [전역] LED 상태 인덱스 및 이름 배열
const char* ledNames[] = {"RED", "YELLOW", "BLUE"};
const int ledPins[] = {LED_RED, LED_YELLOW, LED_BLUE};

// [LED] LED 순환 태스크 함수
void ledCycleTask(void* param) {
    int idx = 0;
    char buf[32];

    while (true) {
        // [LED] 이전 LED 전부 끄기
        for (int i = 0; i < 3; i++) {
            digitalWrite(ledPins[i], HIGH);
        }

        // [LED] 현재 LED 켜기
        digitalWrite(ledPins[idx], LOW);

        // [OLED] 현재 LED 이름 표시
        snprintf(buf, sizeof(buf), "LED: %s", ledNames[idx]);
        oled.clear();
        oled.drawString(0, 0, "LED Cycle");
        oled.drawString(0, 16, buf);
        oled.display();

        // [BLE] 현재 LED 상태 전송
        if (deviceConnected && sensorChar) {
            snprintf(buf, sizeof(buf), "LED:%s", ledNames[idx]);
            sensorChar->setValue(std::string(buf));
            sensorChar->notify();
        }

        // [순환] 다음 LED로 이동
        idx = (idx + 1) % 3;
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [태스크] LED 순환 태스크 생성
    xTaskCreate(ledCycleTask, "ledCycle", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}