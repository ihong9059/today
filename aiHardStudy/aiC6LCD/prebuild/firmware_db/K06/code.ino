// [주식 차트] 실시간 차트 시뮬레이션
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
