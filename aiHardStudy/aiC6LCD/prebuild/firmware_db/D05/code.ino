// [체스판] 보드 오프셋 및 격자 크기 설정
#define SQUARE_SIZE 20
#define BOARD_COLS  8
#define BOARD_ROWS  8
#define OFFSET_X    ((172 - SQUARE_SIZE * BOARD_COLS) / 2)
#define OFFSET_Y    ((320 - SQUARE_SIZE * BOARD_ROWS) / 2)

// [체스판] 8x8 체스판 패턴을 LCD에 그리는 함수
void drawChessboard() {
  lcdClear();

  // [테두리] 체스판 외곽선 그리기
  lcd.drawRect(
    OFFSET_X - 2,
    OFFSET_Y - 2,
    SQUARE_SIZE * BOARD_COLS + 4,
    SQUARE_SIZE * BOARD_ROWS + 4,
    C_GRAY
  );

  // [격자] 행/열 순회하며 흑백 교차 칠하기
  for (int row = 0; row < BOARD_ROWS; row++) {
    for (int col = 0; col < BOARD_COLS; col++) {
      uint16_t color = ((row + col) % 2 == 0) ? C_TEXT : C_BG;
      int x = OFFSET_X + col * SQUARE_SIZE;
      int y = OFFSET_Y + row * SQUARE_SIZE;
      lcd.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE, color);
    }
  }

  // [타이틀] 상단에 제목 표시
  lcdText(22, OFFSET_Y - 30, "Chess Board", C_YELLOW, 2);

  // [좌표] 열 레이블 (A~H) 하단에 표시
  for (int col = 0; col < BOARD_COLS; col++) {
    char label[2] = { (char)('A' + col), '\0' };
    int x = OFFSET_X + col * SQUARE_SIZE + 6;
    int y = OFFSET_Y + BOARD_ROWS * SQUARE_SIZE + 5;
    lcdText(x, y, label, C_CYAN, 1);
  }

  // [좌표] 행 레이블 (1~8) 좌측에 표시
  for (int row = 0; row < BOARD_ROWS; row++) {
    char label[2] = { (char)('1' + row), '\0' };
    int x = OFFSET_X - 10;
    int y = OFFSET_Y + row * SQUARE_SIZE + 6;
    lcdText(x, y, label, C_CYAN, 1);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 체스판 그리기
  drawChessboard();

  // [LED] 초록색으로 완료 표시
  setColor(0, 30, 0);
}

void loop() {
  delay(10000);
}