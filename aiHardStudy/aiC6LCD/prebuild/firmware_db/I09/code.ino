// [플래피버드] 버튼으로 새를 점프시켜 장애물 피하기
int birdY = 160, birdVel = 0;
int pipeX = 172, gapY = 140, gapH = 80;
int score = 0;
bool gameOver = false;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
}
void loop() {
  if (gameOver) {
    if (digitalRead(9) == LOW && lastBtn == HIGH) {
      birdY = 160; birdVel = 0; pipeX = 172; score = 0; gameOver = false;
    }
    lastBtn = digitalRead(9);
    delay(30); return;
  }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) birdVel = -6;
  lastBtn = btn;
  birdVel += 1;
  birdY += birdVel;
  if (birdY < 5) { birdY = 5; birdVel = 0; }
  if (birdY > 310) { birdY = 310; gameOver = true; }
  pipeX -= 3;
  if (pipeX < -20) {
    pipeX = 172;
    gapY = random(60, 240);
    score++;
  }
  if (pipeX < 30 && pipeX > 0) {
    if (birdY < gapY - gapH/2 || birdY > gapY + gapH/2) gameOver = true;
  }
  lcd.fillScreen(lcd.color565(30, 30, 80));
  lcd.fillCircle(20, birdY, 6, C_YELLOW);
  lcd.fillRect(pipeX, 0, 20, gapY - gapH/2, C_GREEN);
  lcd.fillRect(pipeX, gapY + gapH/2, 20, 320 - gapY - gapH/2, C_GREEN);
  char buf[16]; snprintf(buf, sizeof(buf), "%d", score);
  lcdText(75, 5, buf, C_TEXT, 3);
  if (gameOver) {
    lcdText(15, 130, "GAME OVER", C_RED, 3);
    snprintf(buf, sizeof(buf), "Score: %d", score);
    lcdText(25, 180, buf, C_YELLOW, 2);
    setColor(255, 0, 0);
  }
  delay(30);
}
