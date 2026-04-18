// [상태] 현재 LED 색상 저장
uint8_t ledR = 0, ledG = 0, ledB = 0;

// [BLE 수신] 스마트폰에서 명령 수신
void onBleReceive(String cmd) {
  cmd.trim();

  if (cmd == "STATUS") {
    // [센서] 온도/습도 읽기
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    // [스위치] 현재 상태 읽기
    bool swPressed = (digitalRead(SWITCH_PIN) == LOW);

    // [응답] 상태 문자열 조합
    char buf[128];
    if (ok) {
      snprintf(buf, sizeof(buf),
        "TEMP:%.1f,HUMI:%.1f,LED:(%d,%d,%d),SW:%s",
        temp, humi,
        ledR, ledG, ledB,
        swPressed ? "ON" : "OFF");
    } else {
      snprintf(buf, sizeof(buf),
        "TEMP:ERR,HUMI:ERR,LED:(%d,%d,%d),SW:%s",
        ledR, ledG, ledB,
        swPressed ? "ON" : "OFF");
    }

    // [BLE 전송] 상태 전송
    if (deviceConnected && sensorChar) {
      std::string s(buf);
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    // [OLED] 상태 화면 표시
    oled.clear();
    if (ok) {
      char line1[32], line2[32];
      snprintf(line1, sizeof(line1), "T:%.1fC H:%.1f%%", temp, humi);
      snprintf(line2, sizeof(line2), "SW:%s", swPressed ? "ON" : "OFF");
      oled.drawString(0, 0, line1);
      oled.drawString(0, 16, line2);
    } else {
      oled.drawString(0, 0, "Sensor Error");
    }
    oled.display();

    // [알림] 상태 전송 시 짧은 비프음
    tone(2, 1000, 80);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED/WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] OLED 대기 메시지
  oled.clear();
  oled.drawString(0, 0, "BLE Ready");
  oled.drawString(0, 16, "Send: STATUS");
  oled.display();

  // [초기] LED 꺼짐 상태
  pixel.clear();
  pixel.show();
}

void loop() {
  delay(10000);
}