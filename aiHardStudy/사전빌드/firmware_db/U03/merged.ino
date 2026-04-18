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

// ─── User BLE Receive Handler (forward declaration) ───
void onBleReceive(String cmd);

// ─── Command Callback (패드 제어) ───
class CmdCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    String cmd = String(val.c_str());
    cmd.trim();
    Serial.printf("CMD: %s\n", cmd.c_str());

    // 사용자 정의 핸들러 호출
    onBleReceive(cmd);

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
// [기억력 게임] 전역 변수
#define MAX_LEVEL 10
#define NUM_LEDS 3

const int ledPins[NUM_LEDS] = {LED_RED, LED_YELLOW, LED_BLUE};

int  sequence[MAX_LEVEL];   // 게임 시퀀스 (0=R,1=Y,2=B)
int  currentLevel  = 1;     // 현재 레벨
int  inputIndex    = 0;     // 사용자 입력 인덱스
bool gameActive    = false; // 게임 진행 중
bool showingPat    = false; // 패턴 표시 중
bool startRequest  = false; // 시작 요청 플래그
bool inputReceived = false; // BLE 입력 도착 플래그
int  pendingInput  = -1;    // BLE 수신 값 (0~2)

// ── 유틸 ─────────────────────────────────────────────────────────────────────

// [OLED] 두 줄 화면 업데이트
void showOled(const char* l1, const char* l2) {
  oled.clear();
  oled.drawString(0, 0,  l1);
  oled.drawString(0, 16, l2);
  oled.display();
}

// [BLE] 문자열 전송
void bleSend(const char* msg) {
  if (deviceConnected && sensorChar) {
    sensorChar->setValue(std::string(msg));
    sensorChar->notify();
  }
}

// [LED] 해당 LED 단발 점멸
void flashLed(int pin, int ms) {
  digitalWrite(pin, LOW);
  delay(ms);
  digitalWrite(pin, HIGH);
  delay(200);
}

// ── 멜로디 ───────────────────────────────────────────────────────────────────

// [멜로디] 정답 성공음
void playSuccess() {
  tone(33, 523, 120); delay(170);
  tone(33, 659, 120); delay(170);
  tone(33, 784, 250); delay(350);
  noTone(33);
}

// [멜로디] 레벨업 팡파레
void playLevelUp() {
  tone(33, 523, 100); delay(130);
  tone(33, 659, 100); delay(130);
  tone(33, 784, 100); delay(130);
  tone(33, 1047, 350); delay(450);
  noTone(33);
}

// [멜로디] 실패음
void playFail() {
  tone(33, 330, 200); delay(250);
  tone(33, 220, 450); delay(550);
  noTone(33);
}

// [멜로디] 게임 시작 징글
void playStart() {
  tone(33, 440, 150); delay(200);
  tone(33, 550, 150); delay(200);
  tone(33, 660, 250); delay(350);
  noTone(33);
}

// ── 게임 로직 ─────────────────────────────────────────────────────────────────

// [시퀀스] LED 패턴 순서대로 표시
void showSequence() {
  showingPat = true;
  char buf[24];
  snprintf(buf, sizeof(buf), "LEVEL %d", currentLevel);
  showOled(buf, "Watch carefully!");
  bleSend(buf);
  delay(1000);

  for (int i = 0; i < currentLevel; i++) {
    flashLed(ledPins[sequence[i]], 500);
    delay(300);
  }

  showingPat = false;
  inputIndex  = 0;
  showOled("Your Turn!", "1=RED 2=YEL 3=BLU");
  bleSend("YOUR_TURN:1=R,2=Y,3=B");
}

// [게임] 시작 / 레벨1 초기화
void startGame() {
  currentLevel  = 1;
  inputIndex    = 0;
  inputReceived = false;
  pendingInput  = -1;
  gameActive    = true;

  randomSeed(millis());
  for (int i = 0; i < MAX_LEVEL; i++) {
    sequence[i] = random(0, NUM_LEDS); // 전체 시퀀스 미리 생성
  }

  playStart();
  delay(300);
  showSequence();
}

// [입력] 사용자 입력 처리 (메인루프에서 호출)
void processInput(int ledIdx) {
  // [피드백] 누른 LED 점멸
  flashLed(ledPins[ledIdx], 300);

  if (ledIdx != sequence[inputIndex]) {
    // ── 오답 ──
    gameActive = false;
    playFail();
    char buf[24];
    snprintf(buf, sizeof(buf), "FAIL Lv%d", currentLevel);
    showOled("WRONG!", buf);
    bleSend(buf);
    delay(2500);
    startGame(); // 자동 재시작
    return;
  }

  inputIndex++;

  if (inputIndex < currentLevel) {
    // ── 진행 중 ──
    char buf[16];
    snprintf(buf, sizeof(buf), "%d / %d OK", inputIndex, currentLevel);
    showOled("Keep going!", buf);
    bleSend(buf);
    return;
  }

  // ── 시퀀스 완료 ──
  if (currentLevel >= MAX_LEVEL) {
    // 최고 레벨 달성
    playLevelUp();
    showOled("YOU WIN!", "MAX LEVEL!");
    bleSend("WIN:MAXLEVEL");
    for (int i = 0; i < NUM_LEDS; i++) digitalWrite(ledPins[i], LOW);
    delay(3000);
    for (int i = 0; i < NUM_LEDS; i++) digitalWrite(ledPins[i], HIGH);
    gameActive = false;
    showOled("Memory Game", "Press SW or START");
  } else {
    // 레벨업
    playSuccess();
    currentLevel++;
    char buf[24];
    snprintf(buf, sizeof(buf), "CORRECT! Lv%d", currentLevel);
    showOled("CORRECT!", "Next level...");
    bleSend(buf);
    delay(1500);
    playLevelUp();
    showSequence();
  }
}

// ── BLE 수신 ──────────────────────────────────────────────────────────────────

// [BLE] 스마트폰 명령 수신 (콜백 — delay 사용 금지)
void onBleReceive(String cmd) {
  cmd.trim();

  if (cmd.equalsIgnoreCase("START")) {
    startRequest = true; // 메인루프에서 처리
    return;
  }

  if (!gameActive || showingPat) return;

  int val = cmd.toInt(); // "1","2","3" 기대
  if (val >= 1 && val <= 3) {
    pendingInput  = val - 1;
    inputReceived = true;
  }
}

// ── Arduino ───────────────────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [초기화] 대기 화면
  showOled("Memory Game", "Press SW or START");

  // [초기화] 부팅 알림음
  tone(33, 330, 100); delay(150);
  tone(33, 440, 100); delay(150);
  tone(33, 550, 200); delay(300);
  noTone(33);
}

void loop() {
  // [스위치] 물리 버튼으로 게임 시작
  if (!gameActive && !showingPat && digitalRead(32) == LOW) {
    delay(50); // 디바운싱
    if (digitalRead(32) == LOW) {
      while (digitalRead(32) == LOW); // 릴리즈 대기
      startGame();
    }
  }

  // [BLE] START 명령 처리
  if (startRequest) {
    startRequest = false;
    startGame();
  }

  // [BLE] 사용자 입력 처리
  if (inputReceived && gameActive && !showingPat) {
    inputReceived = false;
    int idx = pendingInput;
    pendingInput = -1;
    processInput(idx);
  }

  delay(10);
}
