// [룰렛] LED 순서 배열 (RED→YELLOW→BLUE)
int roulLeds[] = {LED_RED, LED_YELLOW, LED_BLUE};
const char* roulNames[] = {"RED", "YELLOW", "BLUE"};

// [룰렛] 모든 LED 끄기
void allOff() {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
}

// [룰렛] 하나만 켜기
void onlyOn(int idx) {
    allOff();
    digitalWrite(roulLeds[idx], LOW);
}

// [룰렛] 메인 태스크
void rouletteTask(void* param) {
    while (true) {
        // [대기] OLED 안내 화면
        oled.clear();
        oled.drawString(0, 0, "=== ROULETTE ===");
        oled.drawString(0, 18, "Press SW");
        oled.drawString(0, 30, "to SPIN!");
        oled.display();
        allOff();

        // [입력] 버튼 누를 때까지 대기
        while (digitalRead(32) != LOW) delay(50);
        delay(50); // 디바운스
        while (digitalRead(32) == LOW) delay(10); // 떼기 대기

        // [룰렛] 랜덤 목적지 결정
        randomSeed(millis());
        int stopIdx = random(3);

        oled.clear();
        oled.drawString(0, 0, "SPINNING...");
        oled.display();

        // [룰렛] 빠르게 순환 후 점점 느려지기
        int cur = 0;
        int delayMs = 60;
        int totalSteps = 36; // 3의 배수로 균등 시작

        for (int step = 0; step < totalSteps; step++) {
            onlyOn(cur);
            tone(33, 500 + cur * 150, 12); // 각 LED마다 다른 음

            delay(delayMs);

            // [속도] step 12 이후 점점 느려짐
            if (step >= 12) {
                delayMs += (step - 11) * 12;
            }

            cur = (cur + 1) % 3;
        }

        // [정렬] 목적지 LED까지 느리게 마무리
        while (cur != stopIdx) {
            onlyOn(cur);
            tone(33, 500 + cur * 150, 20);
            delay(delayMs);
            cur = (cur + 1) % 3;
        }

        // [결과] 최종 LED 점등
        onlyOn(stopIdx);

        // [OLED] 결과 표시
        oled.clear();
        oled.drawString(0, 0, "** RESULT **");
        oled.drawString(0, 18, roulNames[stopIdx]);
        oled.drawString(0, 35, "WINNER!");
        oled.display();

        // [멜로디] 당첨 효과음
        int melody[] = {523, 659, 784, 1047};
        int dur[]    = {120, 120, 120, 300};
        for (int i = 0; i < 4; i++) {
            tone(33, melody[i], dur[i]);
            delay(dur[i] + 40);
        }
        noTone(33);

        // [깜빡] 당첨 LED 깜빡임 5회
        for (int i = 0; i < 5; i++) {
            digitalWrite(roulLeds[stopIdx], HIGH);
            delay(180);
            digitalWrite(roulLeds[stopIdx], LOW);
            delay(180);
        }

        delay(2000);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [태스크] 룰렛 태스크 생성
    xTaskCreate(rouletteTask, "roulette", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}