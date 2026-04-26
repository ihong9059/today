// [LED] 1초 간격 깜빡임

bool ledOn = false;
unsigned long lastBlink = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();
  lcdText(10, 140, "LED Blink", C_GREEN, 2);
  lcdText(10, 170, "1sec interval", C_TEXT, 1);
}

void loop() {
  unsigned long now = millis();

  // [LED 깜빡임] 1초마다 ON/OFF 토글
  if (now - lastBlink >= 1000) {
    lastBlink = now;
    ledOn = !ledOn;

    if (ledOn) {
      setColor(0, 255, 0);
    } else {
      ledOff();
    }
  }
}