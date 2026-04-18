// [전역] 마지막 BLE 전송 시간
unsigned long lastSendTime = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  // [타이머] 5초마다 온도+습도 전송
  if (millis() - lastSendTime >= 5000) {
    lastSendTime = millis();

    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok && deviceConnected && sensorChar) {
      // [BLE] "T:24.50,H:61.30" 형식으로 전송
      String msg = "T:" + String(temp, 2) + ",H:" + String(humi, 2);
      std::string s = msg.c_str();
      sensorChar->setValue(s);
      sensorChar->notify();

      Serial.println(msg);
    }
  }

  delay(100);
}