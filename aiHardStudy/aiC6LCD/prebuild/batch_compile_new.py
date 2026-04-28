#!/usr/bin/env python3
"""Batch compile: 24 new items (I09-I14, M01-M06, N01-N06, O01-O06)"""
import hashlib, json, os, shutil, subprocess, sys, time
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
FIRMWARE_DB = SCRIPT_DIR / "firmware_db"
TEMPLATE_DIR = SCRIPT_DIR.parent / "firmware" / "ble_ota_c6_lcd"
BUILD_DIR = SCRIPT_DIR / "ble_ota_c6_lcd"
CATALOG_FILE = SCRIPT_DIR / "catalog_source.json"
ACLI = Path.home() / "bin" / "arduino-cli.exe"
FQBN = "esp32:esp32:esp32c6:PartitionScheme=min_spiffs"

CODES = {
"I09": """// [플래피버드] 버튼으로 새를 점프시켜 장애물 피하기
int birdY = 160, birdVel = 0;
int pipeX = 172, gapY = 140, gapH = 80;
int score = 0;
bool gameOver = false;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
}
void loop() {
  if (gameOver) {
    if (digitalRead(9) == LOW && lastBtn == HIGH) {
      birdY = 160; birdVel = 0; pipeX = 172; score = 0; gameOver = false;
    }
    lastBtn = digitalRead(9);
    delay(30); return;
  }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) birdVel = -6;
  lastBtn = btn;
  birdVel += 1;
  birdY += birdVel;
  if (birdY < 5) { birdY = 5; birdVel = 0; }
  if (birdY > 310) { birdY = 310; gameOver = true; }
  pipeX -= 3;
  if (pipeX < -20) {
    pipeX = 172;
    gapY = random(60, 240);
    score++;
  }
  if (pipeX < 30 && pipeX > 0) {
    if (birdY < gapY - gapH/2 || birdY > gapY + gapH/2) gameOver = true;
  }
  lcd.fillScreen(lcd.color565(30, 30, 80));
  lcd.fillCircle(20, birdY, 6, C_YELLOW);
  lcd.fillRect(pipeX, 0, 20, gapY - gapH/2, C_GREEN);
  lcd.fillRect(pipeX, gapY + gapH/2, 20, 320 - gapY - gapH/2, C_GREEN);
  char buf[16]; snprintf(buf, sizeof(buf), "%d", score);
  lcdText(75, 5, buf, C_TEXT, 3);
  if (gameOver) {
    lcdText(15, 130, "GAME OVER", C_RED, 3);
    snprintf(buf, sizeof(buf), "Score: %d", score);
    lcdText(25, 180, buf, C_YELLOW, 2);
    setColor(255, 0, 0);
  }
  delay(30);
}
""",

"I10": """// [사이먼] 색상 순서 기억 게임
uint16_t simonColors[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW};
uint8_t simonRGB[][3] = {{255,0,0},{0,255,0},{0,0,255},{255,255,0}};
const char* simonNames[] = {"RED","GREEN","BLUE","YELLOW"};
uint8_t sequence[50];
int seqLen = 1, playIdx = 0;
enum { SHOW, INPUT, FAIL, WIN } state = SHOW;
int showIdx = 0;
unsigned long timer = 0;
bool lastBtn = HIGH;
void newGame() {
  for (int i = 0; i < 50; i++) sequence[i] = random(0, 4);
  seqLen = 1; state = SHOW; showIdx = 0; timer = millis();
}
void drawGrid(int highlight) {
  for (int i = 0; i < 4; i++) {
    int x = (i % 2) * 86, y = 60 + (i / 2) * 100;
    uint16_t c = (i == highlight) ? simonColors[i] : lcd.color565(40, 40, 40);
    lcd.fillRect(x + 2, y + 2, 82, 92, c);
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  newGame();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  bool pressed = btn && lastBtn == HIGH;
  lastBtn = btn ? LOW : HIGH;
  switch (state) {
    case SHOW:
      lcdClear();
      char buf[16]; snprintf(buf, sizeof(buf), "Level %d", seqLen);
      lcdText(30, 10, buf, C_CYAN, 2);
      drawGrid(-1);
      if (millis() - timer > 600) {
        if (showIdx < seqLen) {
          drawGrid(sequence[showIdx]);
          setColor(simonRGB[sequence[showIdx]][0], simonRGB[sequence[showIdx]][1], simonRGB[sequence[showIdx]][2]);
          showIdx++;
          timer = millis();
        } else {
          state = INPUT; playIdx = 0; ledOff();
          lcdText(20, 280, "Your turn!", C_GREEN, 2);
        }
      }
      break;
    case INPUT:
      if (pressed) {
        int choice = playIdx % 4;
        drawGrid(choice);
        setColor(simonRGB[choice][0], simonRGB[choice][1], simonRGB[choice][2]);
        if (choice == sequence[playIdx]) {
          playIdx++;
          if (playIdx >= seqLen) {
            seqLen++; state = SHOW; showIdx = 0; timer = millis();
            if (seqLen > 20) state = WIN;
          }
        } else { state = FAIL; }
        delay(200); ledOff();
      }
      break;
    case FAIL:
      lcdClear();
      lcdText(20, 100, "WRONG!", C_RED, 3);
      snprintf(buf, sizeof(buf), "Level %d", seqLen - 1);
      lcdText(20, 160, buf, C_YELLOW, 2);
      setColor(255, 0, 0);
      if (pressed) newGame();
      break;
    case WIN:
      lcdClear(); lcdText(10, 100, "YOU WIN!", C_GREEN, 3);
      if (pressed) newGame();
      break;
  }
  delay(30);
}
""",

"I11": """// [퐁] 버튼으로 패들 이동하여 공 튕기기
int paddleY = 140, ballX = 86, ballY = 160;
int bdx = 2, bdy = 2;
int cpuY = 140;
int scoreP = 0, scoreC = 0;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW) paddleY += 4;
  else paddleY -= 2;
  paddleY = constrain(paddleY, 20, 280);
  cpuY += (ballY > cpuY) ? 2 : -2;
  cpuY = constrain(cpuY, 20, 280);
  ballX += bdx; ballY += bdy;
  if (ballY <= 5 || ballY >= 315) bdy = -bdy;
  if (ballX <= 15 && ballY > paddleY - 25 && ballY < paddleY + 25) { bdx = abs(bdx); }
  if (ballX >= 157 && ballY > cpuY - 25 && ballY < cpuY + 25) { bdx = -abs(bdx); }
  if (ballX < 0) { scoreC++; ballX = 86; ballY = 160; bdx = 2; }
  if (ballX > 172) { scoreP++; ballX = 86; ballY = 160; bdx = -2; }
  lcd.fillScreen(lcd.color565(0, 0, 30));
  lcd.drawLine(86, 0, 86, 320, lcd.color565(40, 40, 40));
  lcd.fillRect(5, paddleY - 20, 6, 40, C_GREEN);
  lcd.fillRect(161, cpuY - 20, 6, 40, C_RED);
  lcd.fillCircle(ballX, ballY, 4, C_TEXT);
  char buf[16];
  snprintf(buf, sizeof(buf), "%d", scoreP); lcdText(55, 5, buf, C_GREEN, 2);
  snprintf(buf, sizeof(buf), "%d", scoreC); lcdText(100, 5, buf, C_RED, 2);
  delay(20);
}
""",

"I12": """// [테트리스] 미니 블록 게임
#define TW 10
#define TH 20
#define BS 15
uint8_t board[TH][TW] = {0};
int cx = 4, cy = 0, ctype = 0, crot = 0;
int score = 0;
bool gameOver = false;
bool lastBtn = HIGH;
unsigned long lastDrop = 0;
const uint8_t pieces[4][4][2] = {
  {{0,0},{1,0},{0,1},{1,1}},  // O
  {{0,0},{1,0},{2,0},{3,0}},  // I
  {{0,0},{1,0},{2,0},{1,1}},  // T
  {{0,0},{1,0},{1,1},{2,1}}   // S
};
uint16_t pcolors[] = {C_YELLOW, C_CYAN, C_PURPLE, C_GREEN};
bool canPlace(int px, int py, int t) {
  for (int i = 0; i < 4; i++) {
    int x = px + pieces[t][i][0], y = py + pieces[t][i][1];
    if (x < 0 || x >= TW || y >= TH) return false;
    if (y >= 0 && board[y][x]) return false;
  }
  return true;
}
void place() {
  for (int i = 0; i < 4; i++) {
    int x = cx + pieces[ctype][i][0], y = cy + pieces[ctype][i][1];
    if (y >= 0 && y < TH) board[y][x] = ctype + 1;
  }
  for (int r = TH - 1; r >= 0; r--) {
    bool full = true;
    for (int c = 0; c < TW; c++) if (!board[r][c]) full = false;
    if (full) {
      for (int rr = r; rr > 0; rr--) for (int c = 0; c < TW; c++) board[rr][c] = board[rr-1][c];
      for (int c = 0; c < TW; c++) board[0][c] = 0;
      score += 10; r++;
    }
  }
  ctype = random(0, 4); cx = 4; cy = 0;
  if (!canPlace(cx, cy, ctype)) gameOver = true;
}
void drawBoard() {
  lcd.fillRect(0, 0, TW * BS + 2, TH * BS + 2, C_BG);
  lcd.drawRect(0, 0, TW * BS + 2, TH * BS + 2, C_GRAY);
  for (int r = 0; r < TH; r++)
    for (int c = 0; c < TW; c++)
      if (board[r][c]) lcd.fillRect(c * BS + 1, r * BS + 1, BS - 1, BS - 1, pcolors[board[r][c]-1]);
  for (int i = 0; i < 4; i++) {
    int x = cx + pieces[ctype][i][0], y = cy + pieces[ctype][i][1];
    if (y >= 0) lcd.fillRect(x * BS + 1, y * BS + 1, BS - 1, BS - 1, pcolors[ctype]);
  }
  char buf[16]; snprintf(buf, sizeof(buf), "S:%d", score);
  lcdText(155, 10, buf, C_TEXT, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  ctype = random(0, 4);
}
void loop() {
  if (gameOver) {
    lcdText(10, 140, "GAME OVER", C_RED, 2);
    delay(100); return;
  }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    if (canPlace(cx + 1, cy, ctype)) cx++;
    else if (canPlace(cx - 1, cy, ctype)) cx--;
  }
  lastBtn = btn;
  if (millis() - lastDrop > 500) {
    lastDrop = millis();
    if (canPlace(cx, cy + 1, ctype)) cy++;
    else place();
  }
  drawBoard();
  delay(30);
}
""",

"I13": """// [미로 탈출] 버튼으로 미로 탐색
#define MW 11
#define MH 17
#define CS 15
uint8_t maze[MH][MW];
int px = 1, py = 1;
int dir = 0;
bool lastBtn = HIGH;
bool won = false;
unsigned long pressTime = 0;
bool pressing = false;
void genMaze() {
  for (int y = 0; y < MH; y++) for (int x = 0; x < MW; x++) maze[y][x] = 1;
  maze[1][1] = 0;
  int stack[200][2]; int top = 0;
  stack[0][0] = 1; stack[0][1] = 1;
  while (top >= 0) {
    int cx = stack[top][0], cy = stack[top][1];
    int dirs[4][2] = {{0,-2},{2,0},{0,2},{-2,0}};
    int valid[4], vc = 0;
    for (int d = 0; d < 4; d++) {
      int nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      if (nx > 0 && nx < MW - 1 && ny > 0 && ny < MH - 1 && maze[ny][nx] == 1)
        valid[vc++] = d;
    }
    if (vc > 0) {
      int d = valid[random(0, vc)];
      int nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      maze[cy + dirs[d][1]/2][cx + dirs[d][0]/2] = 0;
      maze[ny][nx] = 0;
      top++; stack[top][0] = nx; stack[top][1] = ny;
    } else top--;
  }
  maze[MH-2][MW-2] = 0;
  maze[MH-2][MW-3] = 0;
}
void drawMaze() {
  lcd.fillScreen(C_BG);
  for (int y = 0; y < MH; y++)
    for (int x = 0; x < MW; x++) {
      uint16_t c = maze[y][x] ? lcd.color565(60, 60, 80) : C_BG;
      if (x == MW-2 && y == MH-2) c = C_GREEN;
      lcd.fillRect(x * CS + 1, y * CS + 1, CS - 1, CS - 1, c);
    }
  lcd.fillCircle(px * CS + CS/2, py * CS + CS/2, 4, C_YELLOW);
  lcdText(5, 260, "Short:Turn", C_GRAY, 1);
  lcdText(5, 275, "Long: Move", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  genMaze();
  drawMaze();
}
void loop() {
  if (won) { delay(100); return; }
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressTime = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressTime;
    if (dur > 300) {
      int dx[] = {0,1,0,-1}, dy[] = {-1,0,1,0};
      int nx = px + dx[dir], ny = py + dy[dir];
      if (nx > 0 && nx < MW-1 && ny > 0 && ny < MH-1 && maze[ny][nx] == 0) {
        px = nx; py = ny;
      }
    } else {
      dir = (dir + 1) % 4;
    }
    drawMaze();
    if (px == MW-2 && py == MH-2) {
      won = true;
      lcdText(10, 290, "ESCAPED!", C_GREEN, 2);
      setColor(0, 255, 0);
    }
  }
  delay(20);
}
""",

"I14": """// [우주선 슈팅] 적을 피하고 격추하기
int shipX = 80;
struct Bullet { int x, y; bool active; };
struct Enemy { int x, y; bool active; };
Bullet bullets[5];
Enemy enemies[8];
int score = 0;
bool gameOver = false;
bool lastBtn = HIGH;
unsigned long lastSpawn = 0, lastShot = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  for (int i = 0; i < 5; i++) bullets[i].active = false;
  for (int i = 0; i < 8; i++) enemies[i].active = false;
}
void loop() {
  if (gameOver) {
    if (digitalRead(9) == LOW && lastBtn == HIGH) {
      score = 0; gameOver = false; shipX = 80;
      for (int i = 0; i < 8; i++) enemies[i].active = false;
    }
    lastBtn = digitalRead(9); delay(30); return;
  }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    shipX = (shipX + 30) % 172;
    if (millis() - lastShot > 200) {
      lastShot = millis();
      for (int i = 0; i < 5; i++) if (!bullets[i].active) {
        bullets[i] = {shipX, 280, true}; break;
      }
    }
  }
  lastBtn = btn;
  if (millis() - lastSpawn > 800) {
    lastSpawn = millis();
    for (int i = 0; i < 8; i++) if (!enemies[i].active) {
      enemies[i] = {(int)random(10, 162), -10, true}; break;
    }
  }
  for (int i = 0; i < 5; i++) if (bullets[i].active) {
    bullets[i].y -= 5;
    if (bullets[i].y < 0) bullets[i].active = false;
  }
  for (int i = 0; i < 8; i++) if (enemies[i].active) {
    enemies[i].y += 2;
    if (enemies[i].y > 320) enemies[i].active = false;
    if (abs(enemies[i].x - shipX) < 10 && enemies[i].y > 275) gameOver = true;
    for (int j = 0; j < 5; j++) if (bullets[j].active) {
      if (abs(bullets[j].x - enemies[i].x) < 8 && abs(bullets[j].y - enemies[i].y) < 8) {
        enemies[i].active = false; bullets[j].active = false; score++;
      }
    }
  }
  lcd.fillScreen(lcd.color565(0, 0, 20));
  for (int i = 0; i < 30; i++) lcd.drawPixel(random(172), random(320), lcd.color565(40, 40, 60));
  lcd.fillTriangle(shipX, 280, shipX - 8, 295, shipX + 8, 295, C_CYAN);
  for (int i = 0; i < 5; i++) if (bullets[i].active) lcd.fillRect(bullets[i].x - 1, bullets[i].y, 3, 6, C_YELLOW);
  for (int i = 0; i < 8; i++) if (enemies[i].active) lcd.fillCircle(enemies[i].x, enemies[i].y, 6, C_RED);
  char buf[16]; snprintf(buf, sizeof(buf), "%d", score);
  lcdText(5, 5, buf, C_GREEN, 2);
  if (gameOver) {
    lcdText(10, 130, "GAME OVER", C_RED, 3);
    setColor(255, 0, 0);
  }
  delay(30);
}
""",

"M01": """// [WiFi AP] 접속 기기 수 LCD 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-BOARD", "12345678");
  lcdClear();
  lcdText(10, 10, "WiFi AP Mode", C_CYAN, 2);
  lcdText(10, 40, "UTTEC-BOARD", C_GREEN, 2);
  lcdText(10, 65, "PW: 12345678", C_TEXT, 1);
  char buf[32];
  snprintf(buf, sizeof(buf), "IP: %s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 85, buf, C_YELLOW, 1);
}
void loop() {
  int n = WiFi.softAPgetStationNum();
  lcd.fillRect(0, 130, 172, 100, C_BG);
  char buf[32];
  snprintf(buf, sizeof(buf), "%d", n);
  lcdText(50, 140, buf, n > 0 ? C_GREEN : C_RED, 4);
  lcdText(20, 200, "Devices", C_TEXT, 2);
  if (n > 0) setColor(0, 255, 0); else setColor(0, 0, 30);
  delay(1000);
}
""",

"M02": """// [웹 채팅] 브라우저 메시지를 LCD에 표시
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
""",

"M03": """// [컬러피커] 웹에서 LED 색상 실시간 선택
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
uint8_t cr=0, cg=0, cb=0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:18px;background:#222;color:white;'>"
    "<h2>LED Color Picker</h2>"
    "<input type='color' id='c' value='#0000ff' style='width:200px;height:100px;' "
    "oninput='fetch(\"/c?v=\"+this.value.substr(1))'>"
    "<p id='v'>#0000FF</p>"
    "<script>document.getElementById('c').oninput=function(){document.getElementById('v').textContent=this.value;"
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
""",

"M04": """// [웹 그림판] 브라우저에서 그리면 LCD에 표시
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
""",

"M05": """// [캡티브 포탈] WiFi 접속 시 자동 환영 페이지
#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
DNSServer dnsServer;
WebServer server(80);
int visitors = 0;
void handleRoot() {
  visitors++;
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-family:sans-serif;background:linear-gradient(#1a1a2e,#16213e);color:white;padding:20px;'>"
    "<h1>Welcome to UTTEC!</h1>"
    "<p style='font-size:20px;'>ESP32-C6 IoT Board</p>"
    "<hr><p>Features:</p>"
    "<p>LCD 1.47\" | RGB LED | WiFi 6</p>"
    "<p>BLE 5.0 | SD Card | Button</p>"
    "<hr><p style='color:#0f0;'>You are visitor #" + String(visitors) + "</p>"
    "</body></html>");
  lcd.fillRect(0, 120, 172, 40, C_BG);
  char buf[32]; snprintf(buf, sizeof(buf), "Visitors: %d", visitors);
  lcdText(10, 130, buf, C_GREEN, 2);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-Portal");
  dnsServer.start(53, "*", WiFi.softAPIP());
  lcdClear();
  lcdText(10, 10, "Captive Portal", C_CYAN, 2);
  lcdText(10, 40, "UTTEC-Portal", C_GREEN, 2);
  lcdText(10, 65, "(No password)", C_GRAY, 1);
  lcdText(10, 90, "Connect WiFi!", C_YELLOW, 2);
  server.onNotFound(handleRoot);
  server.on("/", handleRoot);
  server.begin();
  setColor(0, 30, 0);
}
void loop() { dnsServer.processNextRequest(); server.handleClient(); delay(2); }
""",

"M06": """// [웹 컨트롤러] 폰 브라우저로 LCD 게임 조작
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
int px = 86, py = 160;
int lastCmd = 0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;background:#222;color:white;font-size:20px;'>"
    "<h2>Game Controller</h2>"
    "<table style='margin:auto;'><tr><td></td><td><button onclick='s(1)' style='padding:30px;font-size:24px;'>UP</button></td><td></td></tr>"
    "<tr><td><button onclick='s(4)' style='padding:30px;font-size:24px;'>LEFT</button></td>"
    "<td><button onclick='s(5)' style='padding:30px;font-size:24px;background:red;color:white;'>FIRE</button></td>"
    "<td><button onclick='s(2)' style='padding:30px;font-size:24px;'>RIGHT</button></td></tr>"
    "<tr><td></td><td><button onclick='s(3)' style='padding:30px;font-size:24px;'>DOWN</button></td><td></td></tr></table>"
    "<script>function s(d){fetch('/c?d='+d);}</script>"
    "</body></html>");
}
void handleCmd() {
  lastCmd = server.arg("d").toInt();
  server.send(200, "text/plain", "ok");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-GAME", "12345678");
  lcdClear();
  lcdText(10, 10, "Web Control", C_CYAN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(10, 40, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/c", handleCmd);
  server.begin();
}
void loop() {
  server.handleClient();
  if (lastCmd > 0) {
    lcd.fillCircle(px, py, 6, C_BG);
    if (lastCmd == 1 && py > 10) py -= 8;
    if (lastCmd == 2 && px < 162) px += 8;
    if (lastCmd == 3 && py < 310) py += 8;
    if (lastCmd == 4 && px > 10) px -= 8;
    if (lastCmd == 5) { setColor(255, 0, 0); delay(50); ledOff(); }
    lastCmd = 0;
  }
  lcd.fillCircle(px, py, 6, C_GREEN);
  delay(10);
}
""",

"N01": """// [BLE→SD 메모] 폰 텍스트를 SD에 저장
int memoCount = 0;
void onBleReceive(String cmd) {
  if (!SD.begin(4, SPI)) { lcdText(10, 200, "SD Error", C_RED, 2); return; }
  File f = SD.open("/memo.txt", FILE_APPEND);
  if (f) {
    f.printf("[%lu] %s\\n", millis()/1000, cmd.c_str());
    f.close();
    memoCount++;
  }
  lcd.fillRect(0, 80, 172, 180, C_BG);
  lcdText(5, 80, cmd.c_str(), C_GREEN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Saved #%d", memoCount);
  lcdText(10, 130, buf, C_YELLOW, 2);
  setColor(0, 255, 0); delay(200); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Memo", C_CYAN, 2);
  lcdText(10, 40, "Send text via", C_TEXT, 2);
  lcdText(10, 65, "BLE to save SD", C_TEXT, 2);
}
void loop() { delay(10000); }
""",

"N02": """// [BLE 알림 로그] 메시지 수신 → SD 로그 + LCD + LED
int logCount = 0;
void onBleReceive(String cmd) {
  logCount++;
  setColor(255, 255, 0);
  if (SD.begin(4, SPI)) {
    File f = SD.open("/alerts.csv", FILE_APPEND);
    if (f) { f.printf("%lu,%d,%s\\n", millis()/1000, logCount, cmd.c_str()); f.close(); }
  }
  lcd.fillRect(0, 70, 172, 200, C_BG);
  lcdText(5, 70, "NEW ALERT!", C_RED, 2);
  lcdText(5, 100, cmd.c_str(), C_GREEN, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Log #%d saved", logCount);
  lcdText(5, 150, buf, C_YELLOW, 1);
  delay(500); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Alert Logger", C_CYAN, 2);
  lcdText(10, 40, "Waiting BLE...", C_GRAY, 2);
}
void loop() { delay(10000); }
""",

"N03": """// [웹 파일 업로드] WiFi AP로 파일을 SD에 저장
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
""",

"N04": """// [SD 웹 다운로드] SD 파일을 WiFi 웹으로 열람/다운로드
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
""",

"N05": """// [BLE 이미지] 폰에서 RGB565 이미지 수신 → LCD 표시
uint8_t imgBuf[2048];
int imgIdx = 0;
int imgX = 0, imgY = 0;
bool receiving = false;
void onBleReceive(String cmd) {
  if (cmd == "IMG_START") {
    receiving = true; imgIdx = 0; imgX = 0; imgY = 0;
    lcdClear();
    lcdText(10, 150, "Receiving...", C_YELLOW, 2);
    setColor(0, 0, 255);
  } else if (cmd == "IMG_END") {
    receiving = false;
    lcdText(5, 300, "Image Done!", C_GREEN, 1);
    setColor(0, 255, 0);
  } else if (receiving && cmd.startsWith("PX:")) {
    int comma = cmd.indexOf(',', 3);
    int comma2 = cmd.indexOf(',', comma + 1);
    int x = cmd.substring(3, comma).toInt();
    int y = cmd.substring(comma + 1, comma2).toInt();
    uint16_t c = (uint16_t)strtoul(cmd.substring(comma2 + 1).c_str(), NULL, 16);
    lcd.drawPixel(x, y, c);
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Image", C_CYAN, 2);
  lcdText(10, 40, "Send IMG_START", C_GRAY, 1);
  lcdText(10, 55, "then PX:x,y,c", C_GRAY, 1);
  lcdText(10, 70, "then IMG_END", C_GRAY, 1);
}
void loop() { delay(10000); }
""",

"N06": """// [WiFi 갤러리] SD 이미지를 웹으로 열람
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
""",

"O01": """// [IoT 대시보드] WiFi AP + 웹 그래프 + LED 경고
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
float tempVal = 25.0, humiVal = 60.0;
void handleRoot() {
  char json[64]; snprintf(json, sizeof(json), "{\"t\":%.1f,\"h\":%.1f}", tempVal, humiVal);
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
""",

"O02": """// [스마트 알림] BLE → LCD+LED 알림 + SD 로그
int alertCount = 0;
uint16_t alertColors[] = {C_GREEN, C_YELLOW, C_RED};
void onBleReceive(String cmd) {
  alertCount++;
  int level = 0;
  if (cmd.startsWith("WARN:")) { level = 1; cmd = cmd.substring(5); }
  else if (cmd.startsWith("CRIT:")) { level = 2; cmd = cmd.substring(5); }
  else if (cmd.startsWith("INFO:")) { cmd = cmd.substring(5); }
  setColor(level == 2 ? 255 : (level == 1 ? 255 : 0), level == 0 ? 255 : (level == 1 ? 165 : 0), 0);
  lcd.fillRect(0, 60, 172, 200, C_BG);
  const char* labels[] = {"INFO", "WARNING", "CRITICAL"};
  lcdText(10, 60, labels[level], alertColors[level], 2);
  lcdText(5, 90, cmd.c_str(), C_TEXT, 2);
  char buf[32]; snprintf(buf, sizeof(buf), "Alert #%d", alertCount);
  lcdText(10, 150, buf, C_GRAY, 1);
  if (SD.begin(4, SPI)) {
    File f = SD.open("/alerts.csv", FILE_APPEND);
    if (f) { f.printf("%lu,%s,%d,%s\\n", millis()/1000, labels[level], alertCount, cmd.c_str()); f.close(); }
  }
  delay(1000); ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Smart Alert", C_CYAN, 2);
  lcdText(10, 40, "INFO: / WARN:", C_GRAY, 1);
  lcdText(10, 55, "CRIT: prefix", C_GRAY, 1);
}
void loop() { delay(10000); }
""",

"O03": """// [멀티 퀴즈] WiFi AP로 여러 폰이 참여하는 퀴즈
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
    html += "<button onclick='fetch(\"/a?v=" + String(i) + "\")' style='display:block;width:80%;margin:10px auto;padding:15px;font-size:18px;'>" + String(q.a[i]) + "</button>";
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
""",

"O04": """// [디지털 명함] WiFi AP 접속 시 명함 표시
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='max-width:400px;margin:auto;padding:20px;font-family:sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);color:white;min-height:100vh;'>"
    "<div style='background:rgba(255,255,255,0.1);border-radius:20px;padding:30px;text-align:center;'>"
    "<div style='width:80px;height:80px;background:#fff;border-radius:50%;margin:auto;display:flex;align-items:center;justify-content:center;font-size:36px;'>U</div>"
    "<h1 style='margin:15px 0 5px;'>UTTEC</h1>"
    "<p style='opacity:0.8;'>IoT Education Platform</p>"
    "<hr style='border-color:rgba(255,255,255,0.3);'>"
    "<p>ESP32-C6 | LCD | LED | WiFi | BLE</p>"
    "<p>AI-powered Coding Education</p>"
    "<p style='margin-top:20px;font-size:14px;opacity:0.6;'>Powered by UTTEC Board</p>"
    "</div></body></html>");
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.softAP("UTTEC-Card");
  lcdClear();
  lcd.fillScreen(lcd.color565(60, 60, 120));
  lcdText(30, 40, "UTTEC", C_TEXT, 4);
  lcd.drawLine(20, 80, 152, 80, C_TEXT);
  lcdText(15, 100, "IoT Education", C_CYAN, 2);
  lcdText(15, 130, "Platform", C_CYAN, 2);
  lcdText(15, 180, "WiFi: UTTEC-Card", C_YELLOW, 1);
  lcdText(15, 200, "(No password)", C_GRAY, 1);
  char buf[32]; snprintf(buf, sizeof(buf), "%s", WiFi.softAPIP().toString().c_str());
  lcdText(15, 220, buf, C_GREEN, 1);
  server.on("/", handleRoot);
  server.onNotFound(handleRoot);
  server.begin();
  setColor(30, 30, 60);
}
void loop() { server.handleClient(); delay(2); }
""",

"O05": """// [미니 키오스크] WiFi AP + 웹 메뉴 주문 + SD 기록
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
int orderCount = 0;
void handleRoot() {
  server.send(200, "text/html",
    "<html><body style='text-align:center;font-size:18px;background:#f5f5f5;padding:20px;'>"
    "<h2>UTTEC Cafe</h2>"
    "<button onclick='order(\"Coffee\")' style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Coffee - $3</button>"
    "<button onclick='order(\"Tea\")' style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Tea - $2</button>"
    "<button onclick='order(\"Juice\")' style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Juice - $4</button>"
    "<button onclick='order(\"Water\")' style='display:block;width:80%;margin:10px auto;padding:20px;font-size:18px;'>Water - $1</button>"
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
    if (f) { f.printf("%d,%lu,%s\\n", orderCount, millis()/1000, menu.c_str()); f.close(); }
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
""",

"O06": """// [환경 모니터] 센서 시뮬레이션 + LCD + SD + 웹
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
    if (f) { f.printf("%d,%.1f,%.0f,%.0f\\n", logCount, temp, humi, light); f.close(); }
  }
  if (temp > 30) setColor(255, 0, 0); else setColor(0, 20, 0);
  delay(1000);
}
""",
}


