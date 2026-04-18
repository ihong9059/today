/**
 * BLE OTA Bootloader — Arduino Version
 * ESP32-WROOM-32 DevKitC (38-pin)
 *
 * BLE OTA Service UUID: 0000FE00-...
 *   FE01: OTA_CONTROL (Write) — START/END/ABORT
 *   FE02: OTA_DATA (Write No Response) — firmware chunks
 *   FE03: OTA_STATUS (Notify) — progress
 */

#include <NimBLEDevice.h>
#include <Update.h>
#include <Wire.h>
#include <Preferences.h>
#include "ssd1306.h"

// ─── NVS 저장소 (BLE 이름 영구 저장) ───
Preferences prefs;
char bleName[32] = "UTTEC-OTA";

// ─── Pin Definitions ───
#define LED_RED    25
#define LED_YELLOW 26
#define LED_BLUE   27
#define BUZZER     14
#define I2C_SDA    21
#define I2C_SCL    22

// ─── OTA Protocol ───
#define OTA_CMD_START   0x01
#define OTA_CMD_END     0x02
#define OTA_CMD_ABORT   0x03

#define OTA_STATUS_IDLE      0x00
#define OTA_STATUS_READY     0x01
#define OTA_STATUS_RECEIVING 0x02
#define OTA_STATUS_VERIFYING 0x03
#define OTA_STATUS_SUCCESS   0x04
#define OTA_STATUS_CRC_FAIL  0x05
#define OTA_STATUS_WRITE_FAIL 0x06
#define OTA_STATUS_ABORT_OK  0x07

// ─── UUIDs ───
#define OTA_SERVICE_UUID "0000fe00-0000-1000-8000-00805f9b34fb"
#define OTA_CTRL_UUID    "0000fe01-0000-1000-8000-00805f9b34fb"
#define OTA_DATA_UUID    "0000fe02-0000-1000-8000-00805f9b34fb"
#define OTA_STATUS_UUID  "0000fe03-0000-1000-8000-00805f9b34fb"
#define CMD_UUID         "0000fe04-0000-1000-8000-00805f9b34fb"
#define SENSOR_UUID      "0000fe05-0000-1000-8000-00805f9b34fb"

// ─── Globals ───
static NimBLECharacteristic* statusChar = nullptr;
static NimBLECharacteristic* sensorChar = nullptr;
static bool deviceConnected = false;
static bool otaInProgress = false;
static uint32_t otaTotalSize = 0;
static uint32_t otaReceived = 0;

// ─── Status Notify ───
void sendStatus(uint8_t status, uint8_t progress) {
  if (!deviceConnected || !statusChar) return;
  uint8_t data[2] = {status, progress};
  statusChar->setValue(data, 2);
  statusChar->notify();
}

// ─── OTA Control Callback ───
class OTAControlCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    uint8_t cmd = val[0];

    if (cmd == OTA_CMD_START) {
      if (val.length() >= 5) {
        otaTotalSize = val[1] | (val[2] << 8) | (val[3] << 16) | (val[4] << 24);
      } else {
        otaTotalSize = 0;
      }
      Serial.printf("OTA START, size=%u\n", otaTotalSize);

      if (!Update.begin(otaTotalSize > 0 ? otaTotalSize : UPDATE_SIZE_UNKNOWN)) {
        Serial.println("Update.begin failed");
        sendStatus(OTA_STATUS_WRITE_FAIL, 0);
        return;
      }
      otaInProgress = true;
      otaReceived = 0;
      sendStatus(OTA_STATUS_READY, 0);

    } else if (cmd == OTA_CMD_END) {
      if (!otaInProgress) return;
      Serial.printf("OTA END, received=%u\n", otaReceived);
      sendStatus(OTA_STATUS_VERIFYING, 100);

      if (!Update.end(true)) {
        Serial.println("Update.end failed");
        otaInProgress = false;
        sendStatus(OTA_STATUS_CRC_FAIL, 0);
        return;
      }

      otaInProgress = false;
      sendStatus(OTA_STATUS_SUCCESS, 100);
      Serial.println("OTA SUCCESS! Restarting...");
      delay(2000);
      ESP.restart();

    } else if (cmd == OTA_CMD_ABORT) {
      Serial.println("OTA ABORT");
      if (otaInProgress) {
        Update.abort();
        otaInProgress = false;
      }
      sendStatus(OTA_STATUS_ABORT_OK, 0);
    }
  }
};

