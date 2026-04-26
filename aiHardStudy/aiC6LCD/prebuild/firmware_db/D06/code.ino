// [설정] 태극 중심 및 크기
const int CX = 86;
const int CY = 165;
const int R  = 32;

// [태극] 픽셀 단위 태극 그리기 (적=양, 청=음)
void drawTaeguk(int cx, int cy, int r) {
  int hr = r / 2;
  for (int y = cy - r; y <= cy + r; y++) {
    for (int x = cx - r; x <= cx + r; x++) {
      int dx = x - cx, dy = y - cy;
      if (dx*dx + dy*dy > r*r) continue;
      int dyu = y - (cy - hr), dyd = y - (cy + hr);
      uint16_t col;
      if      (dx*dx + dyu*dyu <= hr*hr) col = C_RED;   // 상단 소원: 적
      else if (dx*dx + dyd*dyd <= hr*hr) col = C_BLUE;  // 하단 소원: 청
      else if (dy < 0)                   col = C_RED;   // 상반부: 양(적)
      else                               col = C_BLUE;  // 하반부: 음(청)
      lcd.drawPixel(x, y, col);
    }
  }
}

// [효] 양효(solid) 또는 음효(broken) 한 줄
void drawYao(int x, int y, int len, bool solid) {
  if (solid) {
    lcd.fillRect(x, y, len, 3, 0x0000);
  } else {
    lcd.fillRect(x,              y, (len/2)-2, 3, 0x0000);
    lcd.fillRect(x + (len/2)+2,  y, (len/2)-2, 3, 0x0000);
  }
}

// [괘] 3효 구성 괘 그리기
void drawGwae(int x, int y, bool y1, bool y2, bool y3) {
  drawYao(x, y,      24, y1);
  drawYao(x, y + 6,  24, y2);
  drawYao(x, y + 12, 24, y3);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcd.fillScreen(0xFFFF);                             // [배경] 흰색 배경
  lcd.drawRect(3, 95, 166, 130, 0xC618);              // [테두리] 국기 외곽선

  lcdText(22, 18, "TAEGEUKGI",   0x0000, 2);          // [제목] 태극기
  lcdText(30, 43, "Korean Flag", 0xC618, 1);          // [부제] 영문 부제

  drawTaeguk(CX, CY, R);                              // [태극] 태극 그리기

  drawGwae(10,  107, true,  true,  true );             // [건] 건괘(상좌): ═══
  drawGwae(138, 107, true,  false, true );             // [이] 이괘(상우): ═ ═
  drawGwae(10,  200, false, true,  false);             // [감] 감괘(하좌): = ═ =
  drawGwae(138, 200, false, false, false);             // [곤] 곤괘(하우): = = =

  lcdText(32, 242, "Republic of Korea", 0xC618, 1);   // [하단] 국가명

  setColor(80, 0, 80);                                // [LED] 자주색(태극 상징)
  Serial.println("Taegeukgi drawn OK");
}

void loop() {
  delay(10000);
}
```

**화면 레이아웃:**

```
┌──────────────────┐
│   TAEGEUKGI      │  ← 제목 (size 2)
│   Korean Flag    │  ← 부제 (size 1)
├──────────────────┤
│  ═══  [태극]  ═ ═ │  ← 건괘 / 이괘
│     ┌────────┐   │
│     │ 🔴🔵  │   │  ← 태극 (적=양 / 청=음)
│     └────────┘   │
│  = ═ =      = = =│  ← 감괘 / 곤괘
│  Republic of Korea│
└──────────────────┘
```

| 괘 | 위치 | 효 구성 |
|----|------|---------|
| 건(乾) | 상좌 | ═══ (양양양) |
| 이(離) | 상우 | ═ ═ (양음양) |
| 감(坎) | 하좌 | = ═ = (음양음) |
| 곤(坤) | 하우 | = = = (음음음) |