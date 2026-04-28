// [반응속도] 색상 변화에 반응하는 게임
enum State { WAIT, READY, GO, RESULT };
State state = WAIT;
unsigned long goTime = 0, nextTime = 0;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Reaction!", C_CYAN, 3);
  lcdText(10, 60, "Press button", C_TEXT, 2);
  lcdText(10, 85, "to start", C_TEXT, 2);
  state = WAIT;
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  bool pressed = (btn && lastBtn == HIGH);
  lastBtn = btn ? LOW : HIGH;
  switch (state) {
    case WAIT:
      if (pressed) {
        state = READY;
        nextTime = millis() + random(2000, 5000);
        lcdClear();
        lcdText(10, 100, "Wait...", C_YELLOW, 3);
        setColor(255, 0, 0);
      }
      break;
    case READY:
      if (pressed) {
        lcdClear();
        lcdText(10, 100, "Too early!", C_RED, 3);
        state = WAIT;
        delay(1500);
        lcdClear();
        lcdText(10, 60, "Press button", C_TEXT, 2);
      } else if (millis() >= nextTime) {
        state = GO;
        goTime = millis();
        lcd.fillScreen(C_GREEN);
        lcdText(10, 100, "NOW!", C_BG, 4);
        setColor(0, 255, 0);
      }
      break;
    case GO:
      if (pressed) {
        unsigned long react = millis() - goTime;
        lcdClear();
        char buf[32];
        snprintf(buf, sizeof(buf), "%lu ms", react);
        lcdText(10, 60, "Time:", C_TEXT, 2);
        lcdText(10, 100, buf, C_GREEN, 4);
        if (react < 300) lcdText(10, 170, "Amazing!", C_CYAN, 2);
        else if (react < 500) lcdText(10, 170, "Good!", C_YELLOW, 2);
        else lcdText(10, 170, "Try again", C_RED, 2);
        state = RESULT;
      }
      break;
    case RESULT:
      if (pressed) {
        state = WAIT;
        lcdClear();
        lcdText(10, 60, "Press button", C_TEXT, 2);
        ledOff();
      }
      break;
  }
  delay(10);
}
