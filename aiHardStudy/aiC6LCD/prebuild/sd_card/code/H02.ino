// [LED 색상 텍스트] LED 색상명을 LCD에 표시
struct ColorInfo { const char* name; uint8_t r, g, b; uint16_t lcdColor; };
ColorInfo colors[] = {
  {"RED", 255, 0, 0, 0xF800}, {"GREEN", 0, 255, 0, 0x07E0},
  {"BLUE", 0, 0, 255, 0x001F}, {"YELLOW", 255, 255, 0, 0xFFE0},
  {"CYAN", 0, 255, 255, 0x07FF}, {"PURPLE", 128, 0, 255, 0x780F},
  {"ORANGE", 255, 128, 0, 0xFD20}, {"WHITE", 255, 255, 255, 0xFFFF}
};
int idx = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  ColorInfo& c = colors[idx];
  setColor(c.r, c.g, c.b);
  lcdClear();
  lcdText(10, 10, "LED Color:", C_GRAY, 2);
  lcdText(10, 60, c.name, c.lcdColor, 4);
  char buf[32];
  snprintf(buf, sizeof(buf), "R:%d G:%d B:%d", c.r, c.g, c.b);
  lcdText(10, 130, buf, C_TEXT, 2);
  idx = (idx + 1) % 8;
  delay(2000);
}
