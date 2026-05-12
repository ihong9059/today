// Blue Pill (STM32F103C8T6) — default LED blink (Arduino / stm32duino)
//
// 보드:  Generic STM32F1 series  >  BluePill F103C8
// LED:   PC13 (active LOW)  — stm32duino에서는 LED_BUILTIN 매크로로도 접근 가능
// 동작:  250 ms 주기 점멸 (약 2 Hz)

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);   // active LOW → LED ON
  delay(250);
  digitalWrite(LED_BUILTIN, HIGH);  // LED OFF
  delay(250);
}
