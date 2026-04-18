// [초시계] 경과 시간(ms) 저장
unsigned long startTime = 0;

// [초시계] OLED 업데이트 태스크
void stopwatchTask(void* param) {
  while (true) {
    unsigned long elapsed = millis() - startTime; // ms 경과
    unsigned long tenths = (elapsed / 100) % 10;  // 0.1초 단위
    unsigned long seconds = elapsed / 1000;        // 초

    // [표시] "초.1초" 형식 문자열 생성
    char buf[16];
    snprintf(buf, sizeof(buf), "%lu.%lu", seconds, tenths);

    oled.clear();
    oled.drawString(20, 20, "Stopwatch");   // [제목] 상단
    oled.drawString(35, 38, buf);           // [시간] 중앙 표시
    oled.display();

    delay(100); // 0.1초마다 갱신
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 및 OLED 초기화
  initBLE();        // BLE OTA 초기화

  startTime = millis(); // [초시계] 시작 시각 기록

  // [태스크] 초시계 표시 태스크 생성
  xTaskCreate(stopwatchTask, "stopwatch", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}