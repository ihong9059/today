// [최강 WiFi] 가장 강한 신호 강조
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
}
void loop() {
  lcdClear();
  lcdText(10, 5, "Best WiFi", C_CYAN, 2);
  int n = WiFi.scanNetworks();
  if (n == 0) {
    lcdText(10, 60, "No networks", C_RED, 2);
    delay(3000);
    return;
  }
  int bestIdx = 0;
  for (int i = 1; i < n; i++) {
    if (WiFi.RSSI(i) > WiFi.RSSI(bestIdx)) bestIdx = i;
  }
  lcd.fillRect(5, 30, 162, 60, lcd.color565(0, 40, 0));
  lcd.drawRect(5, 30, 162, 60, C_GREEN);
  String best = WiFi.SSID(bestIdx);
  if (best.length() > 14) best = best.substring(0, 14);
  lcdText(15, 38, best.c_str(), C_GREEN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "%d dBm  BEST", WiFi.RSSI(bestIdx));
  lcdText(15, 62, buf, C_YELLOW, 2);
  setColor(0, 255, 0);
  int maxShow = (n > 6) ? 6 : n;
  for (int i = 0; i < maxShow; i++) {
    uint16_t c = (i == bestIdx) ? C_GREEN : C_GRAY;
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 12) ssid = ssid.substring(0, 12);
    snprintf(buf, sizeof(buf), "%ddBm", WiFi.RSSI(i));
    lcdText(5, 100 + i * 18, ssid.c_str(), c, 1);
    lcdText(110, 100 + i * 18, buf, c, 1);
  }
  delay(5000);
}
