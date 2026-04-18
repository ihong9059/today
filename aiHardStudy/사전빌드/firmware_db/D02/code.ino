// [음계] 도레미파솔라시도 역순 주파수 정의
const int notes[] = {523, 494, 440, 392, 349, 330, 294, 262}; // 도시라솔파미레도
const int NOTE_COUNT = 8;
const int NOTE_DURATION = 400; // 각 음 길이(ms)
const int NOTE_GAP = 50;       // 음 사이 간격(ms)

void playMelodyTask(void *param) {
    // [멜로디] 역순 음계 반복 연주
    while (true) {
        for (int i = 0; i < NOTE_COUNT; i++) {
            tone(33, notes[i], NOTE_DURATION);
            delay(NOTE_DURATION + NOTE_GAP);
            noTone(33);
        }
        delay(2000); // 연주 후 대기
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [OLED] 연주 안내 문자 출력
    oled.clear();
    oled.drawString(0, 0, "Melody: Reverse");
    oled.drawString(0, 16, "Do-Si-La-Sol");
    oled.drawString(0, 32, "Pa-Mi-Re-Do");
    oled.display();

    // [태스크] 멜로디 연주 태스크 생성
    xTaskCreate(playMelodyTask, "melody", 2048, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}