void setLedColor(bool red, bool yellow, bool blue) {
    // [LED] 활성 LOW: true=켜기(LOW), false=끄기(HIGH)
    digitalWrite(LED_RED,    red    ? LOW : HIGH);
    digitalWrite(LED_YELLOW, yellow ? LOW : HIGH);
    digitalWrite(LED_BLUE,   blue   ? LOW : HIGH);
}

void tempLedTask(void* param) {
    // [온도] AHT20 주기적 읽기 및 LED 제어 태스크
    float temp, humi;
    for (;;) {
        bool ok = aht20_read(temp, humi);
        if (ok) {
            // [OLED] 온도/습도 화면 출력
            oled.clear();
            oled.drawString(0, 0, "Temp/Humi Monitor");
            char buf[32];
            snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
            oled.drawString(0, 16, buf);
            snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
            oled.drawString(0, 32, buf);

            if (temp < 20.0f) {
                // [LED] 낮은 온도: 파랑
                setLedColor(false, false, true);
                oled.drawString(0, 48, "LOW  -> BLUE");
            } else if (temp < 28.0f) {
                // [LED] 보통 온도: 노랑
                setLedColor(false, true, false);
                oled.drawString(0, 48, "NORM -> YELLOW");
            } else {
                // [LED] 높은 온도: 빨강
                setLedColor(true, false, false);
                oled.drawString(0, 48, "HIGH -> RED");
            }
            oled.display();

            // [시리얼] 디버그 출력
            Serial.printf("[TEMP] %.1f°C  %.1f%%\n", temp, humi);
        } else {
            // [에러] 센서 읽기 실패
            Serial.println("[TEMP] AHT20 read failed");
        }
        vTaskDelay(pdMS_TO_TICKS(2000)); // [태스크] 2초 간격
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // [초기화] 핀/OLED/I2C 초기화
    initBLE();       // [BLE] OTA 초기화

    // [태스크] 온도 감지 및 LED 제어 태스크 생성
    xTaskCreate(tempLedTask, "TempLED", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}