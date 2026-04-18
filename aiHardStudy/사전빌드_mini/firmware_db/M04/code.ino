// [전역] 온도 임계값
#define TEMP_THRESHOLD 28.0

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 시작 메시지
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.drawString(0, 16, "Ready...");
  oled.display();
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (!ok) {
    // [오류] 센서 읽기 실패
    oled.clear();
    oled.drawString(0, 0, "Sensor Error!");
    oled.display();
    delay(2000);
    return;
  }

  // [OLED] 온도/습도 표시
  char line1[32], line2[32];
  snprintf(line1, sizeof(line1), "Temp: %.1f C", temp);
  snprintf(line2, sizeof(line2), "Humi: %.1f %%", humi);
  oled.clear();
  oled.drawString(0, 0, line1);
  oled.drawString(0, 16, line2);

  if (temp >= TEMP_THRESHOLD) {
    // [경고] 28도 이상 — LED 빨강
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show();

    // [BLE] 경고 메시지 전송
    if (deviceConnected && sensorChar) {
      char msg[64];
      snprintf(msg, sizeof(msg), "WARNING: Temp=%.1fC >= 28C", temp);
      std::string s(msg);
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    // [OLED] 경고 표시
    oled.drawString(0, 40, "!! TEMP ALERT !!");

    // [알림음] 경고 비프
    tone(2, 1000, 200);
    delay(300);
    tone(2, 1500, 200);
    delay(300);
    noTone(2);

  } else {
    // [정상] LED 초록
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();
  }

  oled.display();
  delay(3000);
}