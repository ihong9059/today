// [스톱워치] 상태 열거형
enum SwState { IDLE, RUNNING, STOPPED };

volatile SwState swState = IDLE;
volatile unsigned long startTime = 0;
volatile unsigned long elapsed = 0; // 누적 경과(ms)

bool lastBtn = HIGH;
unsigned long lastDebounce = 0;
const unsigned long DEBOUNCE_MS = 50;

// [디스플레이] 0.1초마다 OLED 갱신 태스크
void displayTask(void* param) {
  while (true) {
    unsigned long ms = (swState == RUNNING) ? (millis() - startTime + elapsed) : elapsed;
    unsigned long s  = ms / 1000;
    unsigned long m  = s / 60;
    s = s % 60;
    unsigned long t  = (ms % 1000) / 100; // 0.1초 단위

    char timeBuf[12];
    snprintf(timeBuf, sizeof(timeBuf), "%02lu:%02lu.%lu", m, s, t);

    const char* status;
    if      (swState == RUNNING) status = "RUNNING";
    else if (swState == STOPPED) status = "STOPPED";
    else                          status = "  READY";

    oled.clear();
    oled.drawString(0, 0,  status);
    oled.drawString(10, 24, timeBuf); // 큰 시간 표시 위치
    oled.display();

    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [LED] 초기 대기 상태 — 흰색 희미
  pixel.setPixelColor(0, pixel.Color(10, 10, 10));
  pixel.show();

  // [디스플레이 태스크] 백그라운드 실행
  xTaskCreate(displayTask, "disp", 2048, NULL, 1, NULL);
}

void loop() {
  bool btn = digitalRead(SWITCH_PIN); // INPUT_PULLUP, 눌리면 LOW

  // [버튼] 하강 에지 감지 + 디바운스
  if (btn == LOW && lastBtn == HIGH &&
      millis() - lastDebounce > DEBOUNCE_MS) {
    lastDebounce = millis();

    if (swState == IDLE) {
      // [1번 누름] 시작
      startTime = millis();
      swState   = RUNNING;
      pixel.setPixelColor(0, pixel.Color(0, 200, 0)); // 초록
      pixel.show();
      tone(2, 1000, 80);

    } else if (swState == RUNNING) {
      // [2번 누름] 정지
      elapsed  += millis() - startTime;
      swState   = STOPPED;
      pixel.setPixelColor(0, pixel.Color(200, 0, 0)); // 빨강
      pixel.show();
      tone(2, 600, 80);

    } else if (swState == STOPPED) {
      // [3번 누름] 리셋
      elapsed = 0;
      swState = IDLE;
      pixel.setPixelColor(0, pixel.Color(10, 10, 10)); // 흰색 희미
      pixel.show();
      tone(2, 300, 150);
    }
  }

  lastBtn = btn;
  delay(10);
}