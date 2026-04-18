// [전역] 이전 온도 저장
float prevTemp = -999.0;
float prevHumi = 0.0;
bool firstRead = true;

// [알림] 부저 비프음 (active LOW)
void beepBuzzer(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(BUZZER, LOW);   // 부저 켜기
    delay(150);
    digitalWrite(BUZZER, HIGH);  // 부저 끄기
    delay(100);
  }
}

// [화면] OLED에 온도/습도 및 변화량 출력
void updateOLED(float temp, float humi, float delta, bool changed) {
  char buf[32];
  oled.clear();

  // 제목
  oled.drawString(0, 0, "Temp Monitor");

  // 현재 온도
  snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
  oled.drawString(0, 16, buf);

  // 현재 습도
  snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
  oled.drawString(0, 28, buf);

  // 변화량 표시
  if (changed) {
    snprintf(buf, sizeof(buf), "Delta: %+.1f C !", delta);
    oled.drawString(0, 42, buf);
    oled.drawString(0, 54, ">> ALERT <<");
  } else {
    snprintf(buf, sizeof(buf), "Delta: %+.1f C", delta);
    oled.drawString(0, 42, buf);
    oled.drawString(0, 54, "Stable");
  }

  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀/OLED/I2C 초기화
  initBLE();        // BLE OTA 초기화

  // 시작 화면
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.drawString(0, 20, "Initializing...");
  oled.display();
  delay(1000);
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);  // 온도/습도 읽기

  if (ok) {
    float delta = 0.0;
    bool changed = false;

    if (!firstRead) {
      delta = temp - prevTemp;  // 이전 온도와 차이 계산

      // [판단] 1도 이상 변화 시 알림
      if (delta >= 1.0 || delta <= -1.0) {
        changed = true;
        Serial.printf("[알림] 온도 변화 감지: %.1f -> %.1f (%.1f도 변화)\n",
                      prevTemp, temp, delta);
        beepBuzzer(3);  // 부저 3회 알림
      }
    } else {
      firstRead = false;
      Serial.printf("[시작] 초기 온도: %.1f C\n", temp);
    }

    updateOLED(temp, humi, delta, changed);  // OLED 갱신
    prevTemp = temp;  // 현재 온도 저장
    prevHumi = humi;
  } else {
    // [오류] 센서 읽기 실패
    oled.clear();
    oled.drawString(0, 0, "Sensor Error!");
    oled.display();
    Serial.println("[오류] AHT20 읽기 실패");
  }

  delay(10000);  // 10초마다 측정
}