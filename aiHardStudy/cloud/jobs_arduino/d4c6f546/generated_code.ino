void ledBlinkTask(void *param) {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);

  while (true) {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
    vTaskDelay(500 / portTICK_PERIOD_MS);

    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, LOW);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  oled.clear();
  oled.drawString(0, 0, "LED Blink");
  oled.display();

  xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}