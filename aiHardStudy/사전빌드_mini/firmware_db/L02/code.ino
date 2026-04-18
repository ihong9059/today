// [반응속도 테스트] 상태 머신 정의
enum State { IDLE, WAITING, READY };
State gameState = IDLE;

unsigned long signalTime  = 0;
unsigned long waitStart   = 0;
unsigned long waitDuration = 0;

// [결과 표시] OLED + BLE 출력
void showResult(unsigned long ms) {
  oled.clear();
  oled.drawString(0, 0, "Reaction Time:");

  char buf[24];
  snprintf(buf, sizeof(buf), "%lu ms", ms);
  oled.drawString(20, 20, buf);

  const char* grade;
  if      (ms < 200) grade = "Excellent!";
  else if (ms < 300) grade = "Good!";
  else if (ms < 500) grade = "Normal";
  else               grade = "Too slow...";
  oled.drawString(10, 42, grade);
  oled.display();

  // [BLE 전송] 결과 알림
  if (deviceConnected && sensorChar) {
    char msg[48];
    snprintf(msg, sizeof(msg), "RT:%lums %s", ms, grade);
    std::string s(msg);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [화면] 대기 안내 출력
void showIdle() {
  oled.clear();
  oled.drawString(10, 0,  "Reaction Test");
  oled.drawString(5,  25, "Press SW to");
  oled.drawString(20, 42, "START");
  oled.display();
  // [LED] 파란색 - 대기 중
  pixel.setPixelColor(0, pixel.Color(0, 0, 60));
  pixel.show();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  randomSeed(esp_random()); // [랜덤 시드] 하드웨어 엔트로피 사용
  showIdle();
  gameState = IDLE;
}

void loop() {
  static bool lastBtn = HIGH;
  bool btnNow     = digitalRead(SWITCH_PIN);
  bool btnPressed = (lastBtn == HIGH && btnNow == LOW); // [버튼] 엣지 감지
  lastBtn = btnNow;

  switch (gameState) {

    // ── 대기 ────────────────────────────────────────────
    case IDLE:
      if (btnPressed) {
        waitDuration = random(1500, 5000); // [랜덤] 1.5~5초 대기
        waitStart    = millis();

        // [LED] 빨간색 - 준비 중
        pixel.setPixelColor(0, pixel.Color(255, 0, 0));
        pixel.show();

        oled.clear();
        oled.drawString(15, 20, "Get ready...");
        oled.display();

        gameState = WAITING;
      }
      break;

    // ── 랜덤 대기 ───────────────────────────────────────
    case WAITING:
      if (btnPressed) {
        // [부정 출발] 신호 전 누름 패널티
        tone(2, 220, 600);
        pixel.setPixelColor(0, pixel.Color(255, 50, 0));
        pixel.show();

        oled.clear();
        oled.drawString(20, 15, "Too early!");
        oled.drawString(5,  38, "Press to retry");
        oled.display();

        delay(1500);
        showIdle();
        gameState = IDLE;

      } else if (millis() - waitStart >= waitDuration) {
        // [신호!] LED 초록으로 변경
        pixel.setPixelColor(0, pixel.Color(0, 255, 0));
        pixel.show();
        tone(2, 1200, 80); // 짧은 신호음

        signalTime = millis();

        oled.clear();
        oled.drawString(15, 20, "NOW! Press!");
        oled.display();

        gameState = READY;
      }
      break;

    // ── 반응 측정 ───────────────────────────────────────
    case READY:
      if (btnPressed) {
        unsigned long rt = millis() - signalTime; // [측정] 반응 시간

        // [LED] 흰색 - 성공
        pixel.setPixelColor(0, pixel.Color(120, 120, 120));
        pixel.show();
        tone(2, 1800, 120);

        showResult(rt);
        Serial.printf("[반응속도] %lu ms\n", rt);

        delay(3000);
        showIdle();
        gameState = IDLE;

      } else if (millis() - signalTime > 3000) {
        // [시간 초과] 3초 내 미반응
        tone(2, 300, 500);
        pixel.setPixelColor(0, pixel.Color(80, 0, 80));
        pixel.show();

        oled.clear();
        oled.drawString(15, 15, "Time out!");
        oled.drawString(5,  38, "Press to retry");
        oled.display();

        delay(1500);
        showIdle();
        gameState = IDLE;
      }
      break;
  }

  delay(10); // [루프] CPU 점유 방지
}