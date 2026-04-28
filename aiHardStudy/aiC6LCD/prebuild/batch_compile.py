#!/usr/bin/env python3
"""
Batch compile: generate code.ino for missing items, merge with base, compile.
No Claude CLI calls needed - all code is embedded.
"""
import hashlib, json, os, shutil, subprocess, sys, time
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
FIRMWARE_DB = SCRIPT_DIR / "firmware_db"
TEMPLATE_DIR = SCRIPT_DIR.parent / "firmware" / "ble_ota_c6_lcd"
BUILD_DIR = SCRIPT_DIR / "ble_ota_c6_lcd"
CATALOG_FILE = SCRIPT_DIR / "catalog_source.json"
ACLI = Path.home() / "bin" / "arduino-cli.exe"
FQBN = "esp32:esp32:esp32c6:PartitionScheme=min_spiffs"

# ─── All 46 missing item codes ───
CODES = {
"B02": """// [이름 표시] LCD에 이름을 크게 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 60, "My Name", C_CYAN, 4);
  lcdText(20, 120, "UTTEC", C_GREEN, 3);
  lcdText(20, 160, "Student", C_YELLOW, 2);
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
""",

"B07": """// [색상 텍스트] 색상별 텍스트 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Color Text", C_YELLOW, 2);
  lcd.drawLine(0, 32, 172, 32, C_GRAY);
  lcdText(10, 45, "WHITE", C_TEXT, 3);
  lcdText(10, 85, "RED", C_RED, 3);
  lcdText(10, 125, "GREEN", C_GREEN, 3);
  lcdText(10, 165, "BLUE", C_BLUE, 3);
  lcdText(10, 205, "YELLOW", C_YELLOW, 3);
  lcdText(10, 245, "CYAN", C_CYAN, 3);
  lcdText(10, 285, "ORANGE", C_ORANGE, 2);
  setColor(0, 30, 30);
}
void loop() { delay(10000); }
""",

"B08": """// [백라이트] LCD 밝기 조절
int brightness = 0;
int dir = 5;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 40, "Backlight", C_CYAN, 3);
  lcdText(10, 80, "Control", C_CYAN, 3);
}
void loop() {
  brightness += dir;
  if (brightness >= 255) { brightness = 255; dir = -5; }
  if (brightness <= 0) { brightness = 0; dir = 5; }
  analogWrite(22, brightness);
  char buf[16];
  snprintf(buf, sizeof(buf), "BL: %3d", brightness);
  lcdText(20, 150, buf, C_TEXT, 2);
  lcd.fillRect(20, 180, (int)(brightness * 132.0 / 255), 20, C_GREEN);
  lcd.fillRect(20 + (int)(brightness * 132.0 / 255), 180, 132 - (int)(brightness * 132.0 / 255), 20, C_BG);
  delay(30);
}
""",

"D04": """// [막대 그래프] LCD에 막대 그래프 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Bar Chart", C_YELLOW, 2);
  lcd.drawLine(30, 40, 30, 260, C_TEXT);
  lcd.drawLine(30, 260, 160, 260, C_TEXT);
  int vals[] = {80, 50, 120, 90, 60};
  uint16_t cols[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN};
  const char* labels[] = {"A", "B", "C", "D", "E"};
  for (int i = 0; i < 5; i++) {
    int x = 38 + i * 24;
    int h = vals[i];
    lcd.fillRect(x, 260 - h, 18, h, cols[i]);
    lcdText(x + 3, 265, labels[i], C_TEXT, 1);
  }
  setColor(0, 0, 30);
}
void loop() { delay(10000); }
""",

"D08": """// [게이지] LCD에 반원형 게이지 표시
int value = 0;
int dir = 1;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 10, "Gauge", C_YELLOW, 3);
}
void loop() {
  value += dir;
  if (value >= 100) dir = -1;
  if (value <= 0) dir = 1;
  int cx = 86, cy = 180, r = 70;
  lcd.fillRect(0, 50, 172, 200, C_BG);
  lcd.drawCircle(cx, cy, r, C_GRAY);
  lcd.drawCircle(cx, cy, r - 1, C_GRAY);
  for (int i = 0; i <= 10; i++) {
    float a = 3.14159 - i * 3.14159 / 10;
    int x1 = cx + (int)(cos(a) * (r - 8));
    int y1 = cy - (int)(sin(a) * (r - 8));
    int x2 = cx + (int)(cos(a) * r);
    int y2 = cy - (int)(sin(a) * r);
    lcd.drawLine(x1, y1, x2, y2, C_TEXT);
  }
  float needle = 3.14159 - value * 3.14159 / 100;
  int nx = cx + (int)(cos(needle) * (r - 15));
  int ny = cy - (int)(sin(needle) * (r - 15));
  lcd.drawLine(cx, cy, nx, ny, C_RED);
  lcd.fillCircle(cx, cy, 4, C_RED);
  char buf[16];
  snprintf(buf, sizeof(buf), "%d%%", value);
  lcdText(60, 200, buf, C_GREEN, 3);
  delay(50);
}
""",

"F04": """// [배경색 변경] 버튼으로 LCD 배경색 순환
uint16_t colors[] = {C_RED, C_GREEN, C_BLUE, C_YELLOW, C_CYAN, C_PURPLE, C_ORANGE, C_BG};
const char* names[] = {"RED", "GREEN", "BLUE", "YELLOW", "CYAN", "PURPLE", "ORANGE", "BLACK"};
int idx = 0;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcd.fillScreen(colors[idx]);
  lcdText(10, 140, names[idx], C_TEXT, 3);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    idx = (idx + 1) % 8;
    lcd.fillScreen(colors[idx]);
    uint16_t tc = (idx == 7) ? C_TEXT : C_BG;
    lcdText(10, 140, names[idx], tc, 3);
  }
  lastBtn = btn;
  delay(50);
}
""",

"F05": """// [길게/짧게] 버튼 길게/짧게 구분
unsigned long pressStart = 0;
bool pressing = false;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Press Test", C_CYAN, 2);
  lcdText(10, 40, "Short < 500ms", C_TEXT, 1);
  lcdText(10, 55, "Long  > 500ms", C_TEXT, 1);
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) {
    pressing = true;
    pressStart = millis();
  }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    lcd.fillRect(0, 100, 172, 200, C_BG);
    if (dur > 500) {
      lcdText(10, 120, "LONG!", C_RED, 4);
      setColor(255, 0, 0);
    } else {
      lcdText(10, 120, "SHORT!", C_GREEN, 4);
      setColor(0, 255, 0);
    }
    char buf[32];
    snprintf(buf, sizeof(buf), "%lu ms", dur);
    lcdText(20, 200, buf, C_YELLOW, 2);
  }
  delay(10);
}
""",

"F06": """// [메뉴] 버튼으로 LCD 메뉴 탐색
const char* menus[] = {"LED Red", "LED Green", "LED Blue", "LED Off", "LCD Clear"};
int menuIdx = 0;
bool lastBtn = HIGH;
unsigned long lastPress = 0;
void drawMenu() {
  lcdClear();
  lcdText(10, 10, "= MENU =", C_YELLOW, 2);
  for (int i = 0; i < 5; i++) {
    uint16_t c = (i == menuIdx) ? C_GREEN : C_GRAY;
    char buf[32];
    snprintf(buf, sizeof(buf), "%s %s", (i == menuIdx) ? ">" : " ", menus[i]);
    lcdText(10, 50 + i * 30, buf, c, 2);
  }
  lcdText(10, 220, "Short:Move", C_TEXT, 1);
  lcdText(10, 235, "Long: Select", C_TEXT, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawMenu();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && lastBtn) {
    if (millis() - lastPress > 600) {
      switch (menuIdx) {
        case 0: setColor(255, 0, 0); break;
        case 1: setColor(0, 255, 0); break;
        case 2: setColor(0, 0, 255); break;
        case 3: ledOff(); break;
        case 4: lcdClear(); break;
      }
      lcdText(10, 270, "Selected!", C_GREEN, 2);
    }
  }
  if (!btn && !lastBtn) {
    unsigned long dur = millis() - lastPress;
    if (dur < 500) {
      menuIdx = (menuIdx + 1) % 5;
      drawMenu();
    }
    lastPress = millis();
  }
  if (btn && lastBtn == HIGH) lastPress = millis();
  lastBtn = !btn;
  delay(30);
}
""",

"G01": """// [WiFi 스캔] 주변 네트워크 LCD 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi Scan", C_CYAN, 2);
  lcdText(10, 40, "Scanning...", C_YELLOW, 2);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  int n = WiFi.scanNetworks();
  lcdClear();
  lcdText(10, 10, "WiFi Scan", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Found: %d", n);
  lcdText(10, 35, buf, C_GREEN, 2);
  lcd.drawLine(0, 55, 172, 55, C_GRAY);
  int maxShow = (n > 8) ? 8 : n;
  for (int i = 0; i < maxShow; i++) {
    int rssi = WiFi.RSSI(i);
    uint16_t c = (rssi > -50) ? C_GREEN : (rssi > -70) ? C_YELLOW : C_RED;
    snprintf(buf, sizeof(buf), "%ddBm", rssi);
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 12) ssid = ssid.substring(0, 12);
    lcdText(5, 60 + i * 18, ssid.c_str(), c, 1);
    lcdText(110, 60 + i * 18, buf, C_GRAY, 1);
  }
}
void loop() { delay(10000); }
""",

"G02": """// [WiFi 신호] 막대그래프로 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
}
void loop() {
  lcdClear();
  lcdText(10, 5, "WiFi Signal", C_CYAN, 2);
  int n = WiFi.scanNetworks();
  int maxShow = (n > 6) ? 6 : n;
  for (int i = 0; i < maxShow; i++) {
    int rssi = WiFi.RSSI(i);
    int barW = map(constrain(rssi, -90, -30), -90, -30, 5, 120);
    uint16_t c = (rssi > -50) ? C_GREEN : (rssi > -70) ? C_YELLOW : C_RED;
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 10) ssid = ssid.substring(0, 10);
    int y = 35 + i * 45;
    lcdText(5, y, ssid.c_str(), C_TEXT, 1);
    lcd.fillRect(5, y + 12, barW, 14, c);
    lcd.drawRect(5, y + 12, 120, 14, C_GRAY);
    char buf[16];
    snprintf(buf, sizeof(buf), "%ddBm", rssi);
    lcdText(130, y + 12, buf, C_GRAY, 1);
  }
  delay(5000);
}
""",

"G03": """// [WiFi 연결] 연결 후 IP 주소 표시
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi Connect", C_CYAN, 2);
  lcdText(10, 40, "Scanning...", C_YELLOW, 2);
  WiFi.mode(WIFI_STA);
  int n = WiFi.scanNetworks();
  lcdClear();
  lcdText(10, 10, "WiFi Info", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Networks: %d", n);
  lcdText(10, 40, buf, C_GREEN, 2);
  lcdText(10, 80, "MAC:", C_TEXT, 2);
  lcdText(10, 105, WiFi.macAddress().c_str(), C_YELLOW, 1);
  if (n > 0) {
    lcdText(10, 140, "Strongest:", C_TEXT, 2);
    lcdText(10, 165, WiFi.SSID(0).c_str(), C_GREEN, 2);
    snprintf(buf, sizeof(buf), "%d dBm", WiFi.RSSI(0));
    lcdText(10, 195, buf, C_YELLOW, 2);
  }
  setColor(0, 255, 0);
}
void loop() { delay(10000); }
""",

"G04": """// [WiFi LED] 연결 상태를 LED 색상으로 표시
#include <WiFi.h>
int phase = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "WiFi LED", C_CYAN, 2);
  WiFi.mode(WIFI_STA);
}
void loop() {
  setColor(255, 255, 0);
  lcdText(10, 50, "Scanning...", C_YELLOW, 2);
  int n = WiFi.scanNetworks();
  lcd.fillRect(0, 50, 172, 30, C_BG);
  if (n > 0) {
    int rssi = WiFi.RSSI(0);
    if (rssi > -50) {
      setColor(0, 255, 0);
      lcdText(10, 50, "Strong!", C_GREEN, 2);
    } else if (rssi > -70) {
      setColor(255, 165, 0);
      lcdText(10, 50, "Medium", C_YELLOW, 2);
    } else {
      setColor(255, 0, 0);
      lcdText(10, 50, "Weak", C_RED, 2);
    }
    char buf[32];
    snprintf(buf, sizeof(buf), "%s %ddBm", WiFi.SSID(0).c_str(), rssi);
    lcd.fillRect(0, 80, 172, 20, C_BG);
    lcdText(5, 80, buf, C_TEXT, 1);
  } else {
    setColor(255, 0, 0);
    lcdText(10, 50, "No WiFi", C_RED, 2);
  }
  delay(5000);
}
""",

"G05": """// [최강 WiFi] 가장 강한 신호 강조
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
}
void loop() {
  lcdClear();
  lcdText(10, 5, "Best WiFi", C_CYAN, 2);
  int n = WiFi.scanNetworks();
  if (n == 0) {
    lcdText(10, 60, "No networks", C_RED, 2);
    delay(3000);
    return;
  }
  int bestIdx = 0;
  for (int i = 1; i < n; i++) {
    if (WiFi.RSSI(i) > WiFi.RSSI(bestIdx)) bestIdx = i;
  }
  lcd.fillRect(5, 30, 162, 60, lcd.color565(0, 40, 0));
  lcd.drawRect(5, 30, 162, 60, C_GREEN);
  String best = WiFi.SSID(bestIdx);
  if (best.length() > 14) best = best.substring(0, 14);
  lcdText(15, 38, best.c_str(), C_GREEN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "%d dBm  BEST", WiFi.RSSI(bestIdx));
  lcdText(15, 62, buf, C_YELLOW, 2);
  setColor(0, 255, 0);
  int maxShow = (n > 6) ? 6 : n;
  for (int i = 0; i < maxShow; i++) {
    uint16_t c = (i == bestIdx) ? C_GREEN : C_GRAY;
    String ssid = WiFi.SSID(i);
    if (ssid.length() > 12) ssid = ssid.substring(0, 12);
    snprintf(buf, sizeof(buf), "%ddBm", WiFi.RSSI(i));
    lcdText(5, 100 + i * 18, ssid.c_str(), c, 1);
    lcdText(110, 100 + i * 18, buf, c, 1);
  }
  delay(5000);
}
""",

"G06": """// [웹서버] WiFi 웹 서버로 LED 제어
#include <WiFi.h>
#include <WebServer.h>
WebServer server(80);
bool apStarted = false;
void handleRoot() {
  String html = "<html><body style='text-align:center;font-size:24px;'>";
  html += "<h2>UTTEC LED</h2>";
  html += "<a href='/red'><button style='background:red;color:white;padding:20px;margin:5px;'>RED</button></a><br>";
  html += "<a href='/green'><button style='background:green;color:white;padding:20px;margin:5px;'>GREEN</button></a><br>";
  html += "<a href='/blue'><button style='background:blue;color:white;padding:20px;margin:5px;'>BLUE</button></a><br>";
  html += "<a href='/off'><button style='background:gray;color:white;padding:20px;margin:5px;'>OFF</button></a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Web Server", C_CYAN, 2);
  lcdText(10, 40, "Starting AP..", C_YELLOW, 2);
  WiFi.softAP("UTTEC-LED", "12345678");
  delay(500);
  IPAddress ip = WiFi.softAPIP();
  lcdClear();
  lcdText(10, 10, "Web Server", C_CYAN, 2);
  lcdText(10, 40, "AP: UTTEC-LED", C_GREEN, 2);
  lcdText(10, 65, "PW: 12345678", C_TEXT, 1);
  char buf[32];
  snprintf(buf, sizeof(buf), "%s", ip.toString().c_str());
  lcdText(10, 90, buf, C_YELLOW, 2);
  server.on("/", handleRoot);
  server.on("/red", []() { setColor(255, 0, 0); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/green", []() { setColor(0, 255, 0); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/blue", []() { setColor(0, 0, 255); server.sendHeader("Location", "/"); server.send(302); });
  server.on("/off", []() { ledOff(); server.sendHeader("Location", "/"); server.send(302); });
  server.begin();
  setColor(0, 30, 0);
}
void loop() { server.handleClient(); delay(2); }
""",

"H01": """// [LED+LCD 빨강] 동시에 빨간색 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcd.fillScreen(C_RED);
  lcdText(20, 100, "RED", C_TEXT, 4);
  lcdText(20, 160, "LED + LCD", C_YELLOW, 2);
  setColor(255, 0, 0);
}
void loop() { delay(10000); }
""",

"H02": """// [LED 색상 텍스트] LED 색상명을 LCD에 표시
struct ColorInfo { const char* name; uint8_t r, g, b; uint16_t lcdColor; };
ColorInfo colors[] = {
  {"RED", 255, 0, 0, 0xF800}, {"GREEN", 0, 255, 0, 0x07E0},
  {"BLUE", 0, 0, 255, 0x001F}, {"YELLOW", 255, 255, 0, 0xFFE0},
  {"CYAN", 0, 255, 255, 0x07FF}, {"PURPLE", 128, 0, 255, 0x780F},
  {"ORANGE", 255, 128, 0, 0xFD20}, {"WHITE", 255, 255, 255, 0xFFFF}
};
int idx = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  ColorInfo& c = colors[idx];
  setColor(c.r, c.g, c.b);
  lcdClear();
  lcdText(10, 10, "LED Color:", C_GRAY, 2);
  lcdText(10, 60, c.name, c.lcdColor, 4);
  char buf[32];
  snprintf(buf, sizeof(buf), "R:%d G:%d B:%d", c.r, c.g, c.b);
  lcdText(10, 130, buf, C_TEXT, 2);
  idx = (idx + 1) % 8;
  delay(2000);
}
""",

"H03": """// [무지개+코드] LED 무지개 + LCD RGB 값 표시
uint16_t hue = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  hue += 256;
  if (hue >= 65536) hue = 0;
  uint32_t c = pixel.ColorHSV(hue, 255, 128);
  uint8_t r = (c >> 16) & 0xFF, g = (c >> 8) & 0xFF, b = c & 0xFF;
  setColor(r, g, b);
  lcd.fillRect(0, 0, 172, 160, C_BG);
  lcdText(10, 10, "Rainbow", C_TEXT, 2);
  lcd.fillRect(20, 40, 132, 40, lcd.color565(r, g, b));
  char buf[32];
  snprintf(buf, sizeof(buf), "R: %3d", r); lcdText(20, 95, buf, C_RED, 2);
  snprintf(buf, sizeof(buf), "G: %3d", g); lcdText(20, 115, buf, C_GREEN, 2);
  snprintf(buf, sizeof(buf), "B: %3d", b); lcdText(20, 135, buf, C_BLUE, 2);
  snprintf(buf, sizeof(buf), "HUE: %5d", hue); lcdText(10, 165, buf, C_YELLOW, 1);
  delay(50);
}
""",

"H04": """// [밝기 슬라이더] LED 밝기를 LCD 바로 표시
int bright = 0;
int dir = 2;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Brightness", C_CYAN, 2);
}
void loop() {
  bright += dir;
  if (bright >= 255) { bright = 255; dir = -2; }
  if (bright <= 0) { bright = 0; dir = 2; }
  pixel.setBrightness(bright);
  setColor(0, 0, 255);
  int barW = bright * 140 / 255;
  lcd.fillRect(16, 80, barW, 30, C_BLUE);
  lcd.fillRect(16 + barW, 80, 140 - barW, 30, C_GRAY);
  lcd.drawRect(16, 80, 140, 30, C_TEXT);
  char buf[16];
  snprintf(buf, sizeof(buf), "%3d / 255", bright);
  lcd.fillRect(0, 130, 172, 20, C_BG);
  lcdText(30, 130, buf, C_TEXT, 2);
  delay(20);
}
""",

"H05": """// [경찰차+경고] LED 사이렌 + LCD 경고
int phase = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  if (phase % 2 == 0) {
    setColor(255, 0, 0);
    lcd.fillScreen(C_RED);
    lcdText(10, 80, "WARNING!", C_TEXT, 3);
    lcdText(10, 130, "POLICE", C_YELLOW, 3);
  } else {
    setColor(0, 0, 255);
    lcd.fillScreen(C_BLUE);
    lcdText(10, 80, "WARNING!", C_TEXT, 3);
    lcdText(10, 130, "POLICE", C_YELLOW, 3);
  }
  phase++;
  delay(300);
}
""",

"H06": """// [색상 순환] LCD 색상이름 표시 + LED 동기화
struct CInfo { const char* name; uint8_t r, g, b; uint16_t c565; };
CInfo clist[] = {
  {"RED",255,0,0,0xF800}, {"GREEN",0,255,0,0x07E0}, {"BLUE",0,0,255,0x001F},
  {"YELLOW",255,255,0,0xFFE0}, {"CYAN",0,255,255,0x07FF}, {"PURPLE",128,0,255,0x780F},
  {"ORANGE",255,128,0,0xFD20}, {"WHITE",255,255,255,0xFFFF}
};
int ci = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
}
void loop() {
  CInfo& c = clist[ci];
  setColor(c.r, c.g, c.b);
  lcdClear();
  lcd.fillRect(10, 10, 152, 80, c.c565);
  lcdText(20, 110, c.name, c.c565, 3);
  char buf[32];
  snprintf(buf, sizeof(buf), "RGB(%d,%d,%d)", c.r, c.g, c.b);
  lcdText(5, 160, buf, C_TEXT, 1);
  snprintf(buf, sizeof(buf), "#%02X%02X%02X", c.r, c.g, c.b);
  lcdText(20, 190, buf, C_YELLOW, 2);
  ci = (ci + 1) % 8;
  delay(3000);
}
""",

"I01": """// [디지털시계] LCD에 시:분:초 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 10, "Clock", C_CYAN, 3);
  lcd.drawLine(0, 45, 172, 45, C_GRAY);
}
void loop() {
  unsigned long t = millis() / 1000;
  int h = (t / 3600) % 24;
  int m = (t / 60) % 60;
  int s = t % 60;
  char buf[16];
  snprintf(buf, sizeof(buf), "%02d:%02d:%02d", h, m, s);
  lcd.fillRect(0, 80, 172, 60, C_BG);
  lcdText(10, 90, buf, C_GREEN, 4);
  snprintf(buf, sizeof(buf), "%lu sec", t);
  lcd.fillRect(0, 180, 172, 20, C_BG);
  lcdText(20, 180, buf, C_GRAY, 2);
  delay(1000);
}
""",

"I02": """// [스톱워치] 버튼으로 시작/정지
unsigned long startTime = 0;
unsigned long elapsed = 0;
bool running = false;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Stopwatch", C_CYAN, 2);
  lcdText(10, 250, "BTN: Start/Stop", C_GRAY, 1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    if (!running) {
      running = true;
      startTime = millis() - elapsed;
      setColor(0, 255, 0);
    } else {
      running = false;
      elapsed = millis() - startTime;
      setColor(255, 0, 0);
    }
  }
  lastBtn = btn;
  unsigned long t = running ? (millis() - startTime) : elapsed;
  int m = (t / 60000) % 60;
  int s = (t / 1000) % 60;
  int ms = (t % 1000) / 10;
  char buf[16];
  snprintf(buf, sizeof(buf), "%02d:%02d.%02d", m, s, ms);
  lcd.fillRect(0, 80, 172, 60, C_BG);
  lcdText(5, 90, buf, running ? C_GREEN : C_RED, 4);
  lcdText(40, 160, running ? "RUNNING" : "STOPPED", running ? C_GREEN : C_RED, 2);
  delay(30);
}
""",

"I03": """// [반응속도] 색상 변화에 반응하는 게임
enum State { WAIT, READY, GO, RESULT };
State state = WAIT;
unsigned long goTime = 0, nextTime = 0;
bool lastBtn = HIGH;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "Reaction!", C_CYAN, 3);
  lcdText(10, 60, "Press button", C_TEXT, 2);
  lcdText(10, 85, "to start", C_TEXT, 2);
  state = WAIT;
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  bool pressed = (btn && lastBtn == HIGH);
  lastBtn = btn ? LOW : HIGH;
  switch (state) {
    case WAIT:
      if (pressed) {
        state = READY;
        nextTime = millis() + random(2000, 5000);
        lcdClear();
        lcdText(10, 100, "Wait...", C_YELLOW, 3);
        setColor(255, 0, 0);
      }
      break;
    case READY:
      if (pressed) {
        lcdClear();
        lcdText(10, 100, "Too early!", C_RED, 3);
        state = WAIT;
        delay(1500);
        lcdClear();
        lcdText(10, 60, "Press button", C_TEXT, 2);
      } else if (millis() >= nextTime) {
        state = GO;
        goTime = millis();
        lcd.fillScreen(C_GREEN);
        lcdText(10, 100, "NOW!", C_BG, 4);
        setColor(0, 255, 0);
      }
      break;
    case GO:
      if (pressed) {
        unsigned long react = millis() - goTime;
        lcdClear();
        char buf[32];
        snprintf(buf, sizeof(buf), "%lu ms", react);
        lcdText(10, 60, "Time:", C_TEXT, 2);
        lcdText(10, 100, buf, C_GREEN, 4);
        if (react < 300) lcdText(10, 170, "Amazing!", C_CYAN, 2);
        else if (react < 500) lcdText(10, 170, "Good!", C_YELLOW, 2);
        else lcdText(10, 170, "Try again", C_RED, 2);
        state = RESULT;
      }
      break;
    case RESULT:
      if (pressed) {
        state = WAIT;
        lcdClear();
        lcdText(10, 60, "Press button", C_TEXT, 2);
        ledOff();
      }
      break;
  }
  delay(10);
}
""",

"I04": """// [가위바위보] 버튼으로 선택하는 게임
const char* choices[] = {"Rock", "Scissors", "Paper"};
uint16_t choiceColors[] = {C_RED, C_BLUE, C_GREEN};
int playerChoice = 0;
bool selecting = true;
bool lastBtn = HIGH;
void drawSelect() {
  lcdClear();
  lcdText(10, 10, "Rock Paper", C_CYAN, 2);
  lcdText(10, 35, "Scissors!", C_CYAN, 2);
  for (int i = 0; i < 3; i++) {
    uint16_t c = (i == playerChoice) ? choiceColors[i] : C_GRAY;
    char buf[20];
    snprintf(buf, sizeof(buf), "%s %s", (i == playerChoice) ? ">" : " ", choices[i]);
    lcdText(20, 80 + i * 35, buf, c, 2);
  }
  lcdText(5, 230, "Short:Move Long:OK", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  drawSelect();
}
unsigned long pressStart = 0;
bool pressing = false;
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (selecting) {
      if (dur > 400) {
        int cpu = random(0, 3);
        lcdClear();
        lcdText(10, 20, "You:", C_TEXT, 2);
        lcdText(10, 50, choices[playerChoice], choiceColors[playerChoice], 3);
        lcdText(10, 100, "CPU:", C_TEXT, 2);
        lcdText(10, 130, choices[cpu], choiceColors[cpu], 3);
        int result = (playerChoice - cpu + 3) % 3;
        if (result == 0) { lcdText(10, 200, "DRAW!", C_YELLOW, 3); setColor(255, 255, 0); }
        else if (result == 1) { lcdText(10, 200, "YOU WIN!", C_GREEN, 3); setColor(0, 255, 0); }
        else { lcdText(10, 200, "YOU LOSE", C_RED, 3); setColor(255, 0, 0); }
        selecting = false;
      } else {
        playerChoice = (playerChoice + 1) % 3;
        drawSelect();
      }
    } else {
      selecting = true;
      playerChoice = 0;
      drawSelect();
      ledOff();
    }
  }
  delay(20);
}
""",

"I05": """// [주사위] 버튼으로 굴리기
bool lastBtn = HIGH;
void drawDie(int val) {
  int cx = 86, cy = 140, sz = 60;
  lcd.fillRect(cx - sz, cy - sz, sz * 2, sz * 2, C_TEXT);
  lcd.drawRect(cx - sz, cy - sz, sz * 2, sz * 2, C_GRAY);
  int r = 8;
  if (val == 1 || val == 3 || val == 5) lcd.fillCircle(cx, cy, r, C_BG);
  if (val >= 2) { lcd.fillCircle(cx - 30, cy - 30, r, C_BG); lcd.fillCircle(cx + 30, cy + 30, r, C_BG); }
  if (val >= 4) { lcd.fillCircle(cx + 30, cy - 30, r, C_BG); lcd.fillCircle(cx - 30, cy + 30, r, C_BG); }
  if (val == 6) { lcd.fillCircle(cx - 30, cy, r, C_BG); lcd.fillCircle(cx + 30, cy, r, C_BG); }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  lcdClear();
  lcdText(20, 10, "Dice", C_CYAN, 3);
  lcdText(10, 250, "Press to roll!", C_GRAY, 2);
  drawDie(1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    for (int i = 0; i < 10; i++) {
      int v = random(1, 7);
      drawDie(v);
      delay(80 + i * 20);
    }
    int val = random(1, 7);
    drawDie(val);
    char buf[16];
    snprintf(buf, sizeof(buf), "= %d =", val);
    lcd.fillRect(0, 230, 172, 20, C_BG);
    lcdText(50, 230, buf, C_GREEN, 2);
    setColor(val * 40, 255 - val * 30, val * 20);
  }
  lastBtn = btn;
  delay(30);
}
""",

"I06": """// [틱택토] LCD에 게임 보드 표시
int board[9] = {0};
int cursor = 0;
bool playerX = true;
bool lastBtn = HIGH;
unsigned long pressStart = 0;
bool pressing = false;
void drawBoard() {
  lcdClear();
  lcdText(20, 5, "Tic-Tac-Toe", C_CYAN, 2);
  int ox = 11, oy = 40, sz = 50;
  for (int i = 1; i < 3; i++) {
    lcd.drawLine(ox + i * sz, oy, ox + i * sz, oy + 3 * sz, C_TEXT);
    lcd.drawLine(ox, oy + i * sz, ox + 3 * sz, oy + i * sz, C_TEXT);
  }
  for (int i = 0; i < 9; i++) {
    int cx = ox + (i % 3) * sz + sz / 2;
    int cy = oy + (i / 3) * sz + sz / 2;
    if (i == cursor) lcd.drawRect(ox + (i % 3) * sz + 2, oy + (i / 3) * sz + 2, sz - 4, sz - 4, C_YELLOW);
    if (board[i] == 1) { lcdText(cx - 9, cy - 9, "X", C_RED, 3); }
    else if (board[i] == 2) { lcdText(cx - 9, cy - 9, "O", C_BLUE, 3); }
  }
  lcdText(5, 210, playerX ? "X turn" : "O turn", playerX ? C_RED : C_BLUE, 2);
  lcdText(5, 240, "Short:Move", C_GRAY, 1);
  lcdText(5, 255, "Long: Place", C_GRAY, 1);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawBoard();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (dur > 400 && board[cursor] == 0) {
      board[cursor] = playerX ? 1 : 2;
      playerX = !playerX;
    } else if (dur <= 400) {
      cursor = (cursor + 1) % 9;
    }
    drawBoard();
  }
  delay(20);
}
""",

"I07": """// [벽돌깨기] 미니 아케이드 게임
int paddleX = 70;
int ballX = 86, ballY = 250;
int ballDX = 2, ballDY = -2;
uint8_t bricks[3][5];
bool lastBtn = HIGH;
bool gameOver = false;
void initBricks() {
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      bricks[r][c] = 1;
}
void drawGame() {
  lcd.fillScreen(C_BG);
  uint16_t brickColors[] = {C_RED, C_YELLOW, C_GREEN};
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      if (bricks[r][c])
        lcd.fillRect(c * 34 + 2, r * 18 + 10, 30, 14, brickColors[r]);
  lcd.fillRect(paddleX, 290, 32, 6, C_CYAN);
  lcd.fillCircle(ballX, ballY, 4, C_TEXT);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  initBricks();
  drawGame();
}
void loop() {
  if (gameOver) { delay(100); return; }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) paddleX += 20;
  if (paddleX > 140) paddleX = 0;
  lastBtn = btn;
  ballX += ballDX; ballY += ballDY;
  if (ballX <= 4 || ballX >= 168) ballDX = -ballDX;
  if (ballY <= 4) ballDY = -ballDY;
  if (ballY >= 288 && ballX >= paddleX && ballX <= paddleX + 32) ballDY = -ballDY;
  if (ballY > 310) {
    gameOver = true;
    lcdClear();
    lcdText(20, 120, "GAME OVER", C_RED, 3);
    setColor(255, 0, 0);
    return;
  }
  for (int r = 0; r < 3; r++)
    for (int c = 0; c < 5; c++)
      if (bricks[r][c]) {
        int bx = c * 34 + 2, by = r * 18 + 10;
        if (ballX > bx && ballX < bx + 30 && ballY > by && ballY < by + 14) {
          bricks[r][c] = 0;
          ballDY = -ballDY;
        }
      }
  drawGame();
  delay(30);
}
""",

"I08": """// [뱀 게임] LCD 스네이크 게임
#define GS 10
#define GW 17
#define GH 28
int snakeX[100], snakeY[100];
int snakeLen = 3;
int dir = 0;
int foodX, foodY;
bool gameOver = false;
bool lastBtn = HIGH;
int score = 0;
void placeFood() {
  foodX = random(0, GW);
  foodY = random(2, GH);
}
void drawCell(int gx, int gy, uint16_t c) {
  lcd.fillRect(gx * GS + 1, gy * GS + 1, GS - 2, GS - 2, c);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  snakeX[0] = 8; snakeY[0] = 14;
  snakeX[1] = 7; snakeY[1] = 14;
  snakeX[2] = 6; snakeY[2] = 14;
  placeFood();
  lcdClear();
  lcdText(10, 2, "Snake", C_CYAN, 1);
}
void loop() {
  if (gameOver) { delay(100); return; }
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) dir = (dir + 1) % 4;
  lastBtn = btn;
  int nx = snakeX[0], ny = snakeY[0];
  if (dir == 0) nx++; else if (dir == 1) ny++; else if (dir == 2) nx--; else ny--;
  if (nx < 0 || nx >= GW || ny < 2 || ny >= GH) {
    gameOver = true;
    lcdText(10, 130, "GAME OVER", C_RED, 2);
    char buf[16]; snprintf(buf, sizeof(buf), "Score:%d", score);
    lcdText(20, 160, buf, C_YELLOW, 2);
    setColor(255, 0, 0);
    return;
  }
  for (int i = 0; i < snakeLen; i++)
    if (snakeX[i] == nx && snakeY[i] == ny) { gameOver = true; return; }
  bool ate = (nx == foodX && ny == foodY);
  if (!ate) { drawCell(snakeX[snakeLen - 1], snakeY[snakeLen - 1], C_BG); }
  for (int i = ate ? snakeLen : snakeLen - 1; i > 0; i--) {
    snakeX[i] = snakeX[i - 1]; snakeY[i] = snakeY[i - 1];
  }
  snakeX[0] = nx; snakeY[0] = ny;
  if (ate) { snakeLen++; score++; placeFood(); setColor(0, 255, 0); }
  for (int i = 0; i < snakeLen; i++)
    drawCell(snakeX[i], snakeY[i], (i == 0) ? C_GREEN : C_CYAN);
  drawCell(foodX, foodY, C_RED);
  char buf[16]; snprintf(buf, sizeof(buf), "S:%d", score);
  lcd.fillRect(100, 0, 72, 12, C_BG);
  lcdText(100, 2, buf, C_YELLOW, 1);
  delay(150);
}
""",

"J01": """// [BLE LED] 스마트폰에서 LED 색상 제어
void onBleReceive(String cmd) {
  if (cmd == "RED") { setColor(255, 0, 0); lcdText(10, 100, "RED   ", C_RED, 3); }
  else if (cmd == "GREEN") { setColor(0, 255, 0); lcdText(10, 100, "GREEN ", C_GREEN, 3); }
  else if (cmd == "BLUE") { setColor(0, 0, 255); lcdText(10, 100, "BLUE  ", C_BLUE, 3); }
  else if (cmd == "OFF") { ledOff(); lcdText(10, 100, "OFF   ", C_GRAY, 3); }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE LED", C_CYAN, 2);
  lcdText(10, 40, "Send color:", C_TEXT, 2);
  lcdText(10, 65, "RED/GREEN/", C_GRAY, 1);
  lcdText(10, 80, "BLUE/OFF", C_GRAY, 1);
}
void loop() { delay(10000); }
""",

"J02": """// [BLE 메시지] 수신 메시지를 LCD에 표시
int msgY = 60;
void onBleReceive(String cmd) {
  if (msgY > 280) { lcdClear(); lcdText(10, 10, "BLE Message", C_CYAN, 2); msgY = 60; }
  lcdText(10, msgY, cmd.c_str(), C_GREEN, 2);
  msgY += 25;
  setColor(0, 100, 0);
  delay(200);
  ledOff();
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Message", C_CYAN, 2);
  lcdText(10, 40, "Waiting...", C_GRAY, 2);
}
void loop() { delay(10000); }
""",

"J03": """// [BLE 배경색] 원격으로 LCD 배경색 변경
void onBleReceive(String cmd) {
  cmd.toUpperCase();
  if (cmd == "RED") lcd.fillScreen(C_RED);
  else if (cmd == "GREEN") lcd.fillScreen(C_GREEN);
  else if (cmd == "BLUE") lcd.fillScreen(C_BLUE);
  else if (cmd == "YELLOW") lcd.fillScreen(C_YELLOW);
  else if (cmd == "BLACK") lcd.fillScreen(C_BG);
  else if (cmd == "WHITE") lcd.fillScreen(C_TEXT);
  else return;
  lcdText(20, 140, cmd.c_str(), C_BG, 3);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE BG Color", C_CYAN, 2);
  lcdText(10, 50, "Send color", C_TEXT, 2);
  lcdText(10, 75, "name via BLE", C_TEXT, 2);
}
void loop() { delay(10000); }
""",

"J04": """// [BLE 상태] 연결 상태를 LCD에 실시간 표시
unsigned long lastUpdate = 0;
int counter = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Status", C_CYAN, 2);
}
void loop() {
  if (millis() - lastUpdate > 1000) {
    lastUpdate = millis();
    counter++;
    lcd.fillRect(0, 60, 172, 200, C_BG);
    if (deviceConnected) {
      lcdText(10, 60, "Connected", C_GREEN, 3);
      setColor(0, 255, 0);
      lcd.fillCircle(86, 160, 30, C_GREEN);
      char buf[16];
      snprintf(buf, sizeof(buf), "Time: %ds", counter);
      lcdText(10, 220, buf, C_TEXT, 2);
    } else {
      lcdText(10, 60, "Waiting..", C_RED, 3);
      if (counter % 2) setColor(0, 0, 30); else ledOff();
      lcd.drawCircle(86, 160, 30, C_RED);
      lcdText(20, 220, "Connect via", C_GRAY, 2);
      lcdText(20, 245, "UTTEC App", C_GRAY, 2);
    }
  }
  delay(100);
}
""",

"J05": """// [BLE 버튼] 버튼 이벤트를 스마트폰에 전송
bool lastBtn = HIGH;
int pressCount = 0;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Button", C_CYAN, 2);
  lcdText(10, 40, "Press BOOT btn", C_TEXT, 2);
  lcdText(10, 65, "to send event", C_TEXT, 2);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    pressCount++;
    if (deviceConnected && sensorChar) {
      char buf[32];
      snprintf(buf, sizeof(buf), "BTN:%d", pressCount);
      std::string s(buf);
      sensorChar->setValue(s);
      sensorChar->notify();
    }
    setColor(0, 255, 0);
    lcd.fillRect(0, 120, 172, 60, C_BG);
    char buf[32];
    snprintf(buf, sizeof(buf), "Press #%d", pressCount);
    lcdText(10, 130, buf, C_GREEN, 3);
    lcdText(10, 190, deviceConnected ? "Sent!" : "No BLE", deviceConnected ? C_GREEN : C_RED, 2);
  }
  if (btn == HIGH && lastBtn == LOW) ledOff();
  lastBtn = btn;
  delay(30);
}
""",

"J06": """// [BLE 리모컨] LED + LCD 동시 원격 제어
void onBleReceive(String cmd) {
  lcd.fillRect(0, 80, 172, 100, C_BG);
  if (cmd.startsWith("COLOR:")) {
    String hex = cmd.substring(6);
    if (hex.length() == 6) {
      uint32_t c = strtoul(hex.c_str(), NULL, 16);
      uint8_t r = (c >> 16) & 0xFF, g = (c >> 8) & 0xFF, b = c & 0xFF;
      setColor(r, g, b);
      lcd.fillRect(20, 90, 132, 50, lcd.color565(r, g, b));
      char buf[32];
      snprintf(buf, sizeof(buf), "#%s", hex.c_str());
      lcdText(30, 150, buf, C_TEXT, 2);
    }
  } else if (cmd.startsWith("TEXT:")) {
    String text = cmd.substring(5);
    lcdText(10, 100, text.c_str(), C_GREEN, 2);
  } else if (cmd == "CLEAR") {
    lcdClear();
    lcdText(10, 10, "BLE Remote", C_CYAN, 2);
    ledOff();
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "BLE Remote", C_CYAN, 2);
  lcdText(10, 40, "COLOR:RRGGBB", C_GRAY, 1);
  lcdText(10, 55, "TEXT:message", C_GRAY, 1);
  lcdText(10, 70, "CLEAR", C_GRAY, 1);
}
void loop() { delay(10000); }
""",

"K01": """// [대시보드] 시간+LED+WiFi 종합 표시
#include <WiFi.h>
int ledR = 0, ledG = 0, ledB = 30;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
  setColor(ledR, ledG, ledB);
}
void loop() {
  lcdClear();
  lcdText(5, 5, "DASHBOARD", C_CYAN, 2);
  lcd.drawLine(0, 25, 172, 25, C_GRAY);
  unsigned long t = millis() / 1000;
  char buf[32];
  snprintf(buf, sizeof(buf), "%02lu:%02lu:%02lu", (t/3600)%24, (t/60)%60, t%60);
  lcdText(10, 35, buf, C_GREEN, 3);
  lcd.drawLine(0, 75, 172, 75, C_GRAY);
  lcdText(5, 80, "LED:", C_TEXT, 1);
  snprintf(buf, sizeof(buf), "R:%d G:%d B:%d", ledR, ledG, ledB);
  lcdText(5, 95, buf, C_YELLOW, 1);
  lcd.fillRect(5, 110, 20, 20, lcd.color565(ledR, ledG, ledB));
  lcd.drawLine(0, 140, 172, 140, C_GRAY);
  lcdText(5, 145, "WiFi:", C_TEXT, 1);
  int n = WiFi.scanNetworks(false, false, false, 100);
  snprintf(buf, sizeof(buf), "%d networks", n);
  lcdText(5, 160, buf, C_GREEN, 1);
  if (n > 0) {
    snprintf(buf, sizeof(buf), "Best: %ddBm", WiFi.RSSI(0));
    lcdText(5, 175, buf, C_YELLOW, 1);
  }
  lcd.drawLine(0, 195, 172, 195, C_GRAY);
  lcdText(5, 200, "BLE:", C_TEXT, 1);
  lcdText(5, 215, deviceConnected ? "Connected" : "Waiting", deviceConnected ? C_GREEN : C_GRAY, 1);
  snprintf(buf, sizeof(buf), "Uptime: %lus", t);
  lcdText(5, 250, buf, C_GRAY, 1);
  delay(3000);
}
""",

"K02": """// [날씨 위젯] 가상 데이터로 날씨 표시
struct Weather { const char* day; int temp; const char* desc; uint16_t color; };
Weather forecast[] = {
  {"MON", 22, "Sunny", 0xFFE0}, {"TUE", 18, "Cloudy", 0x7BEF},
  {"WED", 15, "Rain", 0x001F}, {"THU", 20, "Clear", 0x07FF},
  {"FRI", 24, "Hot", 0xF800}
};
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 5, "Weather", C_CYAN, 3);
  lcd.drawLine(0, 35, 172, 35, C_GRAY);
  int currentTemp = 22;
  char buf[32];
  snprintf(buf, sizeof(buf), "%dC", currentTemp);
  lcdText(20, 45, buf, C_GREEN, 4);
  lcdText(20, 95, "Sunny", C_YELLOW, 2);
  lcd.drawLine(0, 125, 172, 125, C_GRAY);
  lcdText(5, 130, "5-Day Forecast", C_TEXT, 1);
  for (int i = 0; i < 5; i++) {
    int y = 150 + i * 28;
    lcdText(5, y, forecast[i].day, C_TEXT, 2);
    snprintf(buf, sizeof(buf), "%dC", forecast[i].temp);
    lcdText(60, y, buf, forecast[i].color, 2);
    lcdText(105, y, forecast[i].desc, C_GRAY, 1);
  }
  setColor(30, 30, 0);
}
void loop() { delay(10000); }
""",

"K03": """// [포토프레임] 컬러 도형 슬라이드쇼
int slide = 0;
void drawSlide0() {
  lcd.fillScreen(lcd.color565(0, 0, 60));
  for (int i = 0; i < 8; i++)
    lcd.fillCircle(random(10, 162), random(10, 310), random(10, 30), lcd.color565(random(256), random(256), random(256)));
}
void drawSlide1() {
  lcd.fillScreen(C_BG);
  for (int i = 0; i < 6; i++)
    lcd.fillRect(random(0, 120), random(0, 260), random(20, 60), random(20, 60), lcd.color565(random(256), random(256), random(256)));
}
void drawSlide2() {
  for (int y = 0; y < 320; y += 4) {
    uint16_t c = lcd.color565(y * 200 / 320, 100, 255 - y * 200 / 320);
    lcd.fillRect(0, y, 172, 4, c);
  }
  lcdText(20, 140, "ART", C_TEXT, 4);
}
void drawSlide3() {
  lcd.fillScreen(C_BG);
  for (int i = 0; i < 20; i++) {
    int x1 = random(172), y1 = random(320), x2 = random(172), y2 = random(320);
    lcd.drawLine(x1, y1, x2, y2, lcd.color565(random(256), random(256), random(256)));
  }
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
}
void loop() {
  switch (slide % 4) {
    case 0: drawSlide0(); break;
    case 1: drawSlide1(); break;
    case 2: drawSlide2(); break;
    case 3: drawSlide3(); break;
  }
  slide++;
  setColor(random(50), random(50), random(50));
  delay(3000);
}
""",

"K04": """// [종합 제어] BLE + WiFi + LED + LCD
#include <WiFi.h>
int mode = 0;
void onBleReceive(String cmd) {
  if (cmd == "MODE1") mode = 1;
  else if (cmd == "MODE2") mode = 2;
  else if (cmd == "MODE3") mode = 3;
  else if (cmd == "MODE0") mode = 0;
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
}
void loop() {
  lcdClear();
  switch (mode) {
    case 0:
      lcdText(10, 10, "System Ready", C_CYAN, 2);
      lcdText(10, 40, "BLE: Send MODE", C_TEXT, 1);
      lcdText(10, 55, "1=LED 2=WiFi", C_GRAY, 1);
      lcdText(10, 70, "3=Info 0=Home", C_GRAY, 1);
      setColor(0, 0, 30);
      break;
    case 1: {
      lcdText(10, 10, "LED Mode", C_GREEN, 2);
      uint16_t hue = (millis() / 10) % 65536;
      uint32_t c = pixel.ColorHSV(hue, 255, 128);
      setColor((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
      lcd.fillRect(20, 50, 132, 50, lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      break;
    }
    case 2: {
      lcdText(10, 10, "WiFi Mode", C_YELLOW, 2);
      int n = WiFi.scanNetworks(false, false, false, 100);
      char buf[32];
      snprintf(buf, sizeof(buf), "Found: %d", n);
      lcdText(10, 40, buf, C_GREEN, 2);
      setColor(0, 30, 30);
      break;
    }
    case 3: {
      lcdText(10, 10, "System Info", C_PURPLE, 2);
      char buf[32];
      snprintf(buf, sizeof(buf), "Heap: %u", ESP.getFreeHeap());
      lcdText(10, 40, buf, C_TEXT, 1);
      snprintf(buf, sizeof(buf), "BLE: %s", deviceConnected ? "Yes" : "No");
      lcdText(10, 60, buf, deviceConnected ? C_GREEN : C_RED, 1);
      snprintf(buf, sizeof(buf), "Up: %lus", millis() / 1000);
      lcdText(10, 80, buf, C_YELLOW, 1);
      setColor(30, 0, 30);
      break;
    }
  }
  delay(500);
}
""",

"K05": """// [미니 OS] 메뉴와 여러 앱이 있는 시스템
int app = 0;
bool lastBtn = HIGH;
unsigned long pressStart = 0;
bool pressing = false;
void drawMenu() {
  lcdClear();
  lcdText(10, 5, "UTTEC OS", C_CYAN, 2);
  lcd.drawLine(0, 28, 172, 28, C_GRAY);
  const char* apps[] = {"Clock", "LED Test", "Counter", "Info"};
  uint16_t cols[] = {C_GREEN, C_RED, C_YELLOW, C_BLUE};
  for (int i = 0; i < 4; i++) {
    int y = 40 + i * 55;
    uint16_t c = (i == app) ? cols[i] : C_GRAY;
    lcd.drawRect(10, y, 152, 45, c);
    if (i == app) lcd.fillRect(11, y + 1, 150, 43, lcd.color565(20, 20, 40));
    lcdText(25, y + 12, apps[i], c, 2);
  }
  lcdText(5, 270, "Short:Next", C_GRAY, 1);
  lcdText(5, 285, "Long: Open", C_GRAY, 1);
}
void appClock() {
  lcdClear();
  lcdText(10, 5, "< Clock", C_GRAY, 1);
  while (true) {
    unsigned long t = millis() / 1000;
    char buf[16];
    snprintf(buf, sizeof(buf), "%02lu:%02lu:%02lu", (t/3600)%24, (t/60)%60, t%60);
    lcd.fillRect(0, 80, 172, 60, C_BG);
    lcdText(5, 90, buf, C_GREEN, 4);
    if (digitalRead(9) == LOW) { delay(200); return; }
    delay(500);
  }
}
void appLED() {
  lcdClear();
  lcdText(10, 5, "< LED Test", C_GRAY, 1);
  uint16_t cs[] = {C_RED, C_GREEN, C_BLUE};
  uint8_t rgb[][3] = {{255,0,0},{0,255,0},{0,0,255}};
  for (int i = 0; i < 3; i++) {
    setColor(rgb[i][0], rgb[i][1], rgb[i][2]);
    lcd.fillScreen(cs[i]);
    delay(800);
  }
  ledOff();
}
void appCounter() {
  lcdClear();
  lcdText(10, 5, "< Counter", C_GRAY, 1);
  int cnt = 0;
  bool lb = HIGH;
  while (true) {
    bool b = digitalRead(9);
    if (b == LOW && lb == HIGH) cnt++;
    lb = b;
    char buf[16]; snprintf(buf, sizeof(buf), "%d", cnt);
    lcd.fillRect(0, 100, 172, 60, C_BG);
    lcdText(40, 110, buf, C_YELLOW, 4);
    if (cnt > 20) return;
    delay(30);
  }
}
void appInfo() {
  lcdClear();
  lcdText(10, 5, "< Info", C_GRAY, 1);
  lcdText(10, 40, "UTTEC C6-LCD", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "Heap:%u", ESP.getFreeHeap());
  lcdText(10, 70, buf, C_TEXT, 1);
  snprintf(buf, sizeof(buf), "Up:%lus", millis()/1000);
  lcdText(10, 90, buf, C_TEXT, 1);
  delay(3000);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  drawMenu();
}
void loop() {
  bool btn = digitalRead(9) == LOW;
  if (btn && !pressing) { pressing = true; pressStart = millis(); }
  if (!btn && pressing) {
    pressing = false;
    unsigned long dur = millis() - pressStart;
    if (dur > 400) {
      switch (app) {
        case 0: appClock(); break;
        case 1: appLED(); break;
        case 2: appCounter(); break;
        case 3: appInfo(); break;
      }
      drawMenu();
    } else {
      app = (app + 1) % 4;
      drawMenu();
    }
  }
  delay(20);
}
""",

"K06": """// [주식 차트] 실시간 차트 시뮬레이션
float prices[172];
int priceIdx = 0;
float price = 50000;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(analogRead(0));
  for (int i = 0; i < 172; i++) prices[i] = 50000;
}
void loop() {
  float change = random(-500, 501) + random(-200, 201);
  price += change;
  if (price < 40000) price = 40000;
  if (price > 60000) price = 60000;
  prices[priceIdx] = price;
  priceIdx = (priceIdx + 1) % 172;
  lcdClear();
  lcdText(5, 5, "UTTEC Stock", C_CYAN, 2);
  char buf[32];
  snprintf(buf, sizeof(buf), "%.0f", price);
  uint16_t pc = (change >= 0) ? C_RED : C_BLUE;
  lcdText(5, 28, buf, pc, 3);
  snprintf(buf, sizeof(buf), "%s%.0f", change >= 0 ? "+" : "", change);
  lcdText(100, 35, buf, pc, 1);
  lcd.drawLine(0, 60, 172, 60, C_GRAY);
  lcd.drawLine(0, 280, 172, 280, C_GRAY);
  float minP = 40000, maxP = 60000;
  for (int x = 0; x < 172; x++) {
    int idx = (priceIdx + x) % 172;
    int y = 280 - (int)((prices[idx] - minP) / (maxP - minP) * 218);
    uint16_t c = (prices[idx] >= 50000) ? C_RED : C_BLUE;
    lcd.drawPixel(x, y, c);
    if (y < 280) lcd.drawLine(x, y, x, 280, lcd.color565(30, 30, 30));
  }
  lcd.drawLine(0, 170, 172, 170, lcd.color565(40, 40, 40));
  lcdText(5, 285, "40K", C_GRAY, 1);
  lcdText(70, 285, "50K", C_GRAY, 1);
  lcdText(135, 285, "60K", C_GRAY, 1);
  delay(200);
}
""",

"L01": """// [SD 쓰기] Hello World 텍스트 파일 생성
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Write", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File f = SD.open("/hello.txt", FILE_WRITE);
  if (f) {
    f.println("Hello, World!");
    f.println("UTTEC C6-LCD");
    f.printf("Uptime: %lu ms\\n", millis());
    f.close();
    lcdText(10, 50, "Written!", C_GREEN, 2);
    lcdText(10, 80, "/hello.txt", C_YELLOW, 2);
    File r = SD.open("/hello.txt", FILE_READ);
    if (r) {
      lcdText(10, 120, "Content:", C_TEXT, 2);
      int y = 145;
      while (r.available() && y < 290) {
        String line = r.readStringUntil('\\n');
        lcdText(10, y, line.c_str(), C_GREEN, 1);
        y += 15;
      }
      r.close();
    }
  } else {
    lcdText(10, 50, "Write Fail", C_RED, 2);
  }
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
""",

"L02": """// [SD 읽기] 파일 읽어서 LCD 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Read", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File f = SD.open("/hello.txt", FILE_READ);
  if (!f) {
    lcdText(10, 50, "No file!", C_RED, 2);
    lcdText(10, 75, "Run L01 first", C_GRAY, 1);
    return;
  }
  lcdText(10, 40, "/hello.txt", C_YELLOW, 2);
  lcd.drawLine(0, 60, 172, 60, C_GRAY);
  int y = 70;
  while (f.available() && y < 290) {
    String line = f.readStringUntil('\\n');
    lcdText(5, y, line.c_str(), C_GREEN, 1);
    y += 15;
  }
  char buf[32];
  snprintf(buf, sizeof(buf), "Size: %u bytes", f.size());
  lcdText(10, y + 10, buf, C_GRAY, 1);
  f.close();
  setColor(0, 0, 30);
}
void loop() { delay(10000); }
""",

"L03": """// [SD 목록] 파일/폴더 목록 LCD 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Files", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  File root = SD.open("/");
  if (!root) {
    lcdText(10, 50, "Open Fail", C_RED, 2);
    return;
  }
  lcd.drawLine(0, 35, 172, 35, C_GRAY);
  int y = 40, count = 0;
  File entry;
  while ((entry = root.openNextFile()) && y < 290) {
    char buf[32];
    if (entry.isDirectory()) {
      snprintf(buf, sizeof(buf), "[%s]", entry.name());
      lcdText(5, y, buf, C_YELLOW, 1);
    } else {
      snprintf(buf, sizeof(buf), "%s", entry.name());
      lcdText(5, y, buf, C_GREEN, 1);
      snprintf(buf, sizeof(buf), "%uB", entry.size());
      lcdText(120, y, buf, C_GRAY, 1);
    }
    entry.close();
    y += 15;
    count++;
  }
  root.close();
  char buf[32];
  snprintf(buf, sizeof(buf), "Total: %d items", count);
  lcdText(10, y + 5, buf, C_TEXT, 1);
  setColor(0, 30, 30);
}
void loop() { delay(10000); }
""",

"L04": """// [SD 용량] SD 카드 용량/사용량 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Info", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  uint64_t total = SD.totalBytes();
  uint64_t used = SD.usedBytes();
  uint64_t free_ = total - used;
  float pct = (float)used / total * 100;
  char buf[32];
  lcd.drawLine(0, 35, 172, 35, C_GRAY);
  snprintf(buf, sizeof(buf), "Total: %uMB", (unsigned)(total / 1024 / 1024));
  lcdText(10, 50, buf, C_TEXT, 2);
  snprintf(buf, sizeof(buf), "Used:  %uMB", (unsigned)(used / 1024 / 1024));
  lcdText(10, 80, buf, C_YELLOW, 2);
  snprintf(buf, sizeof(buf), "Free:  %uMB", (unsigned)(free_ / 1024 / 1024));
  lcdText(10, 110, buf, C_GREEN, 2);
  lcd.drawRect(10, 160, 152, 30, C_TEXT);
  int barW = (int)(pct * 148 / 100);
  uint16_t barC = (pct < 70) ? C_GREEN : (pct < 90) ? C_YELLOW : C_RED;
  lcd.fillRect(12, 162, barW, 26, barC);
  snprintf(buf, sizeof(buf), "%.1f%%", pct);
  lcdText(55, 200, buf, C_TEXT, 2);
  lcdText(10, 240, "Card Type:", C_GRAY, 1);
  uint8_t ct = SD.cardType();
  const char* types[] = {"None", "MMC", "SD", "SDHC", "Unknown"};
  int ti = (ct <= 3) ? ct : 4;
  lcdText(80, 240, types[ti], C_YELLOW, 1);
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
""",

"L05": """// [SD 카운터] 버튼 횟수를 SD에 저장
int count = 0;
bool lastBtn = HIGH;
void loadCount() {
  File f = SD.open("/count.txt", FILE_READ);
  if (f) {
    String s = f.readStringUntil('\\n');
    count = s.toInt();
    f.close();
  }
}
void saveCount() {
  File f = SD.open("/count.txt", FILE_WRITE);
  if (f) {
    f.println(count);
    f.close();
  }
}
void showCount() {
  lcd.fillRect(0, 80, 172, 60, C_BG);
  char buf[16];
  snprintf(buf, sizeof(buf), "%d", count);
  lcdText(30, 90, buf, C_GREEN, 4);
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Counter", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    return;
  }
  loadCount();
  lcdText(10, 50, "Saved count:", C_TEXT, 1);
  showCount();
  lcdText(10, 180, "Press to add", C_GRAY, 2);
  lcdText(10, 210, "Persists after", C_GRAY, 1);
  lcdText(10, 225, "power cycle!", C_GRAY, 1);
}
void loop() {
  bool btn = digitalRead(9);
  if (btn == LOW && lastBtn == HIGH) {
    count++;
    saveCount();
    showCount();
    setColor(0, 255, 0);
    delay(100);
    ledOff();
  }
  lastBtn = btn;
  delay(30);
}
""",

"L06": """// [SD CSV] millis 데이터를 CSV로 로깅
unsigned long lastLog = 0;
int logCount = 0;
bool logging = true;
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(10, 10, "SD Logger", C_CYAN, 2);
  if (!SD.begin(4, SPI)) {
    lcdText(10, 50, "SD Failed!", C_RED, 2);
    logging = false;
    return;
  }
  File f = SD.open("/log.csv", FILE_WRITE);
  if (f) {
    f.println("time_ms,seconds,heap,uptime_min");
    f.close();
    lcdText(10, 50, "Logging to", C_GREEN, 2);
    lcdText(10, 75, "/log.csv", C_YELLOW, 2);
  }
}
void loop() {
  if (!logging) { delay(1000); return; }
  if (millis() - lastLog >= 1000) {
    lastLog = millis();
    logCount++;
    File f = SD.open("/log.csv", FILE_APPEND);
    if (f) {
      f.printf("%lu,%d,%u,%.1f\\n", millis(), logCount, ESP.getFreeHeap(), millis() / 60000.0);
      f.close();
    }
    lcd.fillRect(0, 120, 172, 140, C_BG);
    char buf[32];
    snprintf(buf, sizeof(buf), "Logs: %d", logCount);
    lcdText(10, 120, buf, C_GREEN, 2);
    snprintf(buf, sizeof(buf), "Heap: %u", ESP.getFreeHeap());
    lcdText(10, 150, buf, C_TEXT, 1);
    snprintf(buf, sizeof(buf), "Time: %lus", millis() / 1000);
    lcdText(10, 170, buf, C_TEXT, 1);
    if (logCount % 2) setColor(0, 10, 0); else ledOff();
    if (logCount >= 300) {
      logging = false;
      lcdText(10, 210, "Done! 300 logs", C_YELLOW, 2);
    }
  }
  delay(100);
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
            '// onBleReceive: user code provides implementation\n// void onBleReceive(String cmd) {'
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
            bin_path = f
            break
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
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", type=str, help="특정 항목만 (예: B02)")
    parser.add_argument("--from-item", type=str, help="이 항목부터 시작 (예: G01)")
    parser.add_argument("--catalog-only", action="store_true")
    args = parser.parse_args()

    if args.catalog_only:
        generate_catalog()
        return

    FIRMWARE_DB.mkdir(parents=True, exist_ok=True)
    init_build_dir()

    targets = list(CODES.keys())
    if args.only:
        targets = [args.only.upper()]
    elif args.from_item:
        start = args.from_item.upper()
        if start in targets:
            targets = targets[targets.index(start):]

    success, fail = 0, 0
    total = len(targets)
    t_start = time.time()

    for idx, no in enumerate(targets, 1):
        code = CODES.get(no)
        if not code:
            print(f"[{idx}/{total}] {no}: NO CODE - SKIP")
            fail += 1
            continue

        out_dir = FIRMWARE_DB / no
        out_dir.mkdir(parents=True, exist_ok=True)

        # Skip if already built
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
            elapsed = time.time() - t0
            print(f"OK ({sz/1024:.0f}KB, {elapsed:.0f}s)")
            success += 1
        except Exception as e:
            elapsed = time.time() - t0
            print(f"FAIL ({elapsed:.0f}s): {str(e)[:100]}")
            fail += 1

        total_elapsed = time.time() - t_start
        avg = total_elapsed / idx
        eta = avg * (total - idx)
        print(f"  Progress: {idx}/{total} (OK:{success} FAIL:{fail}) ETA: {eta/60:.1f}min")

    generate_catalog()
    total_elapsed = time.time() - t_start
    print(f"\nDone! {success}/{total} OK, {fail} failed, {total_elapsed/60:.1f}min total")


if __name__ == "__main__":
    main()
