/*
 * ESP32 Serial 통신 테스트
 * UTTEC Edu - C-ESP32 초급 과정
 *
 * 이 코드는 ESP32 개발환경이 제대로 설정되었는지 확인하는 테스트 코드입니다.
 * 시리얼 모니터에서 메시지가 정상적으로 출력되면 설정이 완료된 것입니다.
 *
 * 사용법:
 * 1. Arduino IDE에서 이 파일을 엽니다
 * 2. 도구 > 보드 > ESP32 Dev Module 선택
 * 3. 도구 > 포트 > COM 포트 선택
 * 4. 업로드 버튼 클릭
 * 5. 도구 > 시리얼 모니터 열기 (115200 baud)
 */

// 카운터 변수
int counter = 0;

void setup() {
  // 시리얼 통신 시작 (115200 baud)
  Serial.begin(115200);

  // ESP32가 시리얼 연결을 준비할 시간
  delay(1000);

  // 시작 메시지 출력
  Serial.println();
  Serial.println("========================================");
  Serial.println("   ESP32 Serial 통신 테스트");
  Serial.println("   UTTEC Edu - C-ESP32 초급 과정");
  Serial.println("========================================");
  Serial.println();
  Serial.println("축하합니다! ESP32 개발환경 설정이 완료되었습니다!");
  Serial.println("이제 본격적인 ESP32 프로그래밍을 시작할 수 있습니다.");
  Serial.println();
  Serial.println("아래에 1초마다 카운트가 증가합니다:");
  Serial.println("----------------------------------------");
}

void loop() {
  // 카운터 증가
  counter++;

  // 카운터 출력
  Serial.print("카운트: ");
  Serial.print(counter);
  Serial.println(" - Hello from ESP32!");

  // 1초 대기
  delay(1000);
}
