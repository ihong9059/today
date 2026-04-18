// [색상] 순환할 색상 배열
uint32_t colors[] = {
  pixel.Color(255, 0, 0),    // 빨강
  pixel.Color(0, 255, 0),    // 초록
  pixel.Color(0, 0, 255),    // 파랑
  pixel.Color(255, 255, 0),  // 노랑
  pixel.Color(255, 0, 255),  // 보라
  pixel.Color(0, 255, 255),  // 하늘
  pixel.Color(255, 255, 255) // 흰색
};
const int COLOR_COUNT = 7;
int colorIndex = 0;
bool ledOn = true;

// [스위치] 이전 상태 및 누른 시간
bool prevPressed = false;
unsigned long pressStart = 0;
bool longHandled = false;

// [LED] 현재 색상 표시
void showColor() {
  if (ledOn) {
    pixel.setPixelColor(0, colors[colorIndex]);
  } else {
    pixel.setPixelColor(0, pixel.Color(0, 0, 0));
  }
  pixel.show();
}

// [OLED] 상태 출력
void updateOled() {
  oled.clear();
  if (ledOn) {
    oled.drawString(0, 0, "LED ON");
    char buf[16];
    snprintf(buf, sizeof(buf), "Color: %d/%d", colorIndex + 1, COLOR_COUNT);
    oled.drawString(0, 16, buf);
  } else {
    oled.drawString(0, 0, "LED OFF");
  }
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀, OLED, WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [초기] 첫 번째 색상 표시
  showColor();
  updateOled();
}

void loop() {
  bool pressed = (digitalRead(SWITCH_PIN) == LOW); // 액티브 로우

  if (pressed && !prevPressed) {
    // [스위치] 누르기 시작
    pressStart = millis();
    longHandled = false;
  }

  if (pressed && !longHandled) {
    // [롱프레스] 2초 이상 누르면 LED 끄기
    if (millis() - pressStart >= 2000) {
      ledOn = false;
      showColor();
      updateOled();
      tone(2, 300, 200); // 낮은 비프음
      longHandled = true;
    }
  }

  if (!pressed && prevPressed) {
    // [릴리즈] 버튼 떼는 순간
    unsigned long duration = millis() - pressStart;
    if (!longHandled && duration < 2000) {
      // [숏프레스] 색상 변경 또는 LED 다시 켜기
      if (!ledOn) {
        ledOn = true; // 꺼져 있으면 다시 켜기
      } else {
        colorIndex = (colorIndex + 1) % COLOR_COUNT; // 다음 색상
      }
      showColor();
      updateOled();
      tone(2, 1000, 100); // 짧은 비프음
    }
  }

  prevPressed = pressed;
  delay(20); // 디바운스
}