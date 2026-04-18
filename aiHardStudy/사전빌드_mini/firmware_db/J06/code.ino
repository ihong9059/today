// [더블클릭] 클릭 감지 변수
unsigned long lastPressTime = 0;
int clickCount = 0;
bool waitingForSecond = false;
const unsigned long DOUBLE_CLICK_WINDOW = 400; // 더블클릭 인정 시간(ms)
bool lastButtonState = HIGH;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기] LED 끄기
  pixel.clear();
  pixel.show();
}

void loop() {
  bool currentState = digitalRead(SWITCH_PIN);

  // [버튼] 눌림 감지 (HIGH→LOW 엣지)
  if (lastButtonState == HIGH && currentState == LOW) {
    unsigned long now = millis();

    if (waitingForSecond && (now - lastPressTime) <= DOUBLE_CLICK_WINDOW) {
      // [더블클릭] 빠르게 2번 → 파랑
      clickCount = 2;
      waitingForSecond = false;
    } else {
      // [첫번째클릭] 두번째 기다리기 시작
      clickCount = 1;
      waitingForSecond = true;
      lastPressTime = now;
    }
  }
  lastButtonState = currentState;

  // [타임아웃] 더블클릭 대기 시간 초과 → 싱글클릭 처리
  if (waitingForSecond && (millis() - lastPressTime) > DOUBLE_CLICK_WINDOW) {
    waitingForSecond = false;
    clickCount = 1; // 싱글클릭 확정
  }

  // [LED] 클릭 결과 적용
  if (clickCount == 1 && !waitingForSecond) {
    // [싱글클릭] 빨강
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show();
    tone(2, 1000, 80);
    clickCount = 0;
  } else if (clickCount == 2) {
    // [더블클릭] 파랑
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
    pixel.show();
    tone(2, 2000, 80);
    clickCount = 0;
  }

  delay(10);
}