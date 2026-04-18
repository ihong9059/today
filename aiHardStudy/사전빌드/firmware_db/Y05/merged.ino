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
// [핀] 스위치 핀
#define SWITCH_PIN 32

// [게임] 앱 상태 열거형
enum AppState { ST_MENU, ST_REACTION, ST_MASH, ST_RESULT };

// [전역] 상태 변수
AppState appState = ST_MENU;
int menuIdx      = 0;
int lastScore    = 0;
String lastGame  = "";

// [스위치] 디바운스 변수
unsigned long lastDebounceMs = 0;
unsigned long pressStartMs   = 0;
bool isPressing              = false;

// [반응속도] 변수
bool reactionWaiting    = false;
bool reactionSignal     = false;
unsigned long reactionDelay = 0;
unsigned long reactionTimerStart = 0;

// [빨리누르기] 변수
int  mashCount    = 0;
unsigned long mashStartMs = 0;

// [LED] 점멸 태스크 핸들
TaskHandle_t ledBlinkHandle = NULL;

// [LED] 점멸 태스크 (xTaskCreate 사용)
void ledBlinkTask(void* param) {
  int pin = (int)param;
  for (int i = 0; i < 6; i++) {
    digitalWrite(pin, LOW);
    vTaskDelay(pdMS_TO_TICKS(120));
    digitalWrite(pin, HIGH);
    vTaskDelay(pdMS_TO_TICKS(120));
  }
  ledBlinkHandle = NULL;
  vTaskDelete(NULL);
}

// [BLE] 점수 직렬 전송 (base firmware BLE characteristic 활용)
void sendScore(const char* game, int score) {
  Serial.printf("[BLE_SCORE] %s=%d\n", game, score);
}

// [스위치] 눌림 감지 (1=짧게, 2=길게, 0=없음)
int readSwitch() {
  bool pressed = (digitalRead(SWITCH_PIN) == LOW);
  unsigned long now = millis();
  if (pressed && !isPressing && (now - lastDebounceMs > 50)) {
    isPressing    = true;
    pressStartMs  = now;
    lastDebounceMs = now;
  } else if (!pressed && isPressing && (now - lastDebounceMs > 50)) {
    isPressing     = false;
    lastDebounceMs = now;
    unsigned long dur = now - pressStartMs;
    if (dur >= 800) return 2;  // 긴 누름 → 선택
    if (dur >= 50)  return 1;  // 짧은 누름 → 이동
  }
  return 0;
}

// [OLED] 메뉴 화면 출력
void drawMenu() {
  oled.clear();
  oled.drawString(0,  0, "== GAME CENTER ==");
  oled.drawString(0, 14, menuIdx == 0 ? ">1.Reaction" : " 1.Reaction");
  oled.drawString(0, 24, menuIdx == 1 ? ">2.Dice"     : " 2.Dice");
  oled.drawString(0, 34, menuIdx == 2 ? ">3.Mash!"    : " 3.Mash!");
  oled.drawString(0, 50, "S:Next  L:Start");
  oled.display();
}

// [OLED] 결과 화면 출력
void drawResult() {
  oled.clear();
  oled.drawString(0,  0, "=== RESULT ===");
  oled.drawString(0, 18, lastGame.c_str());
  String s = "Score: " + String(lastScore);
  oled.drawString(0, 34, s.c_str());
  oled.drawString(0, 50, "Press -> Menu");
  oled.display();
}

// [반응속도] 게임 초기화 및 시작
void startReaction() {
  appState           = ST_REACTION;
  reactionDelay      = random(2000, 5000);
  reactionTimerStart = millis();
  reactionWaiting    = true;
  reactionSignal     = false;
  digitalWrite(LED_RED, HIGH);  // OFF
  oled.clear();
  oled.drawString(0,  0, "= REACTION =");
  oled.drawString(0, 20, "준비하세요...");
  oled.drawString(0, 36, "신호 오면 눌러!");
  oled.display();
  tone(33, 440, 200);
}

// [주사위] 즉시 실행 후 결과 화면
void startDice() {
  int dice = random(1, 7);
  oled.clear();
  oled.drawString(0,  0, "= DICE ROLL =");
  String dStr = "Result: " + String(dice);
  oled.drawString(0, 18, dStr.c_str());
  String stars = "";
  for (int i = 0; i < dice; i++) stars += "* ";
  oled.drawString(0, 34, stars.c_str());
  oled.drawString(0, 50, "Press -> Menu");
  oled.display();
  // [주사위] 눈금 수만큼 비프음
  for (int i = 0; i < dice; i++) {
    tone(33, 880, 80);
    delay(200);
  }
  int ledPin = (dice <= 2) ? LED_RED : (dice <= 4 ? LED_YELLOW : LED_BLUE);
  if (ledBlinkHandle == NULL)
    xTaskCreate(ledBlinkTask, "blink", 1024, (void*)ledPin, 1, &ledBlinkHandle);
  lastGame  = "Dice(1-6)";
  lastScore = dice;
  sendScore("Dice", dice);
  appState = ST_RESULT;
  drawResult();
}

