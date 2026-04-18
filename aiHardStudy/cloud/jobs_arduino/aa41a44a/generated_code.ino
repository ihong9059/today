#include <NimBLEDevice.h>
#include <Wire.h>
#include <Update.h>
#include "ssd1306.h"

#define RED_LED 25

void setup() {
  pinMode(RED_LED, OUTPUT);
  Wire.begin(21, 22);
  initBLE();
}

void loop() {
  digitalWrite(RED_LED, HIGH);
  delay(500);
  digitalWrite(RED_LED, LOW);
  delay(500);
}