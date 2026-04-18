// [전역] 스위치 관련 변수
int pressCount = 0;
unsigned long lastPressTime = 0;
unsigned long lastDebounceTime = 0;
bool lastSwitchState = HIGH;
bool switchState = HIGH;
const unsigned long DEBOUNCE_DELAY = 50;
const unsigned long RESET_TIMEOUT = 2000; // 2초 내에 3번 눌러야 함

// [멜로디] 도레미파솔라시도 음계 주파수
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
int noteDurations[] = {200, 200, 200, 200, 200, 200, 200, 400};

// [함수] 멜로디 재생
void playMelody() {
  // [LED] 멜로디 재생 시 초록색
  pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  pixel.show();

  // [OLED] 멜로디 재생 표시
  oled.clear();
  oled.drawString(0, 0, "Playing Melody!");
  oled.display();

  for (int i = 0; i < 8; i++) {
    tone(2, melody[i], noteDurations[i]);
    delay(noteDurations[i] + 30);
    noTone(2);
  }

  // [완료] 재생 후 초기화
  pixel.setPixelColor(0, pixel.Color(0, 0, 0));
  pixel.show();
  oled.clear();
  oled.drawString(0, 0, "Press 3 times");
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "Press 3 times");
  oled.display();
}

void loop() {
  bool reading = digitalRead(SWITCH_PIN);

  // [디바운스] 스위치 상태 안정화
  if (reading != lastSwitchState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY) {
    if (reading != switchState) {
      switchState = reading;

      // [감지] 버튼 눌림 (LOW = 눌림)
      if (switchState == LOW) {
        unsigned long now = millis();

        // [타임아웃] 2초 초과 시 카운트 리셋
        if (now - lastPressTime > RESET_TIMEOUT) {
          pressCount = 0;
        }

        pressCount++;
        lastPressTime = now;

        Serial.print("누른 횟수: ");
        Serial.println(pressCount);

        // [OLED] 현재 카운트 표시
        char buf[20];
        sprintf(buf, "Count: %d/3", pressCount);
        oled.clear();
        oled.drawString(0, 0, buf);
        oled.display();

        // [LED] 파란색 깜빡임으로 누름 확인
        pixel.setPixelColor(0, pixel.Color(0, 0, 255));
        pixel.show();
        delay(100);
        pixel.setPixelColor(0, pixel.Color(0, 0, 0));
        pixel.show();

        // [조건] 3번 눌리면 멜로디 재생
        if (pressCount >= 3) {
          pressCount = 0;
          playMelody();
        }
      }
    }
  }

  lastSwitchState = reading;
  delay(10);
}