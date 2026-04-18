// [퀴즈] 문제/정답 데이터 구조
struct QuizItem {
  const char* question;
  const char* answer;
};

const QuizItem QUIZ[] = {
  {"Q1: 한국의 수도는?", "서울"},
  {"Q2: 2 x 3 = ?", "6"},
  {"Q3: 태양계 행성 수?", "8"},
  {"Q4: 물의 화학식?", "H2O"},
  {"Q5: 무지개 색 수?", "7"},
};
const int TOTAL_Q = 5;

// [BLE] 점수 알림 특성 전역 포인터
NimBLECharacteristic* pScoreChar = nullptr;

// [상태] BLE 답변 수신 플래그
volatile bool g_answerReady = false;
String g_answer = "";

// [BLE] 답변 수신 콜백
class QuizCallback : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar) {
    g_answer = String(pChar->getValue().c_str());
    g_answer.trim();
    g_answerReady = true;
  }
};

// [멜로디] 정답 효과음 (도미솔도)
void playCorrect() {
  tone(33, 523, 100); delay(130);
  tone(33, 659, 100); delay(130);
  tone(33, 784, 100); delay(130);
  tone(33, 1047, 350); delay(400);
  noTone(33);
}

// [부저] 오답 버저음
void playWrong() {
  for (int i = 0; i < 2; i++) {
    digitalWrite(BUZZER, LOW);
    delay(250);
    digitalWrite(BUZZER, HIGH);
    delay(120);
  }
}

// [LED] 정답: 파랑+노랑 점멸 태스크
void ledOkTask(void* p) {
  for (int i = 0; i < 4; i++) {
    digitalWrite(LED_BLUE, LOW);
    digitalWrite(LED_YELLOW, LOW);
    delay(150);
    digitalWrite(LED_BLUE, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    delay(150);
  }
  vTaskDelete(NULL);
}

// [LED] 오답: 빨간 점멸 태스크
void ledNgTask(void* p) {
  for (int i = 0; i < 4; i++) {
    digitalWrite(LED_RED, LOW);
    delay(200);
    digitalWrite(LED_RED, HIGH);
    delay(200);
  }
  vTaskDelete(NULL);
}

// [OLED] 문제 화면
void showQuestion(int idx, int sc) {
  oled.clear();
  char hdr[22];
  snprintf(hdr, sizeof(hdr), "[%d/%d]  Score: %d", idx + 1, TOTAL_Q, sc);
  oled.drawString(0, 0, hdr);
  oled.drawString(0, 12, "--------------------");
  String q = String(QUIZ[idx].question);
  if (q.length() <= 16) {
    oled.drawString(0, 26, q.c_str());
  } else {
    oled.drawString(0, 26, q.substring(0, 16).c_str());
    oled.drawString(0, 38, q.substring(16).c_str());
  }
  oled.drawString(0, 54, "BLE로 답 전송!");
  oled.display();
}

// [OLED] 정답/오답 결과 화면
void showResult(bool ok, const String& ans, int sc) {
  oled.clear();
  oled.drawString(0, 0, ok ? "O  정  답!" : "X  오  답!");
  char buf[24];
  snprintf(buf, sizeof(buf), "입력: %s", ans.c_str());
  oled.drawString(0, 18, buf);
  snprintf(buf, sizeof(buf), "현재 점수: %d/%d", sc, TOTAL_Q);
  oled.drawString(0, 36, buf);
  oled.display();
}

// [OLED] 퀴즈 종료 최종 결과
void showFinal(int sc) {
  oled.clear();
  oled.drawString(0, 0, "=== 퀴즈 종료! ===");
  char buf[24];
  snprintf(buf, sizeof(buf), "최종 점수: %d/%d", sc, TOTAL_Q);
  oled.drawString(0, 16, buf);
  int pct = (sc * 100) / TOTAL_Q;
  snprintf(buf, sizeof(buf), "정답률: %d%%", pct);
  oled.drawString(0, 32, buf);
  const char* grade = (pct >= 80) ? "등급: 우수!" : (pct >= 60) ? "등급: 보통" : "등급: 분발!";
  oled.drawString(0, 50, grade);
  oled.display();
}

// [퀴즈] 메인 퀴즈 진행 태스크
void quizTask(void* param) {
  int score = 0;
  showQuestion(0, 0);
  Serial.println("[QUIZ] 인터랙티브 퀴즈쇼 시작!");

  for (int i = 0; i < TOTAL_Q; i++) {
    // [대기] BLE 답변 수신까지 대기
    g_answerReady = false;
    while (!g_answerReady) {
      vTaskDelay(50 / portTICK_PERIOD_MS);
    }

    String ans = g_answer;
    bool correct = (ans == String(QUIZ[i].answer));

    Serial.printf("[QUIZ] Q%d | 입력=%s | 정답=%s | %s\n",
                  i + 1, ans.c_str(), QUIZ[i].answer, correct ? "O" : "X");

    if (correct) {
      score++;
      xTaskCreate(ledOkTask, "ledOk", 1024, NULL, 1, NULL);
      playCorrect();
    } else {
      xTaskCreate(ledNgTask, "ledNg", 1024, NULL, 1, NULL);
      playWrong();
    }

    showResult(correct, ans, score);

    // [BLE] 현재 점수 알림 전송
    char scoreBuf[28];
    snprintf(scoreBuf, sizeof(scoreBuf), "Q%d:%s SCORE:%d/%d",
             i + 1, correct ? "O" : "X", score, TOTAL_Q);
    pScoreChar->setValue(scoreBuf);
    pScoreChar->notify();

    vTaskDelay(2500 / portTICK_PERIOD_MS);

    if (i + 1 < TOTAL_Q) {
      showQuestion(i + 1, score);
    }
  }

  // [종료] 최종 결과 표시 및 BLE 전송
  showFinal(score);
  char finalBuf[28];
  snprintf(finalBuf, sizeof(finalBuf), "FINAL:%d/%d PCT:%d%%",
           score, TOTAL_Q, (score * 100) / TOTAL_Q);
  pScoreChar->setValue(finalBuf);
  pScoreChar->notify();

  Serial.printf("[QUIZ] 완료! 최종=%d/%d\n", score, TOTAL_Q);
  vTaskDelete(NULL);
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [BLE] 퀴즈 전용 서비스 생성
  NimBLEServer* pServer = NimBLEDevice::getServer();
  NimBLEService* pSvc = pServer->createService("4FAFC201-1FB5-459E-8FCC-C5C9C3319ABC");

  // [BLE] 답변 수신 특성 (스마트폰 → ESP32 Write)
  NimBLECharacteristic* pAnswerChar = pSvc->createCharacteristic(
    "BEB5483E-36E1-4688-B7F5-EA07361B26A8",
    NIMBLE_PROPERTY::WRITE
  );
  pAnswerChar->setCallbacks(new QuizCallback());

  // [BLE] 점수 알림 특성 (ESP32 → 스마트폰 Notify)
  pScoreChar = pSvc->createCharacteristic(
    "BEB5483E-36E1-4688-B7F5-EA07361B26A9",
    NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY
  );

  pSvc->start();

  // [BLE] 서비스 추가 후 광고 재시작
  NimBLEDevice::getAdvertising()->start();

  // [퀴즈] 퀴즈 진행 태스크 시작
  xTaskCreate(quizTask, "quizTask", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000); // [루프] BLE OTA 백그라운드 동작 중
}