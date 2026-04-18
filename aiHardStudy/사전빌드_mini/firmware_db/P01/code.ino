// 반응속도 게임 상태 열거형
enum GameState { IDLE, COUNTDOWN, READY, RESULT };

volatile GameState gameState = IDLE;
volatile unsigned long ledOnTime = 0;
volatile unsigned long reactionTime = 0;
volatile bool buttonPressed = false;

// 결과 BLE 전송 및 OLED 표시
void showResult() {
    if (buttonPressed) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%lu ms", reactionTime);

        // OLED: 반응시간 표시
        oled.clear();
        oled.drawString(0, 0, "Reaction Time:");
        oled.drawString(0, 20, buf);
        oled.display();

        // BLE: 반응시간 전송
        if (deviceConnected && sensorChar) {
            char msg[64];
            snprintf(msg, sizeof(msg), "reaction:%lu", reactionTime);
            std::string s(msg);
            sensorChar->setValue(s);
            sensorChar->notify();
        }

        // 소리: 빠를수록 높은 음
        int freq = (int)map((long)reactionTime, 100, 1000, 2000, 400);
        freq = constrain(freq, 400, 2000);
        tone(2, freq, 400);

    } else {
        // OLED: 타임아웃 표시
        oled.clear();
        oled.drawString(0, 0, "Too Slow!");
        oled.drawString(0, 20, "Try again...");
        oled.display();

        // BLE: 타임아웃 전송
        if (deviceConnected && sensorChar) {
            std::string s = "reaction:timeout";
            sensorChar->setValue(s);
            sensorChar->notify();
        }

        // 소리: 낮은 실패음
        tone(2, 200, 600);
    }
}

// 반응속도 게임 메인 태스크
void gameTask(void* param) {
    bool lastBtn = HIGH;

    while (true) {
        // [대기] 게임 시작 전 OLED 안내
        gameState = COUNTDOWN;
        pixel.clear();
        pixel.show();

        oled.clear();
        oled.drawString(0, 0, "Reaction Game");
        oled.drawString(0, 20, "Wait for LED...");
        oled.display();

        // [랜덤 지연] 2~5초 랜덤 대기
        int waitMs = random(2000, 5000);
        vTaskDelay(waitMs / portTICK_PERIOD_MS);

        // [신호] LED 녹색 점등
        pixel.setPixelColor(0, pixel.Color(0, 255, 0));
        pixel.show();
        ledOnTime = millis();
        buttonPressed = false;
        gameState = READY;

        oled.clear();
        oled.drawString(0, 0, "PRESS NOW!");
        oled.display();

        // [입력 대기] 최대 3초 스위치 감지
        lastBtn = digitalRead(SWITCH_PIN);
        unsigned long waitStart = millis();

        while (millis() - waitStart < 3000) {
            bool curBtn = digitalRead(SWITCH_PIN);
            if (curBtn == LOW && lastBtn == HIGH) {
                // [성공] 버튼 눌림 감지
                reactionTime = millis() - ledOnTime;
                buttonPressed = true;
                break;
            }
            lastBtn = curBtn;
            vTaskDelay(5 / portTICK_PERIOD_MS);
        }

        // LED 끄기
        pixel.clear();
        pixel.show();
        gameState = RESULT;

        // [결과] OLED + BLE 전송 + 소리
        showResult();

        // 다음 라운드까지 대기
        vTaskDelay(3000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 핀/OLED/WS2812 초기화
    initBLE();        // BLE OTA 초기화

    randomSeed(analogRead(0)); // 랜덤 시드

    // 게임 태스크 시작 (코어 0)
    xTaskCreate(gameTask, "gameTask", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}