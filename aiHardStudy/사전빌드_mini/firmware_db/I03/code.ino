// [전역] 습도 저장 변수
float g_temp = 0.0f;
float g_humi = 0.0f;

// [센서] AHT20 읽기 및 OLED 표시 태스크
void sensorTask(void* pvParameters) {
  while (true) {
    bool ok = aht20_read(g_temp, g_humi);

    oled.clear();
    if (ok) {
      // [OLED] 습도 표시
      char buf[32];
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", g_humi);
      oled.drawString(0, 0, buf);

      // [OLED] 온도 표시
      char tbuf[32];
      snprintf(tbuf, sizeof(tbuf), "Temp: %.1f C", g_temp);
      oled.drawString(0, 16, tbuf);

      // [OLED] 경고 메시지
      if (g_humi > 70.0f) {
        oled.drawString(0, 32, "!! HIGH HUMIDITY !!");
      }
    } else {
      oled.drawString(0, 0, "Sensor Error");
    }
    oled.display();

    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}

// [LED] 습도 70% 초과 시 노란색 깜빡임 태스크
void ledTask(void* pvParameters) {
  while (true) {
    if (g_humi > 70.0f) {
      // [LED] 노란색 ON
      pixel.setPixelColor(0, pixel.Color(255, 255, 0));
      pixel.show();
      vTaskDelay(pdMS_TO_TICKS(300));

      // [LED] OFF
      pixel.clear();
      pixel.show();
      vTaskDelay(pdMS_TO_TICKS(300));
    } else {
      // [LED] 정상 범위 — 초록색 유지
      pixel.setPixelColor(0, pixel.Color(0, 50, 0));
      pixel.show();
      vTaskDelay(pdMS_TO_TICKS(500));
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] 센서 읽기 태스크 시작
  xTaskCreate(sensorTask, "sensor", 4096, NULL, 1, NULL);

  // [태스크] LED 제어 태스크 시작
  xTaskCreate(ledTask, "led", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}