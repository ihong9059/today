// [LED 깜빡이기 작업] 별도 스레드에서 노란 LED를 매우 빠르게 깜빡입니다
void yellowBlinkTask(void *param) {
  // [핀 설정] GPIO26(노란 LED)을 출력 모드로 설정합니다. 전압을 내보내려면 출력이어야 해요
  pinMode(LED_YELLOW, OUTPUT);

  // [반복 작업] 이 함수는 별도 스레드에서 무한 반복됩니다
  while (true) {
    // [LED 켜기] GPIO26에 HIGH(3.3V)를 보내면 노란 LED가 켜집니다
    digitalWrite(LED_YELLOW, HIGH);
    // [대기] 100밀리초(0.1초) 동안 기다립니다. 매우 빠른 깜빡임 속도예요
    vTaskDelay(100 / portTICK_PERIOD_MS);

    // [LED 끄기] GPIO26에 LOW(0V)를 보내면 노란 LED가 꺼집니다
    digitalWrite(LED_YELLOW, LOW);
    // [대기] 100밀리초(0.1초) 동안 기다립니다. 꺼진 상태도 같은 시간이에요
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

// [초기 설정] 보드가 켜질 때 한 번만 실행되는 함수입니다
void setup() {
  // [시리얼 통신] PC와 메시지를 주고받기 위해 115200 속도로 시리얼을 시작합니다
  Serial.begin(115200);
  // [I2C 시작] OLED 화면과 통신하기 위해 SDA=21, SCL=22 핀으로 I2C를 시작합니다
  Wire.begin(21, 22);
  // [OLED 초기화] OLED 화면을 사용할 준비를 합니다
  oled.init();
  // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
  initBLE();

  // [OLED 지우기] 화면에 남아있을 수 있는 이전 내용을 모두 지웁니다
  oled.clear();
  // [OLED 표시] 화면의 (0,0) 위치에 "YELLOW" 텍스트를 그립니다
  oled.drawString(0, 0, "YELLOW");
  // [OLED 업데이트] 그린 내용을 실제 화면에 보여줍니다
  oled.display();

  // [작업 생성] 노란 LED 깜빡이기를 별도 스레드로 실행합니다
  xTaskCreate(yellowBlinkTask, "YellowBlink", 2048, NULL, 1, NULL);
}

// [메인 반복] BLE OTA가 백그라운드에서 동작하므로 여기서는 대기만 합니다
void loop() {
  // [대기] 10초마다 한 번씩 반복합니다. 실제 작업은 위 스레드에서 처리해요
  delay(10000);
}