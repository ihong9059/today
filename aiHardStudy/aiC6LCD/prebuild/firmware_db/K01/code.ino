// [대시보드] 시간+LED+WiFi 종합 표시
#include <WiFi.h>
int ledR = 0, ledG = 0, ledB = 30;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
  setColor(ledR, ledG, ledB);
}
void loop() {
  lcdClear();
  lcdText(5, 5, "DASHBOARD", C_CYAN, 2);
  lcd.drawLine(0, 25, 172, 25, C_GRAY);
  unsigned long t = millis() / 1000;
  char buf[32];
  snprintf(buf, sizeof(buf), "%02lu:%02lu:%02lu", (t/3600)%24, (t/60)%60, t%60);
  lcdText(10, 35, buf, C_GREEN, 3);
  lcd.drawLine(0, 75, 172, 75, C_GRAY);
  lcdText(5, 80, "LED:", C_TEXT, 1);
  snprintf(buf, sizeof(buf), "R:%d G:%d B:%d", ledR, ledG, ledB);
  lcdText(5, 95, buf, C_YELLOW, 1);
  lcd.fillRect(5, 110, 20, 20, lcd.color565(ledR, ledG, ledB));
  lcd.drawLine(0, 140, 172, 140, C_GRAY);
  lcdText(5, 145, "WiFi:", C_TEXT, 1);
  int n = WiFi.scanNetworks(false, false, false, 100);
  snprintf(buf, sizeof(buf), "%d networks", n);
  lcdText(5, 160, buf, C_GREEN, 1);
  if (n > 0) {
    snprintf(buf, sizeof(buf), "Best: %ddBm", WiFi.RSSI(0));
    lcdText(5, 175, buf, C_YELLOW, 1);
  }
  lcd.drawLine(0, 195, 172, 195, C_GRAY);
  lcdText(5, 200, "BLE:", C_TEXT, 1);
  lcdText(5, 215, deviceConnected ? "Connected" : "Waiting", deviceConnected ? C_GREEN : C_GRAY, 1);
  snprintf(buf, sizeof(buf), "Uptime: %lus", t);
  lcdText(5, 250, buf, C_GRAY, 1);
  delay(3000);
}
