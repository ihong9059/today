// [멜로디] 음계 주파수 정의
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_D5  587
#define NOTE_E5  659
#define NOTE_G5  784
#define NOTE_REST 0

// [상태] 멜로디 재생 요청 플래그
volatile bool playSchoolBell = false;
volatile bool playBirthday = false;

// [학교종] 학교종이 땡땡땡 음계 배열
const int schoolNotes[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_G4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_E4, NOTE_D4, NOTE_E4, NOTE_C4
};
const int schoolDurations[] = {
  400,400,400,400,400,400,800,
  400,400,400,400,800,
  400,400,400,400,400,400,800,
  400,400,400,400,800
};
const int schoolLen = 24;

// [생일] 생일 축하합니다 음계 배열
const int birthdayNotes[] = {
  NOTE_C4, NOTE_C4, NOTE_D4, NOTE_C4, NOTE_F4, NOTE_E4,
  NOTE_C4, NOTE_C4, NOTE_D4, NOTE_C4, NOTE_G4, NOTE_F4,
  NOTE_C4, NOTE_C4, NOTE_C5, NOTE_A4, NOTE_F4, NOTE_E4, NOTE_D4,
  NOTE_A4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_G4, NOTE_F4
};
const int birthdayDurations[] = {
  300,300,600,600,600,1200,
  300,300,600,600,600,1200,
  300,300,600,600,600,600,1200,
  300,300,600,600,600,1200
};
const int birthdayLen = 25;

// [BLE수신] 스마트폰에서 멜로디 명령 수신
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "MELODY:학교종") {
    playSchoolBell = true;
    playBirthday = false;
  } else if (cmd == "MELODY:생일") {
    playBirthday = true;
    playSchoolBell = false;
  }
}

// [BLE전송] 재생 상태 문자열 전송
void bleSendStatus(const char* status) {
  if (deviceConnected && sensorChar) {
    std::string s(status);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [멜로디태스크] 멜로디 재생 FreeRTOS 태스크
void melodyTask(void* param) {
  while (true) {
    if (playSchoolBell) {
      playSchoolBell = false;
      // [BLE] 학교종 재생 시작 알림
      bleSendStatus("PLAYING:학교종");
      digitalWrite(LED_BLUE, LOW); // LED 켜기
      for (int i = 0; i < schoolLen; i++) {
        if (schoolNotes[i] == NOTE_REST) {
          noTone(33);
        } else {
          tone(33, schoolNotes[i], schoolDurations[i]);
        }
        delay(schoolDurations[i] + 50);
      }
      noTone(33);
      digitalWrite(LED_BLUE, HIGH); // LED 끄기
      // [BLE] 학교종 재생 완료 알림
      bleSendStatus("DONE:학교종");
    } else if (playBirthday) {
      playBirthday = false;
      // [BLE] 생일 재생 시작 알림
      bleSendStatus("PLAYING:생일");
      digitalWrite(LED_YELLOW, LOW); // LED 켜기
      for (int i = 0; i < birthdayLen; i++) {
        if (birthdayNotes[i] == NOTE_REST) {
          noTone(33);
        } else {
          tone(33, birthdayNotes[i], birthdayDurations[i]);
        }
        delay(birthdayDurations[i] + 50);
      }
      noTone(33);
      digitalWrite(LED_YELLOW, HIGH); // LED 끄기
      // [BLE] 생일 재생 완료 알림
      bleSendStatus("DONE:생일");
    }
    delay(100);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 초기화
  initBLE();       // BLE OTA 초기화

  // [태스크] 멜로디 재생 태스크 생성
  xTaskCreate(melodyTask, "melodyTask", 4096, NULL, 1, NULL);

  // [OLED] 준비 완료 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Melody Ready");
  oled.drawString(0, 16, "BLE Connected?");
  oled.display();

  Serial.println("멜로디 BLE 준비 완료");
}

void loop() {
  delay(10000);
}