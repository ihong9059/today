// [날씨 위젯] 가상 데이터로 날씨 표시
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
