// [가위바위보] 버튼으로 선택하는 게임
const char* choices[] = {"Rock", "Scissors", "Paper"};
uint16_t choiceColors[] = {C_RED, C_BLUE, C_GREEN};
int playerChoice = 0;
bool selecting = true;
bool lastBtn = HIGH;
void drawSelect() {
  lcdClear();
  lcdText(10, 10, "Rock Paper", C_CYAN, 2);
  lcdText(10, 35, "Scissors!", C_CYAN, 2);
  for (int i = 0; i < 3; i++) {
    uint16_t c = (i == playerChoice) ? choiceColors[i] : C_GRAY;
    char buf[20];
    snprintf(buf, sizeof(buf), "%s %s", (i == playerChoice) ? ">" : " ", choices[i]);
    lcdText(20, 80 + i * 35, buf, c, 2);
  }
  lcdText(5, 230, "Short:Move Long:OK", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  drawSelect();
}
unsigned long pressStart = 0;
bool pressing = false;
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (selecting) {
      if (dur > 400) {
        int cpu = random(0, 3);
        lcdClear();
        lcdText(10, 20, "You:", C_TEXT, 2);
        lcdText(10, 50, choices[playerChoice], choiceColors[playerChoice], 3);
        lcdText(10, 100, "CPU:", C_TEXT, 2);
        lcdText(10, 130, choices[cpu], choiceColors[cpu], 3);
        int result = (playerChoice - cpu + 3) % 3;
        if (result == 0) { lcdText(10, 200, "DRAW!", C_YELLOW, 3); setColor(255, 255, 0); }
        else if (result == 1) { lcdText(10, 200, "YOU WIN!", C_GREEN, 3); setColor(0, 255, 0); }
        else { lcdText(10, 200, "YOU LOSE", C_RED, 3); setColor(255, 0, 0); }
        selecting = false;
      } else {
        playerChoice = (playerChoice + 1) % 3;
        drawSelect();
      }
    } else {
      selecting = true;
      playerChoice = 0;
      drawSelect();
      ledOff();
    }
  }
  delay(20);
}
