void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [멜로디] 도(C4) 음을 1초간 재생
  tone(33, 262, 1000);
}

void loop() {
  delay(10000);
}