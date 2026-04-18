void onBleReceive(String cmd) {
  // [BLE 수신] 스마트폰에서 명령 수신
  if (cmd.startsWith("DISPLAY:")) {
    String text = cmd.substring(8); // "DISPLAY:" 이후 텍스트 추출

    // [OLED] 화면 지우고 수신 텍스트 표시
    oled.clear();
    oled.drawString(0, 0, "BLE Message:");
    oled.drawString(0, 16, text.c_str());
    oled.display();

    // [BLE 송신] 확인 응답 전송
    if (deviceConnected && sensorChar) {
      String ack = "OK:DISPLAYED:" + text;
      std::string s = ack.c_str();
      sensorChar->setValue(s);
      sensorChar->notify();
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 및 OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [OLED] 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Waiting for");
  oled.drawString(0, 16, "BLE command...");
  oled.display();
}

void loop() {
  delay(10000); // [루프] BLE 이벤트는 콜백에서 처리
}