def init_build_dir():
    BUILD_DIR.mkdir(parents=True, exist_ok=True)
    for f in TEMPLATE_DIR.iterdir():
        if f.is_file():
            shutil.copy2(f, BUILD_DIR / f.name)


def merge_code(user_code: str) -> str:
    base = (TEMPLATE_DIR / "ble_ota_c6_lcd.ino").read_text(encoding="utf-8")
    marker = "// ─── LED Task ───"
    base_part = base.split(marker)[0]
    if "onBleReceive" in user_code:
        base_part = base_part.replace(
            '__attribute__((weak)) void onBleReceive(String cmd) {',
            '// onBleReceive: user code provides\n// void onBleReceive(String cmd) {'
        ).replace(
            '  Serial.printf("Unhandled CMD: %s\\n", cmd.c_str());\n}',
            '//   Serial.printf("Unhandled CMD: %s\\n", cmd.c_str());\n// }'
        )
    return base_part + "\n" + marker + "\n" + user_code + "\n"


def compile_firmware() -> Path:
    out_dir = BUILD_DIR / "output"
    out_dir.mkdir(exist_ok=True)
    for old in out_dir.glob("*.bin"):
        old.unlink()
    for cached in BUILD_DIR.rglob("*.ino.cpp"):
        cached.unlink(missing_ok=True)
    result = subprocess.run(
        [str(ACLI), "compile", "--fqbn", FQBN,
         "--output-dir", str(out_dir), str(BUILD_DIR)],
        capture_output=True, text=True, timeout=600,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr[-500:])
    bin_path = out_dir / "ble_ota_c6_lcd.ino.bin"
    if not bin_path.exists():
        for f in out_dir.glob("*.bin"):
            if "bootloader" not in f.name and "partitions" not in f.name and "merged" not in f.name:
                bin_path = f; break
    return bin_path


