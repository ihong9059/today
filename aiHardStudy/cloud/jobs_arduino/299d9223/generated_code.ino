#include <NimBLEDevice.h>
#include <Wire.h>
#include <Update.h>
#include "ssd1306.h"

#define RED_LED 25

SSD1306 oled(21, 22);

void setup() {
  Serial.begin(115200);
  pinMode(RED_LED, OUTPUT);

  Wire.begin(21, 22);
  oled.init();
  oled.clear();
  oled.drawString(0, 0, "Red LED Blink");
  oled.drawString(0, 16, "300ms interval");
  oled.display();

  initBLE();
}

void loop() {
  digitalWrite(RED_LED, HIGH);
  delay(300);
  digitalWrite(RED_LED, LOW);
  delay(300);
}