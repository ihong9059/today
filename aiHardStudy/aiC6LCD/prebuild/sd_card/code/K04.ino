// [종합 제어] BLE + WiFi + LED + LCD
#include <WiFi.h>
int mode = 0;
void onBleReceive(String cmd) {
  if (cmd == "MODE1") mode = 1;
  else if (cmd == "MODE2") mode = 2;
  else if (cmd == "MODE3") mode = 3;
  else if (cmd == "MODE0") mode = 0;
}
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  WiFi.mode(WIFI_STA);
}
void loop() {
  lcdClear();
  switch (mode) {
    case 0:
      lcdText(10, 10, "System Ready", C_CYAN, 2);
      lcdText(10, 40, "BLE: Send MODE", C_TEXT, 1);
      lcdText(10, 55, "1=LED 2=WiFi", C_GRAY, 1);
      lcdText(10, 70, "3=Info 0=Home", C_GRAY, 1);
      setColor(0, 0, 30);
      break;
    case 1: {
      lcdText(10, 10, "LED Mode", C_GREEN, 2);
      uint16_t hue = (millis() / 10) % 65536;
      uint32_t c = pixel.ColorHSV(hue, 255, 128);
      setColor((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
      lcd.fillRect(20, 50, 132, 50, lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      break;
    }
    case 2: {
      lcdText(10, 10, "WiFi Mode", C_YELLOW, 2);
      int n = WiFi.scanNetworks(false, false, false, 100);
      char buf[32];
      snprintf(buf, sizeof(buf), "Found: %d", n);
      lcdText(10, 40, buf, C_GREEN, 2);
      setColor(0, 30, 30);
      break;
    }
    case 3: {
      lcdText(10, 10, "System Info", C_PURPLE, 2);
      char buf[32];
      snprintf(buf, sizeof(buf), "Heap: %u", ESP.getFreeHeap());
      lcdText(10, 40, buf, C_TEXT, 1);
      snprintf(buf, sizeof(buf), "BLE: %s", deviceConnected ? "Yes" : "No");
      lcdText(10, 60, buf, deviceConnected ? C_GREEN : C_RED, 1);
      snprintf(buf, sizeof(buf), "Up: %lus", millis() / 1000);
      lcdText(10, 80, buf, C_YELLOW, 1);
      setColor(30, 0, 30);
      break;
    }
  }
  delay(500);
}
