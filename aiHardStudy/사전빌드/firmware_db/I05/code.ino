// [멜로디] 생일 축하 노래 음표 주파수 정의
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_D5  587
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_G5  784

// [멜로디] 생일 축하 노래 음표 배열
int melody[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_C5, NOTE_B4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_D5, NOTE_C5,
  NOTE_G4, NOTE_G4, NOTE_G5, NOTE_E5, NOTE_C5, NOTE_B4, NOTE_A4,
  NOTE_F5, NOTE_F5, NOTE_E5, NOTE_C5, NOTE_D5, NOTE_C5
};

// [멜로디] 음표 길이 (4=4분음표, 8=8분음표, 2=2분음표)
int noteDurations[] = {
  8, 8, 4, 4, 4, 2,
  8, 8, 4, 4, 4, 2,
  8, 8, 4, 4, 4, 4, 2,
  8, 8, 4, 4, 4, 2
};

int noteCount = sizeof(melody) / sizeof(melody[0]);
volatile bool melodyDone = false;

// [LED] 생일 축하 LED 축제 효과 태스크
void ledCelebrationTask(void *param) {
  while (!melodyDone) {
    // [LED] 빨강 → 노랑 → 파랑 순서로 깜빡임
    digitalWrite(LED_RED,    LOW);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   HIGH);
    vTaskDelay(150 / portTICK_PERIOD_MS);

    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_BLUE,   HIGH);
    vTaskDelay(150 / portTICK_PERIOD_MS);

    digitalWrite(LED_RED,    HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_BLUE,   LOW);
    vTaskDelay(150 / portTICK_PERIOD_MS);
  }
  // [LED] 연주 종료 후 모든 LED 켜기
  digitalWrite(LED_RED,    LOW);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_BLUE,   LOW);
  vTaskDelete(NULL);
}

// [멜로디] 생일 축하 노래 연주 함수
void playHappyBirthday() {
  int tempo = 180; // [멜로디] 템포 BPM 기준 박자 길이(ms)
  for (int i = 0; i < noteCount; i++) {
    int duration = (60000 / tempo) * 4 / noteDurations[i];
    tone(33, melody[i], duration * 0.9); // [멜로디] 음표 연주 (90% 길이로 스타카토)
    delay(duration);
    noTone(33);
  }
  melodyDone = true;
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀 및 OLED 초기화
  initBLE();       // [BLE] OTA 초기화

  // [OLED] 생일 메시지 표시
  oled.clear();
  oled.drawString(10, 0,  "Happy Birthday!");
  oled.drawString(20, 16, "* * * * * * * *");
  oled.drawString(25, 32, "생일 축하해요!");
  oled.drawString(15, 48, "- Arduino -");
  oled.display();

  Serial.println("[생일] 생일 축하 노래 시작!");

  // [LED] 축제 LED 태스크 시작
  xTaskCreate(ledCelebrationTask, "LED_Celebrate", 2048, NULL, 1, NULL);

  // [멜로디] 생일 축하 노래 연주
  playHappyBirthday();

  Serial.println("[생일] 연주 완료!");
}

void loop() {
  delay(10000);
}