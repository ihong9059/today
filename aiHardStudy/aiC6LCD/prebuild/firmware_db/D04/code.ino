// [막대그래프] 샘플 데이터 및 설정
const int BAR_COUNT = 6;
const char* barLabels[BAR_COUNT] = {"A", "B", "C", "D", "E", "F"};
int barValues[BAR_COUNT] = {80, 45, 95, 60, 30, 75}; // 0~100
uint16_t barColors[BAR_COUNT] = {C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN, C_ORANGE};

// [막대그래프] 그래프 레이아웃 상수
const int GRAPH_X = 10;
const int GRAPH_Y = 40;
const int GRAPH_W = 152;
const int GRAPH_H = 200;
const int BAR_GAP = 4;

void drawBarGraph() {
    // [배경] 화면 초기화 및 테두리
    lcdClear();
    lcd.drawRect(GRAPH_X - 2, GRAPH_Y - 2, GRAPH_W + 4, GRAPH_H + 4, C_GRAY);

    // [제목] 상단 타이틀
    lcdText(20, 10, "Bar Graph Demo", C_CYAN, 2);

    int barWidth = (GRAPH_W - (BAR_COUNT + 1) * BAR_GAP) / BAR_COUNT;
    int maxVal = 100;

    for (int i = 0; i < BAR_COUNT; i++) {
        // [막대] 각 막대 위치 및 높이 계산
        int x = GRAPH_X + BAR_GAP + i * (barWidth + BAR_GAP);
        int barH = (barValues[i] * GRAPH_H) / maxVal;
        int y = GRAPH_Y + GRAPH_H - barH;

        // [막대] 막대 그리기
        lcd.fillRect(x, y, barWidth, barH, barColors[i]);

        // [라벨] 하단 문자 표시
        lcd.setTextColor(C_TEXT, C_BG);
        lcd.setTextSize(1);
        lcd.setCursor(x + barWidth / 2 - 3, GRAPH_Y + GRAPH_H + 5);
        lcd.print(barLabels[i]);

        // [값] 막대 상단에 숫자 표시
        lcd.setCursor(x, y - 10 > GRAPH_Y ? y - 10 : GRAPH_Y);
        lcd.print(barValues[i]);
    }

    // [Y축] 기준선 그리기
    lcd.drawLine(GRAPH_X - 2, GRAPH_Y, GRAPH_X - 2, GRAPH_Y + GRAPH_H, C_WHITE);
    lcd.drawLine(GRAPH_X - 2, GRAPH_Y + GRAPH_H, GRAPH_X + GRAPH_W + 2, GRAPH_Y + GRAPH_H, C_WHITE);
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [초기화] 막대 그래프 출력
    drawBarGraph();

    // [LED] 초록색으로 준비 완료 표시
    setColor(0, 30, 0);
}

void loop() {
    delay(10000);
}