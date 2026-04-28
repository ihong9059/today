// [사이먼] 색상 순서 기억 게임
uint16_t simonColors[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW};
uint8_t simonRGB[][3] = {{255,0,0},{0,255,0},{0,0,255},{255,255,0}};
uint8_t sequence[50];
int seqLen = 1, playIdx = 0;
int gameState = 0; // 0=SHOW, 1=INPUT, 2=FAIL, 3=WIN
int showIdx = 0;
unsigned long timer = 0;
bool lastBtn = HIGH;
char gbuf[16];
void newGame() {
  for (int i = 0; i < 50; i++) sequence[i] = random(0, 4);
  seqLen = 1; gameState = 0; showIdx = 0; timer = millis();
}
void drawGrid(int highlight) {
  for (int i = 0; i < 4; i++) {
    int x = (i % 2) * 86, y = 60 + (i / 2) * 100;
    uint16_t c = (i == highlight) ? simonColors[i] : lcd.color565(40, 40, 40);
    lcd.fillRect(x + 2, y + 2, 82, 92, c);
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  newGame();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  bool pressed = btn && lastBtn == HIGH;
  lastBtn = btn ? LOW : HIGH;
  if (gameState == 0) {
    lcdClear();
    snprintf(gbuf, sizeof(gbuf), "Level %d", seqLen);
    lcdText(30, 10, gbuf, C_CYAN, 2);
    drawGrid(-1);
    if (millis() - timer > 600) {
      if (showIdx < seqLen) {
        drawGrid(sequence[showIdx]);
        setColor(simonRGB[sequence[showIdx]][0], simonRGB[sequence[showIdx]][1], simonRGB[sequence[showIdx]][2]);
        showIdx++;
        timer = millis();
      } else {
        gameState = 1; playIdx = 0; ledOff();
        lcdText(20, 280, "Your turn!", C_GREEN, 2);
      }
    }
  } else if (gameState == 1) {
    if (pressed) {
      int choice = playIdx % 4;
      drawGrid(choice);
      setColor(simonRGB[choice][0], simonRGB[choice][1], simonRGB[choice][2]);
      if (choice == sequence[playIdx]) {
        playIdx++;
        if (playIdx >= seqLen) {
          seqLen++; gameState = 0; showIdx = 0; timer = millis();
          if (seqLen > 20) gameState = 3;
        }
      } else { gameState = 2; }
      delay(200); ledOff();
    }
  } else if (gameState == 2) {
    lcdClear();
    lcdText(20, 100, "WRONG!", C_RED, 3);
    snprintf(gbuf, sizeof(gbuf), "Level %d", seqLen - 1);
    lcdText(20, 160, gbuf, C_YELLOW, 2);
    setColor(255, 0, 0);
    if (pressed) newGame();
  } else {
    lcdClear(); lcdText(10, 100, "YOU WIN!", C_GREEN, 3);
    if (pressed) newGame();
  }
  delay(30);
}
