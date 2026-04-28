// [백라이트] LCD 밝기 조절
int brightness = 0;
int dir = 5;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 40, "Backlight", C_CYAN, 3);
  lcdText(10, 80, "Control", C_CYAN, 3);
}
void loop() {
  brightness += dir;
  if (brightness >= 255) { brightness = 255; dir = -5; }
  if (brightness <= 0) { brightness = 0; dir = 5; }
  analogWrite(22, brightness);
  char buf[16];
  snprintf(buf, sizeof(buf), "BL: %3d", brightness);
  lcdText(20, 150, buf, C_TEXT, 2);
  lcd.fillRect(20, 180, (int)(brightness * 132.0 / 255), 20, C_GREEN);
  lcd.fillRect(20 + (int)(brightness * 132.0 / 255), 180, 132 - (int)(brightness * 132.0 / 255), 20, C_BG);
  delay(30);
}
