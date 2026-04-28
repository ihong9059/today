// [랜덤] 랜덤 시드 초기화
void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();
  randomSeed(esp_random());
}

void loop() {
  // [랜덤] 0~255 범위 랜덤 RGB 색상 생성
  uint8_t r = random(0, 256);
  uint8_t g = random(0, 256);
  uint8_t b = random(0, 256);

  // [LED] 랜덤 색상 적용
  setColor(r, g, b);

  // [LCD] 현재 색상 정보 표시
  lcdClear();
  lcdText(10, 100, "Random Color", C_TEXT, 2);

  char buf[32];
  snprintf(buf, sizeof(buf), "R:%3d G:%3d B:%3d", r, g, b);
  lcdText(10, 140, buf, lcd.color565(r, g, b), 2);

  // [딜레이] 1초마다 색상 변경
  delay(1000);
}