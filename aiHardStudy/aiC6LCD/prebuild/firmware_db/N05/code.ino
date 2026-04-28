// [BLE 이미지] 폰에서 RGB565 이미지 수신 → LCD 표시
uint8_t imgBuf[2048];
int imgIdx = 0;
int imgX = 0, imgY = 0;
bool receiving = false;
void onBleReceive(String cmd) {
  if (cmd == "IMG_START") {
    receiving = true; imgIdx = 0; imgX = 0; imgY = 0;
    lcdClear();
    lcdText(10, 150, "Receiving...", C_YELLOW, 2);
    setColor(0, 0, 255);
  } else if (cmd == "IMG_END") {
    receiving = false;
    lcdText(5, 300, "Image Done!", C_GREEN, 1);
    setColor(0, 255, 0);
  } else if (receiving && cmd.startsWith("PX:")) {
    int comma = cmd.indexOf(',', 3);
    int comma2 = cmd.indexOf(',', comma + 1);
    int x = cmd.substring(3, comma).toInt();
    int y = cmd.substring(comma + 1, comma2).toInt();
    uint16_t c = (uint16_t)strtoul(cmd.substring(comma2 + 1).c_str(), NULL, 16);
    lcd.drawPixel(x, y, c);
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Image", C_CYAN, 2);
  lcdText(10, 40, "Send IMG_START", C_GRAY, 1);
  lcdText(10, 55, "then PX:x,y,c", C_GRAY, 1);
  lcdText(10, 70, "then IMG_END", C_GRAY, 1);
}
void loop() { delay(10000); }
