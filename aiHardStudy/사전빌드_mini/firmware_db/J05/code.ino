// [모드] 현재 모드 (1=LED, 2=멜로디, 3=온도)
int currentMode = 1;
bool lastSwitchState = HIGH;
bool switchPressed = false;

// [멜로디] 도레미 음계 주파수
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
int melodyLen = 8;

// [LED] 모드별 색상
void showModeColor(int mode) {
  if (mode == 1) pixel.setPixelColor(0, pixel.Color(0, 0, 255));      // 파랑=LED모드
  else if (mode == 2) pixel.setPixelColor(0, pixel.Color(255, 0, 255)); // 보라=멜로디모드
  else pixel.setPixelColor(0, pixel.Color(0, 255, 0));                 // 초록=온도모드
  pixel.show();
}

// [OLED] 모드 이름 표시
void showModeOled(int mode) {
  oled.clear();
  if (mode == 1) {
    oled.drawString(0, 0, "Mode 1: LED");
    oled.drawString(0, 16, "LED 패턴 실행중");
  } else if (mode == 2) {
    oled.drawString(0, 0, "Mode 2: Melody");
    oled.drawString(0, 16, "멜로디 재생중");
  } else {
    oled.drawString(0, 0, "Mode 3: Temp");
    oled.drawString(0, 16, "온도 측정중");
  }
  oled.display();
}

// [LED] LED 깜빡이기 패턴
void runLedMode() {
  uint32_t colors[] = {
    pixel.Color(255, 0, 0),
    pixel.Color(0, 255, 0),
    pixel.Color(0, 0, 255),
    pixel.Color(255, 255, 0),
    pixel.Color(255, 0, 255)
  };
  for (int i = 0; i < 5; i++) {
    if (currentMode != 1) break; // 모드 변경 시 중단
    pixel.setPixelColor(0, colors[i]);
    pixel.show();
    delay(400);
  }
}

// [멜로디] 도레미 멜로디 재생
void runMelodyMode() {
  for (int i = 0; i < melodyLen; i++) {
    if (currentMode != 2) break; // 모드 변경 시 중단
    tone(2, melody[i], 200);
    delay(250);
  }
  noTone(2);
}

// [온도] AHT20 센서 읽어서 OLED 표시
void runTempMode() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);
  oled.clear();
  oled.drawString(0, 0, "Mode 3: Temp");
  if (ok) {
    char buf[24];
    snprintf(buf, sizeof(buf), "T: %.1f C", temp);
    oled.drawString(0, 16, buf);
    snprintf(buf, sizeof(buf), "H: %.1f %%", humi);
    oled.drawString(0, 32, buf);

    // [BLE] 온도/습도 전송
    if (deviceConnected && sensorChar) {
      char bleMsg[48];
      snprintf(bleMsg, sizeof(bleMsg), "T:%.1f,H:%.1f", temp, humi);
      std::string s(bleMsg);
      sensorChar->setValue(s);
      sensorChar->notify();
    }
  } else {
    oled.drawString(0, 16, "센서 오류");
  }
  oled.display();
}

// [스위치] 버튼 눌림 감지 (디바운스 포함)
bool detectPress() {
  bool state = digitalRead(SWITCH_PIN);
  if (state == LOW && lastSwitchState == HIGH) {
    delay(50); // 디바운스
    if (digitalRead(SWITCH_PIN) == LOW) {
      lastSwitchState = LOW;
      return true;
    }
  }
  if (state == HIGH) lastSwitchState = HIGH;
  return false;
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 시작 모드 표시
  showModeColor(currentMode);
  showModeOled(currentMode);
  Serial.println("시작: Mode 1 (LED)");
}

void loop() {
  // [스위치] 모드 전환 감지
  if (detectPress()) {
    currentMode = (currentMode % 3) + 1; // 1→2→3→1 순환
    Serial.print("모드 전환: ");
    Serial.println(currentMode);
    noTone(2); // 멜로디 중단
    showModeColor(currentMode);
    showModeOled(currentMode);
    delay(300);
    return;
  }

  // [모드] 현재 모드 실행
  if (currentMode == 1) {
    runLedMode();
  } else if (currentMode == 2) {
    runMelodyMode();
    delay(500);
  } else {
    runTempMode();
    delay(2000);
  }

  delay(10);
}