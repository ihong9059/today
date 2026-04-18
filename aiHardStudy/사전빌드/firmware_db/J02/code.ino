// [변수] LED 깜빡임 상태
bool ledState = false;

// [태스크] LED 깜빡임 + 부저 동시 제어
void ledBuzzerTask(void* param) {
  while (true) {
    ledState = !ledState;

    // [LED] 모든 LED 켜기/끄기 (active LOW)
    digitalWrite(LED_RED,    ledState ? LOW : HIGH);
    digitalWrite(LED_YELLOW, ledState ? LOW : HIGH);
    digitalWrite(LED_BLUE,   ledState ? LOW : HIGH);

    // [부저] LED 켜질 때마다 부저 짧게 울리기 (active LOW)
    if (ledState) {
      digitalWrite(BUZZER, LOW);   // 부저 켜기
      delay(50);
      digitalWrite(BUZZER, HIGH);  // 부저 끄기
    }

    delay(500); // [딜레이] 0.5초 간격 깜빡임
  }
}

void setup() {
  Serial.begin(115200);
  initHardware(); // [초기화] 핀 및 OLED 초기화
  initBLE();      // [BLE] OTA 초기화

  // [OLED] 상태 표시
  oled.clear();
  oled.drawString(0, 0, "LED + Buzzer");
  oled.drawString(0, 16, "Blinking...");
  oled.display();

  // [태스크] LED/부저 태스크 생성
  xTaskCreate(ledBuzzerTask, "ledBuzzer", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}