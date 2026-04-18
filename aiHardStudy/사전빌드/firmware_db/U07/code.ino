// [룰렛] LED 핀 배열 및 이름
const int LEDS[]       = {LED_RED, LED_YELLOW, LED_BLUE};
const char* NAMES[]    = {"RED", "YELLOW", "BLUE"};

volatile bool spinning = false;

// [BLE] 베이스 펌웨어가 제공하는 알림 전송 함수
extern void bleNotify(const char* msg);

// [유틸] 모든 LED 끄기
void allLedsOff() {
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
}

// [룰렛] 회전 태스크: 빠르게 시작 → 점점 감속 → 최종 색 결정
void rouletteTask(void* pv) {
    int delayMs   = 60;
    int totalStep = 20 + (int)(esp_random() % 12); // 랜덤 스텝
    int cur       = 0;

    // [룰렛] 회전 시작 부저 피드백
    digitalWrite(BUZZER, LOW);
    delay(80);
    digitalWrite(BUZZER, HIGH);

    for (int step = 0; step < totalStep; step++) {
        cur = step % 3;
        allLedsOff();
        digitalWrite(LEDS[cur], LOW);  // [룰렛] 해당 LED 점등
        delay(delayMs);

        // [룰렛] 후반부 감속 구간
        if (step > totalStep / 2) {
            delayMs += 30;
        } else if (step > totalStep / 3) {
            delayMs += 10;
        }
    }

    // [룰렛] 최종 LED 확정
    allLedsOff();
    digitalWrite(LEDS[cur], LOW);

    // [멜로디] 당첨 효과음
    tone(33, 880, 150); delay(180);
    tone(33, 1047, 200); delay(230);
    noTone(33);

    // [OLED] 결과 표시
    oled.clear();
    oled.drawString(0, 0,  "=== RESULT ===");
    oled.drawString(20, 20, NAMES[cur]);
    oled.drawString(0, 40, "Tap SPIN again");
    oled.display();

    // [BLE] 결과 문자열 전송 ("RESULT:RED" 등)
    char msg[32];
    snprintf(msg, sizeof(msg), "RESULT:%s", NAMES[cur]);
    bleNotify(msg);
    Serial.println(msg);

    spinning = false;
    vTaskDelete(NULL);
}

// [BLE] 스마트폰 → 보드 수신 콜백 (베이스 펌웨어에서 호출)
void onBleWrite(String data) {
    data.trim();
    if (data.equalsIgnoreCase("SPIN") && !spinning) {
        spinning = true;
        // [룰렛] 별도 태스크에서 애니메이션 실행
        xTaskCreate(rouletteTask, "roulette", 4096, NULL, 2, NULL);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    randomSeed(esp_random()); // [랜덤] ESP32 하드웨어 난수로 시드

    // [OLED] 초기 대기 화면
    oled.clear();
    oled.drawString(0,  0, "LED Roulette");
    oled.drawString(0, 16, "BLE: Send SPIN");
    oled.drawString(0, 32, "R / Y / B");
    oled.display();

    Serial.println("[READY] BLE로 SPIN 전송 시 룰렛 시작");
}

void loop() {
    delay(10000);
}