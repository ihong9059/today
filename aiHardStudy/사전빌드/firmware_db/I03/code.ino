// [음표] 비행기 동요 주파수 정의
#define N_C4   262
#define N_D4   294
#define N_E4   330
#define N_F4   349
#define N_G4   392
#define N_A4   440
#define N_REST 0

// [멜로디] 떴다 떴다 비행기 동요 음표 배열
int melody[] = {
  N_E4, N_E4, N_G4, N_G4, N_A4, N_A4, N_G4, N_REST,  // 떴다 떴다 비행기 날아라
  N_F4, N_F4, N_E4, N_E4, N_D4, N_D4, N_C4, N_REST,  // 높이 높이 날아라 우리
  N_G4, N_G4, N_F4, N_F4, N_E4, N_E4, N_D4, N_REST,  // 내가 만든 비행기 날아라
  N_G4, N_G4, N_F4, N_F4, N_E4, N_E4, N_D4, N_REST,  // 멀리 멀리 날아라 우리
  N_E4, N_E4, N_G4, N_G4, N_A4, N_A4, N_G4, N_REST,  // 떴다 떴다 비행기 날아라
  N_F4, N_F4, N_E4, N_E4, N_D4, N_D4, N_C4, N_REST,  // 높이 높이 날아라 비행기
};

// [박자] 음표별 재생 시간 (ms)
int durations[] = {
  200, 200, 200, 200, 200, 200, 400, 80,
  200, 200, 200, 200, 200, 200, 400, 80,
  200, 200, 200, 200, 200, 200, 400, 80,
  200, 200, 200, 200, 200, 200, 400, 80,
  200, 200, 200, 200, 200, 200, 400, 80,
  200, 200, 200, 200, 200, 200, 400, 80,
};

int noteCount = sizeof(melody) / sizeof(melody[0]);
volatile bool isPlaying = false;

// [LED] 재생 중 파란 LED 점멸 태스크
void ledTask(void *param) {
  while (true) {
    if (isPlaying) {
      digitalWrite(LED_BLUE, LOW);   // 파란 LED 켜기
      delay(250);
      digitalWrite(LED_BLUE, HIGH);  // 파란 LED 끄기
      delay(250);
    } else {
      digitalWrite(LED_BLUE, HIGH);  // 대기 중 LED 끄기
      delay(100);
    }
  }
}

// [OLED] 재생 상태 화면 표시
void showDisplay(const char* status) {
  oled.clear();
  oled.drawString(0, 0,  "Airplane Melody");
  oled.drawString(0, 16, "떴다 떴다 비행기");
  oled.drawString(0, 32, status);
  oled.display();
}

// [멜로디] 비행기 동요 반복 재생 태스크
void melodyTask(void *param) {
  while (true) {
    isPlaying = true;
    digitalWrite(LED_RED, HIGH);     // 빨간 LED 끄기 (초기화)
    digitalWrite(LED_YELLOW, HIGH);  // 노란 LED 끄기 (초기화)
    showDisplay("Playing...");
    Serial.println("[멜로디] 비행기 동요 시작");

    for (int i = 0; i < noteCount; i++) {
      // [LED] 박자에 맞춰 노란 LED 깜빡임
      digitalWrite(LED_YELLOW, (i % 2 == 0) ? LOW : HIGH);

      if (melody[i] == N_REST) {
        noTone(33);  // 쉼표: 소리 끄기
      } else {
        tone(33, melody[i], durations[i]);  // 멜로디 음 재생
      }
      delay(durations[i] + 20);  // 음표 간격
    }

    noTone(33);                    // 멜로디 종료
    digitalWrite(LED_YELLOW, HIGH); // 노란 LED 끄기
    isPlaying = false;

    // [완료] 빨간 LED 잠깐 켜기
    digitalWrite(LED_RED, LOW);
    showDisplay("Done!");
    Serial.println("[멜로디] 비행기 동요 완료");
    delay(500);
    digitalWrite(LED_RED, HIGH);

    delay(3000);  // 3초 후 반복
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀 및 OLED 초기화
  initBLE();       // BLE OTA 초기화

  // [시작] OLED 준비 화면 표시
  showDisplay("Ready!");
  Serial.println("[시작] 비행기 멜로디 준비 완료");

  // [태스크] LED 점멸 및 멜로디 재생 태스크 시작
  xTaskCreate(ledTask,    "led",    1024, NULL, 1, NULL);
  xTaskCreate(melodyTask, "melody", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}