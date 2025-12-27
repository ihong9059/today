// ESP32에서 빨강 LED를 1초 간격으로 깜빡이는 예제 코드

#define RED_LED_PIN 25              // 빨강 LED가 연결된 GPIO 25번 핀을 매크로로 정의

void setup() {
  pinMode(RED_LED_PIN, OUTPUT);     // RED_LED_PIN(25번)을 출력(OUTPUT) 모드로 설정
}

void loop() {
  digitalWrite(RED_LED_PIN, HIGH);  // LED 켜기 (GPIO 출력 HIGH)
  delay(1000);                      // 1초(1000ms) 대기

  digitalWrite(RED_LED_PIN, LOW);   // LED 끄기 (GPIO 출력 LOW)
  delay(1000);                      // 1초(1000ms) 대기
}
