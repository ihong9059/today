#include <WiFi.h>

// RSSI → 수평 막대그래프 (색상: 강도별 녹/황/적)
void drawSignalBar(int x, int y, int rssi) {
    int barW = map(constrain(rssi, -100, -30), -100, -30, 0, 56);
    uint16_t color;
    if (rssi >= -60)      color = C_GREEN;
    else if (rssi >= -75) color = C_YELLOW;
    else                  color = C_RED;
    lcd.fillRect(x, y, 56, 8, C_GRAY);         // 배경 막대
    lcd.fillRect(x, y, barW, 8, color);         // 신호 막대
    lcd.drawRect(x, y, 56, 8, C_TEXT);          // 테두리
}

// 헤더 그리기
void drawHeader() {
    lcd.fillRect(0, 0, 172, 30, lcd.color565(0, 30, 60));
    lcdText(10, 7, "WiFi Scanner", C_CYAN, 2);
    lcd.drawLine(0, 30, 172, 30, C_GRAY);
}

// WiFi 스캔 후 결과 표시
void displayWiFiScan() {
    lcdClear();
    drawHeader();
    lcdText(20, 100, "Scanning...", C_YELLOW, 2);
    setColor(0, 0, 80);                         // 파란색 LED - 스캔 중

    int n = WiFi.scanNetworks();

    lcdClear();
    drawHeader();

    if (n == 0) {
        lcdText(20, 120, "No networks", C_RED, 2);
        lcdText(30, 150, "found!", C_RED, 2);
        setColor(80, 0, 0);                     // 빨간색 LED - 실패
        return;
    }

    // 최대 6개 네트워크 표시
    int maxShow = min(n, 6);
    for (int i = 0; i < maxShow; i++) {
        int y = 36 + i * 46;
        int rssi = WiFi.RSSI(i);

        // SSID (최대 13자)
        String ssid = WiFi.SSID(i);
        if (ssid.length() == 0) ssid = "(hidden)";
        if (ssid.length() > 13) ssid = ssid.substring(0, 13);
        lcdText(4, y, ssid, C_TEXT, 1);

        // RSSI 수치
        String rssiStr = String(rssi) + "dBm";
        lcdText(4, y + 12, rssiStr, C_YELLOW, 1);

        // 수평 막대그래프
        drawSignalBar(4, y + 26, rssi);
    }

    // 하단: 발견된 네트워크 수
    String info = "Found: " + String(n) + " APs";
    lcdText(4, 308, info, C_GRAY, 1);

    WiFi.scanDelete();
    setColor(0, 80, 0);                         // 초록 LED - 스캔 완료
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(200);

    displayWiFiScan();
}

void loop() {
    delay(30000);           // 30초 간격으로 재스캔
    displayWiFiScan();
}