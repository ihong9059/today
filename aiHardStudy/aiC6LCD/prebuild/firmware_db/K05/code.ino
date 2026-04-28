// [미니 OS] 메뉴와 여러 앱이 있는 시스템
int app = 0;
bool lastBtn = HIGH;
unsigned long pressStart = 0;
bool pressing = false;
void drawMenu() {
  lcdClear();
  lcdText(10, 5, "UTTEC OS", C_CYAN, 2);
  lcd.drawLine(0, 28, 172, 28, C_GRAY);
  const char* apps[] = {"Clock", "LED Test", "Counter", "Info"};
  uint16_t cols[] = {C_GREEN, C_RED, C_YELLOW, C_BLUE};
  for (int i = 0; i < 4; i++) {
    int y = 40 + i * 55;
    uint16_t c = (i == app) ? cols[i] : C_GRAY;
    lcd.drawRect(10, y, 152, 45, c);
    if (i == app) lcd.fillRect(11, y + 1, 150, 43, lcd.color565(20, 20, 40));
    lcdText(25, y + 12, apps[i], c, 2);
  }
  lcdText(5, 270, "Short:Next", C_GRAY, 1);
  lcdText(5, 285, "Long: Open", C_GRAY, 1);
}
void appClock() {
  lcdClear();
  lcdText(10, 5, "< Clock", C_GRAY, 1);
  while (true) {
    unsigned long t = millis() / 1000;
    char buf[16];
    snprintf(buf, sizeof(buf), "%02lu:%02lu:%02lu", (t/3600)%24, (t/60)%60, t%60);
    lcd.fillRect(0, 80, 172, 60, C_BG);
    lcdText(5, 90, buf, C_GREEN, 4);
    if (digitalRead(9) == LOW) { delay(200); return; }
    delay(500);
  }
}
void appLED() {
  lcdClear();
  lcdText(10, 5, "< LED Test", C_GRAY, 1);
  uint16_t cs[] = {C_RED, C_GREEN, C_BLUE};
  uint8_t rgb[][3] = {{255,0,0},{0,255,0},{0,0,255}};
  for (int i = 0; i < 3; i++) {
    setColor(rgb[i][0], rgb[i][1], rgb[i][2]);
    lcd.fillScreen(cs[i]);
    delay(800);
  }
  ledOff();
}
void appCounter() {
  lcdClear();
  lcdText(10, 5, "< Counter", C_GRAY, 1);
  int cnt = 0;
  bool lb = HIGH;
  while (true) {
    bool b = digitalRead(9);
    if (b == LOW && lb == HIGH) cnt++;
    lb = b;
    char buf[16]; snprintf(buf, sizeof(buf), "%d", cnt);
    lcd.fillRect(0, 100, 172, 60, C_BG);
    lcdText(40, 110, buf, C_YELLOW, 4);
    if (cnt > 20) return;
    delay(30);
  }
}
void appInfo() {
  lcdClear();
  lcdText(10, 5, "< Info", C_GRAY, 1);
  lcdText(10, 40, "UTTEC C6-LCD", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Heap:%u", ESP.getFreeHeap());
  lcdText(10, 70, buf, C_TEXT, 1);
  snprintf(buf, sizeof(buf), "Up:%lus", millis()/1000);
  lcdText(10, 90, buf, C_TEXT, 1);
  delay(3000);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawMenu();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (dur > 400) {
      switch (app) {
        case 0: appClock(); break;
        case 1: appLED(); break;
        case 2: appCounter(); break;
        case 3: appInfo(); break;
      }
      drawMenu();
    } else {
      app = (app + 1) % 4;
      drawMenu();
    }
  }
  delay(20);
}
