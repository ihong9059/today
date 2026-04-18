// [부저 작업] 부저를 5번 울리는 작업을 별도 스레드에서 실행합니다
void buzzerTask(void *param) {
  // [핀 설정] 부저 핀을 출력(OUTPUT) 모드로 설정합니다. 신호를 보내려면 출력이어야 해요
  pinMode(BUZZER, OUTPUT);
  // [부저 끄기] 부저가 active LOW라서 HIGH를 보내면 꺼진 상태입니다
  digitalWrite(BUZZER, HIGH);

  // [반복 5회] for문으로 정확히 5번만 반복합니다. i가 0부터 4까지 총 5번이에요
  for (int i = 0; i < 5; i++) {
    // [부저 켜기] LOW(0V)를 보내면 active LOW 부저가 울립니다
    digitalWrite(BUZZER, LOW);
    // [울리는 시간] 200밀리초(0.2초) 동안 부저가 소리를 냅니다
    vTaskDelay(200 / portTICK_PERIOD_MS);

    // [부저 끄기] HIGH(3.3V)를 보내면 부저가 멈춥니다
    digitalWrite(BUZZER, HIGH);
    // [쉬는 시간] 300밀리초(0.3초) 동안 쉽니다. 이게 있어야 "삐-삐-삐" 소리가 구분돼요
    vTaskDelay(300 / portTICK_PERIOD_MS);
  }

  // [OLED 표시] 부저가 5번 다 울린 후 화면에 완료 메시지를 보여줍니다
  oled.clear();
  oled.drawString(0, 0, "Buzzer Done!");
  oled.drawString(0, 16, "5 beeps complete");
  oled.display();

  // [작업 종료] 5번 울리기가 끝났으므로 이 스레드를 삭제합니다
  vTaskDelete(NULL);
}

// [초기 설정] 보드에 전원이 들어오면 한 번만 실행되는 함수입니다
void setup() {
  // [시리얼 통신] PC와 통신 속도를 115200으로 설정합니다. 디버깅 메시지를 볼 수 있어요
  Serial.begin(115200);
  // [I2C 시작] OLED 화면과 통신할 I2C 버스를 시작합니다 (SDA=21, SCL=22)
  Wire.begin(21, 22);
  // [OLED 초기화] OLED 화면을 사용할 준비를 합니다
  oled.init();

  // [OLED 안내] 화면에 시작 메시지를 표시합니다
  oled.clear();
  oled.drawString(0, 0, "Buzzer x5");
  oled.drawString(0, 16, "Starting...");
  oled.display();

  // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
  initBLE();

  // [작업 생성] 부저 울리기를 별도 스레드로 실행합니다. 메인 루프를 막지 않아요
  xTaskCreate(buzzerTask, "buzzer", 2048, NULL, 1, NULL);
}

// [메인 루프] 반복 실행되지만, BLE OTA 대기만 하면 되므로 10초마다 쉽니다
void loop() {
  delay(10000);
}