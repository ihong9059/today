// [WiFi 스캔] 주변 네트워크 LCD 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi Scan", C_CYAN, 2);
  lcdText(10, 40, "Scanning...", C_YELLOW, 2);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  int n = WiFi.scanNetworks();
  lcdClear();
  lcdText(10, 10, "WiFi Scan", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Found: %d", n);
  lcdText(10, 35, buf, C_GREEN, 2);
  lcd.drawLine(0, 55, 172, 55, C_GRAY);
  int maxShow = (n > 8) ? 8 : n;
  for (int i = 0; i < maxShow; i++) {
    int rssi = WiFi.RSSI(i);
    uint16_t c = (rssi > -50) ? C_GREEN : (rssi > -70) ? C_YELLOW : C_RED;
    snprintf(buf, sizeof(buf), "%ddBm", rssi);
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 12) ssid = ssid.substring(0, 12);
    lcdText(5, 60 + i * 18, ssid.c_str(), c, 1);
    lcdText(110, 60 + i * 18, buf, C_GRAY, 1);
  }
}
void loop() { delay(10000); }
