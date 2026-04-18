// [경찰차 사이렌] 두 주파수를 반복하여 사이렌 효과 구현

void sirenTask(void* param) {
  while (true) {
    // [고음] 960Hz로 상승
    for (int freq = 600; freq <= 960; freq += 20) {
      tone(2, freq, 30);
      delay(30);
    }
    // [저음] 600Hz로 하강
    for (int freq = 960; freq >= 600; freq -= 20) {
      tone(2, freq, 30);
      delay(30);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 경찰차 느낌으로 파란색
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();

  // [OLED] 상태 표시
  oled.clear();
  oled.drawString(0, 0, "Police Siren");
  oled.drawString(0, 16, "Active!");
  oled.display();

  // [사이렌 태스크] 백그라운드에서 소리 재생
  xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
}

void loop() {
  // [LED 점멸] 파랑/빨강 번갈아 깜빡임
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();
  delay(300);
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  delay(300);
}