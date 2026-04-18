// [SOS] 모스부호 도트(·)와 대시(−) 정의
#define DOT_FREQ   1000
#define DOT_DUR    150
#define DASH_DUR   450
#define GAP        150   // 신호 간 간격
#define LETTER_GAP 400   // 글자 간 간격
#define SOS_REPEAT 3000  // 반복 대기

void dot() {
  tone(2, DOT_FREQ, DOT_DUR);
  delay(DOT_DUR + GAP);
}

void dash() {
  tone(2, DOT_FREQ, DASH_DUR);
  delay(DASH_DUR + GAP);
}

void playSOS() {
  // [S] 짧은 소리 3번
  dot(); dot(); dot();
  delay(LETTER_GAP);

  // [O] 긴 소리 3번
  dash(); dash(); dash();
  delay(LETTER_GAP);

  // [S] 짧은 소리 3번
  dot(); dot(); dot();
  delay(LETTER_GAP);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] SOS 표시
  oled.clear();
  oled.drawString(30, 10, "SOS");
  oled.drawString(10, 30, "... --- ...");
  oled.display();

  // [LED] 빨간색으로 경고 표시
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();
}

void loop() {
  playSOS();
  noTone(2);

  // [LED] 점멸 효과
  pixel.clear();
  pixel.show();
  delay(500);
  pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  pixel.show();

  delay(SOS_REPEAT);
}