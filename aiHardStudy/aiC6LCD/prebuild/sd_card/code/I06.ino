// [틱택토] LCD에 게임 보드 표시
int board[9] = {0};
int cursor = 0;
bool playerX = true;
bool lastBtn = HIGH;
unsigned long pressStart = 0;
bool pressing = false;
void drawBoard() {
  lcdClear();
  lcdText(20, 5, "Tic-Tac-Toe", C_CYAN, 2);
  int ox = 11, oy = 40, sz = 50;
  for (int i = 1; i < 3; i++) {
    lcd.drawLine(ox + i * sz, oy, ox + i * sz, oy + 3 * sz, C_TEXT);
    lcd.drawLine(ox, oy + i * sz, ox + 3 * sz, oy + i * sz, C_TEXT);
  }
  for (int i = 0; i < 9; i++) {
    int cx = ox + (i % 3) * sz + sz / 2;
    int cy = oy + (i / 3) * sz + sz / 2;
    if (i == cursor) lcd.drawRect(ox + (i % 3) * sz + 2, oy + (i / 3) * sz + 2, sz - 4, sz - 4, C_YELLOW);
    if (board[i] == 1) { lcdText(cx - 9, cy - 9, "X", C_RED, 3); }
    else if (board[i] == 2) { lcdText(cx - 9, cy - 9, "O", C_BLUE, 3); }
  }
  lcdText(5, 210, playerX ? "X turn" : "O turn", playerX ? C_RED : C_BLUE, 2);
  lcdText(5, 240, "Short:Move", C_GRAY, 1);
  lcdText(5, 255, "Long: Place", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawBoard();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (dur > 400 && board[cursor] == 0) {
      board[cursor] = playerX ? 1 : 2;
      playerX = !playerX;
    } else if (dur <= 400) {
      cursor = (cursor + 1) % 9;
    }
    drawBoard();
  }
  delay(20);
}
