// [이진수] LED 3개로 0~7 카운트 (RED=2진 bit2, YELLOW=bit1, BLUE=bit0)

int currentCount = 0;

void ledBinaryTask(void* param) {
  // [루프] 0~7 반복 카운트
  while (true) {
    for (int n = 0; n <= 7; n++) {
      currentCount = n;

      // [비트] active LOW: 비트가 1이면 LOW(ON), 0이면 HIGH(OFF)
      digitalWrite(LED_RED,    (n & 0b100) ? LOW : HIGH); // bit2
      digitalWrite(LED_YELLOW, (n & 0b010) ? LOW : HIGH); // bit1
      digitalWrite(LED_BLUE,   (n & 0b001) ? LOW : HIGH); // bit0

      // [OLED] 현재 숫자와 이진수 표시
      oled.clear();
      oled.drawString(0, 0,  "Binary Counter");
      oled.drawString(0, 16, ("Dec: " + String(n)).c_str());
      char binStr[5];
      snprintf(binStr, sizeof(binStr), "%d%d%d",
        (n >> 2) & 1,
        (n >> 1) & 1,
        (n >> 0) & 1);
      oled.drawString(0, 32, ("Bin: " + String(binStr)).c_str());
      oled.drawString(0, 48, "R  Y  B");
      oled.display();

      delay(1000); // [대기] 1초 간격
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀 및 OLED 초기화
  initBLE();       // [BLE] OTA 초기화

  // [태스크] LED 이진 카운터 별도 태스크 실행
  xTaskCreate(ledBinaryTask, "ledBinary", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}