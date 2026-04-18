// [음표] 곰 세 마리 멜로디 주파수 배열 (Hz, 0=쉼표)
const int melody[] = {
  330, 330, 392, 392, 440, 440, 392,   0,
  330, 330, 294, 294, 262,   0,
  262, 294, 330, 330, 294,   0, 262,   0,
  330, 392, 392, 330, 294, 262,   0,
  262, 294, 330, 294, 262,   0,
  392, 440, 392,   0,
  330, 294, 262
};

// [음표] 각 음표 지속 시간 (ms)
const int noteDurations[] = {
  400, 400, 400, 400, 400, 400, 800, 400,
  400, 400, 400, 400, 1200, 400,
  400, 400, 400, 400, 800, 200, 800, 400,
  400, 400, 400, 400, 400, 800, 400,
  400, 400, 400, 400, 800, 400,
  400, 400, 800, 400,
  400, 400, 800
};

const int NOTE_COUNT = sizeof(melody) / sizeof(melody[0]);

// [OLED] 곡 제목 화면 출력
void showTitle(const char* status) {
  oled.clear();
  oled.drawString(10,  0, "Gom Se Mari");
  oled.drawString(20, 16, "곰 세 마리");
  oled.drawString(15, 36, status);
  oled.display();
}

// [멜로디] 연주 + LED 동기화 태스크
void melodyTask(void* param) {
  showTitle("Playing...");

  for (;;) {
    digitalWrite(LED_BLUE, LOW);  // [LED] 연주 중 파란불 ON

    for (int i = 0; i < NOTE_COUNT; i++) {
      int freq = melody[i];
      int dur  = noteDurations[i];

      if (freq == 0) {
        noTone(33);                     // [쉼표] 묵음
        digitalWrite(LED_YELLOW, HIGH); // [LED] 쉼표 구간 노란불 OFF
      } else {
        tone(33, freq, dur);            // [음표] GPIO33 PWM 멜로디 출력
        digitalWrite(LED_YELLOW, LOW);  // [LED] 음표 구간 노란불 ON
      }

      delay(dur);
      noTone(33);
      delay(40); // [간격] 음표 사이 짧은 분리
    }

    // [완료] 연주 종료 처리
    noTone(33);
    digitalWrite(LED_YELLOW, HIGH); // [LED] 노란불 OFF
    digitalWrite(LED_BLUE, HIGH);   // [LED] 파란불 OFF

    showTitle("Done!");
    delay(2000);

    // [반복] 3초 후 재연주
    showTitle("Playing...");
    delay(1000);
    digitalWrite(LED_BLUE, LOW);
  }

  vTaskDelete(NULL);
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀/OLED/AHT20 초기화
  initBLE();      // [BLE] OTA 초기화

  // [LED] 초기 상태 모두 OFF (active LOW이므로 HIGH=OFF)
  digitalWrite(LED_RED,    HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE,   HIGH);

  // [태스크] 멜로디 연주 태스크 생성
  xTaskCreate(melodyTask, "MelodyTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}