// [빨리누르기] 게임 시작
void startMash() {
  appState    = ST_MASH;
  mashCount   = 0;
  mashStartMs = millis();
  oled.clear();
  oled.drawString(0,  0, "= MASH GAME =");
  oled.drawString(0, 20, "5초 안에 눌러!!");
  oled.drawString(0, 36, "Count: 0");
  oled.display();
  tone(33, 660, 300);
}

void setup() {
  Serial.begin(115200);
  initHardware();   // [초기화] 핀 및 OLED 초기화
  initBLE();        // [BLE] OTA 초기화
  randomSeed(analogRead(35));  // [랜덤] 시드 설정
  drawMenu();
}

void loop() {
  delay(10);  // [BLE] OTA 처리 여유

  int sw = readSwitch();

  // ── 메뉴 ──────────────────────────────────────────
  if (appState == ST_MENU) {
    if (sw == 1) {
      menuIdx = (menuIdx + 1) % 3;  // [메뉴] 다음 항목
      drawMenu();
      tone(33, 400, 50);
    } else if (sw == 2) {
      tone(33, 880, 150);           // [메뉴] 선택 효과음
      delay(200);
      if      (menuIdx == 0) startReaction();
      else if (menuIdx == 1) startDice();
      else                   startMash();
    }

  // ── 반응속도 ──────────────────────────────────────
  } else if (appState == ST_REACTION) {
    unsigned long now = millis();
    // [반응속도] 랜덤 딜레이 후 신호 발생
    if (reactionWaiting && !reactionSignal && (now - reactionTimerStart >= reactionDelay)) {
      reactionSignal     = true;
      reactionTimerStart = now;
      digitalWrite(LED_RED, LOW);   // LED ON
      tone(33, 1200, 100);
      oled.clear();
      oled.drawString(0,  0, "= REACTION =");
      oled.drawString(0, 26, ">>> 지금 눌러! <<<");
      oled.display();
    }
    if (sw > 0) {
      if (reactionSignal) {
        // [반응속도] 측정 완료
        int ms = (int)(millis() - reactionTimerStart);
        digitalWrite(LED_RED, HIGH);
        reactionWaiting = reactionSignal = false;
        lastGame  = "Reaction(ms)";
        lastScore = ms;
        sendScore("Reaction", ms);
        drawResult();
        appState = ST_RESULT;
        // [반응속도] 등급별 LED+멜로디
        if (ms < 300) {
          tone(33, 1500, 600);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_BLUE, 1, &ledBlinkHandle);
        } else if (ms < 600) {
          tone(33, 1000, 500);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_YELLOW, 1, &ledBlinkHandle);
        } else {
          tone(33, 440, 400);
          if (ledBlinkHandle == NULL)
            xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_RED, 1, &ledBlinkHandle);
        }
      } else if (reactionWaiting) {
        // [반응속도] 조기 입력 페널티
        tone(33, 200, 500);
        oled.clear();
        oled.drawString(0, 0, "= REACTION =");
        oled.drawString(0, 22, "너무 일찍!");
        oled.drawString(0, 38, "다시 시도...");
        oled.display();
        delay(1500);
        startReaction();
      }
    }

  // ── 빨리누르기 ────────────────────────────────────
  } else if (appState == ST_MASH) {
    unsigned long now     = millis();
    unsigned long elapsed = now - mashStartMs;

    if (elapsed >= 5000) {
      // [빨리누르기] 종료 멜로디
      tone(33, 1000, 200); delay(250); tone(33, 800, 200);
      lastGame  = "Mash(5s)";
      lastScore = mashCount;
      sendScore("Mash", mashCount);
      drawResult();
      appState = ST_RESULT;
      if (ledBlinkHandle == NULL)
        xTaskCreate(ledBlinkTask, "blink", 1024, (void*)LED_BLUE, 1, &ledBlinkHandle);
    } else {
      if (sw > 0) {
        mashCount++;
        // [빨리누르기] 누를수록 음정 상승
        int freq = 600 + mashCount * 8;
        if (freq > 2000) freq = 2000;
        tone(33, freq, 20);
      }
      // [빨리누르기] 200ms마다 화면 갱신
      static unsigned long lastMashDraw = 0;
      if (now - lastMashDraw > 200) {
        lastMashDraw = now;
        int remain = (int)((5000 - elapsed) / 1000) + 1;
        oled.clear();
        oled.drawString(0,  0, "= MASH GAME =");
        String tStr = "Time: " + String(remain) + "s";
        oled.drawString(0, 14, tStr.c_str());
        String cStr = "Count: " + String(mashCount);
        oled.drawString(0, 30, cStr.c_str());
        // [빨리누르기] 진행 바
        int bars = (int)(elapsed / 500);  // 0~10
        String bar = "[";
        for (int i = 0; i < 10; i++) bar += (i < bars ? "#" : "-");
        bar += "]";
        oled.drawString(0, 48, bar.c_str());
        oled.display();
      }
    }

  // ── 결과 화면 ─────────────────────────────────────
  } else if (appState == ST_RESULT) {
    if (sw > 0) {
      appState = ST_MENU;
      drawMenu();
    }
  }
}
