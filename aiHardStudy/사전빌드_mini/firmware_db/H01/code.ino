void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 빨간색 켜기
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();

  // [소리] 비프음 1000Hz, 500ms
  tone(2, 1000, 500);
}

void loop() {
  delay(10000);
}