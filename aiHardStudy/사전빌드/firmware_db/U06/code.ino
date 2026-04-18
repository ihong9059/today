// [게임] 빨리 누르기 대결 전역 변수
volatile int pressCount = 0;
volatile bool lastBtnState = HIGH;

void showOled(const char* line1, const char* line2) {
    // [OLED] 두 줄 출력 헬퍼
    oled.clear();
    oled.drawString(0, 0, line1);
    oled.drawString(0, 20, line2);
    oled.display();
}

void waitButtonRelease() {
    // [입력] 버튼 떼질 때까지 대기 (디바운스)
    delay(50);
    while (digitalRead(32) == LOW) delay(10);
}

void resultLightShow() {
    // [연출] 결과 LED 점멸 3회
    for (int i = 0; i < 3; i++) {
        digitalWrite(LED_RED, LOW);   delay(80);
        digitalWrite(LED_RED, HIGH);
        digitalWrite(LED_YELLOW, LOW); delay(80);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_BLUE, LOW);  delay(80);
        digitalWrite(LED_BLUE, HIGH);
        delay(80);
    }
}

void gameTask(void* param) {
    while (true) {
        // [대기] 시작 안내 화면
        showOled("BUTTON DASH!", "Press to START");

        // [대기] 버튼 눌릴 때까지 polling
        while (digitalRead(32) == HIGH) delay(10);
        waitButtonRelease();

        // [카운트다운] 3-2-1
        const int countFreqs[] = {600, 800, 1000};
        for (int i = 3; i > 0; i--) {
            oled.clear();
            oled.drawString(0, 0, "READY...");
            oled.drawString(48, 20, String(i).c_str());
            oled.display();
            tone(33, countFreqs[3 - i], 250);
            delay(1000);
        }

        // [시작] GO! 화면 및 신호음
        showOled("   >> GO!! <<", "");
        tone(33, 1500, 400);
        delay(400);

        // [초기화] 게임 변수 리셋
        pressCount = 0;
        lastBtnState = HIGH;
        unsigned long startMs = millis();

        // [게임] 10초 메인 루프
        while (millis() - startMs < 10000UL) {
            bool cur = (bool)digitalRead(32);

            // [입력] 하강 엣지 = 새 눌림
            if (cur == LOW && lastBtnState == HIGH) {
                pressCount++;
                digitalWrite(LED_BLUE, LOW);                    // [LED] 누름 표시
                tone(33, min(800 + pressCount * 15, 2000), 25); // [버저] 고음 증가
            } else if (cur == HIGH && lastBtnState == LOW) {
                digitalWrite(LED_BLUE, HIGH); // [LED] 떼면 끔
            }
            lastBtnState = cur;

            // [OLED] 남은 시간 + 현재 횟수 실시간 표시
            int remain = 10 - (int)((millis() - startMs) / 1000);
            oled.clear();
            oled.drawString(0, 0,  ("Time: " + String(remain) + "s").c_str());
            oled.drawString(0, 20, ("Count: " + String(pressCount)).c_str());
            oled.display();

            delay(15); // [루프] 15ms 간격 (반응성 확보)
        }

        // [종료] 게임 종료 버저
        tone(33, 350, 600);
        delay(700);

        // [결과] 최종 점수 OLED 표시
        oled.clear();
        oled.drawString(0, 0, "== RESULT ==");
        oled.drawString(0, 20, ("Score: " + String(pressCount) + " hits").c_str());
        oled.display();

        // [BLE] 최종 점수 BLE 전송 (Serial 병행)
        String bleMsg = "SCORE:" + String(pressCount);
        Serial.println("[BLE TX] " + bleMsg);  // 시리얼 모니터 확인용
        // bleNotify(bleMsg);                  // BLE 알림 전송 (OTA 채널)

        // [LED] 결과 연출 및 Yellow 켜서 종료 표시
        resultLightShow();
        digitalWrite(LED_YELLOW, LOW);
        delay(3000);
        digitalWrite(LED_YELLOW, HIGH);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware(); // [초기화] 핀/OLED/AHT20 초기화
    initBLE();      // [BLE] OTA BLE 초기화

    // [태스크] 게임 로직을 별도 태스크로 실행
    xTaskCreate(gameTask, "gameTask", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000); // [메인] BLE 스택에 CPU 양보
}