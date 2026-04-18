// [태스크] LED 깜빡임 태스크
void ledBlinkTask(void* param) {
  while (true) {
    digitalWrite(LED_BLUE, LOW);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    digitalWrite(LED_BLUE, HIGH);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크] LED 블루 깜빡임 시작
  xTaskCreate(ledBlinkTask, "ledBlink", 1024, NULL, 1, NULL);
}

void loop() {
  float temp, humi;

  // [센서] AHT20 온습도 읽기
  bool ok = aht20_read(temp, humi);

  oled.clear();

  if (ok) {
    // [화면] 온도 표시
    char buf[32];
    snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
    oled.drawString(0, 0, buf);

    // [화면] 습도 표시
    snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
    oled.drawString(0, 16, buf);

    // [경고] 30도 초과 시 HOT! 표시 및 버저
    if (temp > 30.0f) {
      oled.drawString(0, 36, "HOT!");
      digitalWrite(LED_RED, LOW);
      tone(33, 1000, 200);
    } else {
      digitalWrite(LED_RED, HIGH);
    }
  } else {
    // [오류] 센서 읽기 실패
    oled.drawString(0, 0, "Sensor Error");
  }

  oled.display();

  delay(10000);
}