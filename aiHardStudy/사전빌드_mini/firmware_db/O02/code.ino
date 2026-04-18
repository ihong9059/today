// [방범] 경보 상태 플래그
volatile bool alarmActive = false;
bool lastSwitchState = LOW;

// [BLE] 경보 수신 처리 (BLE로 알람 해제 가능)
void onBleReceive(String cmd) {
  if (cmd == "RESET") {
    alarmActive = false;
  }
}

// [경보] 사이렌 + LED 빨강 깜빡 태스크
void alarmTask(void* pvParameters) {
  int sirenFreqs[] = {880, 1100, 1320, 1100};
  int freqIdx = 0;
  bool ledOn = false;

  while (true) {
    if (alarmActive) {
      // [LED] 빨강 깜빡
      if (ledOn) {
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      } else {
        pixel.clear();
      }
      pixel.show();
      ledOn = !ledOn;

      // [스피커] 사이렌 주파수 순환
      tone(2, sirenFreqs[freqIdx], 150);
      freqIdx = (freqIdx + 1) % 4;

      // [OLED] 경고 메시지 표시
      oled.clear();
      oled.drawString(10, 0, "!!! ALERT !!!");
      oled.drawString(10, 16, "SECURITY ALARM");
      oled.drawString(20, 32, "TRIGGERED!");
      oled.display();

      vTaskDelay(pdMS_TO_TICKS(200));
    } else {
      // [대기] 알람 비활성화 시 초기화
      noTone(2);
      pixel.clear();
      pixel.show();

      oled.clear();
      oled.drawString(20, 16, "SYSTEM ARMED");
      oled.drawString(15, 32, "Switch: CLOSED");
      oled.display();

      freqIdx = 0;
      ledOn = false;
      vTaskDelay(pdMS_TO_TICKS(100));
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 스위치 초기 상태 읽기
  lastSwitchState = digitalRead(SWITCH_PIN);

  // [태스크] 경보 태스크 생성 (코어 0)
  xTaskCreate(alarmTask, "alarmTask", 4096, NULL, 1, NULL);

  // [OLED] 대기 화면
  oled.clear();
  oled.drawString(20, 16, "SYSTEM ARMED");
  oled.drawString(15, 32, "Switch: CLOSED");
  oled.display();
}

void loop() {
  // [스위치] 상태 감지 (INPUT_PULLUP, active LOW → 떼면 HIGH)
  bool currentSwitchState = digitalRead(SWITCH_PIN);

  if (currentSwitchState == HIGH && lastSwitchState == LOW) {
    // [경보] 스위치 개방 감지 → 알람 활성화
    alarmActive = true;
    Serial.println("ALARM TRIGGERED!");

    // [BLE] 경보 알림 전송
    if (deviceConnected && sensorChar) {
      std::string msg = "ALARM:TRIGGERED";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
  }

  if (currentSwitchState == LOW && lastSwitchState == HIGH) {
    // [복구] 스위치 닫힘 → 알람 해제
    alarmActive = false;
    Serial.println("ALARM CLEARED!");

    // [BLE] 해제 알림 전송
    if (deviceConnected && sensorChar) {
      std::string msg = "ALARM:CLEARED";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
  }

  lastSwitchState = currentSwitchState;
  delay(50);
}