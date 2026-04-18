// [무드등] LED 배열 및 멜로디 전역 정의
const int LEDS[] = {LED_RED, LED_YELLOW, LED_BLUE};

// [오르골] 엘리제를 위하여 음표 주파수 (0=쉼표)
const int melody[] = {
  659,622,659,622,659,494,587,523,440, 0,
  262,330,440,494,               0,
  330,415,494,523,               0,
  330,659,622,659,622,659,494,587,523,440, 0
};
// [오르골] 각 음표 재생 시간 (ms)
const int noteDur[] = {
  150,150,150,150,150,150,150,150,300,150,
  150,150,150,300,               150,
  150,150,150,300,               150,
  150,150,150,150,150,150,150,150,150,300,150
};
const int MELODY_LEN = 31;

// [무드등] LED 랜덤 패턴 태스크
void ledTask(void* param) {
  while (true) {
    int pattern = random(1, 8); // 1~7: 최소 1개 이상 켜짐
    for (int i = 0; i < 3; i++) {
      // [LED] active LOW: 비트=1이면 LOW(ON), 0이면 HIGH(OFF)
      digitalWrite(LEDS[i], (pattern >> i) & 1 ? LOW : HIGH);
    }
    delay(random(300, 1200)); // [딜레이] 랜덤 점멸 간격
  }
}

// [오르골] 멜로디 반복 재생 태스크
void melodyTask(void* param) {
  while (true) {
    for (int i = 0; i < MELODY_LEN; i++) {
      if (melody[i] == 0) {
        noTone(33); // [쉼표] 소리 정지
      } else {
        tone(33, melody[i], noteDur[i]); // [음표] 멜로디 재생
      }
      delay(noteDur[i] + 40); // [간격] 음표 간 여백
    }
    noTone(33);
    delay(3000); // [휴식] 반복 전 정지
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀 및 OLED 초기화
  initBLE();      // [BLE] OTA 초기화

  // [OLED] 무드등 모드 안내 표시
  oled.clear();
  oled.drawString(20, 10, "Mood Light");
  oled.drawString(10, 30, "LED + Orugol");
  oled.display();

  // [태스크] LED 패턴 및 멜로디 동시 실행
  xTaskCreate(ledTask,    "LED",    2048, NULL, 1, NULL);
  xTaskCreate(melodyTask, "Melody", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000); // [루프] BLE OTA 대기
}