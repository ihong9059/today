// [전역] 온도 히스토리 배열 (최근 16개)
float tempHistory[16] = {0};
int histCount = 0;
unsigned long lastReadTime = 0;

// [함수] 히스토리에 새 온도 추가 (오래된 값 밀어내기)
void addTempHistory(float t) {
  if (histCount < 16) {
    tempHistory[histCount++] = t;
  } else {
    for (int i = 0; i < 15; i++) {
      tempHistory[i] = tempHistory[i + 1];
    }
    tempHistory[15] = t;
  }
}

// [함수] OLED에 온도 막대그래프 표시
void drawBarGraph() {
  oled.clear();

  // [제목] 상단 행(y=0)에 범위 표시
  char header[] = "Temp(15-40C)";
  oled.drawString(0, 0, header);

  // [막대] histCount개 세로 막대 그리기
  for (int i = 0; i < histCount; i++) {
    float t = tempHistory[i];
    // [클램프] 15~40도 범위 제한
    if (t < 15.0f) t = 15.0f;
    if (t > 40.0f) t = 40.0f;

    // [높이] 막대 행 수 계산 (0~7)
    int barRows = (int)((t - 15.0f) / 25.0f * 7.0f);
    if (barRows < 1) barRows = 1; // 최소 1행

    // [위치] 열 x 좌표 (8픽셀 간격, 총 16열=128px)
    int x = i * 8;

    // [그리기] 아래(y=56)에서 위(y=8)로 채우기
    for (int r = 0; r < barRows; r++) {
      int y = 8 + (6 - r) * 8; // r=0->y=56, r=6->y=8
      oled.drawString(x, y, "#");
    }
  }

  // [최신값] 우측 상단에 현재 온도 숫자 표시
  if (histCount > 0) {
    float latest = tempHistory[histCount - 1];
    int ipart = (int)latest;
    int fpart = (int)((latest - ipart) * 10);
    char valBuf[12];
    sprintf(valBuf, "%d.%dC", ipart, fpart);
    oled.drawString(80, 0, valBuf);
  }

  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 메시지 출력
  oled.clear();
  char waitMsg[] = "Waiting...";
  oled.drawString(0, 0, waitMsg);
  oled.display();
}

void loop() {
  unsigned long now = millis();

  // [주기] 2초마다 온도 측정
  if (now - lastReadTime >= 2000UL) {
    lastReadTime = now;

    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      addTempHistory(temp);
      drawBarGraph();

      // [시리얼] 디버그 로그
      int ipart = (int)temp;
      int fpart = (int)((temp - ipart) * 10);
      char logBuf[32];
      sprintf(logBuf, "Temp: %d.%dC", ipart, fpart);
      Serial.println(logBuf);
    } else {
      Serial.println("AHT20 read failed");
    }
  }

  delay(100);
}