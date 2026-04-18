// [전역] 온도 임계값
#define TEMP_THRESHOLD 25.0

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  // [센서] AHT20 온도 읽기
  bool ok = aht20_read(temp, humi);

  if (ok) {
    Serial.printf("온도: %.1f°C\n", temp);

    if (temp <= TEMP_THRESHOLD) {
      // [LED] 25도 이하 → 파란 LED ON
      digitalWrite(LED_BLUE, LOW);
      digitalWrite(LED_RED, HIGH);
    } else {
      // [LED] 25도 초과 → 빨간 LED ON
      digitalWrite(LED_RED, LOW);
      digitalWrite(LED_BLUE, HIGH);
    }

    // [OLED] 온도 표시
    oled.clear();
    oled.drawString(0, 0, "Temp Monitor");
    char buf[32];
    sprintf(buf, "Temp: %.1f C", temp);
    oled.drawString(0, 16, buf);
    oled.drawString(0, 32, temp <= TEMP_THRESHOLD ? "=> BLUE LED" : "=> RED LED");
    oled.display();
  }

  delay(10000);
}