// [퀴즈 타이머] 남은 시간별 LED 색상: 파랑(7-10초) 노랑(4-6초) 빨강(1-3초)
volatile bool timerRunning = false;

void setTimerLED(int remaining) {
    // [LED] 남은 시간에 따라 색상 전환
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    if      (remaining > 6) digitalWrite(LED_BLUE,   LOW); // 여유
    else if (remaining > 3) digitalWrite(LED_YELLOW, LOW); // 주의
    else if (remaining > 0) digitalWrite(LED_RED,    LOW); // 위험
}

void updateOledTimer(int remaining) {
    // [OLED] 카운트다운 숫자 및 상태 표시
    oled.clear();
    oled.drawString(0, 0, "[ Quiz Timer ]");
    char buf[20];
    sprintf(buf, "  %2d sec", remaining);
    oled.drawString(0, 18, buf);
    if      (remaining > 6) oled.drawString(0, 38, "BLUE   - OK");
    else if (remaining > 3) oled.drawString(0, 38, "YELLOW - Hurry!");
    else if (remaining > 0) oled.drawString(0, 38, "RED    - Rush!!!");
    else                    oled.drawString(0, 38, "*** TIME UP ***");
    oled.display();
}

void timerTask(void* param) {
    // [타이머 태스크] 스위치 감지 후 10초 카운트다운 실행
    while (true) {
        if (digitalRead(32) == LOW) {
            delay(50); // [디바운스] 채터링 방지
            if (digitalRead(32) == LOW && !timerRunning) {
                timerRunning = true;
                while (digitalRead(32) == LOW) vTaskDelay(10 / portTICK_PERIOD_MS); // [대기] 버튼 떼기

                for (int t = 10; t >= 0; t--) {
                    setTimerLED(t);
                    updateOledTimer(t);

                    if (t == 0) {
                        // [버저] 시간 초과 경보음 3연타
                        tone(33, 1000, 200); delay(280);
                        tone(33, 800,  200); delay(280);
                        tone(33, 600,  500); delay(600);
                        // [LED] 빨간 LED 깜빡임 4회
                        for (int i = 0; i < 4; i++) {
                            digitalWrite(LED_RED, LOW);  delay(150);
                            digitalWrite(LED_RED, HIGH); delay(150);
                        }
                    } else {
                        // [버저] 3초 이하 긴박한 고음, 그 외 일반 틱
                        tone(33, (t <= 3) ? 1600 : 880, 60);
                        delay(1000);
                    }
                }

                // [복귀] 모든 LED 끄고 대기 화면으로
                digitalWrite(LED_RED,    HIGH);
                digitalWrite(LED_YELLOW, HIGH);
                digitalWrite(LED_BLUE,   HIGH);
                oled.clear();
                oled.drawString(0, 0,  "[ Quiz Timer ]");
                oled.drawString(0, 22, "  Press SW");
                oled.drawString(0, 38, "  to Start");
                oled.display();
                timerRunning = false;
            }
        }
        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // [초기화] 핀·OLED·Wire 초기화
    initBLE();       // [BLE] OTA 초기화

    // [LED] 초기 모두 끄기
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);

    // [OLED] 대기 화면 표시
    oled.clear();
    oled.drawString(0, 0,  "[ Quiz Timer ]");
    oled.drawString(0, 22, "  Press SW");
    oled.drawString(0, 38, "  to Start");
    oled.display();

    // [태스크] 타이머 태스크 생성
    xTaskCreate(timerTask, "timerTask", 3072, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}