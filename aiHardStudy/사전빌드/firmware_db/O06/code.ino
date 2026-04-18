// [이력 버퍼] 최근 20개 온도 저장용 배열
#define HISTORY_SIZE 20
float tempHistory[HISTORY_SIZE];
int historyCount = 0;

// [그래프] OLED에 온도 이력 점 그래프 출력
void drawTempGraph() {
    oled.clear();

    // [헤더] 최신 온도 및 수집 개수 표시
    char buf[24];
    if (historyCount > 0) {
        snprintf(buf, sizeof(buf), "T:%.1fC  [%d/%d]", tempHistory[historyCount - 1], historyCount, HISTORY_SIZE);
    } else {
        snprintf(buf, sizeof(buf), "Collecting...");
    }
    oled.drawString(0, 0, buf);

    if (historyCount < 2) {
        oled.display();
        return;
    }

    // [스케일] Y축 최소/최대 온도 계산
    float minT = tempHistory[0], maxT = tempHistory[0];
    for (int i = 1; i < historyCount; i++) {
        if (tempHistory[i] < minT) minT = tempHistory[i];
        if (tempHistory[i] > maxT) maxT = tempHistory[i];
    }
    // [범위 보정] 변화 폭이 너무 작으면 ±0.5 여유
    if (maxT - minT < 1.0f) { minT -= 0.5f; maxT += 0.5f; }

    // [그래프 영역] x: 14~127, y: 12~62
    int gTop = 12, gBottom = 62, gLeft = 14, gRight = 127;
    int gH = gBottom - gTop;
    int gW = gRight - gLeft;

    // [점 출력] 각 온도를 고정 간격 X에 'o'로 표시
    for (int i = 0; i < historyCount; i++) {
        int x = gLeft + i * gW / (HISTORY_SIZE - 1);
        int y = gBottom - (int)((tempHistory[i] - minT) / (maxT - minT) * gH);
        if (y < gTop)    y = gTop;
        if (y > gBottom) y = gBottom;
        oled.drawString(x, y, "o");
    }

    // [Y축 레이블] 최대/최소 온도 좌측 표시
    snprintf(buf, sizeof(buf), "%.0f", maxT);
    oled.drawString(0, gTop, buf);
    snprintf(buf, sizeof(buf), "%.0f", minT);
    oled.drawString(0, gBottom - 8, buf);

    oled.display();
}

// [측정 태스크] 3초마다 온도 측정 후 그래프 갱신
void tempGraphTask(void* pvParameters) {
    for (;;) {
        float temp, humi;
        bool ok = aht20_read(temp, humi);
        if (ok) {
            // [이력 추가] 버퍼 가득 차면 앞으로 밀고 새 값 추가
            if (historyCount < HISTORY_SIZE) {
                tempHistory[historyCount++] = temp;
            } else {
                memmove(tempHistory, tempHistory + 1, (HISTORY_SIZE - 1) * sizeof(float));
                tempHistory[HISTORY_SIZE - 1] = temp;
            }
            Serial.printf("[측정] %.1f C, %.1f%%\n", temp, humi);
        } else {
            Serial.println("[오류] AHT20 읽기 실패");
        }
        drawTempGraph();
        vTaskDelay(3000 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();
    // [태스크 시작] 온도 그래프 태스크 생성
    xTaskCreate(tempGraphTask, "TempGraph", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}