// [경찰차 사이렌] 높은음↔낮은음 반복 + 적청 LED 교차 점멸

#define SIREN_HIGH 1400  // 높은 주파수 (Hz)
#define SIREN_LOW   800  // 낮은 주파수 (Hz)
#define SIREN_DUR   500  // 각 음 지속시간 (ms)

void ledSirenTask(void *param) {
    // [LED] 적색↔청색 교차 점멸 (경찰차 효과)
    while (true) {
        digitalWrite(LED_RED, LOW);    // 적색 ON
        digitalWrite(LED_BLUE, HIGH);  // 청색 OFF
        delay(SIREN_DUR);
        digitalWrite(LED_RED, HIGH);   // 적색 OFF
        digitalWrite(LED_BLUE, LOW);   // 청색 ON
        delay(SIREN_DUR);
    }
}

void sirenTask(void *param) {
    // [사이렌] 높은음↔낮은음 무한 반복
    while (true) {
        tone(33, SIREN_HIGH, SIREN_DUR);  // 높은음
        delay(SIREN_DUR);
        tone(33, SIREN_LOW, SIREN_DUR);   // 낮은음
        delay(SIREN_DUR);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [OLED] 상태 표시
    oled.clear();
    oled.drawString(0, 0, "Police Siren");
    oled.drawString(0, 16, "HIGH<->LOW");
    oled.display();

    // [태스크] LED 점멸 태스크 생성
    xTaskCreate(ledSirenTask, "ledSiren", 2048, NULL, 1, NULL);
    // [태스크] 사이렌 음 태스크 생성
    xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}