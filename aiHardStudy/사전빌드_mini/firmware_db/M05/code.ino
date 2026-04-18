// [색상] 순환할 색상 배열 정의
struct Color { uint8_t r, g, b; const char* name; };
Color colors[] = {
  {255, 0,   0,   "Red"},
  {0,   255, 0,   "Green"},
  {0,   0,   255, "Blue"},
  {255, 255, 0,   "Yellow"},
  {255, 0,   255, "Magenta"},
  {0,   255, 255, "Cyan"},
  {255, 255, 255, "White"},
  {0,   0,   0,   "Off"}
};
const int COLOR_COUNT = 8;
int colorIndex = 0;

// [BLE/OLED] 색상 정보 전송 및 표시
void sendColorInfo(int idx) {
  Color& c = colors[idx];

  // OLED 표시
  oled.clear();
  oled.drawString(0, 0, "Color:");
  oled.drawString(0, 16, c.name);

  char rgbStr[32];
  snprintf(rgbStr, sizeof(rgbStr), "R:%d G:%d B:%d", c.r, c.g, c.b);
  oled.drawString(0, 32, rgbStr);
  oled.display();

  // BLE 전송
  if (deviceConnected && sensorChar) {
    char msg[64];
    snprintf(msg, sizeof(msg), "COLOR:%s R:%d G:%d B:%d", c.name, c.r, c.g, c.b);
    std::string s(msg);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [LED] 현재 색상 적용
void applyColor(int idx) {
  Color& c = colors[idx];
  pixel.setPixelColor(0, pixel.Color(c.r, c.g, c.b));
  pixel.show();
}

// [BLE수신] BLE에서 색상 인덱스 또는 이름 수신
void onBleReceive(String cmd) {
  cmd.trim();

  // "NEXT" 명령으로 다음 색상으로 이동
  if (cmd.equalsIgnoreCase("NEXT")) {
    colorIndex = (colorIndex + 1) % COLOR_COUNT;
    applyColor(colorIndex);
    sendColorInfo(colorIndex);
    return;
  }

  // "COLOR:이름" 형식으로 특정 색상 지정
  if (cmd.startsWith("COLOR:")) {
    String name = cmd.substring(6);
    name.trim();
    for (int i = 0; i < COLOR_COUNT; i++) {
      if (name.equalsIgnoreCase(colors[i].name)) {
        colorIndex = i;
        applyColor(colorIndex);
        sendColorInfo(colorIndex);
        return;
      }
    }
  }
}

// [스위치] 버튼 상태 관리
bool lastSwitchState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 첫 번째 색상 적용 및 표시
  applyColor(colorIndex);
  sendColorInfo(colorIndex);
}

void loop() {
  // [스위치] 버튼 눌림 감지 시 다음 색상으로 전환
  bool switchState = digitalRead(SWITCH_PIN);
  if (switchState == LOW && lastSwitchState == HIGH) {
    delay(50); // 디바운스
    colorIndex = (colorIndex + 1) % COLOR_COUNT;
    applyColor(colorIndex);
    sendColorInfo(colorIndex);

    // [사운드] 색상 변경 확인음
    tone(2, 1000, 80);
  }
  lastSwitchState = switchState;

  delay(10);
}