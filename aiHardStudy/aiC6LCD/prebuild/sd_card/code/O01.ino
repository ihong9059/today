// [IoT 대시보드] WiFi AP + 웹 그래프 + LED 경고
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
float tempVal = 25.0, humiVal = 60.0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;background:#1a1a2e;color:white;font-size:18px;'>"
    "<h2>IoT Dashboard</h2>"
    "<canvas id='c' width='300' height='150' style='background:#16213e;'></canvas>"
    "<p>Temp: <span id='t'></span>C | Humi: <span id='h'></span>%</p>"
    "<script>var d=[];setInterval(()=>fetch('/d').then(r=>r.json()).then(j=>{document.getElementById('t').textContent=j.t;"
    "document.getElementById('h').textContent=j.h;d.push(j.t);if(d.length>30)d.shift();"
    "var c=document.getElementById('c').getContext('2d');c.clearRect(0,0,300,150);c.strokeStyle='#0f0';c.beginPath();"
    "d.forEach((v,i)=>{c.lineTo(i*10,150-(v-15)*5);});c.stroke();}),1000);</script></body></html>");
}
void handleData() {
  char json[64]; snprintf(json, sizeof(json), "{\"t\":%.1f,\"h\":%.1f}", tempVal, humiVal);
  server.send(200, "application/json", json);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-IOT", "12345678");
  lcdClear();
  lcdText(10, 10, "IoT Dashboard", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/d", handleData);
  server.begin();
}
void loop() {
  server.handleClient();
  tempVal = 25.0 + sin(millis() / 5000.0) * 5 + random(-10, 11) / 10.0;
  humiVal = 60.0 + cos(millis() / 7000.0) * 10 + random(-10, 11) / 10.0;
  lcd.fillRect(0, 80, 172, 80, C_BG);
  char buf[32];
  snprintf(buf, sizeof(buf), "%.1fC", tempVal);
  lcdText(10, 80, buf, tempVal > 30 ? C_RED : C_GREEN, 3);
  snprintf(buf, sizeof(buf), "%.0f%%", humiVal);
  lcdText(10, 120, buf, C_CYAN, 3);
  if (tempVal > 30) setColor(255, 0, 0); else setColor(0, 30, 0);
  delay(1000);
}
