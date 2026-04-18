// [부저 작업] 부저를 5번 울리고 멈추는 함수입니다. 별도 스레드에서 실행돼요
void buzzerTask(void *param) {
  // [핀 설정] 부저 핀을 출력(OUTPUT) 모드로 설정합니다. 신호를 보내려면 출력이어야 해요
  pinMode(BUZZER, OUTPUT);
  // [부저 끄기] 부저가 active LOW이므로 HIGH를 보내면 꺼집니다
  digitalWrite(BUZZER, HIGH);

  // [반복] 5번 반복합니다. i가 0부터 4까지 총 5번이에요
  for (int i = 0; i < 5; i++) {
    // [부저 켜기] LOW(0V)를 보내면 active LOW 부저가 울립니다
    digitalWrite(BUZZER, LOW);
    // [대기] 300밀리초(0.3초) 동안 부저가 울립니다. 이 시간이 소리 길이를 결정해요
    vTaskDelay(300 / portTICK_PERIOD_MS);

    // [부저 끄기] HIGH(3.3V)를 보내면 부저가 멈춥니다
    digitalWrite(BUZZER, HIGH);
    // [대기] 200밀리초(0.2초) 동안 쉽니다. 이 시간이 소리 사이 간격이에요
    vTaskDelay(200 / portTICK_PERIOD_MS);
  }

  // [OLED 표시] 부저가 5번 다 울린 후 화면에 완료 메시지를 보여줍니다
  oled.clear();
  oled.drawString(0, 0, "Buzzer Done!");
  oled.drawString(0, 16, "5 beeps complete");
  oled.display();

  // [작업 종료] 할 일이 끝났으므로 이 스레드를 삭제합니다
  vTaskDelete(NULL);
}

// [초기 설정] 보드가 켜지면 한 번만 실행되는 함수입니다
void setup() {
  // [시리얼 통신] PC와 통신 속도를 115200으로 설정합니다. 디버깅 메시지를 볼 수 있어요
  Serial.begin(115200);
  // [I2C 시작] OLED 화면과 통신할 I2C 버스를 시작합니다 (SDA=21, SCL=22)
  Wire.begin(21, 22);
  // [OLED 초기화] OLED 화면을 사용할 준비를 합니다
  oled.init();
  // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
  initBLE();

  // [OLED 표시] 시작 메시지를 화면에 보여줍니다
  oled.clear();
  oled.drawString(0, 0, "Buzzer x5");
  oled.drawString(0, 16, "Starting...");
  oled.display();

  // [작업 생성] 부저 울리기를 별도 스레드로 실행합니다. 메인 루프를 막지 않아요
  xTaskCreate(buzzerTask, "buzzerTask", 2048, NULL, 1, NULL);
}

// [메인 루프] 계속 반복되는 함수입니다. BLE OTA가 백그라운드에서 동작해요
void loop() {
  // [대기] 10초마다 한 번씩 루프를 돕니다. 특별히 할 일은 없어요
  delay(10000);
}