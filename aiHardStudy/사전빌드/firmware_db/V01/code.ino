// [전역] 온습도 최고/최저 초기값
float tempMax = -999.0f, tempMin = 999.0f;
float humiMax = -999.0f, humiMin = 999.0f;
bool firstReading = true;

// [작업] 10초마다 측정 → OLED 출력 → BLE 전송
void sensorTask(void* pvParameters) {
  char line[32];

  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi); // AHT20 온습도 읽기

    if (ok) {
      // [초기화] 첫 측정값으로 최고/최저 설정
      if (firstReading) {
        tempMax = tempMin = temp;
        humiMax = humiMin = humi;
        firstReading = false;
      }

      // [갱신] 최고/최저 업데이트
      if (temp > tempMax) tempMax = temp;
      if (temp < tempMin) tempMin = temp;
      if (humi > humiMax) humiMax = humi;
      if (humi < humiMin) humiMin = humi;

      // [OLED] 현재값 + 최고 + 최저 표시
      oled.clear();

      snprintf(line, sizeof(line), "T:%.1fC H:%.1f%%", temp, humi);
      oled.drawString(0, 0, line); // 현재 온습도

      snprintf(line, sizeof(line), "Thi:%.1f Lo:%.1f", tempMax, tempMin);
      oled.drawString(0, 20, line); // 온도 최고/최저

      snprintf(line, sizeof(line), "Hhi:%.1f Lo:%.1f", humiMax, humiMin);
      oled.drawString(0, 40, line); // 습도 최고/최저

      oled.display();

      // [BLE] CSV 포맷으로 시리얼 → BLE UART 전송
      snprintf(line, sizeof(line), "%.2f,%.2f,%.2f,%.2f", temp, humi, tempMax, tempMin);
      Serial.println(line);

      // [BLE] 상세 포맷 추가 전송
      char detail[64];
      snprintf(detail, sizeof(detail),
               "T=%.2f H=%.2f Tmax=%.2f Tmin=%.2f Hmax=%.2f Hmin=%.2f",
               temp, humi, tempMax, tempMin, humiMax, humiMin);
      Serial.println(detail);

    } else {
      // [오류] 센서 읽기 실패 시 OLED 경고
      oled.clear();
      oled.drawString(0, 20, "AHT20 Read Error");
      oled.display();
      Serial.println("ERR:AHT20");
    }

    vTaskDelay(pdMS_TO_TICKS(10000)); // 10초 대기
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀/OLED/I2C 초기화
  initBLE();      // BLE OTA 초기화

  // [부팅] OLED 시작 메시지
  oled.clear();
  oled.drawString(0, 20, "Sensor Monitor");
  oled.drawString(0, 36, "Starting...");
  oled.display();
  delay(1500);

  // [태스크] 센서 측정 태스크 생성
  xTaskCreate(sensorTask, "SensorTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000); // BLE OTA 루프 유지
}