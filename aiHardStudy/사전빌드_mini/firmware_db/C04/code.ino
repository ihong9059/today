// [무지개] HSV → RGB 변환 함수
void hsvToRgb(float h, float s, float v, uint8_t &r, uint8_t &g, uint8_t &b) {
  int i = (int)(h * 6);
  float f = h * 6 - i;
  float p = v * (1 - s);
  float q = v * (1 - f * s);
  float t = v * (1 - (1 - f) * s);
  float rv, gv, bv;
  switch (i % 6) {
    case 0: rv = v; gv = t; bv = p; break;
    case 1: rv = q; gv = v; bv = p; break;
    case 2: rv = p; gv = v; bv = t; break;
    case 3: rv = p; gv = q; bv = v; break;
    case 4: rv = t; gv = p; bv = v; break;
    case 5: rv = v; gv = p; bv = q; break;
    default: rv = gv = bv = 0; break;
  }
  r = (uint8_t)(rv * 255);
  g = (uint8_t)(gv * 255);
  b = (uint8_t)(bv * 255);
}

// [무지개] 그라데이션 태스크 (백그라운드)
void rainbowTask(void *param) {
  float hue = 0.0f;
  while (true) {
    uint8_t r, g, b;
    hsvToRgb(hue, 1.0f, 0.8f, r, g, b); // 채도 100%, 명도 80%
    pixel.setPixelColor(0, pixel.Color(r, g, b));
    pixel.show();
    hue += 0.002f; // 색상 변화 속도
    if (hue >= 1.0f) hue = 0.0f;
    vTaskDelay(pdMS_TO_TICKS(20)); // 20ms 간격
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [무지개] 그라데이션 백그라운드 태스크 시작
  xTaskCreate(rainbowTask, "rainbow", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}