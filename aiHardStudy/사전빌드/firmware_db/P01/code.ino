// [모드] 현재 동작 모드 (1=LED깜빡, 2=멜로디, 3=온도)
int currentMode = 1;
bool lastBtnState = HIGH;
unsigned long lastDebounce = 0;
TaskHandle_t ledTaskHandle = NULL;

// [온도] 갱신 타이머
unsigned long lastTempUpdate = 0;

// [멜로디] 음계 및 박자 배열
int melNotes[]    = {262, 294, 330, 349, 392, 440, 494, 523};
int melDurs[]     = {300, 300, 300, 300, 300, 300, 300, 500};
int melIdx = 0;
unsigned long melNextTime = 0;

// [LED] 순차 깜빡 태스크
void ledBlinkTask(void* param) {
  while (true) {
    digitalWrite(LED_RED,    LOW);  delay(250);
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, LOW);  delay(250);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   LOW);  delay(250);
    digitalWrite(LED_BLUE,   HIGH); delay(250);
  }
}

// [LED정지] 모든 LED 끄기
void allLedOff() {
  digitalWrite(LED_RED,    HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE,   HIGH);
}

// [온도] AHT20 읽어 OLED 출력
void showTemperature() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);
  oled.clear();
  oled.drawString(0,  0, "[ Mode 3: Temp ]");
  if (ok) {
    oled.drawString(0, 20, ("Temp: " + String(temp, 1) + " C").c_str());
    oled.drawString(0, 36, ("Humi: " + String(humi, 1) + " %").c_str());
  } else {
    oled.drawString(0, 20, "Sensor Error");
  }
  oled.display();
}

// [모드변경] 이전 모드 정리 후 새 모드 시작
void changeMode(int newMode) {
  // 기존 LED 태스크 종료
  if (ledTaskHandle != NULL) {
    vTaskDelete(ledTaskHandle);
    ledTaskHandle = NULL;
    allLedOff();
  }
  noTone(33); // 멜로디 중지

  currentMode = newMode;

  // OLED 모드 안내
  oled.clear();
  if (newMode == 1) oled.drawString(0, 0, "Mode 1: LED Blink");
  if (newMode == 2) oled.drawString(0, 0, "Mode 2: Melody");
  if (newMode == 3) oled.drawString(0, 0, "Mode 3: Temp");
  oled.display();

  if (newMode == 1) {
    // [LED] 깜빡 태스크 생성
    xTaskCreate(ledBlinkTask, "ledBlink", 2048, NULL, 1, &ledTaskHandle);
  }
  if (newMode == 2) {
    // [멜로디] 처음부터 재생
    melIdx = 0;
    melNextTime = millis();
  }
  if (newMode == 3) {
    // [온도] 즉시 갱신
    lastTempUpdate = 0;
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  pinMode(32, INPUT_PULLUP); // [스위치] 모드 전환 버튼

  changeMode(1); // [초기] 모드 1 시작
}

void loop() {
  // [버튼] 디바운스 + 모드 순환 (1→2→3→1)
  bool btnState = digitalRead(32);
  if (btnState == LOW && lastBtnState == HIGH) {
    if (millis() - lastDebounce > 200) {
      lastDebounce = millis();
      changeMode((currentMode % 3) + 1);
    }
  }
  lastBtnState = btnState;

  // [멜로디] 모드 2: 논블로킹 음계 재생
  if (currentMode == 2 && millis() >= melNextTime) {
    tone(33, melNotes[melIdx], melDurs[melIdx]);
    melNextTime = millis() + melDurs[melIdx] + 60;
    melIdx = (melIdx + 1) % 8;
  }

  // [온도] 모드 3: 2초마다 갱신
  if (currentMode == 3 && millis() - lastTempUpdate > 2000) {
    lastTempUpdate = millis();
    showTemperature();
  }

  delay(10);
}