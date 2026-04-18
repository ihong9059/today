// [악기] 곡 인덱스 및 재생 상태
int currentSong = 0;
volatile bool isPlaying = false;
int ledSong = 0;

// [멜로디] 학교종
int mel1[] = {392,392,440,440,392,392,330,392,392,330,330,294,392,392,440,440,392,392,330};
int dur1[] = {4,4,4,4,4,4,2,4,4,4,4,2,4,4,4,4,4,4,2};
const int mel1_len = 19;

// [멜로디] 반짝반짝 작은별
int mel2[] = {262,262,392,392,440,440,392,349,349,330,330,294,294,262};
int dur2[] = {4,4,4,4,4,4,2,4,4,4,4,4,4,2};
const int mel2_len = 14;

// [멜로디] 생일축하합니다
int mel3[] = {262,262,294,262,349,330,262,262,294,262,392,349,262,262,523,440,349,330,294};
int dur3[] = {8,8,4,4,4,2,8,8,4,4,4,2,8,8,4,4,4,4,2};
const int mel3_len = 19;

const char* songNames[]  = {"학교종",     "반짝작은별",       "생일축하"};
const char* songArtist[] = {"Korean Folk","Mozart arrange","Mildred Hill"};

// [OLED] 현재 곡명 + 번호 표시
void showSongOled(int song) {
    oled.clear();
    oled.drawString(0,  0, "My Instrument");
    oled.drawString(0, 16, songNames[song]);
    oled.drawString(0, 32, songArtist[song]);
    char buf[16];
    sprintf(buf, "Track %d / 3", song + 1);
    oled.drawString(0, 48, buf);
    oled.display();
}

// [LED] 곡별 LED 쇼 태스크
void ledShowTask(void* param) {
    while (isPlaying) {
        if (ledSong == 0) {
            // 학교종: 순차 점등
            digitalWrite(LED_RED,    LOW);  vTaskDelay(200 / portTICK_PERIOD_MS);
            digitalWrite(LED_RED,    HIGH);
            digitalWrite(LED_YELLOW, LOW);  vTaskDelay(200 / portTICK_PERIOD_MS);
            digitalWrite(LED_YELLOW, HIGH);
            digitalWrite(LED_BLUE,   LOW);  vTaskDelay(200 / portTICK_PERIOD_MS);
            digitalWrite(LED_BLUE,   HIGH);
        } else if (ledSong == 1) {
            // 반짝별: 전체 동시 깜빡
            digitalWrite(LED_RED, LOW); digitalWrite(LED_YELLOW, LOW); digitalWrite(LED_BLUE, LOW);
            vTaskDelay(300 / portTICK_PERIOD_MS);
            digitalWrite(LED_RED, HIGH); digitalWrite(LED_YELLOW, HIGH); digitalWrite(LED_BLUE, HIGH);
            vTaskDelay(300 / portTICK_PERIOD_MS);
        } else {
            // 생일: 레드↔블루 + 옐로우 교차
            digitalWrite(LED_RED, LOW);  digitalWrite(LED_BLUE, HIGH); digitalWrite(LED_YELLOW, HIGH);
            vTaskDelay(150 / portTICK_PERIOD_MS);
            digitalWrite(LED_RED, HIGH); digitalWrite(LED_BLUE, HIGH); digitalWrite(LED_YELLOW, LOW);
            vTaskDelay(150 / portTICK_PERIOD_MS);
            digitalWrite(LED_RED, HIGH); digitalWrite(LED_BLUE, LOW);  digitalWrite(LED_YELLOW, HIGH);
            vTaskDelay(150 / portTICK_PERIOD_MS);
            digitalWrite(LED_RED, HIGH); digitalWrite(LED_BLUE, HIGH); digitalWrite(LED_YELLOW, HIGH);
            vTaskDelay(150 / portTICK_PERIOD_MS);
        }
    }
    // 재생 종료 후 LED 모두 끄기
    digitalWrite(LED_RED, HIGH); digitalWrite(LED_YELLOW, HIGH); digitalWrite(LED_BLUE, HIGH);
    vTaskDelete(NULL);
}

// [멜로디] 곡 재생 (블로킹)
void playSong(int song) {
    int *mel, *dur, len;
    if      (song == 0) { mel = mel1; dur = dur1; len = mel1_len; }
    else if (song == 1) { mel = mel2; dur = dur2; len = mel2_len; }
    else                { mel = mel3; dur = dur3; len = mel3_len; }

    isPlaying = true;
    ledSong   = song;
    xTaskCreate(ledShowTask, "LED_SHOW", 2048, NULL, 1, NULL);

    for (int i = 0; i < len; i++) {
        int noteDur = 1000 / dur[i];
        tone(33, mel[i], noteDur);        // 멜로디 출력
        delay(noteDur * 13 / 10);         // 노트 간 여백
    }
    noTone(33);
    isPlaying = false;
}

// [BLE] 곡 정보 직렬 전송 (BLE notify payload)
void sendBleSongInfo(int song) {
    char payload[64];
    sprintf(payload, "{\"track\":%d,\"name\":\"%s\",\"artist\":\"%s\"}",
            song + 1, songNames[song], songArtist[song]);
    Serial.println(payload);             // BLE characteristic notify 데이터
}

// [메인] 스위치 감지 + 곡 재생 태스크
void mainTask(void* param) {
    bool lastState = true;               // INPUT_PULLUP 기본 HIGH

    oled.clear();
    oled.drawString(0,  0, "My Instrument");
    oled.drawString(0, 20, "Press Switch!");
    oled.drawString(0, 36, "3 Songs Ready");
    oled.display();

    while (true) {
        bool curState = (bool)digitalRead(32);

        if (lastState && !curState && !isPlaying) { // 하강 엣지: 스위치 눌림
            showSongOled(currentSong);              // OLED 곡명 표시
            sendBleSongInfo(currentSong);           // BLE 곡 정보 전송
            playSong(currentSong);                  // 멜로디 + LED 재생

            currentSong = (currentSong + 1) % 3;   // 다음 곡 순환

            oled.clear();
            oled.drawString(0,  0, "My Instrument");
            oled.drawString(0, 20, "Done!");
            char buf[20];
            sprintf(buf, "Next: %s", songNames[currentSong]);
            oled.drawString(0, 36, buf);
            oled.drawString(0, 52, "Press Switch!");
            oled.display();
        }

        lastState = curState;
        vTaskDelay(50 / portTICK_PERIOD_MS);        // 디바운싱
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();          // 핀 및 OLED 초기화
    initBLE();               // BLE OTA 초기화
    xTaskCreate(mainTask, "MAIN_TASK", 4096, NULL, 1, NULL);
}

void loop() {
    delay(10000);
}