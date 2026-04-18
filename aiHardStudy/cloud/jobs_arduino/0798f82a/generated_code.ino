pp
void ledTask(void *param) {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);

  while (true) {
    digitalWrite(LED_RED, HIGH);
    vTaskDelay(200 / portTICK_PERIOD_MS);
    digitalWrite(LED_RED, LOW);

    digitalWrite(LED_YELLOW, HIGH);
    vTaskDelay(200 / portTICK_PERIOD_MS);
    digitalWrite(LED_YELLOW, LOW);

    digitalWrite(LED_BLUE, HIGH);
    vTaskDelay(200 / portTICK_PERIOD_MS);
    digitalWrite(LED_BLUE, LOW);
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  oled.clear();
  oled.drawString(20, 25, "Hello Vibe");
  oled.display();

  xTaskCreate(ledTask, "ledTask", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}