def generate_catalog():
    with open(CATALOG_FILE, "r", encoding="utf-8") as f:
        items = json.load(f)["items"]
    catalog = {"version": "1.0", "board": "UTTEC C6-LCD (ESP32-C6-LCD-1.47)", "total": 0, "items": []}
    for item in items:
        no = item["no"]
        bin_path = FIRMWARE_DB / no / "firmware.bin"
        if not bin_path.exists():
            continue
        bin_data = bin_path.read_bytes()
        entry = dict(item)
        entry["firmware_size"] = len(bin_data)
        entry["firmware_sha256"] = hashlib.sha256(bin_data).hexdigest()
        catalog["items"].append(entry)
    catalog["total"] = len(catalog["items"])
    out = FIRMWARE_DB / "catalog.json"
    out.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"catalog.json: {catalog['total']} items")


def main():
    FIRMWARE_DB.mkdir(parents=True, exist_ok=True)
    init_build_dir()
    targets = list(CODES.keys())
    success, fail = 0, 0
    total = len(targets)
    t_start = time.time()
    for idx, no in enumerate(targets, 1):
        code = CODES[no]
        out_dir = FIRMWARE_DB / no
        out_dir.mkdir(parents=True, exist_ok=True)
        if (out_dir / "firmware.bin").exists():
            print(f"[{idx}/{total}] {no}: ALREADY BUILT - SKIP")
            success += 1
            continue
        print(f"[{idx}/{total}] {no}: building...", end=" ", flush=True)
        t0 = time.time()
        try:
            (out_dir / "code.ino").write_text(code, encoding="utf-8")
            merged = merge_code(code)
            (BUILD_DIR / "ble_ota_c6_lcd.ino").write_text(merged, encoding="utf-8")
            (out_dir / "merged.ino").write_text(merged, encoding="utf-8")
            bin_path = compile_firmware()
            shutil.copy2(bin_path, out_dir / "firmware.bin")
            sz = (out_dir / "firmware.bin").stat().st_size
            print(f"OK ({sz/1024:.0f}KB, {time.time()-t0:.0f}s)")
            success += 1
        except Exception as e:
            print(f"FAIL ({time.time()-t0:.0f}s): {str(e)[:100]}")
            fail += 1
        eta = (time.time() - t_start) / idx * (total - idx)
        print(f"  Progress: {idx}/{total} (OK:{success} FAIL:{fail}) ETA: {eta/60:.1f}min")
    generate_catalog()
    print(f"\nDone! {success}/{total} OK, {fail} failed, {(time.time()-t_start)/60:.1f}min total")


if __name__ == "__main__":
    main()
