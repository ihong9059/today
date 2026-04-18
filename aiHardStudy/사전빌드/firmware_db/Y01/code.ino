// [상태] 기분 열거형 정의
enum PetMood { MOOD_HAPPY = 0, MOOD_NORMAL = 1, MOOD_SAD = 2 };

// [표정] 기분별 표정 문자열 배열
const char* petFaces[]  = { "^^", "--", "TT" };
const char* petLabels[] = { "Happy", "Normal", "Sad" };

volatile PetMood petMood  = MOOD_NORMAL;  // [현재] 현재 기분 상태
bool     petFeedActive    = false;         // [먹이] 먹이 효과 활성 여부
unsigned long petFeedTime = 0;             // [타이머] 먹이 준 시각
bool     petSwPrev        = HIGH;          // [스위치] 이전 스위치 상태
String   petStatus        = "Normal";      // [BLE] 전송할 상태 문자열

// [OLED] 화면 업데이트 함수
void petUpdateOLED() {
  oled.clear();
  oled.drawString(24,  4, "[ My Pet ]");
  oled.drawString(44, 24, petFaces[petMood]);
  oled.drawString(16, 44, petStatus.c_str());
  oled.display();
}

// [BLE] 기분 상태 문자열 전송
void petSendBLE() {
  if (deviceConnected && sensorChar) {
    std::string s = petStatus.c_str();
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [LED] 기분에 따른 LED 깜빡임 태스크
void petLedTask(void* param) {
  while (true) {
    // [초기화] 모든 LED 끄기
    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    PetMood m = petMood;
    if (m == MOOD_HAPPY) {
      // [행복] 파란 LED 빠르게 깜빡
      digitalWrite(LED_BLUE, LOW);
      vTaskDelay(200 / portTICK_PERIOD_MS);
      digitalWrite(LED_BLUE, HIGH);
      vTaskDelay(200 / portTICK_PERIOD_MS);
    } else if (m == MOOD_NORMAL) {
      // [보통] 노란 LED 중간 속도
      digitalWrite(LED_YELLOW, LOW);
      vTaskDelay(600 / portTICK_PERIOD_MS);
      digitalWrite(LED_YELLOW, HIGH);
      vTaskDelay(600 / portTICK_PERIOD_MS);
    } else {
      // [슬픔] 빨간 LED 느리게 깜빡
      digitalWrite(LED_RED, LOW);
      vTaskDelay(900 / portTICK_PERIOD_MS);
      digitalWrite(LED_RED, HIGH);
      vTaskDelay(900 / portTICK_PERIOD_MS);
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  // [입력] 스위치 핀 설정
  pinMode(32, INPUT_PULLUP);
  // [태스크] LED 깜빡임 태스크 생성
  xTaskCreate(petLedTask, "petLedTask", 2048, NULL, 1, NULL);
  // [초기] 첫 화면 표시
  petUpdateOLED();
}

void loop() {
  // [스위치] 버튼 눌림 감지 (엣지 트리거)
  bool swNow = digitalRead(32);
  if (petSwPrev == HIGH && swNow == LOW) {
    // [먹이] 먹이 주기 → 행복 상태로 전환
    petMood       = MOOD_HAPPY;
    petFeedActive = true;
    petFeedTime   = millis();
    petStatus     = "Fed:Happy";
    petUpdateOLED();
    petSendBLE();
    tone(33, 1200, 150);  // [효과음] 먹이 주기 효과음
  }
  petSwPrev = swNow;

  // [타이머] 먹이 효과 10초 후 자동 종료
  if (petFeedActive && millis() - petFeedTime > 10000) {
    petFeedActive = false;
  }

  // [센서] 5초마다 온도 측정 후 기분 업데이트
  static unsigned long petLastSensor = 0;
  if (millis() - petLastSensor > 5000) {
    petLastSensor = millis();
    if (!petFeedActive) {
      float t, h;
      if (aht20_read(t, h)) {
        PetMood newMood;
        String  newStatus;
        if (t < 25.0f) {
          // [추움] 25도 미만 → 슬픔
          newMood   = MOOD_SAD;
          newStatus = "Cold:Sad";
        } else if (t > 30.0f) {
          // [더움] 30도 초과 → 슬픔
          newMood   = MOOD_SAD;
          newStatus = "Hot:Sad";
        } else {
          // [보통] 25~30도 → 평온
          newMood   = MOOD_NORMAL;
          newStatus = "Normal";
        }
        if (newMood != petMood || newStatus != petStatus) {
          petMood   = newMood;
          petStatus = newStatus;
          petUpdateOLED();
          petSendBLE();
        }
      }
    }
  }

  // [OLED] 2초마다 화면 주기적 갱신
  static unsigned long petLastOled = 0;
  if (millis() - petLastOled > 2000) {
    petLastOled = millis();
    petUpdateOLED();
  }

  delay(50);
}