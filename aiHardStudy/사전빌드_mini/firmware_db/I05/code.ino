// [전역] 이전 온도 저장
float prevTemp = -999.0;
bool firstRead = true;

// [작업] 온도 감지 태스크
void tempMonitorTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      // [표시] OLED 업데이트
      oled.clear();
      oled.drawString(0, 0, "Temp Monitor");
      char buf[32];
      snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
      oled.drawString(0, 16, buf);
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
      oled.drawString(0, 32, buf);

      if (firstRead) {
        // [초기화] 첫 읽기 시 기준값 설정
        prevTemp = temp;
        firstRead = false;
        oled.drawString(0, 48, "Initializing...");
      } else {
        float delta = temp - prevTemp;
        if (delta < 0) delta = -delta;

        if (delta >= 1.0) {
          // [경보] 1도 이상 변화 감지
          snprintf(buf, sizeof(buf), "Change:%.1f C!", delta);
          oled.drawString(0, 48, buf);

          // [LED] 빨간색으로 경고 표시
          pixel.setPixelColor(0, pixel.Color(255, 0, 0));
          pixel.show();

          // [소리] 경고 비프음 3회
          for (int i = 0; i < 3; i++) {
            tone(2, 1000, 150);
            vTaskDelay(200 / portTICK_PERIOD_MS);
          }
          noTone(2);

          // [업데이트] 새 기준 온도 갱신
          prevTemp = temp;
        } else {
          // [정상] 변화 없음 - 초록색
          oled.drawString(0, 48, "Stable");
          pixel.setPixelColor(0, pixel.Color(0, 50, 0));
          pixel.show();
        }
      }

      oled.display();

      // [BLE] 센서 데이터 전송
      if (deviceConnected && sensorChar) {
        char ble[64];
        snprintf(ble, sizeof(ble), "T:%.1f,H:%.1f", temp, humi);
        std::string s(ble);
        sensorChar->setValue(s);
        sensorChar->notify();
      }
    } else {
      // [오류] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error");
      oled.display();
      pixel.setPixelColor(0, pixel.Color(50, 0, 50));
      pixel.show();
    }

    vTaskDelay(2000 / portTICK_PERIOD_MS); // [주기] 2초마다 측정
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 초기 화면 표시
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.drawString(0, 16, "Starting...");
  oled.display();

  // [LED] 파란색으로 시작 표시
  pixel.setPixelColor(0, pixel.Color(0, 0, 50));
  pixel.show();

  // [태스크] 온도 감지 태스크 생성
  xTaskCreate(tempMonitorTask, "TempMonitor", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}