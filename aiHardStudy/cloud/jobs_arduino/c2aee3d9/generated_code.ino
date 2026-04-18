void taskLedBuzzer(void *param) {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, HIGH);

  for (int i = 1; i <= 5; i++) {
    oled.clear();
    char buf[20];
    sprintf(buf, "Round %d / 5", i);
    oled.drawString(20, 20, buf);
    oled.display();

    // LED blink
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);
    delay(300);
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE, LOW);
    delay(200);

    // Buzzer beep
    digitalWrite(BUZZER, LOW);
    delay(300);
    digitalWrite(BUZZER, HIGH);
    delay(200);
  }

  oled.clear();
  oled.drawString(20, 20, "Done!");
  oled.display();

  vTaskDelete(NULL);
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  xTaskCreate(taskLedBuzzer, "LedBuzzer", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}