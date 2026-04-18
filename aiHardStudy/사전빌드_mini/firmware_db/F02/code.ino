// [전역] 온도/습도 저장 변수
float g_temp = 0.0f;
float g_humi = 0.0f;

// [태스크] 온도/습도 읽기 및 OLED 표시 (1초마다)
void sensorTask(void* param) {
  char buf[32];
  while (true) {
    bool ok = aht20_read(g_temp, g_humi);
    oled.clear();
    if (ok) {
      // [온도] 섭씨 표시
      snprintf(buf, sizeof(buf), "Temp: %.1f C", g_temp);
      oled.drawString(0, 0, buf);
      // [습도] 퍼센트 표시
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", g_humi);
      oled.drawString(0, 16, buf);
    } else {
      // [오류] 센서 읽기 실패
      oled.drawString(0, 0, "Sensor Error");
    }
    oled.display();
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [태스크] 센서 표시 태스크 시작
  xTaskCreate(sensorTask, "sensor", 4096, nullptr, 1, nullptr);
}

void loop() {
  delay(10000);
}