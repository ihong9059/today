// [알람] 빠른 LED 깜빡 + 빠른 비프 반복

void alarmTask(void* param) {
    // [알람] 무한 반복
    while (true) {
        // [LED] 빨간색 켜기
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
        pixel.show();
        // [비프] 2000Hz 100ms
        tone(2, 2000, 100);
        delay(100);

        // [LED] 끄기
        pixel.setPixelColor(0, pixel.Color(0, 0, 0));
        pixel.show();
        noTone(2);
        delay(100);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [OLED] 알람 메시지 표시
    oled.clear();
    oled.drawString(0, 0, "!! ALARM !!");
    oled.drawString(0, 16, "Fast Blink+Beep");
    oled.display();

    // [태스크] 알람 백그라운드 실행
    xTaskCreate(alarmTask, "alarm", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}