// [멜로디] 반짝반짝 작은별 음표 주파수 정의
const int melody[] = {
  262, 262, 392, 392, 440, 440, 392,  // 반짝 반짝 작은 별
  349, 349, 330, 330, 294, 294, 262,  // 아름답게 빛나네
  392, 392, 349, 349, 330, 330, 294,  // 동쪽 하늘에서도
  392, 392, 349, 349, 330, 330, 294,  // 서쪽 하늘에서도
  262, 262, 392, 392, 440, 440, 392,  // 반짝 반짝 작은 별
  349, 349, 330, 330, 294, 294, 262   // 아름답게 빛나네
};

// [멜로디] 각 음표 박자 (ms 단위)
const int noteDurations[] = {
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800,
  400, 400, 400, 400, 400, 400, 800
};

const int NOTE_COUNT = sizeof(melody) / sizeof(melody[0]);

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 곡 제목 표시
  oled.clear();
  oled.drawString(0, 0, "Twinkle Twinkle");
  oled.drawString(0, 16, "Little Star");
  oled.drawString(0, 32, "반짝반짝 작은별");
  oled.display();

  // [멜로디] 연주 시작 알림 - 파란 LED 켜기
  digitalWrite(LED_BLUE, LOW);

  // [멜로디] 음표 순서대로 재생
  for (int i = 0; i < NOTE_COUNT; i++) {
    int dur = noteDurations[i];
    tone(33, melody[i], dur * 0.9); // [멜로디] 음표 길이의 90%만 소리, 음 분리
    delay(dur);
    noTone(33);
  }

  // [완료] 연주 종료 - 파란 LED 끄기, 빨간 LED 잠깐 켜기
  digitalWrite(LED_BLUE, HIGH);
  digitalWrite(LED_RED, LOW);
  delay(500);
  digitalWrite(LED_RED, HIGH);

  // [OLED] 완료 메시지
  oled.clear();
  oled.drawString(0, 0, "연주 완료!");
  oled.display();

  Serial.println("반짝반짝 작은별 연주 완료");
}

void loop() {
  delay(10000);
}