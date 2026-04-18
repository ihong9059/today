// [룰렛] 무지개 색상 배열
uint32_t colors[] = {
  pixel.Color(255, 0, 0),    // 빨강
  pixel.Color(255, 127, 0),  // 주황
  pixel.Color(255, 255, 0),  // 노랑
  pixel.Color(0, 255, 0),    // 초록
  pixel.Color(0, 0, 255),    // 파랑
  pixel.Color(75, 0, 130),   // 남색
  pixel.Color(148, 0, 211)   // 보라
};
const int COLOR_COUNT = 7;

// [룰렛] 현재 색상 인덱스와 딜레이
int colorIndex = 0;
int spinDelay = 50;      // 시작 딜레이 (ms)
int maxDelay = 600;      // 최대 딜레이 (멈추기 직전)
bool rouletteRunning = false;

void startRoulette() {
  // [룰렛] 룰렛 시작 신호음
  tone(2, 1000, 100);
  delay(120);

  colorIndex = 0;
  spinDelay = 50;
  rouletteRunning = true;

  // [룰렛] 빠른 구간: 고정 딜레이로 빠르게 순환
  int fastRounds = 21; // 약 3바퀴
  for (int i = 0; i < fastRounds; i++) {
    pixel.setPixelColor(0, colors[colorIndex % COLOR_COUNT]);
    pixel.show();
    colorIndex++;
    delay(spinDelay);
  }

  // [룰렛] 감속 구간: 딜레이를 점점 늘려 느려지게
  int cur = spinDelay;
  while (cur < maxDelay) {
    pixel.setPixelColor(0, colors[colorIndex % COLOR_COUNT]);
    pixel.show();
    colorIndex++;
    delay(cur);
    cur = (int)(cur * 1.18f); // 18%씩 증가
  }

  // [룰렛] 최종 결과 색상 고정
  int finalIndex = colorIndex % COLOR_COUNT;
  pixel.setPixelColor(0, colors[finalIndex]);
  pixel.show();

  // [룰렛] 결과 OLED 표시
  const char* colorNames[] = {"Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"};
  oled.clear();
  oled.drawString(0, 0, "== ROULETTE ==");
  oled.drawString(0, 20, "Result:");
  oled.drawString(0, 36, colorNames[finalIndex]);
  oled.display();

  // [룰렛] 결과 확정음
  tone(2, 523, 150); delay(160);
  tone(2, 659, 150); delay(160);
  tone(2, 784, 300); delay(310);

  rouletteRunning = false;
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작 화면 표시
  oled.clear();
  oled.drawString(0, 0, "ROULETTE");
  oled.drawString(0, 20, "Press button");
  oled.drawString(0, 36, "to spin!");
  oled.display();

  pixel.clear();
  pixel.show();
}

void loop() {
  // [버튼] 스위치 누르면 룰렛 실행
  if (digitalRead(SWITCH_PIN) == LOW && !rouletteRunning) {
    delay(30); // 디바운스
    if (digitalRead(SWITCH_PIN) == LOW) {
      oled.clear();
      oled.drawString(0, 0, "Spinning...");
      oled.display();
      startRoulette();
    }
  }
  delay(50);
}

// [BLE] 원격 명령으로 룰렛 실행
void onBleReceive(String cmd) {
  if (cmd == "spin" && !rouletteRunning) {
    oled.clear();
    oled.drawString(0, 0, "BLE Spin!");
    oled.display();
    startRoulette();
  }
}