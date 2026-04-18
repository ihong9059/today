// [알람] 기본 알람 시간 (초)
#define DEFAULT_ALARM_SEC 30

volatile int alarmSetSec = DEFAULT_ALARM_SEC;
volatile bool alarmActive = false;
unsigned long startTime = 0;

// [멜로디] 알람 음계 (C-E-G-C5 패턴)
const int melNotes[] = {523, 659, 784, 1047, 784, 659, 523, 0};
const int melDur[]   = {200, 200, 200, 400,  200, 200, 400, 300};
const int MEL_LEN    = 8;

// [사운드] 멜로디 재생 태스크 (알람 활성 시)
void alarmSoundTask(void* param) {
  int idx = 0;
  unsigned long noteStart = 0;
  bool playing = false;

  while (true) {
    if (alarmActive) {
      unsigned long now = millis();
      if (!playing || (now - noteStart) >= (unsigned long)melDur[idx]) {
        if (playing) idx = (idx + 1) % MEL_LEN;
        noteStart = now;
        playing = true;
        if (melNotes[idx] > 0) tone(2, melNotes[idx]);
        else noTone(2);
      }
    } else {
      if (playing) {
        noTone(2);
        playing = false;
        idx = 0;
      }
    }
    vTaskDelay(10 / portTICK_PERIOD_MS);
  }
}

// [OLED] 초시계 + 알람 상태 표시 태스크
void displayTask(void* param) {
  char timeBuf[16];
  char infoBuf[20];

  while (true) {
    int elapsed = (int)((millis() - startTime) / 1000);
    int h = elapsed / 3600;
    int m = (elapsed % 3600) / 60;
    int s = elapsed % 60;

    snprintf(timeBuf, sizeof(timeBuf), "%02d:%02d:%02d", h, m, s);

    oled.clear();
    // [시계] 큰 시간 표시
    oled.drawString(16, 8, timeBuf);

    if (alarmActive) {
      // [알람] 발동 상태 표시
      oled.drawString(28, 32, "** ALARM **");
      oled.drawString(4, 48, "BTN to dismiss");
    } else {
      // [대기] 남은 시간 표시
      int remain = alarmSetSec - elapsed;
      if (remain < 0) remain = 0;
      snprintf(infoBuf, sizeof(infoBuf), "Alarm in %4ds", remain);
      oled.drawString(4, 36, infoBuf);
      snprintf(infoBuf, sizeof(infoBuf), "Set: %ds", alarmSetSec);
      oled.drawString(4, 50, infoBuf);
    }
    oled.display();

    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

// [BLE] 명령 수신: SET:<초> / RESET / OFF
void onBleReceive(String cmd) {
  if (cmd.startsWith("SET:")) {
    // [설정] 알람 시간 변경
    alarmSetSec = cmd.substring(4).toInt();
  } else if (cmd == "RESET") {
    // [리셋] 초시계 재시작
    startTime = millis();
    alarmActive = false;
  } else if (cmd == "OFF") {
    // [끄기] BLE로 알람 해제
    alarmActive = false;
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  startTime = millis();

  // [LED] 파란색 - 대기 중
  pixel.setPixelColor(0, pixel.Color(0, 0, 60));
  pixel.show();

  // [OLED] 시작 화면
  oled.clear();
  oled.drawString(12, 18, "SmartAlarm");
  oled.drawString(4, 36, "Press BTN=stop");
  oled.display();
  delay(1200);

  // [태스크] OLED 갱신 태스크 시작
  xTaskCreate(displayTask,    "disp", 3072, NULL, 1, NULL);
  // [태스크] 알람 사운드 태스크 시작
  xTaskCreate(alarmSoundTask, "alrm", 2048, NULL, 2, NULL);
}

void loop() {
  int elapsed = (int)((millis() - startTime) / 1000);

  // [알람] 설정 시간 도달 시 알람 발동
  if (!alarmActive && elapsed >= alarmSetSec) {
    alarmActive = true;
  }

  // [LED] 알람 ON: 빨강-주황 점멸 / OFF: 파란색 유지
  if (alarmActive) {
    static bool ledTog = false;
    ledTog = !ledTog;
    pixel.setPixelColor(0, ledTog ? pixel.Color(255, 0, 0)
                                  : pixel.Color(255, 100, 0));
    pixel.show();
  }

  // [스위치] GPIO5 누르면 알람 해제
  if (alarmActive && digitalRead(SWITCH_PIN) == LOW) {
    alarmActive = false;
    noTone(2);
    // [LED] 초록 - 알람 꺼짐 확인
    pixel.setPixelColor(0, pixel.Color(0, 200, 0));
    pixel.show();
    delay(600);
    pixel.setPixelColor(0, pixel.Color(0, 0, 60));
    pixel.show();
  }

  // [BLE] 현재 상태 전송
  if (deviceConnected && sensorChar) {
    char status[32];
    snprintf(status, sizeof(status), "%02d:%02d:%02d | %s",
             elapsed / 3600, (elapsed % 3600) / 60, elapsed % 60,
             alarmActive ? "ALARM" : "READY");
    std::string s(status);
    sensorChar->setValue(s);
    sensorChar->notify();
  }

  delay(150);
}