// [라면타이머] 3분 카운트다운 + 완료 시 멜로디/LED

// 멜로디 음계 정의
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
int melodyLen = 8;

// 완료 멜로디 재생 함수
void playFinishMelody() {
  // [멜로디] 완료 알림음 재생
  int notes[] = {523, 523, 523, 659, 523, 659, 784};
  int durs[]  = {200, 200, 200, 400, 200, 400, 600};
  for (int i = 0; i < 7; i++) {
    tone(2, notes[i], durs[i]);
    delay(durs[i] + 50);
    noTone(2);
  }
}

// LED 축하 효과
void celebrateLED() {
  // [LED] 빨강/초록 번갈아 깜빡이기
  for (int i = 0; i < 10; i++) {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show();
    delay(150);
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
    pixel.show();
    delay(150);
  }
  pixel.setPixelColor(0, pixel.Color(255, 255, 0)); // 노란색 유지
  pixel.show();
}

// OLED에 남은 시간 표시
void showTime(int remaining) {
  int m = remaining / 60;
  int s = remaining % 60;
  char buf[16];
  snprintf(buf, sizeof(buf), "%d:%02d", m, s);

  oled.clear();
  oled.drawString(10, 0, "라면 타이머");
  oled.drawString(30, 20, buf);          // 중앙에 큰 시간 표시
  oled.drawString(5, 45, "눌러서 시작");
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀/OLED/WS2812 초기화
  initBLE();        // BLE OTA 초기화

  // [초기화] 대기 화면 표시
  oled.clear();
  oled.drawString(10, 0, "라면 타이머");
  oled.drawString(5, 20, "스위치를 눌러");
  oled.drawString(10, 35, "시작하세요!");
  oled.display();

  // [LED] 대기 중 파란색
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();

  Serial.println("라면 타이머 준비 완료");
}

void loop() {
  // [스위치] 버튼 누름 감지 (active LOW)
  if (digitalRead(SWITCH_PIN) == LOW) {
    delay(50); // 디바운싱
    if (digitalRead(SWITCH_PIN) == LOW) {

      // [알림음] 시작 비프
      tone(2, 1000, 200);
      delay(300);
      noTone(2);

      // [LED] 카운트다운 중 초록색
      pixel.setPixelColor(0, pixel.Color(0, 200, 0));
      pixel.show();

      // [카운트다운] 3분 = 180초
      int total = 180;
      for (int i = total; i >= 0; i--) {
        // OLED 시간 표시
        int m = i / 60;
        int s = i % 60;
        char buf[16];
        snprintf(buf, sizeof(buf), "%d:%02d", m, s);

        oled.clear();
        oled.drawString(10, 0, "라면 타이머");
        oled.drawString(30, 20, buf);

        // 10초 이하면 경고 표시
        if (i <= 10 && i > 0) {
          oled.drawString(15, 40, "거의 다 됐어요!");
          // [LED] 10초 이하 빨간색
          pixel.setPixelColor(0, pixel.Color(255, 0, 0));
          pixel.show();
          // [비프] 매 초 경고음
          tone(2, 880, 100);
          delay(100);
          noTone(2);
        }

        oled.display();

        if (i == 0) break;
        delay(1000); // 1초 대기
      }

      // [완료] OLED 완료 메시지
      oled.clear();
      oled.drawString(20, 10, "완료!");
      oled.drawString(5, 30, "라면이 됐어요!");
      oled.display();

      // [멜로디] 완료 알림 멜로디 재생
      playFinishMelody();

      // [LED] 축하 LED 효과
      celebrateLED();

      // [대기] 버튼 뗄 때까지 대기
      while (digitalRead(SWITCH_PIN) == LOW) delay(10);

      // [초기화] 대기 화면으로 복귀
      oled.clear();
      oled.drawString(10, 0, "라면 타이머");
      oled.drawString(5, 20, "스위치를 눌러");
      oled.drawString(10, 35, "시작하세요!");
      oled.display();

      // [LED] 대기 중 파란색으로 복귀
      pixel.setPixelColor(0, pixel.Color(0, 0, 255));
      pixel.show();
    }
  }

  delay(10000);
}