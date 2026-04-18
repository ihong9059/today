void setup() {
  Serial.begin(115200);
  initHardware();   // 핀, OLED, WS2812 초기화
  initBLE();        // BLE OTA 초기화

  // [초기화] 시작 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.display();
  delay(1000);
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi); // [센서] AHT20 온도/습도 읽기

  oled.clear();

  if (ok) {
    // [온도] 측정값 문자열 변환 후 표시
    char line1[32];
    char line2[32];
    snprintf(line1, sizeof(line1), "Temp: %.1f C", temp);
    snprintf(line2, sizeof(line2), "Humi: %.1f %%", humi);
    oled.drawString(0, 0, line1);
    oled.drawString(0, 16, line2);

    // [시리얼] 디버그 출력
    Serial.printf("온도: %.1f°C, 습도: %.1f%%\n", temp, humi);
  } else {
    // [오류] 센서 읽기 실패 시 표시
    oled.drawString(0, 0, "Sensor Error");
    Serial.println("AHT20 읽기 실패");
  }

  oled.display();
  delay(2000); // [주기] 2초마다 갱신
}