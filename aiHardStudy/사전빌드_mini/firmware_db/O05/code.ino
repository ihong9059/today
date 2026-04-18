// [멜로디] 기상 알람 음계 (도레미파솔라시도)
int melody[] = {523, 587, 659, 698, 784, 880, 988, 1047};

// [무지개] 7색 RGB 값
int rrR[] = {255, 255, 255, 0,   0,   75,  148};
int rrG[] = {0,   127, 255, 255, 0,   0,   0  };
int rrB[] = {0,   0,   0,   0,   255, 130, 211};

void alarmTask(void* pvParameters) {
  // [카운트다운] OLED에 10초 카운트다운 표시
  for (int i = 10; i >= 0; i--) {
    oled.clear();
    oled.drawString(8, 5, "Wake Up Soon!");
    char buf[8];
    sprintf(buf, "%d", i);
    oled.drawString(52, 25, buf);
    oled.drawString(12, 45, "Get Ready...");
    oled.display();
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }

  // [멜로디] 기상 멜로디 3회 반복 재생
  oled.clear();
  oled.drawString(20, 20, "GOOD MORNING!");
  oled.display();

  for (int rep = 0; rep < 3; rep++) {
    for (int i = 0; i < 8; i++) {
      tone(2, melody[i], 180);
      vTaskDelay(220 / portTICK_PERIOD_MS);
    }
    // [멜로디] 반복 사이 짧은 쉼표
    noTone(2);
    vTaskDelay(300 / portTICK_PERIOD_MS);
  }
  noTone(2);

  // [무지개] 멜로디 종료 후 LED 무지개 점멸 무한 반복
  while (true) {
    for (int i = 0; i < 7; i++) {
      pixel.setPixelColor(0, pixel.Color(rrR[i], rrG[i], rrB[i]));
      pixel.show();
      vTaskDelay(250 / portTICK_PERIOD_MS);
    }
    // [무지개] 잠깐 소등 후 반복
    pixel.clear();
    pixel.show();
    vTaskDelay(200 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [알람] 기상 알람 시퀀스 태스크 생성 (core 0)
  xTaskCreate(alarmTask, "alarmTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}