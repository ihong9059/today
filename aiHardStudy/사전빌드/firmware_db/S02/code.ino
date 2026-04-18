// [방범] 알람 활성화 플래그
volatile bool alarmActive = false;

// [LED] 경보 점멸 태스크 (빨강→노랑→파랑 순환)
void ledBlinkTask(void *param) {
    while (true) {
        if (alarmActive) {
            digitalWrite(LED_RED,    LOW);  // 빨강 ON
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   HIGH);
            delay(120);
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, LOW);  // 노랑 ON
            digitalWrite(LED_BLUE,   HIGH);
            delay(120);
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   LOW);  // 파랑 ON
            delay(120);
        } else {
            // [대기] 전체 LED 소등
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   HIGH);
            delay(100);
        }
    }
}

// [방범] 스위치 감시 + 사이렌 + OLED 제어 태스크
void alarmTask(void *param) {
    while (true) {
        bool swReleased = (digitalRead(32) == HIGH); // 떼면 HIGH

        if (swReleased && !alarmActive) {
            // [경보] 스위치 개방 → 알람 시작
            alarmActive = true;
            Serial.println("[BLE-ALERT] Security breach detected!");

            oled.clear();
            oled.drawString(18, 0,  "!! ALERT !!");
            oled.drawString(0,  18, "SECURITY BREACH");
            oled.drawString(4,  36, "BLE ALARM SENT");
            oled.drawString(22, 52, "ARMED");
            oled.display();
        } else if (!swReleased && alarmActive) {
            // [해제] 스위치 눌림 → 알람 해제
            alarmActive = false;
            noTone(33);
            digitalWrite(BUZZER, HIGH); // 버저 OFF

            oled.clear();
            oled.drawString(8,  20, "SYSTEM NORMAL");
            oled.drawString(18, 40, "DISARMED");
            oled.display();
            Serial.println("[BLE-ALERT] Alarm cleared.");
        }

        if (alarmActive) {
            // [사이렌] 고저음 반복 + 버저 동시 활성
            digitalWrite(BUZZER, LOW);   // 능동 버저 ON
            tone(33, 880, 300);          // 저음
            delay(300);
            tone(33, 1760, 300);         // 고음
            delay(300);
        } else {
            delay(100);
        }
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // [초기화] 핀/OLED/AHT20 초기화
    initBLE();        // [BLE] OTA 및 BLE 초기화

    pinMode(32, INPUT_PULLUP); // [스위치] 풀업 입력 설정

    // [OLED] 대기 화면
    oled.clear();
    oled.drawString(10, 20, "SECURITY ARMED");
    oled.drawString(8,  40, "SWITCH TO ARM");
    oled.display();

    // [태스크] LED 점멸 태스크 (우선순위 높게)
    xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 2, NULL);
    // [태스크] 알람 감시 태스크
    xTaskCreate(alarmTask,    "alarm",    4096, NULL, 1, NULL);
}

void loop() {
    delay(10000); // [BLE] OTA 대기
}