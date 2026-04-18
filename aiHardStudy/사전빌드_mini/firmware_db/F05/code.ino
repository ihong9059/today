// [온도 경보] AHT20 온도가 28도 초과 시 스피커 경고음

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    Serial.printf("온도: %.1f°C, 습도: %.1f%%\n", temp, humi);

    // [OLED] 온도/습도 표시
    oled.clear();
    char buf[32];
    snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
    oled.drawString(0, 0, buf);
    snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
    oled.drawString(0, 16, buf);

    if (temp > 28.0f) {
      // [경보] 28도 초과 — 빨간 LED + 경고음
      oled.drawString(0, 32, "!! OVERHEAT !!");
      oled.display();

      pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      pixel.show();

      // [경고음] 고주파 비프 3회
      for (int i = 0; i < 3; i++) {
        tone(2, 2000, 200);
        delay(300);
      }
      noTone(2);
    } else {
      // [정상] 초록 LED
      oled.drawString(0, 32, "Normal");
      oled.display();

      pixel.setPixelColor(0, pixel.Color(0, 255, 0));
      pixel.show();
    }
  } else {
    // [오류] 센서 읽기 실패
    oled.clear();
    oled.drawString(0, 0, "Sensor Error");
    oled.display();
  }

  delay(2000); // [주기] 2초마다 측정
}