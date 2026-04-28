// [미로 탈출] 버튼으로 미로 탐색
#define MW 11
#define MH 17
#define CS 15
uint8_t maze[MH][MW];
int px = 1, py = 1;
int dir = 0;
bool lastBtn = HIGH;
bool won = false;
unsigned long pressTime = 0;
bool pressing = false;
void genMaze() {
  for (int y = 0; y < MH; y++) for (int x = 0; x < MW; x++) maze[y][x] = 1;
  maze[1][1] = 0;
  int stack[200][2]; int top = 0;
  stack[0][0] = 1; stack[0][1] = 1;
  while (top >= 0) {
    int cx = stack[top][0], cy = stack[top][1];
    int dirs[4][2] = {{0,-2},{2,0},{0,2},{-2,0}};
    int valid[4], vc = 0;
    for (int d = 0; d < 4; d++) {
      int nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      if (nx > 0 && nx < MW - 1 && ny > 0 && ny < MH - 1 && maze[ny][nx] == 1)
        valid[vc++] = d;
    }
    if (vc > 0) {
      int d = valid[random(0, vc)];
      int nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      maze[cy + dirs[d][1]/2][cx + dirs[d][0]/2] = 0;
      maze[ny][nx] = 0;
      top++; stack[top][0] = nx; stack[top][1] = ny;
    } else top--;
  }
  maze[MH-2][MW-2] = 0;
  maze[MH-2][MW-3] = 0;
}
void drawMaze() {
  lcd.fillScreen(C_BG);
  for (int y = 0; y < MH; y++)
    for (int x = 0; x < MW; x++) {
      uint16_t c = maze[y][x] ? lcd.color565(60, 60, 80) : C_BG;
      if (x == MW-2 && y == MH-2) c = C_GREEN;
      lcd.fillRect(x * CS + 1, y * CS + 1, CS - 1, CS - 1, c);
    }
  lcd.fillCircle(px * CS + CS/2, py * CS + CS/2, 4, C_YELLOW);
  lcdText(5, 260, "Short:Turn", C_GRAY, 1);
  lcdText(5, 275, "Long: Move", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  genMaze();
  drawMaze();
}
void loop() {
  if (won) { delay(100); return; }
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressTime = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressTime;
    if (dur > 300) {
      int dx[] = {0,1,0,-1}, dy[] = {-1,0,1,0};
      int nx = px + dx[dir], ny = py + dy[dir];
      if (nx > 0 && nx < MW-1 && ny > 0 && ny < MH-1 && maze[ny][nx] == 0) {
        px = nx; py = ny;
      }
    } else {
      dir = (dir + 1) % 4;
    }
    drawMaze();
    if (px == MW-2 && py == MH-2) {
      won = true;
      lcdText(10, 290, "ESCAPED!", C_GREEN, 2);
      setColor(0, 255, 0);
    }
  }
  delay(20);
}
