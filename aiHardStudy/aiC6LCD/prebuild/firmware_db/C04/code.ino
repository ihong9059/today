// [SOS] 모스 부호 타이밍 상수
#define DOT_MS    200
#define DASH_MS   600
#define SYM_GAP   200
#define LETTER_GAP 600
#define SOS_GAP   2000

// [SOS] 모스 부호 dot (짧은 점)
void morseDot() {
  setColor(255, 0, 0);
  delay(DOT_MS);
  ledOff();
  delay(SYM_GAP);
}

// [SOS] 모스 부호 dash (긴 선)
void morseDash() {
  setColor(255, 0, 0);
  delay(DASH_MS);
  ledOff();
  delay(SYM_GAP);
}

// [SOS] S = dot dot dot
void morseS() {
  morseDot(); morseDot(); morseDot();
}

// [SOS] O = dash dash dash
void morseO() {
  morseDash(); morseDash(); morseDash();
}

// [SOS] SOS 한 사이클 전송
void sendSOS() {
  morseS();
  delay(LETTER_GAP);
  morseO();
  delay(LETTER_GAP);
  morseS();
  delay(SOS_GAP);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LCD] SOS 안내 화면 출력
  lcdClear();
  lcd.fillRect(0, 0, 172, 50, C_RED);
  lcdText(30, 12, "SOS SIGNAL", C_TEXT, 2);
  lcdText(10, 70, "... --- ...", C_RED, 2);
  lcdText(10, 100, "S  =  ...", C_YELLOW, 2);
  lcdText(10, 130, "O  =  ---", C_YELLOW, 2);
  lcdText(10, 160, "S  =  ...", C_YELLOW, 2);
  lcdText(10, 210, "RGB LED RED", C_GRAY, 2);
  lcdText(10, 240, "반복 송출중...", C_CYAN, 2);
}

void loop() {
  sendSOS();
}