// [LED 깜빡이기 작업] 별도 스레드에서 LED 3개를 순서대로 깜빡이는 함수입니다
void ledBlinkTask(void *parameter) {
  // [무한 반복] 이 안의 코드가 계속 반복 실행됩니다
  while (true) {
    // [빨간 LED 켜기] GPIO25에 HIGH(3.3V)를 보내면 빨간 LED가 켜집니다
    digitalWrite(LED_RED, HIGH);
    // [대기] 500밀리초(0.5초) 동안 기다립니다. 이 시간이 깜빡이는 속도를 결정해요
    delay(500);
    // [빨간 LED 끄기] GPIO25에 LOW(0V)를 보내면 빨간 LED가 꺼집니다
    digitalWrite(LED_RED, LOW);
    // [대기] 꺼진 상태로 500밀리초 기다립니다
    delay(500);

    // [노란 LED 켜기] GPIO26에 HIGH를 보내면 노란 LED가 켜집니다
    digitalWrite(LED_YELLOW, HIGH);
    // [대기] 500밀리초 동안 기다립니다
    delay(500);
    // [노란 LED 끄기] GPIO26에 LOW를 보내면 노란 LED가 꺼집니다
    digitalWrite(LED_YELLOW, LOW);
    // [대기] 꺼진 상태로 500밀리초 기다립니다
    delay(500);

    // [파란 LED 켜기] GPIO27에 HIGH를 보내면 파란 LED가 켜집니다
    digitalWrite(LED_BLUE, HIGH);
    // [대기] 500밀리초 동안 기다립니다
    delay(500);
    // [파란 LED 끄기] GPIO27에 LOW를 보내면 파란 LED가 꺼집니다
    digitalWrite(LED_BLUE, LOW);
    // [대기] 꺼진 상태로 500밀리초 기다립니다
    delay(500);
  }
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

  // [핀 설정] 빨간 LED 핀을 출력(OUTPUT) 모드로 설정합니다. 전압을 내보내려면 출력이어야 해요
  pinMode(LED_RED, OUTPUT);
  // [핀 설정] 노란 LED 핀을 출력 모드로 설정합니다
  pinMode(LED_YELLOW, OUTPUT);
  // [핀 설정] 파란 LED 핀을 출력 모드로 설정합니다
  pinMode(LED_BLUE, OUTPUT);

  // [OLED 표시] 화면을 깨끗이 지웁니다
  oled.clear();
  // [OLED 표시] 화면의 (0,0) 위치에 제목을 그립니다
  oled.drawString(0, 0, "LED Blink");
  // [OLED 표시] 화면의 (0,16) 위치에 설명을 그립니다
  oled.drawString(0, 16, "R->Y->B 500ms");
  // [OLED 갱신] 그린 내용을 실제 화면에 보여줍니다
  oled.display();

  // [작업 생성] LED 깜빡이기를 별도 스레드로 실행합니다. 메인 루프와 동시에 돌아가요
  xTaskCreate(ledBlinkTask, "LED_Blink", 2048, NULL, 1, NULL);
}

// [메인 루프] BLE OTA가 백그라운드에서 동작하도록 대기합니다
void loop() {
  // [대기] 10초마다 반복합니다. 실제 작업은 위의 스레드에서 처리해요
  delay(10000);
}