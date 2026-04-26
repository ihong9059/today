// [색상 텍스트] 색상별 텍스트 표시 예제

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear();

  // [제목] 상단 타이틀
  lcdText(10, 10, "Color Text Demo", C_YELLOW, 2);
  lcd.drawLine(0, 32, 172, 32, C_GRAY);

  // [흰색] 기본 흰색 텍스트
  lcdText(10, 45, "WHITE", C_TEXT, 3);

  // [빨강] 빨간색 텍스트
  lcdText(10, 85, "RED", C_RED, 3);

  // [초록] 초록색 텍스트
  lcdText(10, 125, "GREEN", C_GREEN, 3);

  // [파랑] 파란색 텍스트
  lcdText(10, 165, "BLUE", C_BLUE, 3);

  // [노랑] 노란색 텍스트
  lcdText(10, 205, "YELLOW", C_YELLOW, 3);

  // [시안] 청록색 텍스트
  lcdText(10, 245, "CYAN", C_CYAN, 3);

  // [주황] 주황색 텍스트
  lcdText(10, 285, "ORANGE", C_ORANGE, 2);

  // [보라] 보라색 텍스트
  lcdText(85, 285, "PURPLE", C_PURPLE, 2);

  // [LED] 준비 완료 표시
  setColor(0, 30, 30);
}

void loop() {
  delay(10000);
}
```

**표시 내용:**
- Y=10: `Color Text Demo` (노란색, size 2)
- Y=45: `WHITE` (흰색, size 3)
- Y=85: `RED` (빨강, size 3)
- Y=125: `GREEN` (초록, size 3)
- Y=165: `BLUE` (파랑, size 3)
- Y=205: `YELLOW` (노랑, size 3)
- Y=245: `CYAN` (시안, size 3)
- Y=285: `ORANGE` / `PURPLE` (size 2, 두 개 나란히)
- RGB LED: 청록색으로 준비 완료 표시