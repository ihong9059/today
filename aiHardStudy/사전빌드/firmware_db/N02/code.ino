// [음계] 도레미파솔라시 주파수 배열
const int notes[] = {262, 294, 330, 349, 392, 440, 494};
const char* noteNames[] = {"Do", "Re", "Mi", "Fa", "Sol", "La", "Si"};
// [LED] 순환할 LED 핀 배열
const int leds[] = {LED_RED, LED_YELLOW, LED_BLUE};
const int noteCount = 7;

// [태스크] LED 순서 켜기 + 음계 재생 + OLED 표시
void scaleTask(void* param) {
  while (true) {
    for (int i = 0; i < noteCount; i++) {
      // [LED] 모든 LED 끄기 (active LOW: HIGH=OFF)
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE, HIGH);

      // [LED] 현재 음에 해당하는 LED 켜기 (순환)
      digitalWrite(leds[i % 3], LOW);

      // [OLED] 음 이름 화면 표시
      oled.clear();
      oled.drawString(28, 8,  "-- Scale --");
      oled.drawString(48, 28, noteNames[i]);
      oled.drawString(20, 48, "Note:");
      char buf[8];
      snprintf(buf, sizeof(buf), "%d Hz", notes[i]);
      oled.drawString(52, 48, buf);
      oled.display();

      // [버저] 해당 음 재생 (500ms)
      tone(33, notes[i], 500);
      delay(650);
      noTone(33);
    }

    // [LED] 마지막 음 후 모두 끄기
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE, HIGH);

    // [OLED] 대기 메시지
    oled.clear();
    oled.drawString(20, 28, "-- Ready --");
    oled.display();

    delay(1500);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] LED, 버저, OLED 핀 설정
  initBLE();       // [BLE] OTA 초기화

  // [태스크] 음계 재생 태스크 생성
  xTaskCreate(scaleTask, "scaleTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}