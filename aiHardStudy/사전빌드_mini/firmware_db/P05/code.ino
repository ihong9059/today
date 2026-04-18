// [룰렛] 색상 배열 정의
struct Color { uint8_t r, g, b; const char* name; };
Color colors[] = {
  {255, 0,   0,   "RED"},
  {0,   255, 0,   "GREEN"},
  {0,   0,   255, "BLUE"},
  {255, 255, 0,   "YELLOW"},
  {255, 0,   255, "PURPLE"},
  {0,   255, 255, "CYAN"},
  {255, 128, 0,   "ORANGE"},
  {255, 255, 255, "WHITE"}
};
const int COLOR_COUNT = 8;

// [상태] 룰렛 동작 플래그
volatile bool spinRequested = false;
bool isSpinning = false;

// [BLE수신] "SPIN" 명령 수신 시 룰렛 시작
void onBleReceive(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd == "SPIN") {
    spinRequested = true;
  }
}

// [룰렛] LED 색상 설정 헬퍼
void setColor(int idx) {
  pixel.setPixelColor(0, pixel.Color(colors[idx].r, colors[idx].g, colors[idx].b));
  pixel.show();
}

// [룰렛] 룰렛 애니메이션 실행 후 결과 전송
void doSpin() {
  isSpinning = true;

  // [효과] 시작 비프
  tone(2, 1000, 80);
  delay(100);

  // [애니메이션] 빠르게 시작해서 점점 느려지는 룰렛
  int totalSteps = 30;
  int idx = 0;
  for (int i = 0; i < totalSteps; i++) {
    idx = (idx + 1) % COLOR_COUNT;
    setColor(idx);

    // [OLED] 현재 색상 표시
    oled.clear();
    oled.drawString(0, 0, "SPINNING...");
    oled.drawString(0, 16, colors[idx].name);
    oled.display();

    // [속도] 초반 빠름 -> 후반 느림
    int delayMs;
    if (i < 10)      delayMs = 60;
    else if (i < 20) delayMs = 120;
    else             delayMs = 200 + (i - 20) * 30;
    delay(delayMs);
  }

  // [결과] 최종 색상 결정 (랜덤)
  int result = random(0, COLOR_COUNT);
  setColor(result);

  // [효과] 결과 도착 효과음
  tone(2, 2000, 100); delay(120);
  tone(2, 2500, 100); delay(120);
  tone(2, 3000, 200); delay(250);
  noTone(2);

  // [OLED] 결과 표시
  oled.clear();
  oled.drawString(0, 0, "RESULT:");
  oled.drawString(0, 16, colors[result].name);
  oled.display();

  // [BLE전송] 결과를 스마트폰으로 전송
  if (deviceConnected && sensorChar) {
    std::string msg = "RESULT:";
    msg += colors[result].name;
    sensorChar->setValue(msg);
    sensorChar->notify();
  }

  // [깜빡임] 결과 LED 3회 깜빡임
  for (int i = 0; i < 3; i++) {
    delay(300);
    pixel.clear(); pixel.show();
    delay(200);
    setColor(result);
  }

  isSpinning = false;
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작 메시지
  oled.clear();
  oled.drawString(0, 0, "LED ROULETTE");
  oled.drawString(0, 16, "Send SPIN");
  oled.display();

  // [LED] 대기 색상 흰색
  pixel.setPixelColor(0, pixel.Color(10, 10, 10));
  pixel.show();

  randomSeed(esp_random());
}

void loop() {
  // [명령처리] SPIN 요청 감지
  if (spinRequested && !isSpinning) {
    spinRequested = false;
    doSpin();
  }
  delay(50);
}