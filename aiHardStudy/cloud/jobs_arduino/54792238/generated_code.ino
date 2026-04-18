#include <NimBLEDevice.h>
#include <Wire.h>
#include <Update.h>
#include "ssd1306.h"

#define BUZZER_PIN 14
#define MELODY_PIN 33

SSD1306 oled(21, 22);

void setup() {
  Serial.begin(115200);
  Wire.begin();
  oled.init();

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, HIGH);

  ledcSetup(0, 2000, 8);
  ledcAttachPin(MELODY_PIN, 0);

  oled.clear();
  oled.drawString(0, 0, "Buzzer Test");
  oled.display();

  initBLE();
}

void loop() {
  // Active buzzer (active LOW) - 0.5s on, 0.5s off
  digitalWrite(BUZZER_PIN, LOW);
  oled.clear();
  oled.drawString(0, 0, "Buzzer: ON");
  oled.display();
  delay(500);

  digitalWrite(BUZZER_PIN, HIGH);
  oled.clear();
  oled.drawString(0, 0, "Buzzer: OFF");
  oled.display();
  delay(500);

  // Melody buzzer - play 3 notes
  int notes[] = {262, 330, 392};
  for (int i = 0; i < 3; i++) {
    ledcWriteTone(0, notes[i]);
    oled.clear();
    oled.drawString(0, 0, "Melody:");
    oled.drawString(0, 16, String(notes[i]) + " Hz");
    oled.display();
    delay(300);
  }
  ledcWriteTone(0, 0);

  oled.clear();
  oled.drawString(0, 0, "Silent...");
  oled.display();
  delay(1000);
}