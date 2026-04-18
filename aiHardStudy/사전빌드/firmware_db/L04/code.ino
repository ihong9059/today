// [변수] 스위치 상태 추적
int pressCount = 0;
bool lastState = HIGH;
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_MS = 50;

// [멜로디] 도레미파솔라시도 음계
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
int noteDur[] = {300, 300, 300, 300, 300, 300, 300, 500};

// [함수] 멜로디 재생
void playMelody() {
  for (int i = 0; i < 8; i++) {
    tone(33, melody[i], noteDur[i]);
    delay(noteDur[i] + 50);
  }
  noTone(33);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  bool currentState = digitalRead(32);

  // [디바운스] 짧은 노이즈 무시
  if (currentState != lastState) {
    if (millis() - lastDebounce > DEBOUNCE_MS) {
      lastDebounce = millis();

      // [카운트] 버튼 눌림(LOW) 감지
      if (currentState == LOW) {
        pressCount++;
        Serial.print("눌림 횟수: ");
        Serial.println(pressCount);

        // [멜로디] 3번 누르면 재생 후 초기화
        if (pressCount >= 3) {
          pressCount = 0;
          playMelody();
        }
      }

      lastState = currentState;
    }
  } else {
    lastDebounce = millis();
  }

  delay(10);
}