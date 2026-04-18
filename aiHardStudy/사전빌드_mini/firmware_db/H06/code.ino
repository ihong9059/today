// 도레미파솔라시도 음계 주파수 (Hz)
const int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};
const char* noteNames[] = {"Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"};
const int NOTE_DUR = 380;

// HSV → RGB 변환 (무지개 색 계산)
void hsvToRgb(float h, uint8_t &r, uint8_t &g, uint8_t &b) {
  int i = (int)(h * 6);
  float f = h * 6 - i;
  float q = 1 - f;
  float t = f;
  switch (i % 6) {
    case 0: r=255; g=(uint8_t)(t*255); b=0;   break;
    case 1: r=(uint8_t)(q*255); g=255; b=0;   break;
    case 2: r=0;   g=255; b=(uint8_t)(t*255); break;
    case 3: r=0;   g=(uint8_t)(q*255); b=255; break;
    case 4: r=(uint8_t)(t*255); g=0;   b=255; break;
    case 5: r=255; g=0;   b=(uint8_t)(q*255); break;
  }
}

// LED 무지개 순환 태스크
void rainbowTask(void *pvParameters) {
  float hue = 0.0f;
  while (true) {
    uint8_t r, g, b;
    hsvToRgb(hue, r, g, b);
    pixel.setPixelColor(0, pixel.Color(r, g, b));
    pixel.show();
    hue += 0.004f;
    if (hue >= 1.0f) hue = 0.0f;
    vTaskDelay(pdMS_TO_TICKS(20)); // 20ms마다 색상 갱신
  }
}

// 도레미파솔라시도 반복 연주 태스크
void melodyTask(void *pvParameters) {
  int idx = 0;
  while (true) {
    // OLED에 현재 음계 표시
    oled.clear();
    oled.drawString(10, 0,  "Rainbow + Scale");
    oled.drawString(35, 24, noteNames[idx]);
    oled.display();

    tone(2, notes[idx], NOTE_DUR);     // 음계 재생
    idx = (idx + 1) % 8;
    vTaskDelay(pdMS_TO_TICKS(NOTE_DUR + 40)); // 음 간격
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 하드웨어 초기화 (LED, OLED, 핀)
  initBLE();       // BLE OTA 초기화

  // 시작 안내 화면
  oled.clear();
  oled.drawString(0, 0, "Rainbow + Scale");
  oled.drawString(0, 16, "Starting...");
  oled.display();
  delay(800);

  // 무지개 LED 태스크 (core 0)
  xTaskCreate(rainbowTask, "rainbow", 2048, NULL, 2, NULL);
  // 도레미 연주 태스크 (core 0)
  xTaskCreate(melodyTask,  "melody",  2048, NULL, 2, NULL);
}

void loop() {
  delay(10000); // 태스크가 처리하므로 loop는 대기
}