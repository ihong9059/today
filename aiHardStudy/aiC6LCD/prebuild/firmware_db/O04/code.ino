// [디지털 명함] WiFi AP 접속 시 명함 표시
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='max-width:400px;margin:auto;padding:20px;font-family:sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);color:white;min-height:100vh;'>"
    "<div style='background:rgba(255,255,255,0.1);border-radius:20px;padding:30px;text-align:center;'>"
    "<div style='width:80px;height:80px;background:#fff;border-radius:50%;margin:auto;display:flex;align-items:center;justify-content:center;font-size:36px;'>U</div>"
    "<h1 style='margin:15px 0 5px;'>UTTEC</h1>"
    "<p style='opacity:0.8;'>IoT Education Platform</p>"
    "<hr style='border-color:rgba(255,255,255,0.3);'>"
    "<p>ESP32-C6 | LCD | LED | WiFi | BLE</p>"
    "<p>AI-powered Coding Education</p>"
    "<p style='margin-top:20px;font-size:14px;opacity:0.6;'>Powered by UTTEC Board</p>"
    "</div></body></html>");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-Card");
  lcdClear();
  lcd.fillScreen(lcd.color565(60, 60, 120));
  lcdText(30, 40, "UTTEC", C_TEXT, 4);
  lcd.drawLine(20, 80, 152, 80, C_TEXT);
  lcdText(15, 100, "IoT Education", C_CYAN, 2);
  lcdText(15, 130, "Platform", C_CYAN, 2);
  lcdText(15, 180, "WiFi: UTTEC-Card", C_YELLOW, 1);
  lcdText(15, 200, "(No password)", C_GRAY, 1);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(15, 220, buf, C_GREEN, 1);
  server.on("/", handleRoot);
  server.onNotFound(handleRoot);
  server.begin();
  setColor(30, 30, 60);
}
void loop() { server.handleClient(); delay(2); }
