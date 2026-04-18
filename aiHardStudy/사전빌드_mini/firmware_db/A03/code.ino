void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 파란색으로 설정
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
}

void loop() {
  delay(10000);
}