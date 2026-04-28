// [WiFi 갤러리] SD 이미지를 웹으로 열람
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  String html = "<html><body style='text-align:center;background:#222;color:white;'>"
    "<h2>SD Gallery</h2><div style='display:flex;flex-wrap:wrap;justify-content:center;'>";
  File root = SD.open("/");
  File f;
  while ((f = root.openNextFile())) {
    String name = String(f.name());
    if (name.endsWith(".bmp") || name.endsWith(".txt") || name.endsWith(".csv")) {
      html += "<div style='margin:10px;padding:10px;border:1px solid #555;'>";
      html += "<p>" + name + " (" + String(f.size()) + "B)</p>";
      html += "<a href='/view?f=" + name + "'>View</a> | ";
      html += "<a href='/dl?f=" + name + "'>Download</a></div>";
    }
    f.close();
  }
  root.close();
  html += "</div></body></html>";
  server.send(200, "text/html", html);
}
void handleView() {
  String fname = "/" + server.arg("f");
  File f = SD.open(fname, FILE_READ);
  if (!f) { server.send(404); return; }
  String content = "<html><body style='background:#222;color:white;'><h3>" + server.arg("f") + "</h3><pre>";
  while (f.available()) { content += (char)f.read(); }
  content += "</pre><a href='/'>Back</a></body></html>";
  f.close();
  server.send(200, "text/html", content);
}
void handleDl() {
  String fname = "/" + server.arg("f");
  File f = SD.open(fname, FILE_READ);
  if (!f) { server.send(404); return; }
  server.streamFile(f, "application/octet-stream");
  f.close();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  if (!SD.begin(4, SPI)) { lcdText(10, 50, "SD Fail", C_RED, 2); return; }
  WiFi.softAP("UTTEC-GALLERY", "12345678");
  lcdClear();
  lcdText(10, 10, "SD Gallery", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/view", handleView);
  server.on("/dl", handleDl);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