// ─── OTA Data Callback ───
class OTADataCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    if (!otaInProgress) return;
    std::string val = pChar->getValue();
    size_t len = val.length();

    if (Update.write((uint8_t*)val.data(), len) != len) {
      Serial.println("Update.write failed");
      sendStatus(OTA_STATUS_WRITE_FAIL, 0);
      return;
    }

    otaReceived += len;

    // Notify progress every 2KB
    if (otaTotalSize > 0 && (otaReceived % 2048) < len) {
      uint8_t progress = (uint8_t)((uint64_t)otaReceived * 100 / otaTotalSize);
      sendStatus(OTA_STATUS_RECEIVING, progress);
    }
  }
};

// ─── Forward declarations ───
extern SSD1306 oled;

// ─── Note frequencies ───
static const int NOTES[] = {262, 294, 330, 349, 392, 440, 494, 523}; // 도레미파솔라시도

// ─── AHT20 Temperature/Humidity Sensor (I2C addr 0x38) ───
#define AHT20_ADDR 0x38
static bool _aht20_inited = false;

void aht20_init() {
  // 소프트 리셋
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xBA);
  Wire.endTransmission();
  delay(20);

  // 초기화 명령 (calibration)
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xBE);
  Wire.write(0x08);
  Wire.write(0x00);
  Wire.endTransmission();
  delay(10);

  _aht20_inited = true;
  Serial.println("AHT20 initialized");
}

// 에러 코드: 0=성공, 1=I2C없음, 2=응답없음, 3=busy, 4=init실패
int aht20_err = 0;

bool aht20_read(float &temp, float &humi) {
  if (!_aht20_inited) aht20_init();

  // I2C 스캔 — 센서가 있는지 확인
  Wire.beginTransmission(AHT20_ADDR);
  uint8_t ack = Wire.endTransmission();
  if (ack != 0) {
    aht20_err = 1; // I2C 장치 없음
    Serial.printf("AHT20: I2C NACK (err=%d)\n", ack);
    return false;
  }

  // 측정 시작 명령
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xAC);
  Wire.write(0x33);
  Wire.write(0x00);
  Wire.endTransmission();

  delay(80); // 측정 대기

  uint8_t n = Wire.requestFrom((uint8_t)AHT20_ADDR, (uint8_t)7);
  if (n < 7) {
    aht20_err = 2; // 응답 바이트 부족
    Serial.printf("AHT20: only %d bytes\n", n);
    return false;
  }

  uint8_t data[7];
  for (int i = 0; i < 7; i++) data[i] = Wire.read();
  Serial.printf("AHT20 raw: %02X %02X %02X %02X %02X %02X %02X\n",
    data[0],data[1],data[2],data[3],data[4],data[5],data[6]);

  // busy 재시도
  if (data[0] & 0x80) {
    delay(100);
    Wire.requestFrom((uint8_t)AHT20_ADDR, (uint8_t)7);
    for (int i = 0; i < 7; i++) data[i] = Wire.read();
    if (data[0] & 0x80) {
      aht20_err = 3;
      return false;
    }
  }

  // calibration bit 체크 (bit3 of status)
  if (!(data[0] & 0x08)) {
    // 캘리브레이션 안 됨 — 재초기화
    _aht20_inited = false;
    aht20_init();
    aht20_err = 4;
    return false;
  }

  uint32_t rawHumi = ((uint32_t)data[1] << 12) | ((uint32_t)data[2] << 4) | (data[3] >> 4);
  uint32_t rawTemp = (((uint32_t)(data[3] & 0x0F)) << 16) | ((uint32_t)data[4] << 8) | data[5];

  humi = (float)rawHumi / 1048576.0f * 100.0f;
  temp = (float)rawTemp / 1048576.0f * 200.0f - 50.0f;
  aht20_err = 0;
  return true;
}

