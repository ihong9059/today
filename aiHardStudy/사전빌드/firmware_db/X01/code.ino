// [LED 깜빡] 빨강 0.3초 태스크
void taskRedBlink(void* param) {
  while (true) {
    digitalWrite(LED_RED, LOW);
    vTaskDelay(300 / portTICK_PERIOD_MS);
    digitalWrite(LED_RED, HIGH);
    vTaskDelay(300 / portTICK_PERIOD_MS);
  }
}

// [LED 깜빡] 노랑 0.7초 태스크
void taskYellowBlink(void* param) {
  while (true) {
    digitalWrite(LED_YELLOW, LOW);
    vTaskDelay(700 / portTICK_PERIOD_MS);
    digitalWrite(LED_YELLOW, HIGH);
    vTaskDelay(700 / portTICK_PERIOD_MS);
  }
}

// [LED 깜빡] 파랑 1.5초 태스크
void taskBlueBlink(void* param) {
  while (true) {
    digitalWrite(LED_BLUE, LOW);
    vTaskDelay(1500 / portTICK_PERIOD_MS);
    digitalWrite(LED_BLUE, HIGH);
    vTaskDelay(1500 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [태스크 생성] 세 LED 동시 깜빡 시작
  xTaskCreate(taskRedBlink,    "RED",    1024, NULL, 1, NULL);
  xTaskCreate(taskYellowBlink, "YELLOW", 1024, NULL, 1, NULL);
  xTaskCreate(taskBlueBlink,   "BLUE",   1024, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}