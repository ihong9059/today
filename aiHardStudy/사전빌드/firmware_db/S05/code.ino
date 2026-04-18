// [세탁기] 기본 설정값
#define WASH_MINUTES      30
#define BLE_SEND_INTERVAL 1000

// [BLE] Nordic UART Service TX 특성 UUID
#define NUS_SVC_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define NUS_TX_UUID  "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

// [타이머] 세탁 상태 전역 변수
unsigned long washStartTime  = 0;
unsigned long washDurationMs = (unsigned long)WASH_MINUTES * 60UL * 1000UL;
bool washRunning = false;
bool washDone    = false;

// [OLED] 남은 시간 카운트다운 표시
void displayCountdown(long remainMs) {
    char buf[16];
    oled.clear();
    oled.drawString(0, 0, "* Laundry Timer *");
    if (remainMs <= 0) {
        oled.drawString(22, 24, "DONE!");
        oled.drawString(4, 44, "세탁 완료!");
    } else {
        long s = remainMs / 1000;
        sprintf(buf, "%02d:%02d", (int)(s / 60), (int)(s % 60));
        oled.drawString(30, 24, buf);
        oled.drawString(8, 44, "남은 시간");
    }
    oled.display();
}

// [BLE] 문자열 알림 전송 (NUS TX 특성 이용)
void sendBleNotify(const char* msg) {
    Serial.println(msg);
    NimBLEServer* svr = NimBLEDevice::getServer();
    if (!svr || svr->getConnectedCount() == 0) return;
    NimBLEService* svc = svr->getServiceByUUID(NUS_SVC_UUID);
    if (!svc) return;
    NimBLECharacteristic* chr = svc->getCharacteristic(NUS_TX_UUID);
    if (!chr) return;
    chr->setValue(msg);
    chr->notify();
}

// [멜로디] 세탁 완료 알림음 (도-미-솔-도-솔-도-높은도)
void playDoneMelody() {
    int notes[] = {523, 659, 784, 1047, 784, 1047, 1319};
    int durs[]  = {200, 200, 200,  300, 200,  300,  500};
    for (int i = 0; i < 7; i++) {
        tone(33, notes[i], durs[i]);
        delay(durs[i] + 60);
    }
    noTone(33);
}

// [LED] 완료 시 순차 점멸 태스크 (R→Y→B 반복)
void ledDoneTask(void* param) {
    int leds[] = {LED_RED, LED_YELLOW, LED_BLUE};
    for (int round = 0; round < 12; round++) {
        for (int i = 0; i < 3; i++) {
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   HIGH);
            digitalWrite(leds[i], LOW); // [LED] 해당 색상만 ON
            vTaskDelay(pdMS_TO_TICKS(180));
        }
    }
    // [LED] 모두 소등
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    vTaskDelete(NULL);
}

// [메인] 세탁 타이머 FreeRTOS 태스크
void washTask(void* param) {
    int  prevSw     = HIGH;
    bool donePlayed = false;
    unsigned long lastBleTime = 0;
    char lineBuf[32];

    // [초기화] 대기 화면 표시
    oled.clear();
    oled.drawString(0,  0, "Laundry Timer");
    oled.drawString(0, 18, "SW: Start/Reset");
    sprintf(lineBuf, "Set: %d min", WASH_MINUTES);
    oled.drawString(0, 36, lineBuf);
    oled.display();

    while (true) {
        // [스위치] LOW 엣지 감지 → 시작 또는 리셋
        int sw = digitalRead(32);
        if (prevSw == HIGH && sw == LOW) {
            vTaskDelay(pdMS_TO_TICKS(50)); // 디바운스
            if (digitalRead(32) == LOW) {
                washStartTime = millis();
                washRunning   = true;
                washDone      = false;
                donePlayed    = false;
                lastBleTime   = 0;
                Serial.println("[세탁] 시작!");
            }
        }
        prevSw = sw;

        if (washRunning) {
            unsigned long elapsed = millis() - washStartTime;

            if (elapsed >= washDurationMs) {
                // [완료] 최초 1회만 처리
                if (!washDone) {
                    washDone    = true;
                    washRunning = false;
                    displayCountdown(0);
                    sendBleNotify("WASH_DONE");
                    playDoneMelody(); // 태스크 내 블로킹 OK
                    xTaskCreate(ledDoneTask, "ledDone", 2048, NULL, 2, NULL);
                }
            } else {
                // [카운트다운] OLED 갱신
                long remainMs = (long)(washDurationMs - elapsed);
                displayCountdown(remainMs);

                // [BLE] 1초마다 남은 시간 전송
                unsigned long now = millis();
                if (now - lastBleTime >= (unsigned long)BLE_SEND_INTERVAL) {
                    lastBleTime = now;
                    long s = remainMs / 1000;
                    sprintf(lineBuf, "REMAIN:%02d:%02d", (int)(s / 60), (int)(s % 60));
                    sendBleNotify(lineBuf);
                }
            }
        }

        vTaskDelay(pdMS_TO_TICKS(500)); // 500ms 주기 갱신
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();
    xTaskCreate(washTask, "washTask", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}