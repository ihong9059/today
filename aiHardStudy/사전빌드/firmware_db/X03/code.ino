// [음표] 멜로디 주파수 정의 (반짝반짝 작은별)
#define NOTE_C4 262
#define NOTE_D4 294
#define NOTE_E4 330
#define NOTE_F4 349
#define NOTE_G4 392
#define NOTE_A4 440
#define NOTE_C5 523

// [멜로디] 음표 배열
int melody[] = {
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4, NOTE_C4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4, NOTE_C4
};

// [멜로디] 박자 배열 (ms)
int noteDur[] = {
  400,400,400,400,400,400,800,
  400,400,400,400,400,400,800,
  400,400,400,400,400,400,800,
  400,400,400,400,400,400,800,
  400,400,400,400,400,400,800,
  400,400,400,400,400,400,800
};

int melodyLen = sizeof(melody) / sizeof(melody[0]);

// [LED] 순차 점등 헬퍼
void setLeds(int r, int y, int b) {
  digitalWrite(LED_RED,    r);
  digitalWrite(LED_YELLOW, y);
  digitalWrite(LED_BLUE,   b);
}

// [LED] 패턴 태스크 - 6가지 패턴 순환
void ledTask(void* param) {
  int step = 0;
  while (true) {
    switch (step % 8) {
      case 0: // 순차 R→Y→B
        setLeds(LOW,  HIGH, HIGH); vTaskDelay(200 / portTICK_PERIOD_MS);
        setLeds(HIGH, LOW,  HIGH); vTaskDelay(200 / portTICK_PERIOD_MS);
        setLeds(HIGH, HIGH, LOW ); vTaskDelay(200 / portTICK_PERIOD_MS);
        break;
      case 1: // 전체 점등
        setLeds(LOW, LOW, LOW);
        vTaskDelay(350 / portTICK_PERIOD_MS);
        break;
      case 2: // 전체 소등
        setLeds(HIGH, HIGH, HIGH);
        vTaskDelay(350 / portTICK_PERIOD_MS);
        break;
      case 3: // 빠른 교차 깜박임
        for (int i = 0; i < 5; i++) {
          setLeds(LOW,  HIGH, LOW ); vTaskDelay(80 / portTICK_PERIOD_MS);
          setLeds(HIGH, LOW,  HIGH); vTaskDelay(80 / portTICK_PERIOD_MS);
        }
        break;
      case 4: // 역순 B→Y→R
        setLeds(HIGH, HIGH, LOW ); vTaskDelay(200 / portTICK_PERIOD_MS);
        setLeds(HIGH, LOW,  HIGH); vTaskDelay(200 / portTICK_PERIOD_MS);
        setLeds(LOW,  HIGH, HIGH); vTaskDelay(200 / portTICK_PERIOD_MS);
        break;
      case 5: // 가운데만 점등
        setLeds(HIGH, LOW, HIGH);
        vTaskDelay(400 / portTICK_PERIOD_MS);
        break;
      case 6: // R+B만 점등
        setLeds(LOW, HIGH, LOW);
        vTaskDelay(400 / portTICK_PERIOD_MS);
        break;
      case 7: // 느린 순차 점멸
        for (int i = 0; i < 3; i++) {
          setLeds(LOW,  HIGH, HIGH); vTaskDelay(300 / portTICK_PERIOD_MS);
          setLeds(HIGH, LOW,  HIGH); vTaskDelay(300 / portTICK_PERIOD_MS);
          setLeds(HIGH, HIGH, LOW ); vTaskDelay(300 / portTICK_PERIOD_MS);
          setLeds(HIGH, HIGH, HIGH); vTaskDelay(150 / portTICK_PERIOD_MS);
        }
        break;
    }
    step++;
  }
}

// [멜로디] 배경음악 태스크 - 무한 반복 연주
void melodyTask(void* param) {
  while (true) {
    for (int i = 0; i < melodyLen; i++) {
      // [음표] 음표 길이의 90%만 소리, 나머지는 무음(끊김 효과)
      tone(33, melody[i], (int)(noteDur[i] * 0.9));
      vTaskDelay(noteDur[i] / portTICK_PERIOD_MS);
    }
    noTone(33);
    vTaskDelay(600 / portTICK_PERIOD_MS); // [멜로디] 반복 전 짧은 휴식
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀/OLED/AHT20 초기화
  initBLE();       // [BLE] OTA 초기화

  // [OLED] 시작 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Music LED Show");
  oled.drawString(0, 16, "Twinkle Star");
  oled.drawString(0, 32, "Playing...");
  oled.display();

  // [태스크] LED 패턴 태스크 생성 (코어1)
  xTaskCreatePinnedToCore(ledTask, "LED_Show", 2048, NULL, 1, NULL, 1);

  // [태스크] 멜로디 태스크 생성 (코어1)
  xTaskCreatePinnedToCore(melodyTask, "Melody", 4096, NULL, 2, NULL, 1);

  Serial.println("[시작] 배경음악 + LED 쇼 시작");
}

void loop() {
  delay(10000);
}