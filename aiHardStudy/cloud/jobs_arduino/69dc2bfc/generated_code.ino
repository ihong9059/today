void ledTask(void *param) {
  const int leds[] = {LED_RED, LED_YELLOW, LED_BLUE};
  while (true) {
    for (int i = 0; i < 3; i++) {
      digitalWrite(leds[i], HIGH);
      vTaskDelay(200 / portTICK_PERIOD_MS);
      digitalWrite(leds[i], LOW);
    }
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);

  oled.clear();
  oled.drawString(20, 28, "Hello Vibe");
  oled.display();

  xTaskCreate(ledTask, "ledTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}