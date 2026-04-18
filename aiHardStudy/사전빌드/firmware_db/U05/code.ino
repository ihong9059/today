// [모스부호] 타이밍 상수
#define SWITCH_PIN    32
#define DOT_MAX_MS    300
#define CHAR_GAP_MS  1500
#define WORD_GAP_MS  4000

String morseSeq    = "";
String decodedText = "";
bool   swPressed   = false;
bool   pendingDecode = false;
bool   pendingSpace  = false;
unsigned long pressStart    = 0;
unsigned long lastInputTime = 0;

// [모스부호] 알파벳/숫자 테이블
const char* morseTable[][2] = {
  {".-","A"},{"-...","B"},{"-.-.","C"},{"-..", "D"},
  {".","E"},  {"..-.","F"},{"--.", "G"},{"....","H"},
  {"..","I"}, {".---","J"},{"-.-", "K"},{".-..","L"},
  {"--","M"}, {"-.","N"},  {"---", "O"},{".--.","P"},
  {"--.-","Q"},{".-.", "R"},{"...","S"},{"-","T"},
  {"..-","U"},{"...-","V"},{".--","W"},{"-..-","X"},
  {"-.--","Y"},{"--..","Z"},
  {"-----","0"},{".----","1"},{"..---","2"},{"...--","3"},
  {"....-","4"},{".....", "5"},{"-....","6"},{"--...","7"},
  {"---..", "8"},{"----.", "9"},
  {nullptr, nullptr}
};

// [모스부호] 시퀀스 → 문자 변환
String decodeMorse(String seq) {
  for (int i = 0; morseTable[i][0] != nullptr; i++) {
    if (seq == morseTable[i][0]) return String(morseTable[i][1]);
  }
  return "?";
}

// [OLED] 현재 입력/출력 화면 갱신
void updateOLED() {
  oled.clear();
  oled.drawString(0, 0,  "== Morse Code ==");
  String seqDisp = "Seq: " + (morseSeq.length() > 13 ? morseSeq.substring(morseSeq.length() - 13) : morseSeq);
  oled.drawString(0, 16, seqDisp.c_str());
  String txtDisp = "Out: " + (decodedText.length() > 12 ? decodedText.substring(decodedText.length() - 12) : decodedText);
  oled.drawString(0, 32, txtDisp.c_str());
  oled.display();
}

// [BLE] 해석된 문자 스마트폰으로 전송
void sendBLE(String data) {
  if (deviceConnected && sensorChar) {
    std::string s = data.c_str();
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [BLE] 스마트폰 명령 수신 (CLEAR: 텍스트 초기화)
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "CLEAR") {
    decodedText = "";
    morseSeq    = "";
    updateOLED();
    Serial.println("[BLE] 텍스트 초기화");
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀/OLED/버저 초기화
  initBLE();        // [BLE] BLE OTA 초기화

  // [스위치] 입력 핀 설정
  pinMode(SWITCH_PIN, INPUT_PULLUP);

  // [OLED] 시작 화면
  oled.clear();
  oled.drawString(0, 0,  "== Morse Code ==");
  oled.drawString(0, 20, "짧게=점  길게=선");
  oled.display();

  Serial.println("모스부호 번역기 시작");
}

void loop() {
  unsigned long now     = millis();
  bool          pressed = (digitalRead(SWITCH_PIN) == LOW);  // [스위치] active LOW

  // [스위치] 버튼 눌림 시작 감지
  if (pressed && !swPressed) {
    pressStart = now;
    swPressed  = true;
    pendingSpace = false;          // 새 입력 → 단어 공백 취소
    digitalWrite(LED_BLUE, LOW);   // [LED] 누르는 동안 파란불
  }

  // [스위치] 버튼 뗌 → 점/선 판별
  if (!pressed && swPressed) {
    unsigned long dur = now - pressStart;
    swPressed       = false;
    lastInputTime   = now;
    pendingDecode   = true;
    digitalWrite(LED_BLUE, HIGH);  // [LED] 파란불 끔

    if (dur < DOT_MAX_MS) {
      // [점] 짧은 입력
      morseSeq += ".";
      tone(33, 1200, 80);                          // [버저] 높은 단음
      digitalWrite(LED_RED, LOW);
      delay(80);
      digitalWrite(LED_RED, HIGH);
    } else {
      // [선] 긴 입력
      morseSeq += "-";
      tone(33, 700, 250);                          // [버저] 낮은 장음
      digitalWrite(LED_YELLOW, LOW);
      delay(250);
      digitalWrite(LED_YELLOW, HIGH);
    }

    updateOLED();
    Serial.println("[입력] 현재: " + morseSeq);
  }

  // [해석] 1.5초 간격 후 현재 시퀀스를 글자로 변환
  if (pendingDecode && morseSeq.length() > 0 &&
      !swPressed && (now - lastInputTime > CHAR_GAP_MS)) {

    String letter = decodeMorse(morseSeq);
    decodedText  += letter;
    sendBLE(letter);                               // [BLE] 해석 글자 전송
    Serial.println("[해석] " + morseSeq + " -> " + letter);

    morseSeq      = "";
    pendingDecode = false;
    pendingSpace  = true;
    lastInputTime = now;                           // 단어 간격 타이머 리셋

    updateOLED();
    // [LED] 해석 완료 파란불 깜빡
    digitalWrite(LED_BLUE, LOW);
    delay(120);
    digitalWrite(LED_BLUE, HIGH);
  }

  // [단어] 4초 무입력 시 공백 추가
  if (pendingSpace && !swPressed && (now - lastInputTime > WORD_GAP_MS)) {
    decodedText  += " ";
    sendBLE(" ");
    pendingSpace  = false;
    updateOLED();
    Serial.println("[단어] 공백 추가");
  }

  delay(10);
}