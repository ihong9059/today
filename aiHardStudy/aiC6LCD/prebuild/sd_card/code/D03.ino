// [신호등] 상태 정의
#define LIGHT_RED    0
#define LIGHT_GREEN  1
#define LIGHT_YELLOW 2

// [신호등] 각 상태 지속 시간 (ms)
#define DUR_RED    4000
#define DUR_GREEN  4000
#define DUR_YELLOW 1500

// [신호등] 화면 레이아웃 상수
#define TL_X    56   // 신호등 하우징 좌상단 X
#define TL_Y    60   // 신호등 하우징 좌상단 Y
#define TL_W    60   // 하우징 너비
#define TL_H   180   // 하우징 높이
#define TL_R    20   // 신호 원 반지름
#define TL_CX   86   // 원 중심 X (화면 가로 중앙)
#define TL_Y1  100   // 빨간불 중심 Y
#define TL_Y2  160   // 노란불 중심 Y
#define TL_Y3  220   // 초록불 중심 Y

// [신호등] 어두운 색 (꺼진 상태)
#define C_DARK_RED    0x4000
#define C_DARK_YELLOW 0x4400
#define C_DARK_GREEN  0x0200

int currentLight = LIGHT_RED;
unsigned long lastChange = 0;

// [신호등] 기둥 및 하우징 그리기 (최초 1회)
void drawFrame() {
  // 기둥
  lcd.fillRect(79, TL_Y + TL_H, 14, 40, C_GRAY);
  // 받침대
  lcd.fillRect(63, TL_Y + TL_H + 40, 46, 8, C_GRAY);
  // 하우징 배경
  lcd.fillRoundRect(TL_X, TL_Y, TL_W, TL_H, 10, C_GRAY);

  // 안쪽 검정 배경
  lcd.fillRoundRect(TL_X + 4, TL_Y + 4, TL_W - 8, TL_H - 8, 8, C_BG);

  // 제목
  lcdText(30, 15, "TRAFFIC LIGHT", C_TEXT, 1);
}

// [신호등] 세 원 모두 어둡게 초기화
void drawAllDark() {
  lcd.fillCircle(TL_CX, TL_Y1, TL_R, C_DARK_RED);
  lcd.fillCircle(TL_CX, TL_Y2, TL_R, C_DARK_YELLOW);
  lcd.fillCircle(TL_CX, TL_Y3, TL_R, C_DARK_GREEN);
}

// [신호등] 현재 상태에 따라 불 켜기
void drawLight(int state) {
  drawAllDark();
  switch (state) {
    case LIGHT_RED:
      lcd.fillCircle(TL_CX, TL_Y1, TL_R, C_RED);
      setColor(30, 0, 0);      // LED 빨강
      lcdText(20, 290, "    STOP    ", C_RED, 2);
      break;
    case LIGHT_GREEN:
      lcd.fillCircle(TL_CX, TL_Y3, TL_R, C_GREEN);
      setColor(0, 30, 0);      // LED 초록
      lcdText(20, 290, "    GO!!    ", C_GREEN, 2);
      break;
    case LIGHT_YELLOW:
      lcd.fillCircle(TL_CX, TL_Y2, TL_R, C_YELLOW);
      setColor(30, 20, 0);     // LED 노랑
      lcdText(20, 290, "  CAUTION   ", C_YELLOW, 2);
      break;
  }
}

// [신호등] 다음 상태로 전환
int nextState(int state) {
  if (state == LIGHT_RED)    return LIGHT_GREEN;
  if (state == LIGHT_GREEN)  return LIGHT_YELLOW;
  return LIGHT_RED;
}

// [신호등] 현재 상태의 지속 시간
unsigned long getDuration(int state) {
  if (state == LIGHT_RED)    return DUR_RED;
  if (state == LIGHT_GREEN)  return DUR_GREEN;
  return DUR_YELLOW;
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();
  drawFrame();
  drawLight(currentLight);
  lastChange = millis();
}

void loop() {
  unsigned long now = millis();

  // [신호등] 지정 시간 경과 시 다음 신호로 전환
  if (now - lastChange >= getDuration(currentLight)) {
    currentLight = nextState(currentLight);
    drawLight(currentLight);
    lastChange = now;
    Serial.printf("신호 전환: %d\n", currentLight);
  }

  delay(100);
}