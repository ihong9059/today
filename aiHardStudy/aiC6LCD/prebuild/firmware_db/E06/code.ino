// [불꽃놀이] LCD 파티클 불꽃 애니메이션

#define MAX_FW    3
#define MAX_PARTS 32
#define GRAVITY   0.10f

// [파티클] 폭발 조각
struct Particle {
  float x, y, vx, vy, px, py;
  uint16_t color;
  int life;
  bool active;
};

// [로켓] 발사 + 폭발 관리
struct Firework {
  float rx, ry, prx, pry, rvy;
  uint16_t color;
  bool active, exploded;
  Particle parts[MAX_PARTS];
};

Firework fws[MAX_FW];
unsigned long nextLaunch[MAX_FW];

// [색상] 랜덤 불꽃 색상 반환
uint16_t randColor() {
  switch (random(7)) {
    case 0: return C_RED;
    case 1: return C_GREEN;
    case 2: return C_CYAN;
    case 3: return C_YELLOW;
    case 4: return C_ORANGE;
    case 5: return C_PURPLE;
    default: return 0xF81F; // 마젠타
  }
}

// [발사] 새 불꽃 로켓 초기화
void launchFW(int i) {
  fws[i].rx = fws[i].prx = (float)random(20, 152);
  fws[i].ry = fws[i].pry = 315.0f;
  fws[i].rvy    = -(float)random(70, 130) * 0.1f;
  fws[i].color  = randColor();
  fws[i].active = true;
  fws[i].exploded = false;
  for (int p = 0; p < MAX_PARTS; p++) fws[i].parts[p].active = false;
}

// [폭발] 로켓 정점에서 파티클 생성
void explodeFW(int i) {
  fws[i].exploded = true;
  for (int p = 0; p < MAX_PARTS; p++) {
    float angle = (float)p * 2.0f * PI / MAX_PARTS;
    float spd   = random(8, 22) * 0.13f;
    Particle& pt = fws[i].parts[p];
    pt.x = pt.px = fws[i].rx;
    pt.y = pt.py = fws[i].ry;
    pt.vx    = cosf(angle) * spd;
    pt.vy    = sinf(angle) * spd;
    pt.color = fws[i].color;
    pt.life  = random(22, 48);
    pt.active = true;
  }
}

// [갱신] 프레임마다 불꽃 상태 업데이트
void updateFW(int i) {
  if (!fws[i].active) return;

  if (!fws[i].exploded) {
    // [로켓] 이전 위치 지우기
    lcd.drawPixel((int)fws[i].prx, (int)fws[i].pry,     C_BG);
    lcd.drawPixel((int)fws[i].prx, (int)fws[i].pry + 1, C_BG);
    lcd.drawPixel((int)fws[i].prx, (int)fws[i].pry + 2, C_BG);

    fws[i].prx = fws[i].rx;
    fws[i].pry = fws[i].ry;
    fws[i].rvy += GRAVITY;
    fws[i].ry  += fws[i].rvy;

    if (fws[i].rvy >= 0.0f) {
      explodeFW(i); // [정점] 속도 0 이상이면 폭발
    } else {
      // [로켓] 머리 + 꼬리 그리기
      lcd.drawPixel((int)fws[i].rx, (int)fws[i].ry,     C_TEXT);
      lcd.drawPixel((int)fws[i].rx, (int)fws[i].ry + 1, C_YELLOW);
      lcd.drawPixel((int)fws[i].rx, (int)fws[i].ry + 2, C_ORANGE);
    }
  } else {
    // [파티클] 각 조각 물리 + 렌더링
    bool anyActive = false;
    for (int p = 0; p < MAX_PARTS; p++) {
      Particle& pt = fws[i].parts[p];
      if (!pt.active) continue;

      // 이전 위치 지우기
      lcd.drawPixel((int)pt.px, (int)pt.py, C_BG);

      pt.px = pt.x;
      pt.py = pt.y;
      pt.vy += GRAVITY;   // 중력 적용
      pt.vx *= 0.98f;     // 공기 저항
      pt.x  += pt.vx;
      pt.y  += pt.vy;
      pt.life--;

      // [범위] 화면 밖 또는 수명 종료
      if (pt.life <= 0 || pt.x < 0 || pt.x >= 172 || pt.y < 0 || pt.y >= 320) {
        pt.active = false;
        continue;
      }

      // [색상] 수명 따라 흰색 → 원색 → 주황 → 빨강 순 변화
      uint16_t col;
      if (pt.life > 35)      col = C_TEXT;
      else if (pt.life > 18) col = pt.color;
      else if (pt.life > 9)  col = C_ORANGE;
      else                   col = C_RED;

      lcd.drawPixel((int)pt.x, (int)pt.y, col);
      anyActive = true;
    }
    if (!anyActive) fws[i].active = false; // [완료] 모든 파티클 소멸
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  lcdClear(); // [화면] 검정 배경

  // [LED] 불꽃 분위기 주황색
  setColor(60, 20, 0);

  // [타이밍] 불꽃별 발사 간격 초기화
  for (int i = 0; i < MAX_FW; i++) {
    fws[i].active   = false;
    nextLaunch[i]   = millis() + (unsigned long)(i * 600 + random(200, 800));
  }
}

void loop() {
  unsigned long now = millis();

  for (int i = 0; i < MAX_FW; i++) {
    bool wasActive = fws[i].active;
    updateFW(i);

    // [재발사] 소멸 후 랜덤 딜레이
    if (wasActive && !fws[i].active) {
      nextLaunch[i] = now + random(400, 1400);
    }

    // [발사] 예약 시간 도달 시 점화
    if (!fws[i].active && now >= nextLaunch[i]) {
      launchFW(i);
    }
  }

  // [LED] 폭발 타이밍 랜덤 반짝임
  setColor(random(100), random(40), random(10));

  delay(22); // ~45fps 목표
}