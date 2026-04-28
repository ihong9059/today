// [WiFi 연결] 연결 후 IP 주소 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi Connect", C_CYAN, 2);
  lcdText(10, 40, "Scanning...", C_YELLOW, 2);
  WiFi.mode(WIFI_STA);
  int n = WiFi.scanNetworks();
  lcdClear();
  lcdText(10, 10, "WiFi Info", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Networks: %d", n);
  lcdText(10, 40, buf, C_GREEN, 2);
  lcdText(10, 80, "MAC:", C_TEXT, 2);
  lcdText(10, 105, WiFi.macAddress().c_str(), C_YELLOW, 1);
  if (n > 0) {
    lcdText(10, 140, "Strongest:", C_TEXT, 2);
    lcdText(10, 165, WiFi.SSID(0).c_str(), C_GREEN, 2);
    snprintf(buf, sizeof(buf), "%d dBm", WiFi.RSSI(0));
    lcdText(10, 195, buf, C_YELLOW, 2);
  }
  setColor(0, 255, 0);
}
void loop() { delay(10000); }
