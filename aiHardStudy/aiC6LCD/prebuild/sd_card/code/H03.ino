// [무지개+코드] LED 무지개 + LCD RGB 값 표시
uint16_t hue = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  hue += 256;
  if (hue >= 65536) hue = 0;
  uint32_t c = pixel.ColorHSV(hue, 255, 128);
  uint8_t r = (c >> 16) & 0xFF, g = (c >> 8) & 0xFF, b = c & 0xFF;
  setColor(r, g, b);
  lcd.fillRect(0, 0, 172, 160, C_BG);
  lcdText(10, 10, "Rainbow", C_TEXT, 2);
  lcd.fillRect(20, 40, 132, 40, lcd.color565(r, g, b));
  char buf[32];
  snprintf(buf, sizeof(buf), "R: %3d", r); lcdText(20, 95, buf, C_RED, 2);
  snprintf(buf, sizeof(buf), "G: %3d", g); lcdText(20, 115, buf, C_GREEN, 2);
  snprintf(buf, sizeof(buf), "B: %3d", b); lcdText(20, 135, buf, C_BLUE, 2);
  snprintf(buf, sizeof(buf), "HUE: %5d", hue); lcdText(10, 165, buf, C_YELLOW, 1);
  delay(50);
}
