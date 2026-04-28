// [주사위] 버튼으로 굴리기
bool lastBtn = HIGH;
void drawDie(int val) {
  int cx = 86, cy = 140, sz = 60;
  lcd.fillRect(cx - sz, cy - sz, sz * 2, sz * 2, C_TEXT);
  lcd.drawRect(cx - sz, cy - sz, sz * 2, sz * 2, C_GRAY);
  int r = 8;
  if (val == 1 || val == 3 || val == 5) lcd.fillCircle(cx, cy, r, C_BG);
  if (val >= 2) { lcd.fillCircle(cx - 30, cy - 30, r, C_BG); lcd.fillCircle(cx + 30, cy + 30, r, C_BG); }
  if (val >= 4) { lcd.fillCircle(cx + 30, cy - 30, r, C_BG); lcd.fillCircle(cx - 30, cy + 30, r, C_BG); }
  if (val == 6) { lcd.fillCircle(cx - 30, cy, r, C_BG); lcd.fillCircle(cx + 30, cy, r, C_BG); }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  lcdClear();
  lcdText(20, 10, "Dice", C_CYAN, 3);
  lcdText(10, 250, "Press to roll!", C_GRAY, 2);
  drawDie(1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    for (int i = 0; i < 10; i++) {
      int v = random(1, 7);
      drawDie(v);
      delay(80 + i * 20);
    }
    int val = random(1, 7);
    drawDie(val);
    char buf[16];
    snprintf(buf, sizeof(buf), "= %d =", val);
    lcd.fillRect(0, 230, 172, 20, C_BG);
    lcdText(50, 230, buf, C_GREEN, 2);
    setColor(val * 40, 255 - val * 30, val * 20);
  }
  lastBtn = btn;
  delay(30);
}
