// [캡티브 포탈] WiFi 접속 시 자동 환영 페이지
#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
DNSServer dnsServer;
WebServer server(80);
int visitors = 0;
void handleRoot() {
  visitors++;
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-family:sans-serif;background:linear-gradient(#1a1a2e,#16213e);color:white;padding:20px;'>"
    "<h1>Welcome to UTTEC!</h1>"
    "<p style='font-size:20px;'>ESP32-C6 IoT Board</p>"
    "<hr><p>Features:</p>"
    "<p>LCD 1.47 inch | RGB LED | WiFi 6</p>"
    "<p>BLE 5.0 | SD Card | Button</p>"
    "<hr><p style='color:#0f0;'>You are visitor #" + String(visitors) + "</p>"
    "</body></html>");
  lcd.fillRect(0, 120, 172, 40, C_BG);
  char buf[32]; snprintf(buf, sizeof(buf), "Visitors: %d", visitors);
  lcdText(10, 130, buf, C_GREEN, 2);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-Portal");
  dnsServer.start(53, "*", WiFi.softAPIP());
  lcdClear();
  lcdText(10, 10, "Captive Portal", C_CYAN, 2);
  lcdText(10, 40, "UTTEC-Portal", C_GREEN, 2);
  lcdText(10, 65, "(No password)", C_GRAY, 1);
  lcdText(10, 90, "Connect WiFi!", C_YELLOW, 2);
  server.onNotFound(handleRoot);
  server.on("/", handleRoot);
  server.begin();
  setColor(0, 30, 0);
}
void loop() { dnsServer.processNextRequest(); server.handleClient(); delay(2); }
