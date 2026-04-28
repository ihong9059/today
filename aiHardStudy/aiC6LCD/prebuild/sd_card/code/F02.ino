// [색상 배열] 버튼 누를 때마다 순환할 색상 목록
uint32_t colors[] = {
  0xFF0000, // 빨강
  0x00FF00, // 초록
  0x0000FF, // 파랑
  0xFFFF00, // 노랑
  0x00FFFF, // 시안
  0xFF00FF, // 보라
  0xFFFFFF, // 흰색
  0x000000  // 꺼짐
};
const int COLOR_COUNT = 8;
int colorIndex = 0;

// [색상 이름] 화면 표시용 이름
const char* colorNames[] = {
  "RED", "GREEN", "BLUE", "YELLOW", "CYAN", "PURPLE", "WHITE", "OFF"
};

// [버튼] 디바운싱 변수
bool lastBtnState = HIGH;
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_MS = 50;

void showColorInfo() {
  // [화면] 배경 및 색상 정보 표시
  lcdClear();
  lcdText(10, 20, "LED Color", C_TEXT, 3);
  lcdText(10, 60, "Changer", C_CYAN, 3);
  lcd.drawLine(0, 95, 172, 95, C_GRAY);

  // [색상 미리보기] 현재 색상으로 사각형 표시
  uint32_t hex = colors[colorIndex];
  uint8_t r = (hex >> 16) & 0xFF;
  uint8_t g = (hex >> 8) & 0xFF;
  uint8_t b = hex & 0xFF;
  uint16_t c565 = lcd.color565(r, g, b);

  lcd.fillRect(36, 110, 100, 100, c565);
  lcd.drawRect(34, 108, 104, 104, C_GRAY);

  // [색상 이름] 현재 색상 이름 표시
  lcdText(10, 230, "Color:", C_GRAY, 2);
  lcdText(10, 255, colorNames[colorIndex], C_YELLOW, 3);

  // [안내] 버튼 조작 안내
  lcdText(5, 295, "BOOT BTN: Next", C_GRAY, 1);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 첫 번째 색상 적용
  setColorHex(colors[colorIndex]);
  showColorInfo();
}

void loop() {
  bool btnState = digitalRead(BOOT_BTN);

  // [디바운싱] 버튼 눌림 감지
  if (btnState == LOW && lastBtnState == HIGH) {
    unsigned long now = millis();
    if (now - lastDebounce > DEBOUNCE_MS) {
      lastDebounce = now;

      // [색상 변경] 다음 색상으로 순환
      colorIndex = (colorIndex + 1) % COLOR_COUNT;
      setColorHex(colors[colorIndex]);
      showColorInfo();

      Serial.print("Color: ");
      Serial.println(colorNames[colorIndex]);
    }
  }

  lastBtnState = btnState;
  delay(10);
}
