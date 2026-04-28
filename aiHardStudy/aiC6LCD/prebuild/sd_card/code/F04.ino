// [배경색 변경] 버튼으로 LCD 배경색 순환
uint16_t colors[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN, C_PURPLE, C_ORANGE, C_BG};
const char* names[] = {"RED", "GREEN", "BLUE", "YELLOW", "CYAN", "PURPLE", "ORANGE", "BLACK"};
int idx = 0;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcd.fillScreen(colors[idx]);
  lcdText(10, 140, names[idx], C_TEXT, 3);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    idx = (idx + 1) % 8;
    lcd.fillScreen(colors[idx]);
    uint16_t tc = (idx == 7) ? C_TEXT : C_BG;
    lcdText(10, 140, names[idx], tc, 3);
  }
  lastBtn = btn;
  delay(50);
}
