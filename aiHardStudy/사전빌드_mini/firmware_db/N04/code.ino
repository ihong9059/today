// [전역] 온습도 데이터 저장
float g_temp = 0.0f;
float g_humi = 0.0f;

// [BLE 수신] "READ" 명령 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "READ") {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      g_temp = temp;
      g_humi = humi;

      // [OLED] 온습도 표시
      oled.clear();
      oled.drawString(0, 0, "AHT20 Sensor");

      char line1[32];
      snprintf(line1, sizeof(line1), "Temp: %.1f C", temp);
      oled.drawString(0, 16, line1);

      char line2[32];
      snprintf(line2, sizeof(line2), "Humi: %.1f %%", humi);
      oled.drawString(0, 32, line2);

      oled.display();

      // [BLE 전송] JSON 형태로 전송
      if (deviceConnected && sensorChar) {
        char buf[64];
        snprintf(buf, sizeof(buf), "{\"temp\":%.1f,\"humi\":%.1f}", temp, humi);
        std::string s(buf);
        sensorChar->setValue(s);
        sensorChar->notify();
      }

      // [LED] 초록 점등 — 성공
      pixel.setPixelColor(0, pixel.Color(0, 100, 0));
      pixel.show();
      delay(300);
      pixel.clear();
      pixel.show();

    } else {
      // [OLED] 센서 오류 표시
      oled.clear();
      oled.drawString(0, 0, "Sensor Error!");
      oled.display();

      // [LED] 빨강 — 실패
      pixel.setPixelColor(0, pixel.Color(100, 0, 0));
      pixel.show();
      delay(300);
      pixel.clear();
      pixel.show();
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED/NeoPixel 초기화
  initBLE();       // BLE OTA 초기화

  // [OLED] 대기 메시지
  oled.clear();
  oled.drawString(0, 0, "BLE Ready");
  oled.drawString(0, 16, "Send: READ");
  oled.display();
}

void loop() {
  delay(10000);
}