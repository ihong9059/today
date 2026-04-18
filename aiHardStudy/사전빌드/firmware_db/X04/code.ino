// [워치독] 업타임 OLED 표시 + 30초 BLE alive 전송 + 스위치 리셋

unsigned long startTime = 0;

// [OLED] 업타임을 시:분:초로 갱신하는 태스크
void oledTask(void *param) {
  char buf[20];
  while (true) {
    unsigned long elapsed = (millis() - startTime) / 1000;
    unsigned int h = elapsed / 3600;
    unsigned int m = (elapsed % 3600) / 60;
    unsigned int s = elapsed % 60;
    sprintf(buf, "%02u:%02u:%02u", h, m, s);

    oled.clear();
    oled.drawString(0,  0, "== Watchdog ==");
    oled.drawString(0, 16, "Uptime:");
    oled.drawString(0, 32, buf);
    oled.display();

    delay(1000); // 1초마다 화면 갱신
  }
}

// [alive] 30초마다 Serial + BLE 알림으로 생존 신호 전송
void aliveTask(void *param) {
  while (true) {
    delay(30000); // 30초 대기
    Serial.println("alive"); // BLE notify 역할 (시리얼 → 클라이언트 수신)
  }
}

// [스위치] GPIO32 감지 후 소프트 리셋
void switchTask(void *param) {
  while (true) {
    if (digitalRead(32) == LOW) {   // 스위치 눌림 감지
      delay(50);                     // 디바운스
      if (digitalRead(32) == LOW) {
        Serial.println("Switch → ESP.restart()");
        oled.clear();
        oled.drawString(0, 20, "Resetting...");
        oled.display();
        delay(500);
        ESP.restart(); // 디바이스 리셋
      }
    }
    delay(100); // 100ms 폴링 주기
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED/I2C 초기화
  initBLE();       // BLE OTA 초기화

  startTime = millis(); // 업타임 기준 시각 저장

  // [태스크] OLED 업타임 표시
  xTaskCreate(oledTask,   "oledTask",   4096, NULL, 1, NULL);
  // [태스크] 30초 alive 신호
  xTaskCreate(aliveTask,  "aliveTask",  2048, NULL, 1, NULL);
  // [태스크] 스위치 리셋 감지
  xTaskCreate(switchTask, "switchTask", 2048, NULL, 2, NULL);
}

void loop() {
  delay(10000);
}