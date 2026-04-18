// [설정] 로딩바 최대 = 개수 (128px 기준)
#define BAR_LEN 14

// [로딩바] 부팅 화면: UTTEC Mini + = 로딩바 + 퍼센트
void showBootScreen(int percent) {
  int filled = (percent * BAR_LEN) / 100;

  // [문자열] '[===   ]' 형태 생성
  char bar[BAR_LEN + 3];
  bar[0] = '[';
  for (int i = 0; i < BAR_LEN; i++) {
    bar[i + 1] = (i < filled) ? '=' : ' ';
  }
  bar[BAR_LEN + 1] = ']';
  bar[BAR_LEN + 2] = '\0';

  char pct[8];
  snprintf(pct, sizeof(pct), "%d%%", percent);

  oled.clear();
  oled.drawString(24, 6,  "UTTEC Mini");  // [타이틀] 상단 중앙
  oled.drawString(0,  28, bar);           // [로딩바] 중단
  oled.drawString(48, 48, pct);           // [퍼센트] 하단
  oled.display();
}

// [온습도] AHT20 데이터 OLED 표시
void showSensorScreen() {
  float temp, humi;
  bool ok = aht20_read(temp, humi);  // [센서] 온습도 읽기

  char tStr[24];
  char hStr[24];

  oled.clear();
  oled.drawString(24, 0, "UTTEC Mini");  // [헤더] 상단 고정

  if (ok) {
    snprintf(tStr, sizeof(tStr), "Temp: %.1f C", temp);
    snprintf(hStr, sizeof(hStr), "Humi: %.1f %%", humi);
    oled.drawString(4, 22, tStr);  // [온도] 표시
    oled.drawString(4, 40, hStr);  // [습도] 표시
  } else {
    oled.drawString(8, 32, "Sensor Error");  // [오류] 센서 실패
  }

  oled.display();
}

void setup() {
  Serial.begin(115200);
  initHardware();  // [초기화] 핀, OLED, WS2812 초기화
  initBLE();       // [BLE] BLE OTA 초기화

  // [부팅] 시작 타이틀 잠깐 표시
  oled.clear();
  oled.drawString(24, 18, "UTTEC Mini");
  oled.drawString(22, 36, "Starting...");
  oled.display();
  delay(800);

  // [로딩바] 0%에서 100%까지 애니메이션
  for (int p = 0; p <= 100; p++) {
    showBootScreen(p);
    delay(20);  // 총 약 2초 소요
  }

  delay(500);  // [전환] 완료 후 잠시 대기

  // [전환] 온습도 화면으로 전환
  showSensorScreen();
}

void loop() {
  // [갱신] 3초마다 온습도 화면 업데이트
  showSensorScreen();
  delay(3000);
}