// [전역] 현재 켜진 LED 상태 (0=없음, 1=RED, 2=YELLOW, 3=BLUE)
volatile int currentLedState = 0;

// [배열] LED 핀 및 이름 매핑
const int ledPins[] = {-1, LED_RED, LED_YELLOW, LED_BLUE};
const char* ledNames[] = {"NONE", "RED", "YELLOW", "BLUE"};

// [OLED] 현재 LED 이름 화면 출력
void showLedName(const char* name) {
  oled.clear();
  oled.drawString(0, 0, "[ LED STATUS ]");
  oled.drawString(0, 20, "ON:");
  oled.drawString(30, 20, name);
  oled.display();
}

// [태스크] LED 순환 및 OLED 업데이트
void ledCycleTask(void* param) {
  int state = 1; // RED 부터 시작
  while (true) {
    // 모든 LED 끄기 (active LOW → HIGH=OFF)
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);

    // 현재 LED 켜기 (LOW=ON)
    digitalWrite(ledPins[state], LOW);
    currentLedState = state;

    // OLED에 현재 LED 이름 표시
    showLedName(ledNames[state]);

    Serial.print("[LED] ON: ");
    Serial.println(ledNames[state]);

    delay(1500); // 1.5초마다 전환

    state = (state % 3) + 1; // 1→2→3→1 순환
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 초기화 및 OLED init 포함
  initBLE();       // BLE OTA 초기화

  // [OLED] 시작 화면
  oled.clear();
  oled.drawString(0, 0, "LED Monitor");
  oled.drawString(0, 16, "Starting...");
  oled.display();
  delay(800);

  // [태스크] LED 순환 태스크 시작
  xTaskCreate(ledCycleTask, "ledCycle", 2048, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}