// ─── Hardware Init (항상 모든 핀 초기화) ───
void initHardware() {
  // LED (active LOW: LOW=ON, HIGH=OFF)
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_YELLOW, HIGH);
  digitalWrite(LED_BLUE, HIGH);

  // Buzzer OFF (active LOW)
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, HIGH);

  // Switch (INPUT_PULLUP, active LOW: 누르면 LOW)
  pinMode(32, INPUT_PULLUP);

  // I2C + OLED
  Wire.begin(I2C_SDA, I2C_SCL);
  oled.init();
  oled.clear();
  oled.drawString(0, 0, "UTTEC Firmware");
  oled.drawString(0, 16, "BLE OTA Ready!");
  oled.drawString(0, 32, "Waiting...");
  oled.display();

  Serial.println("Hardware initialized");
}

// ─── Command Callback (패드 제어) ───
class CmdCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    String cmd = String(val.c_str());
    cmd.trim();
    Serial.printf("CMD: %s\n", cmd.c_str());

    if (cmd == "LED_RED_ON")    { digitalWrite(LED_RED, LOW); }
    else if (cmd == "LED_RED_OFF")   { digitalWrite(LED_RED, HIGH); }
    else if (cmd == "LED_YELLOW_ON") { digitalWrite(LED_YELLOW, LOW); }
    else if (cmd == "LED_YELLOW_OFF"){ digitalWrite(LED_YELLOW, HIGH); }
    else if (cmd == "LED_BLUE_ON")   { digitalWrite(LED_BLUE, LOW); }
    else if (cmd == "LED_BLUE_OFF")  { digitalWrite(LED_BLUE, HIGH); }
    else if (cmd == "LED_ALL_OFF") {
      digitalWrite(LED_RED, HIGH);
      digitalWrite(LED_YELLOW, HIGH);
      digitalWrite(LED_BLUE, HIGH);
    }
    else if (cmd == "BEEP") {
      digitalWrite(BUZZER, LOW); delay(100); digitalWrite(BUZZER, HIGH);
    }
    else if (cmd.startsWith("NOTE_")) {
      int idx = cmd.substring(5).toInt(); // 0~7
      if (idx >= 0 && idx < 8) {
        tone(33, NOTES[idx], 300); // GPIO33 = melody buzzer
      }
    }
    else if (cmd.startsWith("OLED:")) {
      String text = cmd.substring(5);
      oled.clear();
      oled.drawString(0, 0, text.c_str());
      oled.display();
    }
    else if (cmd == "TEMP") {
      float temp, humi;
      if (aht20_read(temp, humi)) {
        char buf1[32], buf2[32];
        snprintf(buf1, sizeof(buf1), "Temp: %.1f C", temp);
        snprintf(buf2, sizeof(buf2), "Humi: %.1f %%", humi);
        oled.clear();
        oled.drawString(0, 0, "AHT20 Sensor");
        oled.drawString(0, 20, buf1);
        oled.drawString(0, 40, buf2);
        oled.display();
        Serial.printf("TEMP: %.1fC, HUMI: %.1f%%\n", temp, humi);
      } else {
        oled.clear();
        oled.drawString(0, 0, "AHT20 Error");
        oled.drawString(0, 20, "Check sensor!");
        oled.display();
        Serial.println("TEMP: AHT20 read failed");
      }
    }
    else if (cmd.startsWith("SETNAME:")) {
      // BLE 이름 변경 + NVS 영구 저장
      String newName = cmd.substring(8);
      newName.trim();
      if (newName.length() > 0 && newName.length() < 30) {
        strncpy(bleName, newName.c_str(), sizeof(bleName) - 1);
        bleName[sizeof(bleName) - 1] = '\0';
        // NVS에 저장
        prefs.begin("uttec", false);
        prefs.putString("bleName", bleName);
        prefs.end();
        Serial.printf("BLE name changed to: %s (saved to NVS, reboot to apply)\n", bleName);
        // OLED에 표시
        oled.clear();
        oled.drawString(0, 0, "Name Changed!");
        oled.drawString(0, 16, bleName);
        oled.drawString(0, 32, "Rebooting...");
        oled.display();
        delay(2000);
        ESP.restart(); // 재부팅하여 새 이름 적용
      }
    }
  }
};

