void setup() {
  Serial.begin(115200);
  initHardware();          // 핀 및 OLED 초기화
  initBLE();               // BLE OTA 초기화

  // [OLED] 1줄 텍스트 표시
  oled.clear();
  oled.drawString(0, 0, "Hello, ESP32!");
  oled.display();
  delay(2000);

  // [OLED] 2줄 텍스트 표시
  oled.clear();
  oled.drawString(0, 0, "Line 1: 안녕하세요");
  oled.drawString(0, 16, "Line 2: ESP32");
  oled.display();
  delay(2000);

  // [OLED] 3줄 텍스트 표시
  oled.clear();
  oled.drawString(0, 0,  "Line 1: 온도");
  oled.drawString(0, 16, "Line 2: 습도");
  oled.drawString(0, 32, "Line 3: OLED Test");
  oled.display();
  delay(2000);
}

void loop() {
  // [루프] 1/2/3줄 순환 표시
  // 1줄
  oled.clear();
  oled.drawString(0, 0, "1줄만 표시합니다");
  oled.display();
  delay(2000);

  // 2줄
  oled.clear();
  oled.drawString(0, 0,  "첫 번째 줄");
  oled.drawString(0, 16, "두 번째 줄");
  oled.display();
  delay(2000);

  // 3줄
  oled.clear();
  oled.drawString(0, 0,  "첫 번째 줄");
  oled.drawString(0, 16, "두 번째 줄");
  oled.drawString(0, 32, "세 번째 줄");
  oled.display();
  delay(10000);
}