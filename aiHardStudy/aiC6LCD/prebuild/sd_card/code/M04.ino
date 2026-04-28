// [웹 그림판] 브라우저에서 그리면 LCD에 표시
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='margin:0;background:#000;'>"
    "<canvas id='c' width='172' height='320' style='border:1px solid #fff;touch-action:none;'></canvas>"
    "<script>"
    "var c=document.getElementById('c'),ctx=c.getContext('2d'),d=false,col='#FFFFFF';"
    "c.ontouchstart=c.onmousedown=function(e){d=true;draw(e);};"
    "c.ontouchend=c.onmouseup=function(){d=false;};"
    "c.ontouchmove=c.onmousemove=function(e){if(d)draw(e);};"
    "function draw(e){var r=c.getBoundingClientRect(),x=Math.floor((e.touches?e.touches[0].clientX:e.clientX)-r.left),y=Math.floor((e.touches?e.touches[0].clientY:e.clientY)-r.top);"
    "ctx.fillStyle=col;ctx.fillRect(x-1,y-1,3,3);"
    "fetch('/d?x='+x+'&y='+y+'&c=FFFFFF');}"
    "</script></body></html>");
}
void handleDraw() {
  int x = server.arg("x").toInt();
  int y = server.arg("y").toInt();
  String hex = server.arg("c");
  uint32_t c = strtoul(hex.c_str(), NULL, 16);
  lcd.fillRect(x - 1, y - 1, 3, 3, lcd.color565((c>>16)&0xFF, (c>>8)&0xFF, c&0xFF));
  server.send(200, "text/plain", "ok");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-DRAW", "12345678");
  lcdClear();
  lcdText(10, 10, "Web Canvas", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  lcdText(10, 70, "Connect & draw!", C_TEXT, 1);
  server.on("/", handleRoot);
  server.on("/d", handleDraw);
  server.begin();
}
void loop() { server.handleClient(); delay(1); }
