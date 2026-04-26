// [무지개] HSV to RGB 변환으로 무지개 색상 순환

uint8_t hue = 0; // 현재 색상 (0~255)

// HSV → RGB 변환 (S=255, V=255 고정)
void hsvToRgb(uint8_t h, uint8_t &r, uint8_t &g, uint8_t &b) {
  uint8_t region = h / 43;
  uint8_t remainder = (h - region * 43) * 6;
  uint8_t q = 255 - remainder;
  uint8_t t = remainder;
  switch (region) {
    case 0: r=255; g=t;   b=0;   break;
    case 1: r=q;   g=255; b=0;   break;
    case 2: r=0;   g=255; b=t;   break;
    case 3: r=0;   g=q;   b=255; break;
    case 4: r=t;   g=0;   b=255; break;
    default:r=255; g=0;   b=q;   break;
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] 안내 텍스트 표시
  lcdClear();
  lcdText(20, 140, "Rainbow LED", C_TEXT, 2);
  lcdText(30, 165, "Cycling...", C_CYAN, 2);
}

void loop() {
  uint8_t r, g, b;
  hsvToRgb(hue, r, g, b); // 현재 색조로 RGB 계산
  setColor(r, g, b);       // LED 색상 적용

  // [LCD] 현재 RGB 값 표시
  lcd.fillRect(0, 200, 172, 40, C_BG);
  lcd.setTextColor(lcd.color565(r, g, b), C_BG);
  lcd.setTextSize(2);
  lcd.setCursor(10, 210);
  lcd.printf("R:%3d G:%3d B:%3d", r, g, b);

  hue++; // 색조 단계 증가 (0~255 자동 순환)
  delay(20); // 순환 속도 조절
}