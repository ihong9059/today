// [WiFi AP] 접속 기기 수 LCD 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-BOARD", "12345678");
  lcdClear();
  lcdText(10, 10, "WiFi AP Mode", C_CYAN, 2);
  lcdText(10, 40, "UTTEC-BOARD", C_GREEN, 2);
  lcdText(10, 65, "PW: 12345678", C_TEXT, 1);
  char buf[32];
  snprintf(buf, sizeof(buf), "IP: %s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 85, buf, C_YELLOW, 1);
}
void loop() {
  int n = WiFi.softAPgetStationNum();
  lcd.fillRect(0, 130, 172, 100, C_BG);
  char buf[32];
  snprintf(buf, sizeof(buf), "%d", n);
  lcdText(50, 140, buf, n > 0 ? C_GREEN : C_RED, 4);
  lcdText(20, 200, "Devices", C_TEXT, 2);
  if (n > 0) setColor(0, 255, 0); else setColor(0, 0, 30);
  delay(1000);
}
