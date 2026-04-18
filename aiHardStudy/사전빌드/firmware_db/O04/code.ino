// [전역] 온도 통계 변수
float tempMax = -999.0f;
float tempMin = 999.0f;
float tempSum = 0.0f;
int tempCount = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  delay(10000);
}

// [태스크] 5초마다 온도 측정 및 OLED 출력
void tempTask(void* param) {
  for (;;) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      // [통계] 최고/최저/평균 갱신
      if (temp > tempMax) tempMax = temp;
      if (temp < tempMin) tempMin = temp;
      tempSum += temp;
      tempCount++;

      float tempAvg = tempSum / tempCount;

      // [OLED] 통계 화면 출력
      oled.clear();
      oled.drawString(0, 0, "Temp Monitor");

      char buf[32];
      snprintf(buf, sizeof(buf), "Now : %.1f C", temp);
      oled.drawString(0, 16, buf);

      snprintf(buf, sizeof(buf), "Max : %.1f C", tempMax);
      oled.drawString(0, 28, buf);

      snprintf(buf, sizeof(buf), "Min : %.1f C", tempMin);
      oled.drawString(0, 40, buf);

      snprintf(buf, sizeof(buf), "Avg : %.1f C", tempAvg);
      oled.drawString(0, 52, buf);

      oled.display();

      // [시리얼] 디버그 출력
      Serial.printf("Temp=%.1f Max=%.1f Min=%.1f Avg=%.1f\n",
                    temp, tempMax, tempMin, tempAvg);
    } else {
      // [오류] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 24, "Sensor Error!");
      oled.display();
      Serial.println("AHT20 read failed");
    }

    vTaskDelay(pdMS_TO_TICKS(5000)); // [딜레이] 5초 대기
  }
}