// [우주선 슈팅] 적을 피하고 격추하기
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
