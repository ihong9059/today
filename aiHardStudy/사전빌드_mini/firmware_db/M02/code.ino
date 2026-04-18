void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화
}

void loop() {
  // 5초마다 온도+습도 측정 후 BLE 전송
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // OLED 표시
    oled.clear();
    oled.drawString(0, 0, "Temp & Humidity");
    char line1[32], line2[32];
    snprintf(line1, sizeof(line1), "Temp: %.1f C", temp);
    snprintf(line2, sizeof(line2), "Humi: %.1f %%", humi);
    oled.drawString(0, 16, line1);
    oled.drawString(0, 32, line2);
    oled.display();

    // BLE 전송
    if (deviceConnected && sensorChar) {
      char payload[64];
      snprintf(payload, sizeof(payload), "T:%.1f,H:%.1f", temp, humi);
      std::string s(payload);
      sensorChar->setValue(s);
      sensorChar->notify();
      Serial.println(payload); // 시리얼 확인용
    }
  } else {
    // 센서 읽기 실패 시 OLED 표시
    oled.clear();
    oled.drawString(0, 0, "Sensor Error");
    oled.display();
    Serial.println("AHT20 read failed");
  }

  delay(5000); // 5초 대기
}