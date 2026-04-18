// [쾌적도] 온습도 기반 상태 판별 함수
String getComfortLevel(float temp, float humi) {
  if (temp >= 18.0 && temp <= 26.0 && humi >= 40.0 && humi <= 60.0) {
    return "Good";
  } else if (temp >= 15.0 && temp <= 30.0 && humi >= 30.0 && humi <= 70.0) {
    return "Bad";
  } else {
    return "Danger";
  }
}

// [LED] 쾌적도에 따른 LED 표시 태스크
void ledComfortTask(void* param) {
  String* level = (String*)param;
  if (*level == "Good") {
    // [Good] 파란 LED 켜기
    digitalWrite(LED_BLUE, LOW);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_RED, HIGH);
  } else if (*level == "Bad") {
    // [Bad] 노란 LED 켜기
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_RED, HIGH);
  } else {
    // [Danger] 빨간 LED 깜빡임
    for (int i = 0; i < 5; i++) {
      digitalWrite(LED_RED, LOW);
      vTaskDelay(300 / portTICK_PERIOD_MS);
      digitalWrite(LED_RED, HIGH);
      vTaskDelay(300 / portTICK_PERIOD_MS);
    }
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
  }
  vTaskDelete(NULL);
}

// [쾌적도] 현재 레벨 전역 저장
String currentLevel = "";

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  // [센서] AHT20 온습도 읽기
  bool ok = aht20_read(temp, humi);

  oled.clear();

  if (!ok) {
    // [오류] 센서 읽기 실패 표시
    oled.drawString(0, 0, "Sensor Error");
    oled.display();
    delay(10000);
    return;
  }

  // [쾌적도] 상태 판별
  String level = getComfortLevel(temp, humi);

  // [OLED] 온도 표시
  char tempStr[20];
  sprintf(tempStr, "Temp: %.1f C", temp);
  oled.drawString(0, 0, tempStr);

  // [OLED] 습도 표시
  char humiStr[20];
  sprintf(humiStr, "Humi: %.1f %%", humi);
  oled.drawString(0, 16, humiStr);

  // [OLED] 쾌적도 상태 표시
  String statusLine = "Status: " + level;
  oled.drawString(0, 32, statusLine.c_str());

  // [OLED] 상태별 설명 한 줄 추가
  if (level == "Good") {
    oled.drawString(0, 48, "Comfortable!");
  } else if (level == "Bad") {
    oled.drawString(0, 48, "Uncomfortable");
  } else {
    oled.drawString(0, 48, "!! WARNING !!");
  }

  oled.display();

  // [LED] 상태 변경 시 LED 태스크 실행
  if (level != currentLevel) {
    currentLevel = level;
    xTaskCreate(ledComfortTask, "ledComfort", 2048, (void*)&currentLevel, 1, NULL);
  }

  // [시리얼] 디버그 출력
  Serial.printf("[쾌적도] Temp=%.1f Humi=%.1f => %s\n", temp, humi, level.c_str());

  delay(10000);
}