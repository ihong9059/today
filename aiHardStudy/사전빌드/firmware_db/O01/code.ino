// [온도태스크] AHT20 읽기 + OLED 온도/막대그래프 표시
void tempDisplayTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    oled.clear();

    if (ok) {
      // [온도출력] 온도 수치 표시
      char tempStr[24];
      snprintf(tempStr, sizeof(tempStr), "Temp: %.1f C", temp);
      oled.drawString(0, 0, tempStr);

      // [습도출력] 습도 수치 표시
      char humiStr[24];
      snprintf(humiStr, sizeof(humiStr), "Humi: %.1f %%", humi);
      oled.drawString(0, 16, humiStr);

      // [막대그래프] 0~50도 범위를 16칸으로 매핑
      const int BAR_MAX = 16;
      float clamped = constrain(temp, 0.0f, 50.0f);
      int barLen = (int)(clamped / 50.0f * BAR_MAX);

      char bar[BAR_MAX + 4];
      bar[0] = '[';
      for (int i = 1; i <= BAR_MAX; i++) {
        bar[i] = (i <= barLen) ? '#' : ' ';
      }
      bar[BAR_MAX + 1] = ']';
      bar[BAR_MAX + 2] = '\0';
      oled.drawString(0, 32, bar);

      // [눈금] 그래프 범위 안내
      oled.drawString(0, 48, "0C        50C");
    } else {
      // [오류] 센서 응답 없음
      oled.drawString(0, 0, "Sensor Error!");
    }

    oled.display();
    vTaskDelay(pdMS_TO_TICKS(2000)); // 2초마다 갱신
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 및 OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [태스크] 온도 표시 태스크 생성
  xTaskCreate(tempDisplayTask, "TempDisp", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}