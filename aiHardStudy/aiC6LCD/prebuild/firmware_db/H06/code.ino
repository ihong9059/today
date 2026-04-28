// [색상 순환] LCD 색상이름 표시 + LED 동기화
struct CInfo { const char* name; uint8_t r, g, b; uint16_t c565; };
CInfo clist[] = {
  {"RED",255,0,0,0xF800}, {"GREEN",0,255,0,0x07E0}, {"BLUE",0,0,255,0x001F},
  {"YELLOW",255,255,0,0xFFE0}, {"CYAN",0,255,255,0x07FF}, {"PURPLE",128,0,255,0x780F},
  {"ORANGE",255,128,0,0xFD20}, {"WHITE",255,255,255,0xFFFF}
};
int ci = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  CInfo& c = clist[ci];
  setColor(c.r, c.g, c.b);
  lcdClear();
  lcd.fillRect(10, 10, 152, 80, c.c565);
  lcdText(20, 110, c.name, c.c565, 3);
  char buf[32];
  snprintf(buf, sizeof(buf), "RGB(%d,%d,%d)", c.r, c.g, c.b);
  lcdText(5, 160, buf, C_TEXT, 1);
  snprintf(buf, sizeof(buf), "#%02X%02X%02X", c.r, c.g, c.b);
  lcdText(20, 190, buf, C_YELLOW, 2);
  ci = (ci + 1) % 8;
  delay(3000);
}
