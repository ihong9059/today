// [전역] LED 상태 변수
bool ledState = false;

// [스위치] 버튼 감지 및 LED 토글 태스크
void switchTask(void *param) {
    bool lastBtn = HIGH;
    for (;;) {
        bool btn = digitalRead(32);
        // [엣지 감지] 버튼 눌림 순간 감지
        if (btn == LOW && lastBtn == HIGH) {
            ledState = !ledState;
            // [LED 토글] active LOW: ON=LOW, OFF=HIGH
            digitalWrite(LED_RED,    ledState ? LOW : HIGH);
            digitalWrite(LED_YELLOW, ledState ? LOW : HIGH);
            digitalWrite(LED_BLUE,   ledState ? LOW : HIGH);
            // [OLED] 현재 상태 표시
            oled.clear();
            oled.drawString(0, 0, "LED Toggle");
            oled.drawString(0, 16, ledState ? "State: ON" : "State: OFF");
            oled.display();
            // [시리얼] 디버그 출력
            Serial.println(ledState ? "LED ON" : "LED OFF");
            delay(50); // [디바운스] 채터링 방지
        }
        lastBtn = btn;
        delay(20); // [폴링] 20ms 간격
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();
    // [초기화] OLED 안내 메시지
    oled.clear();
    oled.drawString(0, 0, "LED Toggle");
    oled.drawString(0, 16, "Press SW32");
    oled.display();
    // [태스크] 스위치 감지 태스크 생성
    xTaskCreate(switchTask, "switchTask", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}