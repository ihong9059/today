// [웹 파일 업로드] WiFi AP로 파일을 SD에 저장
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:18px;'>"
    "<h2>SD File Upload</h2>"
    "<form method='POST' action='/upload' enctype='multipart/form-data'>"
    "<input type='file' name='file' style='font-size:16px;'><br><br>"
    "<input type='submit' value='Upload to SD' style='padding:15px 30px;font-size:18px;'>"
    "</form></body></html>");
}
File uploadFile;
void handleUpload() {
  HTTPUpload& upload = server.upload();
  if (upload.status == UPLOAD_FILE_START) {
    String path = "/" + upload.filename;
    uploadFile = SD.open(path, FILE_WRITE);
    lcd.fillRect(0, 100, 172, 100, C_BG);
    lcdText(10, 100, "Uploading...", C_YELLOW, 2);
  } else if (upload.status == UPLOAD_FILE_WRITE) {
    if (uploadFile) uploadFile.write(upload.buf, upload.currentSize);
  } else if (upload.status == UPLOAD_FILE_END) {
    if (uploadFile) { uploadFile.close(); }
    lcd.fillRect(0, 100, 172, 100, C_BG);
    char buf[32]; snprintf(buf, sizeof(buf), "OK! %uB", upload.totalSize);
    lcdText(10, 100, buf, C_GREEN, 2);
    lcdText(10, 130, upload.filename.c_str(), C_TEXT, 1);
    setColor(0, 255, 0); delay(300); ledOff();
  }
}
void handleUploadDone() { server.send(200, "text/html", "<html><body><h2>Upload Complete!</h2><a href='/'>Back</a></body></html>"); }
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  if (!SD.begin(4, SPI)) { lcdText(10, 50, "SD Failed!", C_RED, 2); return; }
  WiFi.softAP("UTTEC-UPLOAD", "12345678");
  lcdClear();
  lcdText(10, 10, "File Upload", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  lcdText(10, 65, "PW: 12345678", C_GRAY, 1);
  server.on("/", HTTP_GET, handleRoot);
  server.on("/upload", HTTP_POST, handleUploadDone, handleUpload);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
