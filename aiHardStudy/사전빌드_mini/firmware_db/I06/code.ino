// [전역] 센서 측정값 공유 변수
float g_temp = 0.0f;
float g_humi = 0.0f;
float g_di   = 0.0f;

// [불쾌지수] DI = 0.81T + 0.01H(0.99T - 14.99) + 46.3
float calcDI(float t, float h) {
  return 0.81f * t + 0.01f * h * (0.99f * t - 14.99f) + 46.3f;
}

// [LED 신호등] 불쾌지수 구간별 색상 (초록/노랑/주황/빨강)
void updateLED(float di) {
  if (di < 68.0f) {
    pixel.setPixelColor(0, pixel.Color(0, 200, 0));    // 쾌적: 초록
  } else if (di < 75.0f) {
    pixel.setPixelColor(0, pixel.Color(220, 220, 0));  // 보통: 노랑
  } else if (di < 80.0f) {
    pixel.setPixelColor(0, pixel.Color(255, 80, 0));   // 불쾌: 주황
  } else {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));    // 매우불쾌: 빨강
  }
  pixel.show();
}

// [OLED] 온도·습도·불쾌지수·상태 4줄 표시
void updateOLED(float temp, float humi, float di) {
  char buf[32];
  const char* status;

  if (di < 68.0f)      status = "COMFY   :)";
  else if (di < 75.0f) status = "NORMAL  :|";
  else if (di < 80.0f) status = "STUFFY  :(";
  else                  status = "HOT!!  >:(";

  oled.clear();
  snprintf(buf, sizeof(buf), "Temp : %.1f C", temp);
  oled.drawString(0, 0, buf);

  snprintf(buf, sizeof(buf), "Humi : %.1f %%", humi);
  oled.drawString(0, 16, buf);

  snprintf(buf, sizeof(buf), "DI   : %.1f", di);
  oled.drawString(0, 32, buf);

  oled.drawString(0, 48, status);
  oled.display();
}

// [BLE] 센서 데이터 JSON 형태로 전송
void sendBLE(float temp, float humi, float di) {
  if (deviceConnected && sensorChar) {
    char buf[64];
    snprintf(buf, sizeof(buf), "T:%.1f,H:%.1f,DI:%.1f", temp, humi, di);
    sensorChar->setValue(std::string(buf));
    sensorChar->notify();
  }
}

// [경보음] 불쾌지수 단계별 알림음
void alertBeep(float di) {
  if (di >= 80.0f) {
    // 매우불쾌: 경고음 3회
    for (int i = 0; i < 3; i++) {
      tone(2, 1500, 120);
      delay(200);
    }
    noTone(2);
  } else if (di >= 75.0f) {
    // 불쾌: 단음 1회
    tone(2, 800, 150);
    delay(200);
    noTone(2);
  }
}

// [태스크] 5초 주기 측정 → LED·OLED·BLE 업데이트
void sensorTask(void* param) {
  float prevDI = -1.0f;
  while (true) {
    float temp, humi;
    if (aht20_read(temp, humi)) {
      g_temp = temp;
      g_humi = humi;
      g_di   = calcDI(temp, humi);

      updateOLED(g_temp, g_humi, g_di);
      updateLED(g_di);
      sendBLE(g_temp, g_humi, g_di);

      // [경보] 불쾌 단계 진입 시 한 번만 알림
      int prevLevel = (prevDI < 68) ? 0 : (prevDI < 75) ? 1 : (prevDI < 80) ? 2 : 3;
      int currLevel = (g_di  < 68) ? 0 : (g_di  < 75) ? 1 : (g_di  < 80) ? 2 : 3;
      if (currLevel > prevLevel) alertBeep(g_di);
      prevDI = g_di;

      Serial.printf("[ENV] T=%.1f H=%.1f DI=%.1f\n", g_temp, g_humi, g_di);
    } else {
      // [오류] 센서 실패: 빨간 LED + 오류 메시지
      pixel.setPixelColor(0, pixel.Color(255, 0, 0));
      pixel.show();
      oled.clear();
      oled.drawString(12, 24, "Sensor Error!");
      oled.display();
      Serial.println("[ERR] AHT20 read failed");
    }
    vTaskDelay(pdMS_TO_TICKS(5000)); // 5초 간격
  }
}

// [BLE 수신] READ 명령 시 즉시 데이터 전송
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "READ") {
    sendBLE(g_temp, g_humi, g_di);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [부팅음] 시작 멜로디
  tone(2, 784, 80); delay(120);
  tone(2, 988, 80); delay(120);
  tone(2, 1175, 120); delay(160);
  noTone(2);

  // [화면] 부팅 스플래시
  oled.clear();
  oled.drawString(8, 8,  "Classroom");
  oled.drawString(4, 24, "Env Monitor");
  oled.drawString(16, 44, "Starting...");
  oled.display();
  delay(1500);

  // [태스크] 센서 측정 태스크 실행 (코어 0)
  xTaskCreate(sensorTask, "SensorTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}