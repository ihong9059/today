// [설정] 색상 순서 인덱스
int colorIndex = 0;
unsigned long lastChange = 0;
const int INTERVAL = 500; // 0.5초 간격

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] 안내 텍스트 표시
  lcdClear();
  lcdText(20, 140, "RGB Blink Test", C_TEXT, 2);
}

void loop() {
  unsigned long now = millis();

  if (now - lastChange >= INTERVAL) {
    lastChange = now;

    // [LED] 빨강-초록-파랑 순환
    switch (colorIndex) {
      case 0:
        setColor(255, 0, 0); // 빨강
        lcdText(50, 170, "  RED   ", C_RED, 2);
        break;
      case 1:
        setColor(0, 255, 0); // 초록
        lcdText(50, 170, " GREEN  ", C_GREEN, 2);
        break;
      case 2:
        setColor(0, 0, 255); // 파랑
        lcdText(50, 170, "  BLUE  ", C_BLUE, 2);
        break;
    }

    colorIndex = (colorIndex + 1) % 3; // 다음 색상으로
  }

  delay(10);
}