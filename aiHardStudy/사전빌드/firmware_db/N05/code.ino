// [멜로디] 기상 나팔 음표 배열
int alarmNotes[]     = {392, 523, 659, 784, 659, 784, 659, 784, 880, 784, 659, 523, 392};
int alarmDurations[] = {200, 200, 200, 400, 200, 200, 200, 200, 400, 200, 200, 200, 600};
const int NOTE_COUNT = 13;

// [LED] 전체 점멸 태스크
void ledBlinkTask(void* param) {
  while (true) {
    // [LED] 세 LED 동시 ON
    digitalWrite(LED_RED,    LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE,   LOW);
    delay(300);
    // [LED] 세 LED 동시 OFF
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    delay(300);
  }
}

// [알람] 카운트다운 → 멜로디 → LED 점멸 순서로 실행
void alarmTask(void* param) {
  // [카운트다운] 5초 카운트다운 OLED 표시
  for (int i = 5; i >= 1; i--) {
    oled.clear();
    oled.drawString(10,  0, "Wake Up!");
    oled.drawString(10, 16, "Alarm in:");
    char buf[4];
    sprintf(buf, "%d", i);
    oled.drawString(52, 36, buf);
    oled.display();
    delay(1000);
  }

  // [OLED] 알람 시작 메시지 표시
  oled.clear();
  oled.drawString(10,  8, "** ALARM **");
  oled.drawString(10, 28, "Good Morning!");
  oled.display();

  // [멜로디] 기상 나팔 멜로디 재생
  for (int i = 0; i < NOTE_COUNT; i++) {
    tone(33, alarmNotes[i], alarmDurations[i]);
    delay(alarmDurations[i] + 30);
  }
  noTone(33);

  // [LED] 멜로디 종료 후 전체 점멸 태스크 시작
  xTaskCreate(ledBlinkTask, "LedBlink", 2048, NULL, 1, NULL);

  vTaskDelete(NULL); // [태스크] 알람 태스크 종료
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀·OLED·I2C 초기화
  initBLE();      // [BLE] OTA 초기화

  // [알람] 기상 알람 태스크 생성
  xTaskCreate(alarmTask, "Alarm", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000); // [루프] BLE OTA 대기
}