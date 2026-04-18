pp
void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  initBLE();

  oled.clear();
  oled.drawString(0, 0, "Hello, World!");
  oled.drawString(0, 16, "ESP32 Ready");
  oled.drawString(0, 32, "OLED Test OK");
  oled.display();
}

void loop() {
  delay(10000);
}