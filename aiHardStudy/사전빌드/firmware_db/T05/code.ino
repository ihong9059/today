// [전역] 온습도 측정 결과 저장
float g_temp = 0.0f;
float g_humi = 0.0f;

// [OLED] 온습도 결과 화면 출력
void showOled(float temp, float humi) {
  oled.clear();
  oled.drawString(0, 0, "=== Sensor ===");
  char line1[32], line2[32];
  snprintf(line1, sizeof(line1), "Temp: %.1f C", temp);
  snprintf(line2, sizeof(line2), "Humi: %.1f %%", humi);
  oled.drawString(0, 16, line1);
  oled.drawString(0, 32, line2);
  oled.display();
}

// [BLE 수신] 스마트폰에서 "READ" 명령 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd.equalsIgnoreCase("READ")) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      g_temp = temp;
      g_humi = humi;

      // [BLE 전송] 결과 문자열 전송
      char msg[64];
      snprintf(msg, sizeof(msg), "TEMP:%.1f,HUMI:%.1f", temp, humi);
      if (deviceConnected && sensorChar) {
        std::string s(msg);
        sensorChar->setValue(s);
        sensorChar->notify();
      }

      // [OLED] 결과 표시
      showOled(temp, humi);

      Serial.printf("[AHT20] Temp=%.1f, Humi=%.1f\n", temp, humi);
    } else {
      // [오류] 센서 읽기 실패
      if (deviceConnected && sensorChar) {
        std::string err = "ERROR:AHT20_FAIL";
        sensorChar->setValue(err);
        sensorChar->notify();
      }
      oled.clear();
      oled.drawString(0, 0, "Sensor Error!");
      oled.display();
      Serial.println("[AHT20] Read failed");
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀, OLED, I2C 초기화
  initBLE();        // [BLE] OTA 및 BLE 서비스 초기화

  // [OLED] 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "BLE Ready");
  oled.drawString(0, 16, "Send: READ");
  oled.display();

  Serial.println("[INIT] 준비 완료 - BLE로 READ 전송하면 온습도 측정");
}

void loop() {
  delay(10000);
}