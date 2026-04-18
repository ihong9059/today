void ledBlinkTask(void *param) {
    // [LED] 완료 시 전체 LED 점멸 10회
    for (int i = 0; i < 10; i++) {
        digitalWrite(LED_RED,    LOW);
        digitalWrite(LED_YELLOW, LOW);
        digitalWrite(LED_BLUE,   LOW);
        delay(300);
        digitalWrite(LED_RED,    HIGH);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE,   HIGH);
        delay(300);
    }
    vTaskDelete(NULL);
}

void playCompleteMelody() {
    // [멜로디] 라면 완성 알림 멜로디 (도미솔도 상승)
    int notes[]    = {523, 659, 784, 1047, 784, 1047};
    int durations[] = {150, 150, 150, 400,  150, 600};
    for (int i = 0; i < 6; i++) {
        tone(33, notes[i], durations[i]);
        delay(durations[i] + 50);
    }
    noTone(33);
}

void ramenTimerTask(void *param) {
    // [타이머] 180초 카운트다운 시작
    int remaining = 180;

    while (remaining > 0) {
        int mins = remaining / 60;
        int secs = remaining % 60;

        char timeBuf[8];
        sprintf(timeBuf, "%d:%02d", mins, secs);

        // [OLED] 남은 시간 표시
        oled.clear();
        oled.drawString(18, 0,  "Ramen Timer");
        oled.drawString(0,  16, "-------------------");
        oled.drawString(35, 30, timeBuf);         // 큰 숫자 중앙
        oled.drawString(0,  50, "Press wait...");
        oled.display();

        // [딜레이] 1초 대기 후 감소
        delay(1000);
        remaining--;
    }

    // [완료] 타이머 종료 메시지
    oled.clear();
    oled.drawString(10, 10, "TIME IS UP!");
    oled.drawString(5,  30, "Enjoy Ramen! :)");
    oled.display();

    // [멜로디] 완료 멜로디 재생
    playCompleteMelody();

    // [LED] 점멸 태스크 실행
    xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, NULL);

    vTaskDelete(NULL);
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 핀 초기화 (LED, 버저, OLED)
    initBLE();        // BLE OTA 초기화

    // [태스크] 라면 타이머 태스크 생성
    xTaskCreate(ramenTimerTask, "ramenTimer", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}