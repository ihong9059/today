// [태스크 핸들] 노란 LED 깜빡임 태스크 핸들
TaskHandle_t blinkTaskHandle = NULL;

// [깜빡임] 노란 LED 깜빡임 태스크
void blinkYellowTask(void* param) {
  while (true) {
    digitalWrite(LED_YELLOW, LOW);   // 켜기
    vTaskDelay(300 / portTICK_PERIOD_MS);
    digitalWrite(LED_YELLOW, HIGH);  // 끄기
    vTaskDelay(300 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] 노란 LED 꺼두기
  digitalWrite(LED_YELLOW, HIGH);
}

void loop() {
  float temp, humi;
  // [센서] AHT20 온습도 읽기
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // [OLED] 습도 표시
    char buf[32];
    snprintf(buf, sizeof(buf), "Humi: %.1f%%", humi);
    oled.clear();
    oled.drawString(0, 0, buf);

    // [OLED] 온도도 함께 표시
    char tbuf[32];
    snprintf(tbuf, sizeof(tbuf), "Temp: %.1f C", temp);
    oled.drawString(0, 16, tbuf);

    // [OLED] 습도 경고 상태 표시
    if (humi > 70.0f) {
      oled.drawString(0, 32, "! HIGH HUMIDITY");
    } else {
      oled.drawString(0, 32, "Normal");
    }
    oled.display();

    // [조건] 습도 70% 초과 시 깜빡임 시작
    if (humi > 70.0f) {
      if (blinkTaskHandle == NULL) {
        xTaskCreate(blinkYellowTask, "blinkY", 1024, NULL, 1, &blinkTaskHandle);
      }
    } else {
      // [정상] 습도 정상 범위 → 깜빡임 중지
      if (blinkTaskHandle != NULL) {
        vTaskDelete(blinkTaskHandle);
        blinkTaskHandle = NULL;
        digitalWrite(LED_YELLOW, HIGH); // 꺼두기
      }
    }

    // [시리얼] 디버그 출력
    Serial.printf("Temp=%.1f Humi=%.1f\n", temp, humi);
  } else {
    // [에러] 센서 읽기 실패 시 OLED 표시
    oled.clear();
    oled.drawString(0, 0, "Sensor Error");
    oled.display();
  }

  delay(2000); // 2초마다 측정
}