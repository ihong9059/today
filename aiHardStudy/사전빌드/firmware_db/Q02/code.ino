// [설정] 발표 총 시간 (초)
#define TIMER_TOTAL_SEC 300  // 5분

volatile int remainSec = TIMER_TOTAL_SEC;
volatile bool running = false;
volatile bool finished = false;

// [태스크] 타이머 메인 루프
void timerTask(void *param) {
    unsigned long lastTick = millis();
    bool buzzed = false;

    while (true) {
        // [스위치] 버튼 누르면 시작 / 재시작
        if (digitalRead(32) == LOW) {
            delay(50);
            if (digitalRead(32) == LOW) {
                remainSec = TIMER_TOTAL_SEC;
                running = true;
                finished = false;
                buzzed = false;
                lastTick = millis();
                digitalWrite(LED_RED, HIGH);
                digitalWrite(LED_YELLOW, HIGH);
                digitalWrite(LED_BLUE, HIGH);
                noTone(33);
                while (digitalRead(32) == LOW) delay(10);
            }
        }

        // [카운트다운] 1초마다 감소
        if (running && !finished && millis() - lastTick >= 1000) {
            lastTick += 1000;
            if (remainSec > 0) remainSec--;
            if (remainSec == 0) {
                running = false;
                finished = true;
            }
        }

        // [OLED] 남은 시간 및 상태 표시
        char timeBuf[10];
        sprintf(timeBuf, "%02d:%02d", remainSec / 60, remainSec % 60);
        oled.clear();
        oled.drawString(16, 0, "-- TIMER --");
        oled.drawString(24, 20, timeBuf);
        if (finished) {
            oled.drawString(10, 48, "TIME  UP!");
        } else if (!running) {
            oled.drawString(4, 48, "BTN to Start");
        } else if (remainSec <= 60) {
            oled.drawString(4, 48, "1 min left!");
        } else {
            oled.drawString(16, 48, "Running...");
        }
        oled.display();

        // [LED/부저] 상태별 제어
        if (finished) {
            // 종료: 빨간 LED + 부저 3회
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE, HIGH);
            if (!buzzed) {
                buzzed = true;
                for (int i = 0; i < 3; i++) {
                    tone(33, 880, 400);
                    delay(550);
                }
                noTone(33);
            }
        } else if (running && remainSec <= 60) {
            // 1분 전: 노란 LED
            digitalWrite(LED_YELLOW, LOW);
            digitalWrite(LED_RED, HIGH);
            digitalWrite(LED_BLUE, HIGH);
        } else if (running) {
            // 진행 중: 파란 LED
            digitalWrite(LED_BLUE, LOW);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_RED, HIGH);
        } else {
            // 대기: 모든 LED 끄기
            digitalWrite(LED_RED, HIGH);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE, HIGH);
        }

        delay(200);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();
    // [태스크] 타이머 태스크 생성
    xTaskCreate(timerTask, "timer", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}