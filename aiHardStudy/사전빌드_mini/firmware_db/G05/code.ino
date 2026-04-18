// [색상 순환] 현재 색상 인덱스 (0=빨, 1=초, 2=파)
int colorIndex = 0;
bool lastSwitchState = HIGH;

// [색상 배열] RGB 순환 색상 정의
const uint32_t colors[] = {
  0xFF0000, // 빨강
  0x00FF00, // 초록
  0x0000FF  // 파랑
};
const char* colorNames[] = {"Red", "Green", "Blue"};

void setColor(int idx) {
  // [LED] 색상 적용
  uint32_t c = colors[idx];
  uint8_t r = (c >> 16) & 0xFF;
  uint8_t g = (c >> 8) & 0xFF;
  uint8_t b = c & 0xFF;
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();

  // [OLED] 현재 색상 표시
  oled.clear();
  oled.drawString(0, 0, "Color Change");
  oled.drawString(0, 16, colorNames[idx]);
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기] 첫 색상 빨강으로 설정
  setColor(colorIndex);
}

void loop() {
  // [스위치] 현재 상태 읽기
  bool currentState = digitalRead(SWITCH_PIN);

  // [디바운스] 눌림 감지 (HIGH→LOW)
  if (lastSwitchState == HIGH && currentState == LOW) {
    delay(50); // 디바운스 대기
    if (digitalRead(SWITCH_PIN) == LOW) {
      // [순환] 다음 색상으로 이동
      colorIndex = (colorIndex + 1) % 3;
      setColor(colorIndex);

      // [비프음] 색상 변경 알림
      tone(2, 1000, 100);
      Serial.print("Color: ");
      Serial.println(colorNames[colorIndex]);
    }
  }

  lastSwitchState = currentState;
  delay(10);
}