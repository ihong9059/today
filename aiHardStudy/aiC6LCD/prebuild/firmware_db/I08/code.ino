// [뱀 게임] LCD 스네이크 게임
#define GS 10
#define GW 17
#define GH 28
int snakeX[100], snakeY[100];
int snakeLen = 3;
int dir = 0;
int foodX, foodY;
bool gameOver = false;
bool lastBtn = HIGH;
int score = 0;
void placeFood() {
  foodX = random(0, GW);
  foodY = random(2, GH);
}
void drawCell(int gx, int gy, uint16_t c) {
  lcd.fillRect(gx * GS + 1, gy * GS + 1, GS - 2, GS - 2, c);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  snakeX[0] = 8; snakeY[0] = 14;
  snakeX[1] = 7; snakeY[1] = 14;
  snakeX[2] = 6; snakeY[2] = 14;
  placeFood();
  lcdClear();
  lcdText(10, 2, "Snake", C_CYAN, 1);
}
void loop() {
  if (gameOver) { delay(100); return; }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) dir = (dir + 1) % 4;
  lastBtn = btn;
  int nx = snakeX[0], ny = snakeY[0];
  if (dir == 0) nx++; else if (dir == 1) ny++; else if (dir == 2) nx--; else ny--;
  if (nx < 0 || nx >= GW || ny < 2 || ny >= GH) {
    gameOver = true;
    lcdText(10, 130, "GAME OVER", C_RED, 2);
    char buf[16]; snprintf(buf, sizeof(buf), "Score:%d", score);
    lcdText(20, 160, buf, C_YELLOW, 2);
    setColor(255, 0, 0);
    return;
  }
  for (int i = 0; i < snakeLen; i++)
    if (snakeX[i] == nx && snakeY[i] == ny) { gameOver = true; return; }
  bool ate = (nx == foodX && ny == foodY);
  if (!ate) { drawCell(snakeX[snakeLen - 1], snakeY[snakeLen - 1], C_BG); }
  for (int i = ate ? snakeLen : snakeLen - 1; i > 0; i--) {
    snakeX[i] = snakeX[i - 1]; snakeY[i] = snakeY[i - 1];
  }
  snakeX[0] = nx; snakeY[0] = ny;
  if (ate) { snakeLen++; score++; placeFood(); setColor(0, 255, 0); }
  for (int i = 0; i < snakeLen; i++)
    drawCell(snakeX[i], snakeY[i], (i == 0) ? C_GREEN : C_CYAN);
  drawCell(foodX, foodY, C_RED);
  char buf[16]; snprintf(buf, sizeof(buf), "S:%d", score);
  lcd.fillRect(100, 0, 72, 12, C_BG);
  lcdText(100, 2, buf, C_YELLOW, 1);
  delay(150);
}
