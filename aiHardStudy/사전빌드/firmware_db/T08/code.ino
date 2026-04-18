// [타이머] 전역 변수
volatile int timerSeconds = 0;
volatile bool timerRunning = false;
unsigned long lastTick = 0;

// [멜로디] 알람 종료 멜로디 재생
void playAlarmMelody() {
  // 도레미파솔 상승 멜로디
  int notes[] = {262, 294, 330, 349, 392, 523};
  int durations[] = {200, 200, 200, 200, 200, 400};
  for (int i = 0; i < 6; i++) {
    tone(33, notes[i], durations[i]);
    delay(durations[i] + 50);
  }
  noTone(33);
}

// [OLED] 남은 시간 화면 표시
void showTimer(int sec) {
  oled.clear();
  oled.drawString(0, 0, "TIMER");
  String s = String(sec) + " sec";
  oled.drawString(0, 20, s.c_str());
  oled.display();
}

// [BLE 수신] "ALARM:60" 형태 명령 처리
void onBleReceive(String cmd) {
  if (cmd.startsWith("ALARM:")) {
    int sec = cmd.substring(6).toInt();
    if (sec > 0) {
      timerSeconds = sec;
      timerRunning = true;
      lastTick = millis();
      // [LED] 타이머 시작 알림 (파란 LED ON)
      digitalWrite(LED_BLUE, LOW);
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      Serial.println("[타이머] 시작: " + String(sec) + "초");
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 대기 화면
  oled.clear();
  oled.drawString(0, 0, "Timer Ready");
  oled.drawString(0, 20, "Send ALARM:N");
  oled.display();
}

void loop() {
  if (timerRunning && (millis() - lastTick >= 1000)) {
    lastTick = millis();
    timerSeconds--;

    // [BLE] 매초 남은 시간 전송
    if (deviceConnected && sensorChar) {
      String msg = "REMAIN:" + String(timerSeconds);
      std::string s = msg.c_str();
      sensorChar->setValue(s);
      sensorChar->notify();
    }

    // [OLED] 남은 시간 표시
    showTimer(timerSeconds);
    Serial.println("[타이머] 남은 시간: " + String(timerSeconds) + "초");

    if (timerSeconds <= 0) {
      // [타이머] 종료 처리
      timerRunning = false;
      digitalWrite(LED_BLUE, HIGH);
      digitalWrite(LED_RED, LOW); // 빨간 LED ON

      // [BLE] 종료 알림 전송
      if (deviceConnected && sensorChar) {
        std::string s = "ALARM:DONE";
        sensorChar->setValue(s);
        sensorChar->notify();
      }

      // [OLED] 완료 메시지
      oled.clear();
      oled.drawString(0, 0, "TIME UP!");
      oled.display();

      // [멜로디] 알람 사운드 재생
      playAlarmMelody();

      // [LED] 빨간 LED 끄기, 대기 상태
      delay(500);
      digitalWrite(LED_RED, HIGH);

      // [OLED] 대기 화면 복귀
      oled.clear();
      oled.drawString(0, 0, "Timer Ready");
      oled.drawString(0, 20, "Send ALARM:N");
      oled.display();
    }
  }

  delay(10);
}