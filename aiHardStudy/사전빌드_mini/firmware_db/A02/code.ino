void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 초록색으로 켜기
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();
}

void loop() {
  delay(10000);
}