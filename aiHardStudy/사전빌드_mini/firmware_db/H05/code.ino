// [신호등] 현재 신호 상태 정의
enum TrafficState { RED, YELLOW, GREEN };
TrafficState currentState = RED;
unsigned long stateStart = 0;

// [신호등] 각 상태 지속 시간 (ms)
const unsigned long RED_DURATION    = 3000;
const unsigned long YELLOW_DURATION = 1000;
const unsigned long GREEN_DURATION  = 3000;

void setup() {
  Serial.begin(115200);
  initHardware();   // 하드웨어 초기화
  initBLE();        // BLE OTA 초기화

  // [신호등] 첫 상태: 빨강
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
  stateStart = millis();
}

void loop() {
  unsigned long now = millis();
  unsigned long elapsed = now - stateStart;

  switch (currentState) {

    case RED:
      // [빨강] 3초 후 노랑으로 전환
      if (elapsed >= RED_DURATION) {
        currentState = YELLOW;
        stateStart = now;
        pixel.setPixelColor(0, pixel.Color(255, 255, 0)); // 노랑
        pixel.show();
      }
      break;

    case YELLOW:
      // [노랑] 1초 후 초록으로 전환
      if (elapsed >= YELLOW_DURATION) {
        currentState = GREEN;
        stateStart = now;
        pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // 초록
        pixel.show();
        tone(2, 1000, 200); // [비프음] 초록 진입 시 삑 소리
      }
      break;

    case GREEN:
      // [초록] 3초 후 빨강으로 전환
      if (elapsed >= GREEN_DURATION) {
        currentState = RED;
        stateStart = now;
        pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨강
        pixel.show();
      }
      break;
  }

  delay(10);
}