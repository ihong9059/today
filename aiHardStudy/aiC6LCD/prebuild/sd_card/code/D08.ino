// [게이지] LCD에 반원형 게이지 표시
int value = 0;
int dir = 1;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 10, "Gauge", C_YELLOW, 3);
}
void loop() {
  value += dir;
  if (value >= 100) dir = -1;
  if (value <= 0) dir = 1;
  int cx = 86, cy = 180, r = 70;
  lcd.fillRect(0, 50, 172, 200, C_BG);
  lcd.drawCircle(cx, cy, r, C_GRAY);
  lcd.drawCircle(cx, cy, r - 1, C_GRAY);
  for (int i = 0; i <= 10; i++) {
    float a = 3.14159 - i * 3.14159 / 10;
    int x1 = cx + (int)(cos(a) * (r - 8));
    int y1 = cy - (int)(sin(a) * (r - 8));
    int x2 = cx + (int)(cos(a) * r);
    int y2 = cy - (int)(sin(a) * r);
    lcd.drawLine(x1, y1, x2, y2, C_TEXT);
  }
  float needle = 3.14159 - value * 3.14159 / 100;
  int nx = cx + (int)(cos(needle) * (r - 15));
  int ny = cy - (int)(sin(needle) * (r - 15));
  lcd.drawLine(cx, cy, nx, ny, C_RED);
  lcd.fillCircle(cx, cy, 4, C_RED);
  char buf[16];
  snprintf(buf, sizeof(buf), "%d%%", value);
  lcdText(60, 200, buf, C_GREEN, 3);
  delay(50);
}
