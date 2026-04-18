// [전역] 이전 온도 및 트렌드 저장
static float prevTemp = -999.0f;
static char bleTrendBuf[64];

// [태스크] 온도 트렌드 측정 및 OLED/BLE 업데이트
void tempTrendTask(void* param) {
  float temp, humi;

  for (;;) {
    // [센서] AHT20 온도·습도 읽기
    bool ok = aht20_read(temp, humi);

    if (ok) {
      // [분석] 직전 대비 트렌드 판별 (±0.1°C 이내는 유지)
      const char* trend;
      const char* trendKo;
      if (prevTemp < -900.0f) {
        trend   = "=";
        trendKo = "Init";
      } else if (temp > prevTemp + 0.1f) {
        trend   = "UP";
        trendKo = "Trend:Rise";
      } else if (temp < prevTemp - 0.1f) {
        trend   = "DN";
        trendKo = "Trend:Drop";
      } else {
        trend   = "==";
        trendKo = "Trend:Hold";
      }

      // [OLED] 온도·트렌드 표시
      oled.clear();

      char row0[24];
      snprintf(row0, sizeof(row0), "Temp: %.1f C  [%s]", temp, trend);
      oled.drawString(0, 0, row0);

      char row1[24];
      snprintf(row1, sizeof(row1), "Humi: %.1f %%", humi);
      oled.drawString(0, 16, row1);

      if (prevTemp > -900.0f) {
        // [OLED] 변화량 표시
        char row2[24];
        snprintf(row2, sizeof(row2), "Diff: %+.2f C", temp - prevTemp);
        oled.drawString(0, 32, row2);

        char row3[24];
        snprintf(row3, sizeof(row3), "Prev: %.1f C", prevTemp);
        oled.drawString(0, 48, row3);
      } else {
        oled.drawString(0, 32, "Initializing...");
      }

      oled.display();

      // [BLE] 트렌드 문자열 구성 후 시리얼 전송 (BLE OTA 채널 활용)
      if (prevTemp > -900.0f) {
        snprintf(bleTrendBuf, sizeof(bleTrendBuf),
                 "{\"T\":%.2f,\"H\":%.2f,\"prev\":%.2f,\"diff\":%.2f,\"%s\"}",
                 temp, humi, prevTemp, temp - prevTemp, trendKo);
      } else {
        snprintf(bleTrendBuf, sizeof(bleTrendBuf),
                 "{\"T\":%.2f,\"H\":%.2f,\"%s\"}", temp, humi, trendKo);
      }

      // [BLE] Serial → BLE 채널로 트렌드 데이터 전송
      Serial.println(bleTrendBuf);

      // [LED] 트렌드별 LED 표시 (상승=적색, 하강=청색, 유지=황색)
      if (prevTemp > -900.0f) {
        if (temp > prevTemp + 0.1f) {
          // [LED] 온도 상승 → 적색
          digitalWrite(LED_RED,    LOW);
          digitalWrite(LED_YELLOW, HIGH);
          digitalWrite(LED_BLUE,   HIGH);
        } else if (temp < prevTemp - 0.1f) {
          // [LED] 온도 하강 → 청색
          digitalWrite(LED_RED,    HIGH);
          digitalWrite(LED_YELLOW, HIGH);
          digitalWrite(LED_BLUE,   LOW);
        } else {
          // [LED] 유지 → 황색
          digitalWrite(LED_RED,    HIGH);
          digitalWrite(LED_YELLOW, LOW);
          digitalWrite(LED_BLUE,   HIGH);
        }
      }

      prevTemp = temp;
    } else {
      // [오류] 센서 읽기 실패 시 OLED 경고
      oled.clear();
      oled.drawString(0, 0, "AHT20 Error!");
      oled.display();
      Serial.println("{\"error\":\"AHT20 read failed\"}");
    }

    // [타이밍] 3초 주기 측정
    vTaskDelay(pdMS_TO_TICKS(3000));
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] 온도 트렌드 태스크 시작
  xTaskCreate(tempTrendTask, "TempTrend", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}