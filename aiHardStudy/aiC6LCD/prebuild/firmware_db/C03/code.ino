// [숨쉬기] 밝기 변수
int breathBrightness = 0;
int breathStep = 3;
bool breathingUp = true;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();
  lcdText(20, 140, "RGB Breathing", C_CYAN, 2);
  lcdText(35, 165, "Fade In/Out", C_GRAY, 2);
}

void loop() {
  // [숨쉬기] 밝기 증가/감소
  if (breathingUp) {
    breathBrightness += breathStep;
    if (breathBrightness >= 255) {
      breathBrightness = 255;
      breathingUp = false;
    }
  } else {
    breathBrightness -= breathStep;
    if (breathBrightness <= 0) {
      breathBrightness = 0;
      breathingUp = true;
    }
  }

  // [LED] 파란색 계열로 숨쉬기 효과 적용
  setColor(0, breathBrightness / 4, breathBrightness);

  // [LCD] 현재 밝기 표시
  lcd.fillRect(0, 200, 172, 30, C_BG);
  lcd.setTextColor(C_YELLOW, C_BG);
  lcd.setTextSize(2);
  lcd.setCursor(30, 205);
  lcd.print("Bright: ");
  lcd.print(breathBrightness);

  delay(15); // [타이밍] 부드러운 페이드 속도
}