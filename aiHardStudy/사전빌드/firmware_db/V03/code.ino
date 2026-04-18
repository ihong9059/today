// [온도] 경고 임계값 (°C)
#define TEMP_WARN   28.0f
#define TEMP_DANGER 35.0f

// [상태] 전역 경고 레벨: 0=정상, 1=주의, 2=위험
volatile int alertLevel = 0;

// [BLE] 상태 문자열 시리얼 출력 (BLE 특성에 전달되는 상태값)
void sendBLEStatus(const char* status) {
  Serial.print("[BLE NOTIFY] ");
  Serial.println(status);
}

// [LED] 경고 레벨별 LED 제어 태스크
void ledTask(void* param) {
  while (true) {
    // 모든 LED 끄기 (active LOW: HIGH=OFF)
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);

    if (alertLevel == 0) {
      // [정상] 파란 LED 점등
      digitalWrite(LED_BLUE, LOW);
      delay(500);
    } else if (alertLevel == 1) {
      // [주의] 노란 LED 점등
      digitalWrite(LED_YELLOW, LOW);
      delay(500);
    } else {
      // [위험] 빨간 LED 빠른 깜빡임
      digitalWrite(LED_RED, LOW);
      delay(150);
      digitalWrite(LED_RED, HIGH);
      delay(150);
    }
  }
}

// [사이렌] 위험 레벨 시 상승/하강 사이렌 재생 태스크
void sirenTask(void* param) {
  while (true) {
    if (alertLevel == 2) {
      // [위험] 사이렌 상승 구간
      for (int f = 600; f <= 1400; f += 40) {
        if (alertLevel != 2) break;
        tone(33, f, 40);
        delay(40);
      }
      // [위험] 사이렌 하강 구간
      for (int f = 1400; f >= 600; f -= 40) {
        if (alertLevel != 2) break;
        tone(33, f, 40);
        delay(40);
      }
    } else {
      noTone(33); // [정상/주의] 소리 끔
      delay(200);
    }
  }
}

// [온도] AHT20 측정 → 경고 레벨 판정 → OLED/BLE 출력 태스크
void tempTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi); // 온습도 센서 읽기

    if (!ok) {
      // [오류] 센서 통신 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error!");
      oled.drawString(0, 20, "Check AHT20");
      oled.display();
      delay(3000);
      continue;
    }

    // [판단] 온도 임계값 비교로 경고 단계 결정
    int prev = alertLevel;
    if (temp >= TEMP_DANGER) {
      alertLevel = 2;
    } else if (temp >= TEMP_WARN) {
      alertLevel = 1;
    } else {
      alertLevel = 0;
    }

    // [BLE] 상태 변경 시 알림 전송
    if (alertLevel != prev) {
      const char* s = (alertLevel == 2) ? "DANGER" : (alertLevel == 1) ? "WARN" : "OK";
      sendBLEStatus(s);
    }

    // [OLED] 온도/습도/상태 표시
    char line1[24], line2[24], line3[24];
    snprintf(line1, sizeof(line1), "T:%.1fC  H:%.1f%%", temp, humi);
    const char* label = (alertLevel == 2) ? "!! DANGER !!" : (alertLevel == 1) ? ">> WARN <<" : "OK (Normal)";
    snprintf(line2, sizeof(line2), "%s", label);
    snprintf(line3, sizeof(line3), "W:%.0f D:%.0f C", TEMP_WARN, TEMP_DANGER);

    oled.clear();
    oled.drawString(0,  0, line1); // 온도/습도
    oled.drawString(0, 22, line2); // 경고 상태
    oled.drawString(0, 44, line3); // 임계값 참고
    oled.display();

    delay(3000); // [주기] 3초마다 측정
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // LED, 버저, OLED 핀 초기화
  initBLE();      // BLE OTA 서비스 시작

  // [시작] OLED 부팅 메시지
  oled.clear();
  oled.drawString(0,  0, "Temp Alert System");
  oled.drawString(0, 20, "W:28C  D:35C");
  oled.drawString(0, 40, "Starting...");
  oled.display();

  // [태스크] 기능별 FreeRTOS 태스크 생성
  xTaskCreate(ledTask,   "LED",  2048, NULL, 2, NULL); // LED 제어
  xTaskCreate(sirenTask, "SRN",  2048, NULL, 2, NULL); // 사이렌 제어
  xTaskCreate(tempTask,  "TEMP", 4096, NULL, 1, NULL); // 온도 측정
}

void loop() {
  delay(10000); // [메인] 실제 처리는 태스크에 위임
}