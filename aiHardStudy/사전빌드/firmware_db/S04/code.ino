// [시계] 현재 시간 (millis 기반, 시작: 08:00:00)
int curHour = 8, curMin = 0, curSec = 0;
// [알람] 알람 시간 설정
int alarmHour = 8, alarmMin = 0, alarmSec = 30;
// [상태] 알람 활성 플래그
volatile bool alarmActive = false;
volatile bool alarmTriggered = false;

// [멜로디] 알람 음계 및 박자
int melody[] = {523, 659, 784, 1047, 784, 659, 523, 523};
int mDur[]   = {150, 150, 150, 300,  150, 150, 150, 300};

// [LED] 알람 중 LED 교차 점멸 태스크
void ledFlashTask(void *param) {
    while (alarmActive) {
        digitalWrite(LED_RED,  LOW);   // 빨강 ON
        digitalWrite(LED_BLUE, HIGH);  // 파랑 OFF
        vTaskDelay(200 / portTICK_PERIOD_MS);
        digitalWrite(LED_RED,  HIGH);  // 빨강 OFF
        digitalWrite(LED_BLUE, LOW);   // 파랑 ON
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
    // 알람 종료 후 LED 끄기
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    vTaskDelete(NULL);
}

// [알람] 멜로디 반복 + 스위치로 끄기 태스크
void alarmTask(void *param) {
    alarmActive = true;
    xTaskCreate(ledFlashTask, "LedFlash", 1024, NULL, 1, NULL);

    while (alarmActive) {
        // [스위치] GPIO32 LOW 감지 시 알람 해제
        if (digitalRead(32) == LOW) {
            alarmActive = false;
            noTone(33);
            break;
        }
        // [멜로디] 한 사이클 재생
        for (int i = 0; i < 8; i++) {
            if (digitalRead(32) == LOW) { alarmActive = false; break; }
            tone(33, melody[i], mDur[i]);
            delay(mDur[i] + 40);
        }
        noTone(33);
        // [대기] 스위치 확인 간격
        for (int w = 0; w < 5 && alarmActive; w++) {
            if (digitalRead(32) == LOW) alarmActive = false;
            delay(100);
        }
    }
    noTone(33);
    alarmTriggered = false;
    vTaskDelete(NULL);
}

// [시계] 1초마다 시간 갱신, OLED 표시, 알람 체크
void clockTask(void *param) {
    unsigned long prev = millis();
    char buf[20];

    while (true) {
        if (millis() - prev >= 1000) {
            prev += 1000;

            // [시간] 초 증가 및 올림
            if (++curSec >= 60) { curSec = 0;
            if (++curMin >= 60) { curMin = 0;
            if (++curHour >= 24) curHour = 0; }}

            // [OLED] 화면 갱신
            oled.clear();
            if (alarmActive) {
                oled.drawString(32, 0, "ALARM!");   // 알람 중 상단 표시
            } else {
                oled.drawString(16, 0, "SmartClock");
            }
            sprintf(buf, "%02d:%02d:%02d", curHour, curMin, curSec);
            oled.drawString(16, 22, buf);           // 현재 시간 표시
            sprintf(buf, "AL%02d:%02d:%02d", alarmHour, alarmMin, alarmSec);
            oled.drawString(12, 44, buf);           // 알람 시간 표시
            oled.display();

            // [알람] 설정 시간 도달 시 알람 태스크 시작
            if (!alarmTriggered &&
                curHour == alarmHour &&
                curMin  == alarmMin  &&
                curSec  == alarmSec) {
                alarmTriggered = true;
                xTaskCreate(alarmTask, "Alarm", 4096, NULL, 2, NULL);
            }
        }
        delay(50);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();   // 핀 초기화 (LED, 버저, OLED)
    initBLE();        // BLE OTA 초기화

    // [시작] 초기 화면 출력
    oled.clear();
    oled.drawString(16, 20, "SmartClock");
    oled.drawString(8,  40, "Initializing");
    oled.display();

    delay(1000);
    // [태스크] 시계 태스크 생성
    xTaskCreate(clockTask, "Clock", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}