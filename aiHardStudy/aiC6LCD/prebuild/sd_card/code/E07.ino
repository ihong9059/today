// [그라데이션] HSV → RGB565 변환
uint16_t hsvToRgb565(float h, float s, float v) {
  int hi = (int)(h / 60.0f) % 6;
  float f = h / 60.0f - (int)(h / 60.0f);
  float p = v * (1.0f - s);
  float q = v * (1.0f - f * s);
  float t = v * (1.0f - (1.0f - f) * s);
  float r, g, b;
  switch (hi) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break;
  }
  return lcd.color565((uint8_t)(r * 255), (uint8_t)(g * 255), (uint8_t)(b * 255));
}

// [그라데이션] hueOffset 기준으로 세로 무지개 그라데이션 그리기
void drawGradient(float hueOffset) {
  for (int y = 0; y < 320; y++) {
    float hue = fmod(hueOffset + (float)y / 320.0f * 360.0f, 360.0f);
    uint16_t color = hsvToRgb565(hue, 1.0f, 1.0f);
    lcd.drawLine(0, y, 171, y, color);
  }
}

// [LED] 현재 색조에 맞게 RGB LED 색상 설정
void syncLedToHue(float hue) {
  float h = hue;
  int hi = (int)(h / 60.0f) % 6;
  float f = h / 60.0f - (int)(h / 60.0f);
  float p = 0.0f;
  float q = 1.0f - f;
  float t = f;
  float r, g, b;
  switch (hi) {
    case 0: r = 1; g = t; b = p; break;
    case 1: r = q; g = 1; b = p; break;
    case 2: r = p; g = 1; b = t; break;
    case 3: r = p; g = q; b = 1; break;
    case 4: r = t; g = p; b = 1; break;
    default: r = 1; g = p; b = q; break;
  }
  setColor((uint8_t)(r * 80), (uint8_t)(g * 80), (uint8_t)(b * 80)); // 밝기 80으로 제한
}

float gHueOffset = 0.0f;      // [상태] 현재 색조 오프셋
unsigned long gLastUpdate = 0; // [타이머] 마지막 업데이트 시각

void setup() {
  Serial.begin(115200);
  initHardware();  // LCD, WS2812, 버튼 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] 첫 그라데이션 그리기
  drawGradient(gHueOffset);

  // [텍스트] 제목 오버레이 (반투명 느낌을 위해 배경 없이)
  lcd.setTextColor(C_TEXT);
  lcd.setTextSize(2);
  lcd.setCursor(14, 148);
  lcd.print("Color Gradient");
}

void loop() {
  unsigned long now = millis();

  // [애니메이션] 50ms마다 색조 1.5도 이동 → 약 12초에 한 바퀴
  if (now - gLastUpdate >= 50) {
    gLastUpdate = now;
    gHueOffset = fmod(gHueOffset + 1.5f, 360.0f);
    drawGradient(gHueOffset);

    // [텍스트] 그라데이션 위에 텍스트 재표시
    lcd.setTextColor(C_TEXT);
    lcd.setTextSize(2);
    lcd.setCursor(14, 148);
    lcd.print("Color Gradient");

    // [LED] 화면 상단 색조에 맞게 RGB LED 동기화
    syncLedToHue(gHueOffset);
  }
}
