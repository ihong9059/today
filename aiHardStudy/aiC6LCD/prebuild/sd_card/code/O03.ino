// [멀티 퀴즈] WiFi AP로 여러 폰이 참여하는 퀴즈
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
struct Quiz { const char* q; const char* a[4]; int correct; };
Quiz quizzes[] = {
  {"LED stands for?", {"Light Emitting Diode","Laser","Lamp","Lens"}, 0},
  {"ESP32 CPU?", {"ARM","RISC-V","x86","MIPS"}, 1},
  {"WiFi freq?", {"2.4GHz","5MHz","100Hz","1THz"}, 0}
};
int currentQ = 0, totalQ = 3;
int scores[10] = {0};
int players = 0;
void handleRoot() {
  Quiz& q = quizzes[currentQ];
  String html = "<html><body style='text-align:center;font-size:20px;background:#1a1a2e;color:white;padding:20px;'>";
  html += "<h2>Q" + String(currentQ + 1) + ": " + String(q.q) + "</h2>";
  for (int i = 0; i < 4; i++)
    html += "<button onclick=\"fetch('/a?v=" + String(i) + "')\" style='display:block;width:80%;margin:10px auto;padding:15px;font-size:18px;'>" + String(q.a[i]) + "</button>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}
void handleAnswer() {
  int ans = server.arg("v").toInt();
  bool correct = (ans == quizzes[currentQ].correct);
  server.send(200, "text/html", correct ?
    "<html><body style='text-align:center;background:green;color:white;font-size:30px;padding:50px;'><h1>Correct!</h1></body></html>" :
    "<html><body style='text-align:center;background:red;color:white;font-size:30px;padding:50px;'><h1>Wrong!</h1></body></html>");
  lcd.fillRect(0, 100, 172, 100, C_BG);
  if (correct) { lcdText(10, 120, "CORRECT!", C_GREEN, 3); setColor(0, 255, 0); }
  else { lcdText(10, 120, "WRONG!", C_RED, 3); setColor(255, 0, 0); }
  delay(1500); ledOff();
  currentQ = (currentQ + 1) % totalQ;
  lcd.fillRect(0, 100, 172, 100, C_BG);
  char buf[32]; snprintf(buf, sizeof(buf), "Q%d ready", currentQ + 1);
  lcdText(20, 130, buf, C_YELLOW, 2);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-QUIZ", "12345678");
  lcdClear();
  lcdText(10, 10, "Quiz Game", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  lcdText(10, 70, "Join WiFi!", C_GREEN, 2);
  server.on("/", handleRoot);
  server.on("/a", handleAnswer);
  server.begin();
}
void loop() { server.handleClient(); delay(2); }
