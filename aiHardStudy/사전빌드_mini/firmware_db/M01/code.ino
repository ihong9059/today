// [전역] 마지막 센서 읽기 시각
unsigned long lastRead = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [타이머] 5초마다 실행
  if (millis() - lastRead >= 5000) {
    lastRead = millis();

    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      // [OLED] 온도/습도 표시
      oled.clear();
      oled.drawString(0, 0, "Temp & Humidity");

      char tempStr[20];
      snprintf(tempStr, sizeof(tempStr), "Temp: %.1f C", temp);
      oled.drawString(0, 16, tempStr);

      char humiStr[20];
      snprintf(humiStr, sizeof(humiStr), "Humi: %.1f %%", humi);
      oled.drawString(0, 32, humiStr);

      oled.display();

      // [BLE] 스마트폰으로 데이터 전송
      if (deviceConnected && sensorChar) {
        char bleMsg[40];
        snprintf(bleMsg, sizeof(bleMsg), "T:%.1f,H:%.1f", temp, humi);
        std::string s(bleMsg);
        sensorChar->setValue(s);
        sensorChar->notify();
      }

      // [시리얼] 디버그 출력
      Serial.printf("Temp: %.1f C, Humi: %.1f %%\n", temp, humi);
    } else {
      // [에러] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error");
      oled.display();
      Serial.println("AHT20 read failed");
    }
  }

  delay(100);
}