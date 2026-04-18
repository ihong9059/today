// [전역] 센서 데이터 공유 변수 (태스크 간 공유)
volatile float g_temp = 0.0f;
volatile float g_humi = 0.0f;
volatile int g_comfort = 0; // 0=쾌적, 1=보통, 2=불쾌

// [쾌적도] 온습도 기반 쾌적 단계 계산 (0=쾌적/1=보통/2=불쾌)
int calcComfort(float temp, float humi) {
  if (temp >= 18.0f && temp <= 26.0f && humi >= 40.0f && humi <= 60.0f) return 0;
  if (temp > 30.0f || temp < 15.0f || humi > 70.0f || humi < 30.0f) return 2;
  return 1;
}

// [LED] 쾌적도에 따른 LED 표시 태스크
void ledTask(void* param) {
  while (true) {
    int c = g_comfort;
    if (c == 0) {
      // [LED] 쾌적 → 파란불 ON
      digitalWrite(LED_BLUE,   LOW);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_RED,    HIGH);
      vTaskDelay(500 / portTICK_PERIOD_MS);
    } else if (c == 1) {
      // [LED] 보통 → 노란불 ON
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(LED_YELLOW, LOW);
      digitalWrite(LED_RED,    HIGH);
      vTaskDelay(500 / portTICK_PERIOD_MS);
    } else {
      // [LED] 불쾌 → 빨간불 경고 깜빡임
      digitalWrite(LED_BLUE,   HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_RED,    LOW);
      vTaskDelay(300 / portTICK_PERIOD_MS);
      digitalWrite(LED_RED, HIGH);
      vTaskDelay(300 / portTICK_PERIOD_MS);
    }
  }
}

// [경보] 불쾌 상태 경보음 (멜로디 버저 GPIO33)
void playAlert() {
  tone(33, 880,  150); delay(180);
  tone(33, 1100, 150); delay(180);
  tone(33, 880,  150); delay(180);
  noTone(33);
}

// [OLED] 스마트 교실 대시보드 렌더링
void drawDashboard(float temp, float humi, int comfort) {
  char buf[32];
  oled.clear();
  oled.drawString(0, 0,  "== Smart Class ==");
  sprintf(buf, "Temp : %.1f C", temp);
  oled.drawString(0, 14, buf);
  sprintf(buf, "Humi : %.1f %%", humi);
  oled.drawString(0, 26, buf);
  if (comfort == 0)      oled.drawString(0, 40, "Status: COMFORT :)");
  else if (comfort == 1) oled.drawString(0, 40, "Status: MODERATE :|");
  else                   oled.drawString(0, 40, "Status: ALERT !!!");
  oled.display();
}

// [센서] AHT20 읽기 + OLED + BLE 전송 태스크
void sensorTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);
    if (ok) {
      g_temp    = temp;
      g_humi    = humi;
      g_comfort = calcComfort(temp, humi);

      // [OLED] 대시보드 업데이트
      drawDashboard(temp, humi, g_comfort);

      // [BLE] 시리얼로 실시간 센서 데이터 출력 (BLE 모니터 수신)
      Serial.printf("[BLE] T=%.1f H=%.1f C=%d\n", temp, humi, g_comfort);

      // [경보] 불쾌 단계 도달 시 경보음 발생
      if (g_comfort == 2) {
        playAlert();
      }
    } else {
      // [센서] 읽기 실패 시 OLED에 오류 표시
      oled.clear();
      oled.drawString(0, 20, "Sensor Error...");
      oled.display();
      Serial.println("[ERROR] AHT20 read failed");
    }
    vTaskDelay(3000 / portTICK_PERIOD_MS); // [센서] 3초 주기 측정
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀·OLED·I2C 초기화
  initBLE();      // [BLE] OTA 및 BLE 스택 초기화

  // [태스크] 쾌적도 LED 제어 태스크 등록
  xTaskCreate(ledTask,    "LED",    2048, NULL, 1, NULL);
  // [태스크] 센서 읽기 + 대시보드 + BLE 전송 태스크 등록
  xTaskCreate(sensorTask, "Sensor", 4096, NULL, 2, NULL);
}

void loop() {
  delay(10000); // [루프] BLE OTA 처리 양보
}