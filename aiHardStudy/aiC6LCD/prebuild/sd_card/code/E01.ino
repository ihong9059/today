// [볼] 공 위치 및 속도
int ballX = 86;
int ballY = 160;
int ballRadius = 12;
int speedX = 4;

// [볼] 이전 위치 저장 (지우기용)
int prevX = -1;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [화면] 배경 초기화
  lcdClear();
  // [LED] 파란색 표시
  setColor(0, 0, 80);
}

void loop() {
  // [볼] 이전 위치 지우기
  if (prevX >= 0) {
    lcd.fillCircle(prevX, ballY, ballRadius, C_BG);
  }

  // [볼] 새 위치로 이동
  ballX += speedX;

  // [볼] 좌우 벽 충돌 반사
  if (ballX + ballRadius >= 172) {
    ballX = 172 - ballRadius;
    speedX = -speedX;
    setColor(80, 0, 0); // [LED] 오른쪽 벽 충돌 → 빨강
  }
  if (ballX - ballRadius <= 0) {
    ballX = ballRadius;
    speedX = -speedX;
    setColor(0, 80, 0); // [LED] 왼쪽 벽 충돌 → 초록
  }

  // [볼] 공 그리기
  lcd.fillCircle(ballX, ballY, ballRadius, C_CYAN);

  prevX = ballX;
  delay(20);
}