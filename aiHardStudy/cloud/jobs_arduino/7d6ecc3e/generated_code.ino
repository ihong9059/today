// [센서 읽기 작업] 온도와 습도를 주기적으로 읽어서 OLED에 표시하는 함수입니다
void sensorTask(void *param) {
  float temp, humi;           // [변수 선언] 온도와 습도 값을 저장할 변수입니다
  char buf[32];               // [문자열 버퍼] 화면에 표시할 텍스트를 만들 공간입니다

  // [무한 반복] 센서를 계속 읽고 화면을 업데이트합니다
  while (true) {
    // [센서 읽기] AHT20 센서에서 온도와 습도를 읽어옵니다
    bool ok = aht20_read(temp, humi);

    // [화면 지우기] 이전에 표시된 내용을 모두 지웁니다
    oled.clear();

    if (ok) {
      // [읽기 성공] 센서에서 데이터를 정상적으로 받았을 때

      // [제목 표시] 화면 맨 위에 제목을 표시합니다
      oled.drawString(0, 0, "=== Sensor ===");

      // [온도 문자열 만들기] 온도 값을 소수점 1자리까지 문자열로 변환합니다
      sprintf(buf, "Temp: %.1f C", temp);
      // [온도 표시] 화면의 두 번째 줄(y=20)에 온도를 표시합니다
      oled.drawString(0, 20, buf);

      // [습도 문자열 만들기] 습도 값을 소수점 1자리까지 문자열로 변환합니다
      sprintf(buf, "Humi: %.1f %%", humi);
      // [습도 표시] 화면의 세 번째 줄(y=40)에 습도를 표시합니다
      oled.drawString(0, 40, buf);

      // [시리얼 출력] PC 모니터에도 온도와 습도를 출력합니다
      Serial.printf("Temp=%.1f C, Humi=%.1f %%\n", temp, humi);
    } else {
      // [읽기 실패] 센서 연결이 안 되었거나 오류가 발생했을 때
      oled.drawString(0, 0, "Sensor Error!");
      Serial.println("AHT20 read failed");
    }

    // [화면 갱신] 버퍼에 그린 내용을 실제 OLED 화면에 보여줍니다
    oled.display();

    // [대기] 2초(2000밀리초) 기다린 후 다시 측정합니다
    delay(2000);
  }
}

// [초기 설정] 보드가 켜질 때 한 번만 실행되는 함수입니다
void setup() {
  // [시리얼 시작] PC와 통신을 시작합니다 (속도: 115200bps)
  Serial.begin(115200);

  // [하드웨어 초기화] LED, 부저, OLED, 센서 등 모든 장치를 준비합니다
  initHardware();

  // [BLE 시작] 블루투스 무선 통신을 시작합니다. 다음에도 무선으로 프로그램을 보낼 수 있어요
  initBLE();

  // [작업 생성] 센서 읽기를 별도 스레드로 실행합니다 (메모리 4096바이트 할당)
  xTaskCreate(sensorTask, "sensor", 4096, NULL, 1, NULL);
}

// [메인 루프] BLE 통신을 유지하기 위해 대기합니다
void loop() {
  // [대기] 10초마다 반복하며 BLE 연결을 유지합니다
  delay(10000);
}