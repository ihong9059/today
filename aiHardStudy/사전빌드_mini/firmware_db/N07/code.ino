// [전역변수] 타이머 상태
volatile int timerSeconds = 0;
volatile bool timerRunning = false;

// [멜로디] 알람 종료 멜로디 음계/길이
int melodyNotes[] = {523, 659, 784, 1047, 784, 1047, 1319};
int melodyDurs[]  = {200, 200, 200, 400,  200, 200,  600};

// [멜로디] 종료 멜로디 재생
void playAlarmMelody() {
  int n = sizeof(melodyNotes) / sizeof(melodyNotes[0]);
  for (int i = 0; i < n; i++) {
    tone(2, melodyNotes[i], melodyDurs[i]);
    delay(melodyDurs[i] + 30);
  }
  noTone(2);
}

// [BLE수신] "ALARM:30" 형식 파싱 후 타이머 시작
void onBleReceive(String cmd) {
  if (cmd.startsWith("ALARM:")) {
    int secs = cmd.substring(6).toInt();
    if (secs > 0) {
      timerSeconds = secs;
      timerRunning = true;

      // [OLED] 타이머 시작 표시
      oled.clear();
      oled.drawString(0, 0, "Timer Start!");
      char buf[20];
      snprintf(buf, sizeof(buf), "%d sec", secs);
      oled.drawString(0, 16, buf);
      oled.display();

      // [LED] 파란색으로 타이머 시작 알림
      pixel.setPixelColor(0, pixel.Color(0, 0, 255));
      pixel.show();

      // [BLE] 타이머 시작 알림 전송
      if (deviceConnected && sensorChar) {
        std::string msg = "TIMER_START:" + std::to_string(secs);
        sensorChar->setValue(msg);
        sensorChar->notify();
      }
    }
  }
}

// [태스크] 매초 카운트다운 + BLE 전송
void timerTask(void* pvParameters) {
  while (true) {
    if (timerRunning && timerSeconds > 0) {
      delay(1000);
      timerSeconds--;

      // [BLE] 남은 시간 전송
      if (deviceConnected && sensorChar) {
        std::string msg = "REMAIN:" + std::to_string(timerSeconds);
        sensorChar->setValue(msg);
        sensorChar->notify();
      }

      // [OLED] 남은 시간 표시
      oled.clear();
      char buf[20];
      snprintf(buf, sizeof(buf), "Remain: %ds", timerSeconds);
      oled.drawString(0, 0, buf);
      oled.display();

      // [LED] 남은 시간에 따라 색상 변경 (많으면 초록, 적으면 빨강)
      if (timerSeconds > 10) {
        pixel.setPixelColor(0, pixel.Color(0, 255, 0));
      } else {
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      }
      pixel.show();

      if (timerSeconds == 0) {
        // [타이머] 종료 처리
        timerRunning = false;

        // [OLED] 완료 표시
        oled.clear();
        oled.drawString(0, 0, "TIME'S UP!");
        oled.display();

        // [LED] 흰색 점멸
        for (int i = 0; i < 3; i++) {
          pixel.setPixelColor(0, pixel.Color(255, 255, 255));
          pixel.show();
          delay(200);
          pixel.clear();
          pixel.show();
          delay(200);
        }

        // [BLE] 종료 알림 전송
        if (deviceConnected && sensorChar) {
          std::string msg = "TIMER_DONE";
          sensorChar->setValue(msg);
          sensorChar->notify();
        }

        // [멜로디] 종료 멜로디 재생
        playAlarmMelody();

        // [LED] 소등
        pixel.clear();
        pixel.show();
      }
    } else {
      delay(100);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 대기 화면
  oled.clear();
  oled.drawString(0, 0, "Alarm Timer");
  oled.drawString(0, 16, "Send ALARM:XX");
  oled.display();

  // [태스크] 타이머 카운트다운 태스크 생성
  xTaskCreate(timerTask, "timerTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}