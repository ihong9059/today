// [전역] 현재 LED 상태 인덱스
int ledIndex = 0;
bool lastSwitchState = HIGH;

// [LED] 모든 LED 끄기
void allLedsOff() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE, HIGH);
}

// [LED] 인덱스에 따라 LED 켜기
void setLed(int idx) {
  allLedsOff();
  if (idx == 0) digitalWrite(LED_RED, LOW);
  else if (idx == 1) digitalWrite(LED_YELLOW, LOW);
  else if (idx == 2) digitalWrite(LED_BLUE, LOW);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [스위치] 입력 핀 설정
  pinMode(32, INPUT_PULLUP);

  // [초기화] 빨간 LED로 시작
  setLed(ledIndex);
}

void loop() {
  // [스위치] 현재 상태 읽기
  bool currentState = digitalRead(32);

  // [감지] 눌림 감지 (HIGH→LOW 엣지)
  if (lastSwitchState == HIGH && currentState == LOW) {
    ledIndex = (ledIndex + 1) % 3;
    setLed(ledIndex);
    Serial.println(ledIndex == 0 ? "RED" : ledIndex == 1 ? "YELLOW" : "BLUE");
    delay(50); // [디바운스] 채터링 방지
  }

  lastSwitchState = currentState;
  delay(10000);
}