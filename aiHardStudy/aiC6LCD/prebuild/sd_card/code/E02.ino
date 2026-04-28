// [공 튕기기] 볼 위치 및 속도
int ballX = 86;
int ballY = 160;
int velX = 3;
int velY = 4;
const int BALL_R = 10;
const uint16_t BALL_COLOR = C_CYAN;
const uint16_t TRAIL_COLOR = C_BG;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [배경] 검정 화면 초기화
  lcdClear();
  // [테두리] 벽 경계선 표시
  lcd.drawRect(0, 0, 172, 320, C_GRAY);
}

void loop() {
  // [지우기] 이전 공 위치 지우기
  lcd.fillCircle(ballX, ballY, BALL_R, TRAIL_COLOR);

  // [이동] 위치 업데이트
  ballX += velX;
  ballY += velY;

  // [충돌] 좌우 벽 반사
  if (ballX - BALL_R <= 0) {
    ballX = BALL_R;
    velX = abs(velX);
    setColor(255, 0, 0); // [LED] 빨강
  } else if (ballX + BALL_R >= 171) {
    ballX = 171 - BALL_R;
    velX = -abs(velX);
    setColor(0, 255, 0); // [LED] 초록
  }

  // [충돌] 상하 벽 반사
  if (ballY - BALL_R <= 0) {
    ballY = BALL_R;
    velY = abs(velY);
    setColor(0, 0, 255); // [LED] 파랑
  } else if (ballY + BALL_R >= 319) {
    ballY = 319 - BALL_R;
    velY = -abs(velY);
    setColor(255, 255, 0); // [LED] 노랑
  }

  // [그리기] 새 위치에 공 그리기
  lcd.fillCircle(ballX, ballY, BALL_R, BALL_COLOR);

  delay(16); // [속도] ~60fps
}