// [전역] LED 깜빡 속도 (ms 단위, 기본값 500)
volatile int blinkSpeed = 500;

// [BLE 수신] 스마트폰에서 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd.startsWith("SPEED:")) {
    // [속도 파싱] "SPEED:숫자" 형식에서 숫자 추출
    String valStr = cmd.substring(6);
    int newSpeed = valStr.toInt();
    if (newSpeed > 0) {
      blinkSpeed = newSpeed;
      // [BLE 응답] 변경된 속도를 스마트폰으로 전송
      String reply = "SPEED_OK:" + String(blinkSpeed);
      if (deviceConnected && sensorChar) {
        std::string s = reply.c_str();
        sensorChar->setValue(s);
        sensorChar->notify();
      }
      Serial.print("[BLE] 속도 변경: ");
      Serial.println(blinkSpeed);
    }
  }
}

// [LED 태스크] 설정된 속도로 RED LED 깜빡임
void ledBlinkTask(void* param) {
  while (true) {
    int speed = blinkSpeed;
    digitalWrite(LED_RED, LOW);   // [LED] ON (active LOW)
    delay(speed);
    digitalWrite(LED_RED, HIGH);  // [LED] OFF
    delay(speed);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀, OLED, I2C 초기화
  initBLE();       // [BLE] OTA 및 BLE 초기화

  // [OLED] 초기 안내 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "BLE Speed Ctrl");
  oled.drawString(0, 16, "Default: 500ms");
  oled.display();

  // [태스크] LED 깜빡임 태스크 생성
  xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, NULL);
}

void loop() {
  // [OLED] 현재 깜빡 속도 주기적으로 표시
  oled.clear();
  oled.drawString(0, 0, "Blink Speed:");
  oled.drawString(0, 16, (String(blinkSpeed) + " ms").c_str());
  oled.display();
  delay(1000);
}