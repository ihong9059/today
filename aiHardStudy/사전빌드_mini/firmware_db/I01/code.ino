// [온도 LED] 온도 범위 기준값
#define TEMP_COLD  20.0  // 20°C 이하 → 파랑
#define TEMP_HOT   28.0  // 28°C 이상 → 빨강

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;

  // [센서] AHT20 온도/습도 읽기
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // [OLED] 온도 표시
    oled.clear();
    char buf[32];
    snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
    oled.drawString(0, 0, buf);
    snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
    oled.drawString(0, 16, buf);
    oled.display();

    // [LED] 온도에 따라 색상 변경
    if (temp <= TEMP_COLD) {
      // 낮은 온도 → 파랑
      pixel.setPixelColor(0, pixel.Color(0, 0, 255));
      oled.drawString(0, 40, "COLD");
    } else if (temp >= TEMP_HOT) {
      // 높은 온도 → 빨강
      pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      oled.drawString(0, 40, "HOT");
    } else {
      // 보통 온도 → 초록
      pixel.setPixelColor(0, pixel.Color(0, 255, 0));
      oled.drawString(0, 40, "NORMAL");
    }
    pixel.show();
    oled.display();

    // [BLE] 온도/색상 상태 전송
    if (deviceConnected && sensorChar) {
      snprintf(buf, sizeof(buf), "T:%.1f H:%.1f", temp, humi);
      std::string s(buf);
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    Serial.printf("[온도] %.1f°C / [습도] %.1f%%\n", temp, humi);
  } else {
    // [오류] 센서 읽기 실패
    oled.clear();
    oled.drawString(0, 0, "Sensor Error");
    oled.display();
    pixel.setPixelColor(0, pixel.Color(255, 255, 0)); // 노랑 = 오류
    pixel.show();
    Serial.println("[오류] AHT20 읽기 실패");
  }

  delay(2000); // [주기] 2초마다 측정
}