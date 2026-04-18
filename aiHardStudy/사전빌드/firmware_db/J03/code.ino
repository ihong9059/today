// [음계] 도레미 주파수 정의
#define NOTE_DO 262
#define NOTE_RE 294
#define NOTE_MI 330

// [태스크] LED 순차 점등 + 도레미 멜로디 재생
void ledMelodyTask(void *pvParameters) {
  while (true) {
    // [도] 빨간 LED + 도 음
    digitalWrite(LED_RED, LOW);
    tone(33, NOTE_DO, 400);
    delay(500);
    digitalWrite(LED_RED, HIGH);

    // [레] 노란 LED + 레 음
    digitalWrite(LED_YELLOW, LOW);
    tone(33, NOTE_RE, 400);
    delay(500);
    digitalWrite(LED_YELLOW, HIGH);

    // [미] 파란 LED + 미 음
    digitalWrite(LED_BLUE, LOW);
    tone(33, NOTE_MI, 400);
    delay(500);
    digitalWrite(LED_BLUE, HIGH);

    noTone(33);        // [종료] 멜로디 정지
    delay(1000);       // [대기] 다음 반복 전 휴식
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀 및 OLED 설정
  initBLE();        // [BLE] OTA 초기화

  // [생성] LED+멜로디 태스크 실행
  xTaskCreate(ledMelodyTask, "ledMelody", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}