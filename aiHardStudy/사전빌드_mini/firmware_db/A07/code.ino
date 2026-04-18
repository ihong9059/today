void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 흰색으로 켜기
  pixel.setPixelColor(0, pixel.Color(255, 255, 255));
  pixel.show();
}

void loop() {
  delay(10000);
}