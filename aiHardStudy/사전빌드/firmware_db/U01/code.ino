// [게임 상태] 반응속도 게임 상태 머신
enum GameState { IDLE, WAITING, ACTIVE, RESULT };
volatile GameState gameState = IDLE;
volatile unsigned long reactionTime = 0;

// [BLE] 반응시간 전송용 특성 포인터
NimBLECharacteristic* pReactChar = nullptr;

// [OLED] 두 줄 텍스트 출력 헬퍼
void showOLED(const char* line1, const char* line2) {
    oled.clear();
    oled.drawString(0, 0, line1);
    oled.drawString(0, 24, line2);
    oled.display();
}

// [BLE] 반응시간 데이터 서비스 등록 (initBLE 이후 호출)
void setupReactionService() {
    NimBLEServer* pServer = NimBLEDevice::getServer();
    if (!pServer) return;
    // [서비스] 반응속도 전용 UUID 서비스 추가
    NimBLEService* pSvc = pServer->createService("AA10");
    pReactChar = pSvc->createCharacteristic(
        "AA11",
        NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ
    );
    pSvc->start();
    NimBLEDevice::getAdvertising()->start();
}

// [BLE 전송] 반응시간 문자열 notify
void sendReactionBLE(unsigned long ms) {
    if (!pReactChar) return;
    char buf[32];
    snprintf(buf, sizeof(buf), "reaction:%lums", ms);
    pReactChar->setValue(std::string(buf));
    pReactChar->notify();
}

// [멜로디] 성공 비프음
void beepSuccess() {
    tone(33, 1200, 100);
    delay(120);
    tone(33, 1600, 150);
    delay(160);
    noTone(33);
}

// [멜로디] 실패(너무 일찍) 비프음
void beepFail() {
    tone(33, 300, 400);
    delay(410);
    noTone(33);
}

// [게임 태스크] 반응속도 게임 메인 루프
void gameTask(void* pvParameters) {
    bool prevBtn = true; // INPUT_PULLUP: 기본 HIGH

    while (true) {
        bool btn = (digitalRead(32) == LOW); // 스위치 눌림 감지
        bool btnFall = btn && !prevBtn;       // 하강 엣지만 처리
        prevBtn = btn;

        switch (gameState) {

            case IDLE:
                // [대기] 스위치 누르면 게임 시작
                if (btnFall) {
                    showOLED("준비 중...", "기다리세요!");
                    digitalWrite(LED_BLUE, LOW);   // 파란LED 켜기 (준비)
                    gameState = WAITING;
                }
                break;

            case WAITING: {
                // [랜덤 대기] 1~5초 랜덤 후 LED 점등
                unsigned long waitMs = random(1000, 5001);
                unsigned long t0 = millis();
                bool tooEarly = false;

                while (millis() - t0 < waitMs) {
                    if (digitalRead(32) == LOW) {
                        // [부정 클릭] 너무 일찍 누름 → 페널티
                        tooEarly = true;
                        break;
                    }
                    vTaskDelay(5 / portTICK_PERIOD_MS);
                }

                digitalWrite(LED_BLUE, HIGH); // 파란LED 끄기

                if (tooEarly) {
                    showOLED("너무 일찍!", "다시 시작하세요");
                    beepFail();
                    Serial.println("[FAIL] 너무 일찍 눌렀습니다");
                    vTaskDelay(2000 / portTICK_PERIOD_MS);
                    showOLED("반응속도 게임", "스위치 눌러 시작");
                    gameState = IDLE;
                } else {
                    // [신호] 빨간LED 켜기 → 지금 누르세요!
                    digitalWrite(LED_RED, LOW);
                    showOLED("지금 누르세요!", ">");
                    reactionTime = millis(); // 타이머 시작
                    gameState = ACTIVE;
                }
                break;
            }

            case ACTIVE:
                // [감지] 스위치 하강 엣지 → 반응시간 측정
                if (btnFall) {
                    unsigned long elapsed = millis() - reactionTime;
                    reactionTime = elapsed;
                    digitalWrite(LED_RED, HIGH); // 빨간LED 끄기

                    // [결과] 등급별 LED 표시
                    if (elapsed < 300) {
                        digitalWrite(LED_YELLOW, LOW); // 노란 = 보통
                    }
                    if (elapsed < 200) {
                        digitalWrite(LED_YELLOW, HIGH);
                        digitalWrite(LED_BLUE, LOW);   // 파란 = 빠름
                    }

                    // [OLED] 결과 출력
                    char line2[24];
                    snprintf(line2, sizeof(line2), "%lu ms", elapsed);
                    showOLED("반응시간:", line2);

                    // [BLE 전송] 반응시간 notify
                    sendReactionBLE(elapsed);
                    Serial.printf("[RESULT] 반응시간: %lu ms\n", elapsed);

                    beepSuccess();
                    gameState = RESULT;
                }
                break;

            case RESULT:
                // [재시작] 결과 확인 후 스위치 누르면 초기화
                if (btnFall) {
                    digitalWrite(LED_YELLOW, HIGH);
                    digitalWrite(LED_BLUE, HIGH);
                    showOLED("반응속도 게임", "스위치 눌러 시작");
                    gameState = IDLE;
                }
                break;
        }

        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();  // LED, 버저, OLED 핀 초기화
    initBLE();       // BLE OTA 초기화

    // [BLE 서비스] 반응시간 전송용 특성 등록
    setupReactionService();

    // [초기화] 모든 LED OFF
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);

    showOLED("반응속도 게임", "스위치 눌러 시작");

    // [FreeRTOS] 게임 태스크 생성
    xTaskCreate(gameTask, "gameTask", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000); // [루프] BLE OTA 처리 위임
}