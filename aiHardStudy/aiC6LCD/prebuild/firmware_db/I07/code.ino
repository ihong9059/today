// [벽돌깨기] 미니 아케이드 게임
int paddleX = 70;
int ballX = 86, ballY = 250;
int ballDX = 2, ballDY = -2;
uint8_t bricks[3][5];
bool lastBtn = HIGH;
bool gameOver = false;
void initBricks() {
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      bricks[r][c] = 1;
}
void drawGame() {
  lcd.fillScreen(C_BG);
  uint16_t brickColors[] = {C_RED, C_YELLOW, C_GREEN};
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      if (bricks[r][c])
        lcd.fillRect(c * 34 + 2, r * 18 + 10, 30, 14, brickColors[r]);
  lcd.fillRect(paddleX, 290, 32, 6, C_CYAN);
  lcd.fillCircle(ballX, ballY, 4, C_TEXT);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  initBricks();
  drawGame();
}
void loop() {
  if (gameOver) { delay(100); return; }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) paddleX += 20;
  if (paddleX > 140) paddleX = 0;
  lastBtn = btn;
  ballX += ballDX; ballY += ballDY;
  if (ballX <= 4 || ballX >= 168) ballDX = -ballDX;
  if (ballY <= 4) ballDY = -ballDY;
  if (ballY >= 288 && ballX >= paddleX && ballX <= paddleX + 32) ballDY = -ballDY;
  if (ballY > 310) {
    gameOver = true;
    lcdClear();
    lcdText(20, 120, "GAME OVER", C_RED, 3);
    setColor(255, 0, 0);
    return;
  }
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      if (bricks[r][c]) {
        int bx = c * 34 + 2, by = r * 18 + 10;
        if (ballX > bx && ballX < bx + 30 && ballY > by && ballY < by + 14) {
          bricks[r][c] = 0;
          ballDY = -ballDY;
        }
      }
  drawGame();
  delay(30);
}
