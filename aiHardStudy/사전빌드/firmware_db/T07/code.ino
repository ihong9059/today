// [전역] BLE 수신→태스크 파라미터 구조체
struct BlinkParam {
  int count;
  int interval;
};

// [BLE] base firmware에 존재하는 알림 전송 함수
extern void bleNotify(String msg);

// [LED] 깜빡임 태스크 — xTaskCreate로 실행
void blinkTask(void* pvParam) {
  BlinkParam* p = (BlinkParam*)pvParam;
  int cnt = p->count;
  int inv = p->interval;
  delete p;

  // [LED] count번 interval ms 간격으로 빨간 LED 깜빡
  for (int i = 0; i < cnt; i++) {
    digitalWrite(LED_RED, LOW);   // ON (active LOW)
    delay(inv);
    digitalWrite(LED_RED, HIGH);  // OFF
    if (i < cnt - 1) delay(inv);  // 마지막엔 후딜레이 없음
  }

  // [BLE] 완료 응답 전송
  bleNotify("BLINK:DONE");
  Serial.println("[BLE] BLINK 완료 응답 전송");
  vTaskDelete(NULL);
}

// [BLE] base firmware에서 BLE 쓰기 수신 시 호출되는 콜백
void onBleReceive(String data) {
  data.trim();
  Serial.print("[BLE] 수신: ");
  Serial.println(data);

  // [파싱] "BLINK:count:interval" 형식 확인
  if (!data.startsWith("BLINK:")) return;

  int sep1 = data.indexOf(':', 6);       // 두 번째 ':' 위치
  if (sep1 < 0) {
    bleNotify("ERR:FORMAT");
    return;
  }

  int count    = data.substring(6, sep1).toInt();
  int interval = data.substring(sep1 + 1).toInt();

  // [검증] 범위 확인
  if (count <= 0 || count > 100 || interval < 50 || interval > 10000) {
    bleNotify("ERR:PARAM");
    return;
  }

  Serial.printf("[BLINK] %d회 %dms 간격 시작\n", count, interval);

  // [태스크] LED 깜빡임 태스크 생성
  BlinkParam* p = new BlinkParam{count, interval};
  xTaskCreate(blinkTask, "blinkTask", 2048, p, 1, NULL);
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화, OLED init 포함
  initBLE();        // BLE OTA 초기화

  // [OLED] 대기 안내 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "BLE Ready");
  oled.drawString(0, 16, "BLINK:n:ms");
  oled.display();

  Serial.println("[SETUP] 완료 — BLINK:count:interval 명령 대기");
}

void loop() {
  delay(10000);
}