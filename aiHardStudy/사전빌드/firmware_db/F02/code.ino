// [초기화] 시리얼, 하드웨어, BLE 순서대로 초기화
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

// [센서] 온도/습도 읽어서 시리얼 출력
void loop() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);

  if (ok) {
    Serial.print("온도: ");
    Serial.print(temp, 1);
    Serial.print(" °C  |  습도: ");
    Serial.print(humi, 1);
    Serial.println(" %");
  } else {
    Serial.println("AHT20 읽기 실패");
  }

  delay(10000);
}