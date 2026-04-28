// [메뉴] 버튼으로 LCD 메뉴 탐색
const char* menus[] = {"LED Red", "LED Green", "LED Blue", "LED Off", "LCD Clear"};
int menuIdx = 0;
bool lastBtn = HIGH;
unsigned long lastPress = 0;
void drawMenu() {
  lcdClear();
  lcdText(10, 10, "= MENU =", C_YELLOW, 2);
  for (int i = 0; i < 5; i++) {
    uint16_t c = (i == menuIdx) ? C_GREEN : C_GRAY;
    char buf[32];
    snprintf(buf, sizeof(buf), "%s %s", (i == menuIdx) ? ">" : " ", menus[i]);
    lcdText(10, 50 + i * 30, buf, c, 2);
  }
  lcdText(10, 220, "Short:Move", C_TEXT, 1);
  lcdText(10, 235, "Long: Select", C_TEXT, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawMenu();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && lastBtn) {
    if (millis() - lastPress > 600) {
      switch (menuIdx) {
        case 0: setColor(255, 0, 0); break;
        case 1: setColor(0, 255, 0); break;
        case 2: setColor(0, 0, 255); break;
        case 3: ledOff(); break;
        case 4: lcdClear(); break;
      }
      lcdText(10, 270, "Selected!", C_GREEN, 2);
    }
  }
  if (!btn && !lastBtn) {
    unsigned long dur = millis() - lastPress;
    if (dur < 500) {
      menuIdx = (menuIdx + 1) % 5;
      drawMenu();
    }
    lastPress = millis();
  }
  if (btn && lastBtn == HIGH) lastPress = millis();
  lastBtn = !btn;
  delay(30);
}
