void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi); // 온도/습도 읽기

  if (ok) {
    if (temp > 25.0) {
      // 온도 25도 초과 → 빨간색
      pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    } else {
      // 온도 25도 이하 → 파란색
      pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    }
    pixel.show();

    // OLED에 온도 표시
    oled.clear();
    char buf[32];
    snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
    oled.drawString(0, 0, buf);
    oled.display();
  }

  delay(2000); // 2초마다 갱신
}