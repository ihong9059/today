/**
 * BLE OTA Bootloader — Arduino Version
 * ESP32-C3 SuperMini
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
#include <Adafruit_NeoPixel.h>
#include "ssd1306.h"

// ─── NVS 저장소 (BLE 이름 영구 저장) ───
Preferences prefs;
char bleName[32] = "UTTEC-MINI";

// ─── Pin Definitions (ESP32-C3 SuperMini) ───
#define WS2812_PIN  1   // WS2812 RGB LED data pin
#define SPEAKER     2   // Speaker (BCX56 transistor, PWM/tone())
#define SWITCH_PIN  5   // Tact switch (Active LOW, 100nF debounce)
#define I2C_SDA     6   // I2C data (10K pullup)
#define I2C_SCL     7   // I2C clock (10K pullup)

// ─── WS2812 RGB LED ───
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_GRB + NEO_KHZ800);

// ─── Note frequencies (도레미파솔라시도) ───
static const int NOTES[] = {262, 294, 330, 349, 392, 440, 494, 523};

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
    aht20_err = 1;
    Serial.printf("AHT20: I2C NACK (err=%d)\n", ack);
    return false;
  }

  // 측정 시작 명령
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xAC);
  Wire.write(0x33);
  Wire.write(0x00);
  Wire.endTransmission();

  delay(80);

  uint8_t n = Wire.requestFrom((uint8_t)AHT20_ADDR, (uint8_t)7);
  if (n < 7) {
    aht20_err = 2;
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

  // calibration bit 체크
  if (!(data[0] & 0x08)) {
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

// ─── WS2812 Helper Functions ───
void setColor(uint8_t r, uint8_t g, uint8_t b) {
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();
}

void setColorHex(uint32_t color) {
  pixel.setPixelColor(0, color);
  pixel.show();
}

void ledOff() {
  pixel.setPixelColor(0, 0);
  pixel.show();
}

// ─── Hardware Init (항상 모든 핀 초기화) ───
void initHardware() {
  // WS2812 RGB LED
  pixel.begin();
  pixel.setBrightness(50);
  pixel.clear();
  pixel.show();

  // Speaker OFF
  pinMode(SPEAKER, OUTPUT);
  digitalWrite(SPEAKER, LOW);

  // Switch (INPUT_PULLUP, Active LOW: 누르면 LOW)
  pinMode(SWITCH_PIN, INPUT_PULLUP);

  // I2C + OLED
  Wire.begin(I2C_SDA, I2C_SCL);
  oled.init();
  oled.clear();
  oled.drawString(0, 0, "UTTEC Mini");
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

    // WS2812 색상 제어
    if (cmd == "LED_RED_ON")        { setColor(255, 0, 0); }
    else if (cmd == "LED_GREEN_ON") { setColor(0, 255, 0); }
    else if (cmd == "LED_BLUE_ON")  { setColor(0, 0, 255); }
    else if (cmd == "LED_YELLOW_ON"){ setColor(255, 255, 0); }
    else if (cmd == "LED_WHITE_ON") { setColor(255, 255, 255); }
    else if (cmd == "LED_CYAN_ON")  { setColor(0, 255, 255); }
    else if (cmd == "LED_PURPLE_ON"){ setColor(128, 0, 255); }
    else if (cmd == "LED_OFF" || cmd == "LED_ALL_OFF") { ledOff(); }
    else if (cmd.startsWith("LED_COLOR:")) {
      // LED_COLOR:RRGGBB (hex)
      String hex = cmd.substring(10);
      if (hex.length() == 6) {
        uint32_t c = strtoul(hex.c_str(), NULL, 16);
        setColor((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
      }
    }
    else if (cmd.startsWith("LED_BRIGHT:")) {
      int b = cmd.substring(11).toInt();
      pixel.setBrightness(constrain(b, 0, 255));
      pixel.show();
    }
    // 스피커 제어 (tone/melody)
    else if (cmd == "BEEP") {
      tone(SPEAKER, 1000, 100);
    }
    else if (cmd == "BEEP_LONG") {
      tone(SPEAKER, 1000, 500);
    }
    else if (cmd == "BEEP_SOS") {
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 100); delay(200); }
      delay(200);
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 300); delay(400); }
      delay(200);
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 100); delay(200); }
    }
    else if (cmd.startsWith("NOTE_")) {
      int idx = cmd.substring(5).toInt(); // 0~7
      if (idx >= 0 && idx < 8) {
        tone(SPEAKER, NOTES[idx], 300);
      }
    }
    else if (cmd.startsWith("TONE:")) {
      // TONE:freq,duration (예: TONE:440,500)
      int comma = cmd.indexOf(',', 5);
      if (comma > 5) {
        int freq = cmd.substring(5, comma).toInt();
        int dur = cmd.substring(comma + 1).toInt();
        if (freq > 0 && dur > 0) tone(SPEAKER, freq, dur);
      }
    }
    else if (cmd == "NOTONE") {
      noTone(SPEAKER);
    }
    // OLED 제어
    else if (cmd.startsWith("OLED:")) {
      String text = cmd.substring(5);
      oled.clear();
      oled.drawString(0, 0, text.c_str());
      oled.display();
    }
    // 온습도 센서
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
    // BLE 이름 변경
    else if (cmd.startsWith("SETNAME:")) {
      String newName = cmd.substring(8);
      newName.trim();
      if (newName.length() > 0 && newName.length() < 30) {
        strncpy(bleName, newName.c_str(), sizeof(bleName) - 1);
        bleName[sizeof(bleName) - 1] = '\0';
        prefs.begin("uttec", false);
        prefs.putString("bleName", bleName);
        prefs.end();
        Serial.printf("BLE name changed to: %s (saved to NVS, reboot to apply)\n", bleName);
        oled.clear();
        oled.drawString(0, 0, "Name Changed!");
        oled.drawString(0, 16, bleName);
        oled.drawString(0, 32, "Rebooting...");
        oled.display();
        delay(2000);
        ESP.restart();
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
    NimBLEDevice::startAdvertising();
  }
};

// ─── BLE Init ───
void initBLE() {
  prefs.begin("uttec", true);
  String savedName = prefs.getString("bleName", "UTTEC-MINI");
  prefs.end();
  strncpy(bleName, savedName.c_str(), sizeof(bleName) - 1);
  Serial.printf("BLE Name: %s\n", bleName);

  NimBLEDevice::init(bleName);
  NimBLEDevice::setMTU(256);

  NimBLEServer* pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  NimBLEService* pService = pServer->createService(OTA_SERVICE_UUID);

  NimBLECharacteristic* ctrlChar = pService->createCharacteristic(
    OTA_CTRL_UUID, NIMBLE_PROPERTY::WRITE);
  ctrlChar->setCallbacks(new OTAControlCallbacks());

  NimBLECharacteristic* dataChar = pService->createCharacteristic(
    OTA_DATA_UUID, NIMBLE_PROPERTY::WRITE_NR);
  dataChar->setCallbacks(new OTADataCallbacks());

  statusChar = pService->createCharacteristic(
    OTA_STATUS_UUID, NIMBLE_PROPERTY::NOTIFY);

  NimBLECharacteristic* cmdChar = pService->createCharacteristic(
    CMD_UUID, NIMBLE_PROPERTY::WRITE);
  cmdChar->setCallbacks(new CmdCallbacks());

  sensorChar = pService->createCharacteristic(
    SENSOR_UUID, NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ);

  pService->start();

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
void switchMonitorTask(void* param) {
  int lastState = HIGH;
  while (1) {
    int state = digitalRead(SWITCH_PIN);
    if (state != lastState) {
      lastState = state;
      if (deviceConnected && sensorChar) {
        uint8_t data[2] = {0x01, (uint8_t)(state == LOW ? 1 : 0)};
        sensorChar->setValue(data, 2);
        sensorChar->notify();
        Serial.printf("SWITCH: %s\n", state == LOW ? "PRESSED" : "RELEASED");
      }
    }
    delay(50);
  }
}


// ─── LED Task ───
// [전역] 이전 온도 저장
float prevTemp = -999.0;
bool firstRead = true;

// [작업] 온도 감지 태스크
void tempMonitorTask(void* param) {
  while (true) {
    float temp, humi;
    bool ok = aht20_read(temp, humi);

    if (ok) {
      // [표시] OLED 업데이트
      oled.clear();
      oled.drawString(0, 0, "Temp Monitor");
      char buf[32];
      snprintf(buf, sizeof(buf), "Temp: %.1f C", temp);
      oled.drawString(0, 16, buf);
      snprintf(buf, sizeof(buf), "Humi: %.1f %%", humi);
      oled.drawString(0, 32, buf);

      if (firstRead) {
        // [초기화] 첫 읽기 시 기준값 설정
        prevTemp = temp;
        firstRead = false;
        oled.drawString(0, 48, "Initializing...");
      } else {
        float delta = temp - prevTemp;
        if (delta < 0) delta = -delta;

        if (delta >= 1.0) {
          // [경보] 1도 이상 변화 감지
          snprintf(buf, sizeof(buf), "Change:%.1f C!", delta);
          oled.drawString(0, 48, buf);

          // [LED] 빨간색으로 경고 표시
          pixel.setPixelColor(0, pixel.Color(255, 0, 0));
          pixel.show();

          // [소리] 경고 비프음 3회
          for (int i = 0; i < 3; i++) {
            tone(2, 1000, 150);
            vTaskDelay(200 / portTICK_PERIOD_MS);
          }
          noTone(2);

          // [업데이트] 새 기준 온도 갱신
          prevTemp = temp;
        } else {
          // [정상] 변화 없음 - 초록색
          oled.drawString(0, 48, "Stable");
          pixel.setPixelColor(0, pixel.Color(0, 50, 0));
          pixel.show();
        }
      }

      oled.display();

      // [BLE] 센서 데이터 전송
      if (deviceConnected && sensorChar) {
        char ble[64];
        snprintf(ble, sizeof(ble), "T:%.1f,H:%.1f", temp, humi);
        std::string s(ble);
        sensorChar->setValue(s);
        sensorChar->notify();
      }
    } else {
      // [오류] 센서 읽기 실패
      oled.clear();
      oled.drawString(0, 0, "Sensor Error");
      oled.display();
      pixel.setPixelColor(0, pixel.Color(50, 0, 50));
      pixel.show();
    }

    vTaskDelay(2000 / portTICK_PERIOD_MS); // [주기] 2초마다 측정
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [시작] 초기 화면 표시
  oled.clear();
  oled.drawString(0, 0, "Temp Monitor");
  oled.drawString(0, 16, "Starting...");
  oled.display();

  // [LED] 파란색으로 시작 표시
  pixel.setPixelColor(0, pixel.Color(0, 0, 50));
  pixel.show();

  // [태스크] 온도 감지 태스크 생성
  xTaskCreate(tempMonitorTask, "TempMonitor", 4096, NULL, 1, NULL);
}

void loop() {
  delay(10000);
}
