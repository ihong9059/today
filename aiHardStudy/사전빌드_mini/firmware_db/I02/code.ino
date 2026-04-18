// [열사병 경보] 35도 이상 감지 시 경보 시스템

bool alarmActive = false;

void sirenTask(void* param) {
  // [사이렌] 고저음 반복 사이렌 효과
  while (true) {
    if (alarmActive) {
      for (int freq = 800; freq <= 1600; freq += 50) {
        if (!alarmActive) break;
        tone(2, freq, 30);
        delay(30);
      }
      for (int freq = 1600; freq >= 800; freq -= 50) {
        if (!alarmActive) break;
        tone(2, freq, 30);
        delay(30);
      }
    } else {
      noTone(2);
      delay(100);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [사이렌 태스크] 백그라운드에서 사이렌 실행
  xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    if (temp >= 35.0) {
      // [경보 활성화] 35도 이상 열사병 위험
      alarmActive = true;

      // [빨간 LED] 위험 신호
      pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      pixel.show();

      // [OLED 경고] 위험 메시지 표시
      oled.clear();
      oled.drawString(20, 0,  "!! DANGER !!");
      oled.drawString(0,  16, "HEAT STROKE ALERT");

      char buf[32];
      snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
      oled.drawString(0, 32, buf);
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
      oled.drawString(0, 48, buf);
      oled.display();

      // [BLE 알림] 연결된 기기에 경보 전송
      if (deviceConnected && sensorChar) {
        char msg[64];
        snprintf(msg, sizeof(msg), "DANGER:%.1f:%.1f", temp, humi);
        sensorChar->setValue(std::string(msg));
        sensorChar->notify();
      }

    } else {
      // [정상 상태] 경보 해제
      alarmActive = false;
      noTone(2);

      // [초록 LED] 정상 상태
      pixel.setPixelColor(0, pixel.Color(0, 255, 0));
      pixel.show();

      // [OLED 정상] 온습도 표시
      oled.clear();
      oled.drawString(10, 0, "SAFE - Normal");

      char buf[32];
      snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
      oled.drawString(0, 20, buf);
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
      oled.drawString(0, 36, buf);
      oled.display();
    }

  } else {
    // [센서 오류] AHT20 읽기 실패
    oled.clear();
    oled.drawString(0, 24, "Sensor Error!");
    oled.display();

    pixel.setPixelColor(0, pixel.Color(255, 165, 0)); // 주황색
    pixel.show();
  }

  delay(2000); // [측정 주기] 2초마다 온도 확인
}