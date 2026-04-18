// [전역] 무지개 색상 인덱스
uint8_t rainbowIndex = 0;
bool rainbowStarted = false;

// [무지개] HSV → RGB 변환 후 픽셀 설정
void setRainbow(uint8_t index) {
  uint32_t color = pixel.gamma32(pixel.ColorHSV(index * 256));
  pixel.setPixelColor(0, color);
  pixel.show();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [카운트다운] 5초 카운트다운 OLED 표시
  for (int i = 5; i >= 1; i--) {
    oled.clear();
    oled.drawString(30, 10, "countdown");
    char buf[4];
    snprintf(buf, sizeof(buf), "%d", i);
    oled.drawString(56, 30, buf);
    oled.display();
    delay(1000);
  }

  // [완료] 카운트다운 끝 메시지
  oled.clear();
  oled.drawString(20, 20, "Rainbow!");
  oled.display();

  rainbowStarted = true;
}

void loop() {
  if (rainbowStarted) {
    // [무지개] 색상 순환
    setRainbow(rainbowIndex++);
    delay(20);
  } else {
    delay(10000);
  }
}