// ─── BLE Server Callbacks ───
class ServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override {
    deviceConnected = true;
    Serial.println("BLE Connected");
  }

  void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override {
    deviceConnected = false;
    Serial.println("BLE Disconnected");
    if (otaInProgress) {
      Update.abort();
      otaInProgress = false;
      Serial.println("OTA aborted (disconnect)");
    }
    // Restart advertising
    NimBLEDevice::startAdvertising();
  }
};

// ─── BLE Init ───
void initBLE() {
  // NVS에서 저장된 BLE 이름 읽기
  prefs.begin("uttec", true); // read-only
  String savedName = prefs.getString("bleName", "UTTEC-OTA");
  prefs.end();
  strncpy(bleName, savedName.c_str(), sizeof(bleName) - 1);
  Serial.printf("BLE Name: %s\n", bleName);

  NimBLEDevice::init(bleName);
  NimBLEDevice::setMTU(256);

  NimBLEServer* pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  NimBLEService* pService = pServer->createService(OTA_SERVICE_UUID);

  // OTA_CONTROL — Write
  NimBLECharacteristic* ctrlChar = pService->createCharacteristic(
    OTA_CTRL_UUID, NIMBLE_PROPERTY::WRITE);
  ctrlChar->setCallbacks(new OTAControlCallbacks());

  // OTA_DATA — Write No Response
  NimBLECharacteristic* dataChar = pService->createCharacteristic(
    OTA_DATA_UUID, NIMBLE_PROPERTY::WRITE_NR);
  dataChar->setCallbacks(new OTADataCallbacks());

  // OTA_STATUS — Notify
  statusChar = pService->createCharacteristic(
    OTA_STATUS_UUID, NIMBLE_PROPERTY::NOTIFY);

  // CMD — 패드 명령 수신
  NimBLECharacteristic* cmdChar = pService->createCharacteristic(
    CMD_UUID, NIMBLE_PROPERTY::WRITE);
  cmdChar->setCallbacks(new CmdCallbacks());

  // SENSOR — 센서/스위치 데이터 (Notify + Read)
  sensorChar = pService->createCharacteristic(
    SENSOR_UUID, NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ);

  pService->start();

  // Advertising — 디바이스 이름 포함
  NimBLEAdvertising* pAdv = NimBLEDevice::getAdvertising();
  pAdv->addServiceUUID(OTA_SERVICE_UUID);
  pAdv->setName(bleName);
  NimBLEAdvertisementData scanResp;
  scanResp.setName(bleName);
  pAdv->setScanResponseData(scanResp);
  pAdv->start();

  Serial.printf("BLE OTA initialized, advertising as %s\n", bleName);
}

// ─── OLED ───
SSD1306 oled(I2C_SDA, I2C_SCL);

// ─── Switch Monitor Task ───
// FE05 Notify 프로토콜: [0]=타입(0x01=스위치), [1]=값(0=OFF,1=ON)
void switchMonitorTask(void* param) {
  int lastState = HIGH; // INPUT_PULLUP: 기본 HIGH
  while (1) {
    int state = digitalRead(32);
    if (state != lastState) {
      lastState = state;
      if (deviceConnected && sensorChar) {
        uint8_t data[2] = {0x01, (uint8_t)(state == LOW ? 1 : 0)};
        sensorChar->setValue(data, 2);
        sensorChar->notify();
        Serial.printf("SWITCH: %s\n", state == LOW ? "PRESSED" : "RELEASED");
      }
    }
    delay(50); // 50ms 디바운스
  }
}


// ─── LED Task ───
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
