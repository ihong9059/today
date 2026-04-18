// [숨쉬기] 빨간색 LED 밝기 조절 변수
int brightness = 0;
int fadeStep = 1;
unsigned long lastUpdate = 0;
const int FADE_INTERVAL = 15; // ms

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  unsigned long now = millis();
  if (now - lastUpdate >= FADE_INTERVAL) {
    lastUpdate = now;

    // [밝기] 빨간색으로 현재 밝기 설정
    pixel.setPixelColor(0, pixel.Color(brightness, 0, 0));
    pixel.show();

    brightness += fadeStep;

    // [방향전환] 최대/최소 밝기에서 방향 반전
    if (brightness >= 255) {
      brightness = 255;
      fadeStep = -1;
    } else if (brightness <= 0) {
      brightness = 0;
      fadeStep = 1;
    }
  }

  delay(1);
}