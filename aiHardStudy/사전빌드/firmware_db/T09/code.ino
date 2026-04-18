// [BLE] bleNotify 함수 선언 (base firmware에 정의됨)
extern void bleNotify(String msg);

// [피아노] 음계 주파수 (도레미파솔라시도)
const int PIANO_FREQ[8] = {262, 294, 330, 349, 392, 440, 494, 523};
const char* PIANO_NOTE[8] = {"C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"};
const char* PIANO_KR[8]   = {"도", "레", "미", "파", "솔", "라", "시", "도"};

// [LED] 연주 중 파란 LED 깜빡임 태스크
void ledPlayTask(void* param) {
  int count = *(int*)param;            // [LED] 깜빡 횟수 수신
  for (int i = 0; i < count; i++) {
    digitalWrite(LED_BLUE, LOW);       // [LED] ON
    vTaskDelay(100 / portTICK_PERIOD_MS);
    digitalWrite(LED_BLUE, HIGH);      // [LED] OFF
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
  vTaskDelete(NULL);
}

// [피아노] OLED에 음계 화면 표시
void showPianoOLED(int idx) {
  oled.clear();
  oled.drawString(0, 0,  ">> Piano Play <<"); // [OLED] 타이틀
  oled.drawString(0, 16, PIANO_KR[idx]);       // [OLED] 한국어 음계
  oled.drawString(40, 16, PIANO_NOTE[idx]);    // [OLED] 영문 음계
  String freqStr = String(PIANO_FREQ[idx]) + "Hz";
  oled.drawString(0, 32, freqStr.c_str());     // [OLED] 주파수
  oled.display();
}

// [BLE] 스마트폰에서 PIANO:0~7 수신 시 호출되는 콜백
void onBLECommand(String cmd) {
  if (!cmd.startsWith("PIANO:")) return;       // [BLE] 다른 명령 무시

  int idx = cmd.substring(6).toInt();          // [파싱] 인덱스 추출
  if (idx < 0 || idx > 7) {
    bleNotify("ERR:PIANO 0~7 범위 초과");      // [BLE] 오류 응답
    return;
  }

  // [OLED] 연주 중 표시
  showPianoOLED(idx);

  // [BLE] 연주 시작 알림 전송
  String notify = "PLAYING:PIANO:" + String(idx) + "(" + PIANO_NOTE[idx] + ")";
  bleNotify(notify);

  // [LED] 깜빡임 태스크 시작
  static int blinkCount = 5;
  xTaskCreate(ledPlayTask, "ledPlay", 1024, &blinkCount, 1, NULL);

  // [버저] 해당 음 500ms 재생
  tone(33, PIANO_FREQ[idx], 500);
  delay(600);                                  // [대기] 음 재생 완료 대기
  noTone(33);

  // [OLED] 대기 화면 복원
  oled.clear();
  oled.drawString(0, 0,  "Piano Ready");       // [OLED] 대기 메시지
  oled.drawString(0, 16, "Send PIANO:0~7");
  oled.display();

  // [BLE] 연주 완료 알림 전송
  bleNotify("DONE:PIANO:" + String(idx));
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀, OLED, I2C 초기화
  initBLE();        // [BLE] OTA + 명령 수신 초기화

  // [OLED] 시작 화면
  oled.clear();
  oled.drawString(0, 0,  "Piano Ready");
  oled.drawString(0, 16, "Send PIANO:0~7");
  oled.display();

  Serial.println("[PIANO] Ready. Send PIANO:0~7 via BLE");
}

void loop() {
  delay(10000);  // [루프] BLE 콜백이 처리, 메인 루프 대기
}