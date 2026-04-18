const char* menuItems[] = {
  "1. LED 제어",
  "2. 온도 측정",
  "3. 소리 재생",
  "4. 시스템 정보"
};
const int MENU_COUNT = 4;
int currentMenu = 0;

// [스위치] 디바운스용 변수
int lastSwitchState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long DEBOUNCE_DELAY = 50;

// [OLED] 메뉴 화면 출력
void drawMenu() {
  oled.clear();
  oled.drawString(0, 0, "=== MENU ===");
  for (int i = 0; i < MENU_COUNT; i++) {
    if (i == currentMenu) {
      // [선택] 현재 항목에 화살표 표시
      oled.drawString(0, 16 + i * 12, ">");
      oled.drawString(10, 16 + i * 12, menuItems[i]);
    } else {
      oled.drawString(10, 16 + i * 12, menuItems[i]);
    }
  }
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 첫 메뉴 화면 표시
  drawMenu();
}

void loop() {
  // [스위치] 현재 버튼 상태 읽기
  int reading = digitalRead(32);

  if (reading != lastSwitchState) {
    lastDebounceTime = millis();
  }

  // [디바운스] 안정화 후 처리
  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY) {
    // [눌림] LOW = 눌린 상태 (active LOW)
    if (reading == LOW && lastSwitchState == HIGH) {
      // [이동] 다음 메뉴 항목으로 순환
      currentMenu = (currentMenu + 1) % MENU_COUNT;
      Serial.print("[메뉴] 선택: ");
      Serial.println(menuItems[currentMenu]);
      drawMenu();
    }
  }

  lastSwitchState = reading;
  delay(10);
}