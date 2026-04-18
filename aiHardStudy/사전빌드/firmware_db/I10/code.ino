void playLevelUp() {
  // [레벨업] 도미솔도(높은) 빠르게 연주
  tone(33, 262, 100); delay(120); // 도 (C4)
  tone(33, 330, 100); delay(120); // 미 (E4)
  tone(33, 392, 100); delay(120); // 솔 (G4)
  tone(33, 523, 200); delay(220); // 도 높은 (C5)
  noTone(33);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}

void loop() {
  delay(10000);
}