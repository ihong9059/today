// [스마트교실] 온습도 측정 + 쾌적도 LED + OLED 대시보드 + BLE 전송

float g_temp = 0.0;
float g_humi = 0.0;
String g_comfort = "측정중";

// [쾌적도] 온습도 기반 쾌적 등급 판정
String getComfortLevel(float t, float h) {
  if (t >= 20.0 && t <= 26.0 && h >= 40.0 && h <= 60.0) return "쾌적";
  if (t < 18.0 || h < 30.0) return "건조/추움";
  if (t > 28.0 || h > 70.0) return "덥고습함";
  return "보통";
}

// [LED] 쾌적도에 따라 RGB LED 색상 설정
void setComfortLED(String comfort) {
  if (comfort == "쾌적") {
    // 초록: 쾌적
    pixel.setPixelColor(0, pixel.Color(0, 200, 0));
  } else if (comfort == "덥고습함") {
    // 빨강: 덥고 습함
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  } else if (comfort == "건조/추움") {
    // 파랑: 춥거나 건조
    pixel.setPixelColor(0, pixel.Color(0, 80, 255));
  } else {
    // 노랑: 보통
    pixel.setPixelColor(0, pixel.Color(255, 180, 0));
  }
  pixel.show();
}

// [OLED] 대시보드 화면 출력
void updateOLED(float t, float h, String comfort) {
  oled.clear();

  // 제목
  oled.drawString(0, 0, "[ Smart Classroom ]");

  // 온도 표시
  char tempStr[24];
  snprintf(tempStr, sizeof(tempStr), "Temp : %.1f C", t);
  oled.drawString(0, 16, tempStr);

  // 습도 표시
  char humiStr[24];
  snprintf(humiStr, sizeof(humiStr), "Humi : %.1f %%", h);
  oled.drawString(0, 28, humiStr);

  // 쾌적도 표시
  char comfortLine[32];
  snprintf(comfortLine, sizeof(comfortLine), "State: %s", comfort.c_str());
  oled.drawString(0, 42, comfortLine);

  oled.display();
}

// [BLE] 센서 데이터 JSON 형태로 전송
void sendBLE(float t, float h, String comfort) {
  if (deviceConnected && sensorChar) {
    char buf[64];
    snprintf(buf, sizeof(buf),
             "{\"temp\":%.1f,\"humi\":%.1f,\"state\":\"%s\"}",
             t, h, comfort.c_str());
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [알림음] 쾌적도 이상 시 경고 비프
void alertBeep(String comfort) {
  if (comfort == "덥고습함") {
    // 고음 짧게 2회: 더움 경고
    tone(2, 2000, 150);
    delay(250);
    tone(2, 2000, 150);
    delay(250);
    noTone(2);
  } else if (comfort == "건조/추움") {
    // 저음 1회: 추움 경고
    tone(2, 500, 300);
    delay(400);
    noTone(2);
  }
}

// [태스크] 백그라운드에서 5초마다 측정 및 업데이트
void sensorTask(void* param) {
  String prevComfort = "";
  for (;;) {
    float t, h;
    bool ok = aht20_read(t, h);
    if (ok) {
      g_temp = t;
      g_humi = h;
      g_comfort = getComfortLevel(t, h);

      setComfortLED(g_comfort);
      updateOLED(t, h, g_comfort);
      sendBLE(t, h, g_comfort);

      // [알림] 쾌적도 상태 변화 시에만 알림음
      if (g_comfort != prevComfort && prevComfort != "") {
        alertBeep(g_comfort);
      }
      prevComfort = g_comfort;

      Serial.printf("[센서] %.1f°C / %.1f%% → %s\n", t, h, g_comfort.c_str());
    } else {
      // [오류] 센서 읽기 실패 시 흰색 LED
      pixel.setPixelColor(0, pixel.Color(80, 80, 80));
      pixel.show();
      oled.clear();
      oled.drawString(0, 20, "Sensor Error...");
      oled.display();
      Serial.println("[오류] AHT20 읽기 실패");
    }
    vTaskDelay(5000 / portTICK_PERIOD_MS); // 5초 간격
  }
}

// [BLE수신] 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "READ") {
    // 즉시 BLE 전송
    sendBLE(g_temp, g_humi, g_comfort);
    Serial.println("[BLE] READ 명령 수신 → 즉시 전송");
  } else if (cmd == "ALERT") {
    // 수동 경고음 트리거
    alertBeep(g_comfort);
    Serial.println("[BLE] ALERT 명령 수신");
  } else {
    Serial.printf("[BLE] 알 수 없는 명령: %s\n", cmd.c_str());
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED/WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [시작화면] 부팅 메시지 표시
  oled.clear();
  oled.drawString(0, 10, "Smart Classroom");
  oled.drawString(0, 28, "  Initializing...");
  oled.display();

  // [시작음] 부팅 완료 비프
  tone(2, 1000, 100);
  delay(150);
  tone(2, 1500, 100);
  delay(200);
  noTone(2);

  // [LED] 시작 시 흰색 점등 후 대기
  pixel.setPixelColor(0, pixel.Color(80, 80, 80));
  pixel.show();
  delay(1000);

  // [태스크] 센서 측정 태스크 시작 (core 0, 4KB 스택)
  xTaskCreate(sensorTask, "SensorTask", 4096, NULL, 1, NULL);

  Serial.println("[시작] 스마트 교실 시스템 준비 완료");
}

void loop() {
  delay(10000);
}