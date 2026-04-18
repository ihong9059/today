// [퀴즈] 문제/정답 데이터 구조
struct QuizItem {
  const char* question;
  const char* answer;
};

// [퀴즈] 문제 목록 (정답은 소문자)
QuizItem quiz[] = {
  {"Q1: 빛의 속도?", "30"},          // 3억 m/s 앞 두자리
  {"Q2: H2O는?", "water"},
  {"Q3: 1+1=?", "2"},
  {"Q4: 지구 위성?", "moon"},
  {"Q5: AI 뜻?", "인공지능"},
};
const int QUIZ_COUNT = 5;

// [상태] 퀴즈 진행 변수
int currentQ = 0;
int score = 0;
bool waitingAnswer = true;
bool quizDone = false;

// [LED] 정답 무지개 효과
void ledCorrect() {
  uint32_t colors[] = {
    pixel.Color(255,0,0), pixel.Color(255,128,0),
    pixel.Color(255,255,0), pixel.Color(0,255,0),
    pixel.Color(0,0,255), pixel.Color(128,0,255)
  };
  for (int i = 0; i < 6; i++) {
    pixel.setPixelColor(0, colors[i]);
    pixel.show();
    delay(120);
  }
  pixel.clear(); pixel.show();
}

// [LED] 오답 빨간 점멸
void ledWrong() {
  for (int i = 0; i < 3; i++) {
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
    pixel.show(); delay(150);
    pixel.clear(); pixel.show(); delay(150);
  }
}

// [사운드] 정답 멜로디 (도미솔도)
void melodyCorrect() {
  int notes[] = {523, 659, 784, 1047};
  for (int i = 0; i < 4; i++) {
    tone(2, notes[i], 150);
    delay(180);
  }
  noTone(2);
}

// [사운드] 오답 버저
void melodyWrong() {
  tone(2, 200, 400);
  delay(450);
  noTone(2);
}

// [OLED] 현재 문제 표시
void showQuestion() {
  oled.clear();
  oled.drawString(0, 0, "=== QUIZ ===");
  oled.drawString(0, 16, quiz[currentQ].question);
  oled.drawString(0, 32, "BLE로 답 전송");

  char scoreBuf[20];
  snprintf(scoreBuf, sizeof(scoreBuf), "Score: %d/%d", score, QUIZ_COUNT);
  oled.drawString(0, 48, scoreBuf);
  oled.display();
}

// [OLED] 결과 표시
void showResult(bool correct) {
  oled.clear();
  oled.drawString(0, 0, correct ? "O  정답!" : "X  오답!");
  oled.drawString(0, 16, quiz[currentQ].question);

  char ans[30];
  snprintf(ans, sizeof(ans), "정답: %s", quiz[currentQ].answer);
  oled.drawString(0, 32, ans);

  char scoreBuf[20];
  snprintf(scoreBuf, sizeof(scoreBuf), "Score: %d/%d", score, QUIZ_COUNT);
  oled.drawString(0, 48, scoreBuf);
  oled.display();
}

// [OLED] 최종 점수 표시
void showFinal() {
  oled.clear();
  oled.drawString(0, 0, "=== 완료! ===");

  char scoreBuf[24];
  snprintf(scoreBuf, sizeof(scoreBuf), "최종: %d / %d", score, QUIZ_COUNT);
  oled.drawString(0, 20, scoreBuf);

  if (score == QUIZ_COUNT)      oled.drawString(0, 40, "완벽! 만점!");
  else if (score >= QUIZ_COUNT/2) oled.drawString(0, 40, "잘했어요!");
  else                            oled.drawString(0, 40, "다시 도전!");
  oled.display();
}

// [BLE] 스마트폰에서 답 수신
void onBleReceive(String cmd) {
  cmd.trim();

  // [명령] 퀴즈 리셋
  if (cmd == "RESET" || cmd == "reset") {
    currentQ = 0;
    score = 0;
    waitingAnswer = true;
    quizDone = false;
    showQuestion();

    if (deviceConnected && sensorChar) {
      std::string msg = "퀴즈 리셋! Q1 시작";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  // [퀴즈] 완료 후 무시
  if (quizDone) {
    if (deviceConnected && sensorChar) {
      std::string msg = "RESET 전송으로 재시작";
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
    return;
  }

  if (!waitingAnswer) return;
  waitingAnswer = false;

  // [판정] 정답 비교 (소문자 변환)
  String userAns = cmd;
  userAns.toLowerCase();
  String correctAns = String(quiz[currentQ].answer);
  correctAns.toLowerCase();
  bool correct = (userAns == correctAns);

  if (correct) score++;

  // [피드백] LED + 사운드 + OLED
  showResult(correct);
  if (correct) {
    ledCorrect();
    melodyCorrect();
  } else {
    ledWrong();
    melodyWrong();
  }

  // [BLE] 결과 전송
  if (deviceConnected && sensorChar) {
    char buf[64];
    snprintf(buf, sizeof(buf), "%s | Score:%d/%d",
             correct ? "정답!" : "오답!", score, QUIZ_COUNT);
    std::string msg(buf);
    sensorChar->setValue(msg);
    sensorChar->notify();
  }

  delay(2000); // [대기] 결과 확인 시간

  // [진행] 다음 문제 또는 종료
  currentQ++;
  if (currentQ >= QUIZ_COUNT) {
    quizDone = true;
    showFinal();

    // [BLE] 최종 점수 전송
    if (deviceConnected && sensorChar) {
      char buf[48];
      snprintf(buf, sizeof(buf), "퀴즈종료! 최종점수:%d/%d", score, QUIZ_COUNT);
      std::string msg(buf);
      sensorChar->setValue(msg);
      sensorChar->notify();
    }

    // [LED] 만점 시 흰색 점등
    if (score == QUIZ_COUNT) {
      pixel.setPixelColor(0, pixel.Color(255, 255, 255));
      pixel.show();
    }
  } else {
    waitingAnswer = true;
    showQuestion();

    // [BLE] 다음 문제 전송
    if (deviceConnected && sensorChar) {
      char buf[64];
      snprintf(buf, sizeof(buf), "다음문제: %s", quiz[currentQ].question);
      std::string msg(buf);
      sensorChar->setValue(msg);
      sensorChar->notify();
    }
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 첫 문제 표시
  delay(500);
  showQuestion();

  // [BLE] 시작 안내 전송
  if (deviceConnected && sensorChar) {
    std::string msg = "퀴즈 시작! 답을 입력하세요";
    sensorChar->setValue(msg);
    sensorChar->notify();
  }
}

void loop() {
  delay(10000);
}