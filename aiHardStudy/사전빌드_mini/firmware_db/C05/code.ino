// [숨쉬기] 초록색 LED 밝기를 부드럽게 올리고 내리는 효과

int brightness = 0;
int step = 1;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [밝기] 0~255 사이를 오르내림
  brightness += step;
  if (brightness >= 255) {
    brightness = 255;
    step = -1;
  } else if (brightness <= 0) {
    brightness = 0;
    step = 1;
  }

  // [LED] 초록색 채널만 밝기 적용
  pixel.setPixelColor(0, pixel.Color(0, brightness, 0));
  pixel.show();

  delay(8); // ~4초 주기 (255*2*8ms ≈ 4080ms)
}