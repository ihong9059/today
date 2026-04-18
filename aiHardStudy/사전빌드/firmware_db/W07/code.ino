// [부팅] UTTEC 로고 화면 표시
void showLogo() {
  oled.clear();
  oled.drawString(32, 8,  "* UTTEC *");   // [로고] 브랜드명 중앙 표시
  oled.drawString(20, 28, "Smart Sensor"); // [서브] 장치 설명
  oled.drawString(28, 44, "System");
  oled.display();
  delay(1500);                              // [대기] 로고 유지 시간
}

// [로딩바] 텍스트 기반 진행 바 표시
void showLoadingBar() {
  for (int step = 0; step <= 10; step++) {
    oled.clear();
    oled.drawString(32, 4, "* UTTEC *");   // [로고] 상단 고정

    // [바] 진행률 문자열 구성
    String bar = "[";
    for (int j = 0; j < 10; j++) {
      bar += (j < step) ? "=" : " ";
    }
    bar += "]";
    oled.drawString(4, 24, bar.c_str());   // [바] 로딩바 렌더링

    // [퍼센트] 진행률 수치 표시
    String pct = String(step * 10) + "%";
    oled.drawString(48, 40, pct.c_str());
    oled.drawString(8, 52, "Loading...");  // [안내] 로딩 안내 문구

    oled.display();
    delay(200);                             // [속도] 단계별 딜레이
  }
  delay(400);                               // [완료] 100% 유지 후 전환
}

// [메인] 메인 화면 초기 렌더링
void showMainScreen() {
  float temp = 0.0f, humi = 0.0f;
  bool ok = aht20_read(temp, humi);         // [센서] 첫 측정값 읽기

  oled.clear();
  oled.drawString(20, 0,  "[ UTTEC v1.0 ]"); // [제목] 상단 타이틀 바
  oled.drawString(0,  16, "--------------------");

  if (ok) {
    // [온도] 소수점 1자리 표시
    String tStr = "Temp: " + String(temp, 1) + " C";
    String hStr = "Humi: " + String(humi, 1) + " %";
    oled.drawString(0, 28, tStr.c_str());
    oled.drawString(0, 40, hStr.c_str());
  } else {
    oled.drawString(0, 28, "Temp: --.- C");  // [오류] 센서 실패 시 대시
    oled.drawString(0, 40, "Humi: --.- %");
  }

  oled.drawString(0, 52, "BLE: Active");     // [BLE] 연결 상태 표시
  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();       // [초기화] 핀·OLED·Wire 초기화

  showLogo();           // [1단계] UTTEC 로고 부팅 화면
  showLoadingBar();     // [2단계] 로딩바 애니메이션
  showMainScreen();     // [3단계] 메인 화면 전환

  initBLE();            // [BLE] OTA 블루투스 서비스 시작
}

void loop() {
  delay(10000);         // [루프] BLE OTA 처리 대기
}