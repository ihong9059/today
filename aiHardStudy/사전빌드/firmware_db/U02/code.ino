// [BLE] 주사위 결과 알림 캐릭터리스틱
static NimBLECharacteristic* pDiceChar = nullptr;

// [LED] 주사위 숫자만큼 파란 LED 깜빡임 태스크
void ledBlinkTask(void* param) {
    int count = (int)(intptr_t)param;
    for (int i = 0; i < count; i++) {
        digitalWrite(LED_BLUE, LOW);   // 파란 LED 켜기
        delay(150);
        digitalWrite(LED_BLUE, HIGH);  // 파란 LED 끄기
        delay(150);
    }
    vTaskDelete(NULL);
}

// [사운드] 주사위 굴리기 효과음
void playRollSound() {
    tone(33, 300, 80);  delay(90);
    tone(33, 400, 80);  delay(90);
    tone(33, 500, 80);  delay(90);
    tone(33, 650, 150); delay(160);
    noTone(33);
}

// [사운드] 결과 확정음 (숫자별 음계)
void playResultSound(int dice) {
    int notes[] = {0, 262, 294, 330, 349, 392, 440}; // 1~6: C~A
    tone(33, notes[dice], 300);
    delay(350);
    noTone(33);
}

// [주사위] 굴리기 애니메이션 + 최종 결과 반환
int rollAnimation() {
    // [OLED] 빠르게 숫자 바꾸며 굴리기 효과
    for (int i = 0; i < 14; i++) {
        oled.clear();
        oled.drawString(0, 0, "  Rolling...");
        char buf[4];
        snprintf(buf, sizeof(buf), "%d", random(1, 7));
        oled.drawString(56, 28, buf);  // 중앙에 크게 표시
        oled.display();
        delay(60 + i * 18);            // 점점 느려짐
    }
    return random(1, 7);               // 최종 결과
}

// [버튼] 스위치 감지 + 게임 진행 태스크
void diceGameTask(void* param) {
    bool lastBtn = HIGH;

    while (true) {
        bool curBtn = (bool)digitalRead(32);

        if (lastBtn == HIGH && curBtn == LOW) {  // [스위치] 눌림 감지
            delay(50);                            // 디바운스
            if (digitalRead(32) == LOW) {
                digitalWrite(LED_RED, LOW);        // [LED] 진행 중 표시

                playRollSound();
                int dice = rollAnimation();

                // [OLED] 결과 화면
                oled.clear();
                oled.drawString(0,  0, "== Dice Game ==");
                oled.drawString(0, 16, "Result:");
                char resBuf[16];
                snprintf(resBuf, sizeof(resBuf), "  [%d]", dice);
                oled.drawString(0, 32, resBuf);
                char subBuf[24];
                snprintf(subBuf, sizeof(subBuf), "BLE sent: Dice=%d", dice);
                oled.drawString(0, 48, subBuf);
                oled.display();

                playResultSound(dice);

                // [BLE] 결과 전송 (NOTIFY)
                if (pDiceChar != nullptr) {
                    char bleBuf[16];
                    snprintf(bleBuf, sizeof(bleBuf), "Dice:%d", dice);
                    pDiceChar->setValue((uint8_t*)bleBuf, strlen(bleBuf));
                    pDiceChar->notify();
                }
                Serial.printf("[주사위] 결과: %d → BLE 전송 완료\n", dice);

                // [LED] 숫자만큼 파란 LED 깜빡임
                xTaskCreate(ledBlinkTask, "ledBlink", 2048,
                            (void*)(intptr_t)dice, 1, NULL);

                digitalWrite(LED_RED, HIGH);       // [LED] 진행 끝
                while (digitalRead(32) == LOW) delay(10); // 버튼 해제 대기
            }
        }

        lastBtn = curBtn;
        delay(20);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 핀 초기화
    initBLE();        // BLE OTA 초기화

    // [BLE] 주사위 전용 서비스/캐릭터리스틱 등록
    NimBLEServer*        pServer = NimBLEDevice::getServer();
    NimBLEService*       pSvc    = pServer->createService("1819");
    pDiceChar = pSvc->createCharacteristic(
        "2A56",
        NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY
    );
    pSvc->start();

    // [랜덤] 하드웨어 엔트로피로 시드 초기화
    randomSeed(esp_random());

    // [OLED] 대기 화면
    oled.clear();
    oled.drawString(0,  0, "== Dice Game ==");
    oled.drawString(0, 20, " Press button!");
    oled.drawString(0, 40, "BLE Notify ON");
    oled.display();

    Serial.println("[시작] 주사위 게임 준비 완료, BLE 알림 활성화");

    // [태스크] 버튼 감지 태스크 생성
    xTaskCreate(diceGameTask, "diceGame", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);  // [BLE] 스택 운영 유지
}