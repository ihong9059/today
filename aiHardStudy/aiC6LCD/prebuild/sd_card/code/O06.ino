// [환경 모니터] 센서 시뮬레이션 + LCD + SD + 웹
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
float temp = 25.0, humi = 60.0, light = 500;
int logCount = 0;
void handleRoot() {
  String html = "<html><body style='font-family:sans-serif;background:#1a1a2e;color:white;text-align:center;padding:20px;'>";
  html += "<h2>Environment Monitor</h2>";
  html += "<div style='display:flex;justify-content:center;gap:20px;'>";
  html += "<div style='background:#16213e;padding:20px;border-radius:10px;'><h3>Temp</h3><p style='font-size:28px;color:#f39c12;'>" + String(temp, 1) + "C</p></div>";
  html += "<div style='background:#16213e;padding:20px;border-radius:10px;'><h3>Humi</h3><p style='font-size:28px;color:#3498db;'>" + String(humi, 0) + "%</p></div>";
  html += "<div style='background:#16213e;padding:20px;border-radius:10px;'><h3>Light</h3><p style='font-size:28px;color:#2ecc71;'>" + String(light, 0) + "lx</p></div>";
  html += "</div><p>Logs: " + String(logCount) + " | <a href='/csv' style='color:#3498db;'>Download CSV</a></p></body></html>";
  server.send(200, "text/html", html);
}
void handleCsv() {
  File f = SD.open("/env.csv", FILE_READ);
  if (f) { server.streamFile(f, "text/csv"); f.close(); }
  else server.send(404, "text/plain", "No data");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  SD.begin(4, SPI);
  WiFi.softAP("UTTEC-ENV", "12345678");
  lcdClear();
  lcdText(10, 5, "Env Monitor", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 28, buf, C_YELLOW, 1);
  File f = SD.open("/env.csv", FILE_WRITE);
  if (f) { f.println("time,temp,humi,light"); f.close(); }
  server.on("/", handleRoot);
  server.on("/csv", handleCsv);
  server.begin();
}
void loop() {
  server.handleClient();
  temp = 25 + sin(millis()/5000.0) * 5 + random(-10,11)/10.0;
  humi = 60 + cos(millis()/7000.0) * 10 + random(-10,11)/10.0;
  light = 500 + sin(millis()/3000.0) * 300;
  lcd.fillRect(0, 50, 172, 200, C_BG);
  char buf[32];
  snprintf(buf, sizeof(buf), "%.1fC", temp);
  lcdText(10, 55, buf, temp > 30 ? C_RED : C_YELLOW, 3);
  snprintf(buf, sizeof(buf), "%.0f%%", humi);
  lcdText(10, 95, buf, C_CYAN, 3);
  snprintf(buf, sizeof(buf), "%.0f lx", light);
  lcdText(10, 135, buf, C_GREEN, 2);
  if (millis() / 1000 > logCount) {
    logCount = millis() / 1000;
    File f = SD.open("/env.csv", FILE_APPEND);
    if (f) { f.printf("%d,%.1f,%.0f,%.0f\n", logCount, temp, humi, light); f.close(); }
  }
  if (temp > 30) setColor(255, 0, 0); else setColor(0, 20, 0);
  delay(1000);
}
