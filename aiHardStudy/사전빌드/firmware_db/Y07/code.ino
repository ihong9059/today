// [스마트화분] 전역 상태 및 센서값
volatile char plantStatus[16] = "INIT";
volatile float curTemp = 0.0f;
volatile float curHumi = 0.0f;

// [LED/부저] 상태 기반 LED·부저 제어 태스크
void ledBuzzerTask(void* param) {
  while (true) {
    char s[16];
    strncpy(s, (const char*)plantStatus, sizeof(s));

    if (strcmp(s, "Good") == 0) {
      // [Good] 파란LED ON, 나머지 OFF, 부저 OFF
      digitalWrite(LED_BLUE,   LOW);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_RED,    HIGH);
      digitalWrite(BUZZER,     HIGH);
      delay(200);
    } else if (strcmp(s, "Bad") == 0) {
      // [Bad] 노란LED ON, 나머지 OFF
      digitalWrite(LED_YELLOW, LOW);
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(LED_RED,    HIGH);
      digitalWrite(BUZZER,     HIGH);
      delay(200);
    } else if (strcmp(s, "Danger") == 0) {
      // [Danger] 빨간LED + 부저 500ms 토글
      digitalWrite(LED_RED,    LOW);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(BUZZER,     LOW);
      delay(500);
      digitalWrite(BUZZER,     HIGH);
      delay(500);
    } else {
      // [초기] 모든 LED OFF, 부저 OFF
      digitalWrite(LED_RED,    HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(BUZZER,     HIGH);
      delay(200);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // LED·부저·OLED 핀 초기화
  initBLE();        // BLE OTA 초기화

  // [태스크] LED·부저 제어 태스크 생성
  xTaskCreate(ledBuzzerTask, "LEDBuzzer", 2048, NULL, 1, NULL);

  // [OLED] 시작 메시지
  oled.clear();
  oled.drawString(0,  0, "Smart Plant");
  oled.drawString(0, 16, "Initializing...");
  oled.display();
}

void loop() {
  static unsigned long lastMeasure = 0;
  static unsigned long lastBLE     = 0;
  unsigned long now = millis();

  // [측정] 3초마다 온습도 센서 읽기
  if (now - lastMeasure >= 3000) {
    lastMeasure = now;
    float t, h;
    bool ok = aht20_read(t, h);

    if (ok) {
      curTemp = t;
      curHumi = h;

      // [상태판단] 극단·보통·정상 구분
      if (t < 10.0f || t > 35.0f || h < 20.0f || h > 90.0f) {
        strncpy((char*)plantStatus, "Danger", sizeof(plantStatus));
      } else if (t >= 18.0f && t <= 28.0f && h >= 40.0f && h <= 70.0f) {
        strncpy((char*)plantStatus, "Good",   sizeof(plantStatus));
      } else {
        strncpy((char*)plantStatus, "Bad",    sizeof(plantStatus));
      }
    } else {
      // [오류] 센서 읽기 실패
      strncpy((char*)plantStatus, "ERR", sizeof(plantStatus));
    }

    // [OLED] 온도·습도·상태 표시
    char line1[24], line2[24];
    snprintf(line1, sizeof(line1), "T:%.1fC  H:%.0f%%", curTemp, curHumi);
    snprintf(line2, sizeof(line2), "Status: %s",        (const char*)plantStatus);
    oled.clear();
    oled.drawString(0,  0, line1);
    oled.drawString(0, 16, line2);
    oled.display();

    Serial.printf("[Plant] %s  Temp=%.1f  Humi=%.1f\n",
                  (const char*)plantStatus, curTemp, curHumi);
  }

  // [BLE] 10초마다 센서 데이터 전송
  if (now - lastBLE >= 10000) {
    lastBLE = now;
    if (deviceConnected && sensorChar) {
      char msg[64];
      snprintf(msg, sizeof(msg), "T:%.1f,H:%.1f,S:%s",
               (float)curTemp, (float)curHumi, (const char*)plantStatus);
      std::string bleMsg = msg;
      sensorChar->setValue(bleMsg);
      sensorChar->notify();
    }
  }

  delay(100);
}