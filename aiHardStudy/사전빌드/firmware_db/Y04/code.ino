// [설정] 측정 간격 및 히스토리 크기 정의
#define SAMPLE_MS  15000
#define BLE_MS     30000
#define HIST_SIZE  16

// [버퍼] 온습도 순환 히스토리
float tempHist[HIST_SIZE];
float humiHist[HIST_SIZE];
int   histIdx  = 0;
int   histFill = 0;

// [통계] 최소/최대/합계/카운트
float tMin = 999, tMax = -999, tSum = 0;
float hMin = 999, hMax = -999, hSum = 0;
int   statCnt = 0;

// [공유] 최신 측정값 및 쾌적도
float gLastT = 0, gLastH = 0;
int   gComfort = 0;

// [쾌적도] 온습도 기반 레벨 반환 0=좋음 1=보통 2=나쁨
int comfortLevel(float t, float h) {
  if (t >= 20 && t <= 26 && h >= 40 && h <= 60) return 0;
  if (t >= 15 && t <= 30 && h >= 30 && h <= 70) return 1;
  return 2;
}

// [그래프] OLED ASCII 바 그래프 (히스토리 온도)
void drawTempGraph() {
  if (histFill == 0) return;
  // [범위] 히스토리 내 최소/최대 탐색
  float tMn = 200, tMx = -200;
  for (int i = 0; i < histFill; i++) {
    int idx = (histIdx - histFill + i + HIST_SIZE) % HIST_SIZE;
    if (tempHist[idx] < tMn) tMn = tempHist[idx];
    if (tempHist[idx] > tMx) tMx = tempHist[idx];
  }
  char row[HIST_SIZE + 1];
  row[HIST_SIZE] = '\0';
  // [행 루프] r=3 상단→r=0 하단, 4행 × HIST_SIZE 열
  for (int r = 3; r >= 0; r--) {
    for (int i = 0; i < HIST_SIZE; i++) {
      if (i < histFill) {
        int idx = (histIdx - histFill + i + HIST_SIZE) % HIST_SIZE;
        float norm = (tMx > tMn) ? (tempHist[idx] - tMn) / (tMx - tMn) : 0.5f;
        int barH = (int)(norm * 4.0f + 0.5f);
        row[i] = (barH > r) ? '#' : '.';
      } else {
        row[i] = ' ';
      }
    }
    // [출력] 상단(y=32)부터 1행씩 아래로
    oled.drawString(0, 32 + (3 - r) * 8, row);
  }
}

// [OLED] 전체 화면 구성 및 갱신
void updateDisplay(float t, float h, int lv) {
  oled.clear();
  char buf[32];

  // [행0] 현재 온도/습도
  snprintf(buf, sizeof(buf), "T:%.1fC  H:%.0f%%", t, h);
  oled.drawString(0, 0, buf);

  // [행1] 쾌적도 레벨
  const char* lvStr[] = {"GOOD ", "FAIR ", "POOR "};
  snprintf(buf, sizeof(buf), "Comfort: %s", lvStr[lv]);
  oled.drawString(0, 8, buf);

  // [행2] 온도 통계 (최소~최대 평균)
  if (statCnt > 0) {
    snprintf(buf, sizeof(buf), "%.1f~%.1fC avg%.1f", tMin, tMax, tSum / statCnt);
    oled.drawString(0, 16, buf);
  }

  // [행3] 그래프 레이블
  snprintf(buf, sizeof(buf), "Graph(%dpts):", histFill);
  oled.drawString(0, 24, buf);

  // [행4~7] 온도 히스토리 바 그래프
  drawTempGraph();

  oled.display();
}

// [LED] 쾌적도 등급 LED 점등 태스크
void ledTask(void* pv) {
  int lv = gComfort;
  // [ON] 등급별 LED 점등 (active LOW)
  digitalWrite(LED_BLUE,   lv == 0 ? LOW : HIGH);
  digitalWrite(LED_YELLOW, lv == 1 ? LOW : HIGH);
  digitalWrite(LED_RED,    lv == 2 ? LOW : HIGH);
  delay(4000);
  // [OFF] 모든 LED 소등
  digitalWrite(LED_BLUE,   HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_RED,    HIGH);
  vTaskDelete(NULL);
}

// [태스크] 센서 측정 + 표시 + BLE 전송 메인 루프
void sensorTask(void* pv) {
  unsigned long prevSample = 0, prevBle = 0;

  while (true) {
    unsigned long now = millis();

    // [측정] SAMPLE_MS 주기로 AHT20 읽기
    if (now - prevSample >= SAMPLE_MS) {
      prevSample = now;
      float t, h;
      if (aht20_read(t, h)) {
        gLastT = t;
        gLastH = h;

        // [히스토리] 순환 버퍼 저장
        tempHist[histIdx] = t;
        humiHist[histIdx] = h;
        histIdx = (histIdx + 1) % HIST_SIZE;
        if (histFill < HIST_SIZE) histFill++;

        // [통계] 최소/최대/합산 업데이트
        statCnt++;
        tSum += t;
        if (t < tMin) tMin = t;
        if (t > tMax) tMax = t;
        hSum += h;
        if (h < hMin) hMin = h;
        if (h > hMax) hMax = h;

        // [쾌적도] 레벨 계산
        gComfort = comfortLevel(t, h);

        // [LED] 쾌적도 색상 표시 태스크 생성
        xTaskCreate(ledTask, "led", 1024, NULL, 1, NULL);

        // [OLED] 화면 갱신
        updateDisplay(t, h, gComfort);

        Serial.printf("[센서] T:%.1f H:%.0f%% 쾌적:%d 샘플:%d\n", t, h, gComfort, statCnt);
      }
    }

    // [BLE] BLE_MS 주기로 JSON 데이터 전송
    if (now - prevBle >= BLE_MS) {
      prevBle = now;
      if (statCnt > 0) {
        char msg[160];
        snprintf(msg, sizeof(msg),
          "{\"t\":%.1f,\"h\":%.0f,\"comfort\":%d"
          ",\"tMin\":%.1f,\"tMax\":%.1f,\"tAvg\":%.1f"
          ",\"hMin\":%.0f,\"hMax\":%.0f,\"hAvg\":%.0f,\"cnt\":%d}",
          gLastT, gLastH, gComfort,
          tMin, tMax, tSum / statCnt,
          hMin, hMax, hSum / statCnt, statCnt);
        // [전송] BLE notify 채널 출력
        Serial.printf("[BLE] %s\n", msg);
      }
    }

    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 센서+표시+BLE 복합 태스크 생성
  xTaskCreate(sensorTask, "sensor", 6144, NULL, 2, NULL);
}

void loop() {
  delay(10000);
}