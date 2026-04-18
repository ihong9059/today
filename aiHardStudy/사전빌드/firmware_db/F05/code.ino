// [전역] 온도/습도 업데이트 주기
unsigned long lastRead = 0;
const unsigned long INTERVAL = 3000;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [센서] 3초마다 온도/습도 측정 후 OLED 표시
  if (millis() - lastRead >= INTERVAL) {
    lastRead = millis();

    float temp, humi;
    bool ok = aht20_read(temp, humi);

    oled.clear();
    if (ok) {
      // [OLED] 온도 출력
      char tempBuf[20];
      snprintf(tempBuf, sizeof(tempBuf), "Temp: %.1f C", temp);
      oled.drawString(0, 0, tempBuf);

      // [OLED] 습도 출력
      char humiBuf[20];
      snprintf(humiBuf, sizeof(humiBuf), "Humi: %.1f %%", humi);
      oled.drawString(0, 16, humiBuf);
    } else {
      // [오류] 센서 읽기 실패
      oled.drawString(0, 0, "Sensor Error");
    }
    oled.display();

    Serial.printf("Temp: %.1f C, Humi: %.1f %%\n", temp, humi);
  }

  delay(10000);
}