void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  delay(10000);
}

void displayTask(void* param) {
  float temp, humi;

  for (;;) {
    // [센서] AHT20 온도/습도 읽기
    bool ok = aht20_read(temp, humi);

    oled.clear();

    if (ok) {
      // [디스플레이] 온도 표시
      char tempStr[20];
      snprintf(tempStr, sizeof(tempStr), "Temp: %.1f C", temp);
      oled.drawString(0, 0, tempStr);

      // [디스플레이] 습도 표시
      char humiStr[20];
      snprintf(humiStr, sizeof(humiStr), "Humi: %.1f %%", humi);
      oled.drawString(0, 16, humiStr);
    } else {
      // [오류] 센서 읽기 실패 시 표시
      oled.drawString(0, 0, "Sensor Error");
    }

    oled.display();

    // [대기] 2초마다 갱신
    vTaskDelay(2000 / portTICK_PERIOD_MS);
  }
}

// [초기화] 디스플레이 태스크 생성
void startDisplayTask() {
  xTaskCreate(displayTask, "displayTask", 4096, NULL, 1, NULL);
}