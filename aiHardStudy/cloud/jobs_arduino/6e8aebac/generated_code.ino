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

  ledcAttachPin(MELODY_PIN, 0);

  oled.clear();
  oled.drawString(0, 0, "Buzzer Test");
  oled.display();

  initBLE();
}

void loop() {
  // Active LOW 부저: 1초 울리고 1초 쉬기
  digitalWrite(BUZZER_PIN, LOW);
  oled.clear();
  oled.drawString(0, 0, "Buzzer: ON");
  oled.display();
  delay(1000);

  digitalWrite(BUZZER_PIN, HIGH);
  oled.clear();
  oled.drawString(0, 0, "Buzzer: OFF");
  oled.display();
  delay(1000);

  // 멜로디 부저: 도레미파솔라시도
  int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
  int duration = 300;

  oled.clear();
  oled.drawString(0, 0, "Melody Playing");
  oled.display();

  for (int i = 0; i < 8; i++) {
    ledcWriteTone(0, melody[i]);
    delay(duration);
  }
  ledcWriteTone(0, 0);

  oled.clear();
  oled.drawString(0, 0, "Melody Done");
  oled.display();
  delay(2000);
}