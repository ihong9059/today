// [전역] 온도 통계 변수
float tempMax = -999.0f;
float tempMin = 999.0f;
float tempSum = 0.0f;
int tempCount = 0;

// [태스크] 5초마다 온도 측정
void tempTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);
    if (ok) {
      // [통계] 최고/최저/합산 갱신
      if (temp > tempMax) tempMax = temp;
      if (temp < tempMin) tempMin = temp;
      tempSum += temp;
      tempCount++;

      float avg = tempSum / tempCount;

      // [OLED] 통계 표시
      oled.clear();
      oled.drawString(0, 0, "Temp Stats");

      char buf[32];
      snprintf(buf, sizeof(buf), "Now: %.1f C", temp);
      oled.drawString(0, 16, buf);

      snprintf(buf, sizeof(buf), "Max: %.1f C", tempMax);
      oled.drawString(0, 28, buf);

      snprintf(buf, sizeof(buf), "Min: %.1f C", tempMin);
      oled.drawString(0, 40, buf);

      snprintf(buf, sizeof(buf), "Avg: %.1f C", avg);
      oled.drawString(0, 52, buf);

      oled.display();

      // [BLE] 현재 온도 전송
      if (deviceConnected && sensorChar) {
        char ble[64];
        snprintf(ble, sizeof(ble), "T:%.1f Max:%.1f Min:%.1f Avg:%.1f", temp, tempMax, tempMin, avg);
        std::string s(ble);
        sensorChar->setValue(s);
        sensorChar->notify();
      }

      // [LED] 온도 범위별 색상
      if (temp >= 30.0f) {
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));   // 고온: 빨강
      } else if (temp >= 25.0f) {
        pixel.setPixelColor(0, pixel.Color(255, 165, 0)); // 보통: 주황
      } else {
        pixel.setPixelColor(0, pixel.Color(0, 0, 255));   // 저온: 파랑
      }
      pixel.show();

      Serial.printf("[TEMP] now=%.1f max=%.1f min=%.1f avg=%.1f count=%d\n",
                    temp, tempMax, tempMin, avg, tempCount);
    } else {
      // [오류] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error");
      oled.display();
      pixel.setPixelColor(0, pixel.Color(255, 0, 255)); // 오류: 보라
      pixel.show();
      Serial.println("[TEMP] aht20_read failed");
    }

    vTaskDelay(pdMS_TO_TICKS(5000)); // 5초 대기
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] OLED 대기 메시지
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.drawString(0, 16, "Starting...");
  oled.display();

  // [태스크] 온도 측정 백그라운드 실행
  xTaskCreate(tempTask, "tempTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}