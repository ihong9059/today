// [컬러피커] 웹에서 LED 색상 실시간 선택
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
uint8_t cr=0, cg=0, cb=0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:18px;background:#222;color:white;'>"
    "<h2>LED Color Picker</h2>"
    "<input type='color' id='cp' value='#0000ff' style='width:200px;height:100px;'>"
    "<p id='v'>#0000FF</p>"
    "<script>document.getElementById('cp').oninput=function(){document.getElementById('v').textContent=this.value;"
    "fetch('/c?v='+this.value.substr(1));}</script>"
    "</body></html>");
}
void handleColor() {
  String hex = server.arg("v");
  if (hex.length() == 6) {
    uint32_t c = strtoul(hex.c_str(), NULL, 16);
    cr = (c >> 16) & 0xFF; cg = (c >> 8) & 0xFF; cb = c & 0xFF;
    setColor(cr, cg, cb);
    lcd.fillRect(10, 100, 152, 80, lcd.color565(cr, cg, cb));
    char buf[16]; snprintf(buf, sizeof(buf), "#%s", hex.c_str());
    lcdText(30, 200, buf, C_TEXT, 2);
  }
  server.send(200, "text/plain", "ok");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-COLOR", "12345678");
  lcdClear();
  lcdText(10, 10, "Color Picker", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/c", handleColor);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
