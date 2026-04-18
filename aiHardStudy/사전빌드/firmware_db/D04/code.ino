void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [멜로디] 솔(G4) 음을 2초간 출력
  tone(33, 392, 2000);
}

void loop() {
  delay(10000);
}