// [스톱워치] 버튼으로 시작/정지
unsigned long startTime = 0;
unsigned long elapsed = 0;
bool running = false;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Stopwatch", C_CYAN, 2);
  lcdText(10, 250, "BTN: Start/Stop", C_GRAY, 1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    if (!running) {
      running = true;
      startTime = millis() - elapsed;
      setColor(0, 255, 0);
    } else {
      running = false;
      elapsed = millis() - startTime;
      setColor(255, 0, 0);
    }
  }
  lastBtn = btn;
  unsigned long t = running ? (millis() - startTime) : elapsed;
  int m = (t / 60000) % 60;
  int s = (t / 1000) % 60;
  int ms = (t % 1000) / 10;
  char buf[16];
  snprintf(buf, sizeof(buf), "%02d:%02d.%02d", m, s, ms);
  lcd.fillRect(0, 80, 172, 60, C_BG);
  lcdText(5, 90, buf, running ? C_GREEN : C_RED, 4);
  lcdText(40, 160, running ? "RUNNING" : "STOPPED", running ? C_GREEN : C_RED, 2);
  delay(30);
}
