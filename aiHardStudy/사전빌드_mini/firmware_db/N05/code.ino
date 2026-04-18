// [BLE 수신] 스마트폰에서 명령 받아 OLED에 표시
String displayText = "";

void onBleReceive(String cmd) {
  // [명령 파싱] "DISPLAY:메시지" 형식 처리
  if (cmd.startsWith("DISPLAY:")) {
    displayText = cmd.substring(8);

    // [OLED 표시] 수신된 텍스트 출력
    oled.clear();
    oled.drawString(0, 0, "BLE Received:");
    oled.drawString(0, 16, displayText.c_str());
    oled.display();

    // [LED 피드백] 파란색으로 수신 확인
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();
    delay(200);
    pixel.clear();
    pixel.show();

    // [BLE 응답] 수신 확인 메시지 전송
    if (deviceConnected && sensorChar) {
      std::string reply = "OK:" + std::string(displayText.c_str());
      sensorChar->setValue(reply);
      sensorChar->notify();
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기 화면] 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "BLE Display Ready");
  oled.drawString(0, 16, "Send DISPLAY:msg");
  oled.display();
}

void loop() {
  delay(10000);
}