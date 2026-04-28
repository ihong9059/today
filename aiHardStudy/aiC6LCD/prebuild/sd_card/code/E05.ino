// [스크롤] 텍스트 스크롤 데모

#define SCROLL_SPEED 3      // 픽셀/프레임 이동 속도
#define TEXT_SIZE    3      // 텍스트 크기
#define TEXT_HEIGHT  24     // size3 = ~24px 높이
#define PADDING      8      // 줄 간격

// 스크롤할 메시지 목록
const char* messages[] = {
  "UTTEC C6-LCD",
  "ESP32-C6",
  "RISC-V Core",
  "WiFi 6 Ready",
  "BLE 5.0",
  "Arduino FW",
  "Hello World!",
  "Scroll Demo",
};
const int MSG_COUNT = sizeof(messages) / sizeof(messages[0]);

// 각 줄의 Y 위치 (픽셀)
int lineY[MSG_COUNT];

// 텍스트 픽셀 너비 계산 (글자수 * size * 6)
int textWidth(const char* s, int size) {
  return strlen(s) * 6 * size;
}

// 한 줄 그리기 (이전 위치 지우고 새 위치에 그리기)
void drawLine(int idx, int y, int prevY) {
  // [지우기] 이전 위치 검은색으로 덮기
  if (prevY != y) {
    lcd.fillRect(0, prevY, 172, TEXT_HEIGHT + 2, C_BG);
  }
  if (y + TEXT_HEIGHT < 0 || y > 320) return; // 화면 밖

  // [색상] 인덱스별 다른 색
  uint16_t colors[] = {C_CYAN, C_GREEN, C_YELLOW, C_ORANGE, C_PURPLE, C_RED, C_TEXT, C_BLUE};
  uint16_t col = colors[idx % 8];

  // [중앙정렬] X 중앙 계산
  int tw = textWidth(messages[idx], TEXT_SIZE);
  int x = (172 - tw) / 2;
  if (x < 0) x = 0;

  lcd.setTextColor(col, C_BG);
  lcd.setTextSize(TEXT_SIZE);
  lcd.setCursor(x, y);
  lcd.print(messages[idx]);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();

  // [초기화] 각 줄 시작 Y 위치 설정 (화면 아래부터 위로)
  int lineSpacing = TEXT_HEIGHT + PADDING;
  for (int i = 0; i < MSG_COUNT; i++) {
    lineY[i] = 320 + i * lineSpacing; // 화면 아래에서 시작
  }

  // [LED] 스크롤 시작 표시
  setColor(0, 100, 255);
}

void loop() {
  int lineSpacing = TEXT_HEIGHT + PADDING;
  int totalHeight = MSG_COUNT * lineSpacing;

  for (int i = 0; i < MSG_COUNT; i++) {
    int prev = lineY[i];
    lineY[i] -= SCROLL_SPEED; // [이동] 위로 스크롤

    // [순환] 화면 위로 사라지면 맨 아래로
    if (lineY[i] + TEXT_HEIGHT < 0) {
      lineY[i] = 320 + (lineSpacing - (abs(lineY[i]) % lineSpacing));
      lcd.fillRect(0, prev, 172, TEXT_HEIGHT + 2, C_BG);
    }

    drawLine(i, lineY[i], prev);
  }

  delay(30); // ~33fps
}