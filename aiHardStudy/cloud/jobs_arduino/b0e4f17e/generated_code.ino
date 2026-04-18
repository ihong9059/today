pp
void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, HIGH);

  oled.clear();
  oled.drawString(0, 0, "Buzzer Test");
  oled.display();

  xTaskCreate(buzzerTask, "buzzer", 2048, NULL, 1, NULL);
}

void buzzerTask(void *param) {
  while (true) {
    digitalWrite(BUZZER, LOW);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    digitalWrite(BUZZER, HIGH);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void loop() {
  delay(10000);
}