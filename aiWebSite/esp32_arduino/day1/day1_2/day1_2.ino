// ESP32 Arduino 예제: 시리얼 모니터로 메시지 출력하기

void setup() {
  Serial.begin(115200);              // 시리얼 통신을 115200bps 속도로 시작(시리얼 모니터와 통신 준비)
  Serial.println("Hello ESP32!");    // 시리얼 모니터에 "Hello ESP32!" 한 줄 출력
}

void loop() {
  Serial.println("ESP32 is running..."); // 1초마다 반복해서 상태 메시지 출력
  delay(1000);                           // 1000ms(1초) 동안 대기
}
