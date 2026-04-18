// [음계] 도레미파솔라시도 역순 (도시라솔파미레도) 연주

// 음계 주파수 (C5 옥타브)
const int notes[] = {523, 494, 440, 392, 349, 330, 294, 262}; // 도시라솔파미레도
const int noteCount = 8;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [연주] 역순 음계 연주
  for (int i = 0; i < noteCount; i++) {
    tone(2, notes[i], 400);
    delay(500);
    noTone(2);
    delay(50);
  }
}

void loop() {
  delay(10000);
}