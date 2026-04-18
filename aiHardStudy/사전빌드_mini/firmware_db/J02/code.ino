// [전역] 스위치 카운터
int pressCount = 0;
bool lastSwitchState = HIGH;

void updateDisplay() {
    // [OLED] 카운터 화면 갱신
    oled.clear();
    oled.drawString(0, 0, "Switch Counter");
    char buf[20];
    sprintf(buf, "Count: %d", pressCount);
    oled.drawString(0, 20, buf);
    oled.display();
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [초기화] 첫 화면 표시
    updateDisplay();
}

void loop() {
    bool currentState = digitalRead(SWITCH_PIN);

    // [스위치] 버튼 눌림 감지 (HIGH→LOW 전환)
    if (lastSwitchState == HIGH && currentState == LOW) {
        pressCount++;
        Serial.printf("눌림 횟수: %d\n", pressCount);

        // [LED] 파란색으로 짧게 표시
        pixel.setPixelColor(0, pixel.Color(0, 0, 255));
        pixel.show();

        // [소리] 확인음
        tone(2, 1000, 80);

        // [OLED] 카운터 갱신
        updateDisplay();

        delay(50); // 디바운스
        noTone(2);

        pixel.clear();
        pixel.show();
    }

    lastSwitchState = currentState;
    delay(10);
}