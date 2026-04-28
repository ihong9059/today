// [이름 표시] LCD에 이름을 크게 표시
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  lcdClear();
  lcdText(20, 60, "My Name", C_CYAN, 4);
  lcdText(20, 120, "UTTEC", C_GREEN, 3);
  lcdText(20, 160, "Student", C_YELLOW, 2);
  setColor(0, 30, 0);
}
void loop() { delay(10000); }
