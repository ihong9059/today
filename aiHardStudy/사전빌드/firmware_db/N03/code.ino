// [모스부호] SOS 타이밍 상수 (단위: ms)
const int DOT        = 200;
const int DASH       = 600;
const int ELEM_GAP   = 200;
const int LETTER_GAP = 600;
const int SOS_GAP    = 2000;

// [신호] LED 3개 + 부저 동시 ON (active LOW)
void signalOn() {
    digitalWrite(LED_RED,    LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE,   LOW);
    digitalWrite(BUZZER,     LOW);
}

// [신호] LED 3개 + 부저 동시 OFF
void signalOff() {
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    digitalWrite(BUZZER,     HIGH);
}

// [모스] 점(·) 신호
void morseDot() {
    signalOn();
    delay(DOT);
    signalOff();
}

// [모스] 선(−) 신호
void morseDash() {
    signalOn();
    delay(DASH);
    signalOff();
}

// [모스] S 출력: ···
void morseS() {
    for (int i = 0; i < 3; i++) {
        morseDot();
        if (i < 2) delay(ELEM_GAP);
    }
}

// [모스] O 출력: ---
void morseO() {
    for (int i = 0; i < 3; i++) {
        morseDash();
        if (i < 2) delay(ELEM_GAP);
    }
}

// [태스크] SOS 반복 출력 (xTaskCreate 전용)
void sosTask(void* param) {
    while (true) {
        morseS();
        delay(LETTER_GAP);
        morseO();
        delay(LETTER_GAP);
        morseS();
        delay(SOS_GAP);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [OLED] SOS 모스부호 패턴 화면에 표시
    oled.clear();
    oled.drawString(0,  0, "SOS Morse Code");
    oled.drawString(0, 16, "... --- ...");
    oled.drawString(0, 32, "S   O   S");
    oled.drawString(0, 48, "Emergency Signal");
    oled.display();

    // [태스크] SOS LED+부저 태스크 실행
    xTaskCreate(sosTask, "SOS_TASK", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}