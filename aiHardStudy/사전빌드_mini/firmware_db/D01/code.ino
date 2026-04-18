// [비행기 멜로디] 떴다 떴다 비행기 동요 연주

// 음계 주파수 정의
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523

// 떴다 떴다 비행기 멜로디
int melody[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, 0,
  NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, 0,
  NOTE_D4, NOTE_D4, NOTE_E4, NOTE_D4, NOTE_C4, 0,
  NOTE_G4, NOTE_E4, NOTE_C4, 0,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, 0,
  NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, 0,
  NOTE_D4, NOTE_D4, NOTE_E4, NOTE_D4, NOTE_C4, 0,
  NOTE_C4, NOTE_E4, NOTE_G4, 0
};

// 각 음표 박자 (ms)
int durations[] = {
  300, 300, 300, 300, 600, 200,
  300, 300, 300, 600, 200,
  300, 300, 300, 300, 600, 200,
  300, 300, 600, 200,
  300, 300, 300, 300, 600, 200,
  300, 300, 300, 600, 200,
  300, 300, 300, 300, 600, 200,
  300, 300, 600, 200
};

int noteCount;         // 총 음표 수
bool playing = false;  // 연주 중 여부

// [멜로디 태스크] 백그라운드에서 멜로디 연주
void melodyTask(void* param) {
  while (true) {
    // [OLED] 연주 시작 표시
    oled.clear();
    oled.drawString(20, 0, "Airplane Song");
    oled.drawString(10, 20, "Playing...");
    oled.drawString(0, 40, "<<떴다 떴다 비행기>>");
    oled.display();

    playing = true;

    for (int i = 0; i < noteCount; i++) {
      if (melody[i] == 0) {
        noTone(2);  // 쉼표
      } else {
        // [LED] 음표마다 색상 변경
        uint8_t r = (i % 3 == 0) ? 255 : 0;
        uint8_t g = (i % 3 == 1) ? 255 : 0;
        uint8_t b = (i % 3 == 2) ? 255 : 0;
        pixel.setPixelColor(0, pixel.Color(r, g, b));
        pixel.show();
        tone(2, melody[i], durations[i] - 30);
      }
      vTaskDelay(pdMS_TO_TICKS(durations[i]));
    }

    noTone(2);
    pixel.clear();
    pixel.show();
    playing = false;

    // [OLED] 완료 표시
    oled.clear();
    oled.drawString(25, 20, "Done! :)");
    oled.drawString(5, 40, "Press BTN again");
    oled.display();

    vTaskDelay(pdMS_TO_TICKS(100000));  // 대기 (버튼 대기)
  }
}

TaskHandle_t melodyHandle = NULL;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  noteCount = sizeof(melody) / sizeof(melody[0]);

  // [OLED] 대기 화면
  oled.clear();
  oled.drawString(10, 10, "Airplane Melody");
  oled.drawString(10, 30, "Press Button!");
  oled.display();

  // [LED] 준비 완료 파란불
  pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  pixel.show();

  Serial.println("비행기 멜로디 준비 완료. 버튼을 누르세요.");

  // [태스크] 멜로디 태스크 생성
  xTaskCreate(melodyTask, "melody", 4096, NULL, 1, &melodyHandle);
  vTaskSuspend(melodyHandle);  // 처음엔 정지 상태
}

void loop() {
  // [버튼] 누르면 멜로디 시작/재시작
  if (digitalRead(SWITCH_PIN) == LOW) {
    delay(50);  // 디바운스
    if (digitalRead(SWITCH_PIN) == LOW) {
      Serial.println("버튼 눌림 - 멜로디 재생");

      noTone(2);
      pixel.clear();
      pixel.show();

      // [태스크] 재시작
      vTaskSuspend(melodyHandle);
      xTaskCreate(melodyTask, "melody2", 4096, NULL, 1, &melodyHandle);

      while (digitalRead(SWITCH_PIN) == LOW) delay(10);
    }
  }

  delay(10000);
}