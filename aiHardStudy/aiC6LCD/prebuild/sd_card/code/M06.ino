// [웹 컨트롤러] 폰 브라우저로 LCD 게임 조작
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
int px = 86, py = 160;
int lastCmd = 0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;background:#222;color:white;font-size:20px;'>"
    "<h2>Game Controller</h2>"
    "<table style='margin:auto;'><tr><td></td><td><button onclick='s(1)' style='padding:30px;font-size:24px;'>UP</button></td><td></td></tr>"
    "<tr><td><button onclick='s(4)' style='padding:30px;font-size:24px;'>LEFT</button></td>"
    "<td><button onclick='s(5)' style='padding:30px;font-size:24px;background:red;color:white;'>FIRE</button></td>"
    "<td><button onclick='s(2)' style='padding:30px;font-size:24px;'>RIGHT</button></td></tr>"
    "<tr><td></td><td><button onclick='s(3)' style='padding:30px;font-size:24px;'>DOWN</button></td><td></td></tr></table>"
    "<script>function s(d){fetch('/c?d='+d);}</script>"
    "</body></html>");
}
void handleCmd() {
  lastCmd = server.arg("d").toInt();
  server.send(200, "text/plain", "ok");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-GAME", "12345678");
  lcdClear();
  lcdText(10, 10, "Web Control", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/c", handleCmd);
  server.begin();
}
void loop() {
  server.handleClient();
  if (lastCmd > 0) {
    lcd.fillCircle(px, py, 6, C_BG);
    if (lastCmd == 1 && py > 10) py -= 8;
    if (lastCmd == 2 && px < 162) px += 8;
    if (lastCmd == 3 && py < 310) py += 8;
    if (lastCmd == 4 && px > 10) px -= 8;
    if (lastCmd == 5) { setColor(255, 0, 0); delay(50); ledOff(); }
    lastCmd = 0;
  }
  lcd.fillCircle(px, py, 6, C_GREEN);
  delay(10);
}
