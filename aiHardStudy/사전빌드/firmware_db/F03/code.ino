// [전역] OLED 업데이트 주기
unsigned long lastUpdate = 0;

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화
  initBLE();        // BLE OTA 초기화
}

void loop() {
  // [센서] 5초마다 온도/습도 갱신
  if (millis() - lastUpdate >= 5000) {
    lastUpdate = millis();

    float temp, humi;
    bool ok = aht20_read(temp, humi);

    oled.clear();
    if (ok) {
      // [OLED] 온도 표시
      char tempBuf[20];
      sprintf(tempBuf, "Temp: %.1f C", temp);
      oled.drawString(0, 0, tempBuf);

      // [OLED] 습도 표시
      char humiBuf[20];
      sprintf(humiBuf, "Humi: %.1f %%", humi);
      oled.drawString(0, 16, humiBuf);
    } else {
      // [OLED] 센서 오류 메시지
      oled.drawString(0, 0, "Sensor Error");
    }
    oled.display();
  }

  delay(10000);
}