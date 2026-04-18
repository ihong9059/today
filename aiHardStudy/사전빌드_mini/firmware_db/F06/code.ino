// [전역] 센서 데이터 저장
float g_temp = 0.0;
float g_humi = 0.0;

// [쾌적도] 온도 16~28도, 습도 30~70% 이면 Good
String getComfort(float t, float h) {
  if (t >= 16.0 && t <= 28.0 && h >= 30.0 && h <= 70.0) return "Good";
  return "Bad";
}

// [센서] 백그라운드 태스크: AHT20 읽기 + OLED 갱신
void sensorTask(void* param) {
  while (true) {
    float t, h;
    bool ok = aht20_read(t, h);

    if (ok) {
      g_temp = t;
      g_humi = h;

      // [OLED] 화면 업데이트
      oled.clear();

      // [OLED] 제목
      oled.drawString(0, 0, "Temp/Humi Monitor");

      // [OLED] 온도 출력
      char tempBuf[20];
      snprintf(tempBuf, sizeof(tempBuf), "Temp: %.1f C", t);
      oled.drawString(0, 16, tempBuf);

      // [OLED] 습도 출력
      char humiBuf[20];
      snprintf(humiBuf, sizeof(humiBuf), "Humi: %.1f %%", h);
      oled.drawString(0, 32, humiBuf);

      // [쾌적도] Good/Bad 출력
      String comfort = getComfort(t, h);
      char comfBuf[20];
      snprintf(comfBuf, sizeof(comfBuf), "Feel: %s", comfort.c_str());
      oled.drawString(0, 48, comfBuf);

      oled.display();

      // [LED] 쾌적도에 따라 색상 변경
      if (comfort == "Good") {
        pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // 녹색 = 쾌적
      } else {
        pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨강 = 불쾌적
      }
      pixel.show();

      // [BLE] 센서값 전송
      if (deviceConnected && sensorChar) {
        char bleBuf[40];
        snprintf(bleBuf, sizeof(bleBuf), "T:%.1f H:%.1f %s", t, h, comfort.c_str());
        std::string s(bleBuf);
        sensorChar->setValue(s);
        sensorChar->notify();
      }
    } else {
      // [오류] 센서 읽기 실패 시 OLED에 표시
      oled.clear();
      oled.drawString(0, 24, "Sensor Error!");
      oled.display();
      pixel.setPixelColor(0, pixel.Color(255, 128, 0)); // 주황 = 오류
      pixel.show();
    }

    vTaskDelay(pdMS_TO_TICKS(3000)); // 3초마다 갱신
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] 센서 읽기 태스크 시작
  xTaskCreate(sensorTask, "sensorTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}