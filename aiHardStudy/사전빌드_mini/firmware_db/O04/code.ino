// [세탁기 알림] 카운트다운 타이머 + BLE + 멜로디 + LED

const int WASH_MINUTES = 30;           // 기본 세탁 시간 (분)
int remainingSeconds = WASH_MINUTES * 60;
bool isRunning  = false;
bool isFinished = false;
bool lastSwitch = HIGH;
unsigned long lastTick    = 0;
unsigned long lastBleSend = 0;

// [멜로디] 완료 팡파레 음표/길이
int finMelody[] = { 523, 659, 784, 1047, 784, 1047, 1047 };
int finDur[]    = { 150, 150, 150, 400,  150, 150,  500  };

void playFinishMelody() {
    // 세탁 완료 멜로디 재생
    for (int i = 0; i < 7; i++) {
        tone(2, finMelody[i], finDur[i]);
        delay(finDur[i] + 40);
    }
    noTone(2);
    delay(300);
    // 추가 알림음 2회
    tone(2, 1047, 400); delay(500);
    tone(2, 1047, 400); delay(500);
    noTone(2);
}

void showCountdown() {
    // OLED에 남은 시간 표시
    oled.clear();
    int m = remainingSeconds / 60;
    int s = remainingSeconds % 60;
    char timeBuf[10];
    sprintf(timeBuf, "%02d:%02d", m, s);

    oled.drawString(10, 0,  "Laundry Timer");
    oled.drawString(20, 20, timeBuf);

    if (isFinished) {
        oled.drawString(10, 45, "** DONE! **");
    } else if (isRunning) {
        oled.drawString(5,  45, "Washing...");
        if (remainingSeconds <= 60)
            oled.drawString(70, 45, "Soon!");
    } else {
        oled.drawString(5, 45, "BTN: Start");
    }
    oled.display();
}

void sendBleStatus() {
    // BLE로 현재 상태 전송
    if (!deviceConnected || !sensorChar) return;
    char buf[32];
    int m = remainingSeconds / 60;
    int s = remainingSeconds % 60;
    if (isFinished)      sprintf(buf, "DONE");
    else if (isRunning)  sprintf(buf, "WASH:%02d:%02d", m, s);
    else                 sprintf(buf, "IDLE:%02d:%02d", m, s);
    std::string val = buf;
    sensorChar->setValue(val);
    sensorChar->notify();
}

void finishLedAnimation() {
    // 완료 LED 무지개 플래시
    uint32_t colors[] = {
        pixel.Color(255,0,0), pixel.Color(255,128,0),
        pixel.Color(255,255,0), pixel.Color(0,255,0),
        pixel.Color(0,0,255),   pixel.Color(128,0,255)
    };
    for (int rep = 0; rep < 3; rep++) {
        for (int c = 0; c < 6; c++) {
            pixel.setPixelColor(0, colors[c]);
            pixel.show(); delay(150);
        }
    }
    // 완료 후 흰색 유지
    pixel.setPixelColor(0, pixel.Color(80, 80, 80));
    pixel.show();
}

void onBleReceive(String cmd) {
    // BLE 명령 처리: START / STOP / RESET / SET:분
    cmd.trim();
    if (cmd == "START" && !isRunning) {
        isRunning  = true;
        isFinished = false;
        lastTick   = millis();
        pixel.setPixelColor(0, pixel.Color(0, 60, 0));
        pixel.show();
    } else if (cmd == "STOP") {
        isRunning = false;
        pixel.setPixelColor(0, pixel.Color(0, 0, 50));
        pixel.show();
    } else if (cmd == "RESET") {
        isRunning  = false;
        isFinished = false;
        remainingSeconds = WASH_MINUTES * 60;
        pixel.setPixelColor(0, pixel.Color(0, 0, 50));
        pixel.show();
    } else if (cmd.startsWith("SET:")) {
        // 분 단위 시간 설정 (예: SET:45)
        int newMin = cmd.substring(4).toInt();
        if (newMin > 0 && newMin <= 180) {
            remainingSeconds = newMin * 60;
            isRunning  = false;
            isFinished = false;
        }
    }
    showCountdown();
    sendBleStatus();
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // 초기 화면 + 대기 LED (파란색)
    showCountdown();
    pixel.setPixelColor(0, pixel.Color(0, 0, 50));
    pixel.show();
}

void loop() {
    unsigned long now = millis();

    // 스위치: 대기→시작, 실행/완료→리셋
    bool sw = digitalRead(SWITCH_PIN);
    if (lastSwitch == HIGH && sw == LOW) {
        delay(50); // 디바운스
        if (!isRunning && !isFinished) {
            // 카운트다운 시작
            isRunning  = true;
            isFinished = false;
            lastTick   = now;
            pixel.setPixelColor(0, pixel.Color(0, 60, 0)); // 초록: 세탁 중
            pixel.show();
        } else {
            // 리셋
            isRunning        = false;
            isFinished       = false;
            remainingSeconds = WASH_MINUTES * 60;
            pixel.setPixelColor(0, pixel.Color(0, 0, 50)); // 파란: 대기
            pixel.show();
        }
        showCountdown();
        sendBleStatus();
    }
    lastSwitch = sw;

    // 카운트다운 1초 처리
    if (isRunning && (now - lastTick >= 1000)) {
        lastTick = now;
        remainingSeconds--;

        // 60초 이하: 노란색 경고
        if (remainingSeconds == 60) {
            pixel.setPixelColor(0, pixel.Color(120, 80, 0));
            pixel.show();
            tone(2, 880, 200); // 경고 비프
        }

        showCountdown();

        // 10초마다 BLE 전송
        if (remainingSeconds % 10 == 0) sendBleStatus();

        // 카운트다운 종료
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            isRunning  = false;
            isFinished = true;
            showCountdown();
            sendBleStatus();

            // 완료: 멜로디 + LED 애니메이션
            finishLedAnimation();
            playFinishMelody();
            finishLedAnimation(); // 한 번 더

            // 완료 상태 재전송
            sendBleStatus();
        }
    }

    // 30초마다 BLE 상태 주기 전송
    if (now - lastBleSend >= 30000) {
        lastBleSend = now;
        sendBleStatus();
    }

    delay(10);
}