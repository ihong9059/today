// [미니 키오스크] WiFi AP + 웹 메뉴 주문 + SD 기록
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
int orderCount = 0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:18px;background:#f5f5f5;padding:20px;'>"
    "<h2>UTTEC Cafe</h2>"
    "<button onclick=\"order('Coffee')\" style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Coffee - $3</button>"
    "<button onclick=\"order('Tea')\" style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Tea - $2</button>"
    "<button onclick=\"order('Juice')\" style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Juice - $4</button>"
    "<button onclick=\"order('Water')\" style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Water - $1</button>"
    "<div id='r' style='margin-top:20px;font-size:24px;'></div>"
    "<script>function order(m){fetch('/o?m='+m).then(r=>r.text()).then(t=>document.getElementById('r').textContent=t);}</script>"
    "</body></html>");
}
void handleOrder() {
  String menu = server.arg("m");
  orderCount++;
  lcd.fillRect(0, 80, 172, 200, C_BG);
  char buf[32]; snprintf(buf, sizeof(buf), "Order #%d", orderCount);
  lcdText(10, 80, buf, C_YELLOW, 2);
  lcdText(10, 110, menu.c_str(), C_GREEN, 3);
  setColor(0, 255, 0); delay(300); ledOff();
  if (SD.begin(4, SPI)) {
    File f = SD.open("/orders.csv", FILE_APPEND);
    if (f) { f.printf("%d,%lu,%s\n", orderCount, millis()/1000, menu.c_str()); f.close(); }
  }
  server.send(200, "text/plain", "Order #" + String(orderCount) + " " + menu + " OK!");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  if (!SD.begin(4, SPI)) Serial.println("SD init fail");
  WiFi.softAP("UTTEC-CAFE", "12345678");
  lcdClear();
  lcdText(10, 10, "UTTEC Cafe", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/o", handleOrder);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
