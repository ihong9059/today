// [온도측정] AHT20 센서로 온도/습도 읽어 시리얼 출력

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  float temp, humi;
  // [센서읽기] AHT20에서 온도/습도 측정
  bool ok = aht20_read(temp, humi);

  if (ok) {
    // [출력] 측정 성공 시 값 출력
    Serial.print("온도: ");
    Serial.print(temp, 1);
    Serial.print(" °C  |  습도: ");
    Serial.print(humi, 1);
    Serial.println(" %");
  } else {
    // [오류] 센서 읽기 실패
    Serial.println("AHT20 읽기 실패");
  }

  delay(10000);
}