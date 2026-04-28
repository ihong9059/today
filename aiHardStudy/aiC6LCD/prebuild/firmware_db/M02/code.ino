// [웹 채팅] 브라우저 메시지를 LCD에 표시
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
String lastMsg = "";
int msgY = 80;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:20px;'>"
    "<h2>UTTEC Chat</h2>"
    "<input id='m' style='font-size:20px;width:80%' placeholder='Type message...'>"
    "<br><br><button onclick='send()' style='padding:15px 30px;font-size:18px;'>Send</button>"
    "<script>function send(){fetch('/msg?t='+document.getElementById('m').value);document.getElementById('m').value='';}</script>"
    "</body></html>");
}
void handleMsg() {
  lastMsg = server.arg("t");
  if (msgY > 280) { lcd.fillRect(0, 70, 172, 230, C_BG); msgY = 80; }
  lcdText(5, msgY, lastMsg.c_str(), C_GREEN, 2);
  msgY += 25;
  setColor(0, 100, 0); delay(100); ledOff();
  server.send(200, "text/plain", "ok");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-CHAT", "12345678");
  lcdClear();
  lcdText(10, 10, "Web Chat", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/msg", handleMsg);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
