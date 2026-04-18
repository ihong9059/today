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
// [보안] 패턴 인식 임계값 (ms)
#define SHORT_MAX   400
#define LONG_MIN    700
#define GAP_TIMEOUT 1500
#define MAX_PATTERN 5

// [보안] 패턴 버퍼 및 버튼 상태
int  pressPattern[MAX_PATTERN];
int  patternCount  = 0;
bool btnWasDown    = false;
unsigned long pressStart  = 0;
unsigned long lastRelease = 0;

// [상태] 사이렌 실행 플래그
volatile bool sirenActive = false;

// [경보] 사이렌 + RED LED 태스크 (BLE 경보 로그 포함)
void sirenTask(void* param) {
  Serial.println("[BLE_ALARM] 잘못된 패턴 감지 - 보안 경보 발생!");
  unsigned long start = millis();
  while (millis() - start < 6000) {      // 6초 경보
    for (int f = 800; f <= 1600; f += 40) {
      tone(33, f, 20);
      digitalWrite(LED_RED, LOW);        // 경보등 ON
      delay(20);
    }
    for (int f = 1600; f >= 800; f -= 40) {
      tone(33, f, 20);
      digitalWrite(LED_RED, HIGH);       // 경보등 깜빡
      delay(20);
    }
  }
  noTone(33);
  digitalWrite(LED_RED, HIGH);           // 경보등 OFF
  sirenActive = false;
  // [OLED] 대기 화면 복귀
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
  vTaskDelete(NULL);
}

// [성공] 멜로디 + BLUE LED 태스크
void successTask(void* param) {
  int notes[] = {523, 659, 784, 1047, 784, 1047};
  int durs[]  = {150, 150, 150, 300,  150, 400};
  for (int i = 0; i < 6; i++) {
    digitalWrite(LED_BLUE, LOW);         // 성공 LED ON
    tone(33, notes[i], durs[i]);
    delay(durs[i] + 30);
    digitalWrite(LED_BLUE, HIGH);        // 성공 LED 깜빡
    delay(30);
  }
  noTone(33);
  delay(1500);
  // [OLED] 대기 화면 복귀
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
  vTaskDelete(NULL);
}

// [패턴] 정답 판정 및 결과 처리
void evaluatePattern() {
  // 정답: 짧(0) 짧(0) 긴(1)
  bool ok = (patternCount == 3) &&
            (pressPattern[0] == 0)  &&
            (pressPattern[1] == 0)  &&
            (pressPattern[2] == 1);

  oled.clear();
  if (ok) {
    oled.drawString(0, 0,  "ACCESS GRANTED");
    oled.drawString(0, 16, ":) 잠금 해제!");
    oled.display();
    xTaskCreate(successTask, "success", 2048, NULL, 1, NULL);
  } else {
    oled.drawString(0, 0,  "ACCESS DENIED");
    oled.drawString(0, 16, ":( 경보 발생!");
    oled.display();
    if (!sirenActive) {
      sirenActive = true;
      xTaskCreate(sirenTask, "siren", 2048, NULL, 1, NULL);
    }
  }
  patternCount = 0;
}

void setup() {
  Serial.begin(115200);
  initHardware();   // 핀 초기화 (LED, 부저, OLED)
  initBLE();        // BLE OTA 초기화

  // [OLED] 초기 안내 화면
  oled.clear();
  oled.drawString(0, 0,  "[ 보안 시스템 ]");
  oled.drawString(0, 16, "패턴: .  .  -");
  oled.display();
}

void loop() {
  // [사이렌] 경보 중이면 입력 무시
  if (sirenActive) {
    delay(10);
    return;
  }

  bool btnDown = (digitalRead(32) == LOW);
  unsigned long now = millis();

  // [버튼] 누름 시작 감지
  if (btnDown && !btnWasDown) {
    pressStart = now;
    btnWasDown = true;
  }

  // [버튼] 떼짐 - 짧/긴 판별
  if (!btnDown && btnWasDown) {
    unsigned long dur = now - pressStart;
    btnWasDown  = false;
    lastRelease = now;

    if (patternCount < MAX_PATTERN) {
      if (dur < SHORT_MAX) {
        pressPattern[patternCount++] = 0;  // 짧은 누름
      } else if (dur >= LONG_MIN) {
        pressPattern[patternCount++] = 1;  // 긴 누름
      }
      // [OLED] 입력 진행 상태 표시
      oled.clear();
      oled.drawString(0, 0, "입력 중...");
      String s = "";
      for (int i = 0; i < patternCount; i++) {
        s += (pressPattern[i] == 0) ? ".  " : "-  ";
      }
      oled.drawString(0, 16, s.c_str());
      oled.display();
    }
  }

  // [패턴] 입력 타임아웃 → 최종 판정
  if (patternCount > 0 && !btnWasDown &&
      (now - lastRelease > GAP_TIMEOUT)) {
    evaluatePattern();
  }

  delay(10);
}
