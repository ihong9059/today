void onBleReceive(String cmd) {
  // [BLE수신] 명령어 처리 및 LED 색 변경
  cmd.trim();
  cmd.toUpperCase();

  if (cmd == "RED") {
    // [LED] 빨간색 설정
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show();
    if (deviceConnected && sensorChar) {
      std::string res = "COLOR:RED";
      sensorChar->setValue(res);
      sensorChar->notify();
    }
  } else if (cmd == "GREEN") {
    // [LED] 초록색 설정
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();
    if (deviceConnected && sensorChar) {
      std::string res = "COLOR:GREEN";
      sensorChar->setValue(res);
      sensorChar->notify();
    }
  } else if (cmd == "BLUE") {
    // [LED] 파란색 설정
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();
    if (deviceConnected && sensorChar) {
      std::string res = "COLOR:BLUE";
      sensorChar->setValue(res);
      sensorChar->notify();
    }
  } else {
    // [BLE] 알 수 없는 명령 응답
    if (deviceConnected && sensorChar) {
      std::string res = "UNKNOWN:" + std::string(cmd.c_str());
      sensorChar->setValue(res);
      sensorChar->notify();
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀, OLED, WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] LED 꺼진 상태로 시작
  pixel.clear();
  pixel.show();

  // [OLED] 안내 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "BLE LED Control");
  oled.drawString(0, 16, "RED/GREEN/BLUE");
  oled.display();

  Serial.println("BLE LED Control Ready");
}

void loop() {
  // [대기] BLE 명령 수신 대기 (onBleReceive에서 처리)
  delay(10000);
}