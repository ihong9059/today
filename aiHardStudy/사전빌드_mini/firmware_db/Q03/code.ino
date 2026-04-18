// [기상스테이션] 전역 변수
float tempMax = -999.0f;
float tempMin = 999.0f;
float lastTemp = 0.0f;
float lastHumi = 0.0f;

// [쾌적도] 불쾌지수 계산 (THI)
float calcTHI(float t, float h) {
  return 0.81f * t + 0.01f * h * (0.99f * t - 14.99f) + 46.3f;
}

// [쾌적도] 쾌적도 문자열 반환
const char* comfortLabel(float thi) {
  if (thi < 68.0f) return "쾌적";
  if (thi < 75.0f) return "보통";
  if (thi < 80.0f) return "불쾌";
  return "매우불쾌";
}

// [LED] 쾌적도별 LED 색상
void setComfortLED(float thi) {
  if (thi < 68.0f) {
    pixel.setPixelColor(0, pixel.Color(0, 200, 100)); // 초록: 쾌적
  } else if (thi < 75.0f) {
    pixel.setPixelColor(0, pixel.Color(200, 200, 0)); // 노랑: 보통
  } else if (thi < 80.0f) {
    pixel.setPixelColor(0, pixel.Color(255, 80, 0));  // 주황: 불쾌
  } else {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));   // 빨강: 매우불쾌
  }
  pixel.show();
}

// [OLED] 센서 데이터 화면 출력
void displayWeather(float t, float h, float thi) {
  char buf[32];
  oled.clear();

  // 온도/습도
  snprintf(buf, sizeof(buf), "T:%.1fC H:%.0f%%", t, h);
  oled.drawString(0, 0, buf);

  // 불쾌지수
  snprintf(buf, sizeof(buf), "THI:%.1f %s", thi, comfortLabel(thi));
  oled.drawString(0, 16, buf);

  // 최고/최저
  snprintf(buf, sizeof(buf), "Hi:%.1f Lo:%.1f", tempMax, tempMin);
  oled.drawString(0, 32, buf);

  oled.display();
}

// [BLE] 센서 데이터 BLE 전송
void sendBLE(float t, float h, float thi) {
  if (deviceConnected && sensorChar) {
    char buf[64];
    snprintf(buf, sizeof(buf),
             "{\"t\":%.1f,\"h\":%.0f,\"thi\":%.1f,\"max\":%.1f,\"min\":%.1f}",
             t, h, thi, tempMax, tempMin);
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [BLE수신] 명령 수신 처리 (reset: 최고최저 초기화)
void onBleReceive(String cmd) {
  if (cmd == "reset") {
    // [리셋] 최고최저 초기화
    tempMax = -999.0f;
    tempMin = 999.0f;
    tone(2, 1000, 100);
    Serial.println("[BLE] 최고최저 초기화");
  }
}

// [태스크] 백그라운드 센서 측정 태스크
void sensorTask(void* param) {
  for (;;) {
    float t, h;
    bool ok = aht20_read(t, h);

    if (ok) {
      lastTemp = t;
      lastHumi = h;

      // [최고최저] 갱신
      if (t > tempMax) tempMax = t;
      if (t < tempMin) tempMin = t;

      float thi = calcTHI(t, h);

      // [출력] OLED + LED + BLE + 시리얼
      displayWeather(t, h, thi);
      setComfortLED(thi);
      sendBLE(t, h, thi);

      Serial.printf("[센서] T=%.1f H=%.0f%% THI=%.1f(%s) Hi=%.1f Lo=%.1f\n",
                    t, h, thi, comfortLabel(thi), tempMax, tempMin);
    } else {
      // [오류] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error");
      oled.display();
      pixel.setPixelColor(0, pixel.Color(100, 0, 100)); // 보라: 오류
      pixel.show();
      Serial.println("[오류] AHT20 읽기 실패");
    }

    vTaskDelay(pdMS_TO_TICKS(5000)); // [주기] 5초마다 측정
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작음
  tone(2, 880, 150);
  delay(200);
  tone(2, 1100, 150);

  // [태스크] 센서 측정 태스크 생성
  xTaskCreate(sensorTask, "sensorTask", 4096, NULL, 1, NULL);

  Serial.println("[시작] 미니 기상 스테이션 가동");
}

void loop() {
  delay(10000);
}