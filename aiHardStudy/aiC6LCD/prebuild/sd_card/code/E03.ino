// [설정] 눈송이 개수 및 하늘 배경색
#define NUM_FLAKES 60
#define SKY_COLOR  0x000A  // 어두운 밤하늘 파란색

// [구조체] 눈송이 상태 정의
struct Flake {
  float x, y;    // 위치
  float vy, vx;  // 낙하/흔들림 속도
  uint8_t size;  // 0=픽셀, 1=작은원
};

Flake flakes[NUM_FLAKES];

// [초기화] 눈송이 하나를 랜덤 설정
void resetFlake(int i, bool scatter) {
  flakes[i].x  = random(0, 172);
  flakes[i].y  = scatter ? random(0, 320) : random(-6, 0);
  flakes[i].vy = 0.5 + random(0, 28) / 10.0;  // 낙하 속도
  flakes[i].vx = (random(-7, 7)) / 10.0;       // 바람 흔들림
  flakes[i].size = (random(0, 5) == 0) ? 1 : 0; // 20% 확률 원형
}

// [렌더] 눈송이를 지정 색으로 그리기
void drawFlake(int i, uint16_t color) {
  int x = (int)flakes[i].x;
  int y = (int)flakes[i].y;
  if (x < 0 || x >= 172 || y < 0 || y >= 320) return;
  if (flakes[i].size == 0) {
    lcd.drawPixel(x, y, color);
  } else {
    lcd.fillCircle(x, y, 1, color);
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [배경] 밤하늘 색으로 초기화
  lcd.fillScreen(SKY_COLOR);

  // [눈] 화면 전체에 눈송이 분산 배치
  randomSeed(millis());
  for (int i = 0; i < NUM_FLAKES; i++) {
    resetFlake(i, true);
  }

  // [LED] 차가운 파란빛
  setColor(80, 120, 255);
}

void loop() {
  for (int i = 0; i < NUM_FLAKES; i++) {
    drawFlake(i, SKY_COLOR); // 이전 위치 지우기

    // [이동] 낙하 및 바람 흔들림 적용
    flakes[i].x += flakes[i].vx;
    flakes[i].y += flakes[i].vy;

    // [경계] 좌우는 반대편으로 이동
    if (flakes[i].x < 0)    flakes[i].x += 172;
    if (flakes[i].x >= 172) flakes[i].x -= 172;

    // [리셋] 화면 아래 벗어나면 위에서 재시작
    if (flakes[i].y > 322) {
      resetFlake(i, false);
    }

    drawFlake(i, C_TEXT); // 흰색으로 새 위치에 그리기
  }

  delay(20); // ~50fps
}