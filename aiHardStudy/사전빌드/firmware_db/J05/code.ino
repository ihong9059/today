// [크리스마스] LED 핀 배열
const int leds[] = {LED_RED, LED_YELLOW, LED_BLUE};

// [징글벨] 음표 주파수 (E4=330, G4=392, C4=262, D4=294, F4=349)
const int jingleNotes[] = {
  330, 330, 330,
  330, 330, 330,
  330, 392, 262, 294, 330,
  349, 349, 349, 349,
  349, 330, 330, 330,
  330, 294, 294, 330, 294, 392,
  330, 330, 330,
  330, 330, 330,
  330, 392, 262, 294, 330,
  349, 349, 349, 349,
  349, 330, 330, 330,
  392, 392, 349, 294, 262
};

// [징글벨] 음표 길이 (ms)
const int jingleDur[] = {
  200, 200, 400,
  200, 200, 400,
  200, 200, 200, 200, 800,
  200, 200, 200, 200,
  200, 200, 200, 200,
  200, 200, 200, 200, 200, 400,
  200, 200, 400,
  200, 200, 400,
  200, 200, 200, 200, 800,
  200, 200, 200, 200,
  200, 200, 200, 200,
  200, 200, 200, 200, 800
};

const int noteCount = sizeof(jingleNotes) / sizeof(jingleNotes[0]);

// [LED] 크리스마스 랜덤 점멸 태스크
void ledTask(void* param) {
  while (true) {
    // 모든 LED 끄기 (active LOW: HIGH=OFF)
    for (int i = 0; i < 3; i++) digitalWrite(leds[i], HIGH);
    // 랜덤 LED 하나 켜기
    digitalWrite(leds[random(3)], LOW);
    delay(random(80, 350));
  }
}

// [멜로디] 징글벨 반복 재생 태스크
void melodyTask(void* param) {
  while (true) {
    for (int i = 0; i < noteCount; i++) {
      tone(33, jingleNotes[i], jingleDur[i]);
      delay(jingleDur[i] + 40); // [멜로디] 음표 간 짧은 쉼
    }
    noTone(33);
    delay(1500); // [멜로디] 반복 전 대기
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 크리스마스 인사 표시
  oled.clear();
  oled.drawString(20, 10, "Merry Christmas!");
  oled.drawString(30, 30, "* * * * * * *");
  oled.drawString(15, 50, "Jingle Bells ~");
  oled.display();

  // [랜덤] 시드 초기화
  randomSeed(millis());

  // [태스크] LED 랜덤 점멸 태스크 시작
  xTaskCreate(ledTask, "LED", 2048, NULL, 1, NULL);
  // [태스크] 징글벨 멜로디 태스크 시작
  xTaskCreate(melodyTask, "Melody", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}