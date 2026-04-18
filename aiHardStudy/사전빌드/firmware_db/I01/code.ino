const int NOTE_D4 = 294;
const int NOTE_E4 = 330;
const int NOTE_G4 = 392;
const int NOTE_A4 = 440;

// [멜로디] 학교종 음표 배열 (주파수, 박자)
const int melody[][2] = {
  {NOTE_G4, 400}, {NOTE_G4, 400}, {NOTE_A4, 400}, {NOTE_A4, 400},
  {NOTE_G4, 400}, {NOTE_G4, 400}, {NOTE_E4, 800},
  {NOTE_G4, 400}, {NOTE_G4, 400}, {NOTE_E4, 400}, {NOTE_E4, 400},
  {NOTE_D4, 800},
  {NOTE_G4, 400}, {NOTE_G4, 400}, {NOTE_A4, 400}, {NOTE_A4, 400},
  {NOTE_G4, 400}, {NOTE_G4, 400}, {NOTE_E4, 800},
  {NOTE_G4, 400}, {NOTE_E4, 400}, {NOTE_D4, 800}
};
const int MELODY_LEN = sizeof(melody) / sizeof(melody[0]);

// [LED] 멜로디 재생 중 파란 LED 깜빡임 태스크
void ledTask(void* param) {
  while (true) {
    digitalWrite(LED_BLUE, LOW);
    vTaskDelay(200 / portTICK_PERIOD_MS);
    digitalWrite(LED_BLUE, HIGH);
    vTaskDelay(200 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [OLED] 시작 메시지 표시
  oled.clear();
  oled.drawString(0, 0, "School Bell");
  oled.drawString(0, 16, "Playing...");
  oled.display();

  // [LED] 깜빡임 태스크 생성
  xTaskCreate(ledTask, "ledTask", 1024, NULL, 1, NULL);

  // [멜로디] 학교종 순서대로 재생
  for (int i = 0; i < MELODY_LEN; i++) {
    int freq = melody[i][0];
    int dur  = melody[i][1];
    tone(33, freq, dur);
    delay(dur + 50); // [간격] 음표 사이 짧은 여백
    noTone(33);
  }

  // [완료] OLED에 완료 표시
  oled.clear();
  oled.drawString(0, 0, "School Bell");
  oled.drawString(0, 16, "Done!");
  oled.display();

  Serial.println("학교종 멜로디 완료");
}

void loop() {
  delay(10000);
}