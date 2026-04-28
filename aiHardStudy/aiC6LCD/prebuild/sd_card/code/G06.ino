// [웹서버] WiFi 웹 서버로 LED 제어
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
bool apStarted = false;
void handleRoot() {
  String html = "<html><body style='text-align:center;font-size:24px;'>";
  html += "<h2>UTTEC LED</h2>";
  html += "<a href='/red'><button style='background:red;color:white;padding:20px;margin:5px;'>RED</button></a><br>";
  html += "<a href='/green'><button style='background:green;color:white;padding:20px;margin:5px;'>GREEN</button></a><br>";
  html += "<a href='/blue'><button style='background:blue;color:white;padding:20px;margin:5px;'>BLUE</button></a><br>";
  html += "<a href='/off'><button style='background:gray;color:white;padding:20px;margin:5px;'>OFF</button></a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Web Server", C_CYAN, 2);
  lcdText(10, 40, "Starting AP..", C_YELLOW, 2);
  WiFi.softAP("UTTEC-LED", "12345678");
  delay(500);
  IPAddress ip = WiFi.softAPIP();
  lcdClear();
  lcdText(10, 10, "Web Server", C_CYAN, 2);
  lcdText(10, 40, "AP: UTTEC-LED", C_GREEN, 2);
  lcdText(10, 65, "PW: 12345678", C_TEXT, 1);
  char buf[32];
  snprintf(buf, sizeof(buf), "%s", ip.toString().c_str());
  lcdText(10, 90, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/red", []() { setColor(255, 0, 0); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/green", []() { setColor(0, 255, 0); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/blue", []() { setColor(0, 0, 255); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/off", []() { ledOff(); server.sendHeader("Location", "/"); server.send(302); });
  server.begin();
  setColor(0, 30, 0);
}
void loop() { server.handleClient(); delay(2); }
