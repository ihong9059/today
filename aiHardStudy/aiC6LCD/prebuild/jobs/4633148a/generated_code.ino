// [LED 깜빡임] 1초 간격으로 RGB LED 점멸

unsigned long prevMillis = 0;
bool ledOn = false;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] 상태 표시
  lcdClear();
  lcdText(10, 140, "LED Blink", C_GREEN, 3);
  lcdText(10, 180, "1sec interval", C_TEXT, 2);
}

void loop() {
  unsigned long now = millis();

  if (now - prevMillis >= 1000) {
    prevMillis = now;
    ledOn = !ledOn;

    if (ledOn) {
      // [LED 켜기] 흰색으로 점등
      setColor(255, 255, 255);
    } else {
      // [LED 끄기]
      ledOff();
    }
  }
}
```

파일 쓰기 권한이 필요합니다. 허용해주시면 `firmware.ino`로 저장하겠습니다.