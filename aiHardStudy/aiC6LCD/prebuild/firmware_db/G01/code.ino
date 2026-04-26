#include <WiFi.h>

// [WiFi] 자동 재스캔 주기 (밀리초)
#define SCAN_INTERVAL 20000

unsigned long lastScan = 0;

// [LCD] RSSI 신호 강도 바 그리기 (4칸)
void drawSignalBar(int x, int y, int rssi) {
  int bars = 0;
  if (rssi >= -50) bars = 4;
  else if (rssi >= -65) bars = 3;
  else if (rssi >= -75) bars = 2;
  else if (rssi >= -85) bars = 1;

  uint16_t col = (bars >= 3) ? C_GREEN : (bars >= 2) ? C_YELLOW : C_RED;

  for (int i = 0; i < 4; i++) {
    int bx = x + i * 5;
    int bh = (i + 1) * 3;
    int by = y - bh + 3;
    if (i < bars) lcd.fillRect(bx, by, 4, bh, col);
    else          lcd.drawRect(bx, by, 4, bh, C_GRAY);
  }
}

// [WiFi] 스캔 실행 및 LCD 출력
void scanAndShow() {
  // [LCD] 스캔 중 안내 화면
  lcdClear();
  lcdText(14, 130, "Scanning...", C_CYAN, 2);
  setColor(0, 0, 200); // 파란색: 스캔 중

  int n = WiFi.scanNetworks(); // [WiFi] 동기 스캔
  lcdClear();

  // [LCD] 상단 헤더 배경
  lcd.fillRect(0, 0, 172, 22, lcd.color565(0, 0, 80));
  lcdText(4, 3, "WiFi Scanner", C_CYAN, 2);

  char buf[40];

  if (n == 0) {
    // [LCD] 네트워크 없음 표시
    lcdText(20, 120, "No networks", C_YELLOW, 2);
    lcdText(44, 148, "found!", C_YELLOW, 2);
    ledOff();
    WiFi.scanDelete();
    return;
  }

  // [LCD] 발견 개수 표시
  sprintf(buf, "Found %d network(s)", n);
  lcdText(4, 24, buf, C_GREEN, 1);

  // [LED] 개수에 따른 색상: 많음=초록, 보통=주황, 적음=빨강
  if (n >= 8)      setColor(0, 255, 0);
  else if (n >= 4) setColor(255, 140, 0);
  else             setColor(255, 40, 40);

  // [LCD] 목록 출력 (최대 13개, 줄당 21px)
  int maxShow = (n < 13) ? n : 13;

  for (int i = 0; i < maxShow; i++) {
    int y = 36 + i * 21;

    int    rssi   = WiFi.RSSI(i);
    bool   isOpen = (WiFi.encryptionType(i) == WIFI_AUTH_OPEN);
    String ssid   = WiFi.SSID(i);
    if (ssid.length() == 0) ssid = "(hidden)";

    // [LCD] 자물쇠 기호 + SSID (최대 20자)
    String line = String(isOpen ? " " : "#") + ssid.substring(0, 20);
    uint16_t nameCol = isOpen ? C_YELLOW : C_TEXT;
    lcdText(2, y, line, nameCol, 1);

    // [LCD] RSSI 수치 + 신호 강도 바
    sprintf(buf, "%ddBm", rssi);
    lcdText(2, y + 11, buf, C_GRAY, 1);
    drawSignalBar(140, y + 14, rssi); // x=140, 4칸 바
  }

  // [LCD] 초과 항목 안내
  if (n > maxShow) {
    sprintf(buf, "  +%d more...", n - maxShow);
    lcdText(4, 36 + maxShow * 21, buf, C_GRAY, 1);
  }

  // [LCD] 하단 버튼 안내
  lcd.drawLine(0, 310, 172, 310, C_GRAY);
  lcdText(4, 312, "BTN: Rescan", C_GRAY, 1);

  WiFi.scanDelete(); // [WiFi] 스캔 메모리 해제
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [WiFi] STA 모드 설정 후 초기 스캔
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  scanAndShow();
  lastScan = millis();
}

void loop() {
  // [버튼] BOOT 버튼 누르면 즉시 재스캔
  if (digitalRead(BOOT_BTN) == LOW) {
    delay(50); // 디바운스
    if (digitalRead(BOOT_BTN) == LOW) {
      while (digitalRead(BOOT_BTN) == LOW) delay(10); // 릴리스 대기
      scanAndShow();
      lastScan = millis();
    }
  }

  // [WiFi] 주기적 자동 재스캔
  if (millis() - lastScan >= SCAN_INTERVAL) {
    scanAndShow();
    lastScan = millis();
  }

  delay(100);
}
```

**동작 설명:**

| 기능 | 내용 |
|------|------|
| 스캔 방식 | `WiFi.scanNetworks()` 동기 스캔 |
| 자동 재스캔 | 20초마다 자동 갱신 |
| 수동 재스캔 | BOOT 버튼(GPIO9) 누르면 즉시 재스캔 |
| 표시 항목 | SSID, RSSI(dBm), 신호 강도 바(4칸), 보안 여부(`#`=암호화, 공백=개방) |
| RGB LED | 발견 개수에 따라 초록/주황/빨강 표시 |
| 최대 표시 | 화면에 13개, 초과 시 `+N more...` 표기 |