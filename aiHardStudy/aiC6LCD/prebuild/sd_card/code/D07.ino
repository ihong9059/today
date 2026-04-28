// [아날로그 시계] UTTEC C6-LCD 아날로그 시계

#define CX   86    // 시계 중심 X (화면 가로 중앙)
#define CY  165    // 시계 중심 Y
#define CR   75    // 시계 반지름

uint16_t CFACE;    // 시계 내부 배경색 (setup에서 초기화)

// [바늘] 각도(도)로 바늘 그리기, 수직 방향으로 두께 적용
void drawHand(float deg, int len, uint16_t color, int thick) {
  float rad = deg * PI / 180.0f;
  float sd = sinf(rad), cd = cosf(rad);
  int x2 = CX + (int)(len * sd);
  int y2 = CY - (int)(len * cd);
  int half = thick / 2;
  for (int d = -half; d <= half; d++) {
    lcd.drawLine(CX + (int)(d * cd), CY + (int)(d * sd),
                 x2  + (int)(d * cd), y2  + (int)(d * sd), color);
  }
}

// [시계판] 눈금 + 바늘 전체 갱신 (매초 호출)
void redrawClock(int h, int m, int s) {
  lcd.fillCircle(CX, CY, CR - 2, CFACE);  // 내부 클리어

  // [눈금] 60개 (5 배수 = 시간 눈금, 나머지 = 분 눈금)
  for (int i = 0; i < 60; i++) {
    float a = i * 6.0f * PI / 180.0f;
    bool isHour = (i % 5 == 0);
    int ro = CR - 4, ri = isHour ? CR - 16 : CR - 9;
    int x1 = CX + (int)(ro * sinf(a)), y1 = CY - (int)(ro * cosf(a));
    int x2 = CX + (int)(ri * sinf(a)), y2 = CY - (int)(ri * cosf(a));
    lcd.drawLine(x1, y1, x2, y2, isHour ? C_TEXT : C_GRAY);
    if (isHour) lcd.drawLine(x1 + 1, y1, x2 + 1, y2, C_TEXT);  // 시간 눈금 두껍게
  }

  // [시침] 흰색, 두께 4, 길이 38
  drawHand((h % 12) * 30.0f + m * 0.5f, 38, C_TEXT, 4);
  // [분침] 노란색, 두께 2, 길이 55
  drawHand(m * 6.0f + s * 0.1f, 55, C_YELLOW, 2);
  // [초침] 빨간색, 두께 1, 길이 65
  drawHand(s * 6.0f, 65, C_RED, 1);

  // [중심] 장식 원
  lcd.fillCircle(CX, CY, 5, C_GRAY);
  lcd.fillCircle(CX, CY, 3, C_ORANGE);
}

int gH = 12, gM = 0, gS = 0;
unsigned long prevMs = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  CFACE = lcd.color565(10, 10, 30);  // 어두운 네이비 배경색

  lcdClear();
  lcdText(14, 8, "Analog Clock", C_CYAN, 2);   // [제목] 상단 타이틀

  // [테두리] 시계 외곽 링 그리기
  lcd.fillCircle(CX, CY, CR + 3, lcd.color565(80, 80, 80));
  lcd.fillCircle(CX, CY, CR + 1, lcd.color565(20, 20, 45));
  lcd.fillCircle(CX, CY, CR,     CFACE);

  redrawClock(gH, gM, gS);  // 초기 시계 그리기

  // [디지털] 하단 초기 시간 표시
  lcdText(38, 294, "12:00:00", C_GREEN, 2);

  setColor(0, 10, 50);    // 파란빛 LED
  prevMs = millis();
}

void loop() {
  if (millis() - prevMs >= 1000) {
    prevMs += 1000;

    // [시간 증가] 초 → 분 → 시 순서로 올림
    if (++gS >= 60) { gS = 0; if (++gM >= 60) { gM = 0; if (++gH >= 12) gH = 0; } }

    redrawClock(gH, gM, gS);

    // [디지털] 하단 디지털 시간 갱신
    char buf[9];
    sprintf(buf, "%02d:%02d:%02d", gH == 0 ? 12 : gH, gM, gS);
    lcd.fillRect(28, 288, 120, 24, C_BG);
    lcdText(38, 294, buf, C_GREEN, 2);
  }
  delay(10);
}