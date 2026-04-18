// [상태] LED 핀 상태 읽기 헬퍼
String getLedState(int pin) {
  return digitalRead(pin) == LOW ? "ON" : "OFF";
}

// [BLE 수신] STATUS 명령 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "STATUS") {
    // [센서] 온도/습도 읽기
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    // [스위치] GPIO32 상태 읽기 (PULLUP, LOW=눌림)
    String swState = digitalRead(32) == LOW ? "PRESSED" : "RELEASED";

    // [상태] 응답 문자열 조합
    String msg = "";
    if (ok) {
      msg += "TEMP:" + String(temp, 1) + "C ";
      msg += "HUMI:" + String(humi, 1) + "% ";
    } else {
      msg += "TEMP:ERR HUMI:ERR ";
    }
    msg += "LED_R:" + getLedState(LED_RED) + " ";
    msg += "LED_Y:" + getLedState(LED_YELLOW) + " ";
    msg += "LED_B:" + getLedState(LED_BLUE) + " ";
    msg += "SW:" + swState;

    // [BLE 전송] 상태 정보 전송
    if (deviceConnected && sensorChar) {
      std::string s = msg.c_str();
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    // [OLED] 화면에 상태 표시
    oled.clear();
    if (ok) {
      oled.drawString(0, 0, ("T:" + String(temp, 1) + "C H:" + String(humi, 1) + "%").c_str());
    } else {
      oled.drawString(0, 0, "Sensor ERR");
    }
    oled.drawString(0, 16, ("R:" + getLedState(LED_RED) + " Y:" + getLedState(LED_YELLOW) + " B:" + getLedState(LED_BLUE)).c_str());
    oled.drawString(0, 32, ("SW:" + swState).c_str());
    oled.display();

    Serial.println("[STATUS] " + msg);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀/OLED/I2C 초기화
  initBLE();        // [BLE] OTA 및 BLE 초기화

  // [OLED] 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Ready");
  oled.drawString(0, 16, "Send: STATUS");
  oled.display();

  Serial.println("[READY] STATUS 명령 대기 중");
}

void loop() {
  delay(10000);
}