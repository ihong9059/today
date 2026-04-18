// [온도 경보] 온도 28도 초과 시 부저 알림

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // [OLED] 온도 표시
    oled.clear();
    oled.drawString(0, 0, "Temp Monitor");
    oled.drawString(0, 16, ("Temp: " + String(temp, 1) + " C").c_str());
    oled.drawString(0, 32, ("Humi: " + String(humi, 1) + " %").c_str());

    if (temp > 28.0) {
      // [경보] 온도 초과 — 부저 ON, 경고 표시
      oled.drawString(0, 48, "!! TEMP ALERT !!");
      digitalWrite(BUZZER, LOW);
    } else {
      // [정상] 온도 정상 — 부저 OFF
      oled.drawString(0, 48, "Normal");
      digitalWrite(BUZZER, HIGH);
    }

    oled.display();
    Serial.printf("[온도] %.1f C / [습도] %.1f %%\n", temp, humi);
  }

  delay(10000);
}