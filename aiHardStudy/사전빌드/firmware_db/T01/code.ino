// [상태] 현재 켜진 LED 이름 저장
String currentLed = "NONE";

// [OLED] 현재 LED 상태 화면 출력
void updateOled() {
  oled.clear();
  oled.drawString(0, 0, "LED Control");
  oled.drawString(0, 16, ("LED: " + currentLed).c_str());
  oled.display();
}

// [LED] 모든 LED 끄기 (active LOW → HIGH=OFF)
void allLedsOff() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE, HIGH);
}

// [BLE] 스마트폰에서 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();

  if (cmd == "RED") {
    // [LED] 빨간 LED 켜기
    allLedsOff();
    digitalWrite(LED_RED, LOW);
    currentLed = "RED";
  } else if (cmd == "YELLOW") {
    // [LED] 노란 LED 켜기
    allLedsOff();
    digitalWrite(LED_YELLOW, LOW);
    currentLed = "YELLOW";
  } else if (cmd == "BLUE") {
    // [LED] 파란 LED 켜기
    allLedsOff();
    digitalWrite(LED_BLUE, LOW);
    currentLed = "BLUE";
  } else {
    return; // [검증] 알 수 없는 명령 무시
  }

  // [OLED] 상태 갱신
  updateOled();

  // [BLE] 현재 LED 상태 스마트폰에 응답 전송
  if (deviceConnected && sensorChar) {
    String response = "LED:" + currentLed;
    std::string s = response.c_str();
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀/OLED/센서 초기화
  initBLE();       // [BLE] OTA 및 BLE 초기화

  // [초기화] 시작 시 모든 LED 끄기
  allLedsOff();
  updateOled();
}

void loop() {
  delay(10000);
}