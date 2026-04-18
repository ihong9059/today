// [전역] LED 깜빡임 속도 (ms), volatile로 태스크 간 공유
volatile int blinkSpeed = 500;

// [BLE 수신] "SPEED:500" 형태 파싱 후 속도 변경
void onBleReceive(String cmd) {
  if (cmd.startsWith("SPEED:")) {
    int val = cmd.substring(6).toInt();
    if (val > 0) {
      blinkSpeed = val;

      // [OLED] 현재 속도 표시
      oled.clear();
      oled.drawString(0, 0, "Speed Changed!");
      char buf[32];
      sprintf(buf, "%d ms", blinkSpeed);
      oled.drawString(0, 16, buf);
      oled.display();

      // [BLE] 응답 전송
      if (deviceConnected && sensorChar) {
        String resp = "OK:SPEED=" + String(blinkSpeed);
        sensorChar->setValue(resp.c_str());
        sensorChar->notify();
      }

      // [비프음] 속도 변경 확인음
      tone(2, 1000, 100);
    }
  }
}

// [태스크] LED 깜빡임 (core 0)
void blinkTask(void* param) {
  while (true) {
    // [LED] 켜기 (파란색)
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();
    vTaskDelay(pdMS_TO_TICKS(blinkSpeed));

    // [LED] 끄기
    pixel.clear();
    pixel.show();
    vTaskDelay(pdMS_TO_TICKS(blinkSpeed));
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 초기 메시지
  oled.clear();
  oled.drawString(0, 0, "BLE Blinker");
  oled.drawString(0, 16, "Default: 500ms");
  oled.display();

  // [태스크] LED 깜빡임 태스크 시작
  xTaskCreate(blinkTask, "blink", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}