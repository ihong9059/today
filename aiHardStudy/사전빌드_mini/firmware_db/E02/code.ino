void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE 초기화

  // OLED에 "UTTEC Mini" 표시
  oled.clear();
  oled.drawString(0, 0, "UTTEC Mini");
  oled.display();
}

void loop() {
  delay(10000);
}