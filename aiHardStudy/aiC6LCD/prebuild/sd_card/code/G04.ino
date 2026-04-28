// [WiFi LED] 연결 상태를 LED 색상으로 표시
#include <WiFi.h>
int phase = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi LED", C_CYAN, 2);
  WiFi.mode(WIFI_STA);
}
void loop() {
  setColor(255, 255, 0);
  lcdText(10, 50, "Scanning...", C_YELLOW, 2);
  int n = WiFi.scanNetworks();
  lcd.fillRect(0, 50, 172, 30, C_BG);
  if (n > 0) {
    int rssi = WiFi.RSSI(0);
    if (rssi > -50) {
      setColor(0, 255, 0);
      lcdText(10, 50, "Strong!", C_GREEN, 2);
    } else if (rssi > -70) {
      setColor(255, 165, 0);
      lcdText(10, 50, "Medium", C_YELLOW, 2);
    } else {
      setColor(255, 0, 0);
      lcdText(10, 50, "Weak", C_RED, 2);
    }
    char buf[32];
    snprintf(buf, sizeof(buf), "%s %ddBm", WiFi.SSID(0).c_str(), rssi);
    lcd.fillRect(0, 80, 172, 20, C_BG);
    lcdText(5, 80, buf, C_TEXT, 1);
  } else {
    setColor(255, 0, 0);
    lcdText(10, 50, "No WiFi", C_RED, 2);
  }
  delay(5000);
}
