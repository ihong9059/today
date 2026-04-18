// 가위=0, 바위=1, 보=2
const char* choices[] = {"가위", "바위", "보"};
int wins = 0, losses = 0, draws = 0;
bool lastBtn = HIGH;

// 승패 판정: 0=무, 1=승, 2=패
int getResult(int p, int c) {
    if (p == c) return 0;
    if ((p == 0 && c == 2) || (p == 1 && c == 0) || (p == 2 && c == 1)) return 1;
    return 2;
}

// 결과 화면 표시 + LED/사운드 피드백
void showResult(int p, int c, int result) {
    char buf1[24], buf2[24], buf3[24];
    sprintf(buf1, "나: %s", choices[p]);
    sprintf(buf2, "컴: %s", choices[c]);
    sprintf(buf3, "W%d L%d D%d", wins, losses, draws);

    oled.clear();
    oled.drawString(0, 0, buf1);
    oled.drawString(0, 14, buf2);

    if (result == 0) {
        oled.drawString(20, 30, "무승부!");
        pixel.setPixelColor(0, pixel.Color(255, 180, 0)); // 노랑: 무승부
        tone(2, 1000, 300);
    } else if (result == 1) {
        oled.drawString(30, 30, "승리!");
        pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // 초록: 승리
        tone(2, 1500, 100); delay(150); tone(2, 2200, 250);
    } else {
        oled.drawString(20, 30, "패배...");
        pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // 빨강: 패배
        tone(2, 800, 150); delay(200); tone(2, 550, 350);
    }
    pixel.show();
    oled.drawString(5, 50, buf3); // 누적 승패 카운트
    oled.display();
}

// 대기 화면 표시
void standby() {
    char buf[20];
    sprintf(buf, "W%d L%d D%d", wins, losses, draws);
    oled.clear();
    oled.drawString(10, 0, buf);
    oled.drawString(10, 18, "가위바위보!");
    oled.drawString(0, 40, "버튼을 누르세요");
    oled.display();
    pixel.setPixelColor(0, pixel.Color(0, 0, 40)); // 파랑: 대기
    pixel.show();
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    randomSeed(millis()); // 난수 시드 초기화
    standby();
}

void loop() {
    bool btn = digitalRead(SWITCH_PIN);

    if (lastBtn == HIGH && btn == LOW) { // 버튼 눌림(HIGH→LOW) 감지
        delay(50); // 디바운스

        int p = random(3); // 플레이어 랜덤 선택
        int c = random(3); // 컴퓨터 랜덤 선택
        int result = getResult(p, c);

        if (result == 0) draws++;
        else if (result == 1) wins++;
        else losses++;

        showResult(p, c, result);
        delay(2500);  // 결과 유지
        standby();    // 대기 화면 복귀
    }

    lastBtn = btn;
    delay(10);
}