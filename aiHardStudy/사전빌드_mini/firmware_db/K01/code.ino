// [색상] LED 색상 목록 정의
struct ColorEntry {
  const char* name;
  uint8_t r, g, b;
};

ColorEntry colors[] = {
  {"Red",     255,   0,   0},
  {"Green",     0, 255,   0},
  {"Blue",      0,   0, 255},
  {"Yellow",  255, 255,   0},
  {"Cyan",      0, 255, 255},
  {"Magenta", 255,   0, 255},
  {"White",   255, 255, 255},
  {"Off",       0,   0,   0},
};

int colorIndex = 0; // 현재 색상 인덱스
const int COLOR_COUNT = 8;

// [OLED] 현재 색상 이름 표시
void showColorName(const char* name) {
  oled.clear();
  oled.drawString(0, 0, "LED Color:");
  oled.drawString(0, 16, name);
  oled.display();
}

// [LED] 색상 설정 및 화면 갱신
void applyColor(int idx) {
  pixel.setPixelColor(0, pixel.Color(colors[idx].r, colors[idx].g, colors[idx].b));
  pixel.show();
  showColorName(colors[idx].name);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  applyColor(colorIndex); // 초기 색상 표시
}

void loop() {
  // [스위치] 버튼 누르면 다음 색상으로 전환
  static bool lastState = HIGH;
  bool curState = digitalRead(SWITCH_PIN);

  if (lastState == HIGH && curState == LOW) {
    colorIndex = (colorIndex + 1) % COLOR_COUNT;
    applyColor(colorIndex);
    tone(2, 1000, 80); // 전환 효과음
    delay(200); // 디바운스
  }
  lastState = curState;

  delay(10);
}