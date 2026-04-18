// [전역] 환경 대시보드 상태 변수
bool ledState = false;
unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 5000;

// [BLE] 스마트폰 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "LED_ON") {
    ledState = true;
    digitalWrite(LED_BLUE, LOW);  // 파란 LED 켜기
  } else if (cmd == "LED_OFF") {
    ledState = false;
    digitalWrite(LED_BLUE, HIGH); // 파란 LED 끄기
  }
}

// [OLED] 환경 대시보드 4줄 출력
void updateDisplay(float temp, float humi, bool led, unsigned long uptimeSec) {
  oled.clear();

  // 1줄: 온도
  char line1[24];
  snprintf(line1, sizeof(line1), "Temp : %.1f C", temp);
  oled.drawString(0, 0, line1);

  // 2줄: 습도
  char line2[24];
  snprintf(line2, sizeof(line2), "Humi : %.1f %%", humi);
  oled.drawString(0, 16, line2);

  // 3줄: LED 상태
  char line3[24];
  snprintf(line3, sizeof(line3), "LED  : %s", led ? "ON" : "OFF");
  oled.drawString(0, 32, line3);

  // 4줄: 업타임 (초)
  char line4[24];
  snprintf(line4, sizeof(line4), "Up   : %lu s", uptimeSec);
  oled.drawString(0, 48, line4);

  oled.display();
}

// [BLE] 전체 센서 데이터 JSON 형태로 전송
void sendBleDashboard(float temp, float humi, bool led, unsigned long uptimeSec) {
  if (deviceConnected && sensorChar) {
    char buf[96];
    snprintf(buf, sizeof(buf),
      "{\"temp\":%.1f,\"humi\":%.1f,\"led\":%d,\"uptime\":%lu}",
      temp, humi, led ? 1 : 0, uptimeSec);
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 및 OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [초기화] 파란 LED 꺼진 상태로 시작
  digitalWrite(LED_BLUE, HIGH);

  Serial.println("환경 대시보드 시작");
}

void loop() {
  unsigned long now = millis();

  if (now - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = now;

    unsigned long uptimeSec = now / 1000;

    // [센서] AHT20 온습도 읽기
    float temp = 0.0f, humi = 0.0f;
    bool ok = aht20_read(temp, humi);

    if (!ok) {
      // [오류] 센서 읽기 실패 시 빨간 LED 점등
      digitalWrite(LED_RED, LOW);
      delay(200);
      digitalWrite(LED_RED, HIGH);
      Serial.println("AHT20 읽기 실패");
      return;
    }

    // [OLED] 대시보드 갱신
    updateDisplay(temp, humi, ledState, uptimeSec);

    // [BLE] 전체 데이터 전송
    sendBleDashboard(temp, humi, ledState, uptimeSec);

    // [시리얼] 디버그 출력
    Serial.printf("[대시보드] 온도=%.1f 습도=%.1f LED=%s 업타임=%lu s\n",
      temp, humi, ledState ? "ON" : "OFF", uptimeSec);
  }

  delay(100); // [루프] CPU 점유 방지
}