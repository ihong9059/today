// [RGB LED] 빨→초→파 순서로 색상 전환
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [빨강] 빨간색 표시
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  delay(1000);

  // [초록] 초록색 표시
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();
  delay(1000);

  // [파랑] 파란색 표시
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
  delay(1000);
}