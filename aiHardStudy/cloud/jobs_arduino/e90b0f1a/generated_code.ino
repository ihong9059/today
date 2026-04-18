pp
// [부저 작업] 부저를 5번 울리고 멈추는 함수입니다. 별도 스레드에서 실행됩니다
void buzzerTask(void *param) {
  // [핀 설정] 부저 핀을 출력(OUTPUT) 모드로 설정합니다. 전압을 제어하려면 출력이어야 해요
  pinMode(BUZZER, OUTPUT);
  // [부저 끄기] 부저가 active LOW이므로 HIGH를 보내면 꺼집니다
  digitalWrite(BUZZER, HIGH);

  // [반복] 5번 반복합니다. i가 0부터 4까지 총 5회 실행돼요
  for (int i = 0; i < 5; i++) {
    // [부저 켜기] LOW(0V)를 보내면 active LOW 부저가 울립니다
    digitalWrite(BUZZER, LOW);
    // [대기] 300밀리초(0.3초) 동안 부저가 울립니다. 이 시간이 '삐' 소리 길이예요
    delay(300);
    // [부저 끄기] HIGH(3.3V)를 보내면 부저가 멈춥니다
    digitalWrite(BUZZER, HIGH);
    // [대기] 200밀리초(0.2초) 동안 쉽니다. 소리와 소리 사이의 간격이에요
    delay(200);
  }

  // [OLED 지우기] 화면에 남아있던 내용을 모두 지웁니다
  oled.clear();
  // [OLED 표시] 화면의 (0,0) 위치에 완료 메시지를 표시합니다
  oled.drawString(0, 0, "Buzzer Done!");
  // [OLED 표시] 화면의 (0,16) 위치에 5회 완료 안내를 표시합니다
  oled.drawString(0, 16, "5 beeps finish");
  // [OLED 갱신] 그린 내용을 실제 화면에 보여줍니다
  oled.display();

  // [작업 종료] 이 스레드(작업)를 삭제합니다. 5번 울린 후 더 이상 할 일이 없으니까요
  vTaskDelete(NULL);
}

// [초기 설정] 보드가 켜지면 한 번만 실행되는 함수입니다
void setup() {
  // [시리얼 시작] PC와 통신 속도를 115200으로 설정합니다. 디버깅용이에요
  Serial.begin(115200);
  // [I2C 시작] OLED 화면과 통신할 I2C 핀을 설정합니다 (SDA=21, SCL=22)
  Wire.begin(21, 22);
  // [OLED 초기화] OLED 화면을 사용할 준비를 합니다
  oled.init();
  // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
  initBLE();

  // [OLED 지우기] 화면을 깨끗이 지웁니다
  oled.clear();
  // [OLED 표시] 화면에 부저 시작 안내 메시지를 표시합니다
  oled.drawString(0, 0, "Buzzer x5");
  // [OLED 표시] 시작 중이라는 안내를 표시합니다
  oled.drawString(0, 16, "Starting...");
  // [OLED 갱신] 그린 내용을 실제 화면에 보여줍니다
  oled.display();

  // [작업 생성] 부저 울리기를 별도 스레드로 실행합니다. 메인 루프와 독립적으로 동작해요
  xTaskCreate(buzzerTask, "BuzzerTask", 2048, NULL, 1, NULL);
}

// [메인 루프] 계속 반복되는 함수입니다. BLE OTA를 위해 대기 상태를 유지해요
void loop() {
  // [대기] 10초마다 한 번씩 깨어납니다. BLE 통신은 백그라운드에서 알아서 처리돼요
  delay(10000);
}