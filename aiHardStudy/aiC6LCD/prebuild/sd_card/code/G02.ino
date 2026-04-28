// [WiFi 신호] 막대그래프로 표시
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
  lcdText(10, 5, "WiFi Signal", C_CYAN, 2);
  int n = WiFi.scanNetworks();
  int maxShow = (n > 6) ? 6 : n;
  for (int i = 0; i < maxShow; i++) {
    int rssi = WiFi.RSSI(i);
    int barW = map(constrain(rssi, -90, -30), -90, -30, 5, 120);
    uint16_t c = (rssi > -50) ? C_GREEN : (rssi > -70) ? C_YELLOW : C_RED;
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 10) ssid = ssid.substring(0, 10);
    int y = 35 + i * 45;
    lcdText(5, y, ssid.c_str(), C_TEXT, 1);
    lcd.fillRect(5, y + 12, barW, 14, c);
    lcd.drawRect(5, y + 12, 120, 14, C_GRAY);
    char buf[16];
    snprintf(buf, sizeof(buf), "%ddBm", rssi);
    lcdText(130, y + 12, buf, C_GRAY, 1);
  }
  delay(5000);
}
