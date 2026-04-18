// [전역 상태] 환경 수준: 0=좋음, 1=주의, 2=나쁨
static volatile int envLevel = 0;

// [LED 신호등 태스크] 환경 수준에 따라 LED 색상 제어
void ledTrafficTask(void* param) {
  while (true) {
    int lv = envLevel;
    // 모든 LED 끄기 (active LOW)
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);

    if (lv == 0) {
      // [좋음] 파란 LED 상시 점등
      digitalWrite(LED_BLUE, LOW);
      delay(200);
    } else if (lv == 1) {
      // [주의] 노란 LED 느리게 깜빡임
      digitalWrite(LED_YELLOW, LOW);
      delay(700);
      digitalWrite(LED_YELLOW, HIGH);
      delay(300);
    } else {
      // [나쁨] 빨간 LED 빠르게 깜빡임
      digitalWrite(LED_RED, LOW);
      delay(200);
      digitalWrite(LED_RED, HIGH);
      delay(200);
    }
  }
}

// [센서+OLED 태스크] AHT20 읽기 → 판정 → OLED 표시 → 시리얼 출력
void sensorDisplayTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    oled.clear();

    if (ok) {
      char buf[24];

      // [온도 출력] OLED 1행
      snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
      oled.drawString(0, 0, buf);

      // [습도 출력] OLED 2행
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
      oled.drawString(0, 16, buf);

      // [환경 판정] 교실 쾌적 기준 적용
      if (temp >= 18.0f && temp <= 26.0f && humi >= 30.0f && humi <= 60.0f) {
        envLevel = 0;
        oled.drawString(0, 36, "Status: GOOD");
        oled.drawString(0, 50, "쾌적한 환경");
      } else if (temp >= 14.0f && temp <= 30.0f && humi >= 20.0f && humi <= 70.0f) {
        envLevel = 1;
        oled.drawString(0, 36, "Status: CAUTION");
        oled.drawString(0, 50, "환기 권장");
      } else {
        envLevel = 2;
        oled.drawString(0, 36, "Status: BAD!");
        oled.drawString(0, 50, "즉시 환기 필요");
      }

      // [BLE/시리얼 전송] 데이터 직렬 출력
      Serial.printf("[ENV] Temp=%.1f Humi=%.1f Level=%d\n", temp, humi, (int)envLevel);

    } else {
      // [센서 오류] 읽기 실패 시 경고 표시
      oled.drawString(0, 0, "Sensor Error!");
      oled.drawString(0, 16, "AHT20 Check");
      envLevel = 2;
      Serial.println("[ENV] AHT20 read failed");
    }

    oled.display();
    delay(5000); // 5초마다 갱신
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // 핀·OLED·I2C 초기화
  initBLE();      // BLE OTA 초기화

  // [시작 화면] 부팅 메시지 표시
  oled.clear();
  oled.drawString(0, 0,  "Classroom Monitor");
  oled.drawString(0, 16, "Starting...");
  oled.display();
  delay(1500);

  // [태스크 시작] LED 신호등 + 센서/OLED 태스크 생성
  xTaskCreate(ledTrafficTask,   "LED",    2048, NULL, 1, NULL);
  xTaskCreate(sensorDisplayTask,"Sensor", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000); // BLE OTA 루프 대기
}