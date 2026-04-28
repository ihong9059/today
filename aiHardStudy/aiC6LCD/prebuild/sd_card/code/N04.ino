// [SD 웹 다운로드] SD 파일을 WiFi 웹으로 열람/다운로드
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  String html = "<html><body style='font-size:16px;'><h2>SD Card Files</h2><ul>";
  File root = SD.open("/");
  File f;
  while ((f = root.openNextFile())) {
    if (!f.isDirectory()) {
      html += "<li><a href='/dl?f=" + String(f.name()) + "'>" + String(f.name()) + "</a> (" + String(f.size()) + "B)</li>";
    }
    f.close();
  }
  root.close();
  html += "</ul></body></html>";
  server.send(200, "text/html", html);
}
void handleDownload() {
  String fname = "/" + server.arg("f");
  File f = SD.open(fname, FILE_READ);
  if (!f) { server.send(404, "text/plain", "Not found"); return; }
  server.streamFile(f, "application/octet-stream");
  f.close();
  lcdText(10, 200, "Downloaded!", C_GREEN, 2);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  if (!SD.begin(4, SPI)) { lcdText(10, 50, "SD Failed!", C_RED, 2); return; }
  WiFi.softAP("UTTEC-FILES", "12345678");
  lcdClear();
  lcdText(10, 10, "SD Download", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/dl", handleDownload);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
