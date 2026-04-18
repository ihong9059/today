// [열사병 경보] 상태 플래그
volatile bool dangerMode = false;

// [LED] 전체 점멸 태스크
void ledBlinkTask(void* param) {
  while (true) {
    if (dangerMode) {
      // [경보] 모든 LED ON
      digitalWrite(LED_RED, LOW);
      digitalWrite(LED_YELLOW, LOW);
      digitalWrite(LED_BLUE, LOW);
      delay(300);
      // [경보] 모든 LED OFF
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE, HIGH);
      delay(300);
    } else {
      // [정상] 모든 LED OFF
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE, HIGH);
      delay(200);
    }
  }
}

// [사이렌] 경보음 태스크
void sirenTask(void* param) {
  while (true) {
    if (dangerMode) {
      // [사이렌] 고주파-저주파 반복
      tone(33, 1200, 300);
      delay(350);
      tone(33, 600, 300);
      delay(350);
    } else {
      noTone(33);
      delay(200);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] LED 점멸 태스크 시작
  xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, NULL);
  // [태스크] 사이렌 태스크 시작
  xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // [OLED] 화면 갱신
    oled.clear();
    if (temp >= 35.0) {
      // [경보] 35도 이상 → 위험 상태
      dangerMode = true;
      oled.drawString(10, 0,  "!! DANGER !!");
      oled.drawString(0,  16, "HEAT STROKE");
      oled.drawString(0,  32, ("Temp: " + String(temp, 1) + "C").c_str());
      oled.drawString(0,  48, "GET COOL NOW!");
    } else {
      // [정상] 35도 미만 → 안전
      dangerMode = false;
      oled.drawString(0,  0,  "SAFE");
      oled.drawString(0,  16, ("Temp: " + String(temp, 1) + "C").c_str());
      oled.drawString(0,  32, ("Humi: " + String(humi, 1) + "%").c_str());
    }
    oled.display();

    // [시리얼] 디버그 출력
    Serial.printf("[열사병감지] %.1f C / %.1f%% → %s\n",
                  temp, humi, dangerMode ? "DANGER" : "SAFE");
  }

  delay(10000);
}