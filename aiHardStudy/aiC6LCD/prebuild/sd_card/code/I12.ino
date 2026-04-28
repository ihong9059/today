// [테트리스] 미니 블록 게임
#define TW 10
#define TH 20
#define BS 15
uint8_t board[TH][TW] = {0};
int cx = 4, cy = 0, ctype = 0, crot = 0;
int score = 0;
bool gameOver = false;
bool lastBtn = HIGH;
unsigned long lastDrop = 0;
const uint8_t pieces[4][4][2] = {
  {{0,0},{1,0},{0,1},{1,1}},  // O
  {{0,0},{1,0},{2,0},{3,0}},  // I
  {{0,0},{1,0},{2,0},{1,1}},  // T
  {{0,0},{1,0},{1,1},{2,1}}   // S
};
uint16_t pcolors[] = {C_YELLOW, C_CYAN, C_PURPLE, C_GREEN};
bool canPlace(int px, int py, int t) {
  for (int i = 0; i < 4; i++) {
    int x = px + pieces[t][i][0], y = py + pieces[t][i][1];
    if (x < 0 || x >= TW || y >= TH) return false;
    if (y >= 0 && board[y][x]) return false;
  }
  return true;
}
void place() {
  for (int i = 0; i < 4; i++) {
    int x = cx + pieces[ctype][i][0], y = cy + pieces[ctype][i][1];
    if (y >= 0 && y < TH) board[y][x] = ctype + 1;
  }
  for (int r = TH - 1; r >= 0; r--) {
    bool full = true;
    for (int c = 0; c < TW; c++) if (!board[r][c]) full = false;
    if (full) {
      for (int rr = r; rr > 0; rr--) for (int c = 0; c < TW; c++) board[rr][c] = board[rr-1][c];
      for (int c = 0; c < TW; c++) board[0][c] = 0;
      score += 10; r++;
    }
  }
  ctype = random(0, 4); cx = 4; cy = 0;
  if (!canPlace(cx, cy, ctype)) gameOver = true;
}
void drawBoard() {
  lcd.fillRect(0, 0, TW * BS + 2, TH * BS + 2, C_BG);
  lcd.drawRect(0, 0, TW * BS + 2, TH * BS + 2, C_GRAY);
  for (int r = 0; r < TH; r++)
    for (int c = 0; c < TW; c++)
      if (board[r][c]) lcd.fillRect(c * BS + 1, r * BS + 1, BS - 1, BS - 1, pcolors[board[r][c]-1]);
  for (int i = 0; i < 4; i++) {
    int x = cx + pieces[ctype][i][0], y = cy + pieces[ctype][i][1];
    if (y >= 0) lcd.fillRect(x * BS + 1, y * BS + 1, BS - 1, BS - 1, pcolors[ctype]);
  }
  char buf[16]; snprintf(buf, sizeof(buf), "S:%d", score);
  lcdText(155, 10, buf, C_TEXT, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  ctype = random(0, 4);
}
void loop() {
  if (gameOver) {
    lcdText(10, 140, "GAME OVER", C_RED, 2);
    delay(100); return;
  }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    if (canPlace(cx + 1, cy, ctype)) cx++;
    else if (canPlace(cx - 1, cy, ctype)) cx--;
  }
  lastBtn = btn;
  if (millis() - lastDrop > 500) {
    lastDrop = millis();
    if (canPlace(cx, cy + 1, ctype)) cy++;
    else place();
  }
  drawBoard();
  delay(30);
}
