#include <NimBLEDevice.h>
#include <Wire.h>
#include <Update.h>
#include "ssd1306.h"

SSD1306 oled(21, 22);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  oled.init();
  oled.clear();
  oled.drawString(0, 0, "Hello, ESP32!");
  oled.drawString(0, 16, "OLED Test OK");
  oled.display();
  initBLE();
}

void loop() {
  delay(1000);
}