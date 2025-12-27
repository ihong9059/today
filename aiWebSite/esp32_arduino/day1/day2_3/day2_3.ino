// ESP32 3색 LED 신호등 패턴 예제 코드

// (요구사항 2) #define으로 각 LED 핀 번호 정의
#define LED_RED    25   // 빨강 LED 핀
#define LED_YELLOW 26   // 노랑 LED 핀
#define LED_BLUE   27   // 파랑 LED 핀

// 모든 LED를 끄는 함수(한 번에 하나만 켜지도록 보장)
void allLedsOff() {
  digitalWrite(LED_RED, LOW);     // 빨강 LED 끄기
  digitalWrite(LED_YELLOW, LOW);  // 노랑 LED 끄기
  digitalWrite(LED_BLUE, LOW);    // 파랑 LED 끄기
}

void setup() {
  Serial.begin(115200);           // 시리얼 통신 시작(모니터 속도 115200)

  pinMode(LED_RED, OUTPUT);       // 빨강 LED 핀을 출력으로 설정
  pinMode(LED_YELLOW, OUTPUT);    // 노랑 LED 핀을 출력으로 설정
  pinMode(LED_BLUE, OUTPUT);      // 파랑 LED 핀을 출력으로 설정

  allLedsOff();                   // 시작 시 모든 LED OFF
}

void loop() {
  // (요구사항 3) 빨강 2초
  allLedsOff();                   // (요구사항 4) 먼저 모두 끄고
  digitalWrite(LED_RED, HIGH);    // 빨강 LED만 켜기
  Serial.println("RED");          // (요구사항 5) 현재 색상 출력
  delay(2000);                    // 2초 대기

  // (요구사항 3) 노랑 1초
  allLedsOff();                   // 한 번에 하나만 켜지도록 전체 OFF
  digitalWrite(LED_YELLOW, HIGH); // 노랑 LED만 켜기
  Serial.println("YELLOW");       // 현재 색상 출력
  delay(1000);                    // 1초 대기

  // (요구사항 3) 파랑 2초
  allLedsOff();                   // 한 번에 하나만 켜지도록 전체 OFF
  digitalWrite(LED_BLUE, HIGH);   // 파랑 LED만 켜기
  Serial.println("BLUE");         // 현재 색상 출력
  delay(2000);                    // 2초 대기

  // 이후 loop()가 반복되면서 신호등 패턴이 계속 반복됨
}
