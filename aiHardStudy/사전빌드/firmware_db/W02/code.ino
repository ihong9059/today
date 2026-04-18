// [프로그레스바] OLED에 0%→100% 천천히 채워지는 바 표시

void drawProgressBar(int percent) {
  // [화면 클리어] 매 프레임 초기화
  oled.clear();

  // [제목] 상단 중앙에 텍스트
  oled.drawString(30, 0, "Loading...");

  // [퍼센트 텍스트] 중앙 상단
  char pct[8];
  sprintf(pct, "%3d%%", percent);
  oled.drawString(46, 16, pct);

  // [바 테두리] 문자로 외곽선 표현
  // 총 20칸 기준 (6px 폰트 × 20 = 120px ≈ 화면 너비)
  int totalChars = 20;
  int filled = (percent * totalChars) / 100;

  // [채우기] '#'로 채운 부분, '-'로 빈 부분
  char bar[24];
  bar[0] = '[';
  for (int i = 0; i < totalChars; i++) {
    bar[i + 1] = (i < filled) ? '#' : '-';
  }
  bar[totalChars + 1] = ']';
  bar[totalChars + 2] = '\0';

  oled.drawString(4, 36, bar);

  // [완료 메시지] 100% 도달 시 표시
  if (percent >= 100) {
    oled.drawString(32, 52, "Complete!");
  }

  oled.display();
}

void progressTask(void *param) {
  // [반복 루프] 0→100 순환
  while (true) {
    // [진행] 0%부터 100%까지 100ms 간격 (총 약 10초)
    for (int i = 0; i <= 100; i++) {
      drawProgressBar(i);
      delay(100);
    }

    // [완료 유지] 2초 대기 후 재시작
    delay(2000);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화
  initBLE();        // BLE OTA 초기화

  // [태스크 생성] 별도 태스크에서 프로그레스바 실행
  xTaskCreate(progressTask, "progress", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}