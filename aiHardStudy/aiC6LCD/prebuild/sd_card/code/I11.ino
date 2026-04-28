// [퐁] 버튼으로 패들 이동하여 공 튕기기
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
