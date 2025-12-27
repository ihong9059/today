// ESP32 변수 사용 예제: count를 1초마다 증가시키며 출력하기

int count = 0;  // (1) 정수형 변수 count를 0으로 초기화

void setup() {
  Serial.begin(115200);              // 시리얼 통신 시작(속도: 115200)
  Serial.println("Start counting");  // 시작 메시지 출력
}

void loop() {
  delay(1000);        // 1초(1000ms) 기다림
  count = count + 1;  // (2) count를 1씩 증가 (count++ 도 가능)

  // (3) "Count: X" 형식으로 출력
  Serial.print("Count: ");
  Serial.println(count);

  // (4) count가 10이 되면 메시지 출력
  if (count == 10) {
    Serial.println("10번 도달!");
